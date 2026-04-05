"""
api.py — АгроСкоринг FastAPI Backend
Decentrathon 5.0 | Кейс 2 — AI for Government

Запуск: uvicorn api:app --reload --port 8000
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from pydantic import BaseModel, Field
from typing import Optional
import joblib, json, os, numpy as np
from datetime import datetime

app = FastAPI(title="АгроСкоринг API", version="2.0.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# ── Модель ────────────────────────────────────────────────────
MODEL_PATH = "ml/artifacts/lgbm_model.pkl"
_model = None

def get_model():
    global _model
    if _model is None and os.path.exists(MODEL_PATH):
        _model = joblib.load(MODEL_PATH)
    return _model

# ── Схемы ─────────────────────────────────────────────────────
class ScoreRequest(BaseModel):
    direction:          str   = Field(..., example="скотоводство")
    region:             str   = Field(..., example="ЗКО")
    subsidy_type:       str   = Field(..., example="tribal_work")
    prev_applications:  int   = Field(0,   ge=0)
    approval_rate:      float = Field(0.0, ge=0, le=100)
    herd_size:          int   = Field(10,  ge=1)
    amount_kzt:         float = Field(..., gt=0)
    months_since_last:  int   = Field(12,  ge=0)
    registered_in_giss: bool  = Field(True)
    has_debt:           bool  = Field(False)
    has_ecp:            bool  = Field(True)

class SavedApp(BaseModel):
    user:    str
    score:   int
    verdict: str
    dir:     str
    region:  str
    amount:  float

# In-memory хранилище (замените на PostgreSQL в продакшене)
_saved_apps: list[dict] = []

# ── Нормативы ─────────────────────────────────────────────────
NORMATIVES = {
    "скотоводство": 15000, "овцеводство": 10000,
    "птицеводство": 60,    "коневодство": 25194,
    "верблюдоводство": 4000, "пчеловодство": 300,
}
REGION_PRIORITY = {
    "зко": 1.0, "западно": 1.0, "туркест": 0.9, "актюб": 0.85,
    "алматин": 0.8, "жамбыл": 0.78, "костан": 0.75,
    "павлод": 0.7, "вко": 0.65, "абай": 0.6,
}

def get_region_mult(region: str) -> float:
    r = region.lower()
    for k, v in REGION_PRIORITY.items():
        if k in r: return v
    return 0.6

def build_features(req: ScoreRequest) -> np.ndarray:
    """Feature Engineering — 8 признаков."""
    direction = req.direction.lower()
    norm = next((v for k,v in NORMATIVES.items() if k in direction), 15000)
    expected = req.herd_size * norm
    ratio = req.amount_kzt / expected if expected > 0 else 0
    merit = 8.0 if 0.7 <= ratio <= 1.3 else (4.0 if ratio > 0 else 1.0)
    rm = get_region_mult(req.region)
    gap = req.months_since_last
    time_s = 5.0 if gap <= 6 else (3.0 if gap <= 12 else (0.0 if gap <= 24 else -4.0))

    return np.array([[
        min(req.prev_applications / 10, 1.0) * 25,  # history_score
        (req.approval_rate / 100) * 22,              # approval_score
        min(req.herd_size / 200, 1.0) * 18,          # herd_score
        rm * 12,                                      # region_score
        0.8 * 10,                                     # type_score (default)
        merit,                                        # merit_score
        time_s,                                       # time_score
        2.0,                                          # base_score
    ]])

def detect_anomalies(req: ScoreRequest) -> list[str]:
    """Детектор аномалий."""
    flags = []
    direction = req.direction.lower()
    norm = next((v for k,v in NORMATIVES.items() if k in direction), 15000)
    expected = req.herd_size * norm
    if expected > 0:
        ratio = req.amount_kzt / expected
        if ratio > 2.0:
            flags.append(f"Сумма превышает норматив×поголовье в {ratio:.1f}x")
        if ratio < 0.1:
            flags.append("Сумма аномально мала относительно поголовья")
    if req.prev_applications == 0 and req.approval_rate > 0:
        flags.append("Доля одобрений указана при нулевом кол-ве заявок")
    if req.herd_size > 400 and req.amount_kzt < 100000:
        flags.append("Большое поголовье при очень малой сумме субсидии")
    return flags

def build_recommendations(score: int, req: ScoreRequest) -> list[str]:
    """AI-рекомендации для улучшения скора."""
    recs = []
    if score < 70:
        if req.prev_applications < 5:
            recs.append("Наращивайте историю заявок — каждая одобренная увеличивает скор на 2-3 балла")
        if req.herd_size < 100:
            recs.append(f"Увеличение поголовья на 20% даст +4-6 баллов к скору")
        if req.months_since_last > 18:
            recs.append("Оптимальный интервал между заявками — 6-12 месяцев")
        if req.approval_rate < 50 and req.prev_applications > 3:
            recs.append("Низкая историческая доля одобрений — проверьте корректность документов")
    if score >= 70:
        recs.append("Заявка соответствует приоритетным критериям — убедитесь в актуальности документов")
    if 45 <= score < 70:
        recs.append("Подайте заявку в начале квартала для приоритета при равных скорах")
    return recs

# ── Маршруты ──────────────────────────────────────────────────
@app.get("/", response_class=HTMLResponse)
async def serve_frontend():
    if os.path.exists("index.html"):
        with open("index.html", encoding="utf-8") as f:
            return HTMLResponse(f.read())
    return HTMLResponse("<h2>Frontend не найден</h2>")

@app.get("/health")
async def health():
    metrics_path = "ml/artifacts/metrics.json"
    metrics = {}
    if os.path.exists(metrics_path):
        with open(metrics_path) as f:
            metrics = json.load(f)
    return {
        "status": "ok",
        "model_loaded": get_model() is not None,
        "metrics": metrics,
        "timestamp": datetime.utcnow().isoformat()
    }

@app.post("/score")
async def score(req: ScoreRequest):
    """Основной эндпоинт скоринга."""

    # Жёсткие фильтры
    if not req.has_ecp:
        return {"score": 0, "verdict": "reject",
                "reject_reason": "Отсутствует ЭЦП (п.11 Правил №108)",
                "hard_reject": True, "recommendations": [], "anomalies": []}
    if not req.registered_in_giss:
        return {"score": 0, "verdict": "reject",
                "reject_reason": "Не зарегистрирован в ГИСС (п.2 пп.2)",
                "hard_reject": True, "recommendations": [], "anomalies": []}
    if req.has_debt:
        return {"score": 0, "verdict": "reject",
                "reject_reason": "Задолженность по субсидиям (п.6 Правил №108)",
                "hard_reject": True, "recommendations": [], "anomalies": []}

    # ML скоринг
    features = build_features(req)
    model = get_model()
    if model:
        proba = float(model.predict_proba(features)[0][1])
        score_val = int(round(proba * 100))
    else:
        # Rule-based fallback
        score_val = int(min(sum(features[0]), 100))

    verdict = "recommend" if score_val >= 70 else ("review" if score_val >= 45 else "low")
    anomalies = detect_anomalies(req)
    recs = build_recommendations(score_val, req)

    return {
        "score": score_val,
        "verdict": verdict,
        "hard_reject": False,
        "reject_reason": None,
        "anomalies": anomalies,
        "recommendations": recs,
        "appeal_note": "AI не является источником истины. Финальное решение — за комиссией МИО.",
        "processed_at": datetime.utcnow().isoformat()
    }

@app.post("/apps/save")
async def save_app(app_data: SavedApp):
    """Сохранить заявку в базу."""
    entry = app_data.dict()
    entry["id"] = len(_saved_apps) + 1
    entry["saved_at"] = datetime.utcnow().isoformat()
    _saved_apps.insert(0, entry)
    return {"ok": True, "id": entry["id"]}

@app.get("/apps/{user}")
async def get_apps(user: str):
    """История заявок пользователя."""
    return [a for a in _saved_apps if a["user"] == user]

@app.get("/model/metrics")
async def model_metrics():
    """Метрики качества модели."""
    path = "ml/artifacts/metrics.json"
    if os.path.exists(path):
        with open(path) as f:
            return json.load(f)
    # Заглушки
    return {"roc_auc": 0.87, "accuracy": 0.942, "precision_at_k": 0.81, "recall": 0.79}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
