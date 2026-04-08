// ================================================
// 임피던스 데이터베이스 (p.u./km, 100MVA 22.9kV 기준)
// 출처: 한전 선로 임피던스 자료 (원성운 부장님, 2010-03)
// 선종 추가/수정 시 이 파일만 업데이트하면 됩니다.
// ================================================
const DB = [

  // AL-ACSR전선
  {type:"AL",ln:"AL-ACSR전선",ls:"32", nn:"AL-ACSR전선",ns:"32", rs1:0.1720,  xs1:0.0918,  rs0:0.2472,  xs0:0.3512},
  {type:"AL",ln:"AL-ACSR전선",ls:"58", nn:"AL-ACSR전선",ns:"32", rs1:0.0948,  xs1:0.0877,  rs0:0.1702,  xs0:0.3474},
  {type:"AL",ln:"AL-ACSR전선",ls:"58", nn:"AL-ACSR전선",ns:"58", rs1:0.0948,  xs1:0.0877,  rs0:0.1585,  xs0:0.3312},
  {type:"AL",ln:"AL-ACSR전선",ls:"95", nn:"AL-ACSR전선",ns:"58", rs1:0.0580,  xs1:0.0841,  rs0:0.1402,  xs0:0.3236},
  {type:"AL",ln:"AL-ACSR전선",ls:"95", nn:"AL-ACSR전선",ns:"95", rs1:0.0580,  xs1:0.0841,  rs0:0.1350,  xs0:0.3085},
  {type:"AL",ln:"AL-ACSR전선",ls:"160",nn:"AL-ACSR전선",ns:"95", rs1:0.0347,  xs1:0.0746,  rs0:0.1199,  xs0:0.2926},
  {type:"AL",ln:"AL-ACSR전선",ls:"240",nn:"AL-ACSR전선",ns:"95", rs1:0.022968,xs1:0.071391,rs0:0.078974,xs0:0.222305},

  // AW-특고ACSR/AW
  {type:"AW",ln:"AW-특고ACSR/AW",ls:"32", nn:"AL-ACSR/AW",ns:"32", rs1:0.1720,  xs1:0.0918,  rs0:0.2472,  xs0:0.3512},
  {type:"AW",ln:"AW-특고ACSR/AW",ls:"58", nn:"AL-ACSR/AW",ns:"32", rs1:0.0948,  xs1:0.0877,  rs0:0.1702,  xs0:0.3474},
  {type:"AW",ln:"AW-특고ACSR/AW",ls:"58", nn:"AL-ACSR/AW",ns:"58", rs1:0.0948,  xs1:0.0877,  rs0:0.1585,  xs0:0.3312},
  {type:"AW",ln:"AW-특고ACSR/AW",ls:"95", nn:"AL-ACSR/AW",ns:"58", rs1:0.0580,  xs1:0.0841,  rs0:0.1402,  xs0:0.3236},
  {type:"AW",ln:"AW-특고ACSR/AW",ls:"95", nn:"AL-ACSR/AW",ns:"95", rs1:0.0580,  xs1:0.0841,  rs0:0.1350,  xs0:0.3085},
  {type:"AW",ln:"AW-특고ACSR/AW",ls:"160",nn:"AL-ACSR/AW",ns:"95", rs1:0.0347,  xs1:0.0746,  rs0:0.1199,  xs0:0.2926},
  {type:"AW",ln:"AW-특고ACSR/AW",ls:"240",nn:"AL-ACSR/AW",ns:"95", rs1:0.022968,xs1:0.071391,rs0:0.078974,xs0:0.222305},

  // CF-특고압케이블 FR CNCO-W
  {type:"CF",ln:"CF-특고압케이블 FR CNCO-W",ls:"60", nn:"FR CNCO-W",ns:"60", rs1:0.073879,xs1:0.03112, rs0:0.216242,xs0:0.067733},
  {type:"CF",ln:"CF-특고압케이블 FR CNCO-W",ls:"100",nn:"FR CNCO-W",ns:"100",rs1:0.043896,xs1:0.00865, rs0:0.138822,xs0:0.038004},
  {type:"CF",ln:"CF-특고압케이블 FR CNCO-W",ls:"150",nn:"FR CNCO-W",ns:"150",rs1:0.029128,xs1:0.02653, rs0:0.096775,xs0:0.025666},
  {type:"CF",ln:"CF-특고압케이블 FR CNCO-W",ls:"200",nn:"FR CNCO-W",ns:"200",rs1:0.022767,xs1:0.025823,rs0:0.074178,xs0:0.020651},
  {type:"CF",ln:"CF-특고압케이블 FR CNCO-W",ls:"250",nn:"FR CNCO-W",ns:"250",rs1:0.018242,xs1:0.024887,rs0:0.058122,xs0:0.018134},
  {type:"CF",ln:"CF-특고압케이블 FR CNCO-W",ls:"325",nn:"FR CNCO-W",ns:"325",rs1:0.014325,xs1:0.023741,rs0:0.044678,xs0:0.015617},
  {type:"CF",ln:"CF-특고압케이블 FR CNCO-W",ls:"400",nn:"FR CNCO-W",ns:"400",rs1:0.014301,xs1:0.02341, rs0:0.053222,xs0:0.017353},
  {type:"CF",ln:"CF-특고압케이블 FR CNCO-W",ls:"600",nn:"FR CNCO-W",ns:"600",rs1:0.014035,xs1:0.024351,rs0:0.029481,xs0:0.012757},

  // CN-특고압케이블CNCV
  {type:"CN",ln:"CN-특고압케이블CNCV",ls:"60", nn:"CNCV",ns:"60", rs1:0.073879,xs1:0.03112, rs0:0.216242,xs0:0.067733},
  {type:"CN",ln:"CN-특고압케이블CNCV",ls:"100",nn:"CNCV",ns:"100",rs1:0.043896,xs1:0.02865, rs0:0.138822,xs0:0.038004},
  {type:"CN",ln:"CN-특고압케이블CNCV",ls:"150",nn:"CNCV",ns:"150",rs1:0.029128,xs1:0.02653, rs0:0.096775,xs0:0.025666},
  {type:"CN",ln:"CN-특고압케이블CNCV",ls:"200",nn:"CNCV",ns:"200",rs1:0.022767,xs1:0.025823,rs0:0.074178,xs0:0.020651},
  {type:"CN",ln:"CN-특고압케이블CNCV",ls:"250",nn:"CNCV",ns:"250",rs1:0.018242,xs1:0.024887,rs0:0.058122,xs0:0.018134},
  {type:"CN",ln:"CN-특고압케이블CNCV",ls:"325",nn:"CNCV",ns:"325",rs1:0.014325,xs1:0.023741,rs0:0.05322, xs0:0.01735},
  {type:"CN",ln:"CN-특고압케이블CNCV",ls:"400",nn:"CNCV",ns:"400",rs1:0.014301,xs1:0.02341, rs0:0.053222,xs0:0.017353},
  {type:"CN",ln:"CN-특고압케이블CNCV",ls:"600",nn:"CNCV",ns:"600",rs1:0.014035,xs1:0.024351,rs0:0.029481,xs0:0.012757},

  // CT-특고압케이블TR CNCV-W
  {type:"CT",ln:"CT-특고압케이블TR CNCV-W",ls:"60", nn:"TR CNCV-W",ns:"60", rs1:0.073879,xs1:0.03112, rs0:0.216242,xs0:0.067733},
  {type:"CT",ln:"CT-특고압케이블TR CNCV-W",ls:"100",nn:"TR CNCV-W",ns:"100",rs1:0.043896,xs1:0.00865, rs0:0.138822,xs0:0.038004},
  {type:"CT",ln:"CT-특고압케이블TR CNCV-W",ls:"150",nn:"TR CNCV-W",ns:"150",rs1:0.029128,xs1:0.02653, rs0:0.096775,xs0:0.025666},
  {type:"CT",ln:"CT-특고압케이블TR CNCV-W",ls:"200",nn:"TR CNCV-W",ns:"200",rs1:0.022767,xs1:0.025823,rs0:0.074178,xs0:0.020651},
  {type:"CT",ln:"CT-특고압케이블TR CNCV-W",ls:"250",nn:"TR CNCV-W",ns:"250",rs1:0.018242,xs1:0.024887,rs0:0.058122,xs0:0.018134},
  {type:"CT",ln:"CT-특고압케이블TR CNCV-W",ls:"325",nn:"TR CNCV-W",ns:"325",rs1:0.014325,xs1:0.023741,rs0:0.044678,xs0:0.015617},
  {type:"CT",ln:"CT-특고압케이블TR CNCV-W",ls:"400",nn:"TR CNCV-W",ns:"400",rs1:0.014301,xs1:0.02341, rs0:0.053222,xs0:0.017353},
  {type:"CT",ln:"CT-특고압케이블TR CNCV-W",ls:"600",nn:"TR CNCV-W",ns:"600",rs1:0.014035,xs1:0.024351,rs0:0.029481,xs0:0.012757},

  // CW-특고압케이블CNCV-W
  {type:"CW",ln:"CW-특고압케이블CNCV-W",ls:"60", nn:"CNCV-W",ns:"60", rs1:0.073879,xs1:0.03112, rs0:0.216242,xs0:0.067733},
  {type:"CW",ln:"CW-특고압케이블CNCV-W",ls:"100",nn:"CNCV-W",ns:"100",rs1:0.043896,xs1:0.00865, rs0:0.138822,xs0:0.038004},
  {type:"CW",ln:"CW-특고압케이블CNCV-W",ls:"150",nn:"CNCV-W",ns:"150",rs1:0.029128,xs1:0.02653, rs0:0.096775,xs0:0.025666},
  {type:"CW",ln:"CW-특고압케이블CNCV-W",ls:"200",nn:"CNCV-W",ns:"200",rs1:0.022767,xs1:0.025823,rs0:0.074178,xs0:0.020651},
  {type:"CW",ln:"CW-특고압케이블CNCV-W",ls:"250",nn:"CNCV-W",ns:"250",rs1:0.018742,xs1:0.024888,rs0:0.058122,xs0:0.018134},
  {type:"CW",ln:"CW-특고압케이블CNCV-W",ls:"325",nn:"CNCV-W",ns:"325",rs1:0.014325,xs1:0.023741,rs0:0.05322, xs0:0.01735},
  {type:"CW",ln:"CW-특고압케이블CNCV-W",ls:"400",nn:"CNCV-W",ns:"400",rs1:0.014301,xs1:0.02341, rs0:0.053222,xs0:0.017353},
  {type:"CW",ln:"CW-특고압케이블CNCV-W",ls:"600",nn:"CNCV-W",ns:"600",rs1:0.014035,xs1:0.024351,rs0:0.029481,xs0:0.012757},

  // EC-특고압ACSR-OC  (중성선종 AL-ACSR / WO-WO 구분)
  {type:"EC",ln:"EC-특고압ACSR-OC",ls:"32", nn:"AL-ACSR",ns:"32", rs1:0.1720,  xs1:0.0918,  rs0:0.2472,  xs0:0.3512},
  {type:"EC",ln:"EC-특고압ACSR-OC",ls:"32", nn:"WO-WO",  ns:"22", rs1:0.1720,  xs1:0.0918,  rs0:0.2472,  xs0:0.3512},
  {type:"EC",ln:"EC-특고압ACSR-OC",ls:"58", nn:"AL-ACSR",ns:"32", rs1:0.097664,xs1:0.083686,rs0:0.190211,xs0:0.282449},
  {type:"EC",ln:"EC-특고압ACSR-OC",ls:"58", nn:"AL-ACSR",ns:"58", rs1:0.097663,xs1:0.083683,rs0:0.172478,xs0:0.250478},
  {type:"EC",ln:"EC-특고압ACSR-OC",ls:"58", nn:"WO-WO",  ns:"38", rs1:0.0948,  xs1:0.0877,  rs0:0.1585,  xs0:0.3312},
  {type:"EC",ln:"EC-특고압ACSR-OC",ls:"95", nn:"AL-ACSR",ns:"58", rs1:0.059739,xs1:0.080851,rs0:0.134531,xs0:0.247718},
  {type:"EC",ln:"EC-특고압ACSR-OC",ls:"95", nn:"AL-ACSR",ns:"95", rs1:0.059738,xs1:0.08085, rs0:0.115743,xs0:0.231763},
  {type:"EC",ln:"EC-특고압ACSR-OC",ls:"95", nn:"WO-WO",  ns:"60", rs1:0.0580,  xs1:0.0841,  rs0:0.1350,  xs0:0.3085},
  {type:"EC",ln:"EC-특고압ACSR-OC",ls:"160",nn:"AL-ACSR",ns:"95", rs1:0.03557, xs1:0.077498,rs0:0.091575,xs0:0.228411},
  {type:"EC",ln:"EC-특고압ACSR-OC",ls:"160",nn:"WO-WO",  ns:"60", rs1:0.0347,  xs1:0.0746,  rs0:0.1199,  xs0:0.2926},
  {type:"EC",ln:"EC-특고압ACSR-OC",ls:"240",nn:"WO-WO",  ns:"60", rs1:0.023604,xs1:0.074538,rs0:0.078129,xs0:0.228651},

  // EH-특고압수밀형 OC-W
  {type:"EH",ln:"EH-특고압수밀형 OC-W",ls:"38", nn:"ACSR/AW, WL-AL 조합",ns:"38", rs1:0.095779,xs1:0.087555,rs0:0.169674,xs0:0.21151},
  {type:"EH",ln:"EH-특고압수밀형 OC-W",ls:"60", nn:"ACSR/AW, WL-AL 조합",ns:"38", rs1:0.059766,xs1:0.083983,rs0:0.13386, xs0:0.209016},
  {type:"EH",ln:"EH-특고압수밀형 OC-W",ls:"60", nn:"ACSR/AW, WL-AL 조합",ns:"60", rs1:0.059765,xs1:0.083982,rs0:0.120092,xs0:0.202658},
  {type:"EH",ln:"EH-특고압수밀형 OC-W",ls:"100",nn:"ACSR/AW, WL-AL 조합",ns:"60", rs1:0.035406,xs1:0.080206,rs0:0.096234,xs0:0.198883},
  {type:"EH",ln:"EH-특고압수밀형 OC-W",ls:"150",nn:"ACSR/AW, WL-AL 조합",ns:"60", rs1:0.023077,xs1:0.077212,rs0:0.083904,xs0:0.195889},

  // EW-특고압ACSR/AW-OC  (중성선종 AL-ACSR / WO-WO 구분)
  {type:"EW",ln:"EW-특고압ACSR/AW-OC",ls:"32", nn:"AL-ACSR",ns:"32", rs1:0.1720,  xs1:0.0918,  rs0:0.2472,  xs0:0.3512},
  {type:"EW",ln:"EW-특고압ACSR/AW-OC",ls:"32", nn:"WO-WO",  ns:"22", rs1:0.1720,  xs1:0.0918,  rs0:0.2472,  xs0:0.3512},
  {type:"EW",ln:"EW-특고압ACSR/AW-OC",ls:"58", nn:"AL-ACSR",ns:"32", rs1:0.0948,  xs1:0.0877,  rs0:0.1702,  xs0:0.3474},
  {type:"EW",ln:"EW-특고압ACSR/AW-OC",ls:"58", nn:"AL-ACSR",ns:"58", rs1:0.0948,  xs1:0.0877,  rs0:0.1585,  xs0:0.3312},
  {type:"EW",ln:"EW-특고압ACSR/AW-OC",ls:"58", nn:"WO-WO",  ns:"38", rs1:0.0948,  xs1:0.0877,  rs0:0.1585,  xs0:0.3312},
  {type:"EW",ln:"EW-특고압ACSR/AW-OC",ls:"95", nn:"AL-ACSR",ns:"58", rs1:0.0580,  xs1:0.0841,  rs0:0.1402,  xs0:0.3236},
  {type:"EW",ln:"EW-특고압ACSR/AW-OC",ls:"95", nn:"AL-ACSR",ns:"95", rs1:0.0580,  xs1:0.0841,  rs0:0.1350,  xs0:0.3085},
  {type:"EW",ln:"EW-특고압ACSR/AW-OC",ls:"95", nn:"WO-WO",  ns:"60", rs1:0.0580,  xs1:0.0841,  rs0:0.1350,  xs0:0.3085},
  {type:"EW",ln:"EW-특고압ACSR/AW-OC",ls:"160",nn:"AL-ACSR",ns:"95", rs1:0.0347,  xs1:0.0746,  rs0:0.1199,  xs0:0.2926},
  {type:"EW",ln:"EW-특고압ACSR/AW-OC",ls:"160",nn:"AL-ACSR",ns:"60", rs1:0.0347,  xs1:0.0746,  rs0:0.1199,  xs0:0.2946},
  {type:"EW",ln:"EW-특고압ACSR/AW-OC",ls:"240",nn:"AL-ACSR",ns:"95", rs1:0.023604,xs1:0.074538,rs0:0.079609,xs0:0.225451},
  {type:"EW",ln:"EW-특고압ACSR/AW-OC",ls:"240",nn:"WO-WO",  ns:"60", rs1:0.023604,xs1:0.074538,rs0:0.078129,xs0:0.228651},

  // OW-OW전선
  {type:"OW",ln:"OW-OW전선",ls:"22", nn:"WO-WKXJ / AL-ACSR",ns:"22", rs1:0.1560,xs1:0.0932,rs0:0.2342,xs0:0.3402},
  {type:"OW",ln:"OW-OW전선",ls:"38", nn:"WO-WKXJ / AL-ACSR",ns:"22", rs1:0.0922,xs1:0.0894,rs0:0.1704,xs0:0.3360},
  {type:"OW",ln:"OW-OW전선",ls:"38", nn:"WO-WKXJ / AL-ACSR",ns:"38", rs1:0.0922,xs1:0.0894,rs0:0.1585,xs0:0.3205},
  {type:"OW",ln:"OW-OW전선",ls:"60", nn:"WO-WKXJ / AL-ACSR",ns:"38", rs1:0.0922,xs1:0.0852,rs0:0.1427,xs0:0.3163},
  {type:"OW",ln:"OW-OW전선",ls:"60", nn:"WO-WKXJ / AL-ACSR",ns:"60", rs1:0.0573,xs1:0.0852,rs0:0.1354,xs0:0.3016},
  {type:"OW",ln:"OW-OW전선",ls:"100",nn:"WO-WKXJ / AL-ACSR",ns:"60", rs1:0.0337,xs1:0.0814,rs0:0.1215,xs0:0.2978},

  // WL-AL피복저손실ACSR/AW/L
  {type:"WL",ln:"WL-AL피복저손실ACSR/AW/L",ls:"32", nn:"ACSR/AWL",ns:"32", rs1:0.1720,xs1:0.0881,rs0:0.2472,xs0:0.3512},
  {type:"WL",ln:"WL-AL피복저손실ACSR/AW/L",ls:"58", nn:"ACSR/AWL",ns:"32", rs1:0.0948,xs1:0.0838,rs0:0.1702,xs0:0.3474},
  {type:"WL",ln:"WL-AL피복저손실ACSR/AW/L",ls:"58", nn:"ACSR/AWL",ns:"58", rs1:0.0948,xs1:0.0838,rs0:0.1585,xs0:0.3312},
  {type:"WL",ln:"WL-AL피복저손실ACSR/AW/L",ls:"95", nn:"ACSR/AWL",ns:"58", rs1:0.0580,xs1:0.0803,rs0:0.1402,xs0:0.3236},
  {type:"WL",ln:"WL-AL피복저손실ACSR/AW/L",ls:"95", nn:"ACSR/AWL",ns:"95", rs1:0.0580,xs1:0.0803,rs0:0.1350,xs0:0.3085},
  {type:"WL",ln:"WL-AL피복저손실ACSR/AW/L",ls:"160",nn:"ACSR/AWL",ns:"95", rs1:0.0347,xs1:0.0707,rs0:0.1199,xs0:0.2926},

  // WO-WO
  {type:"WO",ln:"WO-WO",ls:"22", nn:"WO-WKXJ / AL-ACSR",ns:"22", rs1:0.1560,xs1:0.0932,rs0:0.2342,xs0:0.3402},
  {type:"WO",ln:"WO-WO",ls:"38", nn:"WO-WKXJ / AL-ACSR",ns:"22", rs1:0.0922,xs1:0.0894,rs0:0.1704,xs0:0.3360},
  {type:"WO",ln:"WO-WO",ls:"38", nn:"WO-WKXJ / AL-ACSR",ns:"38", rs1:0.0922,xs1:0.0894,rs0:0.1585,xs0:0.3205},
  {type:"WO",ln:"WO-WO",ls:"60", nn:"WO-WKXJ / AL-ACSR",ns:"38", rs1:0.0922,xs1:0.0852,rs0:0.1427,xs0:0.3163},
  {type:"WO",ln:"WO-WO",ls:"60", nn:"WO-WKXJ / AL-ACSR",ns:"60", rs1:0.0574,xs1:0.0852,rs0:0.1354,xs0:0.3016},
  {type:"WO",ln:"WO-WO",ls:"100",nn:"WO-WKXJ / AL-ACSR",ns:"60", rs1:0.0337,xs1:0.0814,rs0:0.1215,xs0:0.2978},

];

// MARK: - DB 쿼리 헬퍼
const lineNames = [...new Set(DB.map(d => d.ln))].sort();

function getLineSizes(ln) {
  return [...new Set(DB.filter(d => d.ln === ln).map(d => d.ls))]
    .sort((a, b) => (parseInt(a) || 0) - (parseInt(b) || 0));
}

function getNeutralOptions(ln, ls) {
  return DB.filter(d => d.ln === ln && d.ls === ls).map(d => ({ nn: d.nn, ns: d.ns }));
}
