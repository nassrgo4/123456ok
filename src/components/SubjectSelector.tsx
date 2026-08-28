import React from 'react';
import { SubjectType, UserProfile } from '../types';
import { LESSON_UNITS } from '../data/curriculum';
import { playSound } from '../utils/audio';
import { Calculator, BookOpen, Globe, Star, Sparkles, CheckCircle2 } from 'lucide-react';

interface SubjectSelectorProps {
  selectedSubject: SubjectType;
  onSelectSubject: (subject: SubjectType) => void;
  profile: UserProfile;
}

export const SubjectSelector: React.FC<SubjectSelectorProps> = ({
  selectedSubject,
  onSelectSubject,
  profile
}) => {
  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator':
        return <Calculator className="w-6 h-6 sm:w-7 sm:h-7" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6 sm:w-7 sm:h-7" />;
      case 'Globe':
        return <Globe className="w-6 h-6 sm:w-7 sm:h-7" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 my-4">
      {LESSON_UNITS.map((unit) => {
        const isSelected = selectedSubject === unit.subject;
        const currentUnlockedLevel = profile.unlockedLevels[unit.subject] || 1;
        const progressPercent = Math.min(100, Math.round((currentUnlockedLevel / unit.totalStages) * 100));

        // Count stars earned in this subject
        const starsInSubject = Object.entries(profile.starsEarned)
          .filter(([k]) => k.startsWith(unit.subject))
          .reduce((acc: number, [, val]) => acc + Number(val), 0);

        return (
          <button
            key={unit.id}
            id={`subject-card-${unit.subject}`}
            onClick={() => {
              playSound.click();
              onSelectSubject(unit.subject);
            }}
            className={`relative text-right p-4 rounded-3xl transition-all duration-300 transform border text-white overflow-hidden shadow-md flex flex-col justify-between ${
              isSelected
                ? `ring-4 ring-amber-400 ring-offset-2 ring-offset-slate-900 bg-gradient-to-br ${unit.color} scale-[1.02] shadow-xl border-transparent`
                : 'bg-slate-800/90 hover:bg-slate-750 border-slate-700/80 hover:border-slate-600 hover:scale-[1.01]'
            }`}
          >
            {/* Background subtle badge glow */}
            <div className="flex items-start justify-between w-full mb-3">
              <div className={`p-3 rounded-2xl ${isSelected ? 'bg-white/20' : 'bg-slate-700/80'} text-white shadow-inner`}>
                {getSubjectIcon(unit.icon)}
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900/60 backdrop-blur-sm border border-slate-700/60 text-amber-300 font-black text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{starsInSubject} نجوم</span>
              </div>
            </div>

            <div>
              <div className="text-xs sm:text-sm font-black text-amber-300 mb-0.5">{unit.gradeLevel}</div>
              <h3 className="text-lg sm:text-2xl font-black tracking-tight mb-1.5">{unit.title}</h3>
              <p className="text-xs sm:text-sm text-slate-100 line-clamp-2 mb-3 leading-relaxed font-medium">
                {unit.description}
              </p>
            </div>

            {/* Level progress meter */}
            <div className="w-full pt-2 border-t border-white/10 mt-auto">
              <div className="flex justify-between items-center text-xs sm:text-sm font-black text-slate-100 mb-1.5">
                <span>المرحلة {currentUnlockedLevel} من {unit.totalStages}</span>
                <span className="text-amber-300">{progressPercent}%</span>
              </div>
              <div className="h-2.5 w-full bg-slate-900/50 rounded-full overflow-hidden border border-white/15">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {isSelected && (
              <div className="absolute top-2 right-2 flex items-center justify-center">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
                </span>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};
