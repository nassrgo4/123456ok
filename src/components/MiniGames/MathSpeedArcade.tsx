import React, { useState, useEffect } from 'react';
import { SPEED_MATH_BANK } from '../../data/curriculum';
import { playSound } from '../../utils/audio';
import { UserProfile } from '../../types';
import { Zap, Timer, Flame, Trophy, RefreshCw, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MathSpeedArcadeProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onClose: () => void;
}

export const MathSpeedArcade: React.FC<MathSpeedArcadeProps> = ({
  profile,
  onUpdateProfile,
  onClose
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [shuffledBank, setShuffledBank] = useState(SPEED_MATH_BANK);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (isPlaying && timeLeft === 0) {
      handleGameOver();
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    playSound.click();
    setShuffledBank([...SPEED_MATH_BANK].sort(() => Math.random() - 0.5));
    setCurrentIdx(0);
    setScore(0);
    setCombo(0);
    setTimeLeft(30);
    setIsGameOver(false);
    setIsPlaying(true);
  };

  const handleGameOver = () => {
    setIsPlaying(false);
    setIsGameOver(true);
    playSound.victory();

    const isNewHigh = score > (profile.stats.highScoreSpeedMath || 0);
    if (isNewHigh) {
      try {
        confetti({ particleCount: 60, spread: 60 });
      } catch {}
    }

    onUpdateProfile({
      ...profile,
      xp: profile.xp + Math.max(20, Math.round(score / 2)),
      coins: profile.coins + Math.max(5, Math.round(score / 10)),
      stats: {
        ...profile.stats,
        highScoreSpeedMath: Math.max(profile.stats.highScoreSpeedMath || 0, score)
      }
    });
  };

  const handleAnswer = (chosen: number) => {
    const currentQ = shuffledBank[currentIdx % shuffledBank.length];
    if (chosen === currentQ.answer) {
      playSound.correct();
      const newCombo = combo + 1;
      setCombo(newCombo);
      const points = 10 * (newCombo > 2 ? 2 : 1);
      setScore(s => s + points);
    } else {
      playSound.wrong();
      setCombo(0);
    }

    setCurrentIdx(idx => idx + 1);
  };

  const currentQ = shuffledBank[currentIdx % shuffledBank.length];

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
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="text-base sm:text-lg font-black text-amber-400">
            سباق الحساب الذهني الخارق
          </h2>
        </div>

        <div className="flex items-center gap-1 text-xs font-bold text-amber-300 bg-slate-800 px-2.5 py-1 rounded-xl">
          <Trophy className="w-4 h-4 text-yellow-400" />
          <span>أعلى رقم: {profile.stats.highScoreSpeedMath || 0}</span>
        </div>
      </div>

      {!isPlaying && !isGameOver && (
        <div className="text-center py-8 space-y-4">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 text-3xl shadow-lg">
            ⚡
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            جاهز لتحدي الـ 30 ثانية؟
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            أجب على أكبر عدد ممكن من مسائل الرياضيات في الصف السادس بسرعة ودقة قبل انتهاء الوقت. الإجابات المتتالية تضاعف نقاطك!
          </p>

          <button
            onClick={startGame}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-base shadow-xl transition transform active:scale-95"
          >
            انطلق الآن! 🚀
          </button>
        </div>
      )}

      {isPlaying && (
        <div className="space-y-6">
          {/* Status Indicators */}
          <div className="grid grid-cols-3 gap-2 text-center bg-slate-800/90 p-3 rounded-2xl border border-slate-700">
            <div>
              <div className="text-[10px] text-slate-400 font-bold">الوقت المتبقي</div>
              <div className={`text-lg font-black flex items-center justify-center gap-1 ${timeLeft <= 5 ? 'text-rose-400 animate-pulse' : 'text-amber-300'}`}>
                <Timer className="w-4 h-4" />
                <span>{timeLeft} ث</span>
              </div>
            </div>

            <div className="border-x border-slate-700">
              <div className="text-[10px] text-slate-400 font-bold">النقاط</div>
              <div className="text-lg font-black text-amber-400">{score}</div>
            </div>

            <div>
              <div className="text-[10px] text-slate-400 font-bold">الحماس المتتالي</div>
              <div className="text-lg font-black text-orange-400 flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span>x{combo}</span>
              </div>
            </div>
          </div>

          {/* Question Box */}
          <div className="p-6 rounded-3xl bg-slate-800/95 border border-slate-700 text-center shadow-inner">
            <div className="text-xs font-bold text-amber-300 mb-2">احسب بسرعة:</div>
            <div className="text-2xl sm:text-4xl font-black text-white tracking-wide" dir="ltr">
              {currentQ.q}
            </div>
          </div>

          {/* Choices Grid */}
          <div className="grid grid-cols-2 gap-3">
            {currentQ.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                className="py-4 px-3 rounded-2xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 border border-slate-700 text-xl font-extrabold transition shadow active:scale-95"
                dir="ltr"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {isGameOver && (
        <div className="text-center py-6 space-y-4 animate-fade-in">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-2xl shadow">
            🏁
          </div>
          <h3 className="text-2xl font-black text-white">انتهى الوقت!</h3>
          <p className="text-sm text-slate-300">
            حققت مجموع نقاط: <span className="font-black text-amber-400 text-xl">{score} نقطة</span>
          </p>

          <div className="flex gap-3 justify-center pt-2">
            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-sm flex items-center gap-1.5 shadow transition"
            >
              <RefreshCw className="w-4 h-4" />
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
