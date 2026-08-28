import React, { useState } from 'react';
import { UserProfile } from '../types';
import { playSound } from '../utils/audio';
import { Target, Gift, CheckCircle2, Sparkles, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DailyChallengeProps {
  profile: UserProfile;
  onClaimReward: () => void;
}

export const DailyChallenge: React.FC<DailyChallengeProps> = ({
  profile,
  onClaimReward
}) => {
  const [claimedJustNow, setClaimedJustNow] = useState(false);
  const targetQuestions = 5;
  const currentCount = Math.min(targetQuestions, profile.stats.totalAnswered % 10);
  const isGoalDone = currentCount >= targetQuestions;
  const progressPercent = Math.round((currentCount / targetQuestions) * 100);

  const handleClaim = () => {
    playSound.dailyQuestComplete();
    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 }
      });
    } catch {}
    setClaimedJustNow(true);
    onClaimReward();
    setTimeout(() => {
      setClaimedJustNow(false);
    }, 4000);
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-700/80 rounded-3xl p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 my-4 relative overflow-hidden">
      {claimedJustNow && (
        <div className="absolute inset-0 bg-emerald-950/90 backdrop-blur-sm z-10 flex items-center justify-center gap-3 animate-fade-in text-white px-4 text-center">
          <Trophy className="w-8 h-8 text-amber-400 animate-bounce flex-shrink-0" />
          <div>
            <h4 className="text-base font-black text-emerald-300">مبارك! تم إتمام التحدي اليومي بنجاح 🌟</h4>
            <p className="text-xs text-slate-200">حصلت على +35 جوهرة و +50 نقطة خبرة لزيادة مستواك!</p>
          </div>
        </div>
      )}

      <div className="flex items-start sm:items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center text-xl font-bold shadow flex-shrink-0">
          <Target className="w-6 h-6" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm sm:text-base font-black text-white">تحدي اليوم الذكي (Daily Quest)</h4>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/30">
              +35 جوهرة 💎
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            أكمل 5 أسئلة أو تحديات اليوم لتحصل على شعلة الحماس وجواهر إضافية!
          </p>

          <div className="flex items-center gap-2 mt-2 w-48 sm:w-64">
            <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[11px] font-extrabold text-amber-400">{currentCount}/{targetQuestions}</span>
          </div>
        </div>
      </div>

      <div className="self-end sm:self-center">
        {isGoalDone ? (
          <button
            onClick={handleClaim}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-lg animate-bounce transition"
          >
            <Gift className="w-4 h-4" />
            <span>استلم المكافأة!</span>
          </button>
        ) : (
          <div className="text-[11px] font-bold text-slate-400 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>واصل التحدي</span>
          </div>
        )}
      </div>
    </div>
  );
};
