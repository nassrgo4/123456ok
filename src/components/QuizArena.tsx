import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Question, SubjectType, UserProfile, PowerUpInventory } from '../types';
import { playSound, speakText } from '../utils/audio';
import { TEXTBOOK_LESSONS } from '../data/lessonsData';
import { LessonReaderModal } from './LessonReaderModal';
import {
  recordMistakeInProfile,
  recordSuccessInProfile,
  incrementDailyChallengeProgress
} from '../utils/challengeGenerator';
import {
  Volume2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Star,
  Flame,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Award,
  RefreshCw,
  Heart,
  Shield,
  Zap,
  Clock,
  BookOpen
} from 'lucide-react';

interface QuizArenaProps {
  questions: Question[];
  subject: SubjectType;
  level: number;
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onFinishQuiz: () => void;
  onOpenAiTutorWithContext?: (q: Question, userAns: string) => void;
}

export const QuizArena: React.FC<QuizArenaProps> = ({
  questions,
  subject,
  level,
  profile,
  onUpdateProfile,
  onFinishQuiz,
  onOpenAiTutorWithContext
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [combo, setCombo] = useState(0);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Power-up active states
  const [isShieldActive, setIsShieldActive] = useState(false);
  const [isDoubleXpActive, setIsDoubleXpActive] = useState(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([]);
  const [powerUpMessage, setPowerUpMessage] = useState<string | null>(null);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);

  const currentLesson = TEXTBOOK_LESSONS.find(l => l.subject === subject && l.level === level) || null;

  const inventory: PowerUpInventory = profile.inventory || {
    shields: 1,
    fiftyFifties: 2,
    timeFreezes: 2,
    doubleXp: 1
  };

  const currentQuestion = questions[currentIndex] || questions[0];
  const progressPercent = Math.round(((currentIndex) / questions.length) * 100);

  // Read question text on load if English
  useEffect(() => {
    if (currentQuestion && currentQuestion.subject === 'english') {
      speakText(currentQuestion.questionEn || currentQuestion.question, 'en');
    }
  }, [currentIndex, currentQuestion]);

  const useShield = () => {
    if (isShieldActive || isAnswered || inventory.shields <= 0) return;
    playSound.powerUpUse();
    setIsShieldActive(true);
    setPowerUpMessage('🛡️ تم تفعيل درع الصمود! أنت محمي من خسارة أي قلب في هذا السؤال.');
    onUpdateProfile({
      ...profile,
      inventory: { ...inventory, shields: inventory.shields - 1 }
    });
    setTimeout(() => setPowerUpMessage(null), 3000);
  };

  const useFiftyFifty = () => {
    if (isAnswered || eliminatedOptions.length > 0 || inventory.fiftyFifties <= 0) return;
    playSound.powerUpUse();
    const wrongOptions = currentQuestion.options.filter(o => o !== currentQuestion.correctAnswer);
    const toEliminate = wrongOptions.slice(0, 2);
    setEliminatedOptions(toEliminate);
    setPowerUpMessage('💡 تم حذف خيارين خاطئين بنجاح!');
    onUpdateProfile({
      ...profile,
      inventory: { ...inventory, fiftyFifties: inventory.fiftyFifties - 1 }
    });
    setTimeout(() => setPowerUpMessage(null), 3000);
  };

  const useDoubleXp = () => {
    if (isDoubleXpActive || isAnswered || inventory.doubleXp <= 0) return;
    playSound.powerUpUse();
    setIsDoubleXpActive(true);
    setPowerUpMessage('⚡ تم تفعيل مضاعف النقاط (2X XP)!');
    onUpdateProfile({
      ...profile,
      inventory: { ...inventory, doubleXp: inventory.doubleXp - 1 }
    });
    setTimeout(() => setPowerUpMessage(null), 3000);
  };

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    const correct = option === currentQuestion.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      playSound.correct();
      const newCombo = combo + 1;
      setCombo(newCombo);
      const multiplier = (newCombo > 2 ? 2 : 1) * (isDoubleXpActive ? 2 : 1);
      const pointsGained = currentQuestion.points * multiplier;
      setScore(prev => prev + pointsGained);

      // Track success and increment daily challenge progress
      let resolvedProfile = recordSuccessInProfile(profile, currentQuestion);
      const { updatedProfile } = incrementDailyChallengeProgress(resolvedProfile, subject, currentQuestion.topic, 1);
      onUpdateProfile(updatedProfile);
    } else {
      // Record mistake for adaptive weakness practice
      let mistakeProfile = recordMistakeInProfile(profile, currentQuestion, option);

      if (isShieldActive) {
        playSound.shieldBlock();
        setPowerUpMessage('🛡️ أنقذك درع الصمود! لم تخسر أي قلب.');
        setIsShieldActive(false);
        onUpdateProfile(mistakeProfile);
      } else {
        playSound.wrong();
        setCombo(0);
        setMistakes(prev => prev + 1);

        // Decrement hearts if wrong
        const newHearts = Math.max(0, profile.hearts - 1);
        onUpdateProfile({
          ...mistakeProfile,
          hearts: newHearts,
          stats: {
            ...mistakeProfile.stats,
            totalAnswered: mistakeProfile.stats.totalAnswered + 1
          }
        });
      }
    }
  };

  const handleNextQuestion = () => {
    playSound.click();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
      setEliminatedOptions([]);
      setIsDoubleXpActive(false);
      setPowerUpMessage(null);
    } else {
      // Finished all questions in level
      handleCompleteLevel();
    }
  };

  const handleCompleteLevel = () => {
    setIsFinished(true);
    playSound.victory();

    // Trigger colorful confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    // Calculate stars: 3 stars (0 mistakes), 2 stars (1 mistake), 1 star (2+ mistakes)
    const starsGained = mistakes === 0 ? 3 : mistakes === 1 ? 2 : 1;
    const stageKey = `${subject}_${level}`;
    const prevStars = profile.starsEarned[stageKey] || 0;
    const bestStars = Math.max(prevStars, starsGained);

    const nextLevel = Math.max(profile.unlockedLevels[subject] || 1, level + 1);
    const xpBonus = 30 + score;
    const coinsBonus = 15 + starsGained * 5;

    onUpdateProfile({
      ...profile,
      xp: profile.xp + xpBonus,
      coins: profile.coins + coinsBonus,
      unlockedLevels: {
        ...profile.unlockedLevels,
        [subject]: nextLevel
      },
      starsEarned: {
        ...profile.starsEarned,
        [stageKey]: bestStars
      },
      stats: {
        ...profile.stats,
        totalCorrect: profile.stats.totalCorrect + (questions.length - mistakes),
        totalAnswered: profile.stats.totalAnswered + questions.length
      }
    });
  };

  // If level completed screen
  if (isFinished) {
    const starsGained = mistakes === 0 ? 3 : mistakes === 1 ? 2 : 1;
    return (
      <div className="max-w-xl mx-auto my-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center text-white shadow-2xl animate-fade-in">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-slate-950 shadow-lg mb-4 animate-bounce">
          <Award className="w-12 h-12" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">
          أحسنت يا بطل! تم إكمال المستوى {level}
        </h2>
        <p className="text-sm text-slate-300 mb-6">
          لقد أظهرت ذكاءً وشجاعة فائقة في تحدي {subject === 'math' ? 'الرياضيات' : subject === 'arabic' ? 'اللغة العربية' : 'اللغة الإنجليزية'}!
        </p>

        {/* Stars */}
        <div className="flex justify-center items-center gap-3 my-4">
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className={`p-3 rounded-2xl border transition-transform ${
                s <= starsGained
                  ? 'bg-amber-500/20 border-amber-400 scale-110 shadow-lg'
                  : 'bg-slate-800 border-slate-700 opacity-40'
              }`}
            >
              <Star className={`w-8 h-8 ${s <= starsGained ? 'fill-amber-400 text-amber-400 animate-pulse' : 'text-slate-600'}`} />
            </div>
          ))}
        </div>

        {/* Rewards earned breakdown */}
        <div className="grid grid-cols-3 gap-3 my-6 bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
          <div className="text-center">
            <div className="text-[11px] text-slate-400 font-bold">نقاط الخبرة</div>
            <div className="text-lg font-black text-amber-400">+{score + 30} XP</div>
          </div>
          <div className="text-center border-x border-slate-700">
            <div className="text-[11px] text-slate-400 font-bold">الجواهر</div>
            <div className="text-lg font-black text-amber-300">+{15 + starsGained * 5} 💎</div>
          </div>
          <div className="text-center">
            <div className="text-[11px] text-slate-400 font-bold">الدقة</div>
            <div className="text-lg font-black text-emerald-400">
              {Math.round(((questions.length - mistakes) / questions.length) * 100)}%
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            id="quiz-continue-button"
            onClick={onFinishQuiz}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-base shadow-lg transition flex items-center justify-center gap-2"
          >
            <span>متابعة المغامرة</span>
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            id="quiz-retry-button"
            onClick={() => {
              setCurrentIndex(0);
              setSelectedOption(null);
              setIsAnswered(false);
              setMistakes(0);
              setScore(0);
              setIsFinished(false);
            }}
            className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>إعادة المستوى للدرجة الكاملة</span>
          </button>
        </div>
      </div>
    );
  }

  // Out of hearts check
  if (profile.hearts <= 0) {
    return (
      <div className="max-w-md mx-auto my-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center text-white shadow-2xl">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-950/80 border border-rose-600 flex items-center justify-center text-rose-500 mb-4 animate-pulse">
          <Heart className="w-8 h-8 fill-rose-500" />
        </div>
        <h3 className="text-xl font-black text-rose-400 mb-2">نفدت طاقة القلوب!</h3>
        <p className="text-xs text-slate-300 mb-6 leading-relaxed">
          لا تقلق يا بطل! يمكنك شحن قلب إضافي باستخدام الجواهر أو مراجعة الشرح مع المعلم الذكي.
        </p>
        <div className="flex flex-col gap-2.5">
          <button
            id="recharge-heart-btn"
            disabled={profile.coins < 20}
            onClick={() => {
              if (profile.coins >= 20) {
                playSound.coin();
                onUpdateProfile({
                  ...profile,
                  coins: profile.coins - 20,
                  hearts: 3
                });
              }
            }}
            className={`py-3 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 ${
              profile.coins >= 20
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>شحن 3 قلوب (مقابل 20 جوهرة 💎)</span>
          </button>

          <button
            id="exit-to-map-btn"
            onClick={onFinishQuiz}
            className="py-2.5 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-bold border border-slate-700"
          >
            العودة لخريطة الدروس
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-4 bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-6 text-white shadow-2xl relative">
      {/* Header bar: Progress, Exit, Combo */}
      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <button
          id="quiz-back-to-map"
          onClick={() => {
            playSound.click();
            onFinishQuiz();
          }}
          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1 transition"
        >
          <ArrowRight className="w-4 h-4" />
          <span>خروج</span>
        </button>

        {/* Progress Bar */}
        <div className="flex-1 max-w-xs mx-2">
          <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1">
            <span>سؤال {currentIndex + 1} من {questions.length}</span>
            <span>المستوى {level}</span>
          </div>
          <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Combo flame */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700">
          <Flame className={`w-4 h-4 ${combo > 1 ? 'text-orange-500 fill-orange-500 animate-bounce' : 'text-slate-500'}`} />
          <span className={`text-xs font-extrabold ${combo > 1 ? 'text-orange-400' : 'text-slate-400'}`}>
            {combo > 1 ? `x${combo} حماس!` : 'سلسلة 0'}
          </span>
        </div>
      </div>

      {/* Power-ups Active Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-black text-slate-400">القدرات المساعدة:</span>

          {/* Shield Power-up button */}
          <button
            onClick={useShield}
            disabled={isShieldActive || isAnswered || inventory.shields <= 0}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 border transition ${
              isShieldActive
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md animate-pulse font-black'
                : inventory.shields > 0 && !isAnswered
                ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-amber-500/40'
                : 'bg-slate-850/60 text-slate-500 border-slate-800 opacity-50 cursor-not-allowed'
            }`}
            title="تفعيل درع الحماية من خسارة القلوب"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>درع ({inventory.shields})</span>
          </button>

          {/* 50:50 Power-up button */}
          <button
            onClick={useFiftyFifty}
            disabled={isAnswered || eliminatedOptions.length > 0 || inventory.fiftyFifties <= 0}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 border transition ${
              eliminatedOptions.length > 0
                ? 'bg-purple-600 text-white border-purple-400 font-black'
                : inventory.fiftyFifties > 0 && !isAnswered
                ? 'bg-slate-800 hover:bg-slate-700 text-purple-300 border-purple-500/40'
                : 'bg-slate-855/60 text-slate-500 border-slate-800 opacity-50 cursor-not-allowed'
            }`}
            title="حذف خيارين خاطئين فوراً"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>50:50 ({inventory.fiftyFifties})</span>
          </button>

          {/* Double XP Power-up button */}
          <button
            onClick={useDoubleXp}
            disabled={isDoubleXpActive || isAnswered || inventory.doubleXp <= 0}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 border transition ${
              isDoubleXpActive
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md animate-pulse font-black'
                : inventory.doubleXp > 0 && !isAnswered
                ? 'bg-slate-800 hover:bg-slate-700 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-850/60 text-slate-500 border-slate-800 opacity-50 cursor-not-allowed'
            }`}
            title="مضاعفة نقاط هذا السؤال (2X XP)"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>2X XP ({inventory.doubleXp})</span>
          </button>

          {/* Lesson Theory Review Button */}
          {currentLesson && (
            <button
              id="quiz-open-lesson-review-btn"
              onClick={() => {
                playSound.click();
                setIsLessonModalOpen(true);
              }}
              className="px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition shadow-sm"
              title="مراجعة شرح الدرس والقوانين"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">شرح الدرس والقاعدة</span>
              <span className="sm:hidden">شرح الدرس</span>
            </button>
          )}
        </div>

        {/* Live Powerup Status Toast */}
        {powerUpMessage && (
          <div className="text-xs font-black text-amber-300 bg-amber-950/80 border border-amber-500/50 px-2.5 py-0.5 rounded-lg animate-fade-in">
            {powerUpMessage}
          </div>
        )}
      </div>

      {/* Main Question & Options Area (Adaptive Grid for Landscape and Portrait) */}
      <div className="grid grid-cols-1 landscape:grid-cols-12 md:grid-cols-12 gap-4 items-start mb-4">
        {/* Question Column (Left/Right depending on RTL) */}
        <div className="landscape:col-span-5 md:col-span-5 bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 sm:p-6 shadow-inner flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs sm:text-sm font-extrabold px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {currentQuestion.topicTitleAr}
              </span>

              <div className="flex items-center gap-2">
                {/* Audio button for speech */}
                <button
                  id="speech-button-question"
                  onClick={() => {
                    const textToRead = currentQuestion.subject === 'english'
                      ? (currentQuestion.questionEn || currentQuestion.question)
                      : currentQuestion.question;
                    speakText(textToRead, currentQuestion.subject === 'english' ? 'en' : 'ar');
                  }}
                  className="p-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-amber-300 border border-slate-600 transition shadow"
                  title="استمع لنطق السؤال بالصوت الواضح"
                >
                  <Volume2 className="w-5 h-5 text-amber-300" />
                </button>

                {/* Hint button */}
                {currentQuestion.hint && (
                  <button
                    id="hint-toggle-button"
                    onClick={() => {
                      playSound.click();
                      setShowHint(!showHint);
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-black flex items-center gap-1 transition shadow ${
                      showHint
                        ? 'bg-amber-400 text-slate-950 border-amber-300'
                        : 'bg-slate-700 hover:bg-slate-600 text-amber-300 border-slate-600'
                    }`}
                    title="تلميح ذكي"
                  >
                    <Lightbulb className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Question Text with Extra Large, High Contrast Typography for Yousef */}
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-amber-50 leading-relaxed tracking-wide mt-2">
              {currentQuestion.question}
            </h3>

            {/* English translation if applicable */}
            {currentQuestion.subject === 'english' && currentQuestion.questionEn && currentQuestion.questionEn !== currentQuestion.question && (
              <p className="text-base sm:text-lg font-bold text-sky-300 mt-2 dir-ltr text-left">
                {currentQuestion.questionEn}
              </p>
            )}
          </div>

          {/* Hint Reveal Box */}
          {showHint && currentQuestion.hint && (
            <div className="mt-4 p-3.5 rounded-xl bg-amber-950/60 border border-amber-500/60 text-amber-200 text-sm sm:text-base font-bold flex items-start gap-2.5 animate-fade-in shadow">
              <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-black text-amber-300 ml-1">تلميح ذكي:</span>
                <span className="leading-relaxed">{currentQuestion.hint}</span>
              </div>
            </div>
          )}
        </div>

        {/* Options Column */}
        <div className="landscape:col-span-7 md:col-span-7 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 landscape:grid-cols-1 xl:grid-cols-2 gap-3">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedOption === opt;
              const isCorrectAnswer = opt === currentQuestion.correctAnswer;
              const isEliminated = eliminatedOptions.includes(opt);

              if (isEliminated) {
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-slate-800 bg-slate-900/40 text-slate-600 text-base font-bold flex items-center justify-between opacity-30 line-through select-none min-h-[60px]"
                  >
                    <span>{opt}</span>
                    <span className="text-xs">محذوف 💡</span>
                  </div>
                );
              }

              let btnStyle = 'bg-slate-800/90 hover:bg-slate-750 border-slate-700/80 text-white hover:border-amber-400/50 hover:shadow-md';

              if (isAnswered) {
                if (isCorrectAnswer) {
                  btnStyle = 'bg-emerald-600 border-emerald-400 text-white ring-4 ring-emerald-400/50 shadow-xl scale-[1.02]';
                } else if (isSelected && !isCorrectAnswer) {
                  btnStyle = 'bg-rose-600 border-rose-400 text-white ring-4 ring-rose-400/50 animate-shake';
                } else {
                  btnStyle = 'bg-slate-800/40 border-slate-800 text-slate-500 opacity-50';
                }
              }

              const optionLetter = ['أ', 'ب', 'ج', 'د'][idx] || `${idx + 1}`;

              return (
                <button
                  key={idx}
                  id={`quiz-option-${idx}`}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(opt)}
                  className={`p-4 sm:p-5 rounded-2xl border text-base sm:text-lg md:text-xl font-black transition-all duration-200 flex items-center justify-between text-right shadow-md active:scale-[0.98] min-h-[64px] ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-slate-700/80 border border-slate-600/60 text-amber-300 text-sm font-black flex items-center justify-center flex-shrink-0 shadow-inner">
                      {optionLetter}
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </div>

                  {isAnswered && isCorrectAnswer && (
                    <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0 animate-bounce" />
                  )}
                  {isAnswered && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-6 h-6 text-white flex-shrink-0 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Feedback & Explanation Box upon Answering */}
      {isAnswered && (
        <div
          className={`p-4 sm:p-5 rounded-2xl border mb-4 shadow-lg animate-fade-in ${
            isCorrect
              ? 'bg-emerald-950/70 border-emerald-500/80 text-emerald-100 ring-1 ring-emerald-500/30'
              : 'bg-rose-950/70 border-rose-500/80 text-rose-100 ring-1 ring-rose-500/30'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  <span className="font-black text-base sm:text-lg text-emerald-300">
                    رائع جداً يا يوسف! إجابة صحيحة +{currentQuestion.points} نقطة 🌟
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-rose-400 flex-shrink-0" />
                  <span className="font-black text-base sm:text-lg text-rose-300">
                    محاولة طيبة يا بطل! الإجابة الصحيحة هي: ({currentQuestion.correctAnswer})
                  </span>
                </>
              )}
            </div>

            {/* AI Teacher explanation trigger */}
            {onOpenAiTutorWithContext && (
              <button
                id="ai-tutor-explain-btn"
                onClick={() => onOpenAiTutorWithContext(currentQuestion, selectedOption || '')}
                className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-900 text-amber-300 border border-amber-400/50 text-xs sm:text-sm font-black flex items-center gap-1.5 transition shadow"
                title="طلب شرح تفصيلي ومبسط من المعلم الذكي حكيم"
              >
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>شرح المعلم الذكي</span>
              </button>
            )}
          </div>

          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-slate-100 mt-2 bg-slate-950/40 p-3 rounded-xl border border-white/5">
            <span className="font-black text-amber-300 ml-1">القاعدة والشرح: </span>
            {currentQuestion.explanation}
          </p>
        </div>
      )}

      {/* Bottom Action bar */}
      <div className="flex items-center justify-between pt-2 gap-3">
        <div className="text-sm sm:text-base text-slate-300 font-bold">
          النقاط الحالية: <span className="text-amber-400 font-black text-base sm:text-lg">{score}</span>
        </div>

        {isAnswered ? (
          <button
            id="quiz-next-button"
            onClick={handleNextQuestion}
            className="px-7 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-base sm:text-lg shadow-xl transition flex items-center gap-2.5 active:scale-95 ring-2 ring-amber-300/40"
          >
            <span>{currentIndex + 1 < questions.length ? 'السؤال التالي' : 'عرض النتيجة النهائية'}</span>
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : (
          <div className="text-xs sm:text-sm text-slate-400 font-bold">
            اضغط على الخيار الصحيح للمتابعة
          </div>
        )}
      </div>

      {/* Lesson Theory Reader Modal */}
      <LessonReaderModal
        isOpen={isLessonModalOpen}
        onClose={() => setIsLessonModalOpen(false)}
        lesson={currentLesson}
        onStartQuiz={() => setIsLessonModalOpen(false)}
      />
    </div>
  );
};
