export type SubjectType = 'math' | 'arabic' | 'english';

export interface Question {
  id: string;
  subject: SubjectType;
  topic: string;
  topicTitleAr: string;
  level: number; // 1 to 10
  question: string;
  questionEn?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  hint?: string;
  points: number;
  type?: 'multiple_choice' | 'true_false' | 'fill_blank' | 'reorder';
  equationOrExtra?: string;
  visualData?: {
    type: 'fraction' | 'geometry' | 'table' | 'word_highlight';
    data: any;
  };
}

export interface LessonUnit {
  id: string;
  subject: SubjectType;
  title: string;
  icon: string;
  description: string;
  gradeLevel: string;
  totalStages: number;
  color: string;
  accentColor: string;
  badgeName: string;
  badgeIcon: string;
}

export interface PowerUpInventory {
  shields: number;
  fiftyFifties: number;
  timeFreezes: number;
  doubleXp: number;
}

export interface MistakeLog {
  questionId: string;
  subject: SubjectType;
  topic: string;
  topicTitleAr: string;
  level: number;
  questionText: string;
  selectedAnswer: string;
  correctAnswer: string;
  timestamp: number;
  resolved: boolean;
}

export interface DailyAdaptiveChallenge {
  id: string;
  title: string;
  description: string;
  subject: SubjectType;
  topic: string;
  targetCount: number;
  currentCount: number;
  completed: boolean;
  rewardCoins: number;
  rewardXp: number;
  type: 'weakness_fix' | 'concept_mastery' | 'exam_drill';
  reason: string; // e.g. "تم توليده بناءً على أخطاء سابقة في المفعول المطلق"
  targetQuestionIds?: string[];
}

export interface UserProfile {
  name: string;
  avatarId: string;
  level: number;
  xp: number;
  coins: number;
  hearts: number;
  maxHearts: number;
  streakDays: number;
  lastActiveDate: string;
  completedQuestions: string[]; // question ids
  unlockedLevels: Record<SubjectType, number>;
  starsEarned: Record<string, number>; // levelId -> stars (1-3)
  unlockedBadges: string[];
  inventory?: PowerUpInventory;
  mistakesHistory?: MistakeLog[];
  dailyChallenges?: DailyAdaptiveChallenge[];
  dailyChallengesDate?: string;
  stats: {
    totalCorrect: number;
    totalAnswered: number;
    mathScore: number;
    arabicScore: number;
    englishScore: number;
    highScoreSpeedMath: number;
    completedSpellingBee: number;
    grammarCatchScore: number;
    completedMockExams?: number;
    highestExamScore?: number;
  };
  customHomeReward?: string;
  parentPin?: string;
  activeStudyDates?: string[]; // list of 'YYYY-MM-DD' dates studied
  streakShields?: number; // streak freeze protections
  streakMilestonesClaimed?: number[]; // e.g. [3, 7, 14, 30]
  smartReminder?: SmartReminderSettings;
  fontSizeMode?: 'standard' | 'large' | 'extra_large';
}

export interface SmartReminderSettings {
  enabled: boolean;
  time: string; // e.g. "16:30"
  timeLabelAr: string; // e.g. "وقت العصر الذهبي (4:30 عصراً)"
  dailyTargetMinutes: number;
  browserNotifications: boolean;
  daysOfWeek: number[]; // 0=Sun, 1=Mon, ..., 6=Sat
}

export interface StreakMilestone {
  dayCount: number;
  badgeId: string;
  badgeTitle: string;
  rewardCoins: number;
  rewardXp: number;
  icon: string;
  description: string;
}

export interface Badge {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  icon: string;
  category: SubjectType | 'general';
  requiredXp?: number;
  requiredStars?: number;
  unlocked: boolean;
}

export interface AvatarOption {
  id: string;
  name: string;
  nameEn: string;
  emoji: string;
  description: string;
  bgGradient: string;
  minLevel: number;
  priceCoins?: number;
}

export interface TextbookLesson {
  id: string;
  subject: SubjectType;
  level: number; // 1 to 10
  unitNumber: number;
  unitTitle: string;
  lessonNumber: number;
  lessonTitle: string;
  bookPageRange: string;
  estimatedMinutes: number;
  objective: string;
  summaryPoints: string[];
  workedExamples: {
    problem: string;
    solution: string;
    note?: string;
  }[];
  goldenTip: string;
  keyFormulasOrRules?: string[];
}

export interface Flashcard {
  id: string;
  subject: SubjectType;
  topic: string;
  title: string;
  front: string;
  back: string;
  example?: string;
  tag: string;
  color: string;
}

export interface MockExamQuestion extends Question {
  selectedAnswer?: string;
  isCorrect?: boolean;
}

export interface MockExamResult {
  id: string;
  date: string;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  timeSpentSeconds: number;
  subjectBreakdown: {
    math: { total: number; correct: number };
    arabic: { total: number; correct: number };
    english: { total: number; correct: number };
  };
  gradeLabel: string;
}
