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
    <div id="protein-guide-card" className="bg-white rounded-3xl border-2 border-orange-100 shadow-sm p-5 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold">🎯</div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 font-sans">关键步骤：查找包装上的蛋白质含量</h3>
            <p className="text-[11px] text-gray-400">自制酸奶的核心变量，请看您的奶粉包装背面</p>
          </div>
        </div>

        {/* Visual Nutrition Label Mockup */}
        <div className="border border-dashed border-orange-300 bg-orange-50/40 rounded-2xl p-3 mb-4 relative">
          {/* Highlight arrow and annotation */}
          <div className="absolute right-2 top-8 translate-y-1 z-20 flex items-center gap-1.5 animate-bounce">
            <span className="text-[10px] bg-orange-500 text-white font-bold px-2.5 py-0.5 rounded-full shadow-xs">
              输入此处的值！
            </span>
          </div>

          <div className="text-[10px] text-gray-400 font-bold tracking-wider text-center uppercase border-b border-gray-150 pb-1 mb-1 font-mono">
            营养成分表 (Nutrition Facts)
          </div>
          <div className="text-[9px] text-gray-400 flex justify-between px-1 font-mono">
            <span>项目 (Nutrient)</span>
            <span>每100克 (per 100g)</span>
            <span>营养素参考值%</span>
          </div>
          <div className="space-y-1 mt-1 font-mono text-[10px] text-gray-700 px-1">
            <div className="flex justify-between border-b border-orange-50 py-0.5">
              <span>能量 (Energy)</span>
              <span>1850 kJ</span>
              <span>22%</span>
            </div>
            
            {/* The Highlighted Row */}
            <div className="flex justify-between bg-orange-500 text-white font-bold rounded-lg px-2 py-1 border border-orange-400 shadow-3xs transition-all">
              <span className="flex items-center gap-1 text-[10px]">
                蛋白质 (Protein) ⭐
              </span>
              <span className="font-extrabold flex items-center gap-1">
                {proteinValue > 0 ? `${proteinValue} g` : '未输入'} 
                <ArrowRight className="w-3 h-3 text-orange-200 inline" />
              </span>
              <span>32%</span>
            </div>

            <div className="flex justify-between border-b border-orange-50 py-0.5 text-gray-450 text-[9px]">
              <span>脂肪 (Fat)</span>
              <span>20.1 g</span>
              <span>25%</span>
            </div>
            <div className="flex justify-between border-b border-orange-50 py-0.5 text-gray-450 text-[9px]">
              <span>碳水化合物 (Carbo)</span>
              <span>55.6 g</span>
              <span>19%</span>
            </div>
          </div>
        </div>

        {/* Dynamic Help Text based on current active value */}
        <div className="bg-orange-50/50 rounded-2xl p-3 border border-orange-100 text-xs text-gray-600 space-y-1 mt-1 mb-4">
          <p className="font-bold text-gray-800 flex items-center gap-1 text-[11px]">
            <Info className="w-4 h-4 text-orange-500 shrink-0" />
            为什么这个蛋白质数据极其关键？
          </p>
          <p className="text-[11px] leading-relaxed text-gray-500">
            婴儿配方奶含有较多非蛋白矿物，平均含量较低（通常 12g~17g）；成人奶粉中蛋白高（Devondale 等多在 24g）；而脱脂高纤维粉更能在 33g 往上。本系统依此数据严格校准。
          </p>
        </div>
      </div>

      {/* Preset Pickers so users don't have to guess if they don't have the milk powder can nearby! */}
      <div>
        <p className="text-[11px] font-bold text-gray-800 mb-2 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          快捷选择参考品类比例:
        </p>
        <div className="grid grid-cols-1 gap-2">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              id={`preset-btn-${idx}`}
              type="button"
              onClick={() => onSelectPreset(preset.value)}
              className={`text-left p-2 px-3 rounded-xl border text-xs flex items-center justify-between transition-all group ${
                Math.abs(proteinValue - preset.value) < 0.1
                  ? 'bg-orange-50 border-orange-400 text-orange-950 font-semibold shadow-3xs'
                  : 'bg-white hover:bg-gray-50 border-gray-150 text-gray-750'
              }`}
            >
              <div className="truncate pr-1">
                <span className="block font-semibold truncate text-[11px]">{preset.name}</span>
                <span className="text-[9px] text-gray-400 shrink-0 select-none">{preset.d}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
