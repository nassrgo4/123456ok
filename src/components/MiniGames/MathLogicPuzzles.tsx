import React, { useState } from 'react';
import { MATH_LOGIC_PUZZLES, MathLogicPuzzle } from '../../data/curriculum';
import { playSound } from '../../utils/audio';
import { UserProfile } from '../../types';
import { Scale, ArrowRight, CheckCircle2, XCircle, Lightbulb, Trophy, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MathLogicPuzzlesProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onClose: () => void;
}

export const MathLogicPuzzles: React.FC<MathLogicPuzzlesProps> = ({
  profile,
  onUpdateProfile,
  onClose
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentPuzzle = MATH_LOGIC_PUZZLES[currentIdx];

  const handleSelectOption = (opt: string | number) => {
    if (feedback) return;
    setSelectedAnswer(opt);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null || !currentPuzzle) return;

    const isCorrect = String(selectedAnswer) === String(currentPuzzle.answer);

    if (isCorrect) {
      playSound.correct();
      setScore(s => s + 30);
      setFeedback({
        isCorrect: true,
        text: `إجابة عبقرية وصحيحة 100%! ${currentPuzzle.explanationAr}`
      });
      try {
        confetti({ particleCount: 50, spread: 60 });
      } catch {}

      setTimeout(() => {
        if (currentIdx + 1 < MATH_LOGIC_PUZZLES.length) {
          setCurrentIdx(i => i + 1);
          setSelectedAnswer(null);
          setFeedback(null);
          setShowHint(false);
        } else {
          handleFinishGame();
        }
      }, 2300);
    } else {
      playSound.wrong();
      setFeedback({
        isCorrect: false,
        text: `فكر مجدداً يا بطل! ${currentPuzzle.hint}`
      });
    }
  };

  const handleFinishGame = () => {
    setIsFinished(true);
    playSound.victory();
    try {
      confetti({ particleCount: 80, spread: 90 });
    } catch {}

    onUpdateProfile({
      ...profile,
      xp: profile.xp + 75,
      coins: profile.coins + 30,
      stats: {
        ...profile.stats,
        mathScore: Math.min(100, (profile.stats.mathScore || 85) + 3),
        totalCorrect: profile.stats.totalCorrect + MATH_LOGIC_PUZZLES.length,
        totalAnswered: profile.stats.totalAnswered + MATH_LOGIC_PUZZLES.length
      }
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 text-white max-w-2xl mx-auto shadow-2xl animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-800">
        <button
          onClick={onClose}
          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1"
        >
          <ArrowRight className="w-4 h-4" />
          <span>رجوع للألعاب</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Scale className="w-5 h-5" />
          </div>
          <h2 className="text-base sm:text-lg font-black text-amber-400">
            ميزان المعادلات وألغاز الذكاء
          </h2>
        </div>

        <div className="text-xs font-bold text-amber-300 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>النقاط: {score}</span>
        </div>
      </div>

      {!isFinished && currentPuzzle ? (
        <div className="space-y-5">
          {/* Progress */}
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span>اللغز {currentIdx + 1} من {MATH_LOGIC_PUZZLES.length}</span>
            <span className="text-amber-300">{currentPuzzle.title}</span>
          </div>

          {/* Visual Scale / Graphic Display */}
          {currentPuzzle.visualGraphic && (
            <div className="bg-gradient-to-r from-amber-950/60 to-orange-950/60 p-4 rounded-2xl border border-amber-600/40 text-center space-y-3 shadow-inner">
              <div className="text-xs font-extrabold text-amber-300">ميزان المعادلات البصرية:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-900/90 rounded-xl border border-amber-500/30 font-black text-base sm:text-lg text-white">
                  {currentPuzzle.visualGraphic.leftSide}
                </div>
                <div className="p-3 bg-slate-900/90 rounded-xl border border-amber-500/30 font-black text-base sm:text-lg text-white">
                  {currentPuzzle.visualGraphic.rightSide}
                </div>
              </div>
              <div className="text-xs font-bold text-slate-300 flex items-center justify-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-yellow-400" />
                <span>{currentPuzzle.visualGraphic.clue}</span>
              </div>
            </div>
          )}

          {/* Riddle / Question Text */}
          <div className="p-5 rounded-2xl bg-slate-850 border border-slate-700 shadow-md">
            <h3 className="text-base sm:text-lg font-black text-white leading-relaxed">
              {currentPuzzle.questionAr}
            </h3>
          </div>

          {/* Options */}
          <div>
            <div className="text-xs font-bold text-slate-300 mb-2">اختر الإجابة الرياضية الصحيحة:</div>
            <div className="grid grid-cols-2 gap-3">
              {currentPuzzle.options.map((opt, idx) => {
                const isSelected = selectedAnswer === opt;
                return (
                  <button
                    key={idx}
                    disabled={!!feedback}
                    onClick={() => handleSelectOption(opt)}
                    className={`p-4 rounded-2xl font-black text-base sm:text-lg transition shadow active:scale-95 text-center ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 ring-4 ring-amber-300 scale-[1.02]'
                        : 'bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-amber-400 text-white'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hint button & Box */}
          <div>
            {!showHint ? (
              <button
                onClick={() => {
                  playSound.click();
                  setShowHint(true);
                }}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>أحتاج تلميحاً ذكياً</span>
              </button>
            ) : (
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-700/50 text-xs font-bold text-amber-200 animate-fade-in flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{currentPuzzle.hint}</span>
              </div>
            )}
          </div>

          {/* Feedback */}
          {feedback && (
            <div
              className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-bold flex items-start gap-2.5 animate-fade-in ${
                feedback.isCorrect
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                  : 'bg-rose-950/80 border-rose-500 text-rose-200'
              }`}
            >
              {feedback.isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
              )}
              <div>{feedback.text}</div>
            </div>
          )}

          {/* Submit Action */}
          <div className="pt-2">
            <button
              onClick={handleCheckAnswer}
              disabled={selectedAnswer === null || !!feedback}
              className={`w-full py-3.5 rounded-2xl font-black text-sm transition shadow-lg flex items-center justify-center gap-2 ${
                selectedAnswer !== null && !feedback
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 hover:scale-[1.02]'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>تأكيد الإجابة وحل اللغز</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-6 space-y-4 animate-fade-in">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-4xl shadow-xl">
            🧠
          </div>
          <h3 className="text-2xl font-black text-white">عبقري الألغاز والرياضيات!</h3>
          <p className="text-sm text-slate-300">
            لقد حللت معادلات الميزان والأنماط الهندسية بكل ذكاء واحتراف! مجموع النقاط: <span className="font-black text-amber-400 text-lg">{score}</span>
          </p>

          <div className="flex gap-3 justify-center pt-2">
            <button
              onClick={() => {
                setCurrentIdx(0);
                setSelectedAnswer(null);
                setScore(0);
                setIsFinished(false);
              }}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-sm flex items-center gap-1.5 shadow transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>حل الألغاز من جديد</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-bold border border-slate-700"
            >
              خروج
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
