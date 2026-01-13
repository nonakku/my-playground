import React, { useState } from 'react';
import { Plus, Minus, X, ArrowRight } from 'lucide-react';

const MatrixVisualizer = () => {
  const [matrixA, setMatrixA] = useState([[1, 2], [3, 4]]);
  const [matrixB, setMatrixB] = useState([[5, 6], [7, 8]]);
  const [operation, setOperation] = useState('add');
  const [showSteps, setShowSteps] = useState(false);
  const [rowsA, setRowsA] = useState(2);
  const [colsA, setColsA] = useState(2);
  const [rowsB, setRowsB] = useState(2);
  const [colsB, setColsB] = useState(2);
  const [preset, setPreset] = useState('custom');

  const updateMatrix = (matrix, setMatrix, row, col, value) => {
    const newMatrix = matrix.map(r => [...r]);
    newMatrix[row][col] = parseFloat(value) || 0;
    setMatrix(newMatrix);
  };

  const resizeMatrixA = (newRows, newCols) => {
    setRowsA(newRows);
    setColsA(newCols);
    
    const newA = Array(newRows).fill(0).map((_, i) => 
      Array(newCols).fill(0).map((_, j) => 
        i < matrixA.length && j < matrixA[0].length ? matrixA[i][j] : 0
      )
    );
    setMatrixA(newA);
  };

  const resizeMatrixB = (newRows, newCols) => {
    setRowsB(newRows);
    setColsB(newCols);
    
    const newB = Array(newRows).fill(0).map((_, i) => 
      Array(newCols).fill(0).map((_, j) => 
        i < matrixB.length && j < matrixB[0].length ? matrixB[i][j] : 0
      )
    );
    setMatrixB(newB);
  };

  const loadPreset = (presetName) => {
    setPreset(presetName);
    if (presetName === 'students') {
      setRowsA(3);
      setColsA(4);
      setRowsB(3);
      setColsB(4);
      setMatrixA([
        [85, 90, 78, 88],
        [92, 88, 95, 90],
        [78, 85, 82, 87]
      ]);
      setMatrixB([
        [5, 3, 8, 4],
        [4, 6, 2, 5],
        [7, 4, 6, 3]
      ]);
      setOperation('add');
    } else if (presetName === 'features') {
      setRowsA(4);
      setColsA(3);
      setRowsB(4);
      setColsB(3);
      setMatrixA([
        [170, 65, 25],
        [165, 58, 32],
        [180, 75, 28],
        [158, 52, 45]
      ]);
      setMatrixB([
        [2, 1, 0],
        [1, 2, 1],
        [3, 0, 2],
        [0, 3, 3]
      ]);
      setOperation('add');
    } else if (presetName === 'transform') {
      setRowsA(2);
      setColsA(2);
      setRowsB(2);
      setColsB(2);
      setMatrixA([[2, 0], [0, 2]]);
      setMatrixB([[1, 2], [3, 4]]);
      setOperation('multiply');
    } else if (presetName === 'ml') {
      setRowsA(3);
      setColsA(4);
      setRowsB(4);
      setColsB(2);
      setMatrixA([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12]
      ]);
      setMatrixB([
        [1, 2],
        [3, 4],
        [5, 6],
        [7, 8]
      ]);
      setOperation('multiply');
    }
  };

  const addMatrices = (a, b) => {
    if (a.length !== b.length || a[0].length !== b[0].length) {
      return null;
    }
    return a.map((row, i) => row.map((val, j) => val + b[i][j]));
  };

  const subtractMatrices = (a, b) => {
    if (a.length !== b.length || a[0].length !== b[0].length) {
      return null;
    }
    return a.map((row, i) => row.map((val, j) => val - b[i][j]));
  };

  const multiplyMatrices = (a, b) => {
    if (a[0].length !== b.length) {
      return null;
    }
    const result = [];
    for (let i = 0; i < a.length; i++) {
      result[i] = [];
      for (let j = 0; j < b[0].length; j++) {
        let sum = 0;
        for (let k = 0; k < a[0].length; k++) {
          sum += a[i][k] * b[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result;
  };

  const getResult = () => {
    if (operation === 'add') return addMatrices(matrixA, matrixB);
    if (operation === 'subtract') return subtractMatrices(matrixA, matrixB);
    if (operation === 'multiply') return multiplyMatrices(matrixA, matrixB);
    return matrixA;
  };

  const canCalculate = () => {
    if (operation === 'add' || operation === 'subtract') {
      return matrixA.length === matrixB.length && matrixA[0].length === matrixB[0].length;
    }
    if (operation === 'multiply') {
      return matrixA[0].length === matrixB.length;
    }
    return true;
  };

  const getErrorMessage = () => {
    if (operation === 'add' || operation === 'subtract') {
      return `加算・減算には同じサイズの行列が必要です。\n現在: ${matrixA.length}×${matrixA[0].length} と ${matrixB.length}×${matrixB[0].length}`;
    }
    if (operation === 'multiply') {
      return `乗算にはAの列数(${matrixA[0].length})とBの行数(${matrixB.length})が一致する必要があります。\n${matrixA.length}×${matrixA[0].length} × ${matrixB.length}×${matrixB[0].length} は計算できません。`;
    }
    return '';
  };

  const getSteps = () => {
    if (!canCalculate()) return [];
    
    const steps = [];
    if (operation === 'add') {
      matrixA.forEach((row, i) => {
        row.forEach((val, j) => {
          steps.push(`[${i+1},${j+1}]: ${val} + ${matrixB[i][j]} = ${val + matrixB[i][j]}`);
        });
      });
    } else if (operation === 'subtract') {
      matrixA.forEach((row, i) => {
        row.forEach((val, j) => {
          steps.push(`[${i+1},${j+1}]: ${val} - ${matrixB[i][j]} = ${val - matrixB[i][j]}`);
        });
      });
    } else if (operation === 'multiply') {
      const result = multiplyMatrices(matrixA, matrixB);
      result.forEach((row, i) => {
        row.forEach((val, j) => {
          const calculation = matrixA[i].map((a, k) => `${a}×${matrixB[k][j]}`).join(' + ');
          steps.push(`[${i+1},${j+1}]: ${calculation} = ${val}`);
        });
      });
    }
    return steps;
  };

  const MatrixDisplay = ({ matrix, label, editable, onChange }) => (
    <div className="flex flex-col items-center">
      <div className="text-sm font-semibold mb-2 text-gray-700">{label}</div>
      <div className="inline-flex flex-col border-l-2 border-r-2 border-gray-800 py-2 max-h-96 overflow-auto">
        {matrix.map((row, i) => (
          <div key={i} className="flex gap-1 px-2">
            {row.map((val, j) => (
              <input
                key={j}
                type="number"
                value={val}
                onChange={(e) => editable && onChange(i, j, e.target.value)}
                disabled={!editable}
                className="w-14 h-10 text-center text-sm font-mono border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            ))}
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {matrix.length}行 × {matrix[0].length}列
      </div>
    </div>
  );

  const result = getResult();
  const steps = getSteps();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          行列計算ビジュアライザー
        </h1>
        <p className="text-center text-gray-600 mb-8">
          行列の計算を視覚的に理解しましょう
        </p>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="mb-6 pb-6 border-b">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              データサイエンスの例で学ぶ
            </label>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
              <button
                onClick={() => loadPreset('students')}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  preset === 'students'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="font-semibold text-gray-800">学生の成績データ</div>
                <div className="text-xs text-gray-600 mt-1">3×4 + 3×4</div>
                <div className="text-xs text-gray-500 mt-2">行: 観測データ（学生）</div>
                <div className="text-xs text-gray-500">列: 特徴量（科目）</div>
              </button>
              <button
                onClick={() => loadPreset('features')}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  preset === 'features'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="font-semibold text-gray-800">健康データ</div>
                <div className="text-xs text-gray-600 mt-1">4×3 + 4×3</div>
                <div className="text-xs text-gray-500 mt-2">行: サンプル（人）</div>
                <div className="text-xs text-gray-500">列: 身長/体重/年齢</div>
              </button>
              <button
                onClick={() => loadPreset('transform')}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  preset === 'transform'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="font-semibold text-gray-800">座標変換</div>
                <div className="text-xs text-gray-600 mt-1">2×2 × 2×2</div>
                <div className="text-xs text-gray-500 mt-2">XR/MRでの活用例</div>
                <div className="text-xs text-gray-500">拡大・回転・移動</div>
              </button>
              <button
                onClick={() => loadPreset('ml')}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  preset === 'ml'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="font-semibold text-gray-800">機械学習</div>
                <div className="text-xs text-gray-600 mt-1">3×4 × 4×2</div>
                <div className="text-xs text-gray-500 mt-2">データ × 重み行列</div>
                <div className="text-xs text-gray-500">結果: 3×2</div>
              </button>
            </div>
          </div>

          <div className="mb-6 pb-6 border-b">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              カスタムサイズ設定
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="font-semibold text-blue-900 mb-3">行列 A</div>
                <div className="flex gap-4 items-center">
                  <div>
                    <label className="text-xs text-gray-600">行数</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={rowsA}
                      onChange={(e) => resizeMatrixA(parseInt(e.target.value) || 1, colsA)}
                      className="w-20 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">列数</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={colsA}
                      onChange={(e) => resizeMatrixA(rowsA, parseInt(e.target.value) || 1)}
                      className="w-20 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    = {rowsA * colsA}個の値
                  </div>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="font-semibold text-green-900 mb-3">行列 B</div>
                <div className="flex gap-4 items-center">
                  <div>
                    <label className="text-xs text-gray-600">行数</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={rowsB}
                      onChange={(e) => resizeMatrixB(parseInt(e.target.value) || 1, colsB)}
                      className="w-20 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">列数</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={colsB}
                      onChange={(e) => resizeMatrixB(rowsB, parseInt(e.target.value) || 1)}
                      className="w-20 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    = {rowsB * colsB}個の値
                  </div>
                </div>
              </div>
            </div>
            {operation === 'multiply' && (
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm">
                <strong>行列の乗算:</strong> Aの列数({colsA})とBの行数({rowsB})が一致する必要があります。
                結果のサイズは {rowsA}×{colsB} になります。
              </div>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              演算を選択
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setOperation('add')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  operation === 'add'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Plus size={20} />
                加算
              </button>
              <button
                onClick={() => setOperation('subtract')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  operation === 'subtract'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Minus size={20} />
                減算
              </button>
              <button
                onClick={() => setOperation('multiply')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  operation === 'multiply'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <X size={20} />
                乗算
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
            <MatrixDisplay
              matrix={matrixA}
              label="行列 A"
              editable={true}
              onChange={(i, j, val) => updateMatrix(matrixA, setMatrixA, i, j, val)}
            />
            
            <div className="text-2xl font-bold text-gray-600">
              {operation === 'add' && '+'}
              {operation === 'subtract' && '−'}
              {operation === 'multiply' && '×'}
            </div>

            <MatrixDisplay
              matrix={matrixB}
              label="行列 B"
              editable={true}
              onChange={(i, j, val) => updateMatrix(matrixB, setMatrixB, i, j, val)}
            />

            <ArrowRight size={24} className="text-gray-400" />

            {canCalculate() ? (
              <MatrixDisplay
                matrix={result}
                label="結果"
                editable={false}
              />
            ) : (
              <div className="flex flex-col items-center">
                <div className="text-sm font-semibold mb-2 text-red-700">計算不可</div>
                <div className="p-6 bg-red-50 border-2 border-red-300 rounded-lg text-center max-w-xs">
                  <div className="text-red-700 text-sm whitespace-pre-line">
                    {getErrorMessage()}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t pt-6">
            <button
              onClick={() => setShowSteps(!showSteps)}
              disabled={!canCalculate()}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                canCalculate()
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {showSteps ? '計算過程を隠す' : '計算過程を表示'}
            </button>

            {showSteps && canCalculate() && (
              <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  計算過程
                </h3>
                <div className="space-y-2">
                  {steps.map((step, i) => (
                    <div key={i} className="font-mono text-sm text-gray-700 bg-white p-3 rounded border border-gray-200">
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">データサイエンスにおける行列の重要性</h3>
          <div className="space-y-4 text-gray-700">
            <div>
              <div className="font-semibold text-blue-700 mb-1">📊 データセットの表現</div>
              <div className="text-sm pl-4">観測データ（行）× 特徴量（列）の形式で、すべてのデータを行列として扱います。例: 100人の顧客データ × 5つの属性 = 100×5行列</div>
            </div>
            <div>
              <div className="font-semibold text-blue-700 mb-1">🤖 機械学習の基礎</div>
              <div className="text-sm pl-4">ニューラルネットワークは行列の乗算の連続です。入力データに重み行列を掛けることで、特徴を抽出し予測を行います。</div>
            </div>
            <div>
              <div className="font-semibold text-blue-700 mb-1">📈 統計分析</div>
              <div className="text-sm pl-4">共分散行列や相関行列など、データ間の関係を表現するのに行列が不可欠です。</div>
            </div>
            <div>
              <div className="font-semibold text-blue-700 mb-1">🎮 XR/MR開発</div>
              <div className="text-sm pl-4">3D空間での物体の位置、回転、拡大縮小はすべて行列演算で処理されます。</div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t">
            <h4 className="font-semibold mb-2 text-gray-800">使い方</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• プリセットから実際のデータ例を選んで学習できます</li>
              <li>• 行列AとBの行数・列数を個別に変更できます</li>
              <li>• <strong>加算・減算</strong>: 同じサイズの行列が必要です</li>
              <li>• <strong>乗算</strong>: Aの列数とBの行数が一致する必要があります（例: 3×4 × 4×2 = 3×2）</li>
              <li>• 値を変更すると、リアルタイムで結果が更新されます</li>
              <li>• 「計算過程を表示」で、各要素の計算方法を確認できます</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatrixVisualizer;