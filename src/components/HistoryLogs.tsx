import React, { useRef, useState } from 'react';
import { YogurtRecord } from '../types';
import { 
  Download, 
  Upload, 
  Trash2, 
  RotateCcw, 
  Check, 
  X, 
  Tag, 
  Sparkles, 
  Star, 
  Search,
  ChevronRight
} from 'lucide-react';

interface HistoryLogsProps {
  records: YogurtRecord[];
  onDeleteRecord: (id: string) => void;
  onUpdateRecordStatus: (id: string, status: 'success' | 'fail' | 'pending') => void;
  onUpdateRecordDetails: (id: string, rating: number, notes: string, tags: string[]) => void;
  onLoadRecordToCalculator: (record: YogurtRecord) => void;
  onImportRecords: (imported: YogurtRecord[]) => void;
}

export default function HistoryLogs({
  records,
  onDeleteRecord,
  onUpdateRecordStatus,
  onUpdateRecordDetails,
  onLoadRecordToCalculator,
  onImportRecords,
}: HistoryLogsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'success' | 'fail'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Local state for editing modal or expanded card details
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState<number>(5);
  const [editNotes, setEditNotes] = useState<string>('');
  const [editTags, setEditTags] = useState<string[]>([]);
  const [newTagInput, setNewTagInput] = useState<string>('');

  // Sample preset feedback tags for parents to choose
  const PRESET_FEEDBACK_TAGS = ['完美拉丝', '奶香浓郁', '酸度适中', '温和不酸', '质地粘稠', '稍微偏酸', '乳清析出', '无法固化'];

  // Filter & Search records
  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      `${record.waterVol}ml`.includes(searchQuery) ||
      `${record.powderWeight}g`.includes(searchQuery);

    if (activeTab === 'success') return record.isSuccess === 'success' && matchesSearch;
    if (activeTab === 'fail') return record.isSuccess === 'fail' && matchesSearch;
    return matchesSearch;
  });

  // Export records as JSON file
  const handleExportJSON = () => {
    if (records.length === 0) {
      alert('目前还没有任何保存记录可以导出哦！先去制作并保存一份吧 🥛');
      return;
    }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(records, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `奶粉酸奶制作记录_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import records from JSON file
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const file = e.target.files?.[0];
    if (!file) return;

    fileReader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          const isValid = parsed.every(item => 
            item.id && 
            typeof item.waterVol === 'number' && 
            typeof item.powderWeight === 'number'
          );
          if (isValid) {
            onImportRecords(parsed);
            alert(`成功导入 ${parsed.length} 条制作酸奶配方记录！🌟`);
          } else {
            alert('文件格式错误：请上传通过本工具导出的 JSON 记录文件。');
          }
        } else {
          alert('数据格式不符，必须为数组格式文件。');
        }
      } catch (err) {
        alert('解析文件出错，请确保是正确的备份 JSON 文件。');
      }
    };
    fileReader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const startEditing = (record: YogurtRecord) => {
    setEditingId(record.id);
    setEditRating(record.rating || 5);
    setEditNotes(record.notes || '');
    setEditTags(record.tags || []);
    setNewTagInput('');
  };

  const saveEditing = (id: string) => {
    onUpdateRecordDetails(id, editRating, editNotes, editTags);
    setEditingId(null);
  };

  const toggleTagSelection = (tag: string) => {
    if (editTags.includes(tag)) {
      setEditTags(editTags.filter(t => t !== tag));
    } else {
      setEditTags([...editTags, tag]);
    }
  };

  const handleAddCustomTag = () => {
    const trimmed = newTagInput.trim();
    if (trimmed && !editTags.includes(trimmed)) {
      setEditTags([...editTags, trimmed]);
      setNewTagInput('');
    }
  };

  return (
    <div id="history-logs-section" className="bg-white rounded-3xl border-2 border-orange-100 shadow-sm p-5 md:p-6">
      
      {/* Header with import/export action buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-orange-50">
        <div>
          <h3 className="text-lg font-bold text-gray-900 font-sans flex items-center gap-2">
            📝 历史配方与制作日志
            <span className="text-xs sm:text-sm font-semibold text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded-full font-mono">
              共 {records.length} 组
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            自动云端本地保存，支持快捷载入配方。宝宝满意的成功配方可导出长期备份。
          </p>
        </div>
        
        {/* Export / Import button group */}
        <div id="backup-actions-container" className="flex items-center gap-2 self-start sm:self-auto">
          {/* Export */}
          <button
            id="export-btn"
            type="button"
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-orange-200 hover:border-orange-400 rounded-xl text-xs sm:text-sm font-bold text-orange-700 hover:text-orange-900 bg-white hover:bg-orange-50/50 transition-all shadow-3xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-orange-500" />
            <span>导出备份</span>
          </button>
          
          {/* Import */}
          <label
            id="import-label"
            className="flex items-center gap-1.5 px-3 py-1.5 border border-orange-200 hover:border-orange-400 rounded-xl text-xs sm:text-sm font-bold text-orange-700 hover:text-orange-900 cursor-pointer bg-white hover:bg-orange-50/50 transition-all shadow-3xs"
          >
            <Upload className="w-4 h-4 text-orange-500" />
            <span>导入恢复</span>
            <input
              id="import-file-input"
              type="file"
              ref={fileInputRef}
              accept=".json"
              className="hidden"
              onChange={handleImportJSON}
            />
          </label>
        </div>
      </div>

      {/* Filter Options & Search bar */}
      <div className="flex flex-col md:flex-row gap-4 my-4">
        {/* Tabs for result state */}
        <div className="flex bg-orange-50 p-1.5 rounded-2xl w-fit shrink-0 select-none border border-orange-100">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'all' 
                ? 'bg-white text-orange-600 shadow-3xs' 
                : 'text-gray-500 hover:text-gray-850'
            }`}
          >
            全部配方
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('success')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1 cursor-pointer ${
              activeTab === 'success' 
                ? 'bg-green-500 text-white shadow-3xs' 
                : 'text-green-650 hover:bg-green-50/30'
            }`}
          >
            ✅ 完美成型
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('fail')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1 cursor-pointer ${
              activeTab === 'fail' 
                ? 'bg-red-500 text-white shadow-3xs' 
                : 'text-red-650 hover:bg-red-50/30'
            }`}
          >
            ❌ 翻车重试
          </button>
        </div>

        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4.5 h-4.5 text-orange-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="search-input"
            type="text"
            placeholder="搜索配比水量、奶粉备注或评语标签 (如: 500ml, 完美)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-orange-100 rounded-xl focus:border-orange-400 focus:outline-hidden bg-orange-50/15"
          />
        </div>
      </div>

      {/* Record cards list */}
      {filteredRecords.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-orange-100 rounded-2xl bg-orange-50/10">
          <div className="text-3xl mb-2 select-none">🥛</div>
          <p className="text-xs text-orange-600 font-semibold">目前尚无符合过滤条件的配方记录</p>
          <p className="text-[11px] text-gray-400 mt-1">您可以通过上方黄色计算按钮开始您的第一次酸奶发酵记录哦！</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRecords.map((record) => {
            const isEditingThis = editingId === record.id;
            
            return (
              <div
                key={record.id}
                id={`record-card-${record.id}`}
                className={`border-2 rounded-2xl p-4 transition-all relative ${
                  record.isSuccess === 'success' 
                    ? 'border-green-100 bg-green-50/5 hover:border-green-200' 
                    : record.isSuccess === 'fail'
                    ? 'border-red-100 bg-red-50/5 hover:border-red-200'
                    : 'border-orange-200/60 bg-orange-50/10 hover:border-orange-350'
                }`}
              >
                
                {/* Visual success/fail badge & Top Action bars */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2.5">
                  <div className="flex items-center gap-2">
                    {/* Status Toggle buttons */}
                    <div className="flex bg-white shadow-3xs border border-orange-100 rounded-lg p-0.5 text-[11px]">
                      <button
                        title="标为成功"
                        type="button"
                        onClick={() => onUpdateRecordStatus(record.id, 'success')}
                        className={`px-1.5 py-0.5 rounded flex items-center transition-all cursor-pointer ${
                          record.isSuccess === 'success'
                            ? 'bg-green-500 text-white font-bold'
                            : 'text-gray-400 hover:text-green-600'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span className="sr-only">成功</span>
                      </button>
                      <button
                        title="标为未成功"
                        type="button"
                        onClick={() => onUpdateRecordStatus(record.id, 'fail')}
                        className={`px-1.5 py-0.5 rounded flex items-center transition-all cursor-pointer ${
                          record.isSuccess === 'fail'
                            ? 'bg-red-500 text-white font-bold'
                            : 'text-gray-400 hover:text-red-500'
                        }`}
                      >
                        <X className="w-3.5 h-3.5" />
                        <span className="sr-only">失败</span>
                      </button>
                    </div>

                    {/* Date label */}
                    <span className="text-[10px] font-mono text-gray-400">{record.date}</span>

                    {/* Quick indicator badge */}
                    {record.isSuccess === 'success' && (
                      <span className="bg-green-100 text-green-800 text-[10px] px-2 py-0.5 rounded-md font-medium">
                        完美发酵
                      </span>
                    )}
                    {record.isSuccess === 'fail' && (
                      <span className="bg-red-100 text-red-800 text-[10px] px-2 py-0.5 rounded-md font-medium">
                        发酵翻车
                      </span>
                    )}
                  </div>

                  {/* Top-right Recipe operations */}
                  <div className="flex items-center gap-1.5">
                    {/* Apply settings to calculator */}
                    <button
                      type="button"
                      onClick={() => onLoadRecordToCalculator(record)}
                      className="text-orange-600 hover:text-orange-900 bg-orange-50 hover:bg-orange-100/60 transition-all font-bold rounded-lg text-xs px-2.5 py-1 flex items-center gap-1 cursor-pointer"
                      title="重载入该参数用作微调"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>载入配方</span>
                    </button>

                    {/* Delete icon */}
                    <button
                      type="button"
                      onClick={() => onDeleteRecord(record.id)}
                      className="text-gray-400 hover:text-red-500 p-1.5 rounded-md transition-colors cursor-pointer hover:bg-gray-100"
                      title="删除记录"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Grid describing formula elements */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white rounded-xl p-3 border border-orange-100/40 text-[13px] mb-3">
                  <div>
                    <span className="text-gray-500 block text-[11px]">💦 冲调制水量</span>
                    <span className="font-bold text-gray-800 font-mono text-sm">{record.waterVol} ml</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">🎨 奶粉投放重</span>
                    <span className="font-bold text-orange-600 font-mono text-sm">{record.powderWeight} g</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">🍼 包装蛋白质</span>
                    <span className="font-bold text-gray-700 font-mono text-sm">{record.proteinPowder} g/100g</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">🎯 目标蛋白质</span>
                    <span className="font-bold text-gray-700 font-mono text-sm">{record.targetProtein} %</span>
                  </div>
                </div>

                {isEditingThis ? (
                  <div className="space-y-4 bg-orange-50/20 border border-orange-200 p-4 rounded-xl mt-3 animate-fadeIn">
                    <h5 className="font-bold text-[13px] sm:text-sm text-gray-900 border-b border-orange-100 pb-1.5 flex items-center gap-1.5">
                      📝 重新评估调配与口感反馈
                    </h5>

                    {/* Stars Select */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm text-gray-700 font-semibold font-bold">口感评估评分:</span>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                           <button
                             key={star}
                             type="button"
                             onClick={() => setEditRating(star)}
                             className="p-1 focus:outline-hidden cursor-pointer"
                           >
                             <span className={`text-2xl ${star <= editRating ? 'text-orange-400' : 'text-gray-300'}`}>★</span>
                           </button>
                        ))}
                      </div>
                    </div>

                    {/* Pre-fill Quick tags (Toggle logic) */}
                    <div>
                      <span className="text-xs sm:text-sm text-gray-650 font-semibold block mb-1.5 font-bold">点选快捷标签反馈:</span>
                      <div className="flex flex-wrap gap-2">
                        {PRESET_FEEDBACK_TAGS.map((tag) => {
                          const isSelected = editTags.includes(tag);
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => toggleTagSelection(tag)}
                              className={`text-xs px-2.5 py-1 rounded-full transition-all cursor-pointer border ${
                                isSelected
                                  ? 'bg-orange-500 text-white font-bold border-orange-500 shadow-3xs'
                                  : 'bg-white text-gray-600 hover:text-gray-800 border-orange-100 hover:border-orange-200'
                              }`}
                            >
                              {tag}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Custom Tag input */}
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="自定义喂养感觉..."
                        value={newTagInput}
                        onChange={(e) => setNewTagInput(e.target.value)}
                        className="border border-orange-100 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm bg-white w-44 focus:border-orange-400 focus:outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomTag}
                        className="bg-orange-100 hover:bg-orange-200 px-3.5 py-1.5 text-xs sm:text-sm rounded-lg text-orange-810 font-bold transition-all cursor-pointer"
                      >
                        添加
                      </button>
                    </div>

                    {/* Notes text area */}
                    <div>
                      <span className="text-xs sm:text-sm text-gray-650 font-semibold block mb-1.5 font-bold">自制酸奶及宝宝食用记录笔记:</span>
                      <textarea
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        placeholder="宝宝食用笔记，如：发酵了8.5小时，奶香味特别足，配了一勺番薯泥宝宝超爱吃！"
                        className="w-full text-xs sm:text-sm border border-orange-105 p-2.5 rounded-lg bg-white h-20 focus:border-orange-400 focus:outline-hidden resize-none"
                      />
                    </div>

                    {/* Edit actions */}
                    <div className="flex gap-2 justify-end pt-1">
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded-lg text-xs font-medium cursor-pointer"
                      >
                        取消
                      </button>
                      <button
                        type="button"
                        onClick={() => saveEditing(record.id)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-3xs cursor-pointer"
                      >
                        保存评估
                      </button>
                    </div>

                  </div>
                ) : (
                  <div className="space-y-2 mt-2">
                    {/* Stars & Textures */}
                    <div className="flex flex-wrap items-center gap-3">
                      
                      {/* Star outputs */}
                      {record.rating && (
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className={`text-base ${
                              star <= (record.rating || 5) ? 'text-orange-400' : 'text-gray-255'
                            }`}>★</span>
                          ))}
                        </div>
                      )}

                      {/* Predicted Textures */}
                      <span className="text-xs sm:text-sm text-gray-500">
                        预选口感质地: <span className="text-orange-600 font-semibold">{record.predictedTexture}</span>
                      </span>

                    </div>

                    {/* Interactive tags map */}
                    {record.tags && record.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {record.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="bg-orange-50 text-orange-800 text-xs px-2.5 py-1 rounded-full border border-orange-100/40 flex items-center gap-0.5 font-semibold"
                          >
                            <Tag className="w-3 h-3 text-orange-500 opacity-80" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Notes area */}
                    {record.notes ? (
                      <p className="text-xs sm:text-sm text-gray-600 bg-orange-50/10 p-2.5 rounded-xl leading-relaxed border border-orange-50">
                        📝 <span className="font-bold text-orange-950">笔记:</span> {record.notes}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-400 italic">暂无添加心得</p>
                    )}

                    {/* Quick Edit button changed to re-evaluate button with professional styling */}
                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={() => startEditing(record)}
                        className="text-orange-600 hover:text-orange-900 hover:bg-orange-50 bg-white border border-orange-200 rounded-xl px-3 py-1.5 text-xs sm:text-sm flex items-center gap-1 font-bold transition-all shadow-3xs cursor-pointer active:scale-97 hover:scale-[1.01]"
                        title="点击重新输入或调整口感记录"
                      >
                        <span>🔄 重新评估实测口感</span>
                      </button>
                    </div>

                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
