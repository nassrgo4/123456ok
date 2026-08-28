import React, { useState, useEffect } from 'react';
import { ENGLISH_SENTENCE_ITEMS, EnglishSentenceItem } from '../../data/curriculum';
import { playSound, speakText } from '../../utils/audio';
import { UserProfile } from '../../types';
import { Globe, ArrowRight, CheckCircle2, XCircle, Volume2, RotateCcw, Sparkles, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EnglishSentenceBuilderProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onClose: () => void;
}

export const EnglishSentenceBuilder: React.FC<EnglishSentenceBuilderProps> = ({
  profile,
  onUpdateProfile,
  onClose
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<{ word: string; id: number }[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentItem = ENGLISH_SENTENCE_ITEMS[currentIdx];

  useEffect(() => {
    if (!currentItem) return;
    const wordsWithId = currentItem.scrambledWords.map((w, idx) => ({ word: w, id: idx + 1 }));
    setAvailableWords([...wordsWithId].sort(() => Math.random() - 0.5));
    setSelectedWords([]);
    setFeedback(null);
  }, [currentIdx]);

  const handlePickWord = (item: { word: string; id: number }) => {
    if (feedback) return;
    playSound.click();
    setSelectedWords(prev => [...prev, item.word]);
    setAvailableWords(prev => prev.filter(w => w.id !== item.id));
  };

  const handleRemoveWord = (index: number) => {
    if (feedback) return;
    playSound.click();
    const removedWord = selectedWords[index];
    setSelectedWords(prev => prev.filter((_, i) => i !== index));
    setAvailableWords(prev => [
      ...prev,
      { word: removedWord, id: Date.now() + Math.random() }
    ]);
  };

  const handleCheckSentence = () => {
    const constructed = selectedWords.join(' ');
    const target = currentItem.correctWords.join(' ');

    const isCorrect = constructed === target;

    if (isCorrect) {
      playSound.correct();
      speakText(target, 'en');
      setScore(s => s + 25);
      setFeedback({ isCorrect: true, text: `Excellent! ${currentItem.explanation}` });
      try {
        confetti({ particleCount: 40, spread: 50 });
      } catch {}

      setTimeout(() => {
        if (currentIdx + 1 < ENGLISH_SENTENCE_ITEMS.length) {
          setCurrentIdx(i => i + 1);
        } else {
          handleFinishGame();
        }
      }, 2200);
    } else {
      playSound.wrong();
      setFeedback({
        isCorrect: false,
        text: `Review the grammar order! Rule: ${currentItem.ruleTitle}`
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
        englishScore: Math.min(100, (profile.stats.englishScore || 85) + 3)
      }
    });
  };

  const handleResetCurrent = () => {
    const wordsWithId = currentItem.scrambledWords.map((w, idx) => ({ word: w, id: idx + 1 }));
    setAvailableWords([...wordsWithId].sort(() => Math.random() - 0.5));
    setSelectedWords([]);
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
          <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Globe className="w-5 h-5" />
          </div>
          <h2 className="text-base sm:text-lg font-black text-blue-400">
            صانع الجمل الإنجليزية (Sentence Master)
          </h2>
        </div>

        <div className="text-xs font-bold text-amber-300 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>النقاط: {score}</span>
        </div>
      </div>

      {!isFinished && currentItem ? (
        <div className="space-y-5">
          {/* Progress */}
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span>الجملة {currentIdx + 1} من {ENGLISH_SENTENCE_ITEMS.length}</span>
            <span className="text-blue-300">{currentItem.ruleTitle}</span>
          </div>

          {/* Meaning & Target Prompt */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border border-blue-700/60 shadow text-center space-y-2">
            <div className="text-xs font-extrabold text-blue-300">كون الجملة المعبرة عن هذا المعنى بالإنجليزية:</div>
            <div className="text-base sm:text-lg font-black text-amber-300">
              "{currentItem.arabicMeaning}"
            </div>
          </div>

          {/* Constructed Sentence Area (LTR) */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800" dir="ltr">
            <div className="text-xs font-bold text-slate-400 mb-2">Tap words to remove them from sentence:</div>
            
            <div className="min-h-[64px] flex items-center justify-start flex-wrap gap-2 p-2.5 bg-slate-900 rounded-xl border border-slate-700">
              {selectedWords.length === 0 ? (
                <span className="text-xs text-slate-500 italic">Select words below to build your sentence...</span>
              ) : (
                selectedWords.map((w, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleRemoveWord(idx)}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-rose-600 text-white font-bold text-sm sm:text-base shadow active:scale-95 transition"
                  >
                    {w}
                  </button>
                ))
              )}
            </div>

            {selectedWords.length > 0 && (
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-blue-300 font-semibold truncate max-w-[80%]">
                  Current: {selectedWords.join(' ')}
                </span>
                <button
                  onClick={() => speakText(selectedWords.join(' '), 'en')}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-300"
                  title="Listen to your sentence"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Word Bank (LTR) */}
          <div dir="ltr">
            <div className="text-xs font-bold text-slate-300 mb-2 text-right" dir="rtl">
              بنك الكلمات المتاحة:
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {availableWords.map(item => (
                <button
                  key={item.id}
                  onClick={() => handlePickWord(item)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-blue-600 border border-slate-700 hover:border-blue-400 text-white font-bold text-sm sm:text-base shadow active:scale-95 transition"
                >
                  {item.word}
                </button>
              ))}
            </div>
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

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleCheckSentence}
              disabled={selectedWords.length === 0 || !!feedback}
              className={`flex-1 py-3 rounded-2xl font-black text-sm transition shadow-lg flex items-center justify-center gap-2 ${
                selectedWords.length > 0 && !feedback
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white hover:scale-[1.02]'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>تحقق من الجملة (Check)</span>
            </button>

            <button
              onClick={handleResetCurrent}
              disabled={selectedWords.length === 0}
              className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-6 space-y-4 animate-fade-in">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-4xl shadow-xl">
            🇬🇧
          </div>
          <h3 className="text-2xl font-black text-white">Grammar Champion! بطل قواعد اللغة</h3>
          <p className="text-sm text-slate-300">
            ركّبت جميع الجمل الإنجليزية وفق القواعد السليمة بنجاح باهر! النقاط: <span className="font-black text-amber-400 text-lg">{score}</span>
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
              <span>إعادة التدريب</span>
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
