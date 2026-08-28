import React from 'react';
import { UserProfile } from '../types';
import { playSound } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Crown,
  Sparkles,
  Flame,
  Trophy,
  CheckCircle2,
  HeartHandshake
} from 'lucide-react';

interface SevenDayCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onClaim7DayBonus: () => void;
}

export const SevenDayCelebrationModal: React.FC<SevenDayCelebrationModalProps> = ({
  isOpen,
  onClose,
  profile,
  onClaim7DayBonus
}) => {
  if (!isOpen) return null;

  const handleClaim = () => {
    playSound.victory();
    try {
      confetti({
        particleCount: 180,
        spread: 100,
        origin: { y: 0.4 },
        colors: ['#f59e0b', '#fbbf24', '#10b981', '#6366f1', '#ec4899']
      });
    } catch {}
    onClaim7DayBonus();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in text-right">
      <div className="bg-gradient-to-b from-slate-900 via-slate-850 to-slate-950 border-2 border-amber-400/80 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative text-white p-6 sm:p-8 space-y-6">
        {/* Glow ambient background */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Badge */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Animated Radiant Rings */}
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur opacity-60 animate-pulse" />
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-orange-500 text-slate-950 flex items-center justify-center shadow-2xl border-4 border-yellow-200 animate-bounce">
              <Crown className="w-12 h-12 sm:w-14 sm:h-14 text-slate-950 fill-slate-950" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-rose-500 text-white p-1.5 rounded-full border-2 border-slate-900 shadow">
              <Flame className="w-5 h-5 fill-white" />
            </div>
          </div>
        </div>

        {/* Text Details */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-black">
            <Sparkles className="w-3.5 h-3.5" />
            <span>وسام أسبوع العباقرة الذهبي (7 أيام متتالية)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-300">
            مبارك يا بطل العراق! 🌟
          </h2>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
            يا <strong className="text-amber-300">{profile.name}</strong>، لقد أثبت أنك تمتلك عزيمة الأبطال ودرست لـ <strong className="text-amber-400">7 أيام متتالية</strong> دون انقطاع!
          </p>
        </div>

        {/* 7 Days Visual Chain */}
        <div className="p-3.5 rounded-2xl bg-slate-800/90 border border-slate-700/80">
          <div className="text-xs font-bold text-slate-400 mb-2 flex items-center justify-between">
            <span>سلسلة الـ 7 أيام الذهبية:</span>
            <span className="text-emerald-400 font-extrabold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> مكتملة 100%
            </span>
          </div>

          <div className="grid grid-cols-7 gap-1.5 text-center">
            {['يوم 1', 'يوم 2', 'يوم 3', 'يوم 4', 'يوم 5', 'يوم 6', 'يوم 7 👑'].map((day, idx) => (
              <div
                key={idx}
                className="p-1.5 sm:p-2 rounded-xl bg-gradient-to-b from-amber-500/30 to-amber-600/10 border border-amber-400/50 flex flex-col items-center justify-center gap-1"
              >
                <div className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-[10px] font-black">
                  ✓
                </div>
                <span className="text-[10px] font-extrabold text-amber-200">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reward Box */}
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-400/40">
            <div className="text-xs text-amber-300 font-bold">جواهر التاج الذهبي</div>
            <div className="text-xl font-black text-amber-400 mt-0.5 flex items-center justify-center gap-1">
              <span>+100</span>
              <span>💎</span>
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-indigo-500/15 border border-indigo-400/40">
            <div className="text-xs text-indigo-300 font-bold">نقاط الخبرة (XP)</div>
            <div className="text-xl font-black text-indigo-300 mt-0.5 flex items-center justify-center gap-1">
              <span>+200</span>
              <span>XP</span>
            </div>
          </div>
        </div>

        {/* Father's message */}
        <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-2.5 text-xs text-slate-300">
          <HeartHandshake className="w-5 h-5 text-rose-400 flex-shrink-0" />
          <span>
            <strong>رسالة من أبي الغالي:</strong> "فخور بك وبإصرارك يا بني.. الاستمرار هو سر التفوق في امتحانات السادس الابتدائي الوزارية!"
          </span>
        </div>

        {/* Action Button */}
        <button
          id="claim-7day-celebration-button"
          onClick={handleClaim}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-base shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition active:scale-95"
        >
          <Trophy className="w-5 h-5" />
          <span>استلم وسام الـ 7 أيام والمكافأة الكبرى!</span>
        </button>
      </div>
    </div>
  );
};
