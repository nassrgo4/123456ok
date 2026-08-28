import React, { useState } from 'react';
import { ARABIC_ROOT_ITEMS, ArabicRootItem } from '../../data/curriculum';
import { playSound } from '../../utils/audio';
import { UserProfile } from '../../types';
import { Sparkles, ArrowRight, CheckCircle2, XCircle, RotateCcw, Award, Lightbulb, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ArabicWordBuilderProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onClose: () => void;
}

export const ArabicWordBuilder: React.FC<ArabicWordBuilderProps> = ({
  profile,
  onUpdateProfile,
  onClose
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<{ letter: string; id: number }[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentItem = ARABIC_ROOT_ITEMS[currentIdx];

  React.useEffect(() => {
    if (!currentItem) return;
    const mapped = currentItem.scrambledLetters.map((l, i) => ({
      letter: l,
      id: i + 1
    }));
    setAvailableLetters([...mapped].sort(() => Math.random() - 0.5));
    setSelectedLetters([]);
    setFeedback(null);
  }, [currentIdx]);

  const handlePickLetter = (item: { letter: string; id: number }) => {
    if (feedback) return;
    playSound.click();
    setSelectedLetters(prev => [...prev, item.letter]);
    setAvailableLetters(prev => prev.filter(l => l.id !== item.id));
  };

  const handleRemoveLetter = (index: number) => {
    if (feedback) return;
    playSound.click();
    const removedLetter = selectedLetters[index];
    setSelectedLetters(prev => prev.filter((_, i) => i !== index));
    setAvailableLetters(prev => [
      ...prev,
      { letter: removedLetter, id: Date.now() + Math.random() }
    ]);
  };

  const handleCheckWord = () => {
    const constructed = selectedLetters.join('').replace(/ـ/g, '').trim();
    const targetClean = currentItem.targetWord.replace(/[َُِّْ]/g, '').replace(/ـ/g, '');
    const constructedClean = constructed.replace(/[َُِّْ]/g, '');

    const isMatch = constructed === currentItem.targetWord || constructedClean === targetClean;

    if (isMatch) {
      playSound.correct();
      setScore(s => s + 25);
      setFeedback({ isCorrect: true, text: `رائع جداً! صغت ${currentItem.targetWord} بنجاح. ${currentItem.explanation}` });
      try {
        confetti({ particleCount: 40, spread: 50 });
      } catch {}

      setTimeout(() => {
        if (currentIdx + 1 < ARABIC_ROOT_ITEMS.length) {
          setCurrentIdx(i => i + 1);
        } else {
          handleFinishGame();
        }
      }, 2000);
    } else {
      playSound.wrong();
      setFeedback({
        isCorrect: false,
        text: `حاول ثانية يا بطل! الكلمة المستهدفة هي (${currentItem.targetWord}) على وزن ${currentItem.targetPattern}.`
      });
    }
  };

  const handleFinishGame = () => {
    setIsFinished(true);
    playSound.victory();
    try {
      confetti({ particleCount: 70, spread: 80 });
    } catch {}

    onUpdateProfile({
      ...profile,
      xp: profile.xp + 60,
      coins: profile.coins + 25,
      stats: {
        ...profile.stats,
        arabicScore: Math.min(100, (profile.stats.arabicScore || 85) + 3),
        totalCorrect: profile.stats.totalCorrect + ARABIC_ROOT_ITEMS.length,
        totalAnswered: profile.stats.totalAnswered + ARABIC_ROOT_ITEMS.length
      }
    });
  };

  const handleResetCurrent = () => {
    const mapped = currentItem.scrambledLetters.map((l, i) => ({ letter: l, id: i + 1 }));
    setAvailableLetters([...mapped].sort(() => Math.random() - 0.5));
    setSelectedLetters([]);
    setFeedback(null);
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
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-base sm:text-lg font-black text-emerald-400">
            باني الكلمات واشتقاق الجذور
          </h2>
        </div>

        <div className="text-xs font-bold text-amber-300 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>النقاط: {score}</span>
        </div>
      </div>

      {!isFinished && currentItem ? (
        <div className="space-y-5">
          {/* Progress Indicator */}
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span>التحدي {currentIdx + 1} من {ARABIC_ROOT_ITEMS.length}</span>
            <span>بناء المشتقات اللغوية للصف السادس</span>
          </div>

          {/* Root Card & Clue */}
          <div className="bg-gradient-to-br from-emerald-950/80 to-slate-850 p-5 rounded-3xl border border-emerald-700/60 shadow-lg text-center space-y-2">
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold border border-emerald-500/40">
              {currentItem.rootTitle}
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-widest my-1">
              {currentItem.root}
            </div>
            <p className="text-xs sm:text-sm text-slate-300">{currentItem.meaning}</p>
            
            <div className="pt-2 border-t border-emerald-800/40 flex items-center justify-center gap-2 text-xs font-extrabold text-amber-300">
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              <span>المطلوب صياغة: <strong className="text-white underline">{currentItem.targetPattern}</strong></span>
            </div>
          </div>

          {/* Selected Construction Workspace */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-center">
            <div className="text-xs font-bold text-slate-400 mb-2">اضغط على المقاطع بالترتيب لتكوين الكلمة:</div>
            
            <div className="min-h-[60px] flex items-center justify-center flex-wrap gap-2 p-2 bg-slate-900 rounded-xl border border-slate-700">
              {selectedLetters.length === 0 ? (
                <span className="text-xs text-slate-500 italic">المقاطع المختارة ستظهر هنا...</span>
              ) : (
                selectedLetters.map((l, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleRemoveLetter(idx)}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-b from-emerald-600 to-teal-700 hover:from-rose-600 hover:to-rose-700 text-white font-black text-xl shadow active:scale-95 transition"
                    title="اضغط لإلغاء هذا المقطع"
                  >
                    {l}
                  </button>
                ))
              )}
            </div>

            {selectedLetters.length > 0 && (
              <div className="mt-2 text-sm text-emerald-400 font-extrabold">
                الكلمة المكتملة: <span className="text-xl text-white underline mx-1">{selectedLetters.join('')}</span>
              </div>
            )}
          </div>

          {/* Available Letter/Syllable Bubbles */}
          <div>
            <div className="text-xs font-bold text-slate-300 mb-2">المقاطع والحروف المتاحة:</div>
            <div className="flex flex-wrap justify-center gap-2.5">
              {availableLetters.map(item => (
                <button
                  key={item.id}
                  onClick={() => handlePickLetter(item)}
                  className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-emerald-600 border border-slate-700 hover:border-emerald-400 text-white text-xl font-black shadow transition active:scale-90"
                >
                  {item.letter}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback message */}
          {feedback && (
            <div
              className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold flex items-start gap-3 animate-fade-in ${
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

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleCheckWord}
              disabled={selectedLetters.length === 0 || !!feedback}
              className={`flex-1 py-3 rounded-2xl font-black text-sm transition shadow-lg flex items-center justify-center gap-2 ${
                selectedLetters.length > 0 && !feedback
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 hover:scale-[1.02]'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>تحقق من صحة الكلمة</span>
            </button>

            <button
              onClick={handleResetCurrent}
              disabled={selectedLetters.length === 0}
              className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition"
              title="إعادة ترتيب الحروف"
            >
              <RotateCcw className="w-4 h-4" />
              <span>مسح</span>
            </button>
          </div>
        </div>
      ) : (
        /* End game celebration */
        <div className="text-center py-6 space-y-4 animate-fade-in">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-4xl shadow-xl">
            🏆
          </div>
          <h3 className="text-2xl font-black text-white">عبقري الاشتقاق والنحو العربي!</h3>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            أتقنت صياغة المشتقات وأوزان الكلمات من جذورها الثلاثية بكل مهارة. مجموع نقاطك: <span className="font-black text-amber-400 text-lg">{score} نقطة</span>
          </p>

          <div className="flex gap-3 justify-center pt-2">
            <button
              onClick={() => {
                setCurrentIdx(0);
                setScore(0);
                setIsFinished(false);
              }}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-sm flex items-center gap-1.5 shadow transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>العب مجدداً</span>
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
