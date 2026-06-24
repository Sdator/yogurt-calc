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

export const THEMES: Record<string, {
  name: string;
  bgClass: string;
  headerBg: string;
  cardBorderClass: string;
  cardBgClass: string;
  cardHeaderBgClass: string;
  primaryAccent: string;
  accentBg: string;
  accentButtonActive: string;
  accentButtonInactive: string;
  accentText: string;
  focusBorder: string;
  focusBorderClass: string;
  accentThumb: string;
  resultsBorder: string;
  resultsBg: string;
  saveBtnBg: string;
  saveBtnShadow: string;
  badgeBg: string;
  iconColor: string;
  ringColor: string;
  accentHr: string;
  co2Bg: string;
  quickBtnActive: string;
}> = {
  cozy: {
    name: '温暖奶香橙',
    bgClass: 'bg-gradient-to-b from-orange-50/55 via-amber-50/20 to-orange-50/45',
    headerBg: 'bg-gradient-to-r from-orange-400 to-amber-500',
    cardBorderClass: 'border-orange-200/90 shadow-sm shadow-orange-100/50',
    cardBgClass: 'bg-white',
    cardHeaderBgClass: 'bg-orange-50/70 border-b border-orange-100/80',
    primaryAccent: 'text-orange-600',
    accentBg: 'bg-orange-50/60 border border-orange-100/70',
    accentButtonActive: 'bg-orange-500 text-white font-semibold',
    accentButtonInactive: 'bg-white hover:bg-orange-50 border-orange-100 text-gray-600 hover:text-orange-850',
    accentText: 'text-orange-600',
    focusBorder: 'focus:border-orange-400 focus:ring-orange-100',
    focusBorderClass: 'border-orange-200 focus:border-orange-500',
    accentThumb: 'accent-orange-500',
    resultsBorder: 'border-orange-400 shadow-xl shadow-orange-150/70',
    resultsBg: 'bg-white',
    saveBtnBg: 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600',
    saveBtnShadow: 'shadow-orange-200 hover:shadow-orange-300',
    badgeBg: 'bg-orange-100 text-orange-700 border-orange-150',
    iconColor: 'text-orange-500',
    ringColor: 'ring-orange-100/80',
    accentHr: 'border-orange-50',
    co2Bg: 'bg-amber-50/80 border-amber-200 text-amber-900',
    quickBtnActive: 'bg-orange-100 border-orange-300 text-orange-900 font-semibold',
  },
  slate: {
    name: '极简科技蓝',
    bgClass: 'bg-gradient-to-b from-slate-50 via-indigo-50/10 to-slate-50',
    headerBg: 'bg-gradient-to-r from-indigo-500 to-indigo-650',
    cardBorderClass: 'border-indigo-200 shadow-sm shadow-indigo-100/35',
    cardBgClass: 'bg-white',
    cardHeaderBgClass: 'bg-indigo-50/60 border-b border-indigo-100/80',
    primaryAccent: 'text-indigo-600',
    accentBg: 'bg-indigo-50/50 border border-indigo-100/70',
    accentButtonActive: 'bg-indigo-650 text-white font-semibold',
    accentButtonInactive: 'bg-white hover:bg-indigo-50 border-indigo-100 text-gray-600 hover:text-indigo-850',
    accentText: 'text-indigo-600',
    focusBorder: 'focus:border-indigo-550 focus:ring-indigo-100',
    focusBorderClass: 'border-indigo-200 focus:border-indigo-500',
    accentThumb: 'accent-indigo-600',
    resultsBorder: 'border-indigo-500 shadow-xl shadow-indigo-100/60',
    resultsBg: 'bg-white',
    saveBtnBg: 'bg-gradient-to-r from-indigo-600 to-indigo-750 hover:from-indigo-700 hover:to-indigo-805',
    saveBtnShadow: 'shadow-indigo-100 hover:shadow-indigo-200',
    badgeBg: 'bg-indigo-100 text-indigo-750 border-indigo-150',
    iconColor: 'text-indigo-500',
    ringColor: 'ring-indigo-150/80',
    accentHr: 'border-indigo-50',
    co2Bg: 'bg-indigo-50/80 border-indigo-150 text-indigo-900',
    quickBtnActive: 'bg-indigo-100 border-indigo-300 text-indigo-900 font-semibold',
  },
  mint: {
    name: '森林薄荷绿',
    bgClass: 'bg-gradient-to-b from-emerald-50/40 via-teal-50/10 to-emerald-50/40',
    headerBg: 'bg-emerald-600',
    cardBorderClass: 'border-emerald-200 shadow-sm shadow-emerald-100/40',
    cardBgClass: 'bg-white',
    cardHeaderBgClass: 'bg-emerald-50/60 border-b border-emerald-100/80',
    primaryAccent: 'text-emerald-700',
    accentBg: 'bg-emerald-50 border border-emerald-100/60',
    accentButtonActive: 'bg-emerald-600 text-white font-semibold',
    accentButtonInactive: 'bg-white hover:bg-emerald-50 border-emerald-100 text-gray-600 hover:text-emerald-855',
    accentText: 'text-emerald-700',
    focusBorder: 'focus:border-emerald-500 focus:ring-emerald-100',
    focusBorderClass: 'border-emerald-200 focus:border-emerald-500',
    accentThumb: 'accent-emerald-600',
    resultsBorder: 'border-emerald-500 shadow-xl shadow-emerald-100/60',
    resultsBg: 'bg-white',
    saveBtnBg: 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600',
    saveBtnShadow: 'shadow-emerald-150 hover:shadow-emerald-250',
    badgeBg: 'bg-emerald-100 text-emerald-750 border-emerald-150',
    iconColor: 'text-emerald-500',
    ringColor: 'ring-emerald-100/80',
    accentHr: 'border-emerald-50',
    co2Bg: 'bg-emerald-50/80 border-emerald-150 text-emerald-950',
    quickBtnActive: 'bg-emerald-100 border-emerald-300 text-emerald-950 font-semibold',
  },
  oats: {
    name: '天然麦芽金',
    bgClass: 'bg-gradient-to-b from-amber-50/45 via-yellow-50/10 to-amber-50/30',
    headerBg: 'bg-gradient-to-r from-amber-500 to-amber-600',
    cardBorderClass: 'border-amber-250 shadow-sm shadow-amber-100/40',
    cardBgClass: 'bg-white',
    cardHeaderBgClass: 'bg-amber-50/60 border-b border-amber-100/80',
    primaryAccent: 'text-amber-800',
    accentBg: 'bg-amber-50/60 border border-amber-105/65',
    accentButtonActive: 'bg-amber-600 text-white font-semibold',
    accentButtonInactive: 'bg-white hover:bg-amber-50 border-amber-100 text-gray-600 hover:text-amber-850',
    accentText: 'text-amber-700',
    focusBorder: 'focus:border-amber-500 focus:ring-amber-100',
    focusBorderClass: 'border-amber-200 focus:border-amber-500',
    accentThumb: 'accent-amber-600',
    resultsBorder: 'border-amber-500 shadow-xl shadow-amber-100/60',
    resultsBg: 'bg-white',
    saveBtnBg: 'bg-gradient-to-r from-amber-500 to-amber-650 hover:from-amber-600 hover:to-amber-700',
    saveBtnShadow: 'shadow-amber-100 hover:shadow-amber-205',
    badgeBg: 'bg-amber-100 text-amber-750 border-amber-150',
    iconColor: 'text-amber-600',
    ringColor: 'ring-amber-100/80',
    accentHr: 'border-amber-50',
    co2Bg: 'bg-amber-50/80 border-amber-200 text-amber-950',
    quickBtnActive: 'bg-amber-100 border-amber-300 text-amber-950 font-semibold',
  }
};

