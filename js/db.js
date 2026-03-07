// ================================================
// 임피던스 데이터베이스 (p.u./km, 100MVA 22.9kV 기준)
// 선종 추가/수정 시 이 파일만 업데이트하면 됩니다.
// ================================================

const DB = [
  // AL-ACSR전선
  {type:"AL",ln:"AL-ACSR전선",ls:"160",nn:"AL-ACSR전선",ns:"95",rs1:0.022968,xs1:0.071391,rs0:0.078974,xs0:0.222305},
  {type:"AL",ln:"AL-ACSR전선",ls:"240",nn:"AL-ACSR전선",ns:"95",rs1:0.022968,xs1:0.071391,rs0:0.078974,xs0:0.222305},
  {type:"AL",ln:"AL-ACSR전선",ls:"32",nn:"AL-ACSR전선",ns:"32",rs1:0.171452,xs1:0.086911,rs0:0.264,xs0:0.285673},
  {type:"AL",ln:"AL-ACSR전선",ls:"58",nn:"AL-ACSR전선",ns:"32",rs1:0.094807,xs1:0.082637,rs0:0.187354,xs0:0.2814},
  {type:"AL",ln:"AL-ACSR전선",ls:"58",nn:"AL-ACSR전선",ns:"58",rs1:0.094806,xs1:0.082634,rs0:0.16962,xs0:0.249429},
  {type:"AL",ln:"AL-ACSR전선",ls:"95",nn:"AL-ACSR전선",ns:"58",rs1:0.057448,xs1:0.07902,rs0:0.132239,xs0:0.245888},
  {type:"AL",ln:"AL-ACSR전선",ls:"95",nn:"AL-ACSR전선",ns:"95",rs1:0.057446,xs1:0.079019,rs0:0.113451,xs0:0.229933},
  // AS-AISC 특고압 가공 단심 케이블
  {type:"AS",ln:"AS-AISC 특고압 가공 단심 케이블",ls:"150",nn:"AS-AISC 특고압 가공 단심 케이블",ns:"150",rs1:0.06199347838523294,xs1:0.028603573539787576,rs0:0.09450620697545814,xs0:0.01510268682900784},
  {type:"AS",ln:"AS-AISC 특고압 가공 단심 케이블",ls:"50",nn:"AS-AISC 특고압 가공 단심 케이블",ns:"50",rs1:0.16462310024599073,xs1:0.03184531187429683,rs0:0.47582998035887947,xs0:0.01891649663431285},
  {type:"AS",ln:"AS-AISC 특고압 가공 단심 케이블",ls:"95",nn:"AS-AISC 특고압 가공 단심 케이블",ns:"95",rs1:0.08743158978661736,xs1:0.02974771648137908,rs0:0.13544745523540742,xs0:0.01718121317289907},
  // AT-AITC 특고압 가공 3심 케이블
  {type:"AT",ln:"AT-AITC 특고압 가공 3심 케이블",ls:"150",nn:"AT-AITC 특고압 가공 3심 케이블",ns:"150",rs1:0.02484697088156214,xs1:0.024217692263686814,rs0:0.07360652924238669,xs0:0.04528899143799699},
  {type:"AT",ln:"AT-AITC 특고압 가공 3심 케이블",ls:"240",nn:"AT-AITC 특고압 가공 3심 케이블",ns:"240",rs1:0.04155145782879808,xs1:0.02326423981236056,rs0:0.08861387082626191,xs0:0.04090311016189623},
  {type:"AT",ln:"AT-AITC 특고압 가공 3심 케이블",ls:"50",nn:"AT-AITC 특고압 가공 3심 케이블",ns:"50",rs1:0.16706393852138596,xs1:0.027840811578726568,rs0:0.244350794225892,xs0:0.05673042085391202},
  {type:"AT",ln:"AT-AITC 특고압 가공 3심 케이블",ls:"95",nn:"AT-AITC 특고압 가공 3심 케이블",ns:"95",rs1:0.087927385061307,xs1:0.02650597814686982,rs0:0.14496291069964343,xs0:0.05154363951869721},
  // AW-특고압ACSR/AW
  {type:"AW",ln:"AW-특고압ACSR/AW",ls:"160",nn:"AL-ACSR전선",ns:"95",rs1:0.022968,xs1:0.071391,rs0:0.078974,xs0:0.222305},
  {type:"AW",ln:"AW-특고압ACSR/AW",ls:"240",nn:"AL-ACSR전선",ns:"95",rs1:0.022968,xs1:0.071391,rs0:0.078974,xs0:0.222305},
  {type:"AW",ln:"AW-특고압ACSR/AW",ls:"32",nn:"AL-ACSR전선",ns:"32",rs1:0.171452,xs1:0.086911,rs0:0.264,xs0:0.285673},
  {type:"AW",ln:"AW-특고압ACSR/AW",ls:"58",nn:"AL-ACSR전선",ns:"32",rs1:0.094807,xs1:0.082637,rs0:0.187354,xs0:0.2814},
  {type:"AW",ln:"AW-특고압ACSR/AW",ls:"58",nn:"AL-ACSR전선",ns:"58",rs1:0.094806,xs1:0.082634,rs0:0.16962,xs0:0.249429},
  {type:"AW",ln:"AW-특고압ACSR/AW",ls:"95",nn:"AL-ACSR전선",ns:"58",rs1:0.057448,xs1:0.07902,rs0:0.132239,xs0:0.245888},
  {type:"AW",ln:"AW-특고압ACSR/AW",ls:"95",nn:"AL-ACSR전선",ns:"95",rs1:0.057446,xs1:0.079019,rs0:0.113451,xs0:0.229933},
  // CA-22.9kV TR CNCE-W/AL
  {type:"CA",ln:"CA-22.9kV TR CNCE-W/AL",ls:"240",nn:"CA-22.9kV TR CNCE-W/AL",ns:"240",rs1:0.03081558322686448,xs1:0.02543811140138441,rs0:0.006445338570965465,xs0:0.028679849735893673},
  {type:"CA",ln:"CA-22.9kV TR CNCE-W/AL",ls:"400",nn:"CA-22.9kV TR CNCE-W/AL",ns:"400",rs1:0.019431360958029025,xs1:0.019431360958029025,rs0:0.003337083579641884,xs0:0.020670849144753154},
  {type:"CA",ln:"CA-22.9kV TR CNCE-W/AL",ls:"95",nn:"CA-22.9kV TR CNCE-W/AL",ns:"95",rs1:0.07831658435193837,xs1:0.02890867832421198,rs0:0.023493068400678863,xs0:0.05278312770542134},
  // CB-22.9kV FR CNCO-W/AL
  {type:"CB",ln:"CB-22.9kV FR CNCO-W/AL",ls:"240",nn:"CB-22.9kV FR CNCO-W/AL",ns:"240",rs1:0.030720237981731855,xs1:0.022310787361034308,rs0:0.05669228275585897,xs0:0.01090749604317233},
  {type:"CB",ln:"CB-22.9kV FR CNCO-W/AL",ls:"400",nn:"CB-22.9kV FR CNCO-W/AL",ns:"400",rs1:0.019355084761922925,xs1:0.020594572948647050,rs0:0.044926679506493015,xs0:0.010850288896092752},
  {type:"CB",ln:"CB-22.9kV FR CNCO-W/AL",ls:"95",nn:"CB-22.9kV FR CNCO-W/AL",ns:"95",rs1:0.0777254438321161,xs1:0.024866039930588660,rs0:0.101618962262352,xs0:0.01090749604317233},
  // CE-TR CNCE-W
  {type:"CE",ln:"CE-TR CNCE-W",ls:"200",nn:"CE-TR CNCE-W",ns:"200",rs1:0.024637211342270366,xs1:0.02658225434297592,rs0:0.08689765641387465,xs0:0.024599073244217315},
  {type:"CE",ln:"CE-TR CNCE-W",ls:"325",nn:"CE-TR CNCE-W",ns:"325",rs1:0.017848629888827445,xs1:0.024618142293243840,rs0:0.05440399687267597,xs0:0.016952384584580769},
  {type:"CE",ln:"CE-TR CNCE-W",ls:"60",nn:"CE-TR CNCE-W",ns:"60",rs1:0.074903224576190395,xs1:0.03167369043305811,rs0:0.24631490627562407,xs0:0.09868232871226711},
  {type:"CE",ln:"CE-TR CNCE-W",ls:"600",nn:"CE-TR CNCE-W",ns:"600",rs1:0.013596231955912360,xs1:0.020842470585991877,rs0:0.0301481665109361,xs0:0.012738124749718733},
  // CF-특고압케이블 FR CNCO-W
  {type:"CF",ln:"CF-특고압케이블 FR CNCO-W",ls:"100",nn:"CF-특고압케이블 FR CNCO-W",ns:"100",rs1:0.043896,xs1:0.00865,rs0:0.138822,xs0:0.038004},
  {type:"CF",ln:"CF-특고압케이블 FR CNCO-W",ls:"150",nn:"CF-특고압케이블 FR CNCO-W",ns:"150",rs1:0.029128,xs1:0.02653,rs0:0.096775,xs0:0.025666},
  {type:"CF",ln:"CF-특고압케이블 FR CNCO-W",ls:"200",nn:"CF-특고압케이블 FR CNCO-W",ns:"200",rs1:0.022767,xs1:0.025823,rs0:0.074178,xs0:0.020651},
  {type:"CF",ln:"CF-특고압케이블 FR CNCO-W",ls:"250",nn:"CF-특고압케이블 FR CNCO-W",ns:"250",rs1:0.018242,xs1:0.024887,rs0:0.058122,xs0:0.018134},
  {type:"CF",ln:"CF-특고압케이블 FR CNCO-W",ls:"325",nn:"CF-특고압케이블 FR CNCO-W",ns:"325",rs1:0.014325,xs1:0.023741,rs0:0.044678,xs0:0.015617},
  {type:"CF",ln:"CF-특고압케이블 FR CNCO-W",ls:"400",nn:"CF-특고압케이블 FR CNCO-W",ns:"400",rs1:0.014301,xs1:0.02341,rs0:0.053222,xs0:0.017353},
  {type:"CF",ln:"CF-특고압케이블 FR CNCO-W",ls:"60",nn:"CF-특고압케이블 FR CNCO-W",ns:"60",rs1:0.073879,xs1:0.03112,rs0:0.216242,xs0:0.067733},
  {type:"CF",ln:"CF-특고압케이블 FR CNCO-W",ls:"600",nn:"CF-특고압케이블 FR CNCO-W",ns:"600",rs1:0.014035,xs1:0.024351,rs0:0.029481,xs0:0.012757},
  // CN-특고압케이블CNCV
  {type:"CN",ln:"CN-특고압케이블CNCV",ls:"100",nn:"CN-특고압케이블CNCV",ns:"100",rs1:0.043896,xs1:0.00865,rs0:0.138822,xs0:0.038004},
  {type:"CN",ln:"CN-특고압케이블CNCV",ls:"150",nn:"CN-특고압케이블CNCV",ns:"150",rs1:0.029128,xs1:0.02653,rs0:0.096775,xs0:0.025666},
  {type:"CN",ln:"CN-특고압케이블CNCV",ls:"200",nn:"CN-특고압케이블CNCV",ns:"200",rs1:0.022767,xs1:0.025823,rs0:0.074178,xs0:0.020651},
  {type:"CN",ln:"CN-특고압케이블CNCV",ls:"250",nn:"CN-특고압케이블CNCV",ns:"250",rs1:0.018242,xs1:0.024887,rs0:0.058122,xs0:0.018134},
  {type:"CN",ln:"CN-특고압케이블CNCV",ls:"325",nn:"CN-특고압케이블CNCV",ns:"325",rs1:0.014325,xs1:0.023741,rs0:0.044678,xs0:0.015617},
  {type:"CN",ln:"CN-특고압케이블CNCV",ls:"400",nn:"CN-특고압케이블CNCV",ns:"400",rs1:0.014301,xs1:0.02341,rs0:0.053222,xs0:0.017353},
  {type:"CN",ln:"CN-특고압케이블CNCV",ls:"60",nn:"CN-특고압케이블CNCV",ns:"60",rs1:0.073879,xs1:0.03112,rs0:0.216242,xs0:0.067733},
  {type:"CN",ln:"CN-특고압케이블CNCV",ls:"600",nn:"CN-특고압케이블CNCV",ns:"600",rs1:0.014035,xs1:0.024351,rs0:0.029481,xs0:0.012757},
  // CT-특고압케이블TR CNCV-W
  {type:"CT",ln:"CT-특고압케이블TR CNCV-W",ls:"100",nn:"CT-특고압케이블TR CNCV-W",ns:"100",rs1:0.043896,xs1:0.00865,rs0:0.138822,xs0:0.038004},
  {type:"CT",ln:"CT-특고압케이블TR CNCV-W",ls:"150",nn:"CT-특고압케이블TR CNCV-W",ns:"150",rs1:0.029128,xs1:0.02653,rs0:0.096775,xs0:0.025666},
  {type:"CT",ln:"CT-특고압케이블TR CNCV-W",ls:"200",nn:"CT-특고압케이블TR CNCV-W",ns:"200",rs1:0.022767,xs1:0.025823,rs0:0.074178,xs0:0.020651},
  {type:"CT",ln:"CT-특고압케이블TR CNCV-W",ls:"250",nn:"CT-특고압케이블TR CNCV-W",ns:"250",rs1:0.018242,xs1:0.024887,rs0:0.058122,xs0:0.018134},
  {type:"CT",ln:"CT-특고압케이블TR CNCV-W",ls:"325",nn:"CT-특고압케이블TR CNCV-W",ns:"325",rs1:0.014325,xs1:0.023741,rs0:0.044678,xs0:0.015617},
  {type:"CT",ln:"CT-특고압케이블TR CNCV-W",ls:"400",nn:"CT-특고압케이블TR CNCV-W",ns:"400",rs1:0.014301,xs1:0.02341,rs0:0.053222,xs0:0.017353},
  {type:"CT",ln:"CT-특고압케이블TR CNCV-W",ls:"60",nn:"CT-특고압케이블TR CNCV-W",ns:"60",rs1:0.073879,xs1:0.03112,rs0:0.216242,xs0:0.067733},
  {type:"CT",ln:"CT-특고압케이블TR CNCV-W",ls:"600",nn:"CT-특고압케이블TR CNCV-W",ns:"600",rs1:0.014035,xs1:0.024351,rs0:0.029481,xs0:0.012757},
  // CW-특고압케이블CNCV-W
  {type:"CW",ln:"CW-특고압케이블CNCV-W",ls:"100",nn:"CW-특고압케이블CNCV-W",ns:"100",rs1:0.043896,xs1:0.00865,rs0:0.138822,xs0:0.038004},
  {type:"CW",ln:"CW-특고압케이블CNCV-W",ls:"150",nn:"CW-특고압케이블CNCV-W",ns:"150",rs1:0.029128,xs1:0.02653,rs0:0.096775,xs0:0.025666},
  {type:"CW",ln:"CW-특고압케이블CNCV-W",ls:"200",nn:"CW-특고압케이블CNCV-W",ns:"200",rs1:0.022767,xs1:0.025823,rs0:0.074178,xs0:0.020651},
  {type:"CW",ln:"CW-특고압케이블CNCV-W",ls:"250",nn:"CW-특고압케이블CNCV-W",ns:"250",rs1:0.018242,xs1:0.024887,rs0:0.058122,xs0:0.018134},
  {type:"CW",ln:"CW-특고압케이블CNCV-W",ls:"325",nn:"CW-특고압케이블CNCV-W",ns:"325",rs1:0.014325,xs1:0.023741,rs0:0.044678,xs0:0.015617},
  {type:"CW",ln:"CW-특고압케이블CNCV-W",ls:"400",nn:"CW-특고압케이블CNCV-W",ns:"400",rs1:0.014301,xs1:0.02341,rs0:0.053222,xs0:0.017353},
  {type:"CW",ln:"CW-특고압케이블CNCV-W",ls:"60",nn:"CW-특고압케이블CNCV-W",ns:"60",rs1:0.073879,xs1:0.03112,rs0:0.216242,xs0:0.067733},
  {type:"CW",ln:"CW-특고압케이블CNCV-W",ls:"600",nn:"CW-특고압케이블CNCV-W",ns:"600",rs1:0.014035,xs1:0.024351,rs0:0.029481,xs0:0.012757},
  // EC-특고압ACSR-OC
  {type:"EC",ln:"EC-특고압ACSR-OC",ls:"160",nn:"AL-ACSR전선",ns:"95",rs1:0.03557,xs1:0.077498,rs0:0.091575,xs0:0.228411},
  {type:"EC",ln:"EC-특고압ACSR-OC",ls:"160",nn:"WO-WO전선",ns:"60",rs1:0.034999,xs1:0.077498,rs0:0.089524,xs0:0.231611},
  {type:"EC",ln:"EC-특고압ACSR-OC",ls:"240",nn:"WO-WO전선",ns:"60",rs1:0.023604,xs1:0.074538,rs0:0.078129,xs0:0.228651},
  {type:"EC",ln:"EC-특고압ACSR-OC",ls:"32",nn:"AL-ACSR전선",ns:"32",rs1:0.176981,xs1:0.087964,rs0:0.269528,xs0:0.286726},
  {type:"EC",ln:"EC-특고압ACSR-OC",ls:"32",nn:"WO-WO전선",ns:"22",rs1:0.167256,xs1:0.087964,rs0:0.255962,xs0:0.281705},
  {type:"EC",ln:"EC-특고압ACSR-OC",ls:"58",nn:"AL-ACSR전선",ns:"32",rs1:0.097664,xs1:0.083686,rs0:0.190211,xs0:0.282449},
  {type:"EC",ln:"EC-특고압ACSR-OC",ls:"58",nn:"AL-ACSR전선",ns:"58",rs1:0.097663,xs1:0.083683,rs0:0.172478,xs0:0.250478},
  {type:"EC",ln:"EC-특고압ACSR-OC",ls:"58",nn:"WO-WO전선",ns:"38",rs1:0.092325,xs1:0.083683,rs0:0.164131,xs0:0.251626},
  {type:"EC",ln:"EC-특고압ACSR-OC",ls:"95",nn:"AL-ACSR전선",ns:"58",rs1:0.059739,xs1:0.080851,rs0:0.134531,xs0:0.247718},
  {type:"EC",ln:"EC-특고압ACSR-OC",ls:"95",nn:"AL-ACSR전선",ns:"95",rs1:0.059738,xs1:0.08085,rs0:0.115743,xs0:0.231763},
  {type:"EC",ln:"EC-특고압ACSR-OC",ls:"95",nn:"WO-WO전선",ns:"60",rs1:0.057642,xs1:0.08085,rs0:0.112167,xs0:0.234963},
  // EH-특고압수밀형 OC-W
  {type:"EH",ln:"EH-특고압수밀형 OC-W",ls:"100",nn:"WO-WO전선",ns:"60",rs1:0.035406,xs1:0.080206,rs0:0.096234,xs0:0.198883},
  {type:"EH",ln:"EH-특고압수밀형 OC-W",ls:"150",nn:"WO-WO전선",ns:"60",rs1:0.023077,xs1:0.077212,rs0:0.083904,xs0:0.195889},
  {type:"EH",ln:"EH-특고압수밀형 OC-W",ls:"38",nn:"WO-WO전선",ns:"38",rs1:0.095779,xs1:0.087555,rs0:0.169674,xs0:0.21151},
  {type:"EH",ln:"EH-특고압수밀형 OC-W",ls:"60",nn:"WO-WO전선",ns:"38",rs1:0.059766,xs1:0.083983,rs0:0.13386,xs0:0.209016},
  {type:"EH",ln:"EH-특고압수밀형 OC-W",ls:"60",nn:"WO-WO전선",ns:"60",rs1:0.059765,xs1:0.083982,rs0:0.120592,xs0:0.202658},
  // EW-특고압ACSR/AW-OC
  {type:"EW",ln:"EW-특고압ACSR/AW-OC",ls:"160",nn:"AL-ACSR전선",ns:"95",rs1:0.034999,xs1:0.077498,rs0:0.091004,xs0:0.228411},
  {type:"EW",ln:"EW-특고압ACSR/AW-OC",ls:"160",nn:"WO-WO전선",ns:"60",rs1:0.034999,xs1:0.077498,rs0:0.089524,xs0:0.231611},
  {type:"EW",ln:"EW-특고압ACSR/AW-OC",ls:"240",nn:"AL-ACSR전선",ns:"95",rs1:0.023604,xs1:0.074538,rs0:0.079609,xs0:0.225451},
  {type:"EW",ln:"EW-특고압ACSR/AW-OC",ls:"240",nn:"WO-WO전선",ns:"60",rs1:0.023604,xs1:0.074538,rs0:0.078129,xs0:0.228651},
  {type:"EW",ln:"EW-특고압ACSR/AW-OC",ls:"32",nn:"AL-ACSR전선",ns:"32",rs1:0.167256,xs1:0.087964,rs0:0.259802,xs0:0.286726},
  {type:"EW",ln:"EW-특고압ACSR/AW-OC",ls:"32",nn:"WO-WO전선",ns:"22",rs1:0.167256,xs1:0.087964,rs0:0.255962,xs0:0.281705},
  {type:"EW",ln:"EW-특고압ACSR/AW-OC",ls:"58",nn:"AL-ACSR전선",ns:"32",rs1:0.092332,xs1:0.08368,rs0:0.187806,xs0:0.278164},
  {type:"EW",ln:"EW-특고압ACSR/AW-OC",ls:"58",nn:"AL-ACSR전선",ns:"58",rs1:0.092325,xs1:0.083683,rs0:0.16714,xs0:0.250478},
  {type:"EW",ln:"EW-특고압ACSR/AW-OC",ls:"58",nn:"WO-WO전선",ns:"38",rs1:0.092325,xs1:0.083683,rs0:0.164131,xs0:0.251626},
  {type:"EW",ln:"EW-특고압ACSR/AW-OC",ls:"95",nn:"AL-ACSR전선",ns:"58",rs1:0.057643,xs1:0.080851,rs0:0.132435,xs0:0.247718},
  {type:"EW",ln:"EW-특고압ACSR/AW-OC",ls:"95",nn:"AL-ACSR전선",ns:"95",rs1:0.057642,xs1:0.08085,rs0:0.113647,xs0:0.231763},
  {type:"EW",ln:"EW-특고압ACSR/AW-OC",ls:"95",nn:"WO-WO전선",ns:"60",rs1:0.057642,xs1:0.08085,rs0:0.112167,xs0:0.234963},
  // OW-OW전선
  {type:"OW",ln:"OW-OW전선",ls:"100",nn:"WO-WO전선",ns:"60",rs1:0.0337,xs1:0.0769,rs0:0.1215,xs0:0.2978},
  {type:"OW",ln:"OW-OW전선",ls:"22",nn:"WO-WO전선",ns:"22",rs1:0.156,xs1:0.0887,rs0:0.2342,xs0:0.3402},
  {type:"OW",ln:"OW-OW전선",ls:"38",nn:"WO-WO전선",ns:"22",rs1:0.0922,xs1:0.0849,rs0:0.1704,xs0:0.336},
  {type:"OW",ln:"OW-OW전선",ls:"38",nn:"WO-WO전선",ns:"38",rs1:0.0922,xs1:0.0849,rs0:0.1585,xs0:0.3205},
  {type:"OW",ln:"OW-OW전선",ls:"60",nn:"WO-WO전선",ns:"38",rs1:0.0922,xs1:0.0807,rs0:0.1427,xs0:0.3163},
  {type:"OW",ln:"OW-OW전선",ls:"60",nn:"WO-WO전선",ns:"60",rs1:0.0573,xs1:0.0807,rs0:0.1354,xs0:0.3016},
  // TW-ACSR/AW-TR/OC
  {type:"TW",ln:"TW-ACSR/AW-TR/OC",ls:"160",nn:"TW-ACSR/AW-TR/OC",ns:"160",rs1:0.08947,xs1:0.07756,rs0:0.36495,xs0:0.35642},
  {type:"TW",ln:"TW-ACSR/AW-TR/OC",ls:"240",nn:"TW-ACSR/AW-TR/OC",ns:"240",rs1:0.08046,xs1:0.07461,rs0:0.35922,xs0:0.35347},
  {type:"TW",ln:"TW-ACSR/AW-TR/OC",ls:"58",nn:"TW-ACSR/AW-TR/OC",ns:"58",rs1:0.14463,xs1:0.08419,rs0:0.39333,xs0:0.36305},
  {type:"TW",ln:"TW-ACSR/AW-TR/OC",ls:"95",nn:"TW-ACSR/AW-TR/OC",ns:"95",rs1:0.10943,xs1:0.08114,rs0:0.37566,xs0:0.36},
  // WL-AL피복저손실ACSR/AW/L
  {type:"WL",ln:"WL-AL피복저손실ACSR/AW/L",ls:"160",nn:"AL-ACSR전선",ns:"95",rs1:0.0347,xs1:0.0707,rs0:0.1199,xs0:0.2926},
  {type:"WL",ln:"WL-AL피복저손실ACSR/AW/L",ls:"32",nn:"AL-ACSR전선",ns:"32",rs1:0.172,xs1:0.0881,rs0:0.2472,xs0:0.3512},
  {type:"WL",ln:"WL-AL피복저손실ACSR/AW/L",ls:"58",nn:"AL-ACSR전선",ns:"32",rs1:0.0948,xs1:0.0838,rs0:0.1702,xs0:0.3474},
  {type:"WL",ln:"WL-AL피복저손실ACSR/AW/L",ls:"58",nn:"AL-ACSR전선",ns:"58",rs1:0.0948,xs1:0.0838,rs0:0.1585,xs0:0.3312},
  {type:"WL",ln:"WL-AL피복저손실ACSR/AW/L",ls:"95",nn:"AL-ACSR전선",ns:"58",rs1:0.058,xs1:0.0803,rs0:0.1402,xs0:0.3236},
  {type:"WL",ln:"WL-AL피복저손실ACSR/AW/L",ls:"95",nn:"AL-ACSR전선",ns:"95",rs1:0.058,xs1:0.0803,rs0:0.135,xs0:0.3085},
  // WO-WO전선
  {type:"WO",ln:"WO-WO전선",ls:"100",nn:"WO-WO전선",ns:"60",rs1:0.033886,xs1:0.080317,rs0:0.094714,xs0:0.198993},
  {type:"WO",ln:"WO-WO전선",ls:"22",nn:"WO-WO전선",ns:"22",rs1:0.156021,xs1:0.09133,rs0:0.24425,xs0:0.229355},
  {type:"WO",ln:"WO-WO전선",ls:"38",nn:"WO-WO전선",ns:"22",rs1:0.09235,xs1:0.087557,rs0:0.180579,xs0:0.225581},
  {type:"WO",ln:"WO-WO전선",ls:"38",nn:"WO-WO전선",ns:"38",rs1:0.092349,xs1:0.087556,rs0:0.166508,xs0:0.212393},
  {type:"WO",ln:"WO-WO전선",ls:"60",nn:"WO-WO전선",ns:"38",rs1:0.057481,xs1:0.083983,rs0:0.131575,xs0:0.209016},
  {type:"WO",ln:"WO-WO전선",ls:"60",nn:"WO-WO전선",ns:"60",rs1:0.05748,xs1:0.083982,rs0:0.118307,xs0:0.202658},
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
