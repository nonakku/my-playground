import React, { useState, useMemo } from 'react';
import { LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function LeastSquaresVsMLE() {
  const [slope, setSlope] = useState(1.2);
  const [intercept, setIntercept] = useState(0.5);
  const [noise, setNoise] = useState(0.8);
  const [tab, setTab] = useState('least-squares');

  // サンプルデータ生成
  const data = useMemo(() => {
    const points = [];
    for (let i = 0; i < 10; i++) {
      const x = i;
      const trueY = slope * x + intercept;
      const y = trueY + (Math.random() - 0.5) * noise * 4;
      points.push({ x, y, trueY });
    }
    return points;
  }, [slope, intercept, noise]);

  // 誤差の計算
  const errors = data.map(d => ({
    ...d,
    residual: Math.abs(d.y - d.trueY)
  }));

  const sumSquaredError = errors.reduce((sum, e) => sum + e.residual ** 2, 0).toFixed(2);
  const meanError = (errors.reduce((sum, e) => sum + e.residual, 0) / errors.length).toFixed(3);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
        📊 最小二乗法 vs 最尤法
      </h1>
      <p className="text-center text-gray-600 mb-6">
        スライダーで値を操作して、2つの推定方法の違いを理解しましょう
      </p>

      {/* タブ */}
      <div className="flex gap-2 mb-6 justify-center">
        <button
          onClick={() => setTab('least-squares')}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            tab === 'least-squares'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-600'
          }`}
        >
          最小二乗法
        </button>
        <button
          onClick={() => setTab('mle')}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            tab === 'mle'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-purple-600'
          }`}
        >
          最尤法
        </button>
      </div>

      {/* コントローラー */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              傾き (slope): {slope.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="3"
              step="0.1"
              value={slope}
              onChange={(e) => setSlope(parseFloat(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              切片 (intercept): {intercept.toFixed(2)}
            </label>
            <input
              type="range"
              min="-3"
              max="3"
              step="0.1"
              value={intercept}
              onChange={(e) => setIntercept(parseFloat(e.target.value))}
              className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ノイズの大きさ: {noise.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={noise}
              onChange={(e) => setNoise(parseFloat(e.target.value))}
              className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 最小二乗法の説明 */}
      {tab === 'least-squares' && (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
            <h2 className="text-xl font-bold text-blue-600 mb-3">🎯 最小二乗法 (Least Squares Method)</h2>
            <p className="text-gray-700 mb-3">
              <strong>定義:</strong> 実測値と予測値の差（残差）の二乗和を最小化する方法
            </p>
            <p className="text-gray-700 mb-3">
              <strong>数式:</strong> L = Σ(実測値 - 予測値)²を最小化
            </p>
            <p className="text-gray-700">
              <strong>特徴:</strong> 外れ値の影響を大きく受ける / 計算が簡単 / 線形回帰の基本
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">実際のデータとフィッティング</h3>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" name="X" />
                <YAxis type="number" dataKey="y" name="Y" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter
                  name="実測データ"
                  data={data}
                  fill="#3B82F6"
                  shape="circle"
                  isAnimationActive={false}
                />
                <Scatter
                  name="回帰直線"
                  data={data}
                  fill="#10B981"
                  shape="diamond"
                  isAnimationActive={false}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-lg">
              <p className="text-sm text-gray-700"><strong>二乗誤差の和:</strong></p>
              <p className="text-2xl font-bold text-blue-600">{sumSquaredError}</p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-lg">
              <p className="text-sm text-gray-700"><strong>平均絶対誤差:</strong></p>
              <p className="text-2xl font-bold text-green-600">{meanError}</p>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
            <p className="text-sm text-gray-700">
              💡 <strong>ポイント:</strong> 二乗項があるため、大きな誤差がより重く扱われます。これが統計学の多くの場面で使われる理由です。
            </p>
          </div>
        </div>
      )}

      {/* 最尤法の説明 */}
      {tab === 'mle' && (
        <div className="space-y-6">
          <div className="bg-purple-50 border-l-4 border-purple-600 p-4 rounded">
            <h2 className="text-xl font-bold text-purple-600 mb-3">🎯 最尤法 (Maximum Likelihood Estimation)</h2>
            <p className="text-gray-700 mb-3">
              <strong>定義:</strong> 観測されたデータが得られる確率（尤度）を最大化するパラメータを求める方法
            </p>
            <p className="text-gray-700 mb-3">
              <strong>数式:</strong> 尤度 L(θ) = ∏P(xᵢ|θ)を最大化
            </p>
            <p className="text-gray-700">
              <strong>特徴:</strong> 統計的に厳密 / 複雑な分布に対応可能 / 計算が複雑になることもある
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">確率分布の視点</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={data}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="y"
                  stroke="#A78BFA"
                  name="観測値"
                  isAnimationActive={false}
                />
                <Line
                  type="monotone"
                  dataKey="trueY"
                  stroke="#8B5CF6"
                  name="真の値（尤度が最大）"
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-4 rounded-lg">
              <p className="text-sm text-gray-700"><strong>尤度の対数:</strong></p>
              <p className="text-2xl font-bold text-purple-600">
                {Math.log(Math.exp(-sumSquaredError / 100)).toFixed(2)}
              </p>
            </div>
            <div className="bg-gradient-to-br from-pink-100 to-pink-200 p-4 rounded-lg">
              <p className="text-sm text-gray-700"><strong>確率密度:</strong></p>
              <p className="text-2xl font-bold text-pink-600">
                {(Math.exp(-sumSquaredError / 200)).toFixed(4)}
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
            <p className="text-sm text-gray-700">
              💡 <strong>ポイント:</strong> 最尤法は「このデータセットが生じる確率が最も高いパラメータ」を探します。より統計的で理論的です。
            </p>
          </div>
        </div>
      )}

      {/* 比較表 */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-4 text-gray-800">📋 最小二乗法 vs 最尤法</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left p-3 font-bold text-blue-600">項目</th>
                <th className="text-left p-3 font-bold text-blue-600">最小二乗法</th>
                <th className="text-left p-3 font-bold text-purple-600">最尤法</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="p-3 font-semibold">基本的な考え方</td>
                <td className="p-3">誤差の二乗和を最小化</td>
                <td className="p-3">観測データの確率を最大化</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 font-semibold">計算の複雑さ</td>
                <td className="p-3">単純（解析的に解ける）</td>
                <td className="p-3">複雑（反復計算が必要）</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 font-semibold">統計的性質</td>
                <td className="p-3">経験的</td>
                <td className="p-3">理論的・統計的に厳密</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 font-semibold">外れ値への耐性</td>
                <td className="p-3">弱い（二乗で拡大）</td>
                <td className="p-3">強い（分布を考慮）</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 font-semibold">適用範囲</td>
                <td className="p-3">線形回帰が主</td>
                <td className="p-3">あらゆる確率モデル</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 font-semibold">実務での使用</td>
                <td className="p-3">非常に一般的</td>
                <td className="p-3">機械学習・統計解析</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}