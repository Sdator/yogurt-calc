import React from 'react';
import { Milk, Droplets, FlaskConical, HelpCircle, AlertCircle } from 'lucide-react';

interface AnnotatedFormulaProps {
  totalVol?: number;
  waterVol: number;
  powderWeight: number;
  targetProtein: number;
  proteinPowder: number;
}

export default function AnnotatedFormula({
  totalVol,
  waterVol,
  powderWeight,
  targetProtein,
  proteinPowder,
}: AnnotatedFormulaProps) {
  // Safe math preview
  const formattedPowder = isNaN(powderWeight) || powderWeight <= 0 ? '?' : powderWeight.toFixed(1);
  const formattedWater = isNaN(waterVol) || waterVol <= 0 ? '?' : (typeof waterVol === 'number' ? waterVol.toFixed(1) : waterVol);
  const currentTotal = totalVol || (typeof waterVol === 'number' && typeof powderWeight === 'number' ? Math.round(waterVol + powderWeight) : 1000);
  const formattedTotal = isNaN(currentTotal) || currentTotal <= 0 ? '1000' : currentTotal;
  
  return (
    <div id="annotated-formula-panel" className="bg-white border-2 border-orange-100 rounded-3xl p-6 md:p-8 shadow-sm overflow-hidden relative">
      {/* Decorative Blueprint Grid Background with Orange Touch */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)',
        backgroundSize: '16px 16px'
      }}></div>

      <div className="relative z-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-orange-100/40">
          <div className="flex items-center gap-3">
            <span className="bg-orange-100 text-orange-850 text-xs sm:text-sm font-black px-3.5 py-1 rounded-full font-sans">
              原理图解
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-gray-950 font-display tracking-tight">
              酸奶凝固锁水的乳胶公式科学解读
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-orange-600 font-black font-sans">🔬 考虑奶粉体积 · 制作总量不溢出</p>
        </div>

        {/* 1. Main Visual Formula Flow (Full Width, guaranteed single line horizontally) */}
        <div className="bg-orange-50/20 rounded-2xl p-6 border border-orange-100 shadow-3xs">
          <div className="flex flex-row items-center justify-around gap-2 md:gap-4 py-4 overflow-x-auto scrollbar-thin select-none min-w-max md:min-w-0">
            
            {/* Ingredient 1: Water */}
            <div id="diag-water" className="flex flex-col items-center bg-blue-50/50 p-4 rounded-2xl border border-blue-100 w-32 shrink-0">
              <Droplets className="w-10 h-10 text-blue-500 mb-2 animate-pulse" />
              <span className="text-xs sm:text-sm font-black text-blue-900">需配温水 (W)</span>
              <span className="text-sm text-blue-600 font-mono mt-1 font-black">{formattedWater} ml</span>
              <span className="text-xs text-gray-400 mt-1 font-bold">总量减去奶粉量</span>
            </div>

            <div className="text-2xl font-black text-orange-400 font-mono shrink-0">+</div>

            {/* Ingredient 2: Milk Powder */}
            <div id="diag-powder" className="flex flex-col items-center bg-orange-50/70 p-4 rounded-2xl border border-orange-200 w-32 shrink-0 relative">
              <Milk className="w-10 h-10 text-orange-500 mb-2" />
              <span className="text-xs sm:text-sm font-black text-orange-950">所需奶粉 (M)</span>
              <span className="text-sm text-orange-700 font-mono mt-1 font-black">{formattedPowder} g</span>
              <span className="text-xs text-orange-650 mt-1 font-bold">含蛋白 {proteinPowder}%</span>
              <div className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
              </div>
            </div>

            <div className="text-2xl font-black text-orange-400 font-mono shrink-0">+</div>

            {/* Ingredient 3: Starter */}
            <div id="diag-starter" className="flex flex-col items-center bg-green-50/50 p-4 rounded-2xl border border-green-100 w-32 shrink-0">
              <FlaskConical className="w-10 h-10 text-green-500 mb-2" />
              <span className="text-xs sm:text-sm font-black text-green-900">酸奶菌粉</span>
              <span className="text-sm text-green-700 mt-1 font-black">1包 (约1g)</span>
              <span className="text-xs text-gray-400 mt-1 font-bold">发酵种子菌</span>
            </div>

            <div className="text-2xl font-black text-orange-400 font-mono shrink-0">➡</div>

            {/* Result: Thick Yogurt */}
            <div id="diag-yogurt" className="flex flex-col items-center bg-orange-100/60 p-4 rounded-2xl border-2 border-orange-300 w-36 shrink-0">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-black text-orange-600 text-base mb-2 shadow-3xs">🥛</div>
              </div>
              <span className="text-xs sm:text-sm font-black text-orange-950">制作总量 (T)</span>
              <span className="text-sm text-orange-700 font-mono mt-1 font-black">{formattedTotal} ml / {targetProtein}%</span>
              <span className="text-xs text-orange-660 font-black bg-white/80 px-2 py-0.5 rounded mt-1 shadow-3xs">完美匹配内胆</span>
            </div>

          </div>
        </div>

        {/* 2. Scientific Formula Explanation & Rules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Formula explanation and definition */}
          <div className="lg:col-span-7 bg-orange-50/20 rounded-2xl p-6 border border-orange-100 shadow-3xs flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <p className="font-black text-orange-950 text-base mb-2">📋 制作总量与质量守恒换算公式:</p>
                <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100/80 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-orange-200/50 pb-2">
                    <span className="font-black font-mono text-sm sm:text-base text-orange-950">
                      奶粉数量 (M) = T × Pₜ ÷ Pₚ
                    </span>
                    <span className="text-xs bg-orange-100 text-orange-850 px-2.5 py-0.5 rounded-lg border border-orange-200 font-bold self-start sm:self-auto font-sans">
                      称取奶粉
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-1">
                    <span className="font-black font-mono text-sm sm:text-base text-blue-950">
                      所需水量 (W) = T - M = T - (T × Pₜ ÷ Pₚ)
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-850 px-2.5 py-0.5 rounded-lg border border-blue-200 font-bold self-start sm:self-auto font-sans">
                      量取温水
                    </span>
                  </div>
                </div>
              </div>

              {/* Practical Calculation Example */}
              <div className="bg-white/90 p-4 rounded-2xl border border-orange-200/60 text-xs sm:text-sm space-y-1.5 leading-relaxed">
                <p className="font-black text-orange-950 flex items-center gap-1.5 text-xs sm:text-sm">
                  <span>💡</span> <strong>实操计算举例（以制作 1000ml / 4% 蛋白质为例）：</strong>
                </p>
                <div className="text-gray-650 space-y-1 pl-1 font-medium text-xs">
                  <p>• <strong>制作总量 (T)</strong>：1000ml（酸奶机 1L 内胆的标称容积）</p>
                  <p>• <strong>目标蛋白质比 (Pₜ)</strong>：4%，<strong>奶粉自身蛋白质 (Pₚ)</strong>：24%</p>
                  <p>• <strong>奶粉数量</strong>：<code className="text-orange-700 font-mono font-bold bg-orange-50 px-1 py-0.5 rounded">1000 × 4% ÷ 24% = 166.7g</code></p>
                  <p>• <strong>水的部分</strong>：<code className="text-blue-700 font-mono font-bold bg-blue-50 px-1 py-0.5 rounded">1000 - 166.7 = 833.3ml</code></p>
                  <p className="text-emerald-700 font-bold mt-1">
                    ✨ 水 (833.3ml) + 奶粉 (166.7g) 调配后正好是 1000ml/g 制作总量，既不溢出内胆，成品蛋白质又精准达到 4.0%！
                  </p>
                </div>
              </div>

              <div className="text-xs sm:text-sm leading-relaxed">
                <div className="text-gray-500">
                  <span className="font-black text-gray-800 flex items-center gap-1.5 text-sm sm:text-base mb-1.5">
                    <HelpCircle className="w-4.5 h-4.5 text-orange-500 inline" /> 为什么必须扣除奶粉占用的体积与重量？
                  </span>
                  过去如果直接用 1000ml 水再额外加 166.7g 奶粉，调制出来的液体将高达 1167ml，不仅容易溢出酸奶机内胆，还会使蛋白质实际浓度被冲淡。按制作总量反向扣除奶粉量，才能实现容积与蛋白质双重精准。
                </div>
              </div>
            </div>
          </div>

          {/* Quick Guide & Rules of Thumb */}
          <div className="lg:col-span-5 self-stretch flex flex-col justify-between gap-4 text-xs sm:text-sm">
            <div className="bg-orange-50/55 border border-orange-100 rounded-2xl p-6 flex flex-col justify-between h-full">
              <h4 className="font-black font-display text-orange-950 text-base sm:text-lg mb-2 flex items-center gap-1.5">
                <AlertCircle className="w-5 h-5 text-orange-500 shrink-0" />
                复原乳发酵两大不倒法则
              </h4>
              <ul className="space-y-3 text-gray-655 text-xs sm:text-sm leading-relaxed font-medium">
                <li>
                  <span className="font-black text-orange-700">🌱 菌活保护</span>：温开水调匀后必须候冷至 42°C 以下方能投放菌粉，千万不可投放热开水，易烫乳酸死菌。
                </li>
                <li>
                  <span className="font-black text-orange-700">🧊 务必钝化</span>：发酵刚拿出时质地可能较松。唯有冷藏钝化（放冰箱 8 小时），酸奶固体结构才会正式发育完毕。
                </li>
              </ul>
              <div className="mt-4 pt-3 border-t border-orange-100/50 text-xs text-gray-400 flex items-center gap-1.5 font-bold">
                <span>⚡</span>
                <span>目标蛋白设定在 3.2% - 4.5% 间凝乳效果极佳。</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
