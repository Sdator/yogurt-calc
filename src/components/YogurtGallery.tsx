import React, { useState } from 'react';
import { X, Sparkles, Image as ImageIcon } from 'lucide-react';

interface GalleryCase {
  id: string;
  title: string;
  imgUrl: string; // fallback high quality Unsplash image
  localPath: string; // prospective/ideal /img/ local path
}

const CASES: GalleryCase[] = [
  {
    id: 'case-1',
    title: '日常记录 1',
    imgUrl: '/img/case-1.webp',
    localPath: '/img/case-1.webp'
  },
  {
    id: 'case-2',
    title: '日常记录 2',
    imgUrl: '/img/case-2.webp',
    localPath: '/img/case-2.webp'
  },
  {
    id: 'case-3',
    title: '日常记录 3',
    imgUrl: '/img/case-3.webp',
    localPath: '/img/case-3.webp'
  },
  {
    id: 'case-4',
    title: '日常记录 4',
    imgUrl: '/img/case-4.webp',
    localPath: '/img/case-4.webp'
  },
  {
    id: 'case-5',
    title: '日常记录 5',
    imgUrl: '/img/case-5.webp',
    localPath: '/img/case-5.webp'
  },
  {
    id: 'case-6',
    title: '日常记录 6',
    imgUrl: '/img/case-6.webp',
    localPath: '/img/case-6.webp'
  },
  {
    id: 'case-7',
    title: '日常记录 7',
    imgUrl: '/img/case-7.webp',
    localPath: '/img/case-7.webp'
  },
  {
    id: 'case-8',
    title: '日常记录 8',
    imgUrl: '/img/case-8.webp',
    localPath: '/img/case-8.webp'
  }
];

interface YogurtGalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function YogurtGallery({ isOpen, onClose }: YogurtGalleryProps) {
  const [activeImageSrc, setActiveImageSrc] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <>
      {/* 1. Primary Album Modal Container */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn"
      >
        <div 
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-scaleUp border border-orange-100"
        >
          {/* Header resembling thin iOS styling */}
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-stone-50/60 shrink-0">
            <div className="flex items-center gap-2">
              <span className="p-1 bg-orange-100 text-orange-600 rounded-lg">
                <ImageIcon className="w-4 h-4" />
              </span>
              <div>
                <span className="text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1">
                  日常发酵分享
                  <span className="text-[9px] bg-orange-200/50 text-orange-850 px-1.5 py-0.5 rounded-full font-sans font-medium flex items-center gap-0.5 select-none">
                    <Sparkles className="w-2.5 h-2.5" /> 随便晒晒
                  </span>
                </span>
                <p className="text-[9.5px] text-gray-400 font-sans">
                  记录了 {CASES.length} 个发酵玩耍瞬间
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 text-gray-400 hover:text-gray-700 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Picture Grid (Phone Album Layout - square elements) */}
          <div className="p-4 overflow-y-auto bg-stone-50/30">
            <div className="grid grid-cols-2 gap-3">
              {CASES.map((item) => {
                const hasLocalError = imageErrors[item.id];
                const displaySrc = hasLocalError ? item.imgUrl : item.localPath;

                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveImageSrc(displaySrc)}
                    className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden group cursor-pointer shadow-3xs border border-gray-200/40"
                  >
                    <img
                      src={displaySrc}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      onError={() => {
                        if (!hasLocalError) {
                          handleImageError(item.id);
                        }
                      }}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    
                    {/* Minimal hover overlay */}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="px-5 py-3.5 bg-gray-50 border-t border-gray-100 shrink-0 text-center">
            <p className="text-[9.5px] text-gray-400 font-sans">
              💡 提示：点击列表图可在大图视野下全屏预览
            </p>
          </div>
        </div>
      </div>

      {/* 2. Pure Secondary Lightbox Overlay (No clutter/No text explanation) */}
      {activeImageSrc && (
        <div 
          onClick={() => setActiveImageSrc(null)}
          className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center p-2 z-60 animate-fadeIn"
        >
          <button
            onClick={() => setActiveImageSrc(null)}
            className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95 border border-white/10"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-[95vw] max-h-[90vh] flex items-center justify-center relative select-none animate-scaleUp"
          >
            <img
              src={activeImageSrc}
              alt="Expanded Preview"
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl border border-white/5 cursor-zoom-out"
              onClick={() => setActiveImageSrc(null)}
            />
          </div>
        </div>
      )}
    </>
  );
}
