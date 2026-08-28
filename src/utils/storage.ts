import { UserProfile, SubjectType, SmartReminderSettings, StreakMilestone } from '../types';
import { STREAK_MILESTONES } from '../data/curriculum';

const STORAGE_KEY = 'knowledge_champion_profile_v1';

// Helper to generate past consecutive date strings
function getRecentStudyDates(streakCount: number): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 0; i < Math.max(1, streakCount); i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
}

export const DEFAULT_REMINDER_SETTINGS: SmartReminderSettings = {
  enabled: true,
  time: '16:30',
  timeLabelAr: 'وقت العصر الذهبي (4:30 عصراً)',
  dailyTargetMinutes: 20,
  browserNotifications: false,
  daysOfWeek: [0, 1, 2, 3, 4, 5, 6]
};

const initialStreak = 6; // Set to 6 days so the student is 1 day away or can easily reach 7 days and trigger the 7-day visual celebration!
const initialDates = getRecentStudyDates(initialStreak);

export const DEFAULT_PROFILE: UserProfile = {
  name: 'يوسف',
  avatarId: 'falcon',
  level: 1,
  xp: 120,
  coins: 50,
  hearts: 5,
  maxHearts: 5,
  streakDays: initialStreak,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedQuestions: [],
  fontSizeMode: 'extra_large',
  unlockedLevels: {
    math: 2,
    arabic: 2,
    english: 2
  },
  starsEarned: {
    'math_1': 3,
    'arabic_1': 2,
    'english_1': 3
  },
  unlockedBadges: ['first_step', 'streak_3'],
  activeStudyDates: initialDates,
  streakShields: 1,
  streakMilestonesClaimed: [3],
  smartReminder: DEFAULT_REMINDER_SETTINGS,
  stats: {
    totalCorrect: 12,
    totalAnswered: 14,
    mathScore: 85,
    arabicScore: 90,
    englishScore: 88,
    highScoreSpeedMath: 80,
    completedSpellingBee: 4,
    grammarCatchScore: 60
  },
  customHomeReward: 'ساعة لعب بلايستيشن إضافية أو نزهة في الحديقة 🎮🌳',
  parentPin: '1234'
};

export function loadUserProfile(): UserProfile {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return DEFAULT_PROFILE;
    const parsed: UserProfile = JSON.parse(data);
    
    // Automatically personalize for Yousef if default name was present
    if (!parsed.name || parsed.name === 'بطل المعرفة') {
      parsed.name = 'يوسف';
    }

    if (!parsed.fontSizeMode) {
      parsed.fontSizeMode = 'extra_large';
    }
    
    const today = new Date().toISOString().split('T')[0];
    
    // Ensure activeStudyDates exists
    if (!parsed.activeStudyDates || parsed.activeStudyDates.length === 0) {
      parsed.activeStudyDates = getRecentStudyDates(parsed.streakDays || 1);
    }
    
    // Ensure today is logged if active
    if (!parsed.activeStudyDates.includes(today)) {
      parsed.activeStudyDates.push(today);
    }

    if (!parsed.smartReminder) {
      parsed.smartReminder = DEFAULT_REMINDER_SETTINGS;
    }

    if (parsed.streakShields === undefined) {
      parsed.streakShields = 1;
    }

    if (!parsed.streakMilestonesClaimed) {
      parsed.streakMilestonesClaimed = parsed.streakDays >= 3 ? [3] : [];
    }

    // Check daily streak & hearts refill
    if (parsed.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (parsed.lastActiveDate === yesterday) {
        // Consecutive day
        parsed.streakDays = (parsed.streakDays || 1) + 1;
      } else {
        // missed days - check if has shield
        if (parsed.streakShields && parsed.streakShields > 0) {
          parsed.streakShields -= 1; // used shield to preserve streak
        } else {
          parsed.streakDays = 1;
        }
      }
      parsed.lastActiveDate = today;
      // Refill hearts to max daily
      parsed.hearts = parsed.maxHearts;
      saveUserProfile(parsed);
    }
    
    return { ...DEFAULT_PROFILE, ...parsed };
  } catch (e) {
    console.error('Error loading user profile:', e);
    return DEFAULT_PROFILE;
  }
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving user profile:', e);
  }
}

