// ================================================
// UI / 이벤트 핸들러
// DOM 조작 및 사용자 인터랙션 처리
// db.js + calc.js 보다 나중에 로드되어야 합니다.
// ================================================

let lineCount = 0;
let detailSLG = '', detail3P = '';

// 초기화
document.getElementById('ibase').textContent = baseCurrentA.toFixed(1);

// ---------- Typical 버튼 ----------
function applyTypical() {
  document.getElementById('brs1').value = '0.00021';
  document.getElementById('bxs1').value = '0.34817';
  document.getElementById('brs0').value = '0';
  document.getElementById('bxs0').value = '0.49724';
}

// ---------- 선로 추가 ----------
function addLine() {
  if (lineCount >= 10) return;
  lineCount++;
  const container = document.getElementById('lines-container');
  const div = document.createElement('div');
  div.id = 'line-' + lineCount;

  let nameOpts = '<option value="">전압선 선택</option>';
  lineNames.forEach(n => { nameOpts += '<option value="' + n + '">' + n + '</option>'; });

  div.innerHTML =
    '<div class="line-row">' +
      '<div class="line-top">' +
        '<span class="line-num">' + lineCount + '.</span>' +
        '<select class="line-name" onchange="onLineNameChange(this)">' + nameOpts + '</select>' +
        '<select class="line-size" onchange="onLineSizeChange(this)" disabled><option value="">-</option></select>' +
        '<input class="line-dist" type="text" placeholder="km" inputmode="decimal">' +
        '<button class="btn-danger" onclick="removeLine(this)">−</button>' +
      '</div>' +
      '<div class="line-bottom">' +
        '<span class="line-bottom-label">중성선</span>' +
        '<select class="neutral-sel" disabled><option value="">전압선 먼저 선택</option></select>' +
      '</div>' +
    '</div>' +
    '<hr class="line-divider">';
  container.appendChild(div);
  updateAddBtn();
}

// ---------- 선로 삭제 ----------
function removeLine(btn) {
  btn.closest('[id^="line-"]').remove();
  const rows = document.querySelectorAll('#lines-container > [id^="line-"]');
  rows.forEach((row, i) => {
    row.querySelector('.line-num').textContent = (i + 1) + '.';
  });
  lineCount = rows.length;
  updateAddBtn();
}

// ---------- 선로명 변경 ----------
function onLineNameChange(sel) {
  const row = sel.closest('[id^="line-"]');
  const sizeSel    = row.querySelector('.line-size');
  const neutralSel = row.querySelector('.neutral-sel');
  const ln = sel.value;

  sizeSel.innerHTML = '<option value="">-</option>';
  neutralSel.innerHTML = '<option value="">전압선 규격 먼저 선택</option>';
  neutralSel.disabled = true;

  if (ln) {
    getLineSizes(ln).forEach(s => {
      sizeSel.innerHTML += '<option value="' + s + '">' + s + '</option>';
    });
    sizeSel.disabled = false;
  } else {
    sizeSel.disabled = true;
  }
}

// ---------- 전압선 규격 변경 ----------
function onLineSizeChange(sel) {
  const row        = sel.closest('[id^="line-"]');
  const ln         = row.querySelector('.line-name').value;
  const ls         = sel.value;
  const neutralSel = row.querySelector('.neutral-sel');

  neutralSel.innerHTML = '<option value="">-</option>';
  if (ln && ls) {
    const opts = getNeutralOptions(ln, ls);
    opts.forEach((o, i) => {
      neutralSel.innerHTML += '<option value="' + i + '">' + o.nn + ' ' + o.ns + 'mm²</option>';
    });
    neutralSel.disabled = false;
    if (opts.length === 1) { neutralSel.value = '0'; }
  } else {
    neutralSel.disabled = true;
  }
}

function updateAddBtn() {
  document.getElementById('btn-add-line').disabled = lineCount >= 10;
}

// ---------- 고장계산 ----------
function calculate() {
  const brs1 = parseFloat(document.getElementById('brs1').value);
  const bxs1 = parseFloat(document.getElementById('bxs1').value);
  const brs0 = parseFloat(document.getElementById('brs0').value);
  const bxs0 = parseFloat(document.getElementById('bxs0').value);

  const resultArea = document.getElementById('result-area');
  const elSlg = document.getElementById('result-slg');
  const el3p  = document.getElementById('result-3p');

  if (isNaN(brs1) || isNaN(bxs1) || isNaN(brs0) || isNaN(bxs0)) {
    resultArea.style.display = 'block';
    elSlg.textContent = '모선 임피던스를 입력하세요';
    elSlg.style.fontSize = '14px';
    el3p.textContent  = '모선 임피던스를 입력하세요';
    el3p.style.fontSize = '14px';
    detailSLG = ''; detail3P = '';
    return;
  }

  // 선로 데이터 수집
  const lineRows = [];
  document.querySelectorAll('#lines-container > [id^="line-"]').forEach(row => {
    const ln         = row.querySelector('.line-name').value;
    const ls         = row.querySelector('.line-size').value;
    const neutralSel = row.querySelector('.neutral-sel');
    const neutralIndex = parseInt(neutralSel.value);
    const dist       = parseFloat(row.querySelector('.line-dist').value) || 0;
    if (!ln || !ls || isNaN(neutralIndex)) return;
    lineRows.push({ ln, ls, neutralIndex, dist });
  });

  const result = runCalculation(brs1, bxs1, brs0, bxs0, lineRows);
  detailSLG = result.detailSLG;
  detail3P  = result.detail3P;

  resultArea.style.display = 'block';
  elSlg.textContent = result.slg;   elSlg.style.fontSize = '28px';
  el3p.textContent  = result.threePh; el3p.style.fontSize = '28px';
}

// ---------- 계산과정 모달 ----------
function showDetail(type) {
  const text = type === 'slg' ? detailSLG : detail3P;
  if (!text) return;
  document.getElementById('detail-text').textContent = text;
  document.getElementById('detail-modal').classList.add('active');
}
function closeDetail() { document.getElementById('detail-modal').classList.remove('active'); }

// ---------- DB 모달 ----------
function showDB() {
  const body = document.getElementById('db-body');
  const grouped = {};
  DB.forEach(d => { if (!grouped[d.ln]) grouped[d.ln] = []; grouped[d.ln].push(d); });

  let html = '';
  lineNames.forEach(name => {
    html += '<div class="db-section-title">' + name + '</div>';
    html += '<table class="db-table"><tr><th>전압선</th><th>중성선</th><th>RS1</th><th>XS1</th><th>RS0</th><th>XS0</th></tr>';
    grouped[name].forEach(d => {
      html += '<tr><td>' + d.ls + '</td><td>' + d.nn.split('-')[0] + ' ' + d.ns + '</td>'
            + '<td>' + d.rs1.toFixed(4) + '</td><td>' + d.xs1.toFixed(4) + '</td>'
            + '<td>' + d.rs0.toFixed(4) + '</td><td>' + d.xs0.toFixed(4) + '</td></tr>';
    });
    html += '</table>';
  });
  body.innerHTML = html;
  document.getElementById('db-modal').classList.add('active');
}
function closeDB() { document.getElementById('db-modal').classList.remove('active'); }

// 모달 바깥 클릭 시 닫기
document.querySelectorAll('.modal-overlay').forEach(o => {
  o.addEventListener('click', e => { if (e.target === o) o.classList.remove('active'); });
});

// 첫 선로 행 자동 추가
addLine();
