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
          <p className="text-xs sm:text-sm text-orange-600 font-black font-sans">🔬 掌握胶束密度 · 宝宝自制不翻车</p>
        </div>

        {/* 1. Main Visual Formula Flow (Full Width, guaranteed single line horizontally) */}
        <div className="bg-orange-50/20 rounded-2xl p-6 border border-orange-100 shadow-3xs">
          <div className="flex flex-row items-center justify-around gap-2 md:gap-4 py-4 overflow-x-auto scrollbar-thin select-none min-w-max md:min-w-0">
            
            {/* Ingredient 1: Water */}
            <div id="diag-water" className="flex flex-col items-center bg-blue-50/50 p-4 rounded-2xl border border-blue-100 w-32 shrink-0">
              <Droplets className="w-10 h-10 text-blue-500 mb-2 animate-pulse" />
              <span className="text-xs sm:text-sm font-black text-blue-900">温开水 (W)</span>
              <span className="text-sm text-blue-600 font-mono mt-1 font-black">{formattedWater} ml</span>
              <span className="text-xs text-gray-400 mt-1 font-bold">溶解发酵液</span>
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
              <span className="text-xs sm:text-sm font-black text-orange-950">发酵还原乳</span>
              <span className="text-sm text-orange-700 font-mono mt-1 font-black">蛋白 {targetProtein} %</span>
              <span className="text-xs text-orange-660 font-black bg-white/80 px-2 py-0.5 rounded mt-1 shadow-3xs">凝乳网锁定凝固</span>
            </div>

          </div>
        </div>

        {/* 2. Scientific Formula Explanation & Rules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Formula explanation and definition */}
          <div className="lg:col-span-7 bg-orange-50/20 rounded-2xl p-6 border border-orange-100 shadow-3xs flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <p className="font-black text-orange-950 text-base mb-2">📋 锁水比例换算公式 (中文解读):</p>
                <div className="font-mono text-sm sm:text-base bg-orange-50 p-4 rounded-2xl text-orange-850 flex items-center justify-between border border-orange-100/80">
                  <span className="font-black text-orange-950">M = (W × Pₜ) ÷ (Pₚ - Pₜ)</span>
                  <span className="text-xs bg-orange-150 text-orange-800 px-3 py-1 rounded-xl border border-orange-200 font-bold">科学配比算式</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm leading-relaxed">
                <div className="text-gray-500">
                  <span className="font-black text-gray-800 flex items-center gap-1.5 text-sm sm:text-base mb-1.5">
                    <HelpCircle className="w-4.5 h-4.5 text-orange-500 inline" /> 为什么蛋白质比是凝乳的关键？
                  </span>
                  乳酸使溶液 pH 下降到 4.6 时，<span className="text-orange-600 font-bold underline decoration-orange-200 decoration-2">原奶蛋白质彼此脱水聚集、拉曼交织连成网兜</span>，把游离的水分子死死阻滞包裹在内，这就是结冻凝固的奥秘。若初始蛋白不够，便容易产出豆腐渣或奶水分层的情况。
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
                <span>目标蛋白设定在 3.2% - 3.8% 间最宜。</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
