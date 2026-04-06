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
 * @param {Array} lineRows - [{ln, ls, neutralIndex, dist}]
 * @returns {{ slg: string, threePh: string, detailSLG: string, detail3P: string }}
 */
function runCalculation(brs1, bxs1, brs0, bxs0, lineRows) {
  const base = '■ 기준값\n' +
    ' 기준용량: ' + baseMVA.toFixed(0) + ' MVA\n' +
    ' 기준전압: ' + baseKV.toFixed(1) + ' kV\n' +
    ' 기준전류 Ibase = ' + baseCurrentA.toFixed(1) + ' A\n' +
    ' (= ' + baseMVA + 'MVA / (√3 × ' + baseKV.toFixed(1) + 'kV))\n\n';

  let dSlg = '=== 1선지락전류 계산과정 ===\n\n' + base;
  let d3P  = '=== 3상단락전류 계산과정 ===\n\n' + base;

  dSlg += '■ 모선 임피던스 (p.u.)\n Z1_bus = ' + brs1.toFixed(5) + ' + j' + bxs1.toFixed(5) + '\n Z0_bus = ' + brs0.toFixed(5) + ' + j' + bxs0.toFixed(5) + '\n\n';
  d3P  += '■ 모선 임피던스 (p.u.)\n Z1_bus = ' + brs1.toFixed(5) + ' + j' + bxs1.toFixed(5) + '\n\n';

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
    const desc = ' [' + idx + '] ' + ln + ' ' + ls + 'mm²\n 중성선: ' + nOpt.nn + ' ' + nOpt.ns + 'mm² × ' + dist.toFixed(3) + 'km\n';
    dSlg += desc + ' Z1 = ' + lr1.toFixed(5) + ' + j' + lx1.toFixed(5) + '\n' + ' Z0 = ' + lr0.toFixed(5) + ' + j' + lx0.toFixed(5) + '\n';
    d3P  += desc + ' Z1 = ' + lr1.toFixed(5) + ' + j' + lx1.toFixed(5) + '\n';
  });

  dSlg += '\n 선로합계 Z1 = ' + sumRS1.toFixed(5) + ' + j' + sumXS1.toFixed(5) + '\n';
  dSlg += ' 선로합계 Z0 = ' + sumRS0.toFixed(5) + ' + j' + sumXS0.toFixed(5) + '\n\n';
  d3P  += '\n 선로합계 Z1 = ' + sumRS1.toFixed(5) + ' + j' + sumXS1.toFixed(5) + '\n\n';

  const tR1 = brs1 + sumRS1, tX1 = bxs1 + sumXS1;
  const tR0 = brs0 + sumRS0, tX0 = bxs0 + sumXS0;

  dSlg += '■ 총 임피던스 (p.u.)\n Z1_total = ' + tR1.toFixed(5) + ' + j' + tX1.toFixed(5) + '\n Z0_total = ' + tR0.toFixed(5) + ' + j' + tX0.toFixed(5) + '\n\n';
  d3P  += '■ 총 임피던스 (p.u.)\n Z1_total = ' + tR1.toFixed(5) + ' + j' + tX1.toFixed(5) + '\n\n';

  // 1선지락: Islg = 3 × Ibase / |2Z1 + Z0|
  const zR = 2 * tR1 + tR0, zX = 2 * tX1 + tX0;
  const zMag = Math.sqrt(zR * zR + zX * zX);
  dSlg += '■ 합성 임피던스\n 2Z1 + Z0 = ' + zR.toFixed(5) + ' + j' + zX.toFixed(5) + '\n |2Z1 + Z0| = ' + zMag.toFixed(5) + ' p.u.\n\n';

  // 3상단락: I3p = Ibase / |Z1|
  const z1Mag = Math.sqrt(tR1 * tR1 + tX1 * tX1);
  d3P += '■ |Z1_total| = ' + z1Mag.toFixed(5) + ' p.u.\n\n';

  let slg = '-', threePh = '-';
  if (zMag > 0) {
    const islg = 3.0 * baseCurrentA / zMag;
    dSlg += '■ 1선지락전류 (SLG)\n Islg = 3 × Ibase / |2Z1 + Z0|\n = 3 × ' + baseCurrentA.toFixed(1) + ' / ' + zMag.toFixed(5) + '\n = ' + islg.toFixed(1) + ' A\n';
    slg = islg.toFixed(1) + ' A';
  }
  if (z1Mag > 0) {
    const i3p = baseCurrentA / z1Mag;
    d3P += '■ 3상단락전류\n I3φ = Ibase / |Z1_total|\n = ' + baseCurrentA.toFixed(1) + ' / ' + z1Mag.toFixed(5) + '\n = ' + i3p.toFixed(1) + ' A\n';
    threePh = i3p.toFixed(1) + ' A';
  }
  return { slg, threePh, detailSLG: dSlg, detail3P: d3P, tR1, tX1 };
}

