import React from 'react';
import { Milk, Droplets, FlaskConical, HelpCircle, AlertCircle } from 'lucide-react';

interface AnnotatedFormulaProps {
  waterVol: number;
  powderWeight: number;
  targetProtein: number;
  proteinPowder: number;
}

export default function AnnotatedFormula({
  waterVol,
  powderWeight,
  targetProtein,
  proteinPowder,
}: AnnotatedFormulaProps) {
  // Safe math preview
  const formattedPowder = isNaN(powderWeight) || powderWeight <= 0 ? '?' : powderWeight.toFixed(1);
  const formattedWater = isNaN(waterVol) || waterVol <= 0 ? '?' : waterVol;
  
  return (
    <div id="annotated-formula-panel" className="bg-white border-2 border-orange-100 rounded-3xl p-5 md:p-6 shadow-sm overflow-hidden relative">
      {/* Decorative Blueprint Grid Background with Orange Touch */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)',
        backgroundSize: '16px 16px'
      }}></div>

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="bg-orange-100 text-orange-850 text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full font-sans">
              原理图解
            </span>
            <h3 className="text-sm font-extrabold text-gray-950 font-display tracking-tight">
              酸奶凝固锁水的乳胶公式科学解读
            </h3>
          </div>
          <p className="text-[11px] text-orange-600 font-bold font-sans">🔬 掌握胶束密度 · 宝宝自制不翻车</p>
        </div>

        {/* Flat Diagram Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Main Visual Formula Flow */}
          <div className="lg:col-span-8 bg-orange-50/20 rounded-2xl p-4 border border-orange-100 shadow-3xs flex flex-col justify-between min-h-[180px]">
            {/* The equation visual */}
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 py-3 select-none">
              
              {/* Ingredient 1: Water */}
              <div id="diag-water" className="flex flex-col items-center bg-blue-50/50 p-3 rounded-xl border border-blue-100 w-24">
                <Droplets className="w-8 h-8 text-blue-500 mb-1 animate-pulse" />
                <span className="text-[11px] font-bold text-blue-900">温开水 (W)</span>
                <span className="text-[10px] text-blue-600 font-mono mt-1 font-semibold">{formattedWater} ml</span>
                <span className="text-[9px] text-gray-400 mt-0.5">溶解发酵液</span>
              </div>

              <div className="text-lg font-bold text-orange-400 font-mono">+</div>

              {/* Ingredient 2: Milk Powder */}
              <div id="diag-powder" className="flex flex-col items-center bg-orange-50/70 p-3 rounded-xl border border-orange-200 w-24 relative">
                <Milk className="w-8 h-8 text-orange-500 mb-1" />
                <span className="text-[11px] font-bold text-orange-950">所需奶粉 (M)</span>
                <span className="text-[10px] text-orange-700 font-mono mt-1 font-semibold">{formattedPowder} g</span>
                <span className="text-[9px] text-orange-650 mt-0.5">含蛋自 {proteinPowder}%</span>
                {/* Visual Label connector lines simulated */}
                <div className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </div>
              </div>

              <div className="text-lg font-bold text-orange-400 font-mono">+</div>

              {/* Ingredient 3: Starter */}
              <div id="diag-starter" className="flex flex-col items-center bg-green-50/50 p-3 rounded-xl border border-green-100 w-24">
                <FlaskConical className="w-8 h-8 text-green-500 mb-1" />
                <span className="text-[11px] font-bold text-green-900">酸奶菌粉</span>
                <span className="text-[10px] text-green-700 mt-1 font-semibold">1包 (约1g)</span>
                <span className="text-[9px] text-gray-400 mt-0.5">发酵种子菌</span>
              </div>

              <div className="text-lg font-bold text-orange-400 font-mono">➡</div>

              {/* Result: Thick Yogurt */}
              <div id="diag-yogurt" className="flex flex-col items-center bg-orange-100/60 p-3 rounded-xl border-2 border-orange-300 w-28">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-orange-600 text-xs mb-1 shadow-3xs">🥛</div>
                </div>
                <span className="text-[11px] font-bold text-orange-950">发酵还原乳</span>
                <span className="text-[10px] text-orange-700 font-mono mt-1 font-bold">蛋白 {targetProtein} %</span>
                <span className="text-[9px] text-orange-600 font-medium bg-white/70 px-1 rounded mt-0.5">凝乳网锁定凝固</span>
              </div>

            </div>

            {/* Hand-drawn style flat line annotations annotation texts */}
            <div className="mt-2 pt-3 border-t border-orange-100/60 text-xs text-gray-600 flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <p className="font-bold text-orange-950 mb-1">📋 锁水比例换算公式 (中文解读):</p>
                <div className="font-mono text-[11px] bg-orange-50 p-2 rounded-xl text-orange-850 flex items-center justify-between border border-orange-100/80">
                  <span className="font-medium text-orange-950">M = (W × Pₜ) ÷ (Pₚ - Pₜ)</span>
                  <span className="text-[9px] bg-orange-150 text-orange-800 px-1.5 py-0.5 rounded-lg border border-orange-200">科学配比算式</span>
                </div>
              </div>
              <div className="flex-1 text-[11px] leading-relaxed flex flex-col justify-end">
                <div className="text-gray-500">
                  <span className="font-bold text-gray-800 flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5 text-orange-500 inline" /> 为什么蛋白质比是凝乳的关键？
                  </span>
                  乳酸使溶液 pH 下降到 4.6 时，<span className="text-orange-600 font-semibold underline decoration-orange-200 decoration-2">原奶蛋白质彼此脱水聚集、拉曼交织连成网兜</span>，把游离的水分子死死阻滞包裹在内，这就是结冻凝固的奥秘。若初始蛋白不够，便容易产出豆腐渣或奶水分层的情况。
                </div>
              </div>
            </div>
          </div>

          {/* Quick Guide & Rules of Thumb */}
          <div className="lg:col-span-4 self-stretch flex flex-col justify-between gap-3 text-xs">
            <div className="bg-orange-50/55 border border-orange-100 rounded-2xl p-4 flex flex-col justify-between h-full">
              <h4 className="font-bold font-display text-orange-950 mb-1.5 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-orange-500 shrink-0" />
                复原乳发酵两大不倒法则
              </h4>
              <ul className="space-y-2 text-gray-650 text-[11px] leading-tight">
                <li>
                  <span className="font-bold text-orange-700">🌱 菌活保护</span>：温开水调匀后必须候冷至 42°C 以下方能投放菌粉，千万不可投放热开水，易烫乳酸死菌。
                </li>
                <li>
                  <span className="font-bold text-orange-700">🧊 务必钝化</span>：发酵刚拿出时质地可能较松。唯有冷藏钝化（放冰箱 8 小时），酸奶固体结构才会正式发育完毕。
                </li>
              </ul>
              <div className="mt-3 pt-2 border-t border-orange-100/50 text-[10px] text-gray-400 flex items-center gap-1">
                <span>⚡</span>
                <span>目标蛋自设定在 3.2% - 3.8% 间最宜。</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
