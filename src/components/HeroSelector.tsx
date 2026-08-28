import React, { useState } from 'react';
import { UserProfile } from '../types';
import { AVATARS } from '../data/curriculum';
import { playSound } from '../utils/audio';
import { X, Check, Lock, Sparkles, User, Type } from 'lucide-react';

interface HeroSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
}

export const HeroSelector: React.FC<HeroSelectorProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile
}) => {
  const [heroName, setHeroName] = useState(profile.name);
  const [selectedAvatarId, setSelectedAvatarId] = useState(profile.avatarId);
  const [selectedFontSize, setSelectedFontSize] = useState<'standard' | 'large' | 'extra_large'>(
    profile.fontSizeMode || 'extra_large'
  );

  if (!isOpen) return null;

  const handleSave = () => {
    playSound.click();
    onUpdateProfile({
      ...profile,
      name: heroName.trim() || 'يوسف',
      avatarId: selectedAvatarId,
      fontSizeMode: selectedFontSize
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl p-5 sm:p-6 text-white space-y-4 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-2xl bg-amber-500/20 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">تخصيص شخصية البطل وإعدادات العرض</h2>
              <p className="text-xs text-amber-300 font-bold">مخصص للبطل الذكي يوسف 🌟</p>
            </div>
          </div>

          <button
            onClick={() => {
              playSound.click();
              onClose();
            }}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Name Input */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            اسم البطل:
          </label>
          <div className="relative">
            <input
              type="text"
              maxLength={25}
              value={heroName}
              onChange={(e) => setHeroName(e.target.value)}
              placeholder="مثال: يوسف بطل الصف السادس"
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-800 border border-slate-700 text-white font-bold text-sm focus:outline-none focus:border-amber-400"
            />
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Font Size Chooser */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Type className="w-4 h-4 text-amber-400" />
            <span>حجم الخط والكلمات في الأسئلة (وضوح القراءة):</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => {
                playSound.click();
                setSelectedFontSize('extra_large');
              }}
              className={`p-2.5 rounded-xl border text-center font-black text-xs transition ${
                selectedFontSize === 'extra_large'
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-1 ring-amber-400'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
              }`}
            >
              <div>كبير جداً A++</div>
              <div className="text-[10px] text-amber-400 font-normal mt-0.5">الأنسب ليوسف ⭐</div>
            </button>

            <button
              type="button"
              onClick={() => {
                playSound.click();
                setSelectedFontSize('large');
              }}
              className={`p-2.5 rounded-xl border text-center font-black text-xs transition ${
                selectedFontSize === 'large'
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-1 ring-amber-400'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
              }`}
            >
              <div>كبير A+</div>
              <div className="text-[10px] text-slate-400 font-normal mt-0.5">واضح ومريح</div>
            </button>

            <button
              type="button"
              onClick={() => {
                playSound.click();
                setSelectedFontSize('standard');
              }}
              className={`p-2.5 rounded-xl border text-center font-black text-xs transition ${
                selectedFontSize === 'standard'
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-1 ring-amber-400'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
              }`}
            >
              <div>قياسي A</div>
              <div className="text-[10px] text-slate-400 font-normal mt-0.5">عادي</div>
            </button>
          </div>
        </div>

        {/* Avatar Options */}
        <div>
          <div className="text-xs font-bold text-slate-300 mb-2">
            اختر مظهر وشخصية البطل:
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {AVATARS.map((avatar) => {
              const isSelected = selectedAvatarId === avatar.id;
              const isLocked = profile.level < avatar.minLevel;

              return (
                <button
                  key={avatar.id}
                  disabled={isLocked}
                  onClick={() => {
                    if (!isLocked) {
                      playSound.click();
                      setSelectedAvatarId(avatar.id);
                    }
                  }}
                  className={`p-2.5 rounded-2xl border text-center transition flex flex-col items-center justify-between relative ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400 shadow-lg'
                      : isLocked
                      ? 'bg-slate-800/40 border-slate-800 opacity-50 cursor-not-allowed'
                      : 'bg-slate-800 hover:bg-slate-750 border-slate-700'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${avatar.bgGradient} flex items-center justify-center text-2xl shadow mb-1.5`}>
                    {avatar.emoji}
                  </div>

                  <div className="text-xs font-extrabold text-white truncate w-full">
                    {avatar.name}
                  </div>
                  <div className="text-[9px] text-slate-400 mt-0.5 line-clamp-1">
                    {avatar.description}
                  </div>

                  {isLocked && (
                    <div className="absolute inset-0 bg-slate-950/70 rounded-2xl backdrop-blur-[1px] flex flex-col items-center justify-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-[9px] font-bold text-amber-300">
                        المستوى {avatar.minLevel}
                      </span>
                    </div>
                  )}

                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Save button */}
        <div className="pt-2">
          <button
            onClick={handleSave}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow-lg transition active:scale-98"
          >
            حفظ التغييرات والانطلاق 🚀
          </button>
        </div>
      </div>
    </div>
  );
};
