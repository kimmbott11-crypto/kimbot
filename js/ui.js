// ================================================
// UI / 이벤트 핸들러
// db.js + calc.js 보다 나중에 로드되어야 합니다.
// ================================================
let lineCount = 0;
let detailSLG = '', detail3P = '';
let trDetails = { '3p': '', slg: '' };

document.getElementById('ibase').textContent = baseCurrentA.toFixed(1);

function onBusInputModeChange() {
  const isMva = document.getElementById('bus-input-mode').value === 'mva';
  document.getElementById('bus-pct-rows').style.display = isMva ? 'none' : '';
  document.getElementById('bus-mva-rows').style.display = isMva ? '' : 'none';
}

function applyTypical() {
  document.getElementById('bus-input-mode').value = 'pct';
  onBusInputModeChange();
  document.getElementById('brs1').value = '0.021';
  document.getElementById('bxs1').value = '34.817';
  document.getElementById('brs0').value = '0';
  document.getElementById('bxs0').value = '49.724';
}

// 결과 전류 표시: 정수부 4자리 이상(1000 이상)이면 kA 단위로 변환
function formatCurrentA(value) {
  const num = parseFloat(value);
  if (isNaN(num)) return '-';
  if (Math.abs(num) >= 1000) {
    return (num / 1000).toFixed(2) + ' kA';
  }
  return num.toFixed(1) + ' A';
}

// ---------- X/R Typical (IEC 60076 기반 22.9kV 배전용) ----------
function applyTypicalXR() {
  const kva = parseFloat(document.getElementById('tr-mva').value);
  if (isNaN(kva) || kva <= 0) {
    alert('용량(kVA)을 먼저 입력하세요.');
    return;
  }
  const mva = kva / 1000;
  let xr;
  if      (mva <= 0.1)  xr = 3;
  else if (mva <= 0.2)  xr = 4;
  else if (mva <= 0.5)  xr = 5;
  else if (mva <= 1.0)  xr = 7;
  else if (mva <= 2.0)  xr = 10;
  else if (mva <= 3.0)  xr = 12;
  else if (mva <= 5.0)  xr = 15;
  else if (mva <= 10.0) xr = 20;
  else if (mva <= 15.0) xr = 25;
  else                  xr = 30;
  document.getElementById('tr-xr').value = xr;
}

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

function removeLine(btn) {
  btn.closest('[id^="line-"]').remove();
  const rows = document.querySelectorAll('#lines-container > [id^="line-"]');
  rows.forEach((row, i) => { row.querySelector('.line-num').textContent = (i + 1) + '.'; });
  lineCount = rows.length;
  updateAddBtn();
}

function onLineNameChange(sel) {
  const row = sel.closest('[id^="line-"]');
  const sizeSel    = row.querySelector('.line-size');
  const neutralSel = row.querySelector('.neutral-sel');
  const ln = sel.value;
  sizeSel.innerHTML    = '<option value="">-</option>';
  neutralSel.innerHTML = '<option value="">전압선 규격 먼저 선택</option>';
  neutralSel.disabled  = true;
  if (ln) {
    getLineSizes(ln).forEach(s => { sizeSel.innerHTML += '<option value="' + s + '">' + s + '</option>'; });
    sizeSel.disabled = false;
  } else {
    sizeSel.disabled = true;
  }
}

function onLineSizeChange(sel) {
  const row = sel.closest('[id^="line-"]');
  const ln  = row.querySelector('.line-name').value;
  const ls  = sel.value;
  const neutralSel = row.querySelector('.neutral-sel');
  neutralSel.innerHTML = '<option value="">-</option>';
  if (ln && ls) {
    const opts = getNeutralOptions(ln, ls);
    opts.forEach((o, i) => {
      neutralSel.innerHTML += '<option value="' + i + '">' + o.nn + ' ' + o.ns + 'mm²</option>';
    });
    neutralSel.disabled = false;
    if (opts.length === 1) neutralSel.value = '0';
  } else {
    neutralSel.disabled = true;
  }
}

function updateAddBtn() {
  document.getElementById('btn-add-line').disabled = lineCount >= 10;
}

function onTrTypeChange() {
  const isEff = document.getElementById('tr-type').value === 'dy-eff';
  document.getElementById('tr-zn-row').style.display = isEff ? '' : 'none';
  if (!isEff) {
    document.getElementById('tr-zn-r').value = '';
    document.getElementById('tr-zn-x').value = '';
  }
}

