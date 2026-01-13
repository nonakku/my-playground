import React, { useState } from 'react';

export default function TrigonometryVisualizer() {
  const [angle, setAngle] = useState(45);
  
  // ラジアンに変換
  const radian = (angle * Math.PI) / 180;
  
  // 三角関数の値
  const sinValue = Math.sin(radian);
  const cosValue = Math.cos(radian);
  const tanValue = Math.tan(radian);
  
  // 円の中心と半径
  const centerX = 200;
  const centerY = 200;
  const radius = 150;
  
  // 点の位置
  const pointX = centerX + radius * cosValue;
  const pointY = centerY - radius * sinValue; // Y軸は下向きなので反転
  
  // tan線の終点（接線）
  const tanLineEndY = centerY - radius * tanValue;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-indigo-900">
          三角関数ビジュアライザー
        </h1>
        <p className="text-center text-gray-600 mb-8">
          スライダーを動かして、sin・cos・tanの関係を視覚的に理解しましょう
        </p>
        
        {/* 三角関数の説明セクション */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-indigo-800">三角関数とは？</h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-bold text-lg text-green-700 mb-2">cos (コサイン)</h3>
              <p className="text-gray-700 leading-relaxed">
                直角三角形の「底辺 ÷ 斜辺」の比。単位円では<strong>X座標</strong>を表します。
                角度が0°のとき最大値1、90°で0になります。
              </p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-bold text-lg text-red-700 mb-2">sin (サイン)</h3>
              <p className="text-gray-700 leading-relaxed">
                直角三角形の「高さ ÷ 斜辺」の比。単位円では<strong>Y座標</strong>を表します。
                角度が0°のとき0、90°で最大値1になります。
              </p>
            </div>
            <div className="border-l-4 border-amber-500 pl-4">
              <h3 className="font-bold text-lg text-amber-700 mb-2">tan (タンジェント)</h3>
              <p className="text-gray-700 leading-relaxed">
                直角三角形の「高さ ÷ 底辺」の比。<strong>sin ÷ cos</strong>でも求められます。
                角度が90°に近づくと無限大になります。
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* 左側: 単位円 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-indigo-800">単位円</h2>
            
            <svg width="400" height="400" className="mx-auto">
              {/* 背景のグリッド */}
              <line x1="0" y1={centerY} x2="400" y2={centerY} stroke="#e5e7eb" strokeWidth="1" />
              <line x1={centerX} y1="0" x2={centerX} y2="400" stroke="#e5e7eb" strokeWidth="1" />
              
              {/* 円 */}
              <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="#6366f1" strokeWidth="2" />
              
              {/* X軸とY軸 */}
              <line x1="0" y1={centerY} x2="400" y2={centerY} stroke="#1f2937" strokeWidth="2" />
              <line x1={centerX} y1="0" x2={centerX} y2="400" stroke="#1f2937" strokeWidth="2" />
              
              {/* cos (X軸への射影) */}
              <line 
                x1={centerX} 
                y1={centerY} 
                x2={pointX} 
                y2={centerY} 
                stroke="#10b981" 
                strokeWidth="3"
                strokeDasharray="5,5"
              />
              
              {/* sin (Y軸への射影) */}
              <line 
                x1={pointX} 
                y1={centerY} 
                x2={pointX} 
                y2={pointY} 
                stroke="#ef4444" 
                strokeWidth="3"
                strokeDasharray="5,5"
              />
              
              {/* 半径（動径） */}
              <line 
                x1={centerX} 
                y1={centerY} 
                x2={pointX} 
                y2={pointY} 
                stroke="#6366f1" 
                strokeWidth="3"
              />
              
              {/* tan線（接線） */}
              {Math.abs(tanValue) < 10 && (
                <>
                  <line 
                    x1={centerX + radius} 
                    y1={centerY} 
                    x2={centerX + radius} 
                    y2={tanLineEndY} 
                    stroke="#f59e0b" 
                    strokeWidth="3"
                  />
                  <line 
                    x1={centerX} 
                    y1={centerY} 
                    x2={centerX + radius} 
                    y2={tanLineEndY} 
                    stroke="#f59e0b" 
                    strokeWidth="2"
                    strokeDasharray="3,3"
                    opacity="0.5"
                  />
                </>
              )}
              
              {/* 点 */}
              <circle cx={pointX} cy={pointY} r="6" fill="#6366f1" />
              <circle cx={centerX} cy={centerY} r="4" fill="#1f2937" />
              
              {/* 角度の弧 */}
              <path
                d={`M ${centerX + 30} ${centerY} A 30 30 0 ${angle > 180 ? 1 : 0} 0 ${centerX + 30 * cosValue} ${centerY - 30 * sinValue}`}
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="2"
              />
              
              {/* ラベル */}
              <text x={centerX + radius + 10} y={centerY + 5} fill="#1f2937" fontSize="14">1</text>
              <text x={centerX + 5} y={centerY - radius - 5} fill="#1f2937" fontSize="14">1</text>
              <text x={pointX + 10} y={pointY - 10} fill="#6366f1" fontSize="14" fontWeight="bold">
                ({cosValue.toFixed(2)}, {sinValue.toFixed(2)})
              </text>
            </svg>
            
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500"></div>
                <span><strong>cos θ</strong> (緑): X軸への射影</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500"></div>
                <span><strong>sin θ</strong> (赤): Y軸への射影</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-amber-500"></div>
                <span><strong>tan θ</strong> (オレンジ): 接線の長さ</span>
              </div>
            </div>
          </div>
          
          {/* 右側: コントロールと値 */}
          <div className="space-y-6">
            {/* 角度調整 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-indigo-800">角度調整</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-lg font-semibold mb-2">
                    角度: {angle}° ({radian.toFixed(3)} rad)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={angle}
                    onChange={(e) => setAngle(Number(e.target.value))}
                    className="w-full h-3 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                {/* クイック選択ボタン */}
                <div className="grid grid-cols-4 gap-2">
                  {[0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330].map(deg => (
                    <button
                      key={deg}
                      onClick={() => setAngle(deg)}
                      className={`py-2 px-3 rounded-lg font-semibold transition-all ${
                        angle === deg 
                          ? 'bg-indigo-600 text-white shadow-lg' 
                          : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
                      }`}
                    >
                      {deg}°
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* 三角関数の値 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-indigo-800">三角関数の値</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded">
                  <div className="text-sm text-gray-600">cos {angle}°</div>
                  <div className="text-3xl font-bold text-green-700 font-mono">
                    {cosValue.toFixed(4)}
                  </div>
                </div>
                
                <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-50 rounded">
                  <div className="text-sm text-gray-600">sin {angle}°</div>
                  <div className="text-3xl font-bold text-red-700 font-mono">
                    {sinValue.toFixed(4)}
                  </div>
                </div>
                
                <div className="border-l-4 border-amber-500 pl-4 py-2 bg-amber-50 rounded">
                  <div className="text-sm text-gray-600">tan {angle}°</div>
                  <div className="text-3xl font-bold text-amber-700 font-mono">
                    {Math.abs(tanValue) > 10 ? '     ∞' : tanValue.toFixed(4)}
                  </div>
                </div>
              </div>
            </div>
            
            {/* 特別な角度の情報 */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold mb-2 text-purple-800">覚えておきたい角度</h3>
              <div className="text-sm space-y-1 text-gray-700">
                <p>• 0°: sin=0, cos=1, tan=0</p>
                <p>• 30°: sin=1/2, cos=√3/2, tan=1/√3</p>
                <p>• 45°: sin=√2/2, cos=√2/2, tan=1</p>
                <p>• 60°: sin=√3/2, cos=1/2, tan=√3</p>
                <p>• 90°: sin=1, cos=0, tan=∞</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}