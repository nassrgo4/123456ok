import React, { useState, useEffect } from 'react';
import { UserProfile, Question, MockExamQuestion, MockExamResult } from '../types';
import { QUESTIONS_BANK } from '../data/curriculum';
import { playSound, speakText } from '../utils/audio';
import { 
  Award, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  FileText, 
  Trophy, 
  Volume2, 
  Printer, 
  Sparkles,
  AlertTriangle,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MockExamArenaProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onClose: () => void;
}

export const MockExamArena: React.FC<MockExamArenaProps> = ({
  profile,
  onUpdateProfile,
  onClose
}) => {
  const [examState, setExamState] = useState<'intro' | 'in_progress' | 'review' | 'result'>('intro');
  const [examQuestions, setExamQuestions] = useState<MockExamQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes default
  const [examResult, setExamResult] = useState<MockExamResult | null>(null);

  // Generate mixed balanced exam (5 math + 5 arabic + 5 english = 15 questions)
  const startExam = () => {
    playSound.starPop();
    const mathPool = QUESTIONS_BANK.filter(q => q.subject === 'math');
    const arPool = QUESTIONS_BANK.filter(q => q.subject === 'arabic');
    const enPool = QUESTIONS_BANK.filter(q => q.subject === 'english');

    const sample = (arr: Question[], count: number) => {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    const selected = [
      ...sample(mathPool, 5),
      ...sample(arPool, 5),
      ...sample(enPool, 5)
    ].sort(() => 0.5 - Math.random());

    setExamQuestions(selected.map(q => ({ ...q, selectedAnswer: undefined })));
    setCurrentIndex(0);
    setTimeLeft(600); // 10 minutes
    setExamState('in_progress');
  };

  // Timer countdown
  useEffect(() => {
    if (examState !== 'in_progress') return;
    if (timeLeft <= 0) {
      handleFinishExam();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examState, timeLeft]);

  const handleSelectAnswer = (answer: string) => {
    playSound.click();
    setExamQuestions(prev => {
      const updated = [...prev];
      updated[currentIndex] = {
        ...updated[currentIndex],
        selectedAnswer: answer
      };
      return updated;
    });
  };

  const handleFinishExam = () => {
    let mathCorrect = 0;
    let mathTotal = 0;
    let arCorrect = 0;
    let arTotal = 0;
    let enCorrect = 0;
    let enTotal = 0;
    let totalCorrect = 0;

    const evaluatedQuestions = examQuestions.map(q => {
      const isCorrect = q.selectedAnswer === q.correctAnswer;
      if (q.subject === 'math') {
        mathTotal++;
        if (isCorrect) mathCorrect++;
      } else if (q.subject === 'arabic') {
        arTotal++;
        if (isCorrect) arCorrect++;
      } else if (q.subject === 'english') {
        enTotal++;
        if (isCorrect) enCorrect++;
      }
      if (isCorrect) totalCorrect++;
      return { ...q, isCorrect };
    });

    setExamQuestions(evaluatedQuestions);

    const total = examQuestions.length || 1;
    const percentage = Math.round((totalCorrect / total) * 100);

    let gradeLabel = 'ممتاز مع مرتبة الشرف 🏆';
    if (percentage < 50) gradeLabel = 'يحتاج إلى مراجعة وتدريب 🌱';
    else if (percentage < 65) gradeLabel = 'مقبول وبداية طيبة 👍';
    else if (percentage < 80) gradeLabel = 'جيد جداً وبطل متميز 🌟';
    else if (percentage < 90) gradeLabel = 'متفوق ومبدع 🥇';

    const result: MockExamResult = {
      id: `exam-${Date.now()}`,
      date: new Date().toLocaleDateString('ar-EG'),
      totalQuestions: total,
      correctAnswers: totalCorrect,
      percentage,
      timeSpentSeconds: 600 - timeLeft,
      subjectBreakdown: {
        math: { total: mathTotal, correct: mathCorrect },
        arabic: { total: arTotal, correct: arCorrect },
        english: { total: enTotal, correct: enCorrect }
      },
      gradeLabel
    };

    setExamResult(result);
    setExamState('result');

    if (percentage >= 70) {
      playSound.victory();
      try {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
      } catch {}
    } else {
      playSound.starPop();
    }

    // Award bonus XP and Coins for completing exam
    const gainedXp = totalCorrect * 20 + (percentage >= 80 ? 100 : 40);
    const gainedCoins = totalCorrect * 5 + (percentage >= 80 ? 30 : 10);

    onUpdateProfile({
      ...profile,
      xp: profile.xp + gainedXp,
      coins: profile.coins + gainedCoins,
      stats: {
        ...profile.stats,
        totalCorrect: profile.stats.totalCorrect + totalCorrect,
        totalAnswered: profile.stats.totalAnswered + total,
        completedMockExams: (profile.stats.completedMockExams || 0) + 1,
        highestExamScore: Math.max(profile.stats.highestExamScore || 0, percentage)
      }
    });
  };

  const currentQ = examQuestions[currentIndex];
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 animate-fade-in" dir="rtl">
      {/* Intro Screen */}
      {examState === 'intro' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center text-4xl shadow-xl mx-auto animate-bounce">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              الاختبار التجريبي الشامل (الصف السادس) 📝
            </h2>
            <p className="text-sm text-slate-300 font-bold leading-relaxed">
              اختبر مدى جاهزيتك وتفوقك في جميع مواد المنهج (رياضيات، عربي، إنجليزي) في بيئة اختبارية واقعية موقوتة.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-right">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
              <div className="text-amber-400 font-black text-sm mb-1">⏱️ المدة الزمنية</div>
              <div className="text-xs text-slate-300">10 دقائق لحل جميع الأسئلة</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
              <div className="text-purple-400 font-black text-sm mb-1">📊 عدد الأسئلة</div>
              <div className="text-xs text-slate-300">15 سؤالاً شاملاً للمنهج</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
              <div className="text-emerald-400 font-black text-sm mb-1">📜 شهادة فورية</div>
              <div className="text-xs text-slate-300">تقرير أداء تفصيلي مع شهادة</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={startExam}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-base shadow-xl flex items-center justify-center gap-2 transition active:scale-95"
            >
              <Zap className="w-5 h-5" />
              <span>بدء الاختبار التجريبي الآن</span>
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm transition"
            >
              العودة للرئيسية
            </button>
          </div>
        </div>
      )}

      {/* In Progress Exam Screen */}
      {examState === 'in_progress' && currentQ && (
        <div className="space-y-4">
          {/* Header Status */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-xl bg-purple-500/20 text-purple-300 font-black text-xs border border-purple-400/30">
                سؤال {currentIndex + 1} من {examQuestions.length}
              </span>
              <span className="text-xs text-slate-400 font-bold hidden sm:inline">
                {currentQ.subject === 'math' ? '📐 رياضيات' : currentQ.subject === 'arabic' ? '✍️ لغة عربية' : '🇬🇧 لغة إنجليزية'}
              </span>
            </div>

            {/* Timer */}
            <div className={`px-3 py-1.5 rounded-xl font-mono font-black text-sm flex items-center gap-2 border ${
              timeLeft < 120 
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/50 animate-pulse'
                : 'bg-slate-800 text-amber-300 border-slate-700'
            }`}>
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>

            <button
              onClick={handleFinishExam}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-1.5 shadow transition"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>تسليم الاختبار</span>
            </button>
          </div>

          {/* Question Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg sm:text-2xl font-black text-white leading-relaxed">
                {currentQ.question}
              </h3>
              <button
                onClick={() => speakText(currentQ.question, currentQ.subject === 'english' ? 'en' : 'ar')}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition flex-shrink-0"
                title="استمع للسؤال"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Options List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = currentQ.selectedAnswer === option;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(option)}
                    className={`p-4 rounded-2xl border text-right font-bold text-sm sm:text-base flex items-center justify-between transition ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md ring-1 ring-amber-400/50'
                        : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <span>{option}</span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                      isSelected ? 'border-amber-400 bg-amber-400 text-slate-950 font-bold' : 'border-slate-600'
                    }`}>
                      {isSelected ? '✓' : ''}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Questions Quick Navigation Palette */}
            <div className="pt-4 border-t border-slate-800/80">
              <div className="text-xs text-slate-400 font-bold mb-2">خريطة أسئلة الاختبار:</div>
              <div className="flex flex-wrap gap-2">
                {examQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      playSound.click();
                      setCurrentIndex(idx);
                    }}
                    className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center transition ${
                      currentIndex === idx
                        ? 'ring-2 ring-amber-400 bg-amber-500 text-slate-950 font-black'
                        : q.selectedAnswer
                        ? 'bg-purple-600/60 text-white border border-purple-400/40'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Prev / Next Footer */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  playSound.click();
                  setCurrentIndex(prev => Math.max(0, prev - 1));
                }}
                disabled={currentIndex === 0}
                className="px-4 py-2.5 rounded-xl bg-slate-800 disabled:opacity-40 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition"
              >
                <ArrowRight className="w-4 h-4" />
                <span>السابق</span>
              </button>

              <button
                onClick={() => {
                  playSound.click();
                  if (currentIndex < examQuestions.length - 1) {
                    setCurrentIndex(prev => prev + 1);
                  } else {
                    handleFinishExam();
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow transition"
              >
                <span>{currentIndex < examQuestions.length - 1 ? 'السؤال التالي' : 'إنهاء وتسليم'}</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Result & Evaluation Screen */}
      {examState === 'result' && examResult && (
        <div className="space-y-6">
          <div className="bg-slate-900 border-2 border-amber-400/60 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center text-4xl shadow-xl mx-auto">
              <Trophy className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-400/40">
                {examResult.gradeLabel}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">
                درجتك: {examResult.percentage}%
              </h2>
              <p className="text-sm text-slate-300 font-bold mt-1">
                أجبت بشكل صحيح على {examResult.correctAnswers} من أصل {examResult.totalQuestions} سؤالاً في {Math.round(examResult.timeSpentSeconds / 60)} دقيقة!
              </p>
            </div>

            {/* Subject Breakdown Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700">
                <div className="text-amber-400 font-black text-sm">الرياضيات 📐</div>
                <div className="text-lg font-black text-white mt-1">
                  {examResult.subjectBreakdown.math.correct} / {examResult.subjectBreakdown.math.total}
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700">
                <div className="text-emerald-400 font-black text-sm">اللغة العربية ✍️</div>
                <div className="text-lg font-black text-white mt-1">
                  {examResult.subjectBreakdown.arabic.correct} / {examResult.subjectBreakdown.arabic.total}
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700">
                <div className="text-cyan-400 font-black text-sm">اللغة الإنجليزية 🇬🇧</div>
                <div className="text-lg font-black text-white mt-1">
                  {examResult.subjectBreakdown.english.correct} / {examResult.subjectBreakdown.english.total}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setExamState('review')}
                className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs sm:text-sm flex items-center gap-2 border border-slate-700 transition"
              >
                <FileText className="w-4 h-4" />
                <span>مراجعة الإجابات والشروح</span>
              </button>

              <button
                onClick={startExam}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs sm:text-sm shadow flex items-center gap-2 transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>إعادة اختبار جديد</span>
              </button>

              <button
                onClick={onClose}
                className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs sm:text-sm transition"
              >
                العودة للرئيسية
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Answers Screen */}
      {examState === 'review' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <h3 className="font-black text-white text-base">مراجعة وتصحيح أسئلة الاختبار بالتفصيل 🧐</h3>
            <button
              onClick={() => setExamState('result')}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300"
            >
              العودة للنتيجة
            </button>
          </div>

          <div className="space-y-3">
            {examQuestions.map((q, idx) => (
              <div
                key={idx}
                className={`p-4 sm:p-5 rounded-2xl border ${
                  q.isCorrect
                    ? 'bg-slate-900/90 border-emerald-500/50'
                    : 'bg-slate-900/90 border-rose-500/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-extrabold text-sm sm:text-base text-white">
                    {idx + 1}. {q.question}
                  </h4>
                  {q.isCorrect ? (
                    <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> صحيح
                    </span>
                  ) : (
                    <span className="text-rose-400 font-bold text-xs flex items-center gap-1">
                      <XCircle className="w-4 h-4" /> خطأ
                    </span>
                  )}
                </div>

                <div className="mt-3 text-xs space-y-1">
                  <div className="text-slate-300">
                    <span className="text-slate-400">إجابتك: </span>
                    <span className={q.isCorrect ? 'text-emerald-300 font-bold' : 'text-rose-300 line-through'}>
                      {q.selectedAnswer || 'لم تتم الإجابة'}
                    </span>
                  </div>
                  {!q.isCorrect && (
                    <div className="text-emerald-300 font-bold">
                      <span className="text-slate-400 font-normal">الإجابة الصحيحة: </span>
                      {q.correctAnswer}
                    </div>
                  )}
                  <div className="text-amber-300/90 bg-slate-850 p-2.5 rounded-xl mt-2 border border-slate-700/60">
                    💡 <span className="font-bold">الشرح والتوضيح: </span>{q.explanation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