/**
 * 변압기 고장전류 계산
 * @param {number} srcZ1R  - 전원측 정상 R 합계 (p.u., 시스템기준)
 * @param {number} srcZ1X  - 전원측 정상 X 합계 (p.u., 시스템기준)
 * @param {string} trType  - 'dy-solid' | 'dd' | 'dy-eff'
 * @param {number} ztMag   - |ZT| (p.u., 변압기 자기용량기준)
 * @param {number} xr      - X/R 비율
 * @param {number} trMVA   - 변압기 용량 (MVA)
 * @param {number} v2kV    - 2차 전압 (kV)
 * @param {number} znR_ohm - 중성점 접지 R (Ω, 유효접지 전용)
 * @param {number} znX_ohm - 중성점 접지 X (Ω, 유효접지 전용)
 */
function runTransformerCalc(srcZ1R, srcZ1X, trType, ztMag, xr, trMVA, v2kV, znR_ohm, znX_ohm) {
  const ibase1 = baseCurrentA;
  const ibase2 = baseMVA * 1e6 / (Math.sqrt(3) * v2kV * 1e3);

  const ztMagSys = ztMag * (baseMVA / trMVA);
  const ztR = ztMagSys / Math.sqrt(1 + xr * xr);
  const ztX = ztMagSys * xr / Math.sqrt(1 + xr * xr);

  const z1R = srcZ1R + ztR;
  const z1X = srcZ1X + ztX;
  const z1  = Math.sqrt(z1R * z1R + z1X * z1X);

  const zbase2 = (v2kV * v2kV) / baseMVA;
  const znR = znR_ohm / zbase2;
  const znX = znX_ohm / zbase2;

  const hasSLG = trType !== 'dd';
  const z0R = hasSLG ? ztR + 3 * znR : 0;
  const z0X = hasSLG ? ztX + 3 * znX : 0;

  const zCombR = 2 * z1R + z0R;
  const zCombX = 2 * z1X + z0X;
  const zComb  = Math.sqrt(zCombR * zCombR + zCombX * zCombX);

  const i3p_pu  = z1 > 0 ? 1 / z1 : 0;
  const islg2_pu = (hasSLG && zComb > 0) ? 3 / zComb : 0;
  const islg1_pu = (hasSLG && zComb > 0) ? 2 / zComb : 0;

  const trTypeName = { 'dy-solid': 'Δ-Y (직접접지)', 'dd': 'Δ-Δ', 'dy-eff': 'Δ-Y (유효접지)' }[trType];
  const znLine = (trType === 'dy-eff')
    ? ' Zn = ' + znR_ohm.toFixed(4) + ' + j' + znX_ohm.toFixed(4) + ' Ω\n' +
      ' Zbase2 = ' + v2kV + '² / ' + baseMVA + ' = ' + zbase2.toFixed(4) + ' Ω\n' +
      ' Zn(p.u.) = Zn / Zbase2 = ' + znR.toFixed(5) + ' + j' + znX.toFixed(5) + '\n'
    : '';

  const hdr =
    '■ 기준값\n' +
    ' 기준용량: ' + baseMVA + ' MVA\n' +
    ' 1차 기준전압: ' + baseKV.toFixed(1) + ' kV  Ibase1 = ' + ibase1.toFixed(1) + ' A\n' +
    ' 2차 기준전압: ' + v2kV + ' kV  Ibase2 = ' + ibase2.toFixed(1) + ' A\n' +
    ' 결선: ' + trTypeName + '\n\n' +
    '■ 변압기 임피던스 환산\n' +
    ' 변압기 용량: ' + trMVA + ' MVA\n' +
    ' |ZT| = ' + ztMag.toFixed(5) + ' p.u. (자기용량기준)\n' +
    ' → 시스템기준: ' + ztMag.toFixed(5) + ' × (' + baseMVA + '/' + trMVA + ') = ' + ztMagSys.toFixed(5) + ' p.u.\n' +
    ' X/R = ' + xr.toFixed(2) + ' → RT = ' + ztR.toFixed(5) + ', XT = ' + ztX.toFixed(5) + '\n' +
    znLine +
    '\n■ 전원측 정상 임피던스 (p.u., 시스템기준)\n' +
    ' Z1_src = ' + srcZ1R.toFixed(5) + ' + j' + srcZ1X.toFixed(5) + '\n\n' +
    '■ 총 정상 임피던스 Z1_total\n' +
    ' = Z1_src + ZT_sys = ' + z1R.toFixed(5) + ' + j' + z1X.toFixed(5) + '\n' +
    ' |Z1_total| = ' + z1.toFixed(5) + '\n\n';

  const det3p = '=== 3상단락전류 계산과정 (변압기) ===\n\n' + hdr +
    '■ 3상단락 I3φ = Ibase / |Z1_total|\n' +
    ' 2차: ' + ibase2.toFixed(1) + ' / ' + z1.toFixed(5) + ' = ' + (i3p_pu * ibase2).toFixed(1) + ' A\n' +
    ' 1차: ' + ibase1.toFixed(1) + ' / ' + z1.toFixed(5) + ' = ' + (i3p_pu * ibase1).toFixed(1) + ' A\n';

  const z0Desc = trType === 'dy-eff'
    ? ' Z0_2차 = ZT + 3Zn (p.u.)\n' +
      ' = (' + ztR.toFixed(5) + ' + j' + ztX.toFixed(5) + ')\n' +
      ' + 3×(' + znR.toFixed(5) + ' + j' + znX.toFixed(5) + ')\n' +
      ' [Zn입력: ' + znR_ohm.toFixed(4) + '+j' + znX_ohm.toFixed(4) + ' Ω → ÷Zbase2(' + zbase2.toFixed(4) + 'Ω)]\n' +
      ' = ' + z0R.toFixed(5) + ' + j' + z0X.toFixed(5) + '\n'
    : ' Z0_2차 = ZT = ' + z0R.toFixed(5) + ' + j' + z0X.toFixed(5) + ' (Δ1차가 전원 영상 차단, Zn=0)\n';

  const detSLG = hasSLG
    ? '=== 1선지락전류 계산과정 (변압기) ===\n\n' + hdr +
      '■ 영상 임피던스 (2차 측)\n' + z0Desc + '\n' +
      '■ 합성 |2Z1 + Z0|\n' +
      ' = ' + zCombR.toFixed(5) + ' + j' + zCombX.toFixed(5) + '  크기 = ' + zComb.toFixed(5) + '\n\n' +
      '■ 1선지락 (SLG)\n' +
      ' 2차: Islg = 3·Ibase2 / |2Z1+Z0|\n' +
      ' = 3 × ' + ibase2.toFixed(1) + ' / ' + zComb.toFixed(5) + ' = ' + (islg2_pu * ibase2).toFixed(1) + ' A\n\n' +
      ' 1차(Δ권선): 영상분 내부 순환, 선전류 = 2·I0·Ibase1\n' +
      ' = 2 × ' + ibase1.toFixed(1) + ' / ' + zComb.toFixed(5) + ' = ' + (islg1_pu * ibase1).toFixed(1) + ' A\n'
    : '=== 1선지락전류 계산과정 (변압기) ===\n\nΔ-Δ 결선: 양측 모두 영상전류 경로 없음 → SLG 전류 불통\n';

  return {
    i3p_2:  (i3p_pu  * ibase2).toFixed(1),
    i3p_1:  (i3p_pu  * ibase1).toFixed(1),
    islg_2: hasSLG ? (islg2_pu * ibase2).toFixed(1) : null,
    islg_1: hasSLG ? (islg1_pu * ibase1).toFixed(1) : null,
    v2kV, det3p, detSLG
  };
}
