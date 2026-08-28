import React from 'react';
import { UserProfile } from '../types';
import { BADGES } from '../data/curriculum';
import { playSound } from '../utils/audio';
import { Award, X, Star, Lock, CheckCircle2, Flame, Zap, Footprints, BookOpen, Calculator, Sparkles, Volume2, Crown, Shield } from 'lucide-react';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  onClose,
  profile
}) => {
  if (!isOpen) return null;

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Footprints': return <Footprints className="w-6 h-6" />;
      case 'Calculator': return <Calculator className="w-6 h-6" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'Zap': return <Zap className="w-6 h-6" />;
      case 'Volume2': return <Volume2 className="w-6 h-6" />;
      case 'Flame': return <Flame className="w-6 h-6" />;
      case 'Crown': return <Crown className="w-6 h-6" />;
      case 'Shield': return <Shield className="w-6 h-6" />;
      default: return <Award className="w-6 h-6" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl p-5 sm:p-6 text-white space-y-5 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-2xl bg-amber-500/20 text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">قاعة الأوسمة والإنجازات</h2>
              <div className="text-xs text-slate-400">أوسمة الفخر والشرف لطلاب الصف السادس</div>
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

        {/* Badges List */}
        <div className="overflow-y-auto space-y-3 flex-1 pr-1">
          {BADGES.map((badge) => {
            // Check unlock criteria
            let isUnlocked = profile.unlockedBadges.includes(badge.id);

            // Dynamic condition checks
            if (badge.id === 'math_master') {
              const stars = Object.entries(profile.starsEarned)
                .filter(([k]) => k.startsWith('math'))
                .reduce((acc: number, [, val]) => acc + Number(val), 0);
              if (stars >= 5) isUnlocked = true;
            } else if (badge.id === 'arabic_scholar') {
              const stars = Object.entries(profile.starsEarned)
                .filter(([k]) => k.startsWith('arabic'))
                .reduce((acc: number, [, val]) => acc + Number(val), 0);
              if (stars >= 5) isUnlocked = true;
            } else if (badge.id === 'english_star') {
              const stars = Object.entries(profile.starsEarned)
                .filter(([k]) => k.startsWith('english'))
                .reduce((acc: number, [, val]) => acc + Number(val), 0);
              if (stars >= 5) isUnlocked = true;
            } else if (badge.id === 'speed_demon') {
              if ((profile.stats.highScoreSpeedMath || 0) >= 100) isUnlocked = true;
            } else if (badge.id === 'spelling_bee') {
              if ((profile.stats.completedSpellingBee || 0) >= 5) isUnlocked = true;
            } else if (badge.id === 'streak_3') {
              if ((profile.streakDays || 1) >= 3) isUnlocked = true;
            } else if (badge.id === 'streak_7') {
              if ((profile.streakDays || 1) >= 7) isUnlocked = true;
            } else if (badge.id === 'streak_14') {
              if ((profile.streakDays || 1) >= 14) isUnlocked = true;
            } else if (badge.id === 'streak_30') {
              if ((profile.streakDays || 1) >= 30) isUnlocked = true;
            }

            return (
              <div
                key={badge.id}
                onClick={() => {
                  if (isUnlocked) {
                    playSound.badgeUnlock();
                  } else {
                    playSound.click();
                  }
                }}
                className={`p-4 rounded-2xl border transition flex items-center justify-between gap-3 cursor-pointer select-none ${
                  isUnlocked
                    ? 'bg-slate-800/90 hover:bg-slate-800 border-amber-400/50 shadow-md hover:scale-[1.01]'
                    : 'bg-slate-850/50 hover:bg-slate-850/70 border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg flex-shrink-0 shadow ${
                      isUnlocked
                        ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 shadow-amber-500/20'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {getBadgeIcon(badge.icon)}
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-black text-white">{badge.title}</h4>
                      {isUnlocked && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold border border-emerald-500/30">
                          مكتمل ✓
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">{badge.description}</p>
                  </div>
                </div>

                <div>
                  {isUnlocked ? (
                    <CheckCircle2 className="w-6 h-6 text-amber-400 flex-shrink-0" />
                  ) : (
                    <Lock className="w-5 h-5 text-slate-600 flex-shrink-0" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
