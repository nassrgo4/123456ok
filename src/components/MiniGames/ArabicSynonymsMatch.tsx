import React, { useState, useEffect } from 'react';
import { ARABIC_MATCH_PAIRS, ArabicMatchPair } from '../../data/curriculum';
import { playSound } from '../../utils/audio';
import { UserProfile } from '../../types';
import { BookOpen, ArrowRight, CheckCircle2, Trophy, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ArabicSynonymsMatchProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onClose: () => void;
}

interface CardItem {
  id: string;
  text: string;
  pairId: string;
  type: 'wordA' | 'wordB';
  matched: boolean;
  relation: string;
}

export const ArabicSynonymsMatch: React.FC<ArabicSynonymsMatchProps> = ({
  profile,
  onUpdateProfile,
  onClose
}) => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [firstSelected, setFirstSelected] = useState<CardItem | null>(null);
  const [secondSelected, setSecondSelected] = useState<CardItem | null>(null);
  const [matchesCount, setMatchesCount] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [matchInfo, setMatchInfo] = useState<string | null>(null);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const rawCards: CardItem[] = [];
    ARABIC_MATCH_PAIRS.forEach(p => {
      rawCards.push({
        id: `${p.id}_a`,
        text: p.wordA,
        pairId: p.id,
        type: 'wordA',
        matched: false,
        relation: p.relation
      });
      rawCards.push({
        id: `${p.id}_b`,
        text: p.wordB,
        pairId: p.id,
        type: 'wordB',
        matched: false,
        relation: p.relation
      });
    });

    setCards([...rawCards].sort(() => Math.random() - 0.5));
    setFirstSelected(null);
    setSecondSelected(null);
    setMatchesCount(0);
    setScore(0);
    setIsFinished(false);
    setMatchInfo(null);
  };

  const handleCardClick = (card: CardItem) => {
    if (card.matched || firstSelected?.id === card.id || secondSelected) return;

    playSound.click();

    if (!firstSelected) {
      setFirstSelected(card);
    } else {
      setSecondSelected(card);

      // Check if matching pair
      if (firstSelected.pairId === card.pairId && firstSelected.id !== card.id) {
        playSound.correct();
        setScore(s => s + 20);
        setMatchInfo(`تطابق ممتاز! العلاقة: ${card.relation} بين (${firstSelected.text}) و (${card.text})`);

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

          if (newCount === ARABIC_MATCH_PAIRS.length) {
            handleGameComplete();
          }
        }, 800);
      } else {
        playSound.wrong();
        setMatchInfo('ليستا متطابقتين، حاول البحث عن المرادف أو الضد المناسب!');
        setTimeout(() => {
          setFirstSelected(null);
          setSecondSelected(null);
        }, 1000);
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
        arabicScore: Math.min(100, (profile.stats.arabicScore || 85) + 2)
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
          <div className="p-2 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
            <BookOpen className="w-5 h-5" />
          </div>
          <h2 className="text-base sm:text-lg font-black text-teal-400">
            مطابقة معاني المفردات والأضداد
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
            <span>التطابقات المكتملة: {matchesCount} من {ARABIC_MATCH_PAIRS.length}</span>
            <span>المس بطاقتين لتوصيل المعنى أو الضد</span>
          </div>

          {matchInfo && (
            <div className="p-2.5 rounded-xl bg-slate-800 border border-teal-500/40 text-xs font-bold text-center text-teal-300 animate-fade-in">
              {matchInfo}
            </div>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {cards.map(card => {
              const isSelected = firstSelected?.id === card.id || secondSelected?.id === card.id;

              return (
                <button
                  key={card.id}
                  disabled={card.matched}
                  onClick={() => handleCardClick(card)}
                  className={`h-24 sm:h-28 rounded-2xl p-2 font-black text-base sm:text-lg flex flex-col items-center justify-center transition-all shadow-md active:scale-95 ${
                    card.matched
                      ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 opacity-60 cursor-default'
                      : isSelected
                      ? 'bg-gradient-to-br from-teal-500 to-emerald-600 text-slate-950 ring-4 ring-teal-300 scale-105 shadow-xl'
                      : 'bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-teal-400 text-white'
                  }`}
                >
                  <span className="truncate max-w-full">{card.text}</span>
                  {card.matched && (
                    <span className="text-[10px] font-extrabold text-emerald-400 mt-1 flex items-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3" /> تم الربط
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-6 space-y-4 animate-fade-in">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-teal-500/20 text-teal-400 flex items-center justify-center text-4xl shadow-xl">
            🌟
          </div>
          <h3 className="text-2xl font-black text-white">فصيح المعاجم والمفردات!</h3>
          <p className="text-sm text-slate-300">
            لقد طابقت جميع الكلمات مع معانيها وأضدادها بامتياز. مجموع النقاط: <span className="font-black text-amber-400 text-lg">{score}</span>
          </p>

          <div className="flex gap-3 justify-center pt-2">
            <button
              onClick={startNewGame}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-600 text-slate-950 font-black text-sm flex items-center gap-1.5 shadow transition"
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
