import { UserProfile, DailyAdaptiveChallenge, Question, MistakeLog, SubjectType } from '../types';
import { QUESTIONS_BANK } from '../data/curriculum';

const CHALLENGE_STORAGE_KEY_PREFIX = 'adaptive_daily_challenge_';

export interface WeakTopicAnalysis {
  subject: SubjectType;
  topic: string;
  topicTitleAr: string;
  mistakeCount: number;
  unresolvedCount: number;
  questionIds: string[];
}

/**
 * Analyzes the user's past mistakes to find weakest topics
 */
export function analyzeWeakTopics(profile: UserProfile): WeakTopicAnalysis[] {
  const mistakes = profile.mistakesHistory || [];
  if (mistakes.length === 0) return [];

  const topicMap = new Map<string, WeakTopicAnalysis>();

  mistakes.forEach((m) => {
    const key = `${m.subject}__${m.topic}`;
    if (!topicMap.has(key)) {
      topicMap.set(key, {
        subject: m.subject,
        topic: m.topic,
        topicTitleAr: m.topicTitleAr || m.topic,
        mistakeCount: 0,
        unresolvedCount: 0,
        questionIds: []
      });
    }
    const item = topicMap.get(key)!;
    item.mistakeCount += 1;
    if (!m.resolved) {
      item.unresolvedCount += 1;
    }
    if (!item.questionIds.includes(m.questionId)) {
      item.questionIds.push(m.questionId);
    }
  });

  return Array.from(topicMap.values()).sort((a, b) => {
    // Sort by unresolved first, then total mistakes
    if (b.unresolvedCount !== a.unresolvedCount) {
      return b.unresolvedCount - a.unresolvedCount;
    }
    return b.mistakeCount - a.mistakeCount;
  });
}

/**
 * Generates personalized, curriculum-aligned Iraqi 6th Grade daily challenges
 */