function calculate() {
  const resultArea = document.getElementById('result-area');
  const elSlg = document.getElementById('result-slg');
  const el3p  = document.getElementById('result-3p');
  const busMode = document.getElementById('bus-input-mode').value;

  let brs1, bxs1, brs0, bxs0;

  if (busMode === 'mva') {
    // 단락용량(MVA) 입력 → p.u.로 환산 (R성분은 0으로 가정)
    const sc3p = parseFloat(document.getElementById('bus-sc3p-mva').value);
    const scSlg = parseFloat(document.getElementById('bus-slg-mva').value);

    if (isNaN(sc3p) || sc3p <= 0 || isNaN(scSlg) || scSlg <= 0) {
      resultArea.style.display = 'block';
      elSlg.textContent = '단락용량을 입력하세요'; elSlg.style.fontSize = '14px';
      el3p.textContent  = '단락용량을 입력하세요'; el3p.style.fontSize  = '14px';
      detailSLG = ''; detail3P = '';
      return;
    }

    brs1 = 0;
    bxs1 = baseMVA / sc3p;                       // |Z1| = Base/MVAsc3p
    const x0 = (3 * baseMVA / scSlg) - (2 * bxs1); // |2Z1+Z0| = 3×Base/MVAslg
    if (x0 < 0) {
      resultArea.style.display = 'block';
      elSlg.textContent = '1선지락용량이 너무 큽니다'; elSlg.style.fontSize = '14px';
      el3p.textContent  = '입력값을 확인하세요'; el3p.style.fontSize  = '14px';
      detailSLG = ''; detail3P = '';
      return;
    }
    brs0 = 0;
    bxs0 = x0;
  } else {
    const brs1_pct = parseFloat(document.getElementById('brs1').value);
    const bxs1_pct = parseFloat(document.getElementById('bxs1').value);
    const brs0_pct = parseFloat(document.getElementById('brs0').value);
    const bxs0_pct = parseFloat(document.getElementById('bxs0').value);

    if (isNaN(brs1_pct) || isNaN(bxs1_pct) || isNaN(brs0_pct) || isNaN(bxs0_pct)) {
      resultArea.style.display = 'block';
      elSlg.textContent = '모선 임피던스를 입력하세요'; elSlg.style.fontSize = '14px';
      el3p.textContent  = '모선 임피던스를 입력하세요'; el3p.style.fontSize  = '14px';
      detailSLG = ''; detail3P = '';
      return;
    }

    // 계산 로직(runCalculation)은 p.u. 기준이므로 내부 변환만 하고 표시는 %Z 그대로 사용
    brs1 = brs1_pct / 100;
    bxs1 = bxs1_pct / 100;
    brs0 = brs0_pct / 100;
    bxs0 = bxs0_pct / 100;
  }

  const lineRows = [];
  document.querySelectorAll('#lines-container > [id^="line-"]').forEach(row => {
    const ln  = row.querySelector('.line-name').value;
    const ls  = row.querySelector('.line-size').value;
    const neutralSel  = row.querySelector('.neutral-sel');
    const neutralIndex = parseInt(neutralSel.value);
    const dist = parseFloat(row.querySelector('.line-dist').value) || 0;
    if (!ln || !ls || isNaN(neutralIndex)) return;
    lineRows.push({ ln, ls, neutralIndex, dist });
  });

  const result = runCalculation(brs1, bxs1, brs0, bxs0, lineRows);
  detailSLG = result.detailSLG;
  detail3P  = result.detail3P;

  resultArea.style.display = 'block';
  elSlg.textContent = result.slg !== null ? formatCurrentA(result.slg) : '-';     elSlg.style.fontSize = '28px';
  el3p.textContent  = result.threePh !== null ? formatCurrentA(result.threePh) : '-'; el3p.style.fontSize  = '28px';

  const trV2_V  = parseFloat(document.getElementById('tr-v2').value);
  const trZt_pct = parseFloat(document.getElementById('tr-zt').value);
  const trXr   = parseFloat(document.getElementById('tr-xr').value);
  const trKVA  = parseFloat(document.getElementById('tr-mva').value);
  const trType = document.getElementById('tr-type').value;
  const trResultArea = document.getElementById('tr-result-area');
  const znR = parseFloat(document.getElementById('tr-zn-r').value) || 0;
  const znX = parseFloat(document.getElementById('tr-zn-x').value) || 0;

  // 계산 로직(runTransformerCalc)은 MVA/kV/p.u. 기준이므로 내부 변환만 하고 표시는 kVA/V/%Z 그대로 사용
  const trV2  = trV2_V / 1000;   // V -> kV
  const trMVA = trKVA / 1000;    // kVA -> MVA
  const trZt  = trZt_pct / 100;  // %Z -> p.u.

  if (!isNaN(trV2) && trV2 > 0 && !isNaN(trZt) && trZt > 0 &&
      !isNaN(trXr) && trXr > 0 && !isNaN(trMVA) && trMVA > 0) {
    const tr = runTransformerCalc(result.tR1, result.tX1, trType, trZt, trXr, trMVA, trV2, znR, znX);
    trDetails = { '3p': tr.det3p, slg: tr.detSLG };

    document.getElementById('tr-v2-label').textContent = trV2_V;
    document.getElementById('tr-2-3p').textContent = formatCurrentA(tr.i3p_2);
    document.getElementById('tr-1-3p').textContent = formatCurrentA(tr.i3p_1);

    const slgNote = document.getElementById('tr-dd-note');
    const slgBtn  = document.getElementById('tr-slg-btn');
    const slgBtn1 = document.getElementById('tr-slg-btn-1');

    if (tr.islg_2 !== null) {
      document.getElementById('tr-2-slg').textContent = formatCurrentA(tr.islg_2);
      document.getElementById('tr-1-slg').textContent = formatCurrentA(tr.islg_1);
      slgNote.style.display  = 'none';
      slgBtn.style.display   = '';
      slgBtn1.style.display  = '';
    } else {
      document.getElementById('tr-2-slg').textContent = 'N/A';
      document.getElementById('tr-1-slg').textContent = 'N/A';
      slgNote.style.display  = 'block';
      slgBtn.style.display   = 'none';
      slgBtn1.style.display  = 'none';
    }

    ['tr-2-3p','tr-2-slg','tr-1-3p','tr-1-slg'].forEach(id => {
      const el = document.getElementById(id);
      el.style.fontSize = el.textContent === 'N/A' ? '16px' : '22px';
    });
    trResultArea.style.display = 'block';
  } else {
    trResultArea.style.display = 'none';
  }
}