export default function App() {
  // Lock theme to 'mint' (森林薄荷绿) and layout to 'bento' (现代立体看板) as requested
  const activeTheme: string = 'mint';
  const activeLayout: string = 'bento';

  const theme = THEMES[activeTheme];

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
  } else if (targetProtein < 3.2 || targetProtein > 10.0) {
    errorMsg = '⚠️ 为了保证酸奶发酵凝固效果，目标蛋白浓度设定必须在 3.2% 与 10.0% 之间。';
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

  // Preset definitions sorted from low to high by protein weight (克数从低到高排列)
  const targetPresets = [
    { name: '🥇 黄金比例 (3.2g)', targetProtein: 3.2, desc: '最类似鲜牛奶发酵的滑嫩状态' },
    { name: '🥛 高效固化 (3.5g)', targetProtein: 3.5, desc: '极佳凝固力，蛋白质网络支撑力强' },
    { name: '🍨 浓厚饱满 (3.8g)', targetProtein: 3.8, desc: '老酸奶级质地，不插勺不翻车' }
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
    <div id="yogurt-app-body" className={`min-h-screen ${theme.bgClass} font-sans text-gray-800 pb-12 transition-colors duration-300`}>
      
      {/* 1. Top Minimalist Header Banner - Functional tool design focusing purely on calculation options */}
      <header className={`transition-all duration-300 ${theme.headerBg} p-4 shadow-xs rounded-b-2xl`}>
        <div className="max-w-[1500px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-lg select-none shadow-xs">🥛</div>
            <div>
              <h1 className="text-white text-2xl sm:text-3xl font-bold font-display tracking-tight">
                复原乳发酵酸奶比例计算器
              </h1>
              <p className="text-orange-50 text-xs sm:text-sm font-sans opacity-95">
                精准调配水和奶粉配比，使还原乳快速达到蛋白质胶层发酵浓度。
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsGalleryOpen(true)}
              className="px-4 py-2 bg-white/15 hover:bg-white/25 border border-white/20 text-white rounded-xl text-lg sm:text-[18px] font-extrabold shadow-3xs flex items-center gap-1.5 transition-all duration-100 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
            >
              <span>🖼️</span> 日常发酵分享
            </button>
            <button
              onClick={() => setIsHistorySidebarOpen(true)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 rounded-xl text-lg sm:text-[18px] font-extrabold shadow-3xs flex items-center gap-1.5 transition-all duration-100 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
            >
              <span>📋</span> 历史配方记录 ({records.length})
            </button>
            <button
              onClick={() => setIsFormulaModalOpen(true)}
              className="px-4 py-2 bg-white/10 hover:bg-white/25 text-white border border-white/20 rounded-xl text-lg sm:text-[18px] font-bold shadow-3xs flex items-center gap-1.5 transition-all duration-100 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
            >
              <span>📊</span> 科学公式解读
            </button>
            <button
              onClick={() => setIsProteinGuideModalOpen(true)}
              className="px-4 py-2 bg-white/10 hover:bg-white/25 text-white border border-white/20 rounded-xl text-lg sm:text-[18px] font-bold shadow-3xs flex items-center gap-1.5 transition-all duration-100 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
            >
              <span>🔍</span> 查找蛋白质含量
            </button>
            <button
              onClick={() => setIsHelpModalOpen(true)}
              className="px-4 py-2 bg-white/15 hover:bg-white/25 text-white border border-white/25 rounded-xl text-lg sm:text-[18px] font-extrabold shadow-3xs flex items-center gap-1.5 transition-all duration-100 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
            >
              <HelpCircle className="w-5 h-5" />
              <span>自制教程 & FAQ</span>
            </button>
          </div>
        </div>
      </header>

      {/* Modern Collapsible Yogurt Photo Gallery Showcase (Now a Phone-Album Popup Modal) */}
      <YogurtGallery isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />

      {/* 2. Step Guide Block - Highly Striking and Eye-catching Yogurt Steps Tutorial Banner */}
      <div id="quick-step-guide-bar" className="max-w-[1500px] mx-auto px-4 md:px-8 mt-4 animate-fadeIn">
        <div className="bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-700 text-white rounded-3xl p-5 md:p-6 shadow-xl border-2 border-emerald-400/70 relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.005] ring-4 ring-emerald-500/20">
          
          {/* Decorative Background Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400/10 rounded-full blur-2xl pointer-events-none -ml-16 -mb-16"></div>

          <div className="flex items-start gap-4 relative z-10 max-w-md">
            <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-2xl select-none shadow-inner shrink-0 animate-bounce">
              🧭
            </div>
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-400 text-emerald-950 font-black text-[10px] sm:text-xs uppercase tracking-wider rounded-full mb-1.5 animate-pulse shadow-xs">
                ⭐ 新手必读指南
              </div>
              <h3 className="font-display font-black text-white text-xl sm:text-2xl tracking-tight leading-tight">
                酸奶制作教程步骤
              </h3>
              <p className="text-emerald-100/80 text-xs sm:text-sm mt-1 font-medium">
                科学克重精算三步走 · 彻底告别发酵失败
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-3 items-stretch relative z-10 shrink-0 lg:max-w-4xl w-full lg:w-auto">
            {/* Step 1 */}
            <div 
              onMouseEnter={() => setHoveredStep(1)}
              onMouseLeave={() => setHoveredStep(null)}
              className={`p-3.5 rounded-2xl border transition-all duration-250 cursor-help flex flex-col justify-between ${
                hoveredStep === 1 
                  ? 'bg-white text-emerald-950 border-emerald-300 shadow-lg scale-[1.02]' 
                  : 'bg-white/10 backdrop-blur-xs border-white/20 text-white hover:bg-white/15 hover:border-white/30'
              }`}
            >
              <div>
                <div className="flex items-center gap-1.5 leading-none">
                  <span className={`w-5.5 h-5.5 rounded-full flex items-center justify-center text-xs font-black ${
                    hoveredStep === 1 ? 'bg-emerald-600 text-white' : 'bg-white/20 text-white border border-white/35'
                  }`}>1</span>
                  <span className="text-sm select-none">🔍</span>
                  <span className="text-sm font-black">查标示蛋白质</span>
                </div>
                <p className={`text-xs mt-2.5 leading-normal font-medium ${hoveredStep === 1 ? 'text-gray-600' : 'text-emerald-100/90'}`}>
                  查询干奶粉外包装背面蛋白质克重比 (克/100克)
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div 
              onMouseEnter={() => setHoveredStep(2)}
              onMouseLeave={() => setHoveredStep(null)}
              className={`p-3.5 rounded-2xl border transition-all duration-250 cursor-help flex flex-col justify-between ${
                hoveredStep === 2 
                  ? 'bg-white text-emerald-950 border-emerald-300 shadow-lg scale-[1.02]' 
                  : 'bg-white/10 backdrop-blur-xs border-white/20 text-white hover:bg-white/15 hover:border-white/30'
              }`}
            >
              <div>
                <div className="flex items-center gap-1.5 leading-none">
                  <span className={`w-5.5 h-5.5 rounded-full flex items-center justify-center text-xs font-black ${
                    hoveredStep === 2 ? 'bg-emerald-600 text-white' : 'bg-white/20 text-white border border-white/35'
                  }`}>2</span>
                  <span className="text-sm select-none">💦</span>
                  <span className="text-sm font-black">填计划用水量</span>
                </div>
                <p className={`text-xs mt-2.5 leading-normal font-medium ${hoveredStep === 2 ? 'text-gray-600' : 'text-emerald-100/90'}`}>
                  设定容器内胆中所需加入的温开水/纯净水毫升数
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div 
              onMouseEnter={() => setHoveredStep(3)}
              onMouseLeave={() => setHoveredStep(null)}
              className={`p-3.5 rounded-2xl border transition-all duration-250 cursor-help flex flex-col justify-between ${
                hoveredStep === 3 
                  ? 'bg-white text-emerald-950 border-emerald-300 shadow-lg scale-[1.02]' 
                  : 'bg-white/10 backdrop-blur-xs border-white/20 text-white hover:bg-white/15 hover:border-white/30'
              }`}
            >
              <div>
                <div className="flex items-center gap-1.5 leading-none">
                  <span className={`w-5.5 h-5.5 rounded-full flex items-center justify-center text-xs font-black ${
                    hoveredStep === 3 ? 'bg-emerald-600 text-white' : 'bg-white/20 text-white border border-white/35'
                  }`}>3</span>
                  <span className="text-sm select-none">📐</span>
                  <span className="text-sm font-black">设拟调目标浓度</span>
                </div>
                <p className={`text-xs mt-2.5 leading-normal font-medium ${hoveredStep === 3 ? 'text-gray-600' : 'text-emerald-100/90'}`}>
                  设定目标还原乳的最终蛋白质浓度比 (满足 ≥3.2%)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body Container: Responsive multi-layout support */}
      <div className="max-w-[1500px] mx-auto px-4 md:px-8 mt-6">
        
        {/* LAYOUT 1: Classic Split Screen (左右等宽精算版) */}
        {activeLayout === 'split' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch animate-fadeIn">
            
            {/* LEFT COLUMN: Input controls and adjustments */}
            <div className="flex flex-col h-full space-y-6">
              
              {/* The Input Card */}
              <div id="calculator-inputs-card" className={`p-6 md:p-8 rounded-3xl transition-all duration-300 border-2 ${theme.cardBorderClass} ${theme.cardBgClass} flex flex-col justify-between flex-grow h-full space-y-6`}>
                
                <div className="flex items-center justify-between border-b border-gray-100 pb-3.5">
                  <h3 className={`font-extrabold flex items-center gap-2 text-sm ${theme.primaryAccent}`}>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${theme.badgeBg}`}>1</span>
                    手作核心参数与比例微调
                  </h3>
                  <span className="text-xs sm:text-sm text-gray-500 font-semibold">滑动或输入即可实时精算</span>
                </div>

                {/* Input Row 1: Water Volume */}
                <div className={`space-y-4 p-4 md:p-5 rounded-2xl border transition-all duration-300 ${
                  hoveredStep === 2 
                    ? 'animate-border-flash border-amber-400 bg-amber-50/15 shadow-xs' 
                    : 'border-gray-200/70 bg-gray-50/60 hover:bg-gray-50/80 hover:border-gray-300'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100/60 pb-2">
                    <label htmlFor="water-vol-input" className="font-extrabold text-gray-700 flex items-center gap-1 text-lg sm:text-[18px]">
                      💦 计划用水量 (温水数量)
                    </label>
                    <span className="font-semibold text-gray-500 text-sm">
                      目前设定: <span className={`font-mono text-base font-black ${theme.accentText}`}>{waterVol}</span> ml
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
                    className={`w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200/80 transition-all ${theme.accentThumb}`}
                  />

                  <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        id="water-vol-input"
                        type="number"
                        min="1"
                        max="5000"
                        value={waterVol || ''}
                        onChange={(e) => setWaterVol(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-24 border-b-2 border-gray-300 focus:border-slate-800 px-1 py-0.5 text-xs text-center focus:outline-hidden font-mono font-bold text-gray-800"
                      />
                      <span className="text-xs text-gray-400 font-bold">ml (毫升)</span>
                    </div>
                    
                    {/* Water Quick options */}
                    <div className="flex gap-1.5 items-center flex-wrap">
                      {[250, 400, 500, 1000].map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setWaterVol(v)}
                          className={`text-xs sm:text-sm px-3 py-1.5 rounded-lg border transition-all duration-100 font-bold ${
                            waterVol === v 
                              ? theme.quickBtnActive
                              : theme.accentButtonInactive
                          }`}
                        >
                          {v}ml
                        </button>
                      ))}
                      <span className="text-xs text-gray-500 hidden lg:inline font-bold">（内胆容积）</span>
                    </div>
                  </div>
                </div>

                {/* Input Row 2: Protein on Tin */}
                <div className={`space-y-4 p-4 md:p-5 rounded-2xl border transition-all duration-300 ${
                  hoveredStep === 1 
                    ? 'animate-border-flash border-amber-400 bg-amber-50/15 shadow-xs' 
                    : 'border-gray-200/70 bg-gray-50/60 hover:bg-gray-50/80 hover:border-gray-300'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100/60 pb-2">
                    <label htmlFor="protein-powder-input" className="font-extrabold text-gray-700 flex items-center gap-1 text-lg sm:text-[18px]">
                      🔍 包装标示的蛋白质含量
                    </label>
                    <span className="font-semibold text-gray-500 text-sm">
                      当前值: <span className={`font-mono text-base font-black ${theme.accentText}`}>{proteinPowder}</span> g/100g
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="flex items-center gap-1.5 self-center sm:self-auto">
                      <input
                        id="protein-powder-input"
                        type="number"
                        step="0.1"
                        min="1"
                        max="60"
                        placeholder="例如: 24.0"
                        value={proteinPowder || ''}
                        onChange={(e) => setProteinPowder(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="w-24 border-b-2 border-gray-300 focus:border-slate-800 px-1 py-0.5 text-sm text-center focus:outline-hidden font-mono font-bold text-gray-800"
                      />
                      <span className="text-xs sm:text-sm text-gray-500 font-bold whitespace-nowrap">g / 100g</span>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-650 leading-relaxed bg-white/70 p-3 rounded-xl flex-1 border border-gray-200/70">
                      💡 <strong>查找提示</strong>：参考奶粉包装背部营养成分表。全脂奶粉通常约 24g，高钙/脱脂粉较高 (可达 30g+)。
                    </div>
                  </div>
                </div>

                {/* Input Row 3: Target Yogurt Protein Strength */}
                <div className={`space-y-4 p-4 md:p-5 rounded-2xl border transition-all duration-300 ${
                  hoveredStep === 3 
                    ? 'animate-border-flash border-amber-400 bg-amber-50/15 shadow-xs' 
                    : 'border-gray-200/70 bg-gray-50/60 hover:bg-gray-50/80 hover:border-gray-300'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100/60 pb-2">
                    <label htmlFor="target-protein-range" className="font-extrabold text-gray-700 flex items-center gap-1 text-lg sm:text-[18px]">
                      📐 拟调还原乳目标蛋白浓度比例
                    </label>
                    <span className={`font-black font-mono text-sm ${theme.accentText}`}>
                      设定目标: {targetProtein}% (g/100ml)
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
                    className={`w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200/80 transition-all ${theme.accentThumb}`}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <input
                        id="target-protein-input"
                        type="number"
                        step="0.1"
                        min="3.2"
                        max="6.0"
                        value={targetProtein || ''}
                        onChange={(e) => setTargetProtein(Math.max(3.2, parseFloat(e.target.value) || 3.2))}
                        className="w-20 border border-gray-200 rounded-lg px-2 py-1 text-xs text-center focus:outline-hidden font-mono font-bold text-gray-800"
                      />
                      <span className="text-xs sm:text-sm text-gray-500 font-bold">g/100ml</span>
                    </div>

                    {/* Yogurt presets button group */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {targetPresets.map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => applyPresetFormula(preset)}
                          className={`text-xs sm:text-sm px-3 py-1.5 rounded-lg border text-left transition-all cursor-pointer font-bold ${
                            Math.abs(targetProtein - preset.targetProtein) < 0.05
                              ? theme.quickBtnActive
                              : theme.accentButtonInactive
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
              <div id="calculator-results-card" className={`transition-all duration-300 p-6 md:p-8 rounded-3xl flex flex-col justify-center items-center text-center relative overflow-hidden flex-grow h-full space-y-4 border-2 ${theme.resultsBorder} ${theme.resultsBg}`}>
                <span className="text-gray-500 text-xs sm:text-sm uppercase tracking-widest mb-1 font-extrabold block">换算求和 · 调配目标设定</span>
                <p className="text-gray-600 font-bold text-xs sm:text-sm leading-none">本次制作配方建议加入奶粉</p>
                
                {isCalculationValid ? (
                  <>
                    <div className={`text-5xl sm:text-6xl font-black mb-1 font-mono drop-shadow-3xs select-all transition-colors duration-300 ${theme.accentText}`}>
                      {calculatedPowder.toFixed(1)} <span className="text-xl font-bold text-gray-400 font-sans">克 (g)</span>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-center gap-2 max-w-lg">
                      <span className="px-3.5 py-1 bg-amber-500 text-white rounded-full text-xs sm:text-sm font-black shadow-3xs animate-fadeIn">
                        {currentTexture.rating}
                      </span>
                      <span className={`px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold shadow-3xs ${theme.badgeBg}`}>
                        目标浓度: {targetProtein}g/100ml
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-sm">
                      💡 <strong>新手操作流程</strong>：量取 <strong className={theme.accentText}>{waterVol}ml 温水</strong> 注入容器，融解这个重量的奶粉并搅拌，降到常温后撒入发酵剂即可。
                    </p>

                    <div id="co2-warning-notice" className={`text-xs sm:text-sm rounded-xl py-2.5 px-3.5 mb-1 max-w-sm leading-relaxed font-semibold flex flex-col items-center gap-1.5 justify-center transition-all duration-300 ${theme.co2Bg}`}>
                      <span className="flex items-center gap-1 text-xs sm:text-sm font-black">⚠️ 注意事项：发酵中会产生二氧化碳</span>
                      <span className="text-xs sm:text-sm leading-normal opacity-90 text-center">
                        密闭发酵会导致容器内累积气压。请避免将盖子拧得过死，并在开盖时保持小心，谨防气体猛烈喷溅或顶飞瓶盖。
                      </span>
                    </div>

                    {/* Reconstitution Ratio Indicators - Elegantly placed in results */}
                    <div className={`p-3.5 rounded-2xl border border-dashed text-center w-full max-w-sm transition-all duration-300 ${theme.accentBg}`}>
                      <p className={`text-xs sm:text-sm font-bold ${theme.accentText}`}>
                        ⚖️ <strong>复原比例指示 (奶粉：温水)</strong>
                      </p>
                      <div className="flex justify-around items-center mt-2.5 text-xs sm:text-sm font-mono font-bold">
                        <div>
                          <span className="text-xs text-gray-500 block font-normal leading-none mb-1">克比 (奶粉:水)</span>
                          约 1 : {dilutionRatio}
                        </div>
                        <div className="w-[1px] h-6 bg-gray-200"></div>
                        <div>
                          <span className="text-xs text-gray-500 block font-normal leading-none mb-1">重比 (奶粉总重量)</span>
                          {calculatedPowder.toFixed(1)}g
                        </div>
                      </div>
                    </div>
                    
                    <button
                      id="save-recipe-trigger-btn"
                      type="button"
                      onClick={() => {
                        setIsSavingPanelOpen(true);
                        setNewRecordNotes(`使用温水 ${waterVol}ml + 奶粉 ${calculatedPowder.toFixed(1)}g (蛋白质 ${proteinPowder}g/100g) 开水调试，预测口感是 ${currentTexture.rating}。`);
                      }}
                      className={`w-full max-w-xs py-3.5 text-white font-extrabold rounded-2xl transition-all duration-150 flex items-center justify-center gap-2 active:scale-95 hover:scale-[1.01] cursor-pointer shadow-md ${theme.saveBtnBg} ${theme.saveBtnShadow}`}
                    >
                      <Plus className="w-4 h-4" />
                      <span>💾 保存本次制作配方</span>
                    </button>
                  </>
                ) : (
                  <div className="py-4 text-center">
                    <p className="text-sm font-semibold text-red-500">{errorMsg || '等待参数输入中...'}</p>
                    <p className="text-xs text-orange-850 mt-1">请在上方设定区间内纠正参数。</p>
                  </div>
                )}
              </div>

            </div> {/* End Right Column */}

          </div>
        )}

        {/* LAYOUT 2: Bento Dashboard (现代立体多区块面板) */}
        {activeLayout === 'bento' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch animate-fadeIn">
            {/* Left/Middle Bento Columns */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              
              {/* Row 1 Grid: Water Block + Powder Protein Block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Bento Card 1: Water Volume Slider & presets */}
                <div className={`relative p-6 rounded-3xl border-2 transition-all duration-300 ${
                  hoveredStep === 2 
                    ? 'border-emerald-500 shadow-md ring-2 ring-emerald-400/30' 
                    : theme.cardBorderClass
                } ${theme.cardBgClass} flex flex-col justify-between h-full`}>
                  {hoveredStep === 2 && (
                    <div className="absolute inset-0 rounded-3xl pointer-events-none z-0 overflow-visible">
                      <div className="absolute inset-0 rounded-3xl pointer-events-none animate-card-ripple-1" />
                      <div className="absolute inset-0 rounded-3xl pointer-events-none animate-card-ripple-2" />
                    </div>
                  )}
                  <div className="space-y-4 relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-2.5 gap-2">
                      <h4 className={`font-extrabold flex items-center gap-1.5 text-lg sm:text-[18px] ${theme.primaryAccent}`}>
                        <span>💦</span> 计划水量 (温开水)
                      </h4>
                      <span className="text-sm sm:text-base text-gray-650 font-black font-mono self-start sm:self-auto shrink-0">{waterVol} ml</span>
                    </div>

                    <div className={`space-y-3.5 p-3.5 rounded-2xl border ${
                      hoveredStep === 2 ? 'border-amber-400 bg-amber-50/15' : 'border-gray-150/60 bg-gray-50/40'
                    }`}>
                      <input
                        id="bento-water-vol-range"
                        type="range"
                        min="100"
                        max="5000"
                        step="50"
                        value={waterVol}
                        onChange={(e) => setWaterVol(parseInt(e.target.value) || 100)}
                        className={`w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200/80 transition-all ${theme.accentThumb}`}
                      />
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                        <div className="flex items-center gap-1.5">
                          <input
                            id="bento-water-vol-input"
                            type="number"
                            min="1"
                            max="5000"
                            value={waterVol || ''}
                            onChange={(e) => setWaterVol(Math.max(0, parseInt(e.target.value) || 0))}
                            className="w-16 border-b border-gray-300 text-xs text-center font-mono font-bold text-gray-800 focus:outline-hidden focus:border-slate-800"
                          />
                          <span className="text-xs sm:text-sm text-gray-500 font-bold">ml</span>
                        </div>
                        
                        <div className="flex flex-col items-center justify-center gap-1.5">
                          {/* ml Row */}
                          <div className="flex gap-1.5 items-center justify-center">
                            {[250, 500].map((v) => (
                              <button
                                key={v}
                                type="button"
                                onClick={() => setWaterVol(v)}
                                className={`text-xs sm:text-sm px-2.5 py-1 rounded border transition-all font-bold ${
                                  waterVol === v ? theme.quickBtnActive : theme.accentButtonInactive
                                }`}
                              >
                                {v}ml
                              </button>
                            ))}
                          </div>
                          {/* L Row */}
                          <div className="flex gap-1.5 items-center justify-center">
                            {[1000, 2000, 3000, 5000].map((v) => (
                              <button
                                key={v}
                                type="button"
                                onClick={() => setWaterVol(v)}
                                className={`text-xs sm:text-sm px-2.5 py-1 rounded border transition-all font-bold ${
                                  waterVol === v ? theme.quickBtnActive : theme.accentButtonInactive
                                }`}
                              >
                                {v / 1000}L
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bento Card 2: Milk Powder Protein content */}
                <div className={`relative p-6 rounded-3xl border-2 transition-all duration-300 ${
                  hoveredStep === 1 
                    ? 'border-emerald-500 shadow-md ring-2 ring-emerald-400/30' 
                    : theme.cardBorderClass
                } ${theme.cardBgClass} flex flex-col justify-between h-full`}>
                  {hoveredStep === 1 && (
                    <div className="absolute inset-0 rounded-3xl pointer-events-none z-0 overflow-visible">
                      <div className="absolute inset-0 rounded-3xl pointer-events-none animate-card-ripple-1" />
                      <div className="absolute inset-0 rounded-3xl pointer-events-none animate-card-ripple-2" />
                    </div>
                  )}
                  <div className="space-y-4 relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-2.5 gap-2">
                      <h4 className={`font-extrabold flex items-center gap-1.5 text-lg sm:text-[18px] ${theme.primaryAccent}`}>
                        <span>🔍</span> 奶粉固有蛋白质含量
                      </h4>
                      <span className="text-sm sm:text-base text-gray-650 font-black font-mono self-start sm:self-auto shrink-0">{proteinPowder} g/100g</span>
                    </div>

                    <div className={`space-y-2.5 p-3.5 rounded-2xl border ${
                      hoveredStep === 1 ? 'border-amber-400 bg-amber-50/15' : 'border-gray-150/60 bg-gray-50/40'
                    }`}>
                      <div className="flex items-center justify-between">
                        <input
                          id="bento-protein-powder-input"
                          type="number"
                          step="0.1"
                          min="1"
                          max="60"
                          value={proteinPowder || ''}
                          onChange={(e) => setProteinPowder(Math.max(0, parseFloat(e.target.value) || 0))}
                          className="w-20 border-b border-gray-300 text-xs text-center font-mono font-bold text-gray-800 focus:outline-hidden focus:border-slate-800"
                        />
                        <span className="text-xs sm:text-sm text-gray-500 font-extrabold">g / 100g</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500 leading-normal font-medium">
                        请查询奶粉背部包装。全脂类大都配置在约24.0，部分脱脂在32.0。
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bento Card 3: Target Protein & Presets Block */}
              <div className={`relative p-6 rounded-3xl border-2 transition-all duration-300 ${
                hoveredStep === 3 
                  ? 'border-emerald-500 shadow-md ring-2 ring-emerald-400/30' 
                  : theme.cardBorderClass
              } ${theme.cardBgClass}`}>
                {hoveredStep === 3 && (
                  <div className="absolute inset-0 rounded-3xl pointer-events-none z-0 overflow-visible">
                    <div className="absolute inset-0 rounded-3xl pointer-events-none animate-card-ripple-1" />
                    <div className="absolute inset-0 rounded-3xl pointer-events-none animate-card-ripple-2" />
                  </div>
                )}
                <div className="space-y-4 relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-2.5 gap-2">
                    <h4 className={`font-extrabold flex items-center gap-1.5 text-lg sm:text-[18px] ${theme.primaryAccent}`}>
                      <span>📐</span> 拟调还原乳目标蛋白浓度比例
                    </h4>
                    <span className="text-xs sm:text-sm text-gray-500 font-bold self-start sm:self-auto shrink-0">设定后将通过质量守恒精算</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div className="md:col-span-3 space-y-2.5">
                      <input
                        id="bento-target-protein-range"
                        type="range"
                        min="3.2"
                        max="10.0"
                        step="0.1"
                        value={targetProtein}
                        onChange={(e) => setTargetProtein(Math.max(3.2, parseFloat(e.target.value) || 3.2))}
                        className={`w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200/80 transition-all ${theme.accentThumb}`}
                      />
                      <div className="flex justify-between text-xs sm:text-sm font-bold text-gray-550 px-1">
                        <span>3.2% (经典标准型)</span>
                        <span>6.5% (特稠倍羹型)</span>
                        <span>10.0% (巅峰奶酪级)</span>
                      </div>
                    </div>

                    <div className="p-2 bg-gray-50 border border-gray-200 flex flex-col items-center justify-center rounded-2xl text-center">
                      <span className="text-xs sm:text-sm text-gray-500 font-extrabold block">浓度指标</span>
                      <span className={`text-sm sm:text-base font-black font-mono leading-none mt-1 ${theme.accentText}`}>{targetProtein} %</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-dashed border-gray-100 mt-1">
                    <span className="text-xs sm:text-sm text-gray-500 font-extrabold mr-1">快捷浓度预设:</span>
                    {targetPresets.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => applyPresetFormula(preset)}
                        className={`text-xs sm:text-sm px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-bold ${
                          Math.abs(targetProtein - preset.targetProtein) < 0.05
                            ? theme.quickBtnActive
                            : theme.accentButtonInactive
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

            {/* Right Column Bento: Output Recommendation Metrics */}
            <div className="flex flex-col h-full">
              
              <div className={`transition-all duration-300 p-6 md:p-8 rounded-3xl flex flex-col justify-center items-center text-center relative overflow-hidden flex-grow h-full space-y-4 border-2 ${theme.resultsBorder} ${theme.resultsBg}`}>
                
                {/* Background Dynamic Wave & Concentric Ripples */}
                {isCalculationValid && (
                  <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden z-0">
                    {/* Wavy liquid fluid shape */}
                    <svg className="absolute bottom-0 left-0 w-[200%] h-32 text-emerald-100 fill-current animate-wave-flow" viewBox="0 0 1200 120" preserveAspectRatio="none">
                      <path d="M0,60 C150,110 300,10 450,60 C600,110 750,10 900,60 C1050,110 1200,10 1350,60 C1500,110 1650,10 1800,60 L1800,120 L0,120 Z"></path>
                    </svg>
                    <svg className="absolute bottom-1 left-0 w-[200%] h-28 text-emerald-200 fill-current animate-wave-flow [animation-delay:2.5s]" viewBox="0 0 1200 120" preserveAspectRatio="none">
                      <path d="M0,50 C180,90 350,20 500,60 C650,100 800,20 950,50 C1100,80 1250,20 1400,50 C1550,80 1700,20 1850,50 L1850,120 L0,120 Z"></path>
                    </svg>
                    {/* Concentric ripples radiating from center */}
                    <div className="absolute top-1/2 left-1/2 w-56 h-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400/60 animate-yogurt-ripple-1"></div>
                    <div className="absolute top-1/2 left-1/2 w-56 h-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-400/50 animate-yogurt-ripple-2"></div>
                    <div className="absolute top-1/2 left-1/2 w-56 h-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-300/40 animate-yogurt-ripple-3"></div>
                  </div>
                )}

                <div className="relative z-10 w-full flex flex-col justify-center items-center space-y-4">
                  <span className="text-gray-500 text-xs sm:text-sm uppercase tracking-widest font-extrabold block leading-none">Bento 智能黄金调配建议</span>
                  <p className="text-gray-600 font-bold text-xs sm:text-sm opacity-90 leading-none">建议调配加入干奶粉</p>
                  
                  {isCalculationValid ? (
                    <>
                      <div className={`text-5xl sm:text-6xl font-black mb-1 font-mono transition-colors duration-300 ${theme.accentText}`}>
                        {calculatedPowder.toFixed(1)} <span className="text-xl font-bold text-gray-400 font-sans">克 (g)</span>
                      </div>

                      <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-lg">
                        <span className="px-3 bg-amber-500 text-white rounded-md text-xs sm:text-sm font-black py-0.5 shadow-3xs">
                          {currentTexture.rating}
                        </span>
                        <span className={`px-2 py-0.5 rounded-md text-xs sm:text-sm font-black border ${theme.badgeBg}`}>
                          蛋白比: {targetProtein}% (设定)
                        </span>
                      </div>

                      <div className="w-full border-t border-dashed border-gray-150/70 my-1"></div>

                      <p className="text-xs sm:text-sm text-gray-500 leading-normal max-w-xs font-semibold">
                        💦 用温水 <strong className={theme.accentText}>{waterVol}ml</strong> 充分溶解上述重量奶粉，温凉后即可加入发酵剂。
                      </p>

                      <div className={`text-xs sm:text-sm rounded-xl py-2 px-3 text-center transition-all duration-300 ${theme.co2Bg} font-bold`}>
                        ⚠️ 注意气压：密闭发酵易胀破，开盖避光请小心。
                      </div>

                      <div className={`p-3 rounded-2xl border border-dashed text-center w-full max-w-xs transition-all duration-300 ${theme.accentBg}`}>
                        <div className="flex justify-around items-center font-mono font-bold text-xs sm:text-sm">
                          <div>
                            <span className="text-xs text-gray-500 block font-normal mb-0.5">水粉克比</span>
                            1 : {dilutionRatio}
                          </div>
                          <div className="w-[1px] h-5 bg-gray-200"></div>
                          <div>
                            <span className="text-xs text-gray-500 block font-normal mb-0.5">总配重量</span>
                            {calculatedPowder.toFixed(1)}g
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setIsSavingPanelOpen(true);
                          setNewRecordNotes(`温水 ${waterVol}ml + 奶粉 ${calculatedPowder.toFixed(1)}g (蛋白质 ${proteinPowder}g/100g)，预估口感是 ${currentTexture.rating}。`);
                        }}
                        className={`w-full py-3 text-white text-xs font-black rounded-xl transition-all duration-150 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer shadow-sm ${theme.saveBtnBg}`}
                      >
                        <span>💾 保存本次手作方案</span>
                      </button>
                    </>
                  ) : (
                    <div className="py-2 text-center">
                      <p className="text-xs font-semibold text-red-500">{errorMsg || '等待参数输入...'}</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* LAYOUT 3: Compact View (一屏全流程紧凑精练聚合) */}
        {activeLayout === 'compact' && (
          <div className="max-w-2xl mx-auto animate-fadeIn">
            <div className={`p-6 md:p-8 rounded-3xl border-2 transition-all duration-300 ${theme.cardBorderClass} ${theme.cardBgClass} space-y-6 shadow-md`}>
              
              {/* Compact title headers */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className={`font-black flex items-center gap-1.5 text-xs sm:text-sm ${theme.primaryAccent}`}>
                  <span>⚙️</span> 大师手控 · 全参数聚合冲调底座
                </h3>
                <span className="text-xs sm:text-sm text-gray-500 font-bold tracking-widest block">大师模式</span>
              </div>

              {/* Tight inputs rows */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Compact Box 1 (Water Vol) */}
                <div className="bg-gray-50/50 p-3.5 rounded-2xl border border-gray-200/50 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center text-xs sm:text-sm font-extrabold text-gray-650 mb-2">
                      <span>💦 计划温水量</span>
                      <span className={theme.accentText}>{waterVol}ml</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="2000"
                      step="50"
                      value={waterVol}
                      onChange={(e) => setWaterVol(parseInt(e.target.value) || 100)}
                      className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-gray-200/80 transition-all ${theme.accentThumb}`}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-100/60">
                    <input
                      type="number"
                      value={waterVol || ''}
                      onChange={(e) => setWaterVol(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-12 border-b border-gray-300 text-xs text-center font-mono font-bold text-gray-800"
                    />
                    <div className="flex gap-1">
                      {[350, 500].map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setWaterVol(v)}
                          className="text-xs px-2 py-1 text-gray-650 border border-gray-200 hover:bg-gray-100 rounded font-bold"
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Compact Box 2 (Milk powder protein) */}
                <div className="bg-gray-50/50 p-3.5 rounded-2xl border border-gray-200/50 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center text-xs sm:text-sm font-extrabold text-gray-650 mb-1">
                      <span>🥛 奶粉蛋白质重</span>
                    </div>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="60"
                      value={proteinPowder || ''}
                      onChange={(e) => setProteinPowder(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full border-b border-gray-300 text-xs sm:text-sm text-center font-mono font-bold focus:outline-hidden focus:border-slate-800 py-1 text-gray-800"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsProteinGuideModalOpen(true)}
                    className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 text-left cursor-pointer truncate mt-2 leading-none block font-bold"
                  >
                    🔍 查找包装蛋白质比
                  </button>
                </div>

                {/* Compact Box 3 (Target percentage) */}
                <div className="bg-gray-50/50 p-3.5 rounded-2xl border border-gray-200/50 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center text-xs sm:text-sm font-extrabold text-gray-650 mb-2">
                      <span>📐 目标乳蛋白质</span>
                      <span className={theme.accentText}>{targetProtein}%</span>
                    </div>
                    <input
                      type="range"
                      min="3.2"
                      max="5.0"
                      step="0.1"
                      value={targetProtein}
                      onChange={(e) => setTargetProtein(Math.max(3.2, parseFloat(e.target.value) || 3.2))}
                      className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-gray-200/80 transition-all ${theme.accentThumb}`}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2.5 pt-1 border-t border-gray-100/60 font-mono text-xs sm:text-sm">
                    <span className="text-xs text-emerald-700 bg-emerald-100/80 px-1 py-0.5 rounded font-black font-sans leading-none">{currentTexture.rating}</span>
                    <input
                      type="number"
                      step="0.1"
                      min="3.2"
                      max="6.0"
                      value={targetProtein || ''}
                      onChange={(e) => setTargetProtein(Math.max(3.2, parseFloat(e.target.value) || 3.2))}
                      className="w-8 border-b border-gray-200 text-center text-gray-800 font-bold"
                    />
                  </div>
                </div>

              </div>

              {/* Integrated Core calculation layout inside compact dashboard */}
              {isCalculationValid ? (
                <div className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-center items-center gap-3 ${theme.co2Bg}`}>
                  <span className="text-xs sm:text-sm text-gray-500 font-extrabold uppercase tracking-wide leading-none">本次大师精确配合建议</span>
                  
                  <div className="flex items-baseline gap-2">
                    <span className="text-gray-650 text-xs sm:text-sm font-bold">加入奶粉：</span>
                    <span className={`text-4xl font-extrabold font-mono leading-none tracking-tight ${theme.accentText}`}>
                      {calculatedPowder.toFixed(1)} <span className="text-sm font-bold font-sans text-gray-400">克 (g)</span>
                    </span>
                  </div>

                  <div className="w-full h-[1px] bg-gray-200/60 my-1"></div>

                  <div className="flex flex-col sm:flex-row items-center justify-between w-full text-xs sm:text-sm gap-2 px-1 text-gray-650 font-bold font-semibold">
                    <div>💦 冲水量 (温开水): <strong className={theme.accentText}>{waterVol} ml</strong></div>
                    <div className="hidden sm:block text-gray-300">|</div>
                    <div>⚖️ 水粉克重比: <strong className="font-mono">1 : {dilutionRatio}</strong></div>
                  </div>

                  <div className="text-xs sm:text-sm opacity-85 text-center max-w-sm font-medium">
                    💡 量杯倒入 {waterVol}ml 温水，充分搅拌乳化发酵奶粉，常温加入极少益生菌包，进行 8-10h 密闭遮光温暖恒温发酵。
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSavingPanelOpen(true);
                      setNewRecordNotes(`温水 ${waterVol}ml + 奶粉 ${calculatedPowder.toFixed(1)}g (蛋白质 ${proteinPowder}g/100g)，预估口感是 ${currentTexture.rating}。`);
                    }}
                    className={`w-full py-3 text-white text-xs font-black rounded-xl transition-all duration-150 flex items-center justify-center gap-1.5 active:scale-95 shadow-sm ${theme.saveBtnBg}`}
                  >
                    <span>💾 妥善保存进备忘录记录</span>
                  </button>
                </div>
              ) : (
                <p className="text-xs text-red-500 text-center font-bold">{errorMsg || '输入参数异常，请在滑块内重新设定'}</p>
              )}

            </div>
          </div>
        )}

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
            className={`relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border flex flex-col max-h-[90vh] overflow-hidden select-text animate-fadeIn transition-all duration-300 ${theme.cardBorderClass}`}
          >
            {/* Modal Header */}
            <div className={`p-5 text-white flex justify-between items-center shrink-0 transition-all duration-300 ${theme.headerBg}`}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center text-lg select-none">💾</div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold font-display tracking-tight">保存酸奶制作配方与批次</h3>
                  <p className="text-white/90 text-[10.5px] font-sans opacity-95">记录最佳黄金发酵比例，留存每一次的宝宝喂养心得</p>
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
              <div className={`p-4 rounded-2xl border text-xs flex flex-col gap-1.5 transition-all duration-300 ${theme.co2Bg}`}>
                <div className="font-bold flex items-center gap-1.5 text-[12px] opacity-95">
                  <span>📝 本次分配比例参考:</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11.5px] font-medium leading-relaxed">
                  <div>💦 温水量: <span className={`font-black font-mono ${theme.accentText}`}>{waterVol} ml</span></div>
                  <div>🥛 奶粉量: <span className={`font-black font-mono ${theme.accentText}`}>{calculatedPowder.toFixed(1)} g</span></div>
                  <div>🔍 奶粉蛋白质: <span className="font-bold font-mono">{proteinPowder} g/100g</span></div>
                  <div>📐 目标浓度: <span className="font-bold font-mono">{targetProtein} %</span></div>
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
                      className={`py-1.5 rounded-lg text-xs font-semibold select-none cursor-pointer border transition-all duration-100 ${
                        newRecordStatus === 'success' 
                          ? 'bg-green-600 border-green-600 text-white font-bold shadow-3xs' 
                          : 'bg-white text-green-600 hover:bg-green-50 border-gray-250'
                      }`}
                    >
                      成功凝乳
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewRecordStatus('fail')}
                      className={`py-1.5 rounded-lg text-xs font-semibold select-none cursor-pointer border transition-all duration-100 ${
                        newRecordStatus === 'fail' 
                          ? 'bg-red-600 border-red-600 text-white font-bold shadow-3xs' 
                          : 'bg-white text-red-600 hover:bg-red-50 border-gray-250'
                      }`}
                    >
                      发酵失败
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewRecordStatus('pending')}
                      className={`py-1.5 rounded-lg text-xs font-semibold select-none cursor-pointer border transition-all duration-100 ${
                        newRecordStatus === 'pending' 
                          ? 'bg-amber-500 border-amber-500 text-white font-bold shadow-3xs' 
                          : 'bg-white text-amber-600 hover:bg-amber-50 border-gray-250'
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
                <div className={`flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1 shrink-0 select-none border p-2.5 rounded-xl transition-all duration-300 ${theme.accentBg}`}>
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
                            ? theme.accentButtonActive + ' shadow-3xs' 
                            : 'bg-white text-gray-600 hover:text-gray-800 border-gray-250 border'
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
                    className="border border-gray-250 rounded-lg px-2.5 py-1.5 text-xs bg-white flex-1 focus:border-slate-800 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomSaveTag}
                    className={`px-3 py-1.5 text-xs rounded-lg font-bold transition-all cursor-pointer active:scale-95 leading-relaxed border ${theme.accentButtonInactive}`}
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
                  className="w-full text-xs p-2.5 border rounded-xl h-20 bg-white focus:outline-hidden focus:border-slate-800 border-gray-250"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-150 flex justify-end gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsSavingPanelOpen(false)}
                className="bg-gray-250 hover:bg-gray-300 text-gray-700 px-4 py-1.5 rounded-lg text-xs font-medium cursor-pointer"
              >
                取消
              </button>
              <button
                type="submit"
                className={`text-white px-5 py-1.5 rounded-lg text-xs font-extrabold shadow-2xs cursor-pointer transition-all ${theme.saveBtnBg}`}
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
          <div className={`relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl border flex flex-col max-h-[90vh] overflow-hidden select-text transition-all duration-300 ${theme.cardBorderClass}`}>
            
            {/* Modal Header */}
            <div className={`p-6 text-white flex justify-between items-center shrink-0 transition-all duration-300 ${theme.headerBg}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-2xl select-none">💡</div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight">自制酸奶：科学指南 & 新手经典答疑</h3>
                  <p className="text-orange-100 text-xs sm:text-sm font-semibold">让自制复原酸奶更简单 · 让新手父母育儿更省心</p>
                </div>
              </div>
              <button
                onClick={() => setIsHelpModalOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white focus:outline-hidden cursor-pointer"
                title="关闭"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-8">
              
              {/* Part 1: Starter Guide */}
              <div className="space-y-5">
                <div className="flex items-center gap-2 border-b border-orange-100 pb-3">
                  <BookOpen className="w-6 h-6 text-orange-500 shrink-0" />
                  <h4 className="text-base sm:text-lg font-black font-display text-gray-950">自制奶粉酸奶：标准操作方法流程</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* Step 1 */}
                  <div className="p-5 bg-orange-50/20 border border-orange-100/60 rounded-2xl flex gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-black text-sm shrink-0 font-mono mt-0.5 shadow-3xs">
                      1
                    </div>
                    <div>
                      <h5 className="text-sm sm:text-base font-black text-gray-900">温水融解、无颗粒粉液</h5>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mt-1.5 font-medium">
                        推荐先用配方中 <span className="font-bold text-gray-700">50% 的温水</span> (尽量恒温在 38°C - 41°C) 加入盆中，撒入全部奶粉。使用消毒蛋抽或汤匙，呈“Z”字型彻底划开，避免画圈起泡或产生未融解干粉球。
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="p-5 bg-orange-50/20 border border-orange-100/60 rounded-2xl flex gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-black text-sm shrink-0 font-mono mt-0.5 shadow-3xs">
                      2
                    </div>
                    <div>
                      <h5 className="text-sm sm:text-base font-black text-gray-900">接种乳酸菌粉</h5>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mt-1.5 font-medium">
                        确认冲好的奶液温度已经低于 <span className="font-black text-orange-600">42°C</span> (手腕内侧感到不温烫)。剪开 1 包酸奶菌粉，均匀倒在乳液表面，静置 30 秒吸收，然后用轻缓动作上下翻拌混合。
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="p-5 bg-orange-50/20 border border-orange-100/60 rounded-2xl flex gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-black text-sm shrink-0 font-mono mt-0.5 shadow-3xs">
                      3
                    </div>
                    <div>
                      <h5 className="text-sm sm:text-base font-black text-gray-900">绝热避光发酵</h5>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mt-1.5 font-medium">
                        倒入经过沸烫消毒好的酸奶罐。置入发酵器。通常选择 <span className="font-black text-gray-800">38°C~41°C 恒温放任 8 - 10 小时</span> 培养，中途切勿移动或频繁掀盖观察。
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="p-5 bg-orange-50/20 border border-orange-100/60 rounded-2xl flex gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-black text-sm shrink-0 font-mono mt-0.5 shadow-3xs">
                      4
                    </div>
                    <div>
                      <h5 className="text-sm sm:text-base font-black text-gray-900">立刻冷藏，促成“钝化”质变</h5>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mt-1.5 font-medium">
                        时间结束立即开封，呈紧实平滑的固相即表成功！<span className="font-bold text-orange-600 underline underline-offset-2">此时将其直接放入冰箱冷藏室冷藏至少 8 小时</span>，温度骤降会锁闭水分，酸度稳定，质地也会变得惊艳丝滑！
                      </p>
                    </div>
                  </div>

                </div>

                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 text-sm text-orange-950 flex items-start gap-2.5 shadow-3xs">
                  <span className="text-lg leading-none">⚠️</span>
                  <p className="text-xs sm:text-sm leading-relaxed font-semibold">
                    <strong>无菌提示</strong>：宝宝肠胃娇弱，整个制作使用的玻璃勺罐器，冲调前均必须使用刚烧开的沸水彻底淋烫消毒，最大程度排除腐杂菌干扰。
                  </p>
                </div>
              </div>

              {/* Part 2: FAQs */}
              <div className="space-y-5">
                <div className="flex items-center gap-2 border-b border-orange-100 pb-3">
                  <Smile className="w-6 h-6 text-orange-500 shrink-0" />
                  <h4 className="text-base sm:text-lg font-black font-display text-gray-950">新手父母自制奶粉发酵酸奶经典答疑 (FAQ)</h4>
                </div>

                <div className="space-y-5 text-sm">
                  <div className="bg-orange-50/10 border-l-4 border-orange-400 p-5 rounded-r-2xl space-y-1.5 bg-white shadow-3xs">
                    <h5 className="font-black text-gray-900 text-sm sm:text-base">Q: 为什么按平时喝奶的比例发酸奶，容易彻底不酸或者稀成水？</h5>
                    <p className="leading-relaxed text-gray-500 text-xs sm:text-sm font-medium">
                      答：最主要的原因在于原初蛋白质浓度。婴配粉为适应婴儿娇嫩消化，在包装说明冲调比例下，蛋白质率仅为 1.5% 左右。缺少胶乳固定，乳酸菌类拉不开充足网格结构。本仪器精准地将水量与对冲蛋白换算到 3.2% 或更高，创造出高能固相发酵原奶，一扫无法凝乳问题。
                    </p>
                  </div>

                  <div className="bg-orange-50/10 border-l-4 border-orange-400 p-5 rounded-r-2xl space-y-1.5 bg-white shadow-3xs">
                    <h5 className="font-black text-gray-900 text-sm sm:text-base">Q: 宝宝怎么食用最安心？如何合理储藏？</h5>
                    <p className="leading-relaxed text-gray-500 text-xs sm:text-sm font-medium">
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
                className="px-6 py-2.5 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-black rounded-xl text-sm sm:text-base shadow-xs hover:shadow-sm active:scale-95 transition-all duration-100 cursor-pointer"
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
          <div className={`relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl border flex flex-col max-h-[90vh] overflow-hidden transition-all duration-300 ${theme.cardBorderClass}`}>
            
            {/* Header */}
            <div className={`p-6 text-white flex justify-between items-center shrink-0 transition-all duration-300 ${theme.headerBg}`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl select-none">📊</span>
                <div>
                  <h3 className="text-lg sm:text-[18px] font-black font-display tracking-tight">奶粉还原发酵：科学公式与原理</h3>
                  <p className="text-orange-100 text-xs sm:text-sm font-semibold">科学解答水量配比与蛋白质黏连锁水机制</p>
                </div>
              </div>
              <button
                onClick={() => setIsFormulaModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto bg-orange-50/10">
              <AnnotatedFormula 
                waterVol={waterVol}
                powderWeight={calculatedPowder}
                targetProtein={targetProtein}
                proteinPowder={proteinPowder}
              />
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-150 flex justify-end shrink-0">
              <button
                onClick={() => setIsFormulaModalOpen(false)}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-xl text-sm sm:text-base cursor-pointer active:scale-95 transition-all shadow-xs"
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
          <div className={`relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl border flex flex-col max-h-[90vh] overflow-hidden transition-all duration-300 ${theme.cardBorderClass}`}>
            
            {/* Header */}
            <div className={`p-6 text-white flex justify-between items-center shrink-0 transition-all duration-300 ${theme.headerBg}`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl select-none">🔍</span>
                <div>
                  <h3 className="text-lg sm:text-[18px] font-black font-display tracking-tight">如何查找包装上的蛋白质含量</h3>
                  <p className="text-orange-100 text-xs sm:text-sm font-semibold">参考背面成分表进行自选或快捷配置参数</p>
                </div>
              </div>
              <button
                onClick={() => setIsProteinGuideModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto bg-orange-50/10">
              <ProteinGuide 
                proteinValue={proteinPowder} 
                onSelectPreset={(val) => {
                  setProteinPowder(val);
                  setIsProteinGuideModalOpen(false); // Close modal automatically for convenience
                }} 
              />
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-150 flex justify-end shrink-0">
              <button
                onClick={() => setIsProteinGuideModalOpen(false)}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-xl text-sm sm:text-base cursor-pointer active:scale-95 transition-all shadow-xs"
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
        className="max-w-[1500px] mx-auto mt-3 py-2.5 border-t font-sans select-none text-center flex flex-col sm:flex-row items-center justify-between gap-2 px-4 md:px-8 text-xs font-bold opacity-50 hover:opacity-100 transition-opacity duration-300"
        style={{ borderTopColor: 'rgb(169, 98, 22)', color: 'rgb(169, 98, 22)' }}
      >
        <div className="flex items-center gap-1.5 font-medium text-xs">
          <span>🥛 复原乳发酵酸奶比例计算工具</span>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap justify-center text-xs">
          {/* Hover tooltip logic for 创意大脑: 絕 */}
          <div className="relative group inline-block">
            <span className="px-1.5 py-0.5 bg-orange-100/5 border border-amber-600/25 rounded text-xs cursor-help font-mono font-medium transition-all hover:bg-orange-100/15">
              创意大脑：Air
            </span>
            {/* Tooltip bubble */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-stone-900 text-stone-100 text-xs rounded-xl py-2 px-3.5 w-64 text-center shadow-xl z-50 leading-relaxed font-sans font-normal border border-amber-700/80 animate-fadeIn">
              不管身在何处 我都会提醒自己 不要忘记自己活在现实中 QQ:250740270
              {/* Micro-arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-stone-900"></div>
            </div>
          </div>

          <span className="px-1.5 py-0.5 bg-orange-100/5 border border-amber-600/15 rounded text-xs font-mono font-medium">
            执行四肢：Gemini
          </span>
        </div>
      </footer>
    </div>
  );
}
