import React, { useState } from 'react';
import { SubjectType, TextbookLesson } from '../types';
import { playSound, speakText } from '../utils/audio';
import { 
  BookOpen, 
  X, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  Lightbulb, 
  ArrowRight, 
  ArrowLeft, 
  Play, 
  Clock, 
  Bookmark, 
  HelpCircle,
  Award,
  Zap,
  VolumeX
} from 'lucide-react';

interface LessonReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: TextbookLesson | null;
  onStartQuiz: (level: number) => void;
  onNavigateLesson?: (newLevel: number) => void;
  totalLessons?: number;
}

export const LessonReaderModal: React.FC<LessonReaderModalProps> = ({
  isOpen,
  onClose,
  lesson,
  onStartQuiz,
  onNavigateLesson,
  totalLessons = 10
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeTab, setActiveTab] = useState<'explanation' | 'examples' | 'formulas'>('explanation');
  const [copiedTip, setCopiedTip] = useState(false);

  if (!isOpen || !lesson) return null;

  const getSubjectTheme = (subject: SubjectType) => {
    switch (subject) {
      case 'math':
        return {
          gradient: 'from-amber-500 via-orange-500 to-amber-600',
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          iconBg: 'bg-amber-500/30 text-amber-300',
          accent: 'text-amber-400',
          btnGradient: 'from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950',
          bookTitle: 'كتاب الرياضيات - الصف السادس'
        };
      case 'arabic':
        return {
          gradient: 'from-emerald-500 via-teal-600 to-emerald-700',
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          iconBg: 'bg-emerald-500/30 text-emerald-300',
          accent: 'text-emerald-400',
          btnGradient: 'from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white',
          bookTitle: 'كتاب لغتي العربية - الصف السادس'
        };
      case 'english':
      default:
        return {
          gradient: 'from-blue-500 via-indigo-600 to-blue-700',
          badge: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
          iconBg: 'bg-blue-500/30 text-blue-300',
          accent: 'text-blue-400',
          btnGradient: 'from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white',
          bookTitle: 'English Champion Textbook - Grade 6'
        };
    }
  };

  const theme = getSubjectTheme(lesson.subject);

  const handleReadLesson = () => {
    if (isPlayingAudio) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    const textToRead = `
      ${lesson.unitTitle}.
      الدرس رقم ${lesson.lessonNumber}: ${lesson.lessonTitle}.
      الهدف من الدرس: ${lesson.objective}.
      النقاط الأساسية للشرح: ${lesson.summaryPoints.join('. ')}.
      القاعدة الذهبية: ${lesson.goldenTip}.
    `;
    
    speakText(
      textToRead,
      lesson.subject === 'english' ? 'en' : 'ar',
      () => setIsPlayingAudio(false)
    );
  };

  const handleCopyNote = () => {
    playSound.starPop();
    setCopiedTip(true);
    setTimeout(() => setCopiedTip(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] text-right">
        
        {/* Header Ribbon */}
        <div className={`p-4 sm:p-6 bg-gradient-to-r ${theme.gradient} text-white relative flex-shrink-0 shadow-lg`}>
          <button
            id="close-lesson-modal-btn"
            onClick={() => {
              if (isPlayingAudio && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
              onClose();
            }}
            className="absolute left-4 top-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-xl bg-black/30 backdrop-blur-sm text-xs font-bold border border-white/20 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              {theme.bookTitle}
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-black/20 text-xs font-medium flex items-center gap-1">
              <Bookmark className="w-3 h-3" />
              {lesson.bookPageRange}
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-black/20 text-xs font-medium flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {lesson.estimatedMinutes} دقائق استذكار
            </span>
          </div>

          <div className="text-xs font-medium text-white/80">{lesson.unitTitle}</div>
          <h2 className="text-xl sm:text-2xl font-black mt-1 flex items-center gap-2">
            <span>الدرس {lesson.lessonNumber}: {lesson.lessonTitle}</span>
          </h2>

          {/* Quick Voice Narration & Objective */}
          <div className="mt-3 p-3 rounded-2xl bg-black/25 backdrop-blur-sm border border-white/15 flex items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-white/95 leading-relaxed flex-1">
              <span className="font-bold text-amber-300">🎯 هدف الدرس: </span>
              {lesson.objective}
            </p>
            <button
              id="narrate-lesson-btn"
              onClick={handleReadLesson}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all flex-shrink-0 shadow-md ${
                isPlayingAudio 
                  ? 'bg-rose-500 text-white animate-pulse' 
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>إيقاف الصوت</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-amber-300" />
                  <span>استمع للشرح</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-900/90 px-4 pt-2 gap-2 flex-shrink-0">
          <button
            onClick={() => { playSound.click(); setActiveTab('explanation'); }}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'explanation'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>شرح وتبسيط الدرس</span>
          </button>
          <button
            onClick={() => { playSound.click(); setActiveTab('examples'); }}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'examples'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>أمثلة محلولة نموذجية ({lesson.workedExamples.length})</span>
          </button>
          {lesson.keyFormulasOrRules && (
            <button
              onClick={() => { playSound.click(); setActiveTab('formulas'); }}
              className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-colors ${
                activeTab === 'formulas'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>القوانين والقواعد</span>
            </button>
          )}
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5 text-slate-200">
          {activeTab === 'explanation' && (
            <div className="space-y-4">
              <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-4 sm:p-5">
                <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4" />
                  <span>المفاهيم والنقاط الجوهرية للدرس:</span>
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {lesson.summaryPoints.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="flex-1">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Golden Tip Box */}
              <div className="bg-gradient-to-br from-amber-500/15 to-orange-500/10 border border-amber-400/40 rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-sm mb-1.5">
                    <Award className="w-5 h-5 text-amber-400 animate-bounce" />
                    <span>💡 سر التفوق والقاعدة الذهبية</span>
                  </div>
                  <button
                    onClick={handleCopyNote}
                    className="px-2.5 py-1 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 text-xs font-bold transition-all"
                  >
                    {copiedTip ? '✓ تم الحفظ بالملاحظات' : 'حفظ القاعدة'}
                  </button>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-amber-100/90 leading-relaxed mt-1">
                  {lesson.goldenTip}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'examples' && (
            <div className="space-y-4">
              <div className="text-xs sm:text-sm text-slate-400 mb-1">
                تدرب على طريقة التفكير المنطقي خطوة بخطوة للوصول إلى الإجابة النموذجية:
              </div>
              {lesson.workedExamples.map((ex, idx) => (
                <div key={idx} className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 sm:p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold text-xs">
                      مثال تطبيقي {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-white">{ex.problem}</span>
                  </div>
                  <div className="bg-slate-950/80 p-3.5 rounded-xl border border-emerald-500/30 text-xs sm:text-sm text-emerald-300">
                    <div className="font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>طريقة الحل النموذجية:</span>
                    </div>
                    <p className="text-emerald-100 font-medium leading-relaxed">{ex.solution}</p>
                  </div>
                  {ex.note && (
                    <div className="text-[11px] text-amber-300/90 font-medium flex items-center gap-1.5 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                      <span>ملاحظة ذكية: {ex.note}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'formulas' && lesson.keyFormulasOrRules && (
            <div className="space-y-4">
              <div className="text-xs sm:text-sm text-slate-400 mb-2">
                احفظ هذه القواعد والقوانين الرياضية واللغوية لتسهيل حل جميع المسائل:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lesson.keyFormulasOrRules.map((rule, idx) => (
                  <div key={idx} className="bg-slate-800/90 border border-cyan-500/30 p-3.5 rounded-2xl shadow-md flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-black text-xs flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-cyan-200 leading-relaxed font-mono">
                      {rule}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/95 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          {/* Previous / Next Lesson Navigation */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            {lesson.level > 1 && onNavigateLesson && (
              <button
                id="prev-lesson-btn"
                onClick={() => {
                  playSound.click();
                  onNavigateLesson(lesson.level - 1);
                }}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1 transition-all border border-slate-700"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>الدرس السابق ({lesson.level - 1})</span>
              </button>
            )}
            
            {lesson.level < totalLessons && onNavigateLesson && (
              <button
                id="next-lesson-btn"
                onClick={() => {
                  playSound.click();
                  onNavigateLesson(lesson.level + 1);
                }}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1 transition-all border border-slate-700"
              >
                <span>الدرس التالي ({lesson.level + 1})</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Start Practice / Quiz Button */}
          <button
            id="start-lesson-quiz-btn"
            onClick={() => {
              if (isPlayingAudio && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
              playSound.starPop();
              onStartQuiz(lesson.level);
              onClose();
            }}
            className={`w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r ${theme.btnGradient} font-black text-sm shadow-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-95`}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>ابدأ حل تمارين وتحدي الدرس 🚀</span>
          </button>
        </div>

      </div>
    </div>
  );
};
