import React, { useState, useEffect } from 'react';
import { ENGLISH_VOCAB_PAIRS, EnglishVocabPair } from '../../data/curriculum';
import { playSound, speakText } from '../../utils/audio';
import { UserProfile } from '../../types';
import { Volume2, Sparkles, ArrowRight, CheckCircle2, RotateCcw, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EnglishVocabMatchProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onClose: () => void;
}

interface VocabCard {
  id: string;
  pairId: string;
  display: string;
  subText?: string;
  type: 'en' | 'ar';
  emoji?: string;
  matched: boolean;
}

export const EnglishVocabMatch: React.FC<EnglishVocabMatchProps> = ({
  profile,
  onUpdateProfile,
  onClose
}) => {
  const [cards, setCards] = useState<VocabCard[]>([]);
  const [firstSelected, setFirstSelected] = useState<VocabCard | null>(null);
  const [secondSelected, setSecondSelected] = useState<VocabCard | null>(null);
  const [matchesCount, setMatchesCount] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const rawCards: VocabCard[] = [];
    ENGLISH_VOCAB_PAIRS.forEach(p => {
      rawCards.push({
        id: `${p.id}_en`,
        pairId: p.id,
        display: p.wordEn,
        type: 'en',
        emoji: p.emoji,
        matched: false
      });
      rawCards.push({
        id: `${p.id}_ar`,
        pairId: p.id,
        display: p.wordAr,
        subText: p.category,
        type: 'ar',
        matched: false
      });
    });

    setCards([...rawCards].sort(() => Math.random() - 0.5));
    setFirstSelected(null);
    setSecondSelected(null);
    setMatchesCount(0);
    setScore(0);
    setIsFinished(false);
  };

  const handleCardClick = (card: VocabCard) => {
    if (card.matched || firstSelected?.id === card.id || secondSelected) return;

    playSound.click();
    if (card.type === 'en') {
      speakText(card.display, 'en');
    }

    if (!firstSelected) {
      setFirstSelected(card);
    } else {
      setSecondSelected(card);

      if (firstSelected.pairId === card.pairId && firstSelected.id !== card.id) {
        playSound.correct();
        setScore(s => s + 20);

        setTimeout(() => {
          setCards(prev =>
            prev.map(c =>
              c.pairId === card.pairId ? { ...c, matched: true } : c
            )
          );
          setFirstSelected(null);
          setSecondSelected(null);
          const newCount = matchesCount + 1;
          setMatchesCount(newCount);

          if (newCount === ENGLISH_VOCAB_PAIRS.length) {
            handleGameComplete();
          }
        }, 600);
      } else {
        playSound.wrong();
        setTimeout(() => {
          setFirstSelected(null);
          setSecondSelected(null);
        }, 900);
      }
    }
  };

  const handleGameComplete = () => {
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
        englishScore: Math.min(100, (profile.stats.englishScore || 85) + 2)
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
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-base sm:text-lg font-black text-indigo-400">
            مطابقة المفردات الإنجليزية بالصوت
          </h2>
        </div>

        <div className="text-xs font-bold text-amber-300 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>النقاط: {score}</span>
        </div>
      </div>

      {!isFinished ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span>المفردات المتقنة: {matchesCount} من {ENGLISH_VOCAB_PAIRS.length}</span>
            <span>المس الكلمة الإنجليزية واستمع لنطقها ثم اربطها بمعناها العربي</span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {cards.map(card => {
              const isSelected = firstSelected?.id === card.id || secondSelected?.id === card.id;

              return (
                <button
                  key={card.id}
                  disabled={card.matched}
                  onClick={() => handleCardClick(card)}
                  className={`min-h-[90px] rounded-2xl p-3 font-bold transition-all flex flex-col items-center justify-center text-center shadow-md active:scale-95 ${
                    card.matched
                      ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 opacity-60 cursor-default'
                      : isSelected
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white ring-4 ring-indigo-300 scale-105 shadow-xl'
                      : card.type === 'en'
                      ? 'bg-slate-800 hover:bg-slate-750 border border-blue-500/40 text-blue-200'
                      : 'bg-slate-800 hover:bg-slate-750 border border-purple-500/40 text-purple-200'
                  }`}
                  dir={card.type === 'en' ? 'ltr' : 'rtl'}
                >
                  {card.emoji && <span className="text-2xl mb-1">{card.emoji}</span>}
                  <span className="text-sm sm:text-base font-extrabold">{card.display}</span>
                  
                  {card.type === 'en' && !card.matched && (
                    <span className="text-[10px] text-blue-400 mt-1 flex items-center gap-1">
                      <Volume2 className="w-3 h-3" /> استمع
                    </span>
                  )}
                  
                  {card.matched && (
                    <span className="text-[10px] text-emerald-400 font-extrabold mt-1 flex items-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3" /> متطابق
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-6 space-y-4 animate-fade-in">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-4xl shadow-xl">
            🏆
          </div>
          <h3 className="text-2xl font-black text-white">Vocabulary Genius!</h3>
          <p className="text-sm text-slate-300">
            أتقنت نطق ومعاني جميع المفردات المقررة! مجموع النقاط: <span className="font-black text-amber-400 text-lg">{score}</span>
          </p>

          <div className="flex gap-3 justify-center pt-2">
            <button
              onClick={startNewGame}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black text-sm flex items-center gap-1.5 shadow transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>العب جولة جديدة</span>
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
