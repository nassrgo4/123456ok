import React, { useState } from 'react';
import { UserProfile } from '../types';
import { AVATARS } from '../data/curriculum';
import { playSound, isSoundEnabled, toggleSound, startAmbientMusic, stopAmbientMusic } from '../utils/audio';
import { 
  Heart, 
  Coins, 
  Flame, 
  Volume2, 
  VolumeX, 
  Shield, 
  Award, 
  Sparkles, 
  Gamepad2, 
  Users, 
  TrendingUp,
  ShoppingBag,
  BookOpen,
  FileCheck,
  Swords,
  Music,
  Bell,
  Crown,
  Type,
  Maximize2
} from 'lucide-react';

export type MainNavTab = 'quests' | 'textbook' | 'minigames' | 'flashcards' | 'mock_exam' | 'duel' | 'progress' | 'tutor';

interface NavbarProps {
  profile: UserProfile;
  onOpenProfile: () => void;
  onOpenAchievements: () => void;
  onOpenDailyStreak?: () => void;
  onOpenSmartReminders?: () => void;
  onOpenShop: () => void;
  onOpenAiTutor: () => void;
  onOpenParentDashboard: () => void;
  onCycleFontSize?: () => void;
  onToggleFullscreenOrLandscape?: () => void;
  activeTab: MainNavTab;
  setActiveTab: (tab: MainNavTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  onOpenProfile,
  onOpenAchievements,
  onOpenDailyStreak,
  onOpenSmartReminders,
  onOpenShop,
  onOpenAiTutor,
  onOpenParentDashboard,
  onCycleFontSize,
  onToggleFullscreenOrLandscape,
  activeTab,
  setActiveTab
}) => {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [musicOn, setMusicOn] = useState(false);
  const currentAvatar = AVATARS.find(a => a.id === profile.avatarId) || AVATARS[0];

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    if (newState) playSound.click();
  };

  const handleMusicToggle = () => {
    if (musicOn) {
      stopAmbientMusic();
      setMusicOn(false);
    } else {
      startAmbientMusic();
      setMusicOn(true);
    }
  };

  const nextLevelXp = profile.level * 100;
  const currentLevelProgress = Math.min(100, Math.round(((profile.xp % 100) / 100) * 100));

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2.5 flex items-center justify-between gap-2">
        {/* Left: User Profile & Level */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="user-profile-button"
            onClick={() => {
              playSound.click();
              onOpenProfile();
            }}
            className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700/80 transition shadow-inner group"
            title="تعديل البطل والمعلومات الشخصية - هدية أبي الغالي"
          >
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${currentAvatar.bgGradient} flex items-center justify-center text-xl sm:text-2xl shadow group-hover:scale-105 transition`}>
              {currentAvatar.emoji}
            </div>
            <div className="text-right hidden sm:block">
              <div className="text-xs font-black text-amber-300 flex items-center gap-1">
                <span>هدية أبي الغالي ❤️</span>
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-slate-100 truncate max-w-[90px] md:max-w-[120px]">
                {profile.name} <span className="text-[10px] text-amber-400">({profile.xp} XP)</span>
              </div>
            </div>
          </button>

          {/* XP Progress Bar */}
          <div className="hidden lg:flex flex-col w-24">
            <div className="flex justify-between text-[10px] text-slate-400 font-bold mb-0.5">
              <span>المستوى {profile.level}</span>
              <span>{profile.xp % 100}/100</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 transition-all duration-500 rounded-full"
                style={{ width: `${currentLevelProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Center: Navigation tabs */}
        <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-2xl border border-slate-700 overflow-x-auto max-w-[55vw] sm:max-w-none scrollbar-none">
          <button
            id="nav-quests-tab"
            onClick={() => {
              playSound.click();
              setActiveTab('quests');
            }}
            className={`px-2.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 whitespace-nowrap transition ${
              activeTab === 'quests'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-amber-200" />
            <span className="hidden md:inline">المهام والمغامرة</span>
            <span className="md:hidden">المغامرة</span>
          </button>

          <button
            id="nav-textbook-tab"
            onClick={() => {
              playSound.click();
              setActiveTab('textbook');
            }}
            className={`px-2.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 whitespace-nowrap transition ${
              activeTab === 'textbook'
                ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden md:inline">الكتاب المدرسي</span>
            <span className="md:hidden">الكتاب</span>
          </button>

          <button
            id="nav-minigames-tab"
            onClick={() => {
              playSound.click();
              setActiveTab('minigames');
            }}
            className={`px-2.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 whitespace-nowrap transition ${
              activeTab === 'minigames'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5 text-purple-300" />
            <span className="hidden md:inline">ألعاب التحدي</span>
            <span className="md:hidden">الألعاب</span>
          </button>

          <button
            id="nav-flashcards-tab"
            onClick={() => {
              playSound.click();
              setActiveTab('flashcards');
            }}
            className={`px-2.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 whitespace-nowrap transition ${
              activeTab === 'flashcards'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-300" />
            <span className="hidden md:inline">بطاقات المراجعة</span>
            <span className="md:hidden">البطاقات</span>
          </button>

          <button
            id="nav-mock-exam-tab"
            onClick={() => {
              playSound.click();
              setActiveTab('mock_exam');
            }}
            className={`px-2.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 whitespace-nowrap transition ${
              activeTab === 'mock_exam'
                ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden md:inline">الاختبار التجريبي</span>
            <span className="md:hidden">الاختبار</span>
          </button>

          <button
            id="nav-duel-tab"
            onClick={() => {
              playSound.click();
              setActiveTab('duel');
            }}
            className={`px-2.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 whitespace-nowrap transition ${
              activeTab === 'duel'
                ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Swords className="w-3.5 h-3.5 text-rose-300" />
            <span className="hidden md:inline">تحدي الأصدقاء</span>
            <span className="md:hidden">نزال 1v1</span>
          </button>

          <button
            id="nav-progress-tab"
            onClick={() => {
              playSound.click();
              setActiveTab('progress');
            }}
            className={`px-2 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1 whitespace-nowrap transition ${
              activeTab === 'progress'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-cyan-300" />
            <span className="hidden lg:inline">التقدم</span>
          </button>

          <button
            id="nav-tutor-tab"
            onClick={() => {
              playSound.click();
              onOpenAiTutor();
            }}
            className={`px-2 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1 whitespace-nowrap transition ${
              activeTab === 'tutor'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
            <span className="hidden lg:inline">المعلم الذكي</span>
          </button>
        </div>

        {/* Right: Stats & Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* Daily Streak & Calendar Trigger */}
          {onOpenDailyStreak && (
            <button
              id="nav-streak-button"
              onClick={() => {
                playSound.click();
                onOpenDailyStreak();
              }}
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-xl border font-black text-xs transition shadow-sm ${
                (profile.streakDays || 1) >= 7
                  ? 'bg-gradient-to-r from-amber-500/30 via-yellow-500/20 to-orange-500/30 border-amber-400 text-amber-300 ring-1 ring-amber-400/50'
                  : 'bg-orange-500/15 hover:bg-orange-500/25 border-orange-500/40 text-orange-300'
              }`}
              title="أوسمة وتقويم الإنجاز اليومي (Daily Streak)"
            >
              {(profile.streakDays || 1) >= 7 ? (
                <Crown className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              ) : (
                <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400 animate-pulse" />
              )}
              <span className="font-extrabold">{profile.streakDays || 1}</span>
              <span className="hidden sm:inline text-[11px] font-bold">أيام</span>
            </button>
          )}

          {/* Smart Reminders Quick Trigger */}
          {onOpenSmartReminders && (
            <button
              id="nav-reminders-button"
              onClick={() => {
                playSound.click();
                onOpenSmartReminders();
              }}
              className="p-1.5 sm:p-2 rounded-xl bg-indigo-950/60 hover:bg-indigo-900 border border-indigo-700/50 text-indigo-300 transition"
              title="التذكيرات الذكية ومواعيد المذاكرة"
            >
              <Bell className="w-3.5 h-3.5 text-indigo-300" />
            </button>
          )}

          {/* Shop Modal Trigger */}
          <button
            id="nav-shop-button"
            onClick={() => {
              playSound.click();
              onOpenShop();
            }}
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-300 font-black text-xs transition shadow-sm"
            title="متجر الأدوات والقدرات السحرية"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            <span>{profile.coins}</span>
            <span>💎</span>
          </button>

          {/* Hearts */}
          <div
            className="flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-xl bg-rose-950/60 border border-rose-700/50 text-rose-400 font-extrabold text-xs shadow-sm"
            title="طاقة القلوب المتبقية"
          >
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>{profile.hearts}</span>
          </div>

          {/* Achievements Trigger */}
          <button
            id="nav-achievements-button"
            onClick={() => {
              playSound.click();
              onOpenAchievements();
            }}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-yellow-400 transition"
            title="لوحة الأوسمة والإنجازات"
          >
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Font Size Adjuster for Kid Yousef */}
          {onCycleFontSize && (
            <button
              id="nav-fontsize-button"
              onClick={() => {
                playSound.click();
                onCycleFontSize();
              }}
              className="px-2 py-1 sm:px-2.5 sm:py-1 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/50 text-amber-300 font-black text-xs flex items-center gap-1 transition shadow-sm"
              title="تكبير حجم الكلمات والخط لسهولة القراءة للطفل الذكي يوسف"
            >
              <Type className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline text-[11px]">
                {profile.fontSizeMode === 'extra_large' ? 'خط كبير جداً' : profile.fontSizeMode === 'large' ? 'خط كبير' : 'خط عادي'}
              </span>
              <span className="sm:hidden text-[10px] font-black">
                {profile.fontSizeMode === 'extra_large' ? 'A++' : profile.fontSizeMode === 'large' ? 'A+' : 'A'}
              </span>
            </button>
          )}

          {/* Landscape / Fullscreen Assistant Trigger */}
          {onToggleFullscreenOrLandscape && (
            <button
              id="nav-landscape-button"
              onClick={() => {
                playSound.click();
                onToggleFullscreenOrLandscape();
              }}
              className="p-1.5 sm:p-2 rounded-xl bg-sky-950/60 hover:bg-sky-900 border border-sky-600/50 text-sky-300 transition"
              title="وضع العرض الأفقي للموبايل / الشاشة الكاملة كأنها جهاز ألعاب"
            >
              <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400" />
            </button>
          )}

          {/* Parent Zone Trigger */}
          <button
            id="nav-parent-dashboard-button"
            onClick={() => {
              playSound.click();
              onOpenParentDashboard();
            }}
            className="p-1.5 sm:p-2 rounded-xl bg-indigo-900/60 hover:bg-indigo-800 border border-indigo-700/60 text-indigo-300 transition"
            title="لوحة تحكم ولي الأمر"
          >
            <Users className="w-4 h-4" />
          </button>

          {/* Ambient Music Toggle */}
          <button
            id="nav-music-toggle-button"
            onClick={handleMusicToggle}
            className={`p-1.5 sm:p-2 rounded-xl border transition ${
              musicOn
                ? 'bg-purple-600/30 border-purple-400 text-purple-300 animate-pulse'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-400'
            }`}
            title={musicOn ? 'إيقاف موسيقى التركيز والمذاكرة الهادئة' : 'تشغيل موسيقى تركيز هادئة'}
          >
            <Music className="w-4 h-4" />
          </button>

          {/* Sound FX Toggle */}
          <button
            id="nav-sound-toggle-button"
            onClick={handleSoundToggle}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition"
            title={soundOn ? 'كتم المؤثرات الصوتية' : 'تشغيل المؤثرات الصوتية'}
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>
        </div>
      </div>
    </header>
  );
};

