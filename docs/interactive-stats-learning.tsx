import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, HelpCircle, TrendingUp, Award, BookOpen, Shuffle, Lock, CheckCircle, Info } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const InteractiveStatsLearning = () => {
  // スキルツリーの進捗状態
  const [unlockedSkills, setUnlockedSkills] = useState({
    mean: true,
    median: false,
    mode: false,
    standardDeviation: false,
    correlation: false
  });

  // データセット
  const [dataPoints, setDataPoints] = useState([
    { id: 1, value: 20 },
    { id: 2, value: 35 },
    { id: 3, value: 35 },
    { id: 4, value: 40 },
    { id: 5, value: 45 },
    { id: 6, value: 50 },
    { id: 7, value: 60 },
    { id: 8, value: 55 },
    { id: 9, value: 30 },
    { id: 10, value: 40 }
  ]);

  // アニメーション関連
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1000);

  // 現在の学習モジュール
  const [currentModule, setCurrentModule] = useState('mean');

  // ヒント表示
  const [showHint, setShowHint] = useState(false);
  const [hintText, setHintText] = useState('');

  // 学習進捗
  const [moduleProgress, setModuleProgress] = useState({
    mean: { completed: false, score: 0 },
    median: { completed: false, score: 0 },
    mode: { completed: false, score: 0 }
  });

  // 統計値の計算
  const calculateMean = () => {
    const sum = dataPoints.reduce((acc, point) => acc + point.value, 0);
    return sum / dataPoints.length;
  };

  const calculateMedian = () => {
    const sorted = [...dataPoints].sort((a, b) => a.value - b.value);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 
      ? (sorted[mid - 1].value + sorted[mid].value) / 2 
      : sorted[mid].value;
  };

  const calculateMode = () => {
    const frequency = {};
    dataPoints.forEach(point => {
      frequency[point.value] = (frequency[point.value] || 0) + 1;
    });
    
    let maxFreq = 0;
    let modes = [];
    
    Object.entries(frequency).forEach(([value, freq]) => {
      if (freq > maxFreq) {
        maxFreq = freq;
        modes = [Number(value)];
      } else if (freq === maxFreq) {
        modes.push(Number(value));
      }
    });
    
    return modes;
  };

  // データポイントの更新
  const updateDataPoint = (id, newValue) => {
    setDataPoints(prev => 
      prev.map(point => 
        point.id === id ? { ...point, value: parseInt(newValue) || 0 } : point
      )
    );
  };

  // アニメーション効果
  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setDataPoints(prev => 
          prev.map(point => ({
            ...point,
            value: Math.max(0, Math.min(100, point.value + (Math.random() - 0.5) * 10))
          }))
        );
      }, animationSpeed);
      
      return () => clearInterval(interval);
    }
  }, [isAnimating, animationSpeed]);

  // ヒストグラムデータの準備
  const histogramData = () => {
    const buckets = [];
    for (let i = 0; i <= 100; i += 10) {
      buckets.push({
        range: `${i}-${i + 9}`,
        count: 0,
        min: i,
        max: i + 9
      });
    }
    
    dataPoints.forEach(point => {
      const bucketIndex = Math.floor(point.value / 10);
      if (bucketIndex >= 0 && bucketIndex < buckets.length) {
        buckets[bucketIndex].count += 1;
      }
    });
    
    return buckets.filter(bucket => bucket.count > 0);
  };

  const mean = calculateMean();
  const median = calculateMedian();
  const modes = calculateMode();

  // モジュール別の説明文
  const moduleDescriptions = {
    mean: {
      title: "平均値を理解しよう",
      description: "平均値は全てのデータを足して、データの個数で割った値です。データ全体の「真ん中」を表す最も基本的な指標です。",
      task: "スライダーを動かして、各データの値が平均値にどう影響するか観察してみましょう。"
    },
    median: {
      title: "中央値を理解しよう",
      description: "中央値は、データを小さい順に並べた時の真ん中の値です。極端な値の影響を受けにくい特徴があります。",
      task: "平均値と中央値の違いに注目しながら、データを操作してみましょう。"
    },
    mode: {
      title: "最頻値を理解しよう",
      description: "最頻値は、データの中で最も多く現れる値です。度数分布と一緒に理解すると効果的です。",
      task: "同じ値を複数作って、最頻値がどのように決まるか確認してみましょう。"
    }
  };

  // 現在のモジュールの説明を取得
  const currentModuleInfo = moduleDescriptions[currentModule] || moduleDescriptions.mean;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* ヘッダー */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">インタラクティブ統計学習</h1>
          <p className="text-gray-600">スライダーを動かして、統計の概念を視覚的に理解しよう！</p>
        </div>

        {/* スキルツリー */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Award className="mr-2 text-yellow-500" />
            学習の進捗
          </h2>
          <div className="flex space-x-4">
            {Object.entries(unlockedSkills).map(([skill, unlocked]) => (
              <button
                key={skill}
                onClick={() => unlocked && setCurrentModule(skill)}
                className={`relative px-4 py-2 rounded-lg transition-all ${
                  unlocked 
                    ? currentModule === skill 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!unlocked}
              >
                <div className="flex items-center">
                  {!unlocked && <Lock size={16} className="mr-1" />}
                  {unlocked && moduleProgress[skill]?.completed && <CheckCircle size={16} className="mr-1 text-green-400" />}
                  {skill === 'mean' && '平均値'}
                  {skill === 'median' && '中央値'}
                  {skill === 'mode' && '最頻値'}
                  {skill === 'standardDeviation' && '標準偏差'}
                  {skill === 'correlation' && '相関係数'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 現在の学習内容 */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-lg">
          <div className="flex items-start">
            <Info className="text-blue-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900">{currentModuleInfo.title}</h3>
              <p className="text-blue-800 mt-1">{currentModuleInfo.description}</p>
              <p className="text-blue-700 mt-2 font-medium">{currentModuleInfo.task}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* データ操作パネル */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <BookOpen className="mr-2 text-blue-500" />
                データ操作パネル
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsAnimating(!isAnimating)}
                  className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                  title="アニメーション再生/停止"
                >
                  {isAnimating ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button
                  onClick={() => {
                    // より興味深いデータパターンを生成
                    const patterns = [
                      // 正規分布風
                      () => 50 + (Math.random() - 0.5) * 40,
                      // 二峰性分布
                      () => Math.random() > 0.5 ? 20 + Math.random() * 20 : 60 + Math.random() * 20,
                      // 一様分布
                      () => Math.random() * 100,
                      // 偏った分布
                      () => Math.pow(Math.random(), 2) * 100
                    ];
                    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
                    
                    const randomData = dataPoints.map(p => ({
                      ...p,
                      value: Math.max(0, Math.min(100, Math.floor(pattern())))
                    }));
                    setDataPoints(randomData);
                  }}
                  className="p-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors"
                  title="ランダムな値を生成"
                >
                  <Shuffle size={20} />
                </button>
                <button
                  onClick={() => setDataPoints(dataPoints.map(p => ({ ...p, value: 50 })))}
                  className="p-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition-colors"
                  title="リセット"
                >
                  <RotateCcw size={20} />
                </button>
                <button
                  onClick={() => {
                    const hints = {
                      mean: '大きな値を持つデータポイントを追加すると平均値が上がり、小さな値を追加すると下がります。',
                      median: '極端に大きな値や小さな値を追加しても、中央値はあまり変化しないことに注目してください。',
                      mode: '同じ値のデータを複数作ると、その値が最頻値になります。'
                    };
                    setHintText(hints[currentModule] || hints.mean);
                    setShowHint(true);
                  }}
                  className="p-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
                  title="ヒントを表示"
                >
                  <HelpCircle size={20} />
                </button>
              </div>
            </div>

            {/* データスライダー */}
            <div className="space-y-4">
              <div className="grid grid-cols-10 gap-2">
                {dataPoints.map((point) => (
                  <div key={point.id} className="flex flex-col items-center group">
                    <div className="relative h-32 w-8 bg-gray-200 rounded cursor-pointer overflow-hidden"
                         onClick={(e) => {
                           const rect = e.currentTarget.getBoundingClientRect();
                           const y = e.clientY - rect.top;
                           const newValue = Math.max(0, Math.min(100, 100 - (y / rect.height) * 100));
                           updateDataPoint(point.id, newValue);
                         }}>
                      <div 
                        className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-blue-400 transition-all duration-200"
                        style={{ height: `${point.value}%` }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-white drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                          {Math.round(point.value)}
                        </span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={point.value}
                      onChange={(e) => updateDataPoint(point.id, e.target.value)}
                      className="w-full mt-1 h-1"
                      style={{ width: '40px' }}
                    />
                    <span className="text-xs font-mono mt-1">{Math.round(point.value)}</span>
                    <span className="text-xs text-gray-500">D{point.id}</span>
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-500 text-center">
                バーをクリックするか、下のスライダーで値を調整できます
              </div>
            </div>

            {/* 統計値表示（現在のモジュールに応じて表示） */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              {currentModule === 'mean' && (
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">現在学習中</div>
                  <div className="text-4xl font-bold text-blue-600">
                    平均値: {mean.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    計算式: (全てのデータの合計) ÷ {dataPoints.length} = {mean.toFixed(1)}
                  </div>
                </div>
              )}
              
              {currentModule === 'median' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded bg-blue-100">
                    <div className="text-sm text-gray-600">平均値</div>
                    <div className="text-2xl font-bold text-blue-600">{mean.toFixed(1)}</div>
                  </div>
                  <div className="text-center p-3 rounded bg-green-100 ring-2 ring-green-400">
                    <div className="text-sm text-gray-600">中央値</div>
                    <div className="text-2xl font-bold text-green-600">{median.toFixed(1)}</div>
                  </div>
                </div>
              )}
              
              {currentModule === 'mode' && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded bg-blue-100">
                    <div className="text-sm text-gray-600">平均値</div>
                    <div className="text-2xl font-bold text-blue-600">{mean.toFixed(1)}</div>
                  </div>
                  <div className="text-center p-3 rounded bg-green-100">
                    <div className="text-sm text-gray-600">中央値</div>
                    <div className="text-2xl font-bold text-green-600">{median.toFixed(1)}</div>
                  </div>
                  <div className="text-center p-3 rounded bg-purple-100 ring-2 ring-purple-400">
                    <div className="text-sm text-gray-600">最頻値</div>
                    <div className="text-2xl font-bold text-purple-600">
                      {modes.length > 0 ? modes.join(', ') : 'なし'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* グラフ表示エリア */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <TrendingUp className="mr-2 text-green-500" />
              データの可視化
            </h2>

            {/* モジュールに応じたグラフ表示 */}
            {currentModule === 'mean' && (
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">データポイントの分布</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dataPoints}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="id" 
                      label={{ value: 'データID', position: 'insideBottom', offset: -5 }}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis label={{ value: '値', angle: -90, position: 'insideLeft' }} />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-2 border rounded shadow-md">
                              <p className="text-sm font-medium">データ {payload[0].payload.id}</p>
                              <p className="text-sm text-blue-600">値: {payload[0].value}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="value" fill="#3B82F6">
                      {dataPoints.map((entry, index) => (
                        <Bar key={`cell-${index}`} fill="#3B82F6" />
                      ))}
                    </Bar>
                    <ReferenceLine y={mean} stroke="#EF4444" strokeDasharray="5 5" strokeWidth={2}>
                      <label value="平均" position="right" fill="#EF4444" />
                    </ReferenceLine>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {currentModule === 'median' && (
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">平均値と中央値の比較</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dataPoints}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="id" 
                      label={{ value: 'データID', position: 'insideBottom', offset: -5 }}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis label={{ value: '値', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3B82F6" />
                    <ReferenceLine y={mean} stroke="#EF4444" strokeDasharray="5 5" strokeWidth={2}>
                      <label value={`平均: ${mean.toFixed(1)}`} position="right" fill="#EF4444" />
                    </ReferenceLine>
                    <ReferenceLine y={median} stroke="#10B981" strokeDasharray="5 5" strokeWidth={2}>
                      <label value={`中央値: ${median.toFixed(1)}`} position="left" fill="#10B981" />
                    </ReferenceLine>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {currentModule === 'mode' && (
              <>
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">データポイントの分布</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={dataPoints}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="id" tick={{ fontSize: 12 }} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3B82F6" />
                      <ReferenceLine y={mean} stroke="#EF4444" strokeDasharray="5 5" label="平均" />
                      <ReferenceLine y={median} stroke="#10B981" strokeDasharray="5 5" label="中央値" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">度数分布（ヒストグラム）</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={histogramData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="range" 
                        tick={{ fontSize: 11 }}
                        angle={-20}
                        textAnchor="end"
                        height={50}
                      />
                      <YAxis 
                        label={{ value: '度数', angle: -90, position: 'insideLeft' }}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ヒント表示 */}
        {showHint && (
          <div className="fixed bottom-6 right-6 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg shadow-lg max-w-md">
            <div className="flex items-start">
              <HelpCircle className="text-yellow-600 mr-2 flex-shrink-0" />
              <div>
                <p className="text-sm text-yellow-800">{hintText}</p>
                <button
                  onClick={() => setShowHint(false)}
                  className="mt-2 text-xs text-yellow-600 hover:text-yellow-800"
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 学習進捗チェックボタン */}
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              // 現在のモジュールを完了とマーク
              setModuleProgress(prev => ({
                ...prev,
                [currentModule]: { completed: true, score: 100 }
              }));
              
              // 次のモジュールをアンロック
              if (currentModule === 'mean' && !unlockedSkills.median) {
                setUnlockedSkills(prev => ({ ...prev, median: true }));
                setHintText('素晴らしい！中央値の学習がアンロックされました。上のボタンから進んでください。');
                setShowHint(true);
              } else if (currentModule === 'median' && !unlockedSkills.mode) {
                setUnlockedSkills(prev => ({ ...prev, mode: true }));
                setHintText('よくできました！最頻値の学習がアンロックされました。');
                setShowHint(true);
              }
            }}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            理解できました！次へ進む
          </button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveStatsLearning;