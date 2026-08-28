import React from 'react';
import { SubjectType, UserProfile } from '../types';
import { LESSON_UNITS, QUESTIONS_BANK } from '../data/curriculum';
import { playSound } from '../utils/audio';
import { Star, Lock, Play, Crown, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';

interface QuestMapProps {
  subject: SubjectType;
  profile: UserProfile;
  onStartLevel: (level: number) => void;
  onOpenLessonReader?: (level: number) => void;
  onOpenTextbook?: () => void;
}

export const QuestMap: React.FC<QuestMapProps> = ({
  subject,
  profile,
  onStartLevel,
  onOpenLessonReader,
  onOpenTextbook
}) => {
  const currentUnit = LESSON_UNITS.find(u => u.subject === subject) || LESSON_UNITS[0];
  const unlockedLevel = profile.unlockedLevels[subject] || 1;

  // Stages array 1 to 10
  const stages = Array.from({ length: currentUnit.totalStages }, (_, i) => i + 1);

  // Topic names based on questions in curriculum
  const getStageTitle = (lvl: number): string => {
    const q = QUESTIONS_BANK.find(item => item.subject === subject && item.level === lvl);
    if (q) return q.topicTitleAr;
    if (lvl === 10) return 'تحدي الزعيم النهائي والأوسمة الذهبية 👑';
    return `تحدي المستوى ${lvl}`;
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl relative overflow-hidden text-right">
      {/* Subject Header Banner */}
      <div className={`p-4 sm:p-6 rounded-2xl bg-gradient-to-r ${currentUnit.color} text-white mb-6 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}>
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/25 text-amber-300 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>مغامرة المنهج الدراسي - الصف السادس</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">{currentUnit.title}</h2>
          <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-xl">
            {currentUnit.description}
          </p>
        </div>

        <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2.5 flex-shrink-0 w-full sm:w-auto justify-between">
          <div className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 text-center">
            <div className="text-[11px] text-amber-300 font-bold">وسام المرحلة</div>
            <div className="text-sm font-extrabold flex items-center justify-center gap-1 mt-0.5">
              <span>{currentUnit.badgeName}</span>
              <Crown className="w-4 h-4 text-amber-300" />
            </div>
          </div>

          {onOpenTextbook && (
            <button
              id="open-textbook-from-map-btn"
              onClick={() => {
                playSound.starPop();
                onOpenTextbook();
              }}
              className="px-3.5 py-2 rounded-xl bg-white text-slate-950 hover:bg-amber-100 font-black text-xs shadow-lg flex items-center gap-1.5 transition-all transform active:scale-95"
            >
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>تصفح الكتاب درساً بدرساً 📖</span>
            </button>
          )}
        </div>
      </div>

      {/* Quest Winding Path Grid */}
      <div className="relative max-w-2xl mx-auto py-4">
        {/* Subtle connecting central vertical spine line */}
        <div className="absolute left-1/2 top-8 bottom-8 w-1.5 bg-gradient-to-b from-amber-500/40 via-teal-500/40 to-indigo-500/40 -translate-x-1/2 rounded-full hidden sm:block" />

        <div className="space-y-4 sm:space-y-6">
          {stages.map((lvl, index) => {
            const isUnlocked = lvl <= unlockedLevel;
            const isCurrent = lvl === unlockedLevel;
            const isCompleted = lvl < unlockedLevel;
            const stageKey = `${subject}_${lvl}`;
            const stars = profile.starsEarned[stageKey] || (isCompleted ? 3 : 0);
            const isBoss = lvl === currentUnit.totalStages;
            const stageTitle = getStageTitle(lvl);

            // Zigzag alignment on desktop
            const isEven = index % 2 === 0;

            return (
              <div
                key={lvl}
                className={`flex items-center ${isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'} flex-col gap-3 sm:gap-6 justify-center relative z-10`}
              >
                {/* Node Card */}
                <div
                  className={`w-full sm:w-[85%] p-4 rounded-3xl border transition-all duration-300 flex items-center justify-between gap-3 ${
                    isCurrent
                      ? 'bg-slate-800/95 border-amber-400 ring-4 ring-amber-400/30 shadow-2xl scale-[1.02]'
                      : isCompleted
                      ? 'bg-slate-800/80 border-slate-700/80 hover:border-slate-600'
                      : 'bg-slate-900/60 border-slate-800/60 opacity-60'
                  }`}
                >
                  {/* Left Side: Number Icon / Button */}
                  <div className="flex items-center gap-3">
                    <button
                      id={`stage-button-${subject}-${lvl}`}
                      disabled={!isUnlocked}
                      onClick={() => {
                        if (isUnlocked) {
                          playSound.click();
                          onStartLevel(lvl);
                        }
                      }}
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-black text-lg transition-transform active:scale-95 shadow-md flex-shrink-0 ${
                        isCurrent
                          ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 animate-bounce ring-2 ring-white/50'
                          : isCompleted
                          ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      {isBoss ? (
                        <Crown className={`w-7 h-7 ${isCurrent ? 'text-slate-950' : 'text-amber-300'}`} />
                      ) : isCompleted ? (
                        <CheckCircle2 className="w-7 h-7 text-white" />
                      ) : isUnlocked ? (
                        <span>{lvl}</span>
                      ) : (
                        <Lock className="w-5 h-5 text-slate-500" />
                      )}
                    </button>

                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-slate-700/80 text-amber-300">
                          المستوى {lvl}
                        </span>
                        {isBoss && (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-lg bg-rose-900/70 border border-rose-600 text-rose-300">
                            تحدي الزعيم 🔥
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm sm:text-base font-extrabold text-white mt-1">
                        {stageTitle}
                      </h4>
                    </div>
                  </div>

                  {/* Right Side: Stars & Action CTA */}
                  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    {/* Stars Earned */}
                    <div className="flex items-center gap-0.5 bg-slate-900/80 px-2 py-1 rounded-xl border border-slate-700/60">
                      {[1, 2, 3].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                            s <= stars
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-700'
                          }`}
                        />
                      ))}
                    </div>

                    {isUnlocked && (
                      <div className="flex items-center gap-1.5">
                        {onOpenLessonReader && (
                          <button
                            id={`read-stage-btn-${subject}-${lvl}`}
                            onClick={() => {
                              playSound.click();
                              onOpenLessonReader(lvl);
                            }}
                            className="px-2.5 sm:px-3 py-2 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 flex items-center gap-1 transition"
                            title="شرح وتبسيط الدرس"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">شرح</span>
                          </button>
                        )}

                        <button
                          id={`play-stage-btn-${subject}-${lvl}`}
                          onClick={() => {
                            playSound.click();
                            onStartLevel(lvl);
                          }}
                          className={`px-3 sm:px-4 py-2 rounded-xl font-extrabold text-xs sm:text-sm flex items-center gap-1.5 transition shadow ${
                            isCurrent
                              ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black'
                              : 'bg-slate-700 hover:bg-slate-600 text-white'
                          }`}
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>{isCompleted ? 'تمارين' : 'ابدأ'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
