import React, { useState } from 'react';
import { DailyAdaptiveChallenge, Question, UserProfile } from '../types';
import { getQuestionsForDailyChallenge, recordMistakeInProfile, recordSuccessInProfile } from '../utils/challengeGenerator';
import { playSound, speakText } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  X,
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Trophy,
  ArrowLeft,
  BookOpen,
  Zap,
  Target
} from 'lucide-react';

interface DailyWeaknessPracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  challenge: DailyAdaptiveChallenge | null;
  profile: UserProfile;
  onChallengeCompleted: (challenge: DailyAdaptiveChallenge, earnedXp: number, earnedCoins: number, updatedProfile: UserProfile) => void;
}

export const DailyWeaknessPracticeModal: React.FC<DailyWeaknessPracticeModalProps> = ({
  isOpen,
  onClose,
  challenge,
  profile,
  onChallengeCompleted
}) => {
  if (!isOpen || !challenge) return null;

  const questions: Question[] = getQuestionsForDailyChallenge(challenge);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<UserProfile>(profile);

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (opt: string) => {
    if (isAnswerSubmitted) return;
    playSound.click();
    setSelectedOption(opt);
  };

  const handleConfirmAnswer = () => {
    if (!selectedOption || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentQ.correctAnswer;

    if (isCorrect) {
      playSound.correct();
      setCorrectCount((prev) => prev + 1);
      const updated = recordSuccessInProfile(currentProfile, currentQ);
      setCurrentProfile(updated);
    } else {
      playSound.wrong();
      const updated = recordMistakeInProfile(currentProfile, currentQ, selectedOption);
      setCurrentProfile(updated);
    }
  };

  const handleNext = () => {
    playSound.click();
    setShowHint(false);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Finished all questions in this challenge
      setIsFinished(true);
      playSound.victory();
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch {}

      // Calculate rewards
      const totalEarnedXp = challenge.rewardXp + correctCount * 10;
      const totalEarnedCoins = challenge.rewardCoins + correctCount * 5;

      // Update completed state in challenge
      const updatedChallenge: DailyAdaptiveChallenge = {
        ...challenge,
        currentCount: challenge.targetCount,
        completed: true
      };

      const finalProfile: UserProfile = {
        ...currentProfile,
        xp: currentProfile.xp + totalEarnedXp,
        coins: currentProfile.coins + totalEarnedCoins,
        stats: {
          ...currentProfile.stats,
          totalCorrect: currentProfile.stats.totalCorrect + correctCount,
          totalAnswered: currentProfile.stats.totalAnswered + questions.length
        }
      };

      onChallengeCompleted(updatedChallenge, totalEarnedXp, totalEarnedCoins, finalProfile);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in text-right">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-850 via-slate-800 to-slate-850 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow font-bold text-slate-950 ${
              challenge.type === 'weakness_fix'
                ? 'bg-gradient-to-br from-amber-400 to-orange-500'
                : challenge.type === 'concept_mastery'
                ? 'bg-gradient-to-br from-emerald-400 to-teal-500'
                : 'bg-gradient-to-br from-blue-400 to-indigo-500'
            }`}>
              <Target className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {challenge.type === 'weakness_fix' ? '🎯 تقوية نقطة ضعف' : challenge.type === 'concept_mastery' ? '⭐ إتقان وزاري' : '🚀 تدريب بكالوريا'}
                </span>
                <span className="text-xs text-slate-400 font-bold">
                  {challenge.subject === 'math' ? 'الرياضيات' : challenge.subject === 'arabic' ? 'قواعد اللغة العربية' : 'English for Iraq'}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
                {challenge.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              playSound.click();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {!isFinished ? (
            <>
              {/* Progress and Subject Tag */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 font-black">السؤال {currentIndex + 1}</span>
                  <span>من {questions.length}</span>
                </div>
                <div className="text-[11px] text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                  {challenge.reason}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/60">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300 rounded-full"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/80 border border-slate-700 shadow-inner">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <span className="text-[11px] font-bold text-amber-300/90 block mb-1">
                      {currentQ.topicTitleAr}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                      {currentQ.question}
                    </h4>
                  </div>
                  <button
                    onClick={() => {
                      speakText(currentQ.question, currentQ.subject === 'english' ? 'en' : 'ar');
                    }}
                    className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-amber-400 flex-shrink-0 transition"
                    title="استمع للسؤال بصوت واضح"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {currentQ.hint && (
                  <div className="mt-3 pt-3 border-t border-slate-700/60 flex items-center justify-between">
                    {showHint ? (
                      <p className="text-xs text-amber-300 font-medium flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>💡 تلميح: {currentQ.hint}</span>
                      </p>
                    ) : (
                      <button
                        onClick={() => setShowHint(true)}
                        className="text-xs text-slate-400 hover:text-amber-300 font-bold flex items-center gap-1 transition"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>إظهار تلميح توجيهي</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === opt;
                  const isCorrect = opt === currentQ.correctAnswer;

                  let btnStyle = 'bg-slate-800/90 hover:bg-slate-750 text-slate-200 border-slate-700';

                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-600/30 text-emerald-300 border-emerald-500 ring-2 ring-emerald-500/40';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-600/30 text-rose-300 border-rose-500 ring-2 ring-rose-500/40';
                    } else {
                      btnStyle = 'bg-slate-850/50 text-slate-500 border-slate-800';
                    }
                  } else if (isSelected) {
                    btnStyle = 'bg-amber-500/20 text-amber-300 border-amber-400 ring-2 ring-amber-400/40';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt)}
                      disabled={isAnswerSubmitted}
                      className={`p-3.5 rounded-2xl border text-sm sm:text-base font-bold text-right transition flex items-center justify-between gap-2 shadow-sm ${btnStyle}`}
                    >
                      <span className="flex-1">{opt}</span>
                      {isAnswerSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
                      {isAnswerSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation on submit */}
              {isAnswerSubmitted && (
                <div className={`p-3.5 rounded-2xl border text-xs sm:text-sm animate-fade-in ${
                  selectedOption === currentQ.correctAnswer
                    ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-800 text-rose-200'
                }`}>
                  <div className="font-bold mb-1 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    <span>توضيح القاعدة والشرح النموذجي:</span>
                  </div>
                  <p className="leading-relaxed">{currentQ.explanation}</p>
                </div>
              )}
            </>
          ) : (
            /* Finished Victory View */
            <div className="text-center py-6 space-y-4 animate-scale-up">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 mx-auto flex items-center justify-center shadow-xl animate-bounce">
                <Trophy className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  أحسنت يا بطل! تم إنجاز التحدي بنجاح 🌟
                </h3>
                <p className="text-sm text-slate-300 mt-1">
                  لقد حولت نقطة الضعف إلى نقطة قوة وفهمت قاعدة ({challenge.title}) بتفوق!
                </p>
              </div>

              {/* Rewards Box */}
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 max-w-sm mx-auto grid grid-cols-2 gap-3 text-center">
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                  <div className="text-xs text-amber-300 font-bold">نقاط الخبرة (XP)</div>
                  <div className="text-lg font-black text-amber-400 mt-0.5">+{challenge.rewardXp + correctCount * 10}</div>
                </div>
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                  <div className="text-xs text-emerald-300 font-bold">الجواهر المكتسبة</div>
                  <div className="text-lg font-black text-emerald-400 mt-0.5">+{challenge.rewardCoins + correctCount * 5} 💎</div>
                </div>
              </div>

              <p className="text-xs text-emerald-400 font-bold">
                ✓ تم تحديث سجلك التعليمي ومعالجة المفاهيم السابقة بنجاح
              </p>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-850 border-t border-slate-700/80 flex items-center justify-between gap-3">
          {!isFinished ? (
            <>
              <div className="text-xs text-slate-400 font-bold flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>مكافأة الإتمام: +{challenge.rewardCoins} جوهرة 💎</span>
              </div>

              {!isAnswerSubmitted ? (
                <button
                  onClick={handleConfirmAnswer}
                  disabled={!selectedOption}
                  className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 shadow transition ${
                    selectedOption
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-amber-500/20'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <span>تأكيد الإجابة</span>
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow transition"
                >
                  <span>{currentIndex + 1 < questions.length ? 'السؤال التالي' : 'عرض النتيجة والمكافأة'}</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
            </>
          ) : (
            <button
              onClick={() => {
                playSound.click();
                onClose();
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow transition"
            >
              العودة للواجهة الرئيسية والاستمرار في المغامرة
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
