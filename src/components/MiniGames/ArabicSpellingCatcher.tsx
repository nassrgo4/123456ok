import React, { useState } from 'react';
import { ARABIC_CATCHER_ITEMS } from '../../data/curriculum';
import { playSound } from '../../utils/audio';
import { UserProfile } from '../../types';
import { Feather, ArrowRight, CheckCircle2, XCircle, RefreshCw, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ArabicSpellingCatcherProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onClose: () => void;
}

export const ArabicSpellingCatcher: React.FC<ArabicSpellingCatcherProps> = ({
  profile,
  onUpdateProfile,
  onClose
}) => {
  const [items, setItems] = useState(ARABIC_CATCHER_ITEMS);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; reason: string } | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentItem = items[currentIdx];

  const handleClassify = (chosenType: 'قطع' | 'وصل') => {
    if (feedback || isFinished) return;

    const isCorrect = chosenType === currentItem.type;

    if (isCorrect) {
      playSound.correct();
      setScore(s => s + 15);
      setFeedback({ isCorrect: true, reason: currentItem.reason });
    } else {
      playSound.wrong();
      setFeedback({ isCorrect: false, reason: currentItem.reason });
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIdx + 1 < items.length) {
        setCurrentIdx(idx => idx + 1);
      } else {
        handleEndGame();
      }
    }, 1800);
  };

  const handleEndGame = () => {
    setIsFinished(true);
    playSound.victory();
    try {
      confetti({ particleCount: 50, spread: 60 });
    } catch {}

    onUpdateProfile({
      ...profile,
      xp: profile.xp + 40,
      coins: profile.coins + 15,
      stats: {
        ...profile.stats,
        grammarCatchScore: Math.max(profile.stats.grammarCatchScore || 0, score + 15)
      }
    });
  };

  const restart = () => {
    setItems([...ARABIC_CATCHER_ITEMS].sort(() => Math.random() - 0.5));
    setCurrentIdx(0);
    setScore(0);
    setFeedback(null);
    setIsFinished(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 text-white max-w-2xl mx-auto shadow-2xl">
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
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Feather className="w-5 h-5" />
          </div>
          <h2 className="text-base sm:text-lg font-black text-emerald-400">
            صياد الهمزات وقواعد الضاد
          </h2>
        </div>

        <div className="text-xs font-bold text-amber-300 bg-slate-800 px-2.5 py-1 rounded-xl">
          النقاط: {score}
        </div>
      </div>

      {!isFinished ? (
        <div className="space-y-6">
          <div className="flex justify-between text-xs font-bold text-slate-400">
            <span>الكلمة {currentIdx + 1} من {items.length}</span>
            <span>حدد نوع الهمزة في بداية الكلمة</span>
          </div>

          {/* Word Display Box */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-800 to-slate-850 border border-slate-700 text-center shadow-lg">
            <div className="text-xs text-emerald-300 font-bold mb-2">صنّف هذه الكلمة:</div>
            <div className="text-4xl sm:text-5xl font-black text-white tracking-widest my-2">
              {currentItem.word}
            </div>
          </div>

          {/* Classification Options */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleClassify('قطع')}
              disabled={!!feedback}
              className="py-5 px-4 rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-700 hover:from-teal-500 hover:to-emerald-600 border border-teal-500 text-white font-black text-lg sm:text-xl shadow-lg transition active:scale-95 flex flex-col items-center gap-1"
            >
              <span>همزة قطع (أ / إ / أُ)</span>
              <span className="text-xs text-emerald-200 font-normal">تُرسم وتُنطق</span>
            </button>

            <button
              onClick={() => handleClassify('وصل')}
              disabled={!!feedback}
              className="py-5 px-4 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-700 hover:from-indigo-500 hover:to-blue-600 border border-indigo-500 text-white font-black text-lg sm:text-xl shadow-lg transition active:scale-95 flex flex-col items-center gap-1"
            >
              <span>همزة وصل (ا)</span>
              <span className="text-xs text-blue-200 font-normal">تُنطق في البدء وتسقط وصلاً</span>
            </button>
          </div>

          {/* Feedback reasoning banner */}
          {feedback && (
            <div
              className={`p-4 rounded-2xl border text-sm font-bold flex items-start gap-3 animate-fade-in ${
                feedback.isCorrect
                  ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                  : 'bg-rose-950/70 border-rose-500 text-rose-200'
              }`}
            >
              {feedback.isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <div className="font-extrabold mb-0.5">
                  {feedback.isCorrect ? 'ممتاز! إجابة صحيحة' : 'انتبه للقاعدة:'}
                </div>
                <div className="text-xs font-normal opacity-90">{feedback.reason}</div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-6 space-y-4 animate-fade-in">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl">
            🏆
          </div>
          <h3 className="text-2xl font-black text-white">أحسنت يا فارس لغة الضاد!</h3>
          <p className="text-sm text-slate-300">
            مجموع نقاطك في تصنيف الهمزات: <span className="font-black text-amber-400 text-lg">{score} نقطة</span>
          </p>

          <div className="flex gap-3 justify-center pt-2">
            <button
              onClick={restart}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-sm flex items-center gap-1.5 shadow transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span>إعادة اللعبة</span>
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
