import React, { useState, useEffect } from 'react';
import { SubjectType, UserProfile, Question } from './types';
import { loadUserProfile, saveUserProfile, calculateLevelFromXp } from './utils/storage';
import { QUESTIONS_BANK } from './data/curriculum';
import { Navbar, MainNavTab } from './components/Navbar';
import { SubjectSelector } from './components/SubjectSelector';
import { QuestMap } from './components/QuestMap';
import { QuizArena } from './components/QuizArena';
import { MiniGamesHub } from './components/MiniGamesHub';
import { ProgressDashboard } from './components/ProgressDashboard';
import { AiTutorModal } from './components/AiTutorModal';
import { ParentDashboard } from './components/ParentDashboard';
import { HeroSelector } from './components/HeroSelector';
import { AchievementsModal } from './components/AchievementsModal';
import { DailyChallenge } from './components/DailyChallenge';
import { PersonalizedDailyChallenges } from './components/PersonalizedDailyChallenges';
import { DailyStreakCalendarModal } from './components/DailyStreakCalendarModal';
import { SevenDayCelebrationModal } from './components/SevenDayCelebrationModal';
import { SmartRemindersModal } from './components/SmartRemindersModal';
import { LevelUpModal } from './components/LevelUpModal';
import { PowerUpShopModal } from './components/PowerUpShopModal';
import { SmartFlashcards } from './components/SmartFlashcards';
import { MockExamArena } from './components/MockExamArena';
import { TwoPlayerDuel } from './components/TwoPlayerDuel';
import { TextbookHub } from './components/TextbookHub';
import { LessonReaderModal } from './components/LessonReaderModal';
import { LandscapeGuideModal } from './components/LandscapeGuideModal';
import { TEXTBOOK_LESSONS } from './data/lessonsData';
import { TextbookLesson } from './types';
import { playSound } from './utils/audio';
import { Sparkles, Gift, Heart, Flame, Maximize2, Type, Smartphone } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(loadUserProfile);
  const [selectedSubject, setSelectedSubject] = useState<SubjectType>('math');
  const [activeLevel, setActiveLevel] = useState<number | null>(null);

  // Modals & Navigation state
  const [activeTab, setActiveTab] = useState<MainNavTab>('quests');
  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isDailyStreakOpen, setIsDailyStreakOpen] = useState(false);
  const [is7DayCelebrationOpen, setIs7DayCelebrationOpen] = useState(false);
  const [isSmartRemindersOpen, setIsSmartRemindersOpen] = useState(false);
  const [isLandscapeGuideOpen, setIsLandscapeGuideOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);
  const [isParentOpen, setIsParentOpen] = useState(false);
  const [readingLesson, setReadingLesson] = useState<TextbookLesson | null>(null);
  const [isReadingLessonOpen, setIsReadingLessonOpen] = useState(false);
  const [tutorContext, setTutorContext] = useState<{ question: Question; userAnswer: string } | null>(null);
  const [levelUpData, setLevelUpData] = useState<{ isOpen: boolean; newLevel: number }>({
    isOpen: false,
    newLevel: 1
  });

  // Cycle font size between extra_large, large, standard
  const handleCycleFontSize = () => {
    const current = profile.fontSizeMode || 'extra_large';
    const next: 'standard' | 'large' | 'extra_large' = 
      current === 'extra_large' ? 'standard' : current === 'standard' ? 'large' : 'extra_large';
    
    handleUpdateProfile({
      ...profile,
      fontSizeMode: next
    });
  };

  // Handle claiming 7-day milestone bonus
  const handleClaim7DayBonus = () => {
    const claimed = profile.streakMilestonesClaimed ? [...profile.streakMilestonesClaimed] : [];
    if (!claimed.includes(7)) {
      claimed.push(7);
    }
    const badges = [...profile.unlockedBadges];
    if (!badges.includes('streak_7')) {
      badges.push('streak_7');
    }
    handleUpdateProfile({
      ...profile,
      coins: profile.coins + 100,
      xp: profile.xp + 200,
      streakMilestonesClaimed: claimed,
      unlockedBadges: badges
    });
  };

  const handleOpenLessonReader = (sub: SubjectType, level: number) => {
    const lesson = TEXTBOOK_LESSONS.find(l => l.subject === sub && l.level === level);
    if (lesson) {
      setReadingLesson(lesson);
      setIsReadingLessonOpen(true);
    }
  };

  // Sync profile updates to storage & level recalculations
  const handleUpdateProfile = (updated: UserProfile) => {
    const calculatedLvl = calculateLevelFromXp(updated.xp);
    const finalProfile: UserProfile = {
      ...updated,
      level: Math.max(updated.level, calculatedLvl)
    };

    if (finalProfile.level > profile.level) {
      setLevelUpData({
        isOpen: true,
        newLevel: finalProfile.level
      });
    }

    setProfile(finalProfile);
    saveUserProfile(finalProfile);
  };

  // Start a specific level challenge
  const handleStartLevel = (level: number) => {
    setActiveLevel(level);
  };

  // Finish or exit quiz arena
  const handleFinishQuiz = () => {
    setActiveLevel(null);
  };

  const handleOpenAiTutorWithContext = (q: Question, userAns: string) => {
    setTutorContext({ question: q, userAnswer: userAns });
    setIsAiTutorOpen(true);
  };

  // Filter questions for active level or generate fallback
  const currentQuestions: Question[] = activeLevel
    ? QUESTIONS_BANK.filter(q => q.subject === selectedSubject && q.level === activeLevel).length > 0
      ? QUESTIONS_BANK.filter(q => q.subject === selectedSubject && q.level === activeLevel)
      : [
          {
            id: `${selectedSubject}_gen_${activeLevel}`,
            subject: selectedSubject,
            topic: 'general_challenge',
            topicTitleAr: `تحدي المستوى ${activeLevel} في ${selectedSubject === 'math' ? 'الرياضيات' : selectedSubject === 'arabic' ? 'اللغة العربية' : 'اللغة الإنجليزية'}`,
            level: activeLevel,
            question: selectedSubject === 'math'
              ? `إذا كان ثمن 4 دفاتر هو 2000 دينار عراقي، فما ثمن 6 دفاتر من نفس النوع؟`
              : selectedSubject === 'arabic'
              ? `ما إعراب كلمة "المعلمان" في جملة: "شَرَحَ المعلمانِ الدَّرسَ"؟`
              : `Choose the correct word: "Look! The boys .......... in the swimming pool right now."`,
            options: selectedSubject === 'math'
              ? ['3000 دينار', '2400 دينار', '3500 دينار', '2800 دينار']
              : selectedSubject === 'arabic'
              ? ['فاعل مرفوع بالألف لأنه مثنى', 'فاعل مرفوع بالضمة', 'مبتدأ مرفوع', 'مفعول به منصوب']
              : ['are swimming', 'swim', 'swimming', 'swam'],
            correctAnswer: selectedSubject === 'math'
              ? '3000 دينار'
              : selectedSubject === 'arabic'
              ? 'فاعل مرفوع بالألف لأنه مثنى'
              : 'are swimming',
            explanation: selectedSubject === 'math'
              ? 'ثمن الدفتر الواحد = 2000 ÷ 4 = 500 دينار. ثمن 6 دفاتر = 6 × 500 = 3000 دينار عراقي.'
              : selectedSubject === 'arabic'
              ? 'المعلمان فاعل قام بالفعل، وهو مثنى فيرفع وعلامة رفعه الألف.'
              : 'With "Look! / right now" we use Present Continuous: are + verb-ing (are swimming).',
            points: 20
          }
        ]
    : [];

  const handleClaimDailyReward = () => {
    handleUpdateProfile({
      ...profile,
      coins: profile.coins + 35,
      xp: profile.xp + 50
    });
  };

  return (
    <div 
      className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950 ${
        profile.fontSizeMode === 'extra_large'
          ? 'text-base sm:text-lg'
          : profile.fontSizeMode === 'large'
          ? 'text-sm sm:text-base'
          : 'text-xs sm:text-sm'
      }`} 
      dir="rtl"
      data-font-size={profile.fontSizeMode || 'extra_large'}
    >
      {/* Top Navigation */}
      <Navbar
        profile={profile}
        onOpenProfile={() => setIsHeroModalOpen(true)}
        onOpenAchievements={() => setIsAchievementsOpen(true)}
        onOpenDailyStreak={() => setIsDailyStreakOpen(true)}
        onOpenSmartReminders={() => setIsSmartRemindersOpen(true)}
        onOpenShop={() => setIsShopOpen(true)}
        onOpenAiTutor={() => {
          setTutorContext(null);
          setIsAiTutorOpen(true);
        }}
        onOpenParentDashboard={() => setIsParentOpen(true)}
        onCycleFontSize={handleCycleFontSize}
        onToggleFullscreenOrLandscape={() => setIsLandscapeGuideOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {/* Welcome & Accessibility Ribbon for Yousef */}
        <div className="mb-4 p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-amber-950/40 border border-amber-500/30 flex items-center justify-between gap-3 shadow-md flex-wrap">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm shadow">
              ⭐
            </span>
            <div>
              <div className="text-xs sm:text-sm font-black text-amber-300 flex items-center gap-1.5">
                <span>أهلاً بالبطل الذكي {profile.name || 'يوسف'}!</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30 hidden sm:inline">
                  هدية أبي الغالي ❤️
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium">
                تم تفعيل وضع القراءة الواضحة (A++) وتخصيص الأسئلة لمنهج الصف السادس الابتدائي 🇮🇶
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 mr-auto sm:mr-0">
            <button
              onClick={() => {
                playSound.click();
                setIsLandscapeGuideOpen(true);
              }}
              className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-sky-950/80 hover:bg-sky-900 border border-sky-600/50 text-sky-300 text-xs font-black flex items-center gap-1.5 transition shadow"
              title="نصائح وضع العرض الأفقي والشاشة الكاملة"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>وضع العرض الأفقي 📲</span>
            </button>

            <button
              onClick={handleCycleFontSize}
              className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-amber-300 text-xs font-black flex items-center gap-1.5 transition shadow"
              title="تبديل حجم الكلمات"
            >
              <Type className="w-3.5 h-3.5" />
              <span>
                {profile.fontSizeMode === 'extra_large' ? 'خط كبير جداً 🔍' : profile.fontSizeMode === 'large' ? 'خط كبير 🔍' : 'خط قياسي'}
              </span>
            </button>
          </div>
        </div>

        {/* Custom Home Reward Reminder Banner if set by parent */}
        {profile.customHomeReward && (
          <div className="mb-4 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/10 border border-amber-500/40 flex items-center justify-between gap-3 shadow">
            <div className="flex items-center gap-2.5">
              <Gift className="w-5 h-5 text-amber-400 flex-shrink-0 animate-bounce" />
              <div className="text-xs sm:text-sm">
                <span className="font-extrabold text-amber-300 ml-1">مكافأة البيت من الوالدين:</span>
                <span className="text-white font-medium">{profile.customHomeReward}</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-amber-400 bg-black/40 px-2 py-0.5 rounded-lg border border-amber-500/30 flex-shrink-0 hidden sm:inline">
              هدفك الذهبي 🎯
            </span>
          </div>
        )}

        {/* View Routing */}
        {activeLevel !== null ? (
          /* Active Quiz Challenge Arena */
          <QuizArena
            questions={currentQuestions}
            subject={selectedSubject}
            level={activeLevel}
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onFinishQuiz={handleFinishQuiz}
            onOpenAiTutorWithContext={handleOpenAiTutorWithContext}
          />
        ) : activeTab === 'textbook' ? (
          /* Textbook Curriculum Lesson-by-Lesson Hub */
          <TextbookHub
            profile={profile}
            onSelectLesson={(lesson) => {
              setReadingLesson(lesson);
              setIsReadingLessonOpen(true);
            }}
            onStartQuiz={(sub, lvl) => {
              setSelectedSubject(sub);
              setActiveLevel(lvl);
              setIsReadingLessonOpen(false);
            }}
            onClose={() => setActiveTab('quests')}
          />
        ) : activeTab === 'minigames' ? (
          /* Mini-Games City Hub */
          <MiniGamesHub
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onBackToQuests={() => setActiveTab('quests')}
          />
        ) : activeTab === 'flashcards' ? (
          /* Smart Flashcards Revision */
          <SmartFlashcards onBack={() => setActiveTab('quests')} />
        ) : activeTab === 'mock_exam' ? (
          /* Grade 6 Comprehensive Mock Exam Simulator */
          <MockExamArena
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onClose={() => setActiveTab('quests')}
          />
        ) : activeTab === 'duel' ? (
          /* 1v1 Two-Player Duel Battle */
          <TwoPlayerDuel onClose={() => setActiveTab('quests')} />
        ) : activeTab === 'progress' ? (
          /* Learner Progress & Report Dashboard */
          <ProgressDashboard
            profile={profile}
            onOpenSubject={(sub) => {
              setSelectedSubject(sub);
              setActiveTab('quests');
            }}
            onOpenMiniGames={() => setActiveTab('minigames')}
            onClose={() => setActiveTab('quests')}
          />
        ) : (
          /* Main Curriculum Quest Adventure Mode */
          <div className="space-y-4">
            {/* Daily Streak Quick Highlight Strip */}
            <div
              onClick={() => {
                playSound.click();
                setIsDailyStreakOpen(true);
              }}
              className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/20 to-slate-900 border border-amber-500/40 hover:border-amber-400/80 transition cursor-pointer shadow-md flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center font-black text-xl shadow group-hover:scale-105 transition">
                  {(profile.streakDays || 1) >= 7 ? '👑' : '🔥'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-black text-white">
                      شعلة الحماس والـ Streak: <strong className="text-amber-400">{profile.streakDays || 1} أيام متتالية</strong>
                    </span>
                    {(profile.streakDays || 1) >= 7 ? (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                        وسام الـ 7 أيام الذهبي محقق 👑
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        باقي {7 - (profile.streakDays || 1)} أيام لتاج الأسبوع
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    اضغط هنا لفتح تقويم الأيام، مراجعة أوسمة الإنجاز اليومي، أو ضبط التذكيرات الذكية 📅
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-500/20 px-3 py-1.5 rounded-xl border border-amber-400/30 group-hover:bg-amber-500/30 transition">
                  <span>عرض التقويم والأوسمة</span>
                  <span>←</span>
                </div>
              </div>
            </div>

            {/* Personalized Adaptive Daily Challenges (Targeted to Weak Points & Ministry Drills) */}
            <PersonalizedDailyChallenges
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
              onOpenLessonReader={(sub, lvl) => handleOpenLessonReader(sub, lvl)}
            />

            {/* 3-Subject Selector Cards */}
            <SubjectSelector
              selectedSubject={selectedSubject}
              onSelectSubject={setSelectedSubject}
              profile={profile}
            />

            {/* Level Road Map for Chosen Subject */}
            <QuestMap
              subject={selectedSubject}
              profile={profile}
              onStartLevel={handleStartLevel}
              onOpenLessonReader={(lvl) => handleOpenLessonReader(selectedSubject, lvl)}
              onOpenTextbook={() => setActiveTab('textbook')}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-850 bg-slate-950 text-slate-500 text-xs py-4 text-center">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            هدية أبي الغالي ❤️ - التطبيق التفاعلي الشامل لطلاب الصف السادس الابتدائي في العراق 🇮🇶 (رياضيات مطورة • قواعد اللغة العربية • English for Iraq)
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>مبني خصيصاً للتعلم الممتع باللعب والذكاء الاصطناعي ⭐</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LessonReaderModal
        isOpen={isReadingLessonOpen}
        onClose={() => setIsReadingLessonOpen(false)}
        lesson={readingLesson}
        onStartQuiz={(sub, lvl) => {
          setSelectedSubject(sub);
          setActiveLevel(lvl);
          setIsReadingLessonOpen(false);
        }}
      />

      <HeroSelector
        isOpen={isHeroModalOpen}
        onClose={() => setIsHeroModalOpen(false)}
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
      />

      <PowerUpShopModal
        isOpen={isShopOpen}
        onClose={() => setIsShopOpen(false)}
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
      />

      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
        profile={profile}
      />

      <DailyStreakCalendarModal
        isOpen={isDailyStreakOpen}
        onClose={() => setIsDailyStreakOpen(false)}
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
        onOpenReminders={() => setIsSmartRemindersOpen(true)}
        onTrigger7DayCelebration={() => setIs7DayCelebrationOpen(true)}
      />

      <SevenDayCelebrationModal
        isOpen={is7DayCelebrationOpen}
        onClose={() => setIs7DayCelebrationOpen(false)}
        profile={profile}
        onClaim7DayBonus={handleClaim7DayBonus}
      />

      <SmartRemindersModal
        isOpen={isSmartRemindersOpen}
        onClose={() => setIsSmartRemindersOpen(false)}
        profile={profile}
        onSaveSettings={(newSettings) => {
          handleUpdateProfile({
            ...profile,
            smartReminder: newSettings
          });
        }}
      />

      <AiTutorModal
        isOpen={isAiTutorOpen}
        onClose={() => setIsAiTutorOpen(false)}
        initialContext={tutorContext}
      />

      <ParentDashboard
        isOpen={isParentOpen}
        onClose={() => setIsParentOpen(false)}
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
      />

      <LandscapeGuideModal
        isOpen={isLandscapeGuideOpen}
        onClose={() => setIsLandscapeGuideOpen(false)}
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
      />

      <LevelUpModal
        isOpen={levelUpData.isOpen}
        newLevel={levelUpData.newLevel}
        profile={profile}
        onClose={() => setLevelUpData(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}

