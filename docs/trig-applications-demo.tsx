import React, { useState, useEffect } from 'react';

export default function TrigApplicationsDemo() {
  const [activeDemo, setActiveDemo] = useState('building');
  
  // 建築・測量デモ
  const [calcMode, setCalcMode] = useState('height'); // 'height', 'distance', 'angle'
  const [distance, setDistance] = useState(50);
  const [viewAngle, setViewAngle] = useState(30);
  const [buildingHeight, setBuildingHeight] = useState(28.9);
  
  // 計算モードに応じて値を更新
  useEffect(() => {
    if (calcMode === 'height') {
      setBuildingHeight(distance * Math.tan((viewAngle * Math.PI) / 180));
    } else if (calcMode === 'distance') {
      setDistance(buildingHeight / Math.tan((viewAngle * Math.PI) / 180));
    } else if (calcMode === 'angle') {
      setViewAngle((Math.atan(buildingHeight / distance) * 180) / Math.PI);
    }
  }, [calcMode, distance, viewAngle, buildingHeight]);
  
  // ゲーム開発デモ
  const [gameAngle, setGameAngle] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(2);
  useEffect(() => {
    const interval = setInterval(() => {
      setGameAngle(prev => (prev + gameSpeed) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [gameSpeed]);
  
  // 音波デモ
  const [frequency, setFrequency] = useState(2);
  const [amplitude, setAmplitude] = useState(50);
  
  // ロボットアームデモ
  const [armAngle1, setArmAngle1] = useState(45);
  const [armAngle2, setArmAngle2] = useState(45);
  const armLength1 = 80;
  const armLength2 = 60;
  const joint1X = 200 + armLength1 * Math.cos((armAngle1 * Math.PI) / 180);
  const joint1Y = 200 - armLength1 * Math.sin((armAngle1 * Math.PI) / 180);
  const endX = joint1X + armLength2 * Math.cos(((armAngle1 + armAngle2) * Math.PI) / 180);
  const endY = joint1Y - armLength2 * Math.sin(((armAngle1 + armAngle2) * Math.PI) / 180);
  
  // GPS三角測量デモ
  const [satellite1Dist, setSatellite1Dist] = useState(100);
  const [satellite2Dist, setSatellite2Dist] = useState(120);
  
  const demos = [
    { id: 'building', icon: '🏗️', title: '建築・測量', desc: '角度から建物の高さを計算' },
    { id: 'game', icon: '🎮', title: 'ゲーム開発', desc: 'キャラクターの円運動' },
    { id: 'sound', icon: '🎵', title: '音波', desc: '正弦波の可視化' },
    { id: 'robot', icon: '🤖', title: 'ロボットアーム', desc: '関節制御のシミュレーション' },
    { id: 'gps', icon: '📡', title: 'GPS測位', desc: '三角測量の原理' },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-indigo-900">
          三角関数の実用例デモ
        </h1>
        <p className="text-center text-gray-600 mb-8">
          実際の場面で三角関数がどう使われているかを体験しよう
        </p>
        
        {/* デモ選択タブ */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {demos.map(demo => (
            <button
              key={demo.id}
              onClick={() => setActiveDemo(demo.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeDemo === demo.id
                  ? 'bg-indigo-600 text-white shadow-lg scale-105'
                  : 'bg-white text-indigo-800 hover:bg-indigo-100'
              }`}
            >
              <span className="text-2xl mr-2">{demo.icon}</span>
              {demo.title}
            </button>
          ))}
        </div>
        
        {/* 建築・測量デモ */}
        {activeDemo === 'building' && (
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-indigo-800">🏗️ 建築・測量</h2>
            <p className="text-gray-700 mb-4">
              建物から一定の距離離れた地点から見上げた角度を測定すれば、三角関数を使って建物の高さを計算できます。
            </p>
            
            {/* 何を求めるか選択 */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-center mb-4 text-indigo-900">何を求めますか？</h3>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setCalcMode('height')}
                  className={`px-8 py-4 rounded-lg font-bold text-lg transition-all ${
                    calcMode === 'height'
                      ? 'bg-indigo-600 text-white shadow-lg scale-105'
                      : 'bg-white text-indigo-800 hover:bg-indigo-100'
                  }`}
                >
                  📏 高さ
                </button>
                <button
                  onClick={() => setCalcMode('distance')}
                  className={`px-8 py-4 rounded-lg font-bold text-lg transition-all ${
                    calcMode === 'distance'
                      ? 'bg-indigo-600 text-white shadow-lg scale-105'
                      : 'bg-white text-indigo-800 hover:bg-indigo-100'
                  }`}
                >
                  📐 距離
                </button>
                <button
                  onClick={() => setCalcMode('angle')}
                  className={`px-8 py-4 rounded-lg font-bold text-lg transition-all ${
                    calcMode === 'angle'
                      ? 'bg-indigo-600 text-white shadow-lg scale-105'
                      : 'bg-white text-indigo-800 hover:bg-indigo-100'
                  }`}
                >
                  📐 角度
                </button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <svg width="400" height="300" className="border-2 border-gray-200 rounded-lg bg-sky-50">
                  {/* 地面 */}
                  <rect x="0" y="250" width="400" height="50" fill="#8b7355" />
                  
                  {/* 建物（右側固定） */}
                  <rect x="340" y={250 - buildingHeight * 1.5} width="60" height={buildingHeight * 1.5} fill="#64748b" stroke="#1e293b" strokeWidth="2" />
                  <rect x="350" y={260 - buildingHeight * 1.5} width="15" height="15" fill="#93c5fd" />
                  <rect x="375" y={260 - buildingHeight * 1.5} width="15" height="15" fill="#93c5fd" />
                  
                  {/* 観測者の位置（距離に応じて移動） */}
                  {(() => {
                    const observerX = 340 - distance * 2.5;
                    const buildingBaseX = 340;
                    const buildingTopY = 250 - buildingHeight * 1.5;
                    const angleRad = (viewAngle * Math.PI) / 180;
                    
                    return (
                      <>
                        {/* 観測者 */}
                        <circle cx={observerX} cy="240" r="8" fill="#ef4444" />
                        <line x1={observerX} y1="240" x2={observerX} y2="220" stroke="#ef4444" strokeWidth="3" />
                        
                        {/* 距離線（地面） */}
                        <line x1={observerX} y1="250" x2={buildingBaseX} y2="250" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />
                        <text x={observerX + (buildingBaseX - observerX) / 2 - 20} y="270" fill="#10b981" fontSize="14" fontWeight="bold">
                          {distance.toFixed(1)}m
                        </text>
                        
                        {/* 視線（観測者から建物の上端へ） */}
                        <line 
                          x1={observerX} 
                          y1="240" 
                          x2={buildingBaseX} 
                          y2={buildingTopY} 
                          stroke="#f59e0b" 
                          strokeWidth="2" 
                        />
                        
                        {/* 角度の弧 */}
                        <path
                          d={`M ${observerX + 30} 240 A 30 30 0 0 0 ${observerX + 30 * Math.cos(angleRad)} ${240 - 30 * Math.sin(angleRad)}`}
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="2"
                        />
                        <text x={observerX + 35} y="235" fill="#f59e0b" fontSize="14" fontWeight="bold">{viewAngle.toFixed(1)}°</text>
                        
                        {/* 高さ線（建物の側面） */}
                        <line 
                          x1={buildingBaseX} 
                          y1="250" 
                          x2={buildingBaseX} 
                          y2={buildingTopY} 
                          stroke="#ef4444" 
                          strokeWidth="2" 
                          strokeDasharray="5,5" 
                        />
                        <text 
                          x={buildingBaseX - 30} 
                          y={250 - (buildingHeight * 1.5) / 2} 
                          fill="#ef4444" 
                          fontSize="14" 
                          fontWeight="bold"
                        >
                          {buildingHeight.toFixed(1)}m
                        </text>
                      </>
                    );
                  })()}
                </svg>
              </div>
              
              <div className="space-y-6">
                {/* 入力パラメータ */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-blue-900 mb-3">入力する値</h3>
                  
                  {calcMode !== 'distance' && (
                    <div className="mb-4">
                      <label className="block text-sm font-semibold mb-2">距離</label>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={distance}
                        onChange={(e) => setDistance(Number(e.target.value))}
                        className="w-full mb-1"
                      />
                      <div className="text-right text-lg font-mono font-bold text-gray-700">{distance} m</div>
                    </div>
                  )}
                  
                  {calcMode !== 'angle' && (
                    <div className="mb-4">
                      <label className="block text-sm font-semibold mb-2">見上げる角度</label>
                      <input
                        type="range"
                        min="10"
                        max="80"
                        value={viewAngle}
                        onChange={(e) => setViewAngle(Number(e.target.value))}
                        className="w-full mb-1"
                      />
                      <div className="text-right text-lg font-mono font-bold text-gray-700">{viewAngle} °</div>
                    </div>
                  )}
                  
                  {calcMode !== 'height' && (
                    <div>
                      <label className="block text-sm font-semibold mb-2">建物の高さ</label>
                      <input
                        type="range"
                        min="10"
                        max="150"
                        value={buildingHeight}
                        onChange={(e) => setBuildingHeight(Number(e.target.value))}
                        className="w-full mb-1"
                      />
                      <div className="text-right text-lg font-mono font-bold text-gray-700">{buildingHeight.toFixed(1)} m</div>
                    </div>
                  )}
                </div>
                
                {/* 計算結果 */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 border-2 border-amber-300">
                  <h3 className="font-bold text-amber-900 mb-2">計算結果</h3>
                  {calcMode === 'height' && (
                    <>
                      <div className="text-sm text-gray-600 mb-1">建物の高さ</div>
                      <div className="text-5xl font-bold font-mono text-amber-600">
                        {buildingHeight.toFixed(1)} <span className="text-3xl">m</span>
                      </div>
                    </>
                  )}
                  {calcMode === 'distance' && (
                    <>
                      <div className="text-sm text-gray-600 mb-1">距離</div>
                      <div className="text-5xl font-bold font-mono text-amber-600">
                        {distance.toFixed(1)} <span className="text-3xl">m</span>
                      </div>
                    </>
                  )}
                  {calcMode === 'angle' && (
                    <>
                      <div className="text-sm text-gray-600 mb-1">見上げる角度</div>
                      <div className="text-5xl font-bold font-mono text-amber-600">
                        {viewAngle.toFixed(1)} <span className="text-3xl">°</span>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="bg-indigo-50 rounded-lg p-4">
                  <h3 className="font-bold text-indigo-900 mb-2">計算式</h3>
                  <div className="space-y-2 font-mono text-sm">
                    {calcMode === 'height' && (
                      <>
                        <p>高さ = 距離 × tan(角度)</p>
                        <p className="text-indigo-600 font-bold">
                          = {distance} × tan({viewAngle}°)
                        </p>
                        <p className="text-indigo-600 font-bold">
                          = {distance} × {Math.tan((viewAngle * Math.PI) / 180).toFixed(3)}
                        </p>
                        <p className="text-lg text-amber-600 font-bold border-t-2 border-indigo-200 pt-2">
                          = {buildingHeight.toFixed(1)} m
                        </p>
                      </>
                    )}
                    {calcMode === 'distance' && (
                      <>
                        <p>距離 = 高さ ÷ tan(角度)</p>
                        <p className="text-indigo-600 font-bold">
                          = {buildingHeight.toFixed(1)} ÷ tan({viewAngle}°)
                        </p>
                        <p className="text-indigo-600 font-bold">
                          = {buildingHeight.toFixed(1)} ÷ {Math.tan((viewAngle * Math.PI) / 180).toFixed(3)}
                        </p>
                        <p className="text-lg text-amber-600 font-bold border-t-2 border-indigo-200 pt-2">
                          = {distance.toFixed(1)} m
                        </p>
                      </>
                    )}
                    {calcMode === 'angle' && (
                      <>
                        <p>角度 = arctan(高さ ÷ 距離)</p>
                        <p className="text-indigo-600 font-bold">
                          = arctan({buildingHeight.toFixed(1)} ÷ {distance})
                        </p>
                        <p className="text-indigo-600 font-bold">
                          = arctan({(buildingHeight / distance).toFixed(3)})
                        </p>
                        <p className="text-lg text-amber-600 font-bold border-t-2 border-indigo-200 pt-2">
                          = {viewAngle.toFixed(1)} °
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* ゲーム開発デモ */}
        {activeDemo === 'game' && (
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-indigo-800">🎮 ゲーム開発</h2>
            <p className="text-gray-700 mb-6">
              キャラクターを円周上で動かすとき、<strong className="text-indigo-600">X座標 = cos(角度)、Y座標 = sin(角度)</strong>を使います。
              これにより滑らかな円運動が実現できます。
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <svg width="400" height="400" className="border-2 border-gray-200 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50">
                  {/* グリッド */}
                  <line x1="0" y1="200" x2="400" y2="200" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="200" y1="0" x2="200" y2="400" stroke="#e5e7eb" strokeWidth="1" />
                  
                  {/* 軌道円 */}
                  <circle cx="200" cy="200" r="120" fill="none" stroke="#c084fc" strokeWidth="2" strokeDasharray="5,5" />
                  
                  {/* キャラクター（ゲームパッド風） */}
                  <g transform={`translate(${200 + 120 * Math.cos((gameAngle * Math.PI) / 180)}, ${200 - 120 * Math.sin((gameAngle * Math.PI) / 180)})`}>
                    <circle r="20" fill="#8b5cf6" />
                    <circle cx="-5" cy="-5" r="4" fill="white" />
                    <circle cx="5" cy="-5" r="4" fill="white" />
                    <path d="M -6 6 Q 0 10 6 6" fill="none" stroke="white" strokeWidth="2" />
                  </g>
                  
                  {/* 中心点 */}
                  <circle cx="200" cy="200" r="4" fill="#1f2937" />
                  
                  {/* 角度線 */}
                  <line 
                    x1="200" 
                    y1="200" 
                    x2={200 + 120 * Math.cos((gameAngle * Math.PI) / 180)} 
                    y2={200 - 120 * Math.sin((gameAngle * Math.PI) / 180)} 
                    stroke="#f59e0b" 
                    strokeWidth="2"
                  />
                  
                  {/* 座標軸の投影 */}
                  <line 
                    x1="200" 
                    y1="200" 
                    x2={200 + 120 * Math.cos((gameAngle * Math.PI) / 180)} 
                    y2="200" 
                    stroke="#10b981" 
                    strokeWidth="2" 
                    strokeDasharray="3,3"
                  />
                  <line 
                    x1={200 + 120 * Math.cos((gameAngle * Math.PI) / 180)} 
                    y1="200" 
                    x2={200 + 120 * Math.cos((gameAngle * Math.PI) / 180)} 
                    y2={200 - 120 * Math.sin((gameAngle * Math.PI) / 180)} 
                    stroke="#ef4444" 
                    strokeWidth="2" 
                    strokeDasharray="3,3"
                  />
                </svg>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">回転速度</label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    value={gameSpeed}
                    onChange={(e) => setGameSpeed(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-600 mt-1">速度: {gameSpeed}</p>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-bold text-purple-900 mb-2">現在の状態</h3>
                  <div className="space-y-2 font-mono text-sm">
                    <p>角度: <strong>{gameAngle.toFixed(0)}°</strong></p>
                    <p className="text-green-700">X座標 (cos): <strong>{Math.cos((gameAngle * Math.PI) / 180).toFixed(3)}</strong></p>
                    <p className="text-red-700">Y座標 (sin): <strong>{Math.sin((gameAngle * Math.PI) / 180).toFixed(3)}</strong></p>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-blue-900 mb-2">プログラムコード例</h3>
                  <pre className="text-xs bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
{`// キャラクターを円運動させる
angle += speed;
x = centerX + radius * cos(angle);
y = centerY + radius * sin(angle);`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* 音波デモ */}
        {activeDemo === 'sound' && (
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-indigo-800">🎵 音波の可視化</h2>
            <p className="text-gray-700 mb-4">
              音は空気の振動で、<strong className="text-indigo-600">正弦波（sin波）</strong>で表現されます。
              周波数を変えると音の高さが、振幅を変えると音の大きさが変わります。
            </p>
            
            {/* 正弦波の由来説明 */}
            <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4 mb-6">
              <h3 className="font-bold text-purple-900 mb-2">💡 なぜ「正弦波」というの？</h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p>
                  <strong>「正弦（sine）」</strong>は単位円の中で、円周上の点から降ろした垂線（高さ）が弓の「弦」のように見えたことから名付けられました。
                </p>
                <p>
                  sin値は角度が変わると<strong>0 → 1 → 0 → -1 → 0</strong>と周期的に変動します。この滑らかな波のパターンが「正弦波」です。
                </p>
                <p className="text-purple-700 font-semibold">
                  自然界の多くの波（音波、光波、電波など）は、この正弦波の形をしています！
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <svg width="100%" height="200" className="border-2 border-gray-200 rounded-lg bg-gray-50">
                <line x1="0" y1="100" x2="800" y2="100" stroke="#e5e7eb" strokeWidth="2" />
                <path
                  d={Array.from({ length: 800 }, (_, i) => {
                    const x = i;
                    const y = 100 - amplitude * Math.sin((i / 800) * frequency * 2 * Math.PI);
                    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                  }).join(' ')}
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="3"
                />
              </svg>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">周波数（音の高さ）: {frequency}</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={frequency}
                    onChange={(e) => setFrequency(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-600 mt-1">波の数が多いほど高い音</p>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">振幅（音の大きさ）: {amplitude}</label>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={amplitude}
                    onChange={(e) => setAmplitude(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-600 mt-1">波の高さが大きいほど大きな音</p>
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-bold text-purple-900 mb-2">音波の式</h3>
                <p className="font-mono text-lg">y = {amplitude} × sin(2π × {frequency} × t)</p>
                <p className="text-sm text-gray-600 mt-2">
                  tは時間、2πは1周期を表します。この式で音の波形が決まります。
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* ロボットアームデモ */}
        {activeDemo === 'robot' && (
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-indigo-800">🤖 ロボットアームの制御</h2>
            <p className="text-gray-700 mb-6">
              ロボットアームの各関節の角度から、アームの先端位置を計算します。
              <strong className="text-indigo-600">順運動学（Forward Kinematics）</strong>と呼ばれる技術です。
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <svg width="400" height="400" className="border-2 border-gray-200 rounded-lg bg-gradient-to-br from-gray-50 to-blue-50">
                  {/* 基台 */}
                  <rect x="150" y="350" width="100" height="50" fill="#475569" stroke="#1e293b" strokeWidth="2" />
                  
                  {/* 第1関節（基部） */}
                  <circle cx="200" cy="200" r="8" fill="#1e293b" />
                  
                  {/* 第1アーム */}
                  <line x1="200" y1="200" x2={joint1X} y2={joint1Y} stroke="#3b82f6" strokeWidth="8" strokeLinecap="round" />
                  
                  {/* 第2関節 */}
                  <circle cx={joint1X} cy={joint1Y} r="8" fill="#1e293b" />
                  
                  {/* 第2アーム */}
                  <line x1={joint1X} y1={joint1Y} x2={endX} y2={endY} stroke="#10b981" strokeWidth="8" strokeLinecap="round" />
                  
                  {/* エンドエフェクター（先端） */}
                  <circle cx={endX} cy={endY} r="10" fill="#ef4444" />
                  
                  {/* 角度表示 */}
                  <path
                    d={`M 230 200 A 30 30 0 0 0 ${200 + 30 * Math.cos((armAngle1 * Math.PI) / 180)} ${200 - 30 * Math.sin((armAngle1 * Math.PI) / 180)}`}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2"
                  />
                  <text x="240" y="195" fill="#f59e0b" fontSize="12" fontWeight="bold">θ1</text>
                  
                  {/* 座標グリッド */}
                  <line x1="0" y1="200" x2="400" y2="200" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="2,2" />
                  <line x1="200" y1="0" x2="200" y2="400" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="2,2" />
                </svg>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">第1関節の角度: {armAngle1}°</label>
                  <input
                    type="range"
                    min="0"
                    max="180"
                    value={armAngle1}
                    onChange={(e) => setArmAngle1(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">第2関節の角度: {armAngle2}°</label>
                  <input
                    type="range"
                    min="-90"
                    max="90"
                    value={armAngle2}
                    onChange={(e) => setArmAngle2(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-blue-900 mb-2">先端位置の計算</h3>
                  <div className="space-y-2 font-mono text-sm">
                    <p className="text-blue-700">第1関節位置:</p>
                    <p>x1 = {armLength1} × cos({armAngle1}°) = {(armLength1 * Math.cos((armAngle1 * Math.PI) / 180)).toFixed(1)}</p>
                    <p>y1 = {armLength1} × sin({armAngle1}°) = {(armLength1 * Math.sin((armAngle1 * Math.PI) / 180)).toFixed(1)}</p>
                    <p className="text-green-700 mt-2">先端位置:</p>
                    <p>x = x1 + {armLength2} × cos({armAngle1 + armAngle2}°)</p>
                    <p>y = y1 + {armLength2} × sin({armAngle1 + armAngle2}°)</p>
                    <p className="text-lg text-red-600 font-bold border-t-2 border-blue-200 pt-2 mt-2">
                      終端: ({(endX - 200).toFixed(1)}, {(200 - endY).toFixed(1)})
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* GPS測位デモ */}
        {activeDemo === 'gps' && (
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-indigo-800">📡 GPS測位（三角測量）</h2>
            <p className="text-gray-700 mb-6">
              複数の衛星からの距離を測定し、<strong className="text-indigo-600">円の交点</strong>を求めることで位置を特定します。
              これが三角測量の原理です。
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <svg width="400" height="400" className="border-2 border-gray-200 rounded-lg bg-gradient-to-br from-blue-900 to-indigo-900">
                  {/* 衛星1 */}
                  <g transform="translate(100, 80)">
                    <circle r="15" fill="#fbbf24" />
                    <path d="M -20 0 L -8 0 M 20 0 L 8 0 M 0 -20 L 0 -8 M 0 20 L 0 8" stroke="#fbbf24" strokeWidth="2" />
                    <text x="-35" y="-20" fill="white" fontSize="12" fontWeight="bold">衛星A</text>
                  </g>
                  
                  {/* 衛星2 */}
                  <g transform="translate(300, 80)">
                    <circle r="15" fill="#fbbf24" />
                    <path d="M -20 0 L -8 0 M 20 0 L 8 0 M 0 -20 L 0 -8 M 0 20 L 0 8" stroke="#fbbf24" strokeWidth="2" />
                    <text x="-35" y="-20" fill="white" fontSize="12" fontWeight="bold">衛星B</text>
                  </g>
                  
                  {/* 距離円 */}
                  <circle cx="100" cy="80" r={satellite1Dist} fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.6" />
                  <circle cx="300" cy="80" r={satellite2Dist} fill="none" stroke="#10b981" strokeWidth="2" opacity="0.6" />
                  
                  {/* 交点（現在位置） */}
                  <circle cx="200" cy="200" r="12" fill="#ef4444" />
                  <text x="185" y="230" fill="white" fontSize="14" fontWeight="bold">現在地</text>
                  
                  {/* 距離線 */}
                  <line x1="100" y1="80" x2="200" y2="200" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="300" y1="80" x2="200" y2="200" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />
                </svg>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">衛星Aからの距離: {satellite1Dist}km</label>
                  <input
                    type="range"
                    min="80"
                    max="150"
                    value={satellite1Dist}
                    onChange={(e) => setSatellite1Dist(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">衛星Bからの距離: {satellite2Dist}km</label>
                  <input
                    type="range"
                    min="80"
                    max="150"
                    value={satellite2Dist}
                    onChange={(e) => setSatellite2Dist(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-blue-900 mb-2">三角測量の原理</h3>
                  <div className="space-y-2 text-sm">
                    <p>✓ 各衛星からの距離が分かる</p>
                    <p>✓ 距離を半径とした円を描く</p>
                    <p>✓ 円の交点が現在位置</p>
                    <p className="text-xs text-gray-600 mt-3">
                      実際のGPSでは3つ以上の衛星を使い、より正確な位置を測定します。
                    </p>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-bold text-green-900 mb-2">使われる数学</h3>
                  <p className="text-sm">円の方程式と連立方程式を解くことで交点を求めます。三角関数は角度と距離の関係を計算するのに使用されます。</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}