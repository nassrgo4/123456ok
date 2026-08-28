import React, { useState, useEffect } from 'react';
import { ENGLISH_SPELLING_ITEMS } from '../../data/curriculum';
import { playSound, speakText } from '../../utils/audio';
import { UserProfile } from '../../types';
import { Volume2, Sparkles, ArrowRight, CheckCircle2, RotateCcw, Delete, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EnglishSpellingBeeProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onClose: () => void;
}

export const EnglishSpellingBee: React.FC<EnglishSpellingBeeProps> = ({
  profile,
  onUpdateProfile,
  onClose
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [typedLetters, setTypedLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<{ letter: string; id: number }[]>([]);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [status, setStatus] = useState<'playing' | 'correct' | 'wrong'>('playing');

  const currentItem = ENGLISH_SPELLING_ITEMS[currentIdx];

  // Initialize scrambled letters when word changes
  useEffect(() => {
    if (!currentItem) return;
    const letters = currentItem.word.split('').map((l, i) => ({ letter: l, id: i }));
    const scrambled = [...letters].sort(() => Math.random() - 0.5);
    setAvailableLetters(scrambled);
    setTypedLetters([]);
    setStatus('playing');

    // Auto speak
    speakText(currentItem.word, 'en');
  }, [currentIdx]);

  const handlePickLetter = (item: { letter: string; id: number }) => {
    if (status !== 'playing') return;
    playSound.click();
    setTypedLetters(prev => [...prev, item.letter]);
    setAvailableLetters(prev => prev.filter(l => l.id !== item.id));

    // If completed typing length
    const newTyped = [...typedLetters, item.letter].join('');
    if (newTyped.length === currentItem.word.length) {
      if (newTyped === currentItem.word) {
        playSound.correct();
        setStatus('correct');
        setScore(s => s + 20);
        setTimeout(() => {
          if (currentIdx + 1 < ENGLISH_SPELLING_ITEMS.length) {
            setCurrentIdx(idx => idx + 1);
          } else {
            handleEndGame();
          }
        }, 1200);
      } else {
        playSound.wrong();
        setStatus('wrong');
        setTimeout(() => {
          // Reset current word
          const letters = currentItem.word.split('').map((l, i) => ({ letter: l, id: i }));
          setAvailableLetters([...letters].sort(() => Math.random() - 0.5));
          setTypedLetters([]);
          setStatus('playing');
        }, 1200);
      }
    }
  };

  const handleBackspace = () => {
    if (typedLetters.length === 0 || status !== 'playing') return;
    playSound.click();
    const last = typedLetters[typedLetters.length - 1];
    setTypedLetters(prev => prev.slice(0, -1));
    // restore to available
    setAvailableLetters(prev => [...prev, { letter: last, id: Date.now() + Math.random() }]);
  };

  const handleEndGame = () => {
    setIsFinished(true);
    playSound.victory();
    try {
      confetti({ particleCount: 60, spread: 70 });
    } catch {}

    onUpdateProfile({
      ...profile,
      xp: profile.xp + 50,
      coins: profile.coins + 20,
      stats: {
        ...profile.stats,
        completedSpellingBee: (profile.stats.completedSpellingBee || 0) + 1
      }
    });
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
          <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-base sm:text-lg font-black text-blue-400">
            مختبر التهجئة الإنجليزية (Spelling Bee)
          </h2>
        </div>

        <div className="text-xs font-bold text-amber-300 bg-slate-800 px-2.5 py-1 rounded-xl">
          النقاط: {score}
        </div>
      </div>

      {!isFinished && currentItem ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span>الكلمة {currentIdx + 1} من {ENGLISH_SPELLING_ITEMS.length}</span>
            <span>استمع ورتب الحروف بالإنجليزية</span>
          </div>

          {/* Audio + Meaning Box */}
          <div className="p-6 rounded-3xl bg-slate-800/90 border border-slate-700 text-center shadow-inner flex flex-col items-center">
            <button
              onClick={() => speakText(currentItem.word, 'en')}
              className="p-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg transition active:scale-95 mb-3 flex items-center gap-2 font-bold"
              title="استمع للكلمة مرة أخرى"
            >
              <Volume2 className="w-6 h-6 animate-pulse" />
              <span>استمع للنطق الإنجليزي</span>
            </button>

            <div className="text-lg sm:text-xl font-extrabold text-amber-300">
              المعنى بالعربية: {currentItem.arabic}
            </div>
            <div className="text-xs text-slate-400 mt-1">تلميح: {currentItem.hint}</div>
          </div>

          {/* Typed Slots */}
          <div className="flex justify-center flex-wrap gap-2 min-h-[50px] p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
            {Array.from({ length: currentItem.word.length }).map((_, idx) => {
              const letter = typedLetters[idx];
              return (
                <div
                  key={idx}
                  className={`w-10 h-12 sm:w-12 sm:h-14 rounded-xl border flex items-center justify-center text-xl sm:text-2xl font-black transition ${
                    letter
                      ? status === 'correct'
                        ? 'bg-emerald-600 border-emerald-400 text-white'
                        : status === 'wrong'
                        ? 'bg-rose-600 border-rose-400 text-white animate-shake'
                        : 'bg-slate-800 border-blue-400 text-blue-300 shadow'
                      : 'bg-slate-900 border-slate-700 text-transparent'
                  }`}
                  dir="ltr"
                >
                  {letter || '_'}
                </div>
              );
            })}
          </div>

          {/* Available Letter Bubbles */}
          <div className="space-y-3">
            <div className="flex justify-center flex-wrap gap-2" dir="ltr">
              {availableLetters.map(item => (
                <button
                  key={item.id}
                  onClick={() => handlePickLetter(item)}
                  className="w-11 h-12 sm:w-13 sm:h-14 rounded-2xl bg-gradient-to-b from-slate-700 to-slate-800 hover:from-blue-600 hover:to-indigo-600 border border-slate-600 text-xl font-extrabold text-white shadow-md active:scale-90 transition"
                >
                  {item.letter}
                </button>
              ))}
            </div>

            {typedLetters.length > 0 && (
              <div className="flex justify-center">
                <button
                  onClick={handleBackspace}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <Delete className="w-4 h-4 text-rose-400" />
                  <span>تراجع عن آخر حرف</span>
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-6 space-y-4 animate-fade-in">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-3xl">
            🐝
          </div>
          <h3 className="text-2xl font-black text-white">Congratulations! بطل التهجئة الإنجليزية</h3>
          <p className="text-sm text-slate-300">
            أتقنت تهجئة ونطق جميع الكلمات بنجاح! النقاط: <span className="font-black text-amber-400 text-lg">{score}</span>
          </p>

          <div className="flex gap-3 justify-center pt-2">
            <button
              onClick={() => {
                setCurrentIdx(0);
                setScore(0);
                setIsFinished(false);
              }}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-black text-sm flex items-center gap-1.5 shadow transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة الاختبار</span>
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
