import React from 'react';
import { Sparkles, ArrowRight, Info, ChevronRight } from 'lucide-react';

interface ProteinGuideProps {
  proteinValue: number;
  onSelectPreset: (value: number) => void;
}

export default function ProteinGuide({ proteinValue, onSelectPreset }: ProteinGuideProps) {
  const presets = [
    { name: '全脂成人奶粉 (德运/安佳等)', value: 24.0, d: '约 24g - 26g 蛋白质/100g' },
    { name: '婴幼儿配方奶粉 (1-3段)', value: 16.5, d: '约 12g - 18g 蛋白质/100g' },
    { name: '高钙脱脂奶粉 (高蛋白制酸奶佳品)', value: 33.5, d: '约 33g - 35g 蛋白质/100g' },
  ];

  return (
    <div id="protein-guide-card" className="bg-white rounded-3xl border-2 border-orange-100 shadow-sm p-6 md:p-8 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-black text-lg shadow-3xs shrink-0">🎯</div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 font-sans tracking-tight">关键步骤：查找包装上的蛋白质含量</h3>
            <p className="text-sm sm:text-base font-medium text-gray-400 mt-0.5">自制酸奶的核心变量，请看您的奶粉包装背面</p>
          </div>
        </div>

        {/* Visual Nutrition Label Mockup */}
        <div className="border border-dashed border-orange-300 bg-orange-50/40 rounded-2xl p-4 mb-5 relative">
          {/* Highlight arrow and annotation */}
          <div className="absolute right-3 top-10 translate-y-1 z-20 flex items-center gap-2 animate-bounce">
            <span className="text-xs sm:text-sm bg-orange-500 text-white font-black px-3.5 py-1 rounded-full shadow-xs">
              输入此处的值！
            </span>
          </div>

          <div className="text-xs sm:text-sm text-gray-400 font-black tracking-wider text-center uppercase border-b border-gray-150 pb-1.5 mb-2 font-mono">
            营养成分表 (Nutrition Facts)
          </div>
          <div className="grid grid-cols-[1.3fr_1.2fr_0.9fr] gap-2 px-1 font-mono font-bold text-[11px] sm:text-xs text-gray-400">
            <span className="text-left">项目 (Nutrient)</span>
            <span className="text-center">每100克 (per 100g)</span>
            <span className="text-right">营养素参考值%</span>
          </div>
          <div className="space-y-1.5 mt-2 font-mono text-xs sm:text-sm text-gray-700 px-1 font-medium">
            <div className="grid grid-cols-[1.3fr_1.2fr_0.9fr] gap-2 border-b border-orange-50 py-1 items-center">
              <span className="text-left">能量 (Energy)</span>
              <span className="text-center">1850 kJ</span>
              <span className="text-right">22%</span>
            </div>
            
            {/* The Highlighted Row */}
            <div className="grid grid-cols-[1.3fr_1.2fr_0.9fr] gap-2 bg-orange-500 text-white font-black rounded-xl px-3 py-2 border border-orange-400 shadow-3xs transition-all items-center">
              <span className="flex items-center gap-1.5 text-xs sm:text-sm text-left">
                蛋白质 (Protein) ⭐
              </span>
              <span className="font-black flex items-center justify-center gap-1 text-xs sm:text-sm text-center">
                {proteinValue > 0 ? `${proteinValue} g` : '未输入'} 
                <ArrowRight className="w-4 h-4 text-orange-200 inline shrink-0" />
              </span>
              <span className="text-right">32%</span>
            </div>

            <div className="grid grid-cols-[1.3fr_1.2fr_0.9fr] gap-2 border-b border-orange-50 py-1 text-gray-450 text-[11px] sm:text-xs items-center">
              <span className="text-left">脂肪 (Fat)</span>
              <span className="text-center">20.1 g</span>
              <span className="text-right">25%</span>
            </div>
            <div className="grid grid-cols-[1.3fr_1.2fr_0.9fr] gap-2 border-b border-orange-50 py-1 text-gray-450 text-[11px] sm:text-xs items-center">
              <span className="text-left">碳水化合物 (Carbo)</span>
              <span className="text-center">55.6 g</span>
              <span className="text-right">19%</span>
            </div>
          </div>
        </div>

        {/* Dynamic Help Text based on current active value */}
        <div className="bg-orange-50/50 rounded-2xl p-4 border border-orange-100 text-sm sm:text-base text-gray-655 space-y-2 mt-1 mb-5">
          <p className="font-black text-gray-950 flex items-center gap-1.5 text-sm sm:text-base">
            <Info className="w-5 h-5 text-orange-500 shrink-0" />
            为什么这个蛋白质数据极其关键？
          </p>
          <p className="text-xs sm:text-sm leading-relaxed text-gray-500 font-medium">
            婴儿配方奶含有较多非蛋白矿物，平均含量较低（通常 12g~17g）；成人奶粉中蛋白高（Devondale 等多在 24g）；而脱脂高纤维粉更能在 33g 往上。本系统依此数据严格校准。
          </p>
        </div>
      </div>

      {/* Preset Pickers so users don't have to guess if they don't have the milk powder can nearby! */}
      <div>
        <p className="text-xs sm:text-sm font-black text-gray-950 mb-3 flex items-center gap-1.5">
          <Sparkles className="w-4.5 h-4.5 text-orange-500" />
          快捷选择参考品类比例:
        </p>
        <div className="grid grid-cols-1 gap-2.5">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              id={`preset-btn-${idx}`}
              type="button"
              onClick={() => onSelectPreset(preset.value)}
              className={`text-left p-3 px-4 rounded-xl border text-sm flex items-center justify-between transition-all group ${
                Math.abs(proteinValue - preset.value) < 0.1
                  ? 'bg-orange-50 border-orange-400 text-orange-950 font-black shadow-3xs'
                  : 'bg-white hover:bg-gray-50 border-gray-150 text-gray-750 font-semibold'
              }`}
            >
              <div className="truncate pr-2">
                <span className="block font-black truncate text-xs sm:text-sm">{preset.name}</span>
                <span className="text-[10px] sm:text-xs text-gray-400 shrink-0 select-none font-bold">{preset.d}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
