import React, { useState } from 'react';
import { UserProfile, DailyAdaptiveChallenge } from '../types';
import {
  getOrRefreshDailyChallenges,
  analyzeWeakTopics
} from '../utils/challengeGenerator';
import { DailyWeaknessPracticeModal } from './DailyWeaknessPracticeModal';
import { playSound } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Target,
  Sparkles,
  RefreshCw,
  Trophy,
  CheckCircle2,
  AlertCircle,
  Play,
  Zap,
  BookOpen,
  ChevronDown,
  ChevronUp,
  HeartHandshake
} from 'lucide-react';

interface PersonalizedDailyChallengesProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onOpenLessonReader?: (subject: any, level: number) => void;
}

export const PersonalizedDailyChallenges: React.FC<PersonalizedDailyChallengesProps> = ({
  profile,
  onUpdateProfile
}) => {
  const { challenges } = getOrRefreshDailyChallenges(profile);
  const [activeChallengeToPlay, setActiveChallengeToPlay] = useState<DailyAdaptiveChallenge | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showMistakesDrawer, setShowMistakesDrawer] = useState(false);

  const weakTopics = analyzeWeakTopics(profile);
  const completedCount = challenges.filter((c) => c.completed).length;
  const allCompleted = challenges.length > 0 && completedCount === challenges.length;

  const handleRefreshChallenges = () => {
    playSound.click();
    setIsRefreshing(true);
    const { challenges: newChallenges, updatedProfile } = getOrRefreshDailyChallenges(profile, true);
    onUpdateProfile(updatedProfile);
    setTimeout(() => {
      setIsRefreshing(false);
      playSound.starPop();
    }, 400);
  };

  const handleChallengeCompleted = (
    completedCh: DailyAdaptiveChallenge,
    _earnedXp: number,
    _earnedCoins: number,
    finalProfile: UserProfile
  ) => {
    // Update profile with the completed challenge
    const updatedChallenges = (finalProfile.dailyChallenges || challenges).map((c) =>
      c.id === completedCh.id ? completedCh : c
    );

    const updatedProfile: UserProfile = {
      ...finalProfile,
      dailyChallenges: updatedChallenges
    };

    onUpdateProfile(updatedProfile);
    setActiveChallengeToPlay(null);
  };

  const handleClaimAllBonus = () => {
    if (!allCompleted) return;
    playSound.dailyQuestComplete();
    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 }
      });
    } catch {}

    const bonusProfile: UserProfile = {
      ...profile,
      coins: profile.coins + 50,
      xp: profile.xp + 100
    };
    onUpdateProfile(bonusProfile);
  };

  return (
    <div
      id="personalized-daily-challenges-container"
      className="bg-gradient-to-b from-slate-900/90 via-slate-850 to-slate-900 border border-amber-500/30 rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden text-right my-5"
    >
      {/* Father's Encouraging Ribbon */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-700/60">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-amber-300">
          <HeartHandshake className="w-4 h-4 text-rose-400 animate-pulse" />
          <span>هدية أبي الغالي:</span>
          <span className="text-slate-300 font-normal hidden sm:inline">
            تحديات يومية ذكية تُعزز ثقتك بنفسك وتُعالج أصعب الأسئلة الوزارية!
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-xl bg-slate-800 text-amber-400 border border-slate-700">
            المنهج العراقي - السادس الابتدائي 🇮🇶
          </span>
          <button
            id="refresh-adaptive-challenges-btn"
            onClick={handleRefreshChallenges}
            disabled={isRefreshing}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 border border-slate-700 transition"
            title="تحديث وتحليل الأداء لتوليد تحديات جديدة"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 text-slate-950 flex items-center justify-center font-black shadow-lg flex-shrink-0">
            <Target className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-white">
                التحديات اليومية المخصصة (Daily Adaptive Quests)
              </h3>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {completedCount}/{challenges.length} منجز
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              تم تصميم هذه التحديات خصيصاً لك بناءً على تحليلك الدراسي ومعالجة المسائل التي أخطأت بها سابقاً.
            </p>
          </div>
        </div>

        {/* Global Challenge Progress */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl px-4 py-2.5 flex items-center gap-3 flex-shrink-0 justify-between sm:justify-start">
          <div>
            <div className="text-[11px] text-slate-400 font-bold">مكافأة إتمام اليوم</div>
            <div className="text-xs font-black text-amber-300 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>+105 جوهرة و +160 XP</span>
            </div>
          </div>

          {allCompleted ? (
            <button
              onClick={handleClaimAllBonus}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs shadow animate-bounce"
            >
              🎉 استلم الجائزة الكبرى
            </button>
          ) : (
            <div className="text-right">
              <span className="text-xs font-bold text-slate-400">
                {completedCount === 0 ? 'ابدأ أول تحدٍ' : `بقي ${challenges.length - completedCount}`}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Weak Topics Analysis Alert (if user has active unresolved mistakes) */}
      {weakTopics.length > 0 && weakTopics[0].unresolvedCount > 0 && (
        <div className="mb-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-amber-200">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>
              نظام المتابعة الذكي رصد {weakTopics.length} موضوعات تحتاج تركيزاً إضافياً، أبرزها: <strong>({weakTopics[0].topicTitleAr})</strong>.
            </span>
          </div>
          <button
            onClick={() => setShowMistakesDrawer(!showMistakesDrawer)}
            className="text-[11px] font-black text-amber-300 hover:text-white flex items-center gap-1 whitespace-nowrap bg-amber-500/20 px-2.5 py-1 rounded-xl transition"
          >
            <span>سجل الأخطاء ({profile.mistakesHistory?.filter((m) => !m.resolved).length || 0})</span>
            {showMistakesDrawer ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}

      {/* Unresolved Mistakes Drawer */}
      {showMistakesDrawer && profile.mistakesHistory && profile.mistakesHistory.length > 0 && (
        <div className="mb-4 p-4 rounded-2xl bg-slate-800/90 border border-slate-700 animate-fade-in space-y-2">
          <h4 className="text-xs font-black text-white flex items-center gap-1.5 mb-2">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>الأسئلة التي تحتاج مراجعة وإتقان لتجنب تكرار الخطأ:</span>
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {profile.mistakesHistory.map((m, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 ${
                  m.resolved
                    ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                    : 'bg-rose-950/20 border-rose-800/40 text-slate-200'
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-300">{m.topicTitleAr}:</span>
                    <span className="line-clamp-1">{m.questionText}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    إجابتك: <span className="text-rose-300">{m.selectedAnswer}</span> | الإجابة الصحيحة: <span className="text-emerald-300 font-bold">{m.correctAnswer}</span>
                  </div>
                </div>
                <div>
                  {m.resolved ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300">
                      تم تصحيحها ✓
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300">
                      قيد المعالجة
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3 Interactive Challenge Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {challenges.map((challenge, idx) => {
          const isDone = challenge.completed || challenge.currentCount >= challenge.targetCount;
          const progress = Math.min(100, Math.round((challenge.currentCount / challenge.targetCount) * 100));

          return (
            <div
              key={challenge.id || idx}
              className={`rounded-2xl p-4 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                isDone
                  ? 'bg-emerald-950/20 border-emerald-500/40 shadow-lg shadow-emerald-900/10'
                  : challenge.type === 'weakness_fix'
                  ? 'bg-gradient-to-b from-amber-950/30 to-slate-900 border-amber-500/50 hover:border-amber-400 shadow-md'
                  : 'bg-slate-800/80 border-slate-700/80 hover:border-slate-600'
              }`}
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                      challenge.type === 'weakness_fix'
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                        : challenge.type === 'concept_mastery'
                        ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/40'
                        : 'bg-blue-400/20 text-blue-300 border border-blue-400/40'
                    }`}
                  >
                    {challenge.type === 'weakness_fix'
                      ? '🎯 علاج نقطة ضعف'
                      : challenge.type === 'concept_mastery'
                      ? '⭐ إتقان وزاري'
                      : '🚀 تدريب بكالوريا'}
                  </span>

                  <div className="text-xs font-black text-amber-400 flex items-center gap-1">
                    <span>+{challenge.rewardCoins} 💎</span>
                    <span className="text-slate-400">+{challenge.rewardXp} XP</span>
                  </div>
                </div>

                <h4 className="text-sm font-black text-white line-clamp-1 mb-1">
                  {challenge.title}
                </h4>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-2.5">
                  {challenge.description}
                </p>
              </div>

              {/* Progress and Action Button */}
              <div className="space-y-3 pt-2 border-t border-slate-700/60 mt-1">
                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1">
                    <span>التقدم</span>
                    <span className="text-amber-400">
                      {challenge.currentCount}/{challenge.targetCount}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/60">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        isDone
                          ? 'bg-emerald-400'
                          : 'bg-gradient-to-r from-amber-400 to-orange-500'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Button */}
                {isDone ? (
                  <div className="w-full py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black flex items-center justify-center gap-1.5 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>تم الإنجاز بنجاح!</span>
                  </div>
                ) : (
                  <button
                    id={`start-adaptive-challenge-btn-${idx}`}
                    onClick={() => {
                      playSound.click();
                      setActiveChallengeToPlay(challenge);
                    }}
                    className={`w-full py-2 px-3 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition shadow active:scale-95 ${
                      challenge.type === 'weakness_fix'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-amber-500/20'
                        : 'bg-slate-700 hover:bg-slate-600 text-white'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>ابدأ تمرين التقوية الآن</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Direct Interactive Practice Modal */}
      <DailyWeaknessPracticeModal
        isOpen={!!activeChallengeToPlay}
        onClose={() => setActiveChallengeToPlay(null)}
        challenge={activeChallengeToPlay}
        profile={profile}
        onChallengeCompleted={handleChallengeCompleted}
      />
    </div>
  );
};