export function generatePersonalizedChallenges(profile: UserProfile): DailyAdaptiveChallenge[] {
  const weakTopics = analyzeWeakTopics(profile);
  const today = new Date().toISOString().split('T')[0];
  const challenges: DailyAdaptiveChallenge[] = [];

  // 1. Weakness Booster Challenge
  if (weakTopics.length > 0 && weakTopics[0].unresolvedCount > 0) {
    const primaryWeak = weakTopics[0];
    const relatedQuestions = QUESTIONS_BANK.filter(
      (q) => q.subject === primaryWeak.subject && (q.topic === primaryWeak.topic || primaryWeak.questionIds.includes(q.id))
    );
    const targetIds = relatedQuestions.slice(0, 4).map((q) => q.id);

    challenges.push({
      id: `weakness_${today}_${primaryWeak.topic}`,
      title: `علاج وتثبيت: ${primaryWeak.topicTitleAr}`,
      description: `أجب عن ${Math.max(2, Math.min(3, targetIds.length))} أسئلة تدريبية مخصصة في موضوع (${primaryWeak.topicTitleAr}) لتجاوز الأخطاء السابقة بتفوق.`,
      subject: primaryWeak.subject,
      topic: primaryWeak.topic,
      targetCount: Math.max(2, Math.min(3, targetIds.length || 3)),
      currentCount: 0,
      completed: false,
      rewardCoins: 40,
      rewardXp: 60,
      type: 'weakness_fix',
      reason: `تم التوليد ذكياً لأنك واجهت صعوبة سابقة في ${primaryWeak.topicTitleAr}`,
      targetQuestionIds: targetIds.length > 0 ? targetIds : undefined
    });
  } else {
    // Foundational Iraq 6th Primary challenge (Arabic Grammar Core)
    const arabicCore = QUESTIONS_BANK.filter((q) => q.subject === 'arabic' && (q.topic.includes('noun') || q.topic.includes('kana') || q.topic.includes('object')));
    challenges.push({
      id: `mastery_arabic_${today}`,
      title: 'إتقان قواعد اللغة العربية الوزارية',
      description: 'حل 3 أسئلة في القواعد النحوية (المبتدأ والخبر، كان وأخواتها، المفاعيل) لتعزيز دقتك الإعرابية.',
      subject: 'arabic',
      topic: 'arabic_core_grammar',
      targetCount: 3,
      currentCount: 0,
      completed: false,
      rewardCoins: 35,
      rewardXp: 50,
      type: 'concept_mastery',
      reason: 'تحدٍ وزاري مقترح لتثبيت القواعد الأساسية للمنهج العراقي',
      targetQuestionIds: arabicCore.slice(0, 4).map((q) => q.id)
    });
  }

  // 2. Second Challenge: Secondary Weakness or Math Operations / Fractions
  if (weakTopics.length > 1) {
    const secondaryWeak = weakTopics[1];
    const relatedQuestions = QUESTIONS_BANK.filter(
      (q) => q.subject === secondaryWeak.subject && q.topic === secondaryWeak.topic
    );
    challenges.push({
      id: `weakness_${today}_${secondaryWeak.topic}`,
      title: `تقوية: ${secondaryWeak.topicTitleAr}`,
      description: `أكمل تمرين التركيز في مادة ${secondaryWeak.subject === 'math' ? 'الرياضيات' : secondaryWeak.subject === 'arabic' ? 'اللغة العربية' : 'اللغة الإنجليزية'}.`,
      subject: secondaryWeak.subject,
      topic: secondaryWeak.topic,
      targetCount: 3,
      currentCount: 0,
      completed: false,
      rewardCoins: 35,
      rewardXp: 50,
      type: 'weakness_fix',
      reason: `تحسين أدائك في ${secondaryWeak.topicTitleAr}`,
      targetQuestionIds: relatedQuestions.slice(0, 3).map((q) => q.id)
    });
  } else {
    // Math challenge (Fractions, Percentages, Operations)
    const mathQuestions = QUESTIONS_BANK.filter((q) => q.subject === 'math' && q.level <= (profile.unlockedLevels.math || 3));
    challenges.push({
      id: `mastery_math_${today}`,
      title: 'تحدي عباقرة الرياضيات المطور',
      description: 'حل 3 مسائل رياضية (الكسور، التناسب والعمليات) بدون استخدام وسائل مساعدة.',
      subject: 'math',
      topic: 'math_operations',
      targetCount: 3,
      currentCount: 0,
      completed: false,
      rewardCoins: 40,
      rewardXp: 55,
      type: 'concept_mastery',
      reason: 'تدريب على مهارات الحساب السريع والتفكير المنطقي',
      targetQuestionIds: mathQuestions.slice(0, 4).map((q) => q.id)
    });
  }

  // 3. Third Challenge: English for Iraq or Comprehensive Ministry Drill
  const englishQuestions = QUESTIONS_BANK.filter((q) => q.subject === 'english');
  challenges.push({
    id: `drill_english_${today}`,
    title: 'تحدي English for Iraq الوزاري',
    description: 'أجب عن 3 أسئلة في مفردات الوظائف وأماكن العمل وقواعد الزمن والأمان الرقمي.',
    subject: 'english',
    topic: 'english_iraq_drills',
    targetCount: 3,
    currentCount: 0,
    completed: false,
    rewardCoins: 30,
    rewardXp: 45,
    type: 'exam_drill',
    reason: 'مراجعة نموذجية لأسئلة البكالوريا والامتحان النهائي',
    targetQuestionIds: englishQuestions.slice(0, 4).map((q) => q.id)
  });

  return challenges;
}

/**
 * Retrieves valid daily challenges or initializes fresh ones for today
 */
export function getOrRefreshDailyChallenges(profile: UserProfile, forceRefresh = false): {
  challenges: DailyAdaptiveChallenge[];
  updatedProfile: UserProfile;
} {
  const today = new Date().toISOString().split('T')[0];

  if (!forceRefresh && profile.dailyChallenges && profile.dailyChallengesDate === today && profile.dailyChallenges.length > 0) {
    return {
      challenges: profile.dailyChallenges,
      updatedProfile: profile
    };
  }

  const newChallenges = generatePersonalizedChallenges(profile);
  const updatedProfile: UserProfile = {
    ...profile,
    dailyChallenges: newChallenges,
    dailyChallengesDate: today
  };

  return {
    challenges: newChallenges,
    updatedProfile
  };
}

/**
 * Gets the actual question objects for a specific adaptive challenge
 */
