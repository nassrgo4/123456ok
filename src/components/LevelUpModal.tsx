import React, { useEffect } from 'react';
import { UserProfile } from '../types';
import { AVATARS } from '../data/curriculum';
import { playSound } from '../utils/audio';
import { Trophy, Star, Gift, Sparkles, Heart, Zap, ArrowLeft, Volume2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LevelUpModalProps {
  isOpen: boolean;
  newLevel: number;
  profile: UserProfile;
  onClose: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  isOpen,
  newLevel,
  profile,
  onClose
}) => {
  useEffect(() => {
    if (isOpen) {
      playSound.levelUp();
      try {
        confetti({
          particleCount: 120,
          spread: 100,
          origin: { y: 0.5 }
        });
        setTimeout(() => {
          confetti({
            particleCount: 60,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
          });
          confetti({
            particleCount: 60,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
          });
        }, 300);
      } catch {}
    }
  }, [isOpen, newLevel]);

  if (!isOpen) return null;

  const currentAvatar = AVATARS.find(a => a.id === profile.avatarId) || AVATARS[0];

  const getRankTitle = (lvl: number) => {
    if (lvl >= 10) return 'أسطورة المعرفة الخارقة 👑';
    if (lvl >= 7) return 'فارس العلوم المخضرم ⚔️';
    if (lvl >= 5) return 'باحث الذكاء المتألق 🌟';
    if (lvl >= 3) return 'مستكشف المعرفة الشجاع 🧭';
    return 'بطل المعرفة الواعد 🌱';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in" dir="rtl">
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-amber-400/80 rounded-3xl overflow-hidden shadow-2xl p-6 text-center text-white space-y-5">
        {/* Glow behind */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Trophy & Level Badge */}
        <div className="relative inline-block mt-2">
          <div className={`w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr ${currentAvatar.bgGradient} p-1 shadow-2xl shadow-amber-500/30 flex items-center justify-center text-5xl animate-bounce`}>
            {currentAvatar.emoji}
          </div>
          <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 px-3 py-1 rounded-full text-xs font-black border-2 border-slate-900 shadow">
            المستوى {newLevel} 🚀
          </div>
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-extrabold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ترقية مستوى بطولية! (LEVEL UP)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
            مبارك يا {profile.name}!
          </h2>
          <p className="text-sm font-bold text-amber-200/90 mt-1">
            {getRankTitle(newLevel)}
          </p>
        </div>

        {/* Level Up Rewards Gained */}
        <div className="grid grid-cols-3 gap-2.5 bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80">
          <div className="text-center p-2 rounded-xl bg-slate-900/60">
            <div className="text-amber-400 font-black text-lg">+50 💎</div>
            <div className="text-[10px] text-slate-300 font-bold">جواهر مكافأة</div>
          </div>
          <div className="text-center p-2 rounded-xl bg-slate-900/60 border-x border-slate-700/50">
            <div className="text-rose-400 font-black text-lg">+1 💖</div>
            <div className="text-[10px] text-slate-300 font-bold">طاقة قلوب</div>
          </div>
          <div className="text-center p-2 rounded-xl bg-slate-900/60">
            <div className="text-cyan-400 font-black text-lg">+100 ⚡</div>
            <div className="text-[10px] text-slate-300 font-bold">شعلة حماس</div>
          </div>
        </div>

        <p className="text-xs text-slate-300 px-2 leading-relaxed">
          أحسنت صنعاً! كل مسألة وتحدٍ تتجاوزه يجعلك أكثر ذكاءً واستعداداً للتفوق في الصف السادس الابتدائي.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
          <button
            onClick={() => {
              playSound.levelUp();
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-700 transition"
          >
            <Volume2 className="w-4 h-4" />
            <span>إعادة نغمة النصر</span>
          </button>

          <button
            onClick={() => {
              playSound.click();
              onClose();
            }}
            className="flex-1 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow-lg flex items-center justify-center gap-2 transition"
          >
            <span>متابعة التعلم والمرح</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
