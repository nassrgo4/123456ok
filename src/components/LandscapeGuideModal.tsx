import React from 'react';
import { UserProfile } from '../types';
import { playSound } from '../utils/audio';
import { 
  X, 
  Smartphone, 
  RotateCw, 
  Maximize2, 
  Type, 
  Sparkles, 
  Check, 
  Eye, 
  Gamepad2,
  Tv
} from 'lucide-react';

interface LandscapeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
}

export const LandscapeGuideModal: React.FC<LandscapeGuideModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile
}) => {
  if (!isOpen) return null;

  const currentFontSize = profile.fontSizeMode || 'extra_large';

  const setFontSize = (mode: 'standard' | 'large' | 'extra_large') => {
    playSound.click();
    onUpdateProfile({
      ...profile,
      fontSizeMode: mode
    });
  };

  const handleFullscreenToggle = () => {
    playSound.click();
    try {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    } catch {
      // Ignore if not supported in iframe
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl p-5 sm:p-6 text-white space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 font-black shadow">
              <RotateCw className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                وضع العرض الأفقي وتكبير الخط 📱✨
              </h2>
              <p className="text-xs text-amber-300 font-bold">
                مخصص لراحة بصر وسهولة تعلم البطل الذكي يوسف
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playSound.click();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Landscape Mode Feature Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-sky-950/70 via-indigo-950/60 to-slate-900 border border-sky-500/40 shadow-inner">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/40 text-sky-300 flex items-center justify-center flex-shrink-0 text-2xl">
              📲
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-sky-200 mb-1 flex items-center gap-2">
                <span>تدوير الموبايل إلى وضع العرض (Landscape)</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-400/20 text-sky-300 border border-sky-400/30">
                  موصى به جداً ⭐
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                عند إمساك الهاتف أو الجهاز اللوحي بالعرض (أفقياً)، تتوزع الأسئلة والخيارات جنباً إلى جنب في شاشة واحدة واسعة ومريحة بدون الحاجة للتمرير، تماماً كأجهزة الألعاب الحديثة!
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={handleFullscreenToggle}
                  className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shadow transition active:scale-95"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>تفعيل وضع الشاشة الكاملة (Full Screen)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Font Size Selection for Yousef */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Type className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm sm:text-base font-black text-slate-100">
                حجم الكلمات والأسئلة (وضوح القراءة):
              </h3>
            </div>
            <span className="text-xs font-bold text-amber-300">
              {currentFontSize === 'extra_large' ? 'كبير جداً (الأنسب ليوسف)' : currentFontSize === 'large' ? 'كبير' : 'قياسي'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Extra Large */}
            <button
              onClick={() => setFontSize('extra_large')}
              className={`p-3.5 rounded-2xl border text-right transition flex flex-col justify-between ${
                currentFontSize === 'extra_large'
                  ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/50 shadow-md'
                  : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-base sm:text-lg font-black text-amber-300">كبير جداً A++</span>
                {currentFontSize === 'extra_large' && <Check className="w-4 h-4 text-amber-400" />}
              </div>
              <span className="text-[11px] text-slate-300 font-bold">
                أقصى درجات الوضوح والراحة لبصر الطفل
              </span>
            </button>

            {/* Large */}
            <button
              onClick={() => setFontSize('large')}
              className={`p-3.5 rounded-2xl border text-right transition flex flex-col justify-between ${
                currentFontSize === 'large'
                  ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/50 shadow-md'
                  : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-base font-black text-amber-300">كبير A+</span>
                {currentFontSize === 'large' && <Check className="w-4 h-4 text-amber-400" />}
              </div>
              <span className="text-[11px] text-slate-300 font-bold">
                خط واضح ومريح للشاشات المتوسطة
              </span>
            </button>

            {/* Standard */}
            <button
              onClick={() => setFontSize('standard')}
              className={`p-3.5 rounded-2xl border text-right transition flex flex-col justify-between ${
                currentFontSize === 'standard'
                  ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/50 shadow-md'
                  : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-black text-slate-200">قياسي A</span>
                {currentFontSize === 'standard' && <Check className="w-4 h-4 text-amber-400" />}
              </div>
              <span className="text-[11px] text-slate-400 font-bold">
                الحجم العادي الافتراضي
              </span>
            </button>
          </div>
        </div>

        {/* Advice for Parent & Child */}
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm font-medium flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <span>
            نصيحة: تأكد من تفعيل خاصية <strong>«التدوير التلقائي (Auto-Rotate)»</strong> في إعدادات الهاتف حتى يدور التطبيق بسلاسة عند إمالة الشاشة!
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            playSound.click();
            onClose();
          }}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-base shadow-lg transition"
        >
          حفظ وتطبيق الإعدادات للمغامرة 🚀
        </button>
      </div>
    </div>
  );
};