export function getQuestionsForDailyChallenge(challenge: DailyAdaptiveChallenge): Question[] {
  if (challenge.targetQuestionIds && challenge.targetQuestionIds.length > 0) {
    const matched = QUESTIONS_BANK.filter((q) => challenge.targetQuestionIds?.includes(q.id));
    if (matched.length > 0) {
      // If matched has enough questions return them
      if (matched.length >= challenge.targetCount) {
        return matched.slice(0, challenge.targetCount);
      }
      // Fill the rest from the same subject/topic
      const additional = QUESTIONS_BANK.filter(
        (q) => q.subject === challenge.subject && !matched.some((m) => m.id === q.id)
      );
      return [...matched, ...additional].slice(0, challenge.targetCount);
    }
  }

  // Fallback: get by topic or subject
  const topicQuestions = QUESTIONS_BANK.filter(
    (q) => q.subject === challenge.subject && (challenge.topic ? q.topic === challenge.topic : true)
  );

  if (topicQuestions.length >= challenge.targetCount) {
    return topicQuestions.slice(0, challenge.targetCount);
  }

  const subjectQuestions = QUESTIONS_BANK.filter((q) => q.subject === challenge.subject);
  return subjectQuestions.slice(0, Math.max(challenge.targetCount, 3));
}

/**
 * Logs a student's incorrect answer to track weakness
 */
export function recordMistakeInProfile(
  profile: UserProfile,
  question: Question,
  selectedAnswer: string
): UserProfile {
  const currentHistory: MistakeLog[] = profile.mistakesHistory ? [...profile.mistakesHistory] : [];

  const existingIndex = currentHistory.findIndex((m) => m.questionId === question.id);
  if (existingIndex >= 0) {
    currentHistory[existingIndex] = {
      ...currentHistory[existingIndex],
      selectedAnswer,
      timestamp: Date.now(),
      resolved: false
    };
  } else {
    currentHistory.push({
      questionId: question.id,
      subject: question.subject,
      topic: question.topic,
      topicTitleAr: question.topicTitleAr,
      level: question.level,
      questionText: question.question,
      selectedAnswer,
      correctAnswer: question.correctAnswer,
      timestamp: Date.now(),
      resolved: false
    });
  }

  // Keep last 40 mistakes
  const trimmed = currentHistory.slice(-40);

  return {
    ...profile,
    mistakesHistory: trimmed
  };
}

/**
 * Marks a question as resolved when the student answers it correctly
 */
export function recordSuccessInProfile(profile: UserProfile, question: Question): UserProfile {
  if (!profile.mistakesHistory || profile.mistakesHistory.length === 0) return profile;

  let hasChanged = false;
  const updatedHistory = profile.mistakesHistory.map((m) => {
    if (m.questionId === question.id && !m.resolved) {
      hasChanged = true;
      return { ...m, resolved: true };
    }
    return m;
  });

  if (!hasChanged) return profile;

  return {
    ...profile,
    mistakesHistory: updatedHistory
  };
}

/**
 * Updates daily challenge progress when student completes a question or challenge session
 */
export function incrementDailyChallengeProgress(
  profile: UserProfile,
  subject: SubjectType,
  topic?: string,
  count = 1
): { updatedProfile: UserProfile; completedChallenge?: DailyAdaptiveChallenge } {
  if (!profile.dailyChallenges || profile.dailyChallenges.length === 0) {
    return { updatedProfile: profile };
  }

  let completedChallenge: DailyAdaptiveChallenge | undefined;

  const updatedChallenges = profile.dailyChallenges.map((ch) => {
    if (ch.completed) return ch;

    const matchesSubject = ch.subject === subject;
    const matchesTopic = !ch.topic || ch.topic === topic || ch.type === 'exam_drill';

    if (matchesSubject || matchesTopic) {
      const newCount = Math.min(ch.targetCount, ch.currentCount + count);
      const isNowCompleted = newCount >= ch.targetCount;

      if (isNowCompleted && !ch.completed) {
        completedChallenge = { ...ch, currentCount: newCount, completed: true };
      }

      return {
        ...ch,
        currentCount: newCount,
        completed: isNowCompleted
      };
    }
    return ch;
  });

  return {
    updatedProfile: {
      ...profile,
      dailyChallenges: updatedChallenges
    },
    completedChallenge
  };
}
