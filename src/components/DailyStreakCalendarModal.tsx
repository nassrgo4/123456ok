import React, { useState } from 'react';
import { UserProfile, StreakMilestone } from '../types';
import { STREAK_MILESTONES } from '../data/curriculum';
import { playSound } from '../utils/audio';
import { advanceStreakDay, claimStreakMilestoneReward } from '../utils/storage';
import confetti from 'canvas-confetti';
import {
  Flame,
  X,
  Calendar as CalendarIcon,
  Crown,
  Sparkles,
  Award,
  Shield,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Bell,
  Zap,
  Gift,
  HelpCircle,
  Clock,
  HeartHandshake
} from 'lucide-react';

interface DailyStreakCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onOpenReminders: () => void;
  onTrigger7DayCelebration: () => void;
}

const ARABIC_DAYS = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
const ARABIC_MONTHS = [
  'كانون الثاني (يناير)',
  'شباط (فبراير)',
  'آذار (مارس)',
  'نيسان (أبريل)',
  'أيار (مايو)',
  'حزيران (يونيو)',
  'تموز (يوليو)',
  'آب (أغسطس)',
  'أيلول (سبتمبر)',
  'تشرين الأول (أكتوبر)',
  'تشرين الثاني (نوفمبر)',
  'كانون الأول (ديسمبر)'
];

