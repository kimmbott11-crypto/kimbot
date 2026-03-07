// ================================================
// 고장계산 엔진 (DOM/UI 의존성 없음)
// 계산식 변경 시 이 파일만 수정합니다.
// db.js 보다 나중에 로드되어야 합니다.
// ================================================

const baseMVA = 100.0;
const baseKV  = 22.9;
const baseCurrentA = baseMVA * 1e6 / (Math.sqrt(3) * baseKV * 1e3);

/**
 * 고장전류 계산
 * @param {number} brs1 - 정상 모선 R (p.u.)
 * @param {number} bxs1 - 정상 모선 X (p.u.)
 * @param {number} brs0 - 영상 모선 R (p.u.)
 * @param {number} bxs0 - 영상 모선 X (p.u.)
 * @param {Array}  lineRows - [{ln, ls, neutralIndex, dist}]
 * @returns {{ slg: string, threePh: string, detailSLG: string, detail3P: string }}
 */
function runCalculation(brs1, bxs1, brs0, bxs0, lineRows) {
  const base =
    '■ 기준값\n' +
    '  기준용량: ' + baseMVA.toFixed(0) + ' MVA\n' +
    '  기준전압: ' + baseKV.toFixed(1) + ' kV\n' +
    '  기준전류 Ibase = ' + baseCurrentA.toFixed(1) + ' A\n' +
    '  (= ' + baseMVA + 'MVA / (√3 × ' + baseKV.toFixed(1) + 'kV))\n\n';

  let dSlg = '=== 1선지락전류 계산과정 ===\n\n' + base;
  let d3P  = '=== 3상단락전류 계산과정 ===\n\n' + base;

  dSlg += '■ 모선 임피던스 (p.u.)\n  Z1_bus = ' + brs1.toFixed(5) + ' + j' + bxs1.toFixed(5) + '\n  Z0_bus = ' + brs0.toFixed(5) + ' + j' + bxs0.toFixed(5) + '\n\n';
  d3P  += '■ 모선 임피던스 (p.u.)\n  Z1_bus = ' + brs1.toFixed(5) + ' + j' + bxs1.toFixed(5) + '\n\n';

  let sumRS1 = 0, sumXS1 = 0, sumRS0 = 0, sumXS0 = 0;
  dSlg += '■ 선로 임피던스 (p.u./km × km)\n';
  d3P  += '■ 선로 임피던스 (p.u./km × km)\n';
  let idx = 0;

  lineRows.forEach(({ ln, ls, neutralIndex, dist }) => {
    const opts = getNeutralOptions(ln, ls);
    if (neutralIndex < 0 || neutralIndex >= opts.length) return;
    const nOpt = opts[neutralIndex];
    const rec  = DB.find(d => d.ln === ln && d.ls === ls && d.nn === nOpt.nn && d.ns === nOpt.ns);
    if (!rec) return;

    idx++;
    const lr1 = rec.rs1 * dist, lx1 = rec.xs1 * dist;
    const lr0 = rec.rs0 * dist, lx0 = rec.xs0 * dist;
    sumRS1 += lr1; sumXS1 += lx1; sumRS0 += lr0; sumXS0 += lx0;

    const desc = '  [' + idx + '] ' + ln + ' ' + ls + 'mm²\n      중성선: ' + nOpt.nn + ' ' + nOpt.ns + 'mm² × ' + dist.toFixed(3) + 'km\n';
    dSlg += desc + '      Z1 = ' + lr1.toFixed(5) + ' + j' + lx1.toFixed(5) + '\n'
                 + '      Z0 = ' + lr0.toFixed(5) + ' + j' + lx0.toFixed(5) + '\n';
    d3P  += desc + '      Z1 = ' + lr1.toFixed(5) + ' + j' + lx1.toFixed(5) + '\n';
  });

  dSlg += '\n  선로합계 Z1 = ' + sumRS1.toFixed(5) + ' + j' + sumXS1.toFixed(5) + '\n';
  dSlg += '  선로합계 Z0 = ' + sumRS0.toFixed(5) + ' + j' + sumXS0.toFixed(5) + '\n\n';
  d3P  += '\n  선로합계 Z1 = ' + sumRS1.toFixed(5) + ' + j' + sumXS1.toFixed(5) + '\n\n';

  const tR1 = brs1 + sumRS1, tX1 = bxs1 + sumXS1;
  const tR0 = brs0 + sumRS0, tX0 = bxs0 + sumXS0;

  dSlg += '■ 총 임피던스 (p.u.)\n  Z1_total = ' + tR1.toFixed(5) + ' + j' + tX1.toFixed(5) + '\n  Z0_total = ' + tR0.toFixed(5) + ' + j' + tX0.toFixed(5) + '\n\n';
  d3P  += '■ 총 임피던스 (p.u.)\n  Z1_total = ' + tR1.toFixed(5) + ' + j' + tX1.toFixed(5) + '\n\n';

  // 1선지락: Islg = 3 × Ibase / |2Z1 + Z0|
  const zR = 2 * tR1 + tR0, zX = 2 * tX1 + tX0;
  const zMag = Math.sqrt(zR * zR + zX * zX);
  dSlg += '■ 합성 임피던스\n  2Z1 + Z0 = ' + zR.toFixed(5) + ' + j' + zX.toFixed(5) + '\n  |2Z1 + Z0| = ' + zMag.toFixed(5) + ' p.u.\n\n';

  // 3상단락: I3p = Ibase / |Z1|
  const z1Mag = Math.sqrt(tR1 * tR1 + tX1 * tX1);
  d3P += '■ |Z1_total| = ' + z1Mag.toFixed(5) + ' p.u.\n\n';

  let slg = '-', threePh = '-';

  if (zMag > 0) {
    const islg = 3.0 * baseCurrentA / zMag;
    dSlg += '■ 1선지락전류 (SLG)\n  Islg = 3 × Ibase / |2Z1 + Z0|\n       = 3 × ' + baseCurrentA.toFixed(1) + ' / ' + zMag.toFixed(5) + '\n       = ' + islg.toFixed(1) + ' A\n';
    slg = islg.toFixed(1) + ' A';
  }
  if (z1Mag > 0) {
    const i3p = baseCurrentA / z1Mag;
    d3P += '■ 3상단락전류\n  I3φ = Ibase / |Z1_total|\n      = ' + baseCurrentA.toFixed(1) + ' / ' + z1Mag.toFixed(5) + '\n      = ' + i3p.toFixed(1) + ' A\n';
    threePh = i3p.toFixed(1) + ' A';
  }

  return { slg, threePh, detailSLG: dSlg, detail3P: d3P };
}
