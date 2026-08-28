import React, { useState } from 'react';
import { SubjectType, UserProfile, TextbookLesson } from '../types';
import { TEXTBOOK_LESSONS } from '../data/lessonsData';
import { LESSON_UNITS } from '../data/curriculum';
import { LessonReaderModal } from './LessonReaderModal';
import { playSound } from '../utils/audio';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  Play, 
  ArrowLeft, 
  Bookmark, 
  Clock, 
  Award, 
  Star, 
  ChevronRight, 
  HelpCircle,
  GraduationCap,
  Volume2,
  FileText
} from 'lucide-react';

interface TextbookHubProps {
  profile: UserProfile;
  activeSubject: SubjectType;
  onSelectSubject: (sub: SubjectType) => void;
  onStartQuiz: (subject: SubjectType, level: number) => void;
  onBackToQuests: () => void;
}

export const TextbookHub: React.FC<TextbookHubProps> = ({
  profile,
  activeSubject,
  onSelectSubject,
  onStartQuiz,
  onBackToQuests
}) => {
  const [selectedLesson, setSelectedLesson] = useState<TextbookLesson | null>(null);
  const [isReaderOpen, setIsReaderOpen] = useState(false);

  const currentUnit = LESSON_UNITS.find(u => u.subject === activeSubject) || LESSON_UNITS[0];
  const subjectLessons = TEXTBOOK_LESSONS.filter(l => l.subject === activeSubject);
  const unlockedLevel = profile.unlockedLevels[activeSubject] || 1;

  // Calculate completed count
  const completedLessonsCount = subjectLessons.filter(l => l.level < unlockedLevel).length;
  const progressPercent = Math.min(100, Math.round((completedLessonsCount / subjectLessons.length) * 100));

  const handleOpenLesson = (lesson: TextbookLesson) => {
    playSound.click();
    setSelectedLesson(lesson);
    setIsReaderOpen(true);
  };

  const handleStartFromBeginning = () => {
    playSound.starPop();
    const firstLesson = subjectLessons.find(l => l.level === 1);
    if (firstLesson) {
      setSelectedLesson(firstLesson);
      setIsReaderOpen(true);
    }
  };

  const handleNavigateLesson = (newLevel: number) => {
    const nextL = subjectLessons.find(l => l.level === newLevel);
    if (nextL) {
      setSelectedLesson(nextL);
    }
  };

  return (
    <div className="space-y-6 pb-8 animate-fade-in text-right">
      {/* Top Breadcrumb & Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 p-4 sm:p-5 rounded-3xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold">
                منهج الصف السادس المطور
              </span>
              <span className="text-slate-400 text-xs">• درساً بدرساً</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">
              كتاب المنهج المدرسي التفاعلي
            </h1>
          </div>
        </div>

        {/* Subject Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 self-stretch sm:self-auto overflow-x-auto">
          <button
            id="tab-textbook-math"
            onClick={() => { playSound.click(); onSelectSubject('math'); }}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 flex-1 sm:flex-initial justify-center ${
              activeSubject === 'math'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>📐 الرياضيات</span>
          </button>
          <button
            id="tab-textbook-arabic"
            onClick={() => { playSound.click(); onSelectSubject('arabic'); }}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 flex-1 sm:flex-initial justify-center ${
              activeSubject === 'arabic'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>📖 لغتي الجميلة</span>
          </button>
          <button
            id="tab-textbook-english"
            onClick={() => { playSound.click(); onSelectSubject('english'); }}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 flex-1 sm:flex-initial justify-center ${
              activeSubject === 'english'
                ? 'bg-blue-500 text-white shadow-md font-black'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🇬🇧 English</span>
          </button>
        </div>
      </div>

      {/* Hero Banner for Current Subject Textbook */}
      <div className={`p-6 rounded-3xl bg-gradient-to-r ${currentUnit.color} text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6`}>
        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/25 backdrop-blur-sm text-amber-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ابدأ الآن من أول درس في كتاب {currentUnit.title}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            فهرس الكتاب والدروس بالتسلسل
          </h2>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
            اقرأ شرح كل درس ومفاهيمه وأمثلته المحلولة خطوة بخطوة، ثم انطلق فوراً لاختبار فهمك وحصد النجوم والأوسمة!
          </p>

          {/* Start From Lesson 1 Button */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              id="start-from-beginning-btn"
              onClick={handleStartFromBeginning}
              className="px-5 py-3 rounded-2xl bg-white text-slate-950 font-black text-sm shadow-xl flex items-center gap-2 hover:bg-amber-100 transition-all transform hover:scale-[1.03] active:scale-95"
            >
              <Play className="w-4 h-4 fill-current text-amber-600" />
              <span>ابدأ من الدرس الأول (ص 1) 🚀</span>
            </button>
            <button
              onClick={onBackToQuests}
              className="px-4 py-3 rounded-2xl bg-black/25 hover:bg-black/35 text-white text-xs font-bold transition-all border border-white/20"
            >
              خريطة التحديات 🗺️
            </button>
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-black/30 backdrop-blur-md p-5 rounded-3xl border border-white/20 w-full md:w-64 flex-shrink-0 z-10">
          <div className="flex items-center justify-between text-xs text-amber-300 font-bold mb-2">
            <span>نسبة إنجاز الكتاب</span>
            <span className="font-mono text-base font-black text-white">{progressPercent}%</span>
          </div>
          <div className="w-full bg-black/40 h-3 rounded-full overflow-hidden p-0.5 border border-white/10 mb-3">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-200 flex items-center justify-between">
            <span>الدروس المتقنة:</span>
            <span className="font-bold text-white">{completedLessonsCount} من {subjectLessons.length} دروس</span>
          </div>
        </div>
      </div>

      {/* Lessons Table of Contents Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-base sm:text-lg font-bold text-slate-200 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-400" />
            <span>قائمة دروس الكتاب (مرتبة حسب الوحدات الدراسية):</span>
          </h3>
          <span className="text-xs text-slate-400">10 دروس تعليمية متكاملة</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjectLessons.map((lesson) => {
            const isUnlocked = lesson.level <= unlockedLevel;
            const isCompleted = lesson.level < unlockedLevel;
            const isCurrent = lesson.level === unlockedLevel;
            const stageKey = `${activeSubject}_${lesson.level}`;
            const stars = profile.starsEarned[stageKey] || (isCompleted ? 3 : 0);

            return (
              <div
                key={lesson.id}
                id={`lesson-card-${lesson.id}`}
                className={`p-5 rounded-3xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between gap-4 ${
                  isCurrent
                    ? 'bg-slate-900 border-amber-400/80 ring-2 ring-amber-400/20 shadow-xl'
                    : isCompleted
                    ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                    : 'bg-slate-950/60 border-slate-900 opacity-70'
                }`}
              >
                {/* Top Lesson Header */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-xl bg-slate-800 text-amber-400 font-black text-xs border border-slate-700">
                        الدرس {lesson.lessonNumber}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Bookmark className="w-3 h-3" />
                        {lesson.bookPageRange}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {isCompleted ? (
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>مكتمل</span>
                        </div>
                      ) : isCurrent ? (
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20 animate-pulse">
                          <span>الدرس الحالي</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-slate-500 text-xs">
                          <Lock className="w-3.5 h-3.5" />
                          <span>مقفل</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-xs font-medium text-slate-400">{lesson.unitTitle}</div>
                  <h4 className="text-base font-black text-white mt-1 group-hover:text-amber-400 transition-colors">
                    {lesson.lessonTitle}
                  </h4>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {lesson.objective}
                  </p>
                </div>

                {/* Stars and Bottom Buttons */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map((starIndex) => (
                      <Star
                        key={starIndex}
                        className={`w-4 h-4 ${
                          starIndex <= stars
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-700'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Read Explanation Button */}
                    <button
                      id={`read-lesson-btn-${lesson.level}`}
                      onClick={() => handleOpenLesson(lesson)}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition-all border border-slate-700"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>شرح الدرس</span>
                    </button>

                    {/* Start Practice / Quiz Button */}
                    <button
                      id={`quiz-lesson-btn-${lesson.level}`}
                      disabled={!isUnlocked}
                      onClick={() => {
                        playSound.starPop();
                        onStartQuiz(activeSubject, lesson.level);
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-md ${
                        isUnlocked
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                          : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>تمارين ({lesson.level})</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lesson Reader Modal */}
      <LessonReaderModal
        isOpen={isReaderOpen}
        onClose={() => setIsReaderOpen(false)}
        lesson={selectedLesson}
        onStartQuiz={(lvl) => onStartQuiz(activeSubject, lvl)}
        onNavigateLesson={handleNavigateLesson}
        totalLessons={subjectLessons.length}
      />
    </div>
  );
};