export const DailyStreakCalendarModal: React.FC<DailyStreakCalendarModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  onOpenReminders,
  onTrigger7DayCelebration
}) => {
  if (!isOpen) return null;

  const [currentDate] = useState(new Date());
  const todayStr = new Date().toISOString().split('T')[0];
  const activeDates = profile.activeStudyDates || [todayStr];
  const streakCount = profile.streakDays || 1;
  const claimedMilestones = profile.streakMilestonesClaimed || [];

  // Generate calendar days for current month
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
  // Convert Sunday-first to Saturday-first for Iraqi school week if needed
  // In Iraq: Sat=0, Sun=1, Mon=2, Tue=3, Wed=4, Thu=5, Fri=6
  const adjustedFirstDay = (firstDayIndex + 1) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handleAdvanceDayTest = () => {
    playSound.dailyQuestComplete();
    const updated = advanceStreakDay(profile);
    onUpdateProfile(updated);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}

    // If reached 7 days, trigger the special 7-day visual celebration!
    if (updated.streakDays === 7 || (updated.streakDays % 7 === 0)) {
      onTrigger7DayCelebration();
    }
  };

  const handleClaimMilestone = (milestone: StreakMilestone) => {
    playSound.victory();
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#f59e0b', '#10b981', '#6366f1']
      });
    } catch {}

    const result = claimStreakMilestoneReward(profile, milestone);
    if (result.success) {
      onUpdateProfile(result.updatedProfile);
      if (milestone.dayCount === 7) {
        onTrigger7DayCelebration();
      }
    }
  };

  const handleBuyStreakShield = () => {
    if (profile.coins < 30) {
      playSound.wrong();
      return;
    }
    playSound.coinShower();
    const updated: UserProfile = {
      ...profile,
      coins: profile.coins - 30,
      streakShields: (profile.streakShields || 0) + 1
    };
    onUpdateProfile(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in text-right">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-850 via-slate-800 to-slate-850 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-slate-950 flex items-center justify-center shadow-lg font-black text-xl">
              <Flame className="w-6 h-6 fill-slate-950 text-slate-950 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">
                  أوسمة وتقويم الإنجاز اليومي (Daily Streak)
                </h3>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {streakCount} أيام متتالية 🔥
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                سجل أيام حضورك ومذاكرتك اليومية لتحصيل التيجان والأوسمة الذهبية
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playSound.click();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Top Highlight Banner */}
          <div className="relative overflow-hidden rounded-3xl p-4 sm:p-5 bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-rose-500/20 border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg border-2 border-amber-300">
                  🔥
                </div>
                <div className="absolute -bottom-1 -left-1 px-1.5 py-0.2 rounded-md bg-slate-900 border border-amber-400 text-[10px] font-extrabold text-amber-300">
                  x{streakCount}
                </div>
              </div>

              <div>
                <h4 className="text-sm sm:text-base font-black text-white">
                  شعلة الحماس مشتعلة منذ {streakCount} {streakCount >= 3 && streakCount <= 10 ? 'أيام' : 'يوماً'}!
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  {streakCount >= 7 ? (
                    <span className="text-emerald-300 font-bold flex items-center gap-1">
                      <Crown className="w-3.5 h-3.5 text-amber-400" />
                      حققت إنجاز الـ 7 أيام الذهبي! حافظ على شعلتك للوصول لـ 14 يوماً.
                    </span>
                  ) : (
                    <span>
                      باقي <strong className="text-amber-300">{7 - streakCount} أيام</strong> للوصول لـ <strong>تاج الأسبوع الذهبي (7 أيام متتالية) 👑</strong>
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                id="open-reminders-from-streak"
                onClick={() => {
                  playSound.click();
                  onOpenReminders();
                }}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition shadow"
              >
                <Bell className="w-3.5 h-3.5 text-indigo-400" />
                <span>ضبط التذكيرات</span>
              </button>

              <button
                id="advance-streak-study-btn"
                onClick={handleAdvanceDayTest}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition shadow-lg active:scale-95"
                title="تسجيل إنجاز يوم دراسي إضافي"
              >
                <Zap className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
                <span>تسجيل دراسة اليوم +1</span>
              </button>
            </div>
          </div>

          {/* 7-Day Current Week Visual Road */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-extrabold text-white">
                  مسار الأسبوع نحو تاج الـ 7 أيام الذهبي:
                </span>
              </div>
              <span className="text-[11px] font-bold text-amber-400">
                {Math.min(7, streakCount)}/7 أيام
              </span>
            </div>

            <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center">
              {[1, 2, 3, 4, 5, 6, 7].map((dayNum) => {
                const isPassed = streakCount >= dayNum;
                const isCurrent = streakCount === dayNum;
                const isCrownDay = dayNum === 7;

                return (
                  <div
                    key={dayNum}
                    className={`p-2 rounded-xl border flex flex-col items-center justify-between gap-1 transition ${
                      isPassed
                        ? 'bg-gradient-to-b from-amber-500/20 to-orange-500/10 border-amber-400/60 text-amber-300'
                        : 'bg-slate-900/60 border-slate-700/60 text-slate-500'
                    } ${isCurrent ? 'ring-2 ring-amber-400 shadow-md shadow-amber-500/20' : ''}`}
                  >
                    <span className="text-[10px] font-bold">يوم {dayNum}</span>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-black ${
                      isPassed
                        ? isCrownDay
                          ? 'bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 shadow'
                          : 'bg-amber-400 text-slate-950'
                        : 'bg-slate-800 text-slate-600'
                    }`}>
                      {isPassed ? (isCrownDay ? '👑' : '🔥') : dayNum}
                    </div>
                    <span className="text-[9px] font-extrabold">
                      {isPassed ? (isCrownDay ? '+100💎' : 'مكتمل ✓') : isCrownDay ? 'تاج الذهب' : 'قيد التقدم'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Monthly Calendar Grid View */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs sm:text-sm font-black text-white">
                  تقويم شهر {ARABIC_MONTHS[month]} {year}
                </h4>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span>أيام تمت فيها الدراسة ({activeDates.length} أيام)</span>
              </div>
            </div>

            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 py-1">
              {ARABIC_DAYS.map((dayName, idx) => (
                <div key={idx} className="py-1">
                  {dayName}
                </div>
              ))}
            </div>

            {/* Calendar Days Matrix */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {/* Empty padding for start of month */}
              {Array.from({ length: adjustedFirstDay }).map((_, idx) => (
                <div key={`empty-${idx}`} className="h-10 sm:h-12 rounded-xl bg-slate-900/30" />
              ))}

              {/* Days of current month */}
              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const dayNum = idx + 1;
                const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                const isStudied = activeDates.includes(formattedDate);
                const isToday = formattedDate === todayStr;

                return (
                  <div
                    key={dayNum}
                    className={`h-11 sm:h-13 rounded-xl border p-1 flex flex-col items-center justify-between text-xs transition relative ${
                      isStudied
                        ? 'bg-gradient-to-br from-amber-500/25 via-amber-600/10 to-slate-900 border-amber-400/60 text-amber-200 font-black shadow-sm'
                        : isToday
                        ? 'bg-slate-800 border-indigo-400 text-white font-bold'
                        : 'bg-slate-900/60 border-slate-750 text-slate-400'
                    } ${isToday ? 'ring-2 ring-indigo-500/70' : ''}`}
                  >
                    <div className="flex items-center justify-between w-full px-1">
                      <span className="text-[11px]">{dayNum}</span>
                      {isToday && (
                        <span className="text-[8px] px-1 py-0.2 rounded bg-indigo-500 text-white font-black">
                          اليوم
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-center">
                      {isStudied ? (
                        <span className="text-sm sm:text-base animate-pulse">🔥</span>
                      ) : (
                        <span className="text-[10px] text-slate-600 font-bold">•</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Streak Milestone Badges */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-400" />
                <h4 className="text-xs sm:text-sm font-black text-white">
                  أوسمة الإنجاز اليومي والجوائز الكبرى:
                </h4>
              </div>
              <span className="text-xs text-slate-400">
                استلم مكافآت التفوق عند وصول الأيام المحددة
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {STREAK_MILESTONES.map((milestone) => {
                const isReached = streakCount >= milestone.dayCount;
                const isClaimed = claimedMilestones.includes(milestone.dayCount);
                const is7Day = milestone.dayCount === 7;

                return (
                  <div
                    key={milestone.dayCount}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition ${
                      isReached
                        ? is7Day
                          ? 'bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-slate-800 border-amber-400/80 shadow-md'
                          : 'bg-slate-800/90 border-amber-500/40 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl font-bold shadow ${
                        isReached
                          ? is7Day
                            ? 'bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 animate-bounce'
                            : 'bg-amber-400 text-slate-950'
                          : 'bg-slate-800 text-slate-600'
                      }`}>
                        {is7Day ? '👑' : milestone.icon === 'Flame' ? '🔥' : milestone.icon === 'Shield' ? '🛡️' : '🏆'}
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <h5 className={`text-xs font-black ${isReached ? 'text-white' : 'text-slate-400'}`}>
                            {milestone.badgeTitle}
                          </h5>
                          <span className="text-[10px] font-bold text-amber-400">
                            ({milestone.dayCount} أيام)
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                          {milestone.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-[10px] font-extrabold text-amber-300">
                          <span>+{milestone.rewardCoins} 💎</span>
                          <span>+{milestone.rewardXp} XP</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      {isClaimed ? (
                        <div className="px-2.5 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[11px] font-black flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>تم الاستلام</span>
                        </div>
                      ) : isReached ? (
                        <button
                          onClick={() => handleClaimMilestone(milestone)}
                          className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1 shadow-lg transition animate-bounce ${
                            is7Day
                              ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950'
                              : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                          }`}
                        >
                          <Gift className="w-3.5 h-3.5" />
                          <span>استلم!</span>
                        </button>
                      ) : (
                        <div className="px-2.5 py-1 rounded-xl bg-slate-800 text-slate-500 text-[10px] font-bold">
                          باقي {milestone.dayCount - streakCount} يوم
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Streak Freeze & Protection Mechanics */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-850 to-slate-900 border border-cyan-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-white flex items-center gap-2">
                  <span>درع حماية الشعلة (Streak Freeze)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-black">
                    لديك {profile.streakShields || 0} دروع
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] mt-0.5">
                  يحمي شعلة الـ Streak من الانكسار تلقائياً إذا انشغلت ولم تستطع الدخول ليوم واحد!
                </p>
              </div>
            </div>

            <button
              onClick={handleBuyStreakShield}
              disabled={profile.coins < 30}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition flex items-center gap-1.5 ${
                profile.coins >= 30
                  ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>شراء درع إضافي</span>
              <span className="font-black text-amber-300">(30 💎)</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-850 border-t border-slate-700 flex items-center justify-between">
          <div className="text-xs text-slate-400 font-medium hidden sm:flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-rose-400" />
            <span>المثابرة اليومية هي مفتاح الـ 100% في امتحانات السادس الابتدائي!</span>
          </div>

          <button
            onClick={() => {
              playSound.click();
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-black transition"
          >
            إغلاق التقويم
          </button>
        </div>
      </div>
    </div>
  );
};
