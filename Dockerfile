# ────────────────────────────────────────────────────────────
# АгроСкоринг — Dockerfile
# Decentrathon 5.0 | Кейс 2 — AI for Government
#
# Запуск:
#   docker build -t agroskoring .
#   docker run -p 8000:8000 agroskoring
#
# Или через docker-compose:
#   docker-compose up
# ────────────────────────────────────────────────────────────

FROM python:3.11-slim

LABEL maintainer="AgroScoring Team"
LABEL description="Merit-Based AI subsidy scoring system for Kazakhstan"

# Системные зависимости
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Зависимости Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем всё приложение
COPY . .

# Обучаем модель при сборке (если нет артефакта)
RUN python -m ml.train || echo "Model training skipped"

# Порт FastAPI
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1

# Запуск
CMD ["uvicorn", "backend.api:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]
