import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  HelpCircle, 
  Sparkles, 
  Trash2, 
  Download, 
  Upload, 
  BookOpen, 
  Activity, 
  Info, 
  MessageSquare, 
  BookmarkCheck,
  Scale,
  Smile,
  AlertCircle,
  X
} from 'lucide-react';
import { YogurtRecord, PresetFormula } from './types';
import AnnotatedFormula from './components/AnnotatedFormula';
import ProteinGuide from './components/ProteinGuide';
import HistoryLogs from './components/HistoryLogs';
import YogurtGallery from './components/YogurtGallery';

export default function App() {
  // --- 1. CORE PARAMETER STATES ---
  const [waterVol, setWaterVol] = useState<number>(500); // ml
  const [proteinPowder, setProteinPowder] = useState<number>(24.0); // g/100g (protein rating of milk powder)
  const [targetProtein, setTargetProtein] = useState<number>(3.2); // g/100ml (typical target for yogurt)
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
  const [isHistorySidebarOpen, setIsHistorySidebarOpen] = useState<boolean>(false);
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState<boolean>(false);
  const [isProteinGuideModalOpen, setIsProteinGuideModalOpen] = useState<boolean>(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [loadedRecord, setLoadedRecord] = useState<YogurtRecord | null>(null);

  // Auto-clear loaded record if user modifies relevant inputs
  useEffect(() => {
    if (loadedRecord) {
      if (
        waterVol !== loadedRecord.waterVol ||
        proteinPowder !== loadedRecord.proteinPowder ||
        Math.abs(targetProtein - loadedRecord.targetProtein) > 0.01
      ) {
        setLoadedRecord(null);
      }
    }
  }, [waterVol, proteinPowder, targetProtein, loadedRecord]);

  // --- 2. RECORD-KEEPING STATES ---
  const [records, setRecords] = useState<YogurtRecord[]>([]);
  const [isSavingPanelOpen, setIsSavingPanelOpen] = useState<boolean>(false);
  const [newRecordNotes, setNewRecordNotes] = useState<string>('');
  const [newRecordStatus, setNewRecordStatus] = useState<'success' | 'fail' | 'pending'>('success');
  const [newRecordTags, setNewRecordTags] = useState<string[]>(['完美凝固']);
  const [newRecordRating, setNewRecordRating] = useState<number>(5);
  const [customTagInput, setCustomTagInput] = useState<string>('');

  // Load records from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('yogurt_calculator_records');
      if (stored) {
        setRecords(JSON.parse(stored));
      } else {
        // Hydrate with 2 mock friendly starting records for新手父母 reference
        const initialRecords: YogurtRecord[] = [
          {
            id: 'sample-1',
            date: '2026-05-28',
            waterVol: 500,
            powderWeight: 77.4,
            proteinPowder: 24.0,
            targetProtein: 3.2,
            isSuccess: 'success',
            predictedTexture: '🍮 嫩豆腐状 (3.2g 蛋白/100ml)',
            rating: 5,
            notes: '第一次给宝宝做，用的成人全脂奶粉，温度定在 40°C 恒温 9 小时，冷藏一晚上后超级稠！像嫩豆腐，宝宝非常爱吃，没有加糖。',
            tags: ['完美凝固', '奶香浓郁', '酸度适中']
          },
          {
            id: 'sample-2',
            date: '2026-05-29',
            waterVol: 600,
            powderWeight: 73.7,
            proteinPowder: 32.0,
            targetProtein: 3.5,
            isSuccess: 'pending',
            predictedTexture: '🍮 原味嫩豆腐状 (3.5g 蛋白/100ml)',
            rating: 4,
            notes: '用了高钙脱脂奶粉冲调出高蛋白发酵酸奶，目前发酵准备中！',
            tags: ['温和不酸']
          }
        ];
        setRecords(initialRecords);
        localStorage.setItem('yogurt_calculator_records', JSON.stringify(initialRecords));
      }
    } catch (e) {
      console.error('Failed to read localStorage records: ', e);
    }
  }, []);

  // Save records to localStorage whenever they change
  const saveRecordsToStorage = (newRecords: YogurtRecord[]) => {
    setRecords(newRecords);
    try {
      localStorage.setItem('yogurt_calculator_records', JSON.stringify(newRecords));
    } catch (e) {
      console.error('Failed to save to localStorage: ', e);
    }
  };

  // --- 3. DISSOLUTION CALCULATIONS ---
  // Formula: M = (W * TargetProtein) / (ProteinPowder - TargetProtein)
  let calculatedPowder = 0;
  let isCalculationValid = false;
  let errorMsg = '';

  if (proteinPowder <= targetProtein) {
    errorMsg = '⚠️ 奶粉的蛋白质含量必须大于目标酸奶的蛋白质强度。';
  } else if (waterVol <= 0 || isNaN(waterVol)) {
    errorMsg = '⚠️ 请输入有效的水容量（毫升）。';
  } else if (proteinPowder <= 0 || isNaN(proteinPowder)) {
    errorMsg = '⚠️ 请输入有效的奶粉蛋白质含量。';
  } else if (targetProtein < 3.2 || targetProtein > 6.0) {
    errorMsg = '⚠️ 为了保证酸奶发酵凝固效果，目标蛋白浓度不可低于 3.2%。';
  } else {
    calculatedPowder = (waterVol * targetProtein) / (proteinPowder - targetProtein);
    isCalculationValid = true;
  }

  // Proportion index (grams of powder per 100ml water)
  const powderRatioPercentage = isCalculationValid ? (calculatedPowder / waterVol) * 100 : 0;
  const dilutionRatio = isCalculationValid ? (waterVol / calculatedPowder).toFixed(1) : '0';

  // --- 4. TEXTURE PREDICTIONS ---
  const getTexturePrediction = (proteinValue: number) => {
    if (proteinValue < 2.5) {
      return {
        rating: '⚠️ 无法凝固 (Too low)',
        desc: '蛋白质含量极低。乳酸菌无法拉起足够的分子网格。成品极易变成乳清稀释液或不固化的水状，绝对不推荐发酵。',
        color: 'text-red-600 bg-red-50 border-red-100',
        emoji: '❌'
      };
    }
    if (proteinValue >= 2.5 && proteinValue < 3.0) {
      return {
        rating: '🥛 易碎流动型 (Fluid / Drinking)',
        desc: '蛋白质浓度一般。发酵后呈松散、流动的浆糊状，用勺勺起较稀。适合制作吸吸型酸奶、复原奶果汁搅拌或拌燕麦。',
        color: 'text-sky-700 bg-sky-100 border-sky-100',
        emoji: '🥤'
      };
    }
    if (proteinValue >= 3.0 && proteinValue < 3.8) {
      return {
        rating: '🍮 原味嫩豆腐状 (Set / Spoonable)',
        desc: '黄金复原比例！类似于市售凝固型酸奶，质地坚挺。用勺挖下时边缘光滑，口感滑润细腻，最容易获得成功的标准酸奶。',
        color: 'text-emerald-700 bg-emerald-100 border-emerald-100',
        emoji: '✨'
      };
    }
    return {
      rating: '🍧 希腊式浓稠/老酸奶 (Greek density)',
      desc: '高蛋白和高固形物比率！质地超级浓密扎实，接近奶酪。勺子可在上面站立，极少析出多余水分，口感丰满饱满。推荐新手父母采用此规格，凝结度最佳。',
      color: 'text-orange-700 bg-orange-100/50 border-orange-200/50',
      emoji: '🌟'
    };
  };

  const currentTexture = getTexturePrediction(targetProtein);

  // --- 5. PRESET FLUID ACTIONS ---
  const applyPresetFormula = (formula: { targetProtein: number }) => {
    setTargetProtein(Math.max(3.2, formula.targetProtein));
  };

  // Preset definitions
  const targetPresets = [
    { name: '🥇 黄金比例 (3.2g)', targetProtein: 3.2, desc: '最类似鲜牛奶发酵的滑嫩状态' },
    { name: '🍨 浓厚饱满 (3.8g)', targetProtein: 3.8, desc: '老酸奶级质地，不插勺不翻车' },
    { name: '🥛 高效固化 (3.5g)', targetProtein: 3.5, desc: '极佳凝固力，蛋白质网络支撑力强' }
  ];

  // --- 6. HISTORY OPERATIONS ---
  const handleSaveRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCalculationValid) return;

    const newRec: YogurtRecord = {
      id: `recipe-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      waterVol: waterVol,
      powderWeight: parseFloat(calculatedPowder.toFixed(1)),
      proteinPowder: proteinPowder,
      targetProtein: targetProtein,
      isSuccess: newRecordStatus,
      predictedTexture: currentTexture.rating,
      rating: newRecordRating,
      notes: newRecordNotes.trim() || `使用温水 ${waterVol}ml + 奶粉 ${calculatedPowder.toFixed(1)}g 对冲冲调，口感顺滑。`,
      tags: newRecordTags
    };

    const updated = [newRec, ...records];
    saveRecordsToStorage(updated);
    
    // Clear and close saving panel
    setNewRecordNotes('');
    setNewRecordTags(['完美凝固']);
    setCustomTagInput('');
    setIsSavingPanelOpen(false);
  };

  const handleAddCustomSaveTag = () => {
    const trimmed = customTagInput.trim();
    if (trimmed && !newRecordTags.includes(trimmed)) {
      setNewRecordTags([...newRecordTags, trimmed]);
    }
    setCustomTagInput('');
  };

  const handleDeleteRecord = (id: string) => {
    const updated = records.filter(r => r.id !== id);
    saveRecordsToStorage(updated);
  };

  const handleUpdateRecordStatus = (id: string, status: 'success' | 'fail' | 'pending') => {
    const updated = records.map(r => {
      if (r.id === id) {
        return { ...r, isSuccess: status };
      }
      return r;
    });
    saveRecordsToStorage(updated);
  };

  const handleUpdateRecordDetails = (id: string, rating: number, notes: string, tags: string[]) => {
    const updated = records.map(r => {
      if (r.id === id) {
        return { ...r, rating, notes, tags };
      }
      return r;
    });
    saveRecordsToStorage(updated);
  };

  const handleLoadRecordToCalculator = (record: YogurtRecord) => {
    setWaterVol(record.waterVol);
    setProteinPowder(record.proteinPowder);
    setTargetProtein(Math.max(3.2, record.targetProtein));
    setLoadedRecord(record);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImportRecords = (importedList: YogurtRecord[]) => {
    const merged = [...importedList, ...records.filter(r => !importedList.some(imp => imp.id === r.id))];
    saveRecordsToStorage(merged);
  };

  return (
    <div id="yogurt-app-body" className="min-h-screen bg-orange-50 font-sans text-gray-800 pb-1">
      
      {/* 1. Top Minimalist Header Banner - Functional tool design focusing purely on calculation options */}
      <header className="bg-orange-400 p-4 shadow-xs rounded-b-2xl">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-lg select-none shadow-xs">🥛</div>
            <div>
              <h1 className="text-white text-base sm:text-lg font-bold font-display tracking-tight">
                复原乳发酵酸奶比例计算器
              </h1>
              <p className="text-orange-50 text-[11px] font-sans opacity-95">
                精准调配水和奶粉配比，使还原乳快速达到蛋白质胶层发酵浓度。
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setIsGalleryOpen(true)}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 border border-amber-300 text-white rounded-lg text-xs font-extrabold shadow-3xs flex items-center gap-1 transition-all duration-100 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
            >
              🖼️ 日常发酵分享
            </button>
            <button
              onClick={() => setIsHistorySidebarOpen(true)}
              className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 border border-orange-350 text-white rounded-lg text-xs font-extrabold shadow-3xs flex items-center gap-1 transition-all duration-100 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
            >
              📋 历史配方记录 ({records.length})
            </button>
            <button
              onClick={() => setIsFormulaModalOpen(true)}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg text-xs font-bold shadow-3xs flex items-center gap-1 transition-all duration-100 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
            >
              📊 科学公式解读
            </button>
            <button
              onClick={() => setIsProteinGuideModalOpen(true)}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg text-xs font-bold shadow-3xs flex items-center gap-1 transition-all duration-100 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
            >
              🔍 查找蛋白质含量
            </button>
            <button
              onClick={() => setIsHelpModalOpen(true)}
              className="px-3.5 py-1.5 bg-white text-orange-600 hover:bg-orange-50 rounded-lg text-xs font-extrabold shadow-3xs flex items-center gap-1 transition-all duration-100 hover:scale-[1.01] active:scale-[0.98] border border-orange-100 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-orange-500" />
              <span>自制教程 & FAQ</span>
            </button>
          </div>
        </div>
      </header>

      {/* Modern Collapsible Yogurt Photo Gallery Showcase (Now a Phone-Album Popup Modal) */}
      <YogurtGallery isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />

      {/* 2. Step Guide Block - Serene and Distinctive Calm Mint Layout */}
      <div id="quick-step-guide-bar" className="max-w-7xl mx-auto px-4 md:px-8 mt-4 animate-fadeIn">
        <div className="bg-emerald-50/90 border border-emerald-200/80 rounded-2xl p-4 md:p-5 shadow-3xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-2xl select-none animate-bounce">🧭</span>
            <div>
              <h3 className="font-display font-extrabold text-emerald-950 text-[14.5px] sm:text-[15.5px]">发酵调配核心指南</h3>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:flex md:items-center md:gap-4 shrink-0">
            {/* Step 1 */}
            <div 
              onMouseEnter={() => setHoveredStep(1)}
              onMouseLeave={() => setHoveredStep(null)}
              className={`p-3 rounded-xl border transition-all duration-200 cursor-help ${
                hoveredStep === 1 
                  ? 'bg-emerald-600 border-emerald-700 text-white shadow-xs' 
                  : 'bg-white border-emerald-100 text-emerald-900 hover:border-emerald-300 hover:bg-emerald-50/40'
              }`}
            >
              <div className="flex items-center gap-1.5 leading-none">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono font-extrabold ${
                  hoveredStep === 1 ? 'bg-white text-emerald-600' : 'bg-emerald-100 text-emerald-800'
                }`}>1</span>
                <span className="text-xs font-bold">1. 查奶粉蛋白质含量</span>
              </div>
              <p className={`text-[10.5px] mt-1.5 leading-normal ${hoveredStep === 1 ? 'text-emerald-100/95' : 'text-gray-500'}`}>
                包装上标示的蛋白质克重
              </p>
            </div>

            {/* Step 2 */}
            <div 
              onMouseEnter={() => setHoveredStep(2)}
              onMouseLeave={() => setHoveredStep(null)}
              className={`p-3 rounded-xl border transition-all duration-200 cursor-help ${
                hoveredStep === 2 
                  ? 'bg-emerald-600 border-emerald-700 text-white shadow-xs' 
                  : 'bg-white border-emerald-100 text-emerald-900 hover:border-emerald-300 hover:bg-emerald-50/40'
              }`}
            >
              <div className="flex items-center gap-1.5 leading-none">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono font-extrabold ${
                  hoveredStep === 2 ? 'bg-white text-emerald-600' : 'bg-emerald-100 text-emerald-800'
                }`}>2</span>
                <span className="text-xs font-bold">2. 水容量 (温水数量)</span>
              </div>
              <p className={`text-[10.5px] mt-1.5 leading-normal ${hoveredStep === 2 ? 'text-emerald-100/95' : 'text-gray-500'}`}>
                拟冲调制作的总水量大小
              </p>
            </div>

            {/* Step 3 */}
            <div 
              onMouseEnter={() => setHoveredStep(3)}
              onMouseLeave={() => setHoveredStep(null)}
              className={`p-3 rounded-xl border transition-all duration-200 cursor-help ${
                hoveredStep === 3 
                  ? 'bg-emerald-600 border-emerald-700 text-white shadow-xs' 
                  : 'bg-white border-emerald-100 text-emerald-900 hover:border-emerald-300 hover:bg-emerald-50/40'
              }`}
            >
              <div className="flex items-center gap-1.5 leading-none">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono font-extrabold ${
                  hoveredStep === 3 ? 'bg-white text-emerald-600' : 'bg-emerald-100 text-emerald-800'
                }`}>3</span>
                <span className="text-xs font-bold">3. 精准浓稠度设定</span>
              </div>
              <p className={`text-[10.5px] mt-1.5 leading-normal ${hoveredStep === 3 ? 'text-emerald-100/95' : 'text-gray-500'}`}>
                必须满足最低标准限制 (≥ 3.2%)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body Container: Clean, single visual grid layout without clutter */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6">
        
        {/* Main Workspaces Layout (Split equally between adjustment controls and outcomes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          
          {/* LEFT COLUMN: Input controls and adjustments */}
          <div className="flex flex-col h-full space-y-6">
            
            {/* The Input Card */}
            <div id="calculator-inputs-card" className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border-2 border-orange-100 flex flex-col justify-between flex-grow h-full space-y-6">
              
              <div className="flex items-center justify-between border-b border-orange-50 pb-3">
                <h3 className="text-orange-600 font-bold flex items-center gap-2 text-sm">
                  <span className="w-6 h-6 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center text-xs font-mono font-bold">1</span>
                  参数微调与比例设定
                </h3>
                <span className="text-[11px] text-gray-400">滑动或输入即可实时换算</span>
              </div>

              {/* Input Row 1: Water Volume */}
              <div className={`space-y-2 p-2 rounded-xl border border-transparent transition-all duration-300 ${hoveredStep === 2 ? 'animate-border-flash' : ''}`}>
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="water-vol-input" className="font-bold text-gray-700 flex items-center gap-1">
                    💦 计划用水量 (温开水容量)
                  </label>
                  <span className="font-semibold text-gray-400">
                    目前设定: <span className="text-orange-600 font-mono text-base font-bold">{waterVol}</span> ml
                  </span>
                </div>
                
                <input
                  id="water-vol-range"
                  type="range"
                  min="100"
                  max="2000"
                  step="50"
                  value={waterVol}
                  onChange={(e) => setWaterVol(parseInt(e.target.value) || 100)}
                  className="w-full h-2 bg-orange-100/60 rounded-lg appearance-none cursor-pointer accent-orange-400"
                />

                <div className="flex gap-2">
                  <input
                    id="water-vol-input"
                    type="number"
                    min="1"
                    max="5000"
                    value={waterVol || ''}
                    onChange={(e) => setWaterVol(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-32 border-b-2 border-orange-200 focus:border-orange-400 px-2 py-1 text-xs text-center focus:outline-hidden font-mono font-bold text-gray-800"
                  />
                  
                  {/* Water Quick options */}
                  <div className="flex gap-1.5 items-center flex-wrap">
                    {[250, 400, 500, 1000].map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setWaterVol(v)}
                        className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all ${
                          waterVol === v 
                            ? 'bg-orange-100 border-orange-300 text-orange-900 font-semibold font-mono'
                            : 'bg-white hover:bg-gray-50 border-orange-100 text-gray-600 font-mono'
                        }`}
                      >
                        {v}ml
                      </button>
                    ))}
                    <span className="text-[10px] text-gray-400">（通常参考内胆容积）</span>
                  </div>
                </div>
              </div>

              {/* Input Row 2: Protein on Tin */}
              <div className={`space-y-2 border-t border-orange-50 pt-4 p-2 rounded-xl transition-all duration-300 ${hoveredStep === 1 ? 'animate-border-flash' : ''}`}>
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="protein-powder-input" className="font-bold text-gray-700 flex items-center gap-1">
                    🔍 您奶粉包装上的蛋白质含量
                  </label>
                  <span className="font-semibold text-gray-400">
                    当前值: <span className="text-orange-500 font-mono text-base font-bold">{proteinPowder}</span> g/100g
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    id="protein-powder-input"
                    type="number"
                    step="0.1"
                    min="1"
                    max="60"
                    placeholder="例如: 24.0"
                    value={proteinPowder || ''}
                    onChange={(e) => setProteinPowder(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-32 border-b-2 border-orange-200 focus:border-orange-400 px-2 py-1 text-xs text-center focus:outline-hidden font-mono font-bold text-orange-600 bg-orange-50/20"
                  />
                  <div className="text-[11px] text-orange-850 leading-relaxed bg-orange-50/50 p-2.5 rounded-lg flex-1 border border-orange-100">
                    💡 <strong>查找提示</strong>：参考右侧营养成分表图示查找此值。普通成人全脂奶粉一般为 24.0g 左右，配方粉稍低，高蛋白脱脂粉更高。
                  </div>
                </div>
              </div>

              {/* Input Row 3: Target Yogurt Protein Strength */}
              <div className={`space-y-2 border-t border-orange-50 pt-4 p-2 rounded-xl transition-all duration-300 ${hoveredStep === 3 ? 'animate-border-flash' : ''}`}>
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="target-protein-range" className="font-bold text-gray-700 flex items-center gap-1">
                    📐 拟调还原乳目标蛋白浓度
                  </label>
                  <span className="text-green-600 font-bold font-mono">
                    目标: {targetProtein}% (g/100ml)
                  </span>
                </div>
                
                <input
                  id="target-protein-range"
                  type="range"
                  min="3.2"
                  max="5.0"
                  step="0.1"
                  value={targetProtein}
                  onChange={(e) => setTargetProtein(Math.max(3.2, parseFloat(e.target.value) || 3.2))}
                  className="w-full h-2 bg-green-100 rounded-lg appearance-none cursor-pointer accent-green-400"
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <input
                      id="target-protein-input"
                      type="number"
                      step="0.1"
                      min="3.2"
                      max="6.0"
                      value={targetProtein || ''}
                      onChange={(e) => setTargetProtein(Math.max(3.2, parseFloat(e.target.value) || 3.2))}
                      className="w-24 border border-gray-200 rounded-lg px-2 py-1 text-xs text-center focus:border-orange-400 focus:outline-hidden font-mono font-bold text-indigo-850 animate-fadeIn"
                    />
                    <span className="text-[11px] text-gray-400">g/100ml</span>
                  </div>

                  {/* Yogurt presets button group */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {targetPresets.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => applyPresetFormula(preset)}
                        className={`text-[10px] px-2.5 py-1 rounded-lg border text-left transition-all cursor-pointer ${
                          Math.abs(targetProtein - preset.targetProtein) < 0.05
                            ? 'bg-green-100 border-green-400 text-green-900 font-bold font-mono'
                            : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-600'
                        }`}
                        title={preset.desc}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div> {/* End Left Column */}

          {/* RIGHT COLUMN: Output recommendation metrics and texture forecasting */}
          <div className="flex flex-col h-full space-y-6">

            {/* BIG RESULTS PANEL */}
            <div id="calculator-results-card" className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border-2 border-orange-100 flex flex-col justify-center items-center text-center transition-all relative overflow-hidden flex-grow h-full space-y-4">
              <span className="text-gray-500 text-xs sm:text-sm uppercase tracking-widest mb-1 font-extrabold block">换算计算核心产出</span>
              <p className="text-gray-500 font-medium text-xs">本次制作配方建议加入奶粉</p>
              
              {isCalculationValid ? (
                <>
                  <div className="text-5xl sm:text-6xl font-black text-orange-500 mb-1 font-mono drop-shadow-xs select-all">
                    {calculatedPowder.toFixed(1)} <span className="text-2xl font-bold text-gray-400 font-sans">克 (g)</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-center gap-2 max-w-lg">
                    <span className="px-3.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold shadow-3xs">
                      {currentTexture.rating}
                    </span>
                    <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-semibold shadow-3xs">
                      目标浓度: {targetProtein}g/100ml
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-500 leading-relaxed max-w-sm">
                    💡 <strong>新手操作流程</strong>：量取 <strong className="text-orange-600">{waterVol}ml 温水</strong> 注入容器，完全融解这个重量的奶粉并搅拌均匀，等温凉后撒入乳菌粉发酵即可。
                  </p>

                  <div id="co2-warning-notice" className="text-[10.5px] text-amber-700 bg-amber-50/70 border border-amber-200/80 rounded-xl py-2 px-3 mb-1 max-w-sm leading-relaxed font-medium flex flex-col items-center gap-1 justify-center">
                    <span className="flex items-center gap-1 text-amber-800 text-xs font-black">⚠️ 注意事项：发酵中会产生二氧化碳</span>
                    <span className="text-[10px] text-amber-900 leading-normal text-center">
                      密闭发酵会导致容器内累积气压。请避免将盖子拧得过死，并在开盖时保持小心，谨防气体猛烈喷溅、顶飞瓶盖或胀裂容器。
                    </span>
                  </div>

                  {/* Reconstitution Ratio Indicators - Elegantly placed in results */}
                  <div className="p-3 bg-orange-50/50 rounded-2xl border border-dashed border-orange-200 text-center w-full max-w-sm">
                    <p className="text-[11px] text-orange-950 font-semibold">
                      ⚖️ <strong>复原比例指示 (奶粉：温水)</strong>
                    </p>
                    <div className="flex justify-around items-center mt-2 text-xs font-mono font-bold text-orange-850">
                      <div>
                        <span className="text-[9.5px] text-gray-400 block font-normal">克比 (奶粉:水)</span>
                        约 1 : {dilutionRatio}
                      </div>
                      <div className="w-[1px] h-6 bg-orange-200"></div>
                      <div>
                        <span className="text-[9.5px] text-gray-400 block font-normal">调配浓度比</span>
                        {(calculatedPowder / waterVol).toFixed(3)}g / ml
                      </div>
                    </div>
                  </div>
                  
                  <button
                    id="save-recipe-trigger-btn"
                    type="button"
                    onClick={() => {
                      setIsSavingPanelOpen(true);
                      setNewRecordNotes(`温水 ${waterVol}ml + 奶粉 ${calculatedPowder.toFixed(1)}g (蛋白质 ${proteinPowder}g/100g)，预估口感是 ${currentTexture.rating}。`);
                    }}
                    className="w-full max-w-xs py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl shadow-md shadow-orange-100 hover:shadow-orange-200 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>💾 保存本次配方记录</span>
                  </button>
                </>
              ) : (
                <div className="py-4 text-center">
                  <p className="text-sm font-semibold text-red-500">{errorMsg || '等待参数输入中...'}</p>
                  <p className="text-xs text-orange-800 mt-1">请在上方绿色与红色警告区间内纠正参数。</p>
                </div>
              )}
            </div>

          </div> {/* End Right Column */}

        </div>

      </div>

      {/* 4. Elegant Sliding Recipe History Sidebar Drawer */}
      {isHistorySidebarOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end select-none">
          {/* Backdrop Overlay */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-3xs transition-opacity cursor-pointer"
            onClick={() => setIsHistorySidebarOpen(false)}
          ></div>

          {/* Sidebar Panel container */}
          <div className="relative w-full max-w-2xl bg-white h-screen shadow-2xl flex flex-col border-l border-orange-100 animate-slide-in select-text">
            
            {/* Drawer Header */}
            <div className="px-6 py-4.5 bg-orange-400 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-lg">📋</span>
                <h3 className="font-display font-medium text-sm sm:text-base tracking-tight">历史调配与实测发酵记录</h3>
                <span className="text-xs bg-orange-500/80 px-2.5 py-0.5 rounded-full font-bold font-mono">
                  {records.length} 组
                </span>
              </div>
              <button
                onClick={() => setIsHistorySidebarOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white focus:outline-hidden cursor-pointer"
                title="关闭"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable container for the component */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-orange-50/15">
              <HistoryLogs 
                records={records}
                onDeleteRecord={handleDeleteRecord}
                onUpdateRecordStatus={handleUpdateRecordStatus}
                onUpdateRecordDetails={handleUpdateRecordDetails}
                onLoadRecordToCalculator={(rec) => {
                  handleLoadRecordToCalculator(rec);
                  setIsHistorySidebarOpen(false); // Close sidebar for user convenience
                }}
                onImportRecords={handleImportRecords}
              />
            </div>

            {/* Footer containing navigation */}
            <div className="p-4 bg-gray-50 border-t border-gray-150 flex justify-end shrink-0">
              <button
                onClick={() => setIsHistorySidebarOpen(false)}
                className="px-5 py-2 bg-orange-500 hover:bg-orange-600 font-bold rounded-xl text-xs text-white transition-all duration-100 cursor-pointer"
              >
                返回主计算器
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 4.5 Save Recipe Modal Dialog */}
      {isSavingPanelOpen && isCalculationValid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
          {/* Backdrop layer */}
          <div className="absolute inset-0 cursor-default" onClick={() => setIsSavingPanelOpen(false)}></div>
          
          {/* Modal Container */}
          <form 
            onSubmit={handleSaveRecipe} 
            className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-orange-100 flex flex-col max-h-[90vh] overflow-hidden select-text animate-fadeIn"
          >
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-r from-orange-400 to-orange-500 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center text-lg select-none">💾</div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold font-display tracking-tight">保存酸奶制作配方与批次</h3>
                  <p className="text-orange-50 text-[10.5px] font-sans opacity-95">记录最佳黄金发酵比例，留存每一次的宝宝喂养心得</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSavingPanelOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white focus:outline-hidden cursor-pointer"
                title="关闭"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 md:p-6 overflow-y-auto space-y-4">
              <div className="bg-orange-50/50 p-3 rounded-2xl border border-orange-100 text-xs text-orange-950 flex flex-col gap-1.5">
                <div className="font-bold flex items-center gap-1.5 text-[12px] text-orange-900">
                  <span>📝 本次建议比例:</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-gray-750 text-[11.5px] font-medium leading-relaxed">
                  <div>💦 温水量: <span className="font-bold text-orange-600 font-mono">{waterVol} ml</span></div>
                  <div>🥛 奶粉量: <span className="font-bold text-orange-600 font-mono">{calculatedPowder.toFixed(1)} g</span></div>
                  <div>🔍 奶粉蛋白质: <span className="font-mono">{proteinPowder} g/100g</span></div>
                  <div>📐 目标浓度: <span className="font-mono">{targetProtein} %</span></div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Status */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 block">发酵结果认定:</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setNewRecordStatus('success')}
                      className={`py-1.5 rounded-lg text-xs font-semibold select-none cursor-pointer ${
                        newRecordStatus === 'success' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-white border text-green-600 hover:bg-green-50 border-gray-200'
                      }`}
                    >
                      成功凝乳
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewRecordStatus('fail')}
                      className={`py-1.5 rounded-lg text-xs font-semibold select-none cursor-pointer ${
                        newRecordStatus === 'fail' 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white border text-red-600 hover:bg-red-50 border-gray-200'
                      }`}
                    >
                      发酵失败
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewRecordStatus('pending')}
                      className={`py-1.5 rounded-lg text-xs font-semibold select-none cursor-pointer ${
                        newRecordStatus === 'pending' 
                          ? 'bg-amber-500 text-white' 
                          : 'bg-white border text-amber-600 hover:bg-amber-50 border-gray-200'
                      }`}
                    >
                      尚未开封
                    </button>
                  </div>
                </div>

                {/* Rating */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 block">质地评分:</label>
                  <div className="flex items-center gap-1 h-8 select-none">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRecordRating(star)}
                        className="p-1 focus:outline-hidden cursor-pointer"
                      >
                        <span className={`text-xl ${star <= newRecordRating ? 'text-amber-400' : 'text-gray-300'}`}>★</span>
                      </button>
                    ))}
                    <span className="text-[11px] text-gray-500 ml-1">({newRecordRating}星)</span>
                  </div>
                </div>
              </div>

              {/* Predefined Tags preset checkboxes */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 block">快捷风味标签 (多选):</label>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1 shrink-0 select-none border border-orange-100 bg-orange-50/10 p-2 rounded-xl">
                  {Array.from(new Set([
                    '完美凝固', 
                    '完美拉丝', 
                    '奶香浓郁', 
                    '奶香极其醇厚', 
                    '酸度适中', 
                    '温和不甜', 
                    '温和不酸', 
                    '质地粘稠', 
                    '稍微偏酸', 
                    '比较稀', 
                    '乳清析出', 
                    '表面有乳清析出', 
                    '无法固化', 
                    '宝宝极爱吃', 
                    '加了辅食泥调配',
                    ...newRecordTags
                  ])).map(tag => {
                    const selected = newRecordTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          if (selected) {
                            setNewRecordTags(newRecordTags.filter(t => t !== tag));
                          } else {
                            setNewRecordTags([...newRecordTags, tag]);
                          }
                        }}
                        className={`text-[10px] px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                          selected 
                            ? 'bg-orange-500 text-white font-semibold shadow-3xs' 
                            : 'bg-white text-gray-600 hover:text-gray-800 border-orange-100 border'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Tag Input */}
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="自定义风味或喂养体验标签..."
                    value={customTagInput}
                    onChange={(e) => setCustomTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCustomSaveTag();
                      }
                    }}
                    className="border border-orange-100 rounded-lg px-2.5 py-1.5 text-xs bg-white w-56 focus:border-orange-400 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomSaveTag}
                    className="bg-orange-100 hover:bg-orange-200 text-orange-850 px-3 py-1.5 text-xs rounded-lg font-bold transition-all cursor-pointer active:scale-95"
                  >
                    添加分类标签
                  </button>
                </div>
              </div>

              {/* Custom note textbox */}
              <div className="space-y-1">
                <label htmlFor="modal-notes-textarea" className="text-xs font-bold text-gray-700 block">备忘记事/喂养心得:</label>
                <textarea
                  id="modal-notes-textarea"
                  placeholder="请输入给宝宝喂养、自制发酵时长或加糖配方的反馈。例如: 宝宝第一次吃酸奶，没有加糖，配了半勺牛油果泥。大口大口全吃光了！"
                  value={newRecordNotes}
                  onChange={(e) => setNewRecordNotes(e.target.value)}
                  className="w-full text-xs p-2.5 border rounded-xl h-20 bg-white focus:outline-hidden focus:border-orange-400 border-orange-100"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-150 flex justify-end gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsSavingPanelOpen(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1.5 rounded-lg text-xs font-medium cursor-pointer"
              >
                取消
              </button>
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-1.5 rounded-lg text-xs font-bold shadow-2xs cursor-pointer"
              >
                确认保存并收录
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 5. Clean, Professional Scientific Guide & FAQ Modern Modal Dialog */}
      {isHelpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/60 backdrop-blur-xs">
          {/* Backdrop layer */}
          <div className="absolute inset-0 cursor-default" onClick={() => setIsHelpModalOpen(false)}></div>
          
          {/* Modal Container */}
          <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-orange-100 flex flex-col max-h-[90vh] overflow-hidden select-text">
            
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-orange-400 to-orange-500 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center text-xl select-none">💡</div>
                <div>
                  <h3 className="text-lg font-black font-display tracking-tight">自制酸奶：科学指南 & 新手经典答疑</h3>
                  <p className="text-orange-100 text-[11px] font-sans">让自制复原酸奶更简单 · 让新手父母育儿更省心</p>
                </div>
              </div>
              <button
                onClick={() => setIsHelpModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white focus:outline-hidden cursor-pointer"
                title="关闭"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-8">
              
              {/* Part 1: Starter Guide */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-orange-100 pb-2.5">
                  <BookOpen className="w-5 h-5 text-orange-500 shrink-0" />
                  <h4 className="text-sm font-bold font-display text-gray-950">自制奶粉酸奶：标准操作方法流程</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Step 1 */}
                  <div className="p-4 bg-orange-50/20 border border-orange-100/60 rounded-2xl flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs shrink-0 font-mono mt-0.5">
                      1
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-gray-900">温水融解、无颗粒粉液</h5>
                      <p className="text-[11px] text-gray-500 leading-relaxed mt-1">
                        推荐先用配方中 <span className="font-semibold text-gray-700">50% 的温水</span> (尽量恒温在 38°C - 41°C) 加入盆中，撒入全部奶粉。使用消毒蛋抽或汤匙，呈“Z”字型彻底划开，避免画圈起泡或产生未融解干粉球。
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="p-4 bg-orange-50/20 border border-orange-100/60 rounded-2xl flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs shrink-0 font-mono mt-0.5">
                      2
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-gray-900">接种乳酸菌粉</h5>
                      <p className="text-[11px] text-gray-500 leading-relaxed mt-1">
                        确认冲好的奶液温度已经低于 <span className="font-semibold text-orange-600">42°C</span> (手腕内侧感到不温烫)。剪开 1 包酸奶菌粉，均匀倒在乳液表面，静置 30 秒吸收，然后用轻缓动作上下翻拌混合。
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="p-4 bg-orange-50/20 border border-orange-100/60 rounded-2xl flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs shrink-0 font-mono mt-0.5">
                      3
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-gray-900">绝热避光发酵</h5>
                      <p className="text-[11px] text-gray-500 leading-relaxed mt-1">
                        倒入经过沸烫消毒好的酸奶罐。置入发酵器。通常选择 <span className="font-bold text-gray-800">38°C~41°C 恒温放任 8 - 10 小时</span> 培养，中途切勿移动或频繁掀盖观察。
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="p-4 bg-orange-50/20 border border-orange-100/60 rounded-2xl flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs shrink-0 font-mono mt-0.5">
                      4
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">立刻冷藏，促成“钝化”质变</h4>
                      <p className="text-[11px] text-gray-500 leading-relaxed mt-1">
                        时间结束立即开封，呈紧实平滑的固相即表成功！<span className="font-semibold text-orange-600 underline underline-offset-2">此时将其直接放入冰箱冷藏室冷藏至少 8 小时</span>，温度骤降会锁闭水分，酸度稳定，质地也会变得惊艳丝滑！
                      </p>
                    </div>
                  </div>

                </div>

                <div className="p-3.5 bg-orange-50 rounded-2xl border border-orange-100 text-xs text-orange-950 flex items-start gap-2">
                  <span className="text-base leading-none">⚠️</span>
                  <p className="text-[11px] leading-normal font-sans">
                    <strong>无菌提示</strong>：宝宝肠胃娇弱，整个制作使用的玻璃勺罐器，冲调前均必须使用刚烧开的沸水彻底淋烫消毒，最大程度排除腐杂菌干扰。
                  </p>
                </div>
              </div>

              {/* Part 2: FAQs */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-orange-100 pb-2.5">
                  <Smile className="w-5 h-5 text-orange-500 shrink-0" />
                  <h4 className="text-sm font-bold font-display text-gray-950">新手父母自制奶粉发酵酸奶经典答疑 (FAQ)</h4>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="bg-orange-50/10 border-l-4 border-orange-400 p-4 rounded-r-2xl space-y-1 bg-white">
                    <h5 className="font-bold text-gray-850">Q: 为什么按平时喝奶的比例发酸奶，容易彻底不酸或者稀成水？</h5>
                    <p className="leading-relaxed text-gray-500 text-[11px]">
                      答：最主要的原因在于原初蛋白质浓度。婴配粉为适应婴儿娇嫩消化，在包装说明冲调比例下，蛋白质率仅为 1.5% 左右。缺少胶乳固定，乳酸菌类拉不开充足网格结构。本仪器精准地将水量与对冲蛋白换算到 3.2% 或更高，创造出高能固相发酵原奶，一扫无法凝乳问题。
                    </p>
                  </div>

                  <div className="bg-orange-50/10 border-l-4 border-orange-400 p-4 rounded-r-2xl space-y-1 bg-white">
                    <h5 className="font-bold text-gray-850">Q: 宝宝怎么食用最安心？如何合理储藏？</h5>
                    <p className="leading-relaxed text-gray-500 text-[11px]">
                      答：1 岁以内宝宝不耐白糖。在冰箱中低温纯化完全后，取适量混入蒸熟磨细的苹果泥、蓝莓泥、牛油果或熟透香蕉，香甜细腻，补充更多维生素。建议用密封盖冷藏，于 3 - 5 天内食用完毕。
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-150 flex justify-end shrink-0">
              <button
                onClick={() => setIsHelpModalOpen(false)}
                className="px-6 py-2 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold rounded-xl text-xs shadow-xs hover:shadow-sm active:scale-95 transition-all duration-100 cursor-pointer"
              >
                我知道了，开始计算
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 6. Formula Schematic Interpretation Modal Dialog */}
      {isFormulaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="absolute inset-0 cursor-default" onClick={() => setIsFormulaModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-orange-100 flex flex-col max-h-[90vh] overflow-hidden">
            
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-orange-400 to-orange-500 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xl">📊</span>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold font-display tracking-tight">奶粉还原发酵：科学公式与原理</h3>
                  <p className="text-orange-50 text-[10.5px]">科学解答水量配比与蛋白质黏连锁水机制</p>
                </div>
              </div>
              <button
                onClick={() => setIsFormulaModalOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 overflow-y-auto bg-orange-50/10">
              <AnnotatedFormula 
                waterVol={waterVol}
                powderWeight={calculatedPowder}
                targetProtein={targetProtein}
                proteinPowder={proteinPowder}
              />
            </div>

            {/* Footer */}
            <div className="p-3 bg-gray-50 border-t border-gray-150 flex justify-end shrink-0">
              <button
                onClick={() => setIsFormulaModalOpen(false)}
                className="px-5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-xs cursor-pointer active:scale-95 transition-all"
              >
                关闭
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 7. Nutrition Label Protein Guide Modal Dialog */}
      {isProteinGuideModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="absolute inset-0 cursor-default" onClick={() => setIsProteinGuideModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-orange-100 flex flex-col max-h-[90vh] overflow-hidden">
            
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-orange-400 to-orange-500 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔍</span>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold font-display tracking-tight">如何查找包装上的蛋白质含量</h3>
                  <p className="text-orange-50 text-[10.5px]">参考背面成分表进行自选或快捷配置参数</p>
                </div>
              </div>
              <button
                onClick={() => setIsProteinGuideModalOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 overflow-y-auto bg-orange-50/10">
              <ProteinGuide 
                proteinValue={proteinPowder} 
                onSelectPreset={(val) => {
                  setProteinPowder(val);
                  setIsProteinGuideModalOpen(false); // Close modal automatically for convenience
                }} 
              />
            </div>

            {/* Footer */}
            <div className="p-3 bg-gray-50 border-t border-gray-150 flex justify-end shrink-0">
              <button
                onClick={() => setIsProteinGuideModalOpen(false)}
                className="px-5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-xs cursor-pointer active:scale-95 transition-all"
              >
                关闭
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Footer conforming strictly to visual boundaries, styled precisely as requested but more compact to blend in */}
      <footer 
        id="app-footer" 
        className="max-w-7xl mx-auto mt-3 py-2.5 border-t font-sans select-none text-center flex flex-col sm:flex-row items-center justify-between gap-2 px-4 md:px-8 text-[10.5px] font-bold opacity-50 hover:opacity-100 transition-opacity duration-300"
        style={{ borderTopColor: 'rgb(169, 98, 22)', color: 'rgb(169, 98, 22)' }}
      >
        <div className="flex items-center gap-1.5 font-medium">
          <span>🥛 复原乳发酵酸奶比例计算工具</span>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap justify-center">
          {/* Hover tooltip logic for 创意大脑: 絕 */}
          <div className="relative group inline-block">
            <span className="px-1.5 py-0.5 bg-orange-100/5 border border-amber-600/25 rounded text-[10px] cursor-help font-mono font-medium transition-all hover:bg-orange-100/15">
              创意大脑：絕 ▾
            </span>
            {/* Tooltip bubble */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-stone-900 text-stone-100 text-[11px] rounded-xl py-2 px-3.5 w-64 text-center shadow-xl z-50 leading-relaxed font-sans font-normal border border-amber-700/80 animate-fadeIn">
              不管身在何处 我都会提醒自己 不要忘记自己活在现实中 QQ:250740270
              {/* Micro-arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-stone-900"></div>
            </div>
          </div>

          <span className="px-1.5 py-0.5 bg-orange-100/5 border border-amber-600/15 rounded text-[10px] font-mono font-medium">
            执行四肢：Gemini 智能编程助手
          </span>
        </div>
      </footer>
    </div>
  );
}