function showDetail(type) {
  const text = type === 'slg' ? detailSLG : detail3P;
  if (!text) return;
  document.getElementById('detail-text').textContent = text;
  document.getElementById('detail-modal').classList.add('active');
}
function closeDetail() {
  document.getElementById('detail-modal').classList.remove('active');
}

function showTrDetail(type) {
  const text = trDetails[type];
  if (!text) return;
  document.getElementById('detail-text').textContent = text;
  document.getElementById('detail-modal').classList.add('active');
}

function showDB() {
  const body = document.getElementById('db-body');
  const grouped = {};
  DB.forEach(d => { if (!grouped[d.ln]) grouped[d.ln] = []; grouped[d.ln].push(d); });
  let html = '';
  lineNames.forEach(name => {
    html += '<div class="db-section-title">' + name + '</div>';
    html += '<table class="db-table"><tr><th>전압선</th><th>중성선</th><th>RS1</th><th>XS1</th><th>RS0</th><th>XS0</th></tr>';
    grouped[name].forEach(d => {
      html += '<tr><td>' + d.ls + '</td><td>' + d.nn.split('-')[0] + ' ' + d.ns + '</td>' +
              '<td>' + (d.rs1*100).toFixed(2) + '</td><td>' + (d.xs1*100).toFixed(2) + '</td>' +
              '<td>' + (d.rs0*100).toFixed(2) + '</td><td>' + (d.xs0*100).toFixed(2) + '</td></tr>';
    });
    html += '</table>';
  });
  body.innerHTML = html;
  document.getElementById('db-modal').classList.add('active');
}
function closeDB() {
  document.getElementById('db-modal').classList.remove('active');
}

document.querySelectorAll('.modal-overlay').forEach(o => {
  o.addEventListener('click', e => { if (e.target === o) o.classList.remove('active'); });
});

addLine();
