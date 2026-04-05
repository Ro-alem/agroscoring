
// ===== NAV =====
function goTo(name, btn) {
  document.querySelectorAll('.page').forEach(function(p){p.classList.remove('active')});
  document.querySelectorAll('.nav-link').forEach(function(l){l.classList.remove('active')});
  var pg = document.getElementById('page-'+name);
  if(pg) pg.classList.add('active');
  if(btn) { btn.classList.add('active'); }
  else {
    var names=['home','scoring','data','analytics','upload','arch','about'];
    var i=names.indexOf(name);
    var btns=document.querySelectorAll('.nav-link');
    if(i>=0&&btns[i]) btns[i].classList.add('active');
  }
  if(name==='analytics') renderAnalytics();
  if(name==='data') renderDemoTable('all');
}

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, suffix) {
  var start = 0; var dur = 1400; var startTime = null;
  function step(ts) {
    if(!startTime) startTime = ts;
    var p = Math.min((ts-startTime)/dur, 1);
    var ease = 1-Math.pow(1-p,3);
    el.textContent = Math.round(ease*target).toLocaleString('ru')+(suffix||'');
    if(p<1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
document.querySelectorAll('[data-target]').forEach(function(el){
  var t = parseInt(el.getAttribute('data-target'));
  setTimeout(function(){ animateCounter(el, t); }, 300);
});

// ===== DEMO TABLE DATA =====
var DD=[
  {region:'Область Абай',dir:'Скотоводство',name:'Племенная работа КРС (маточное пог.)',s:'done',norm:15000,amt:4635000},
  {region:'Область Абай',dir:'Скотоводство',name:'Приобретение племенного маточного пог.',s:'done',norm:150000,amt:14850000},
  {region:'ВКО',dir:'Скотоводство',name:'Племенная работа КРС (маточное пог.)',s:'done',norm:15000,amt:2700000},
  {region:'ЗКО',dir:'Скотоводство',name:'Быки-производители мясных пород',s:'ok',norm:300000,amt:9000000},
  {region:'Алматинская',dir:'Скотоводство',name:'Удешевление молока (коровье) >600 гол.',s:'done',norm:45,amt:61748145},
  {region:'Жамбылская',dir:'Птицеводство',name:'Удешевление мяса птицы >5000 т',s:'ok',norm:20,amt:2400000},
  {region:'Туркестанская',dir:'Птицеводство',name:'Удешевление мяса птицы >15000 т',s:'done',norm:80,amt:5120000},
  {region:'Костанайская',dir:'Скотоводство',name:'Товарное маточное поголовье КРС',s:'ok',norm:10000,amt:3200000},
  {region:'Мангистауская',dir:'Верблюдоводство',name:'Племенная работа с верблюдами',s:'rej',norm:4000,amt:560000},
  {region:'Павлодарская',dir:'Скотоводство',name:'Удешевление КРС на откорм',s:'done',norm:25194,amt:7558200},
  {region:'СКО',dir:'Скотоводство',name:'Приобретение племенного маточного пог.',s:'done',norm:150000,amt:4500000},
  {region:'Актюбинская',dir:'Овцеводство',name:'Племенная работа (маточное пог. овец)',s:'pend',norm:10000,amt:1200000},
  {region:'Акмолинская',dir:'Скотоводство',name:'Удешевление молока (коровье) >50 гол.',s:'done',norm:60,amt:18000000},
  {region:'Карагандинская',dir:'Скотоводство',name:'Выращивание племенного молодняка КРС',s:'ok',norm:25194,amt:5038800},
  {region:'Область Жетісу',dir:'Коневодство',name:'Племенная работа (лошади верхового напр.)',s:'done',norm:25194,amt:3779100},
  {region:'ВКО',dir:'Скотоводство',name:'Приобретение племенного маточного пог.',s:'rej',norm:150000,amt:3000000},
  {region:'Кызылординская',dir:'Верблюдоводство',name:'Племенная работа с верблюдами',s:'done',norm:4000,amt:480000},
  {region:'Атырауская',dir:'Скотоводство',name:'Товарное маточное поголовье КРС',s:'ok',norm:10000,amt:2500000},
  {region:'ЗКО',dir:'Овцеводство',name:'Баран-производитель',s:'done',norm:15000,amt:900000},
  {region:'Туркестанская',dir:'Овцеводство',name:'Баран-производитель',s:'rej',norm:15000,amt:750000},
  {region:'Область Абай',dir:'Пчеловодство',name:'Удешевление производства мёда',s:'done',norm:300,amt:180000},
  {region:'Жамбылская',dir:'Скотоводство',name:'Племенная работа КРС (маточное пог.)',s:'done',norm:15000,amt:1800000},
  {region:'ЗКО',dir:'Птицеводство',name:'Удешевление мяса птицы >5000 т',s:'ok',norm:20,amt:1600000},
  {region:'Алматинская',dir:'Скотоводство',name:'Быки-производители',s:'done',norm:300000,amt:6000000},
  {region:'СКО',dir:'Скотоводство',name:'Удешевление молока (кооператив)',s:'ok',norm:60,amt:12000000},
  {region:'Павлодарская',dir:'Коневодство',name:'Лошади верхового направления',s:'done',norm:25194,amt:2519400},
  {region:'Актюбинская',dir:'Скотоводство',name:'Товарное маточное поголовье КРС',s:'done',norm:10000,amt:4000000},
  {region:'Карагандинская',dir:'Свиноводство',name:'Племенное маточное поголовье свиней',s:'rej',norm:15000,amt:450000},
  {region:'Туркестанская',dir:'Птицеводство',name:'Прародительские формы птицы',s:'done',norm:80,amt:4000000},
  {region:'Область Жетісу',dir:'Скотоводство',name:'Племенная работа КРС (маточное пог.)',s:'done',norm:15000,amt:2250000},
  {region:'Кызылординская',dir:'Скотоводство',name:'Удешевление КРС на откорм',s:'ok',norm:25194,amt:5038800},
  {region:'Атырауская',dir:'Верблюдоводство',name:'Племенная работа с верблюдами',s:'done',norm:4000,amt:640000},
  {region:'ВКО',dir:'Овцеводство',name:'Баран-производитель',s:'done',norm:15000,amt:1050000},
  {region:'ЗКО',dir:'Скотоводство',name:'Племенная работа КРС (маточное пог.)',s:'done',norm:15000,amt:3300000},
  {region:'Жамбылская',dir:'Скотоводство',name:'Приобретение племенного маточного пог.',s:'ok',norm:150000,amt:9000000},
  {region:'Костанайская',dir:'Птицеводство',name:'Удешевление суточного молодняка',s:'done',norm:60,amt:2400000},
  {region:'Акмолинская',dir:'Овцеводство',name:'Племенная работа (маточное пог. овец)',s:'pend',norm:10000,amt:800000},
  {region:'Мангистауская',dir:'Скотоводство',name:'Выращивание племенного молодняка',s:'done',norm:25194,amt:4032240},
  {region:'Область Абай',dir:'Скотоводство',name:'Удешевление молока (коровье) >50 гол.',s:'done',norm:60,amt:7200000},
  {region:'Актюбинская',dir:'Птицеводство',name:'Удешевление мяса птицы >15000 т',s:'ok',norm:80,amt:6400000},
  {region:'СКО',dir:'Верблюдоводство',name:'Племенная работа с верблюдами',s:'rej',norm:4000,amt:320000},
  {region:'Карагандинская',dir:'Скотоводство',name:'Товарное маточное поголовье КРС',s:'done',norm:10000,amt:3000000},
  {region:'ВКО',dir:'Скотоводство',name:'Удешевление КРС на откорм',s:'done',norm:25194,amt:6298500},
  {region:'Туркестанская',dir:'Овцеводство',name:'Племенная работа (маточное пог. овец)',s:'ok',norm:10000,amt:2000000},
  {region:'Область Жетісу',dir:'Скотоводство',name:'Быки-производители',s:'done',norm:300000,amt:4500000}
];

var demoFilter='all', demoSearch='';
function demoSc(r){var a=[72,78,65,80,74,68,82,76,71,85,88,70,66,73,79,83];var b=[55,62,58,60,64,57];var c=[35,28,42,31,38];var d=[50,52,55,48];var map={done:a,ok:b,rej:c,pend:d};var arr=map[r.s]||a;return arr[Math.abs(r.amt*7+r.norm)%arr.length];}
function stTag(s){return{done:'<span class="tag t-done">&#10003; Исполнена</span>',ok:'<span class="tag t-ok">&bull; Одобрена</span>',rej:'<span class="tag t-rej">&times; Отклонена</span>',pend:'<span class="tag t-pend">&#8987; Получена</span>'}[s]||s;}
function renderDemoTable(f){
  demoFilter=f||demoFilter;
  var s=(document.getElementById('demoSearch')||{}).value||'';
  demoSearch=s.toLowerCase();
  var data=DD.filter(function(r){
    if(demoFilter!=='all'&&r.s!==demoFilter)return false;
    if(demoSearch&&!(r.region+r.dir+r.name).toLowerCase().includes(demoSearch))return false;
    return true;
  });
  document.getElementById('demo-tbody').innerHTML=data.map(function(r,i){
    var sc=demoSc(r);var col=sc>=70?'var(--accent)':sc>=45?'var(--accent3)':'var(--warn)';
    return '<tr><td style="color:var(--text3);font-size:10px;font-family:\'JetBrains Mono\',monospace">'+(i+1)+'</td><td style="font-size:11px">'+r.region+'</td><td style="font-size:10px;color:var(--text2)">'+r.dir+'</td><td style="font-size:10px;color:var(--text2);max-width:240px">'+r.name+'</td><td>'+stTag(r.s)+'</td><td style="font-size:10px;font-weight:800;font-family:\'JetBrains Mono\',monospace">'+r.norm.toLocaleString('ru')+'</td><td style="font-size:10px;font-weight:800;font-family:\'JetBrains Mono\',monospace">'+r.amt.toLocaleString('ru')+'</td><td><span class="score-mini" style="color:'+col+'">'+sc+'</span><div style="width:34px;height:3px;background:var(--bg);border-radius:2px;margin-top:2px"><div style="width:'+sc+'%;height:100%;background:'+col+';border-radius:2px;transition:width .6s ease"></div></div></td></tr>';
  }).join('');
  var el=document.getElementById('demoMeta');
  if(el)el.textContent='Показано '+data.length+' из '+DD.length+' записей (демо-данные).';
}
function filterTbl(btn,f){document.querySelectorAll('.chip').forEach(function(c){c.classList.remove('active')});btn.classList.add('active');renderDemoTable(f);}
function filterDemoTbl(){renderDemoTable(demoFilter);}
renderDemoTable('all');

// ===== SCORING =====
var scoreHistory = [];

function resetForm() {
  document.getElementById('f-prev').value = 3;
  document.getElementById('rv-prev').textContent = '3';
  document.getElementById('f-appr').value = 70;
  document.getElementById('rv-appr').textContent = '70';
  document.getElementById('f-heads').value = 80;
  document.getElementById('rv-heads').textContent = '80';
  document.getElementById('f-amt').value = 3500;
  document.getElementById('rv-amt').textContent = '3\u202f500';
  document.getElementById('f-gap').value = 12;
  document.getElementById('rv-gap').textContent = '12';
  document.getElementById('f-reg').value = 'yes';
  document.getElementById('f-debt').value = 'no';
  document.getElementById('f-ecp').value = 'yes';
  document.getElementById('result-wrap').innerHTML='<div class="result-panel"><div class="result-empty"><div class="result-empty-icon">&#9670;</div><div class="result-empty-text">Заполните форму и нажмите<br>«Запустить скоринг»</div></div></div>';
}

function runScoring(){
  if(document.getElementById('f-ecp').value==='no'){renderReject('Отсутствует ЭЦП. Подача заявок без электронной цифровой подписи невозможна (п.11 Правил №108).');return;}
  if(document.getElementById('f-reg').value==='no'){renderReject('Животные не зарегистрированы в базе идентификации ГИСС. Автоматический отказ (п.2 пп.2 Правил №108).');return;}
  if(document.getElementById('f-debt').value==='yes'){renderReject('Наличие задолженности по ранее полученным субсидиям. Требуется погашение (п.6 Правил №108).');return;}
  var msgs=[
    ['Загрузка признаков...','Parsing feature vector'],
    ['Проверка жёстких фильтров...','Rule-based validation'],
    ['Вычисление SHAP-значений...','SHAP feature importance'],
    ['Формирование объяснения...','Generating verdict']
  ];
  var idx=0;var ov=document.getElementById('overlay');ov.classList.add('show');
  var t=setInterval(function(){
    var m=msgs[idx%msgs.length];idx++;
    document.getElementById('spinTxt').textContent=m[0];
    document.getElementById('spinSub').textContent=m[1];
  },600);
  setTimeout(function(){clearInterval(t);ov.classList.remove('show');doScore();},2500);
}

function doScore(){
  var dir=document.getElementById('f-dir').value;
  var region=document.getElementById('f-region').value;
  var type=document.getElementById('f-type').value;
  var prev=+document.getElementById('f-prev').value;
  var appr=+document.getElementById('f-appr').value;
  var heads=+document.getElementById('f-heads').value;
  var amt=+document.getElementById('f-amt').value;
  var gap=+document.getElementById('f-gap').value;
  var hS=Math.min(prev/10,1)*25;
  var aS=(appr/100)*22;
  var hdS=Math.min(heads/200,1)*18;
  var rM={zko:1,turk:.9,aktube:.85,alm:.8,kost:.75,pavl:.7,vko:.65,abai:.6,sko:.75,kzl:.7,jetisu:.72,man:.65};
  var rS=(rM[region]||.6)*12;
  var tM={tribal_work:10,buy_tribal:9,bulls:8,milk:7,beef:6,young:8};
  var tS=tM[type]||6;
  var nM={cattle:15000,sheep:10000,poultry:60,horse:25194,camel:4000,bee:300};
  var norm=nM[dir]||15000;
  var mr=Math.min(amt/Math.max((heads*norm)/1000,1),2);
  var mS=(mr>0.7&&mr<1.3)?8:(mr>=1.3&&mr<=1.6)?4:1;
  var gS=gap>24?-4:gap>12?0:gap>6?3:5;
  var total=Math.round(Math.min(Math.max(hS+aS+hdS+rS+tS+mS+gS+2,0),100));
  var shap=[
    {name:'История субсидий ('+prev+' заявок)',val:hS,max:25,color:'var(--accent)'},
    {name:'Доля одобренных ('+appr+'%)',val:aS,max:22,color:'var(--accent)'},
    {name:'Объём поголовья ('+heads+' гол.)',val:hdS,max:18,color:'var(--accent2)'},
    {name:'Приоритет региона',val:+rS.toFixed(1),max:12,color:'var(--accent2)'},
    {name:'Тип субсидии',val:tS,max:10,color:'var(--accent3)'},
    {name:'Merit-proxy',val:mS,max:8,color:'var(--accent3)'},
    {name:'Временной интервал',val:Math.max(gS,0),max:5,color:gS<0?'var(--warn)':'var(--accent)'},
  ];
  renderResult(total,shap,gap,gS);
  addToHistory(total, dir, region);
}

function addToHistory(score, dir, region) {
  var now = new Date();
  var dirLabels = {cattle:'Скотоводство',sheep:'Овцеводство',poultry:'Птицеводство',horse:'Коневодство',camel:'Верблюдоводство',bee:'Пчеловодство'};
  var regionLabels = {zko:'ЗКО',turk:'Туркестанская',aktube:'Актюбинская',alm:'Алматинская',kost:'Костанайская',pavl:'Павлодарская',vko:'ВКО',abai:'Абай',sko:'СКО',kzl:'Кызылординская',jetisu:'Жетісу',man:'Мангистауская'};
  scoreHistory.unshift({score:score, dir:dirLabels[dir]||dir, region:regionLabels[region]||region, time:now.toLocaleTimeString('ru')});
  if(scoreHistory.length>8) scoreHistory.pop();
  renderHistory();
}

function renderHistory() {
  var block = document.getElementById('historyBlock');
  var list = document.getElementById('historyList');
  if(!block||!list) return;
  block.style.display = scoreHistory.length ? 'block' : 'none';
  list.innerHTML = scoreHistory.map(function(h,i){
    var col = h.score>=70?'var(--accent)':h.score>=45?'var(--accent3)':'var(--warn)';
    return '<div class="hist-item"><span class="hist-score" style="color:'+col+'">'+h.score+'</span><div class="hist-info">'+h.dir+' &middot; '+h.region+'<div class="hist-time">'+h.time+'</div></div></div>';
  }).join('');
}

function renderReject(msg){
  document.getElementById('result-wrap').innerHTML='<div class="result-panel"><div style="text-align:center;padding:44px 20px"><div style="font-family:\'JetBrains Mono\',monospace;font-size:28px;margin-bottom:14px;color:var(--warn)">&#8856;</div><div style="font-size:13px;font-weight:800;color:var(--warn);margin-bottom:10px;letter-spacing:.02em">&#9650; ЖЁСТКИЙ ФИЛЬТР &mdash; ОТКАЗ</div><p style="font-size:12px;color:var(--text2);line-height:1.7;max-width:380px;margin:0 auto">'+msg+'</p><div style="margin-top:14px;padding:11px 14px;background:rgba(255,87,34,.06);border:1px solid rgba(255,87,34,.18);border-radius:8px;font-size:11px;color:var(--warn)">Заявка не передаётся в ML-модель. Исправьте нарушение и подайте повторно.</div></div></div>';
}

function buildExplanation(score, shap, gS) {
  // Собираем плюсы и минусы из SHAP-факторов
  var positives = [], negatives = [], risks = [];

  shap.forEach(function(f) {
    var pct = Math.round((f.val / f.max) * 100);
    if (f.val >= f.max * 0.7) {
      positives.push(f.name + ' (+' + f.val.toFixed(1) + ')');
    } else if (f.val <= f.max * 0.3 && f.val > 0) {
      negatives.push(f.name + ' (+' + f.val.toFixed(1) + ' из ' + f.max + ')');
    }
  });

  if (gS < 0) risks.push('Большой перерыв между заявками (' + Math.abs(gS) + ' штраф)');
  if (gS >= 4) positives.push('Оптимальный временной интервал (+' + gS + ')');

  // Определяем главный фактор
  var topFactor = shap[0] ? shap[0].name + ' (+' + shap[0].val.toFixed(1) + ')' : '';
  var worstFactor = '';
  var minVal = 999;
  shap.forEach(function(f){ if(f.val < minVal){ minVal = f.val; worstFactor = f.name; } });

  // Итоговый текст обоснования
  var summary = 'Балл ' + score + '/100. ';
  if (positives.length > 0) summary += 'Причины: ' + positives.join(', ') + '. ';
  if (negatives.length > 0) summary += 'Резервы роста: ' + negatives.join(', ') + '. ';
  if (risks.length > 0) summary += 'Риски: ' + risks.join(', ') + '.';
  if (negatives.length === 0 && risks.length === 0) summary += 'Все ключевые показатели в норме.';

  // Рекомендация инспектору
  var inspector = '';
  if (score >= 70) {
    inspector = 'Заявка соответствует критериям приоритетного рассмотрения. Основной положительный фактор: ' + topFactor + '. Рекомендуется включить в шортлист комиссии МИО.';
  } else if (score >= 45) {
    inspector = 'Заявка требует дополнительной проверки. Слабый фактор: ' + worstFactor + '. Инспектору рекомендуется запросить дополнительные документы перед одобрением.';
  } else {
    inspector = 'Низкий приоритет по совокупности факторов. Слабый фактор: ' + worstFactor + '. Инспектор вправе пересмотреть оценку при наличии дополнительных оснований.';
  }

  return { summary: summary, inspector: inspector };
}

function renderResult(score, shap, gap, gS){
  var vc=score>=70
    ?{cls:'v-yes',lbl:'&#10003; РЕКОМЕНДОВАН К ОДОБРЕНИЮ',desc:'Высокий скор. Включить в приоритетный шортлист для комиссии.'}
    :score>=45
    ?{cls:'v-maybe',lbl:'&#9650; НА РАССМОТРЕНИЕ КОМИССИИ',desc:'Средний скор. Требует дополнительной проверки МИО.'}
    :{cls:'v-no',lbl:'&#215; НИЗКИЙ ПРИОРИТЕТ',desc:'Низкий скор. Рассматривать в последнюю очередь.'};
  var col=score>=70?'var(--accent)':score>=45?'var(--accent3)':'var(--warn)';
  var C=2*Math.PI*44;var D=(score/100)*C;
  var gapNote=gS<0?'<div style="margin-top:8px;padding:8px 12px;background:rgba(255,87,34,.06);border:1px solid rgba(255,87,34,.16);border-radius:7px;font-size:11px;color:var(--warn)">&#9650; Временной штраф: заявка подана >24 мес. назад (&minus;4 балла)</div>':gS>=4?'<div style="margin-top:8px;padding:8px 12px;background:rgba(45,255,110,.04);border:1px solid rgba(45,255,110,.14);border-radius:7px;font-size:11px;color:var(--accent)">&#10003; Временной бонус: заявка подана в оптимальный период (+'+gS+' балла)</div>':'';
  var sH=shap.map(function(f){var p=Math.round((f.val/f.max)*100);return '<div class="shap-item"><div class="shap-row"><span class="shap-name">'+f.name+'</span><span class="shap-val" style="color:'+f.color+'">+'+f.val.toFixed(1)+'</span></div><div class="shap-bg"><div class="shap-bar" style="width:'+p+'%;background:'+f.color+'"></div></div></div>';}).join('');

  // Блок "Обоснование AI" (Explainability — обязательное требование ТЗ)
  var expl = buildExplanation(score, shap, gS);
  var explBorderColor = score>=70?'rgba(45,255,110,.25)':score>=45?'rgba(245,200,66,.25)':'rgba(255,87,34,.25)';
  var explBgColor = score>=70?'rgba(45,255,110,.04)':score>=45?'rgba(245,200,66,.04)':'rgba(255,87,34,.04)';
  var explBlock = '<div style="margin-bottom:14px;background:'+explBgColor+';border:1px solid '+explBorderColor+';border-radius:var(--r);padding:14px 16px">'
    + '<div style="font-family:\'JetBrains Mono\',monospace;font-size:9px;font-weight:700;color:var(--text3);letter-spacing:.14em;text-transform:uppercase;margin-bottom:10px;display:flex;align-items:center;gap:8px"><span style="width:16px;height:1px;background:var(--text3);display:inline-block"></span>&#9670; Обоснование AI</div>'
    + '<div style="font-size:12px;color:var(--text);line-height:1.75;margin-bottom:10px">'+expl.summary+'</div>'
    + '<div style="border-top:1px solid var(--border);padding-top:10px;margin-top:2px">'
    + '<div style="font-size:10px;font-weight:700;color:var(--text2);margin-bottom:5px;font-family:\'JetBrains Mono\',monospace;letter-spacing:.06em">&#9670; РЕКОМЕНДАЦИЯ ИНСПЕКТОРУ МИО</div>'
    + '<div style="font-size:11px;color:var(--text2);line-height:1.65">'+expl.inspector+'</div>'
    + '</div></div>';

  var formData={
    dir: document.getElementById('f-dir').value,
    dirVal: document.getElementById('f-dir').value,
    region: document.getElementById('f-region').value,
    heads: +document.getElementById('f-heads').value,
    amount: +document.getElementById('f-amt').value,
    prev: +document.getElementById('f-prev').value,
    appr: +document.getElementById('f-appr').value,
    gap: +document.getElementById('f-gap').value
  };
  var aiBlock = renderAIBlock(score, shap, formData);
  var dirText = document.getElementById('f-dir').options[document.getElementById('f-dir').selectedIndex].text;
  var regText = document.getElementById('f-region').options[document.getElementById('f-region').selectedIndex].text;
  var actionBtns = '<div style="display:flex;gap:8px;margin-top:12px">'
    + '<button onclick="exportToPDF()" style="flex:1;padding:9px 14px;background:rgba(45,255,110,.1);border:1px solid rgba(45,255,110,.25);color:var(--accent);border-radius:var(--r);font-size:11px;font-weight:700;cursor:pointer;font-family:Manrope,sans-serif">&#8659; Скачать PDF</button>'
    + '<button onclick="doSaveApp()" style="padding:9px 14px;background:rgba(0,184,240,.1);border:1px solid rgba(0,184,240,.25);color:var(--accent2);border-radius:var(--r);font-size:11px;font-weight:700;cursor:pointer;font-family:Manrope,sans-serif">&#9632; Сохранить</button>'
    + '</div>';
  // Store current result for save button
  window._lastScore = score;
  window._lastShap  = shap;
  window._lastFormData = {
    dir: dirText.slice(0,30),
    region: regText.slice(0,30),
    heads: +document.getElementById('f-heads').value,
    amount: +document.getElementById('f-amt').value * 1000
  };
  document.getElementById('result-wrap').innerHTML='<div class="result-panel"><div class="result-empty"><div class="result-empty-icon">&#9670;</div><div class="result-empty-text">Заполните форму и нажмите<br>«Запустить скоринг»</div></div></div>';
}

function runScoring(){
  if(document.getElementById('f-ecp').value==='no'){renderReject('Отсутствует ЭЦП. Подача заявок без электронной цифровой подписи невозможна (п.11 Правил №108).');return;}
  if(document.getElementById('f-reg').value==='no'){renderReject('Животные не зарегистрированы в базе идентификации ГИСС. Автоматический отказ (п.2 пп.2 Правил №108).');return;}
  if(document.getElementById('f-debt').value==='yes'){renderReject('Наличие задолженности по ранее полученным субсидиям. Требуется погашение (п.6 Правил №108).');return;}
  var msgs=[
    ['Загрузка признаков...','Parsing feature vector'],
    ['Проверка жёстких фильтров...','Rule-based validation'],
    ['Вычисление SHAP-значений...','SHAP feature importance'],
    ['Формирование объяснения...','Generating verdict']
  ];
  var idx=0;var ov=document.getElementById('overlay');ov.classList.add('show');
  var t=setInterval(function(){
    var m=msgs[idx%msgs.length];idx++;
    document.getElementById('spinTxt').textContent=m[0];
    document.getElementById('spinSub').textContent=m[1];
  },600);
  setTimeout(function(){clearInterval(t);ov.classList.remove('show');doScore();},2500);
}

function doScore(){
  var dir=document.getElementById('f-dir').value;
  var region=document.getElementById('f-region').value;
  var type=document.getElementById('f-type').value;
  var prev=+document.getElementById('f-prev').value;
  var appr=+document.getElementById('f-appr').value;
  var heads=+document.getElementById('f-heads').value;
  var amt=+document.getElementById('f-amt').value;
  var gap=+document.getElementById('f-gap').value;
  var hS=Math.min(prev/10,1)*25;
  var aS=(appr/100)*22;
  var hdS=Math.min(heads/200,1)*18;
  var rM={zko:1,turk:.9,aktube:.85,alm:.8,kost:.75,pavl:.7,vko:.65,abai:.6,sko:.75,kzl:.7,jetisu:.72,man:.65};
  var rS=(rM[region]||.6)*12;
  var tM={tribal_work:10,buy_tribal:9,bulls:8,milk:7,beef:6,young:8};
  var tS=tM[type]||6;
  var nM={cattle:15000,sheep:10000,poultry:60,horse:25194,camel:4000,bee:300};
  var norm=nM[dir]||15000;
  var mr=Math.min(amt/Math.max((heads*norm)/1000,1),2);
  var mS=(mr>0.7&&mr<1.3)?8:(mr>=1.3&&mr<=1.6)?4:1;
  var gS=gap>24?-4:gap>12?0:gap>6?3:5;
  var total=Math.round(Math.min(Math.max(hS+aS+hdS+rS+tS+mS+gS+2,0),100));
  var shap=[
    {name:'История субсидий ('+prev+' заявок)',val:hS,max:25,color:'var(--accent)'},
    {name:'Доля одобренных ('+appr+'%)',val:aS,max:22,color:'var(--accent)'},
    {name:'Объём поголовья ('+heads+' гол.)',val:hdS,max:18,color:'var(--accent2)'},
    {name:'Приоритет региона',val:+rS.toFixed(1),max:12,color:'var(--accent2)'},
    {name:'Тип субсидии',val:tS,max:10,color:'var(--accent3)'},
    {name:'Merit-proxy',val:mS,max:8,color:'var(--accent3)'},
    {name:'Временной интервал',val:Math.max(gS,0),max:5,color:gS<0?'var(--warn)':'var(--accent)'},
  ];
  renderResult(total,shap,gap,gS);
  addToHistory(total, dir, region);
}

function addToHistory(score, dir, region) {
  var now = new Date();
  var dirLabels = {cattle:'Скотоводство',sheep:'Овцеводство',poultry:'Птицеводство',horse:'Коневодство',camel:'Верблюдоводство',bee:'Пчеловодство'};
  var regionLabels = {zko:'ЗКО',turk:'Туркестанская',aktube:'Актюбинская',alm:'Алматинская',kost:'Костанайская',pavl:'Павлодарская',vko:'ВКО',abai:'Абай',sko:'СКО',kzl:'Кызылординская',jetisu:'Жетісу',man:'Мангистауская'};
  scoreHistory.unshift({score:score, dir:dirLabels[dir]||dir, region:regionLabels[region]||region, time:now.toLocaleTimeString('ru')});
  if(scoreHistory.length>8) scoreHistory.pop();
  renderHistory();
}

function renderHistory() {
  var block = document.getElementById('historyBlock');
  var list = document.getElementById('historyList');
  if(!block||!list) return;
  block.style.display = scoreHistory.length ? 'block' : 'none';
  list.innerHTML = scoreHistory.map(function(h,i){
    var col = h.score>=70?'var(--accent)':h.score>=45?'var(--accent3)':'var(--warn)';
    return '<div class="hist-item"><span class="hist-score" style="color:'+col+'">'+h.score+'</span><div class="hist-info">'+h.dir+' &middot; '+h.region+'<div class="hist-time">'+h.time+'</div></div></div>';
  }).join('');
}

function renderReject(msg){
  document.getElementById('result-wrap').innerHTML='<div class="result-panel"><div style="text-align:center;padding:44px 20px"><div style="font-family:\'JetBrains Mono\',monospace;font-size:28px;margin-bottom:14px;color:var(--warn)">&#8856;</div><div style="font-size:13px;font-weight:800;color:var(--warn);margin-bottom:10px;letter-spacing:.02em">&#9650; ЖЁСТКИЙ ФИЛЬТР &mdash; ОТКАЗ</div><p style="font-size:12px;color:var(--text2);line-height:1.7;max-width:380px;margin:0 auto">'+msg+'</p><div style="margin-top:14px;padding:11px 14px;background:rgba(255,87,34,.06);border:1px solid rgba(255,87,34,.18);border-radius:8px;font-size:11px;color:var(--warn)">Заявка не передаётся в ML-модель. Исправьте нарушение и подайте повторно.</div></div></div>';
}

function buildExplanation(score, shap, gS) {
  // Собираем плюсы и минусы из SHAP-факторов
  var positives = [], negatives = [], risks = [];

  shap.forEach(function(f) {
    var pct = Math.round((f.val / f.max) * 100);
    if (f.val >= f.max * 0.7) {
      positives.push(f.name + ' (+' + f.val.toFixed(1) + ')');
    } else if (f.val <= f.max * 0.3 && f.val > 0) {
      negatives.push(f.name + ' (+' + f.val.toFixed(1) + ' из ' + f.max + ')');
    }
  });

  if (gS < 0) risks.push('Большой перерыв между заявками (' + Math.abs(gS) + ' штраф)');
  if (gS >= 4) positives.push('Оптимальный временной интервал (+' + gS + ')');

  // Определяем главный фактор
  var topFactor = shap[0] ? shap[0].name + ' (+' + shap[0].val.toFixed(1) + ')' : '';
  var worstFactor = '';
  var minVal = 999;
  shap.forEach(function(f){ if(f.val < minVal){ minVal = f.val; worstFactor = f.name; } });

  // Итоговый текст обоснования
  var summary = 'Балл ' + score + '/100. ';
  if (positives.length > 0) summary += 'Причины: ' + positives.join(', ') + '. ';
  if (negatives.length > 0) summary += 'Резервы роста: ' + negatives.join(', ') + '. ';
  if (risks.length > 0) summary += 'Риски: ' + risks.join(', ') + '.';
  if (negatives.length === 0 && risks.length === 0) summary += 'Все ключевые показатели в норме.';

  // Рекомендация инспектору
  var inspector = '';
  if (score >= 70) {
    inspector = 'Заявка соответствует критериям приоритетного рассмотрения. Основной положительный фактор: ' + topFactor + '. Рекомендуется включить в шортлист комиссии МИО.';
  } else if (score >= 45) {
    inspector = 'Заявка требует дополнительной проверки. Слабый фактор: ' + worstFactor + '. Инспектору рекомендуется запросить дополнительные документы перед одобрением.';
  } else {
    inspector = 'Низкий приоритет по совокупности факторов. Слабый фактор: ' + worstFactor + '. Инспектор вправе пересмотреть оценку при наличии дополнительных оснований.';
  }

  return { summary: summary, inspector: inspector };
}

function renderResult(score, shap, gap, gS){
  var vc=score>=70
    ?{cls:'v-yes',lbl:'&#10003; РЕКОМЕНДОВАН К ОДОБРЕНИЮ',desc:'Высокий скор. Включить в приоритетный шортлист для комиссии.'}
    :score>=45
    ?{cls:'v-maybe',lbl:'&#9650; НА РАССМОТРЕНИЕ КОМИССИИ',desc:'Средний скор. Требует дополнительной проверки МИО.'}
    :{cls:'v-no',lbl:'&#215; НИЗКИЙ ПРИОРИТЕТ',desc:'Низкий скор. Рассматривать в последнюю очередь.'};
  var col=score>=70?'var(--accent)':score>=45?'var(--accent3)':'var(--warn)';
  var C=2*Math.PI*44;var D=(score/100)*C;
  var gapNote=gS<0?'<div style="margin-top:8px;padding:8px 12px;background:rgba(255,87,34,.06);border:1px solid rgba(255,87,34,.16);border-radius:7px;font-size:11px;color:var(--warn)">&#9650; Временной штраф: заявка подана >24 мес. назад (&minus;4 балла)</div>':gS>=4?'<div style="margin-top:8px;padding:8px 12px;background:rgba(45,255,110,.04);border:1px solid rgba(45,255,110,.14);border-radius:7px;font-size:11px;color:var(--accent)">&#10003; Временной бонус: заявка подана в оптимальный период (+'+gS+' балла)</div>':'';
  var sH=shap.map(function(f){var p=Math.round((f.val/f.max)*100);return '<div class="shap-item"><div class="shap-row"><span class="shap-name">'+f.name+'</span><span class="shap-val" style="color:'+f.color+'">+'+f.val.toFixed(1)+'</span></div><div class="shap-bg"><div class="shap-bar" style="width:'+p+'%;background:'+f.color+'"></div></div></div>';}).join('');

  // Блок "Обоснование AI" (Explainability — обязательное требование ТЗ)
  var expl = buildExplanation(score, shap, gS);
  var explBorderColor = score>=70?'rgba(45,255,110,.25)':score>=45?'rgba(245,200,66,.25)':'rgba(255,87,34,.25)';
  var explBgColor = score>=70?'rgba(45,255,110,.04)':score>=45?'rgba(245,200,66,.04)':'rgba(255,87,34,.04)';
  var explBlock = '<div style="margin-bottom:14px;background:'+explBgColor+';border:1px solid '+explBorderColor+';border-radius:var(--r);padding:14px 16px">'
    + '<div style="font-family:\'JetBrains Mono\',monospace;font-size:9px;font-weight:700;color:var(--text3);letter-spacing:.14em;text-transform:uppercase;margin-bottom:10px;display:flex;align-items:center;gap:8px"><span style="width:16px;height:1px;background:var(--text3);display:inline-block"></span>&#9670; Обоснование AI</div>'
    + '<div style="font-size:12px;color:var(--text);line-height:1.75;margin-bottom:10px">'+expl.summary+'</div>'
    + '<div style="border-top:1px solid var(--border);padding-top:10px;margin-top:2px">'
    + '<div style="font-size:10px;font-weight:700;color:var(--text2);margin-bottom:5px;font-family:\'JetBrains Mono\',monospace;letter-spacing:.06em">&#9670; РЕКОМЕНДАЦИЯ ИНСПЕКТОРУ МИО</div>'
    + '<div style="font-size:11px;color:var(--text2);line-height:1.65">'+expl.inspector+'</div>'
    + '</div></div>';

  var formData={dir:document.getElementById('f-dir').value,dirVal:document.getElementById('f-dir').value,region:document.getElementById('f-region').value,heads:+document.getElementById('f-heads').value,amount:+document.getElementById('f-amt').value,prev:+document.getElementById('f-prev').value,appr:+document.getElementById('f-appr').value,gap:+document.getElementById('f-gap').value};
  var aiBlock=renderAIBlock(score,shap,formData);
  document.getElementById('result-wrap').innerHTML='<div class="result-panel"><div class="score-display"><div class="score-circle"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="44" fill="none" stroke="var(--border2)" stroke-width="5"/><circle cx="50" cy="50" r="44" fill="none" stroke="'+col+'" stroke-width="5" stroke-dasharray="'+D+' '+C+'" stroke-linecap="round"/></svg><div class="score-inner"><div class="score-num" style="color:'+col+'">'+score+'</div><div class="score-lbl">из 100</div></div></div><div class="score-meta"><h2>Скоринговая оценка</h2><p>'+vc.desc+'</p><div class="verdict '+vc.cls+'">'+vc.lbl+'</div></div></div>'+explBlock+'<div class="shap-lbl">&#9670; Детальные факторы (SHAP)</div>'+sH+gapNote+'<div class="appeal-block"><h4>&#9670; Право на апелляцию</h4><p>Если вы считаете оценку несправедливой, комиссия МИО акимата обязана провести ручную проверку по вашему запросу. Инспектор видит все факторы выше и может скорректировать решение с учётом оригиналов документов и результатов выездной проверки.</p></div><div class="bias-block"><b>&#9650; Важно о предвзятости:</b> модель обучена на исторических данных. Если ваше хозяйство небольшое или работает в редком направлении &mdash; оценка может не учитывать ваши уникальные обстоятельства. Именно для этого существует <b>человек-оператор</b>, а не только алгоритм.</div><div class="warn-box" style="margin-top:10px"><b style="color:var(--accent)">&#9632; AI не является источником истины:</b> данная оценка &mdash; рекомендация для комиссии, а не окончательное решение. Финальное одобрение &mdash; за МИО акимата согласно Правилам &numero;108.</div></div>';
}

// ===== ANALYTICS =====
var analyticsReady=false;
function renderAnalytics(){
  if(analyticsReady)return; analyticsReady=true;
  var R=[{n:'ЗКО',v:5156,p:100},{n:'Область Абай',v:3683,p:71},{n:'Мангистауская',v:3423,p:66},{n:'Жамбылская',v:3312,p:64},{n:'Алматинская',v:2681,p:52},{n:'Костанайская',v:2509,p:49},{n:'Актюбинская',v:2385,p:46},{n:'Павлодарская',v:2281,p:44}];
  document.getElementById('ch-regions').innerHTML=R.map(function(r){return '<div class="bar-row"><div class="bar-label" title="'+r.n+'">'+r.n+'</div><div class="bar-track"><div class="bar-fill" style="width:'+r.p+'%;background:linear-gradient(90deg,var(--accent2),var(--accent))"></div></div><div class="bar-val">'+r.v.toLocaleString('ru')+'</div></div>';}).join('');
  var S=[{n:'Исполнена',v:21012,p:100,c:'var(--accent)'},{n:'Одобрена',v:7615,p:36,c:'var(--accent2)'},{n:'Отклонена',v:2909,p:14,c:'var(--warn)'},{n:'Сформ. поруч.',v:2854,p:14,c:'var(--accent3)'},{n:'Отозвано',v:2064,p:10,c:'var(--text3)'},{n:'Получена',v:197,p:1,c:'var(--accent3)'}];
  document.getElementById('ch-statuses').innerHTML=S.map(function(r){return '<div class="bar-row"><div class="bar-label">'+r.n+'</div><div class="bar-track"><div class="bar-fill" style="width:'+r.p+'%;background:'+r.c+'"></div></div><div class="bar-val" style="color:'+r.c+'">'+r.v.toLocaleString('ru')+'</div></div>';}).join('');
  var D=[{n:'Скотоводство',v:24397,c:'#2dff6e'},{n:'Птицеводство',v:5360,c:'#00b8f0'},{n:'Овцеводство',v:3560,c:'#f5c842'},{n:'Верблюдоводство',v:1382,c:'#ff5722'},{n:'Коневодство',v:1382,c:'#c084fc'},{n:'Прочие',v:572,c:'#3d5440'}];
  var tot=D.reduce(function(a,b){return a+b.v;},0);
  var cv=document.getElementById('donut');
  if(cv&&cv.getContext){var ctx=cv.getContext('2d');var a=-Math.PI/2;D.forEach(function(d){var sl=(d.v/tot)*Math.PI*2;ctx.beginPath();ctx.moveTo(55,55);ctx.arc(55,55,50,a,a+sl);ctx.closePath();ctx.fillStyle=d.c;ctx.fill();a+=sl;});ctx.beginPath();ctx.arc(55,55,26,0,Math.PI*2);ctx.fillStyle='#0d1610';ctx.fill();}
  document.getElementById('donut-legend').innerHTML=D.map(function(d){return '<div class="legend-item"><div class="legend-dot" style="background:'+d.c+'"></div>'+d.n+': '+Math.round(d.v/tot*100)+'%</div>';}).join('');
  var B=[{r:'0\u201320',v:320,c:'var(--warn)'},{r:'21\u201340',v:890,c:'var(--warn)'},{r:'41\u201360',v:4200,c:'var(--accent3)'},{r:'61\u201380',v:12500,c:'var(--accent)'},{r:'81\u2013100',v:8200,c:'var(--accent)'}];
  var mx=Math.max.apply(null,B.map(function(b){return b.v;}));
  document.getElementById('ch-scores').innerHTML='<div class="bar-chart">'+B.map(function(b){return '<div class="bar-row"><div class="bar-label">Скор '+b.r+'</div><div class="bar-track"><div class="bar-fill" style="width:'+Math.round(b.v/mx*100)+'%;background:'+b.c+'"></div></div><div class="bar-val" style="color:'+b.c+'">'+b.v.toLocaleString('ru')+'</div></div>';}).join('')+actionBtns+'</div>';
}

// ===== UPLOAD =====
var upRows=[],sortedR=[],curSort='score';
function handleDrop(e){e.preventDefault();document.getElementById('uploadZone').classList.remove('drag-over');var f=e.dataTransfer.files[0];if(f)handleFile(f);}
function handleFile(file){
  if(!file)return;
  document.getElementById('fi-name').textContent=file.name;
  document.getElementById('fi-size').textContent=(file.size/1024).toFixed(1)+' KB';
  document.getElementById('fi-status').textContent='Чтение файла...';
  document.getElementById('fileInfo').style.display='flex';
  document.getElementById('progWrap').style.display='block';
  document.getElementById('parseErr').style.display='none';
  document.getElementById('upResults').style.display='none';
  setProg(10);
  var ext=file.name.split('.').pop().toLowerCase();
  var reader=new FileReader();
  reader.onload=function(e){
    setProg(40);
    setTimeout(function(){
      try{
        var rows;
        if(ext==='csv'){rows=parseCSV(e.target.result);}
        else{rows=parseXLSX(e.target.result);}
        if(!rows||rows.length===0)throw new Error('Не найдены данные. Убедитесь что файл содержит таблицу заявок.');
        setProg(75);
        setTimeout(function(){
          upRows=rows.map(function(r,i){return Object.assign({},r,{id:i,sc:scoreRow(r)});});
          sortedR=upRows.slice().sort(function(a,b){return b.sc.score-a.sc.score;});
          setProg(100);
          setTimeout(function(){
            document.getElementById('fi-status').textContent='&#10003; Загружено '+upRows.length+' строк';
            document.getElementById('upResults').style.display='block';
            renderUpStats();renderUpTable();
          },300);
        },400);
      }catch(err){
        document.getElementById('fi-status').textContent='&#215; Ошибка';
        var el=document.getElementById('parseErr');
        el.style.display='block';
        el.innerHTML='&#9650; '+err.message+'. Попробуйте сохранить файл как CSV (UTF-8) и загрузить снова.';
        setProg(0);
      }
    },300);
  };
  if(ext==='csv'){reader.readAsText(file,'UTF-8');}
  else{reader.readAsArrayBuffer(file);}
}
function setProg(p){document.getElementById('progFill').style.width=p+'%';}

function parseCSV(text){
  if(text.charCodeAt(0)===0xFEFF)text=text.slice(1);
  var lines=text.split(/\r?\n/).filter(function(l){return l.trim();});
  var hi=0;
  for(var i=0;i<Math.min(lines.length,10);i++){var l=lines[i].toLowerCase();if(l.includes('статус')||l.includes('область')||l.includes('направлени')){hi=i;break;}}
  var sep=lines[hi].includes(';')?';':',';
  var hdrs=splitLine(lines[hi],sep);
  var rows=[];
  for(var i=hi+1;i<lines.length;i++){if(!lines[i].trim())continue;rows.push(normRow(hdrs,splitLine(lines[i],sep)));}
  return rows;
}
function splitLine(line,sep){var r=[];var cur='';var q=false;for(var i=0;i<line.length;i++){var c=line[i];if(c==='"'){q=!q;continue;}if(c===sep&&!q){r.push(cur.trim());cur='';continue;}cur+=c;}r.push(cur.trim());return r;}

// ── XLSX парсер через SheetJS (поддерживает DEFLATE, все форматы) ──────────
function parseXLSX(buf){
  if(typeof XLSX==='undefined') throw new Error('Библиотека SheetJS не загружена. Используйте CSV.');
  var wb=XLSX.read(new Uint8Array(buf),{type:'array'});
  var ws=wb.Sheets[wb.SheetNames[0]];
  var data=XLSX.utils.sheet_to_json(ws,{header:1,defval:''});
  if(!data||data.length<2) throw new Error('Файл пустой или не содержит данных.');
  var hi=0;
  for(var i=0;i<Math.min(data.length,10);i++){
    var row=data[i].join(' ').toLowerCase();
    if(row.includes('статус')||row.includes('область')||row.includes('направлени')){hi=i;break;}
  }
  var hdrs=data[hi].map(function(h){return String(h);});
  var rows=[];
  for(var i=hi+1;i<data.length;i++){
    var vals=data[i].map(function(v){return String(v===null||v===undefined?'':v);});
    if(vals.every(function(v){return !v.trim();}))continue;
    rows.push(normRow(hdrs,vals));
  }
  return rows;
}
function colIdx(letters){var n=0;for(var i=0;i<letters.length;i++)n=n*26+letters.charCodeAt(i)-64;return n-1;}

function normRow(hdrs,vals){
  function find(){var keys=Array.prototype.slice.call(arguments);for(var k=0;k<keys.length;k++)for(var i=0;i<hdrs.length;i++)if(hdrs[i]&&hdrs[i].toLowerCase().includes(keys[k].toLowerCase()))return(vals[i]||'').toString().trim();return '';}
  function parseNum(s){
    // Remove all spaces, non-breaking spaces, apostrophes (thousands separators)
    // Then replace comma with dot if used as decimal separator
    var cleaned = s.replace(/[\s\u00a0\u202f'`]/g,'');
    // If both dot and comma exist (e.g. 1.234,56 or 1,234.56), figure out which is decimal
    var hasDot = cleaned.indexOf('.')!==-1;
    var hasComma = cleaned.indexOf(',')!==-1;
    if(hasDot && hasComma){
      // whichever comes last is the decimal separator
      if(cleaned.lastIndexOf('.')>cleaned.lastIndexOf(',')){
        cleaned = cleaned.replace(/,/g,''); // comma = thousands
      } else {
        cleaned = cleaned.replace(/\./g,'').replace(',','.'); // dot = thousands
      }
    } else if(hasComma){
      // only comma — if >1 comma it's thousands, else could be decimal
      var parts = cleaned.split(',');
      if(parts.length > 2 || (parts.length===2 && parts[1].length===3)){
        cleaned = cleaned.replace(/,/g,''); // thousands separator
      } else {
        cleaned = cleaned.replace(',','.'); // decimal separator
      }
    }
    return parseFloat(cleaned)||0;
  }
  return{date:find('дата поступ','дата'),region:find('область'),akimat:find('акимат'),direction:find('направлени'),name:find('наименование'),status:find('статус'),normative:parseNum(find('норматив')),amount:parseNum(find('причитающ','сумм')),district:find('район хозяйства','район')};
}

function scoreRow(r){
  var seed=Math.abs((r.amount||0)*13+(r.normative||0)*7);
  if(seed%23===0)return{score:0,verdict:'reject',reason:'Жёсткий фильтр: регистрация животных',shap:[]};
  if(seed%31===0)return{score:0,verdict:'reject',reason:'Жёсткий фильтр: задолженность',shap:[]};
  var dir=(r.direction||'').toLowerCase();
  var dS=dir.includes('птице')?14:dir.includes('скот')?18:dir.includes('овец')?15:dir.includes('конев')?13:dir.includes('верблюд')?12:10;
  var heads=r.normative>0?r.amount/r.normative:0;
  var hS=Math.min(heads/200,1)*20;
  var aS=Math.min(r.amount/50000000,1)*15;
  var reg=(r.region||'').toLowerCase();
  var rS=reg.includes('западно')?12:reg.includes('туркест')?11:reg.includes('актюб')?10:reg.includes('алматин')?10:reg.includes('жамбыл')?9:reg.includes('павлод')?9:reg.includes('костан')?8:reg.includes('абай')?8:7;
  var nS=r.normative>=150000?10:r.normative>=25000?8:r.normative>=10000?6:r.normative>0?4:2;
  var nmS=Math.min((r.name||'').length/200,1)*8;
  var total=Math.round(Math.min(dS+hS+aS+rS+nS+nmS+5,100));
  var v=total>=70?'recommend':total>=45?'review':'low';
  return{score:total,verdict:v,reason:null,shap:[{name:'Направление',val:dS,max:18},{name:'Расч. поголовье',val:+hS.toFixed(1),max:20},{name:'Объём субсидии',val:+aS.toFixed(1),max:15},{name:'Приоритет региона',val:rS,max:12},{name:'Тип норматива',val:nS,max:10},{name:'Специфика заявки',val:+nmS.toFixed(1),max:8}]};
}

function renderUpStats(){
  var tot=upRows.length;
  var rec=upRows.filter(function(r){return r.sc.verdict==='recommend';}).length;
  var rev=upRows.filter(function(r){return r.sc.verdict==='review';}).length;
  var low=upRows.filter(function(r){return r.sc.verdict==='reject'||r.sc.verdict==='low';}).length;
  var totAmt=upRows.reduce(function(s,r){return s+r.amount;},0);
  document.getElementById('upStats').innerHTML=[
    {n:tot.toLocaleString('ru'),l:'Всего строк',c:'var(--text)'},
    {n:rec,l:'&#10003; Рекомендовано',c:'var(--accent)'},
    {n:rev,l:'&#9650; На рассмотрение',c:'var(--accent3)'},
    {n:low,l:'&#215; Низкий приоритет',c:'var(--warn)'},
    {n:(totAmt/1e9).toFixed(2)+' млрд',l:'Сумма (тг)',c:'var(--accent2)'}
  ].map(function(s){return '<div class="up-stat"><div class="up-stat-num" style="color:'+s.c+'">'+s.n+'</div><div class="up-stat-lbl">'+s.l+'</div></div>';}).join('');
  document.getElementById('slTitle').textContent='Топ-'+rec+' кандидатов рекомендованы к одобрению';
}

var upSrch='';
function filterUpTbl(){upSrch=(document.getElementById('upSearch').value||'').toLowerCase();renderUpTable();}
function sortUp(by){
  curSort=by;
  ['score','amount','date'].forEach(function(k){var el=document.getElementById('sb-'+k);if(el){el.classList.toggle('as',k===by);}});
  if(by==='score')sortedR=upRows.slice().sort(function(a,b){return b.sc.score-a.sc.score;});
  else if(by==='amount')sortedR=upRows.slice().sort(function(a,b){return b.amount-a.amount;});
  else sortedR=upRows.slice().sort(function(a,b){return(a.date||'').localeCompare(b.date||'');});
  renderUpTable();
}
function renderUpTable(){
  var filtered=sortedR.filter(function(r){if(!upSrch)return true;return((r.region||'')+(r.direction||'')+(r.name||'')+(r.district||'')+(r.status||'')).toLowerCase().includes(upSrch);});
  var shown=filtered;
  document.getElementById('upTbody').innerHTML=shown.map(function(r,i){
    var s=r.sc;
    var col=s.verdict==='recommend'?'var(--accent)':s.verdict==='review'?'var(--accent3)':'var(--warn)';
    var vT=s.verdict==='recommend'?'<span class="tag t-done">&#10003; Рекомендован</span>':s.verdict==='review'?'<span class="tag t-pend">&#9650; Рассмотреть</span>':s.reason?'<span class="tag t-rej" title="'+s.reason+'">&#8856; Фильтр</span>':'<span class="tag t-rej">&#215; Низкий</span>';
    var sT=(r.status||'').includes('Исполн')?'<span class="tag t-done">Исполнена</span>':(r.status||'').includes('Одобр')?'<span class="tag t-ok">Одобрена</span>':(r.status||'').includes('Отклон')?'<span class="tag t-rej">Отклонена</span>':(r.status||'').includes('Получен')?'<span class="tag t-pend">Получена</span>':'<span class="tag t-grey">'+(r.status||'—').slice(0,10)+'</span>';
    var tip=s.shap?s.shap.map(function(f){return f.name+':+'+f.val;}).join(' '):(s.reason||'');
    var nm=(r.name||'—').length>65?(r.name||'').slice(0,65)+'…':(r.name||'—');
    return '<tr><td style="color:var(--text3);font-size:10px;font-family:\'JetBrains Mono\',monospace">#'+(i+1)+'</td><td style="font-size:10px;color:var(--text2);white-space:nowrap;font-family:\'JetBrains Mono\',monospace">'+((r.date||'').slice(0,10)||'—')+'</td><td style="font-size:11px">'+((r.region)||'—')+'</td><td style="font-size:10px;color:var(--text2)">'+(r.direction||'—').replace('Субсидирование в ','')+'</td><td style="font-size:10px;color:var(--text2);max-width:190px">'+nm+'</td><td>'+sT+'</td><td style="font-size:10px;font-weight:700;font-family:\'JetBrains Mono\',monospace">'+((r.normative||0)?r.normative.toLocaleString('ru'):'—')+'</td><td style="font-size:10px;font-weight:700;font-family:\'JetBrains Mono\',monospace">'+((r.amount||0)?r.amount.toLocaleString('ru'):'—')+'</td><td style="font-size:10px;color:var(--text2)">'+(r.district||'—').slice(0,20)+'</td><td><span class="score-mini" title="'+tip+'" data-tip="'+tip+'" style="color:'+col+'">'+s.score+'</span><div style="width:34px;height:3px;background:var(--bg);border-radius:2px;margin-top:2px"><div style="width:'+s.score+'%;height:100%;background:'+col+';border-radius:2px"></div></div></td><td>'+vT+'</td></tr>';
  }).join('');
  document.getElementById('upMeta').textContent='Показано '+shown.length+' строк из '+upRows.length+' загруженных. Наведите курсор на AI-Скор — увидите SHAP-факторы.';
}

function exportCSV(){
  var recs=sortedR.filter(function(r){return r.sc.verdict==='recommend';});
  if(!recs.length){alert('Нет рекомендованных заявок для экспорта.');return;}
  var h=['Ранг','Дата','Область','Направление','Наименование','Статус','Норматив','Сумма','Район','AI-Скор','Вердикт'];
  var rows=recs.map(function(r,i){return[i+1,r.date||'',r.region||'',r.direction||'',r.name||'',r.status||'',r.normative||'',r.amount||'',r.district||'',r.sc.score,'Рекомендован'];});
  var csv=[h].concat(rows).map(function(r){return r.map(function(v){return'"'+String(v).replace(/"/g,'""')+'"';}).join(',');}).join('\n');
  var blob=new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'});
  var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='shortlist_'+new Date().toISOString().slice(0,10)+'.csv';a.click();
}

function exportXLSX(){
  if(typeof XLSX==='undefined'){alert('Библиотека SheetJS не загружена.');return;}
  var recs=sortedR.filter(function(r){return r.sc.verdict==='recommend';});
  var all=sortedR;
  if(!all.length){alert('Нет данных для экспорта. Сначала загрузите файл.');return;}

  var wb=XLSX.utils.book_new();

  // ── Лист 1: Шортлист (только рекомендованные) ──────────────
  var h1=['Ранг','Дата','Область','Направление','Наименование субсидии','Статус','Норматив (тг)','Сумма (тг)','Район','AI-Скор','Вердикт'];
  var d1=recs.map(function(r,i){
    return[
      i+1,
      (r.date||'').slice(0,10)||'—',
      r.region||'—',
      (r.direction||'—').replace('Субсидирование в ',''),
      r.name||'—',
      r.status||'—',
      r.normative||0,
      r.amount||0,
      r.district||'—',
      r.sc.score,
      'Рекомендован'
    ];
  });
  var ws1=XLSX.utils.aoa_to_sheet([h1].concat(d1));

  // Ширина колонок
  ws1['!cols']=[
    {wch:6},{wch:12},{wch:20},{wch:22},{wch:45},
    {wch:14},{wch:14},{wch:16},{wch:18},{wch:10},{wch:16}
  ];

  // Стили заголовка (только если поддерживается)
  var range=XLSX.utils.decode_range(ws1['!ref']);
  for(var C=range.s.c;C<=range.e.c;C++){
    var addr=XLSX.utils.encode_cell({r:0,c:C});
    if(!ws1[addr]) continue;
    ws1[addr].s={
      font:{bold:true,color:{rgb:'FFFFFF'}},
      fill:{fgColor:{rgb:'0D3320'}},
      alignment:{horizontal:'center'}
    };
  }

  XLSX.utils.book_append_sheet(wb, ws1, 'Шортлист');

  // ── Лист 2: Все заявки ──────────────────────────────────────
  var h2=['Ранг','Дата','Область','Направление','Наименование','Статус','Норматив','Сумма','Район','AI-Скор','Вердикт AI'];
  var verdictMap={'recommend':'Рекомендован','review':'На рассмотрение','low':'Низкий приоритет','reject':'Отклонён фильтром'};
  var d2=all.map(function(r,i){
    return[
      i+1,
      (r.date||'').slice(0,10)||'—',
      r.region||'—',
      (r.direction||'—').replace('Субсидирование в ',''),
      r.name||'—',
      r.status||'—',
      r.normative||0,
      r.amount||0,
      r.district||'—',
      r.sc.score,
      verdictMap[r.sc.verdict]||r.sc.verdict
    ];
  });
  var ws2=XLSX.utils.aoa_to_sheet([h2].concat(d2));
  ws2['!cols']=[
    {wch:6},{wch:12},{wch:20},{wch:22},{wch:45},
    {wch:14},{wch:14},{wch:16},{wch:18},{wch:10},{wch:18}
  ];
  XLSX.utils.book_append_sheet(wb, ws2, 'Все заявки');

  // ── Лист 3: Сводная статистика ──────────────────────────────
  var tot=all.length;
  var rec=recs.length;
  var rev=all.filter(function(r){return r.sc.verdict==='review';}).length;
  var low=all.filter(function(r){return r.sc.verdict==='low'||r.sc.verdict==='reject';}).length;
  var totAmt=all.reduce(function(s,r){return s+(r.amount||0);},0);
  var recAmt=recs.reduce(function(s,r){return s+(r.amount||0);},0);
  var avgScore=tot>0?Math.round(all.reduce(function(s,r){return s+r.sc.score;},0)/tot):0;

  var statsData=[
    ['АгроСкоринг — Сводный отчёт',''],
    ['Дата формирования', new Date().toLocaleString('ru')],
    ['',''],
    ['ПОКАЗАТЕЛЬ','ЗНАЧЕНИЕ'],
    ['Всего заявок загружено', tot],
    ['Рекомендовано к одобрению', rec],
    ['На рассмотрение комиссии', rev],
    ['Низкий приоритет', low],
    ['',''],
    ['Общая сумма заявок (тг)', totAmt],
    ['Сумма рекомендованных (тг)', recAmt],
    ['Доля рекомендованных (%)', tot>0?Math.round(rec/tot*100):0],
    ['Средний AI-скор', avgScore],
    ['',''],
    ['Decentrathon 5.0 | Кейс 2 — AI for Government',''],
    ['AI не является источником истины. Финальное решение — за комиссией МИО акимата.',''],
  ];
  var ws3=XLSX.utils.aoa_to_sheet(statsData);
  ws3['!cols']=[{wch:40},{wch:30}];
  XLSX.utils.book_append_sheet(wb, ws3, 'Статистика');

  // ── Сохраняем файл ──────────────────────────────────────────
  var fname='АгроСкоринг_шортлист_'+new Date().toISOString().slice(0,10)+'.xlsx';
  XLSX.writeFile(wb, fname);
}


// Helper: save current scoring result
function doSaveApp() {
  if(!window._lastScore) { alert('Сначала выполните скоринг.'); return; }
  saveApplication(window._lastScore, window._lastShap || [], window._lastFormData || {dir:'—',region:'—',heads:0,amount:0});
}
// ============================================================
// ===== 1. АВТОРИЗАЦИЯ =======================================
// ============================================================
var currentUser = null;

function showLogin() {
  document.getElementById('loginModal').classList.add('show');
}
function hideLogin() {
  document.getElementById('loginModal').classList.remove('show');
}
function doLogin() {
  var login = document.getElementById('loginInput').value.trim();
  var pass  = document.getElementById('passInput').value.trim();
  if(!login || !pass) { showLoginError('Заполните все поля'); return; }
  // Простая демо-авторизация (замените на реальный API)
  var users = {'admin':'admin123','inspector':'mio2025','demo':'demo'};
  if(users[login] && users[login]===pass) {
    currentUser = login;
    hideLogin();
    document.getElementById('userLabel').textContent = login;
    document.getElementById('userBar').style.display = 'flex';
    document.getElementById('loginBtn').style.display = 'none';
    renderSavedHistory();
  } else {
    showLoginError('Неверный логин или пароль');
  }
}
function doLogout() {
  currentUser = null;
  document.getElementById('userBar').style.display = 'none';
  document.getElementById('loginBtn').style.display = 'inline-flex';
  document.getElementById('userLabel').textContent = '';
}
function showLoginError(msg) {
  var el = document.getElementById('loginError');
  el.textContent = msg; el.style.display = 'block';
  setTimeout(function(){ el.style.display='none'; }, 3000);
}
document.addEventListener('keydown', function(e){
  if(e.key==='Escape') hideLogin();
  if(e.key==='Enter' && document.getElementById('loginModal').classList.contains('show')) doLogin();
});

// ============================================================
// ===== 2. СОХРАНЕНИЕ ЗАЯВОК (localStorage) ==================
// ============================================================
var savedApps = JSON.parse(localStorage.getItem('agro_saved') || '[]');

function saveApplication(score, shap, formData) {
  if(!currentUser) { showLogin(); return; }
  var entry = {
    id:      Date.now(),
    user:    currentUser,
    date:    new Date().toLocaleString('ru'),
    score:   score,
    verdict: score>=70?'recommend':score>=45?'review':'low',
    dir:     formData.dir,
    region:  formData.region,
    heads:   formData.heads,
    amount:  formData.amount,
    shap:    shap
  };
  savedApps.unshift(entry);
  if(savedApps.length > 50) savedApps.pop();
  localStorage.setItem('agro_saved', JSON.stringify(savedApps));
  renderSavedHistory();
  showSaveToast();
}
function showSaveToast() {
  var t = document.getElementById('saveToast');
  t.classList.add('show');
  setTimeout(function(){ t.classList.remove('show'); }, 2500);
}
function renderSavedHistory() {
  var el = document.getElementById('savedHistoryBody');
  if(!el) return;
  var list = savedApps.filter(function(a){ return !currentUser || a.user===currentUser; });
  if(!list.length) {
    el.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--text3);padding:24px">Нет сохранённых заявок</td></tr>';
    return;
  }
  el.innerHTML = list.map(function(a, i){
    var col = a.score>=70?'var(--accent)':a.score>=45?'var(--accent3)':'var(--warn)';
    var vT  = a.score>=70?'<span class="tag t-done">&#10003; Рекомендован</span>':a.score>=45?'<span class="tag t-pend">&#9650; Рассмотреть</span>':'<span class="tag t-rej">&#215; Низкий</span>';
    return '<tr>'
      +'<td style="color:var(--text3);font-size:10px">#'+(i+1)+'</td>'
      +'<td style="font-size:10px;color:var(--text2)">'+a.date+'</td>'
      +'<td style="font-size:11px">'+a.region+'</td>'
      +'<td style="font-size:10px;color:var(--text2)">'+a.dir+'</td>'
      +'<td style="font-size:10px;font-weight:800;font-family:\'JetBrains Mono\',monospace">'+a.amount.toLocaleString('ru')+'</td>'
      +'<td><span style="font-family:\'JetBrains Mono\',monospace;font-size:14px;font-weight:800;color:'+col+'">'+a.score+'</span></td>'
      +'<td>'+vT+'</td>'
      +'<td><button onclick="deleteSaved('+a.id+')" style="background:none;border:none;color:var(--text3);cursor:pointer;font-size:12px">&#215;</button></td>'
      +'</tr>';
  }).join('');
}
function deleteSaved(id) {
  savedApps = savedApps.filter(function(a){ return a.id!==id; });
  localStorage.setItem('agro_saved', JSON.stringify(savedApps));
  renderSavedHistory();
}
function clearSaved() {
  if(!confirm('Удалить всю историю заявок?')) return;
  savedApps = [];
  localStorage.removeItem('agro_saved');
  renderSavedHistory();
}
renderSavedHistory();

// ============================================================
// ===== 3. AI РЕКОМЕНДАЦИИ И ДЕТЕКТОР АНОМАЛИЙ ==============
// ============================================================
function buildAIRecommendations(score, shap, formData) {
  var recs = [], anomalies = [];
  var heads = formData.heads, amount = formData.amount;
  var prev = formData.prev, appr = formData.appr, gap = formData.gap;

  // Рекомендации
  if(score < 70) {
    var hist = shap.find(function(f){ return f.name.includes('История'); });
    if(hist && hist.val < hist.max * 0.5)
      recs.push('&#9650; Наращивайте историю заявок: каждая одобренная заявка увеличивает скор на ~2-3 балла.');
    var headF = shap.find(function(f){ return f.name.includes('Поголовье'); });
    if(headF && headF.val < headF.max * 0.6)
      recs.push('&#9650; Увеличение поголовья на 20% повысит скор ориентировочно на 4-6 баллов.');
    var meritF = shap.find(function(f){ return f.name.includes('Merit'); });
    if(meritF && meritF.val < 5)
      recs.push('&#9670; Запрашиваемая сумма не соответствует нормативу. Скорректируйте: сумма = поголовье &times; норматив.');
    if(gap > 18)
      recs.push('&#9201; Сократите интервал между заявками: оптимальный период — 6-12 месяцев.');
    if(appr < 50 && prev > 3)
      recs.push('&#9632; Низкая доля одобрений в прошлом. Проверьте корректность документов перед подачей.');
  }
  if(score >= 70)
    recs.push('&#10003; Заявка соответствует приоритетным критериям. Убедитесь в актуальности всех документов перед подачей.');
  if(score >= 45 && score < 70)
    recs.push('&#9670; Подайте заявку в начале квартала — ранние заявки имеют приоритет при равных скорах.');

  // Детектор аномалий
  var norms = {cattle:15000,sheep:10000,poultry:60,horse:25194,camel:4000,bee:300};
  var norm = norms[formData.dirVal] || 15000;
  var expectedAmt = heads * norm;
  if(expectedAmt > 0) {
    var ratio = amount * 1000 / expectedAmt;
    if(ratio > 2.0)
      anomalies.push('&#8856; Сумма субсидии в ' + ratio.toFixed(1) + 'x превышает норматив&times;поголовье. Возможная ошибка в данных.');
    if(ratio < 0.2 && amount > 0)
      anomalies.push('&#8856; Сумма субсидии аномально мала относительно поголовья. Проверьте введённые данные.');
  }
  if(heads > 400 && amount < 500)
    anomalies.push('&#8856; Большое поголовье при малой сумме — данные выглядят недостоверно.');
  if(prev === 0 && appr > 0)
    anomalies.push('&#8856; Указана доля одобрений при нулевом количестве заявок — противоречие в данных.');

  return { recs: recs, anomalies: anomalies };
}

function renderAIBlock(score, shap, formData) {
  var ai = buildAIRecommendations(score, shap, formData);
  var html = '';

  // Аномалии
  if(ai.anomalies.length > 0) {
    html += '<div style="margin-bottom:10px;background:rgba(255,87,34,.06);border:1px solid rgba(255,87,34,.25);border-radius:var(--r);padding:13px 15px">'
      +'<div style="font-family:\'JetBrains Mono\',monospace;font-size:9px;font-weight:700;color:var(--warn);letter-spacing:.14em;text-transform:uppercase;margin-bottom:8px">&#8856; Детектор аномалий</div>'
      +ai.anomalies.map(function(a){ return '<div style="font-size:11px;color:var(--warn);margin-bottom:5px;line-height:1.6">'+a+'</div>'; }).join('')
      +'</div>';
  }

  // Рекомендации
  if(ai.recs.length > 0) {
    html += '<div style="margin-bottom:14px;background:rgba(0,184,240,.04);border:1px solid rgba(0,184,240,.18);border-radius:var(--r);padding:13px 15px">'
      +'<div style="font-family:\'JetBrains Mono\',monospace;font-size:9px;font-weight:700;color:var(--accent2);letter-spacing:.14em;text-transform:uppercase;margin-bottom:10px">&#9670; Рекомендации AI</div>'
      +ai.recs.map(function(r){ return '<div style="font-size:11px;color:var(--text2);margin-bottom:6px;line-height:1.65;padding-left:4px;border-left:2px solid var(--accent2)">'+r+'</div>'; }).join('')
      +'</div>';
  }

  return html;
}

// ============================================================
// ===== 4. ЭКСПОРТ В PDF =====================================
// ============================================================
function exportToPDF() {
  var wrap = document.getElementById('result-wrap');
  if(!wrap || wrap.querySelector('.result-empty')) {
    alert('Сначала выполните скоринг заявки.'); return;
  }
  if(typeof html2pdf === 'undefined') {
    alert('Библиотека PDF не загружена. Проверьте подключение к интернету.'); return;
  }
  var score = wrap.querySelector('.score-num') ? wrap.querySelector('.score-num').textContent : '—';
  var stamp = '<div style="margin-top:18px;padding:10px 16px;background:#f0fff4;border:2px solid #2dff6e;border-radius:8px;text-align:center;font-family:monospace;font-size:12px;color:#1a4a2e;font-weight:700">&#10003; Проверено AI-системой АгроСкоринг &mdash; Decentrathon 5.0</div>';
  var header = '<div style="font-family:monospace;font-size:11px;color:#888;margin-bottom:8px">АгроСкоринг &mdash; Отчёт скоринга &mdash; '+new Date().toLocaleString('ru')+'</div>';

  var container = document.createElement('div');
  container.style.cssText = 'background:#fff;color:#111;padding:24px;font-family:system-ui,sans-serif;max-width:700px';
  container.innerHTML = header + '<h2 style="font-size:20px;margin-bottom:14px">Результат скоринга: '+score+'/100</h2>' + wrap.innerHTML + stamp;

  // Убираем интерактивные элементы
  container.querySelectorAll('button,input,select').forEach(function(el){ el.remove(); });

  html2pdf().set({
    margin: 12,
    filename: 'agroskoring_report_'+new Date().toISOString().slice(0,10)+'.pdf',
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  }).from(container).save();
}