export function calculateLevelFromXp(xp: number): number {
  return Math.max(1, Math.floor(Math.sqrt(xp / 50)) + 1);
}

/**
 * Records an active study action for today and updates streak
 */
export function recordStudySession(profile: UserProfile): UserProfile {
  const today = new Date().toISOString().split('T')[0];
  const dates = profile.activeStudyDates ? [...profile.activeStudyDates] : [];
  
  if (!dates.includes(today)) {
    dates.push(today);
  }

  // Check badges unlock for streak
  const unlockedBadges = [...profile.unlockedBadges];
  if (profile.streakDays >= 3 && !unlockedBadges.includes('streak_3')) {
    unlockedBadges.push('streak_3');
  }
  if (profile.streakDays >= 7 && !unlockedBadges.includes('streak_7')) {
    unlockedBadges.push('streak_7');
  }
  if (profile.streakDays >= 14 && !unlockedBadges.includes('streak_14')) {
    unlockedBadges.push('streak_14');
  }
  if (profile.streakDays >= 30 && !unlockedBadges.includes('streak_30')) {
    unlockedBadges.push('streak_30');
  }

  const updated: UserProfile = {
    ...profile,
    activeStudyDates: dates,
    unlockedBadges,
    lastActiveDate: today
  };

  saveUserProfile(updated);
  return updated;
}

/**
 * Manually adds or advances a streak day for test/encouragement or daily study check-in
 */
export function advanceStreakDay(profile: UserProfile): UserProfile {
  const nextStreak = (profile.streakDays || 0) + 1;
  const today = new Date();
  const dates = profile.activeStudyDates ? [...profile.activeStudyDates] : [];
  const todayStr = today.toISOString().split('T')[0];
  if (!dates.includes(todayStr)) {
    dates.push(todayStr);
  }

  const unlockedBadges = [...profile.unlockedBadges];
  if (nextStreak >= 3 && !unlockedBadges.includes('streak_3')) {
    unlockedBadges.push('streak_3');
  }
  if (nextStreak >= 7 && !unlockedBadges.includes('streak_7')) {
    unlockedBadges.push('streak_7');
  }
  if (nextStreak >= 14 && !unlockedBadges.includes('streak_14')) {
    unlockedBadges.push('streak_14');
  }
  if (nextStreak >= 30 && !unlockedBadges.includes('streak_30')) {
    unlockedBadges.push('streak_30');
  }

  const updated: UserProfile = {
    ...profile,
    streakDays: nextStreak,
    activeStudyDates: dates,
    unlockedBadges,
    lastActiveDate: todayStr
  };

  saveUserProfile(updated);
  return updated;
}

/**
 * Claims reward for reaching a streak milestone
 */
export function claimStreakMilestoneReward(
  profile: UserProfile,
  milestone: StreakMilestone
): { updatedProfile: UserProfile; success: boolean } {
  const claimed = profile.streakMilestonesClaimed ? [...profile.streakMilestonesClaimed] : [];
  if (claimed.includes(milestone.dayCount)) {
    return { updatedProfile: profile, success: false };
  }

  claimed.push(milestone.dayCount);
  const unlockedBadges = [...profile.unlockedBadges];
  if (!unlockedBadges.includes(milestone.badgeId)) {
    unlockedBadges.push(milestone.badgeId);
  }

  const updatedProfile: UserProfile = {
    ...profile,
    coins: profile.coins + milestone.rewardCoins,
    xp: profile.xp + milestone.rewardXp,
    streakMilestonesClaimed: claimed,
    unlockedBadges
  };

  saveUserProfile(updatedProfile);
  return { updatedProfile, success: true };
}

