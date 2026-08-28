import React, { useState, useEffect } from 'react';
import { Question, SubjectType } from '../types';
import { QUESTIONS_BANK } from '../data/curriculum';
import { playSound } from '../utils/audio';
import { Swords, Trophy, RotateCcw, Flame, Sparkles, ArrowLeft, Shield, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TwoPlayerDuelProps {
  onClose: () => void;
}

export const TwoPlayerDuel: React.FC<TwoPlayerDuelProps> = ({ onClose }) => {
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'winner'>('setup');
  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);
  const [p1Name, setP1Name] = useState('البطل الأول 🔵');
  const [p2Name, setP2Name] = useState('البطل الثاني 🔴');
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [battleMeter, setBattleMeter] = useState(50); // 0 (P1 wins) to 100 (P2 wins)
  const [winnerName, setWinnerName] = useState('');
  const [p1AnswerStatus, setP1AnswerStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [p2AnswerStatus, setP2AnswerStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const startDuel = () => {
    playSound.starPop();
    const shuffled = [...QUESTIONS_BANK].sort(() => 0.5 - Math.random());
    setCurrentQuestions(shuffled);
    setQIndex(0);
    setP1Score(0);
    setP2Score(0);
    setBattleMeter(50);
    setP1AnswerStatus('idle');
    setP2AnswerStatus('idle');
    setGameState('playing');
  };

  const handlePlayerAnswer = (player: 1 | 2, option: string) => {
    const currentQ = currentQuestions[qIndex];
    if (!currentQ) return;

    const isCorrect = option === currentQ.correctAnswer;

    if (player === 1) {
      if (p1AnswerStatus !== 'idle') return;
      if (isCorrect) {
        playSound.duelHit();
        setP1AnswerStatus('correct');
        setP1Score(prev => prev + 1);
        setBattleMeter(prev => Math.max(0, prev - 15));
      } else {
        playSound.wrong();
        setP1AnswerStatus('wrong');
        setBattleMeter(prev => Math.min(100, prev + 8));
      }
    } else {
      if (p2AnswerStatus !== 'idle') return;
      if (isCorrect) {
        playSound.duelHit();
        setP2AnswerStatus('correct');
        setP2Score(prev => prev + 1);
        setBattleMeter(prev => Math.min(100, prev + 15));
      } else {
        playSound.wrong();
        setP2AnswerStatus('wrong');
        setBattleMeter(prev => Math.max(0, prev - 8));
      }
    }

    // Check knockout or next round
    setTimeout(() => {
      // Check if knockout condition reached
      if (battleMeter <= 10 || (player === 1 && isCorrect && battleMeter <= 25)) {
        handleEndGame(p1Name);
        return;
      }
      if (battleMeter >= 90 || (player === 2 && isCorrect && battleMeter >= 75)) {
        handleEndGame(p2Name);
        return;
      }

      // Next Question
      if (qIndex + 1 >= currentQuestions.length || qIndex >= 9) {
        // Evaluate after 10 questions
        if (p1Score > p2Score) handleEndGame(p1Name);
        else if (p2Score > p1Score) handleEndGame(p2Name);
        else handleEndGame('تعادل بطولي بين البطلين 🤝');
      } else {
        setQIndex(prev => prev + 1);
        setP1AnswerStatus('idle');
        setP2AnswerStatus('idle');
      }
    }, 600);
  };

  const handleEndGame = (winner: string) => {
    setWinnerName(winner);
    setGameState('winner');
    playSound.victory();
    try {
      confetti({ particleCount: 120, spread: 100, origin: { y: 0.5 } });
    } catch {}
  };

  const currentQ = currentQuestions[qIndex];

  return (
    <div className="max-w-4xl mx-auto space-y-4 animate-fade-in" dir="rtl">
      {/* Setup Screen */}
      {gameState === 'setup' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white flex items-center justify-center text-4xl shadow-xl mx-auto animate-pulse">
            <Swords className="w-10 h-10" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              تحدي الأصدقاء والمنافسة الثنائية ⚔️
            </h2>
            <p className="text-sm text-slate-300 font-bold leading-relaxed">
              تحدَّ زميلك أو صديقك على نفس الشاشة في مسابقة سرعة وذكاء بأسئلة منهج الصف السادس الابتدائي!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto text-right">
            <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/40 space-y-2">
              <label className="text-xs font-black text-blue-400">اسم اللاعب الأول (الأزرق 🔵):</label>
              <input
                type="text"
                value={p1Name}
                onChange={e => setP1Name(e.target.value)}
                className="w-full bg-slate-900 border border-blue-500/50 rounded-xl px-3 py-2 text-sm text-white font-bold"
              />
            </div>

            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 space-y-2">
              <label className="text-xs font-black text-rose-400">اسم اللاعب الثاني (الأحمر 🔴):</label>
              <input
                type="text"
                value={p2Name}
                onChange={e => setP2Name(e.target.value)}
                className="w-full bg-slate-900 border border-rose-500/50 rounded-xl px-3 py-2 text-sm text-white font-bold"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={startDuel}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-amber-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 text-slate-950 font-black text-base shadow-xl flex items-center justify-center gap-2 transition"
            >
              <Zap className="w-5 h-5" />
              <span>بدء جولة التحدي الآن</span>
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm transition"
            >
              العودة
            </button>
          </div>
        </div>
      )}

      {/* Playing Screen */}
      {gameState === 'playing' && currentQ && (
        <div className="space-y-4">
          {/* Top Tug-of-War Battle Meter */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs font-black">
              <div className="flex items-center gap-2 text-blue-400">
                <span className="w-3 h-3 rounded-full bg-blue-500 animate-ping" />
                <span>{p1Name} ({p1Score} نقاط)</span>
              </div>
              <span className="text-slate-400">جولة {qIndex + 1} / 10</span>
              <div className="flex items-center gap-2 text-rose-400">
                <span>{p2Name} ({p2Score} نقاط)</span>
                <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              </div>
            </div>

            {/* Visual Balance Bar */}
            <div className="relative h-4 rounded-full bg-slate-950 border border-slate-700 overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300"
                style={{ width: `${100 - battleMeter}%` }}
              />
              <div
                className="absolute inset-y-0 right-0 bg-gradient-to-l from-rose-600 to-rose-400 transition-all duration-300"
                style={{ width: `${battleMeter}%` }}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-amber-400 rounded-full border-2 border-slate-900 shadow" />
            </div>
          </div>

          {/* Central Question Display */}
          <div className="bg-slate-900 border-2 border-amber-400/50 rounded-3xl p-6 text-center space-y-2 shadow-2xl">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-400/30">
              {currentQ.subject === 'math' ? '📐 رياضيات' : currentQ.subject === 'arabic' ? '✍️ لغة عربية' : '🇬🇧 لغة إنجليزية'}
            </span>
            <h3 className="text-lg sm:text-2xl font-black text-white leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Split Answer Panels (Player 1 & Player 2 on same screen) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Player 1 (Blue) Area */}
            <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/90 border-2 border-blue-500/60 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-400 flex items-center gap-1.5">
                  <Shield className="w-4 h-4" /> {p1Name}
                </span>
                <span className="text-xs text-slate-400 font-bold">انقر للإجابة أسرع!</span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePlayerAnswer(1, opt)}
                    className="p-3 rounded-2xl bg-blue-950/50 hover:bg-blue-900/60 border border-blue-500/40 text-slate-100 font-bold text-xs sm:text-sm text-right transition active:scale-95"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Player 2 (Red) Area */}
            <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/90 border-2 border-rose-500/60 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-rose-400 flex items-center gap-1.5">
                  <Flame className="w-4 h-4" /> {p2Name}
                </span>
                <span className="text-xs text-slate-400 font-bold">انقر للإجابة أسرع!</span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePlayerAnswer(2, opt)}
                    className="p-3 rounded-2xl bg-rose-950/50 hover:bg-rose-900/60 border border-rose-500/40 text-slate-100 font-bold text-xs sm:text-sm text-right transition active:scale-95"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Winner Screen */}
      {gameState === 'winner' && (
        <div className="bg-slate-900 border-2 border-amber-400 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center text-5xl shadow-xl mx-auto animate-bounce">
            <Trophy className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-400/40">
              نهاية النزال الحماسي ⚔️
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              الفائز هو: {winnerName}
            </h2>
            <p className="text-sm text-slate-300 font-bold">
              النتيجة: {p1Name} ({p1Score}) ضد {p2Name} ({p2Score})
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={startDuel}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow flex items-center gap-2 transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>جولة نزال جديدة</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm transition"
            >
              العودة للرئيسية
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
