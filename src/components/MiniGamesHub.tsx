import React, { useState } from 'react';
import { UserProfile } from '../types';
import { MathSpeedArcade } from './MiniGames/MathSpeedArcade';
import { MathLogicPuzzles } from './MiniGames/MathLogicPuzzles';
import { ArabicSpellingCatcher } from './MiniGames/ArabicSpellingCatcher';
import { ArabicWordBuilder } from './MiniGames/ArabicWordBuilder';
import { ArabicSynonymsMatch } from './MiniGames/ArabicSynonymsMatch';
import { EnglishSpellingBee } from './MiniGames/EnglishSpellingBee';
import { EnglishSentenceBuilder } from './MiniGames/EnglishSentenceBuilder';
import { EnglishVocabMatch } from './MiniGames/EnglishVocabMatch';
import { playSound } from '../utils/audio';
import {
  Zap,
  Feather,
  Volume2,
  Gamepad2,
  Trophy,
  Star,
  ArrowLeft,
  Scale,
  Sparkles,
  BookOpen,
  Globe,
  Award
} from 'lucide-react';

interface MiniGamesHubProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onBackToQuests: () => void;
}

type GameKey =
  | 'none'
  | 'math_speed'
  | 'math_logic'
  | 'arabic_catcher'
  | 'arabic_builder'
  | 'arabic_synonyms'
  | 'english_bee'
  | 'english_sentence'
  | 'english_vocab';

export const MiniGamesHub: React.FC<MiniGamesHubProps> = ({
  profile,
  onUpdateProfile,
  onBackToQuests
}) => {
  const [activeGame, setActiveGame] = useState<GameKey>('none');
  const [filterSubject, setFilterSubject] = useState<'all' | 'math' | 'arabic' | 'english'>('all');

  if (activeGame === 'math_speed') {
    return (
      <MathSpeedArcade
        profile={profile}
        onUpdateProfile={onUpdateProfile}
        onClose={() => setActiveGame('none')}
      />
    );
  }

  if (activeGame === 'math_logic') {
    return (
      <MathLogicPuzzles
        profile={profile}
        onUpdateProfile={onUpdateProfile}
        onClose={() => setActiveGame('none')}
      />
    );
  }

  if (activeGame === 'arabic_catcher') {
    return (
      <ArabicSpellingCatcher
        profile={profile}
        onUpdateProfile={onUpdateProfile}
        onClose={() => setActiveGame('none')}
      />
    );
  }

  if (activeGame === 'arabic_builder') {
    return (
      <ArabicWordBuilder
        profile={profile}
        onUpdateProfile={onUpdateProfile}
        onClose={() => setActiveGame('none')}
      />
    );
  }

  if (activeGame === 'arabic_synonyms') {
    return (
      <ArabicSynonymsMatch
        profile={profile}
        onUpdateProfile={onUpdateProfile}
        onClose={() => setActiveGame('none')}
      />
    );
  }

  if (activeGame === 'english_bee') {
    return (
      <EnglishSpellingBee
        profile={profile}
        onUpdateProfile={onUpdateProfile}
        onClose={() => setActiveGame('none')}
      />
    );
  }

  if (activeGame === 'english_sentence') {
    return (
      <EnglishSentenceBuilder
        profile={profile}
        onUpdateProfile={onUpdateProfile}
        onClose={() => setActiveGame('none')}
      />
    );
  }

  if (activeGame === 'english_vocab') {
    return (
      <EnglishVocabMatch
        profile={profile}
        onUpdateProfile={onUpdateProfile}
        onClose={() => setActiveGame('none')}
      />
    );
  }

  const games = [
    // Math
    {
      id: 'math_speed' as GameKey,
      subject: 'math',
      title: 'سباق الحساب الذهني الخاطف',
      badgeText: 'رياضيات سريعة',
      badgeColor: 'bg-amber-950/60 text-amber-300 border-amber-800',
      icon: Zap,
      iconColor: 'bg-amber-500/20 border-amber-500/40 text-amber-400',
      description: 'تحدي الـ 30 ثانية! أجب على أكبر قدر من مسائل الكسور والضرب والمعادلات الحسابية.',
      btnGradient: 'from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950',
      statLabel: 'أعلى رقم:',
      statVal: `${profile.stats.highScoreSpeedMath || 0} نقطة`
    },
    {
      id: 'math_logic' as GameKey,
      subject: 'math',
      title: 'ميزان المعادلات وألغاز الذكاء',
      badgeText: 'منطق وهندسة',
      badgeColor: 'bg-orange-950/60 text-orange-300 border-orange-800',
      icon: Scale,
      iconColor: 'bg-orange-500/20 border-orange-500/40 text-orange-400',
      description: 'حل ألغاز الميزان البصري، مساحات الأشكال، والمتتاليات الحسابية الذكية بالخطوات.',
      btnGradient: 'from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-slate-950',
      statLabel: 'مستوى التحدي:',
      statVal: 'ألغاز الصف السادس'
    },
    // Arabic
    {
      id: 'arabic_builder' as GameKey,
      subject: 'arabic',
      title: 'باني الكلمات واشتقاق الجذور',
      badgeText: 'بناء الكلمات',
      badgeColor: 'bg-emerald-950/60 text-emerald-300 border-emerald-800',
      icon: Sparkles,
      iconColor: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400',
      description: 'ركب المشتقات اللغوية (اسم فاعل، مفعول، مكان) من جذور الأفعال الثلاثية بالحروف والمقاطع.',
      btnGradient: 'from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950',
      statLabel: 'المستوى:',
      statVal: 'صرف واشتقاق'
    },
    {
      id: 'arabic_synonyms' as GameKey,
      subject: 'arabic',
      title: 'مطابقة المعاني والمترادفات والأضداد',
      badgeText: 'معاجم ومفردات',
      badgeColor: 'bg-teal-950/60 text-teal-300 border-teal-800',
      icon: BookOpen,
      iconColor: 'bg-teal-500/20 border-teal-500/40 text-teal-400',
      description: 'لعبة مطابقة بطاقات المعاني، الأضداد، والمترادفات العربية لتنمية الثروة اللغوية.',
      btnGradient: 'from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950',
      statLabel: 'التحدي:',
      statVal: 'تطابق البطاقات'
    },
    {
      id: 'arabic_catcher' as GameKey,
      subject: 'arabic',
      title: 'صياد الهمزات وقواعد الإملاء',
      badgeText: 'إملاء ونحو',
      badgeColor: 'bg-emerald-950/60 text-emerald-300 border-emerald-800',
      icon: Feather,
      iconColor: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400',
      description: 'تصنيف سريع للكلمات بين همزات الوصل والقطع، وضبط علامات الإعراب الصحيحة.',
      btnGradient: 'from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950',
      statLabel: 'أعلى نتيجة:',
      statVal: `${profile.stats.grammarCatchScore || 0} نقطة`
    },
    // English
    {
      id: 'english_sentence' as GameKey,
      subject: 'english',
      title: 'صانع الجمل الإنجليزية (Sentence Master)',
      badgeText: 'Grammar Builder',
      badgeColor: 'bg-blue-950/60 text-blue-300 border-blue-800',
      icon: Globe,
      iconColor: 'bg-blue-500/20 border-blue-500/40 text-blue-400',
      description: 'رتب الكلمات المبعثرة لبناء جمل صحيحة نحوياً (المضارع، الماضي، المقارنات والشرط).',
      btnGradient: 'from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white',
      statLabel: 'القواعد:',
      statVal: 'Grade 6 Grammar'
    },
    {
      id: 'english_vocab' as GameKey,
      subject: 'english',
      title: 'مطابقة المفردات بالصوت (Vocab Match)',
      badgeText: 'Audio & Vocab',
      badgeColor: 'bg-indigo-950/60 text-indigo-300 border-indigo-800',
      icon: Award,
      iconColor: 'bg-indigo-500/20 border-indigo-500/40 text-indigo-400',
      description: 'استمع لنطق الكلمات بالإنجليزية واربطها بالرموز والمعاني العربية لتثبيت الحفظ.',
      btnGradient: 'from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white',
      statLabel: 'المهارة:',
      statVal: 'استماع ومفردات'
    },
    {
      id: 'english_bee' as GameKey,
      subject: 'english',
      title: 'مختبر التهجئة والنطق (Spelling Bee)',
      badgeText: 'English Lab',
      badgeColor: 'bg-blue-950/60 text-blue-300 border-blue-800',
      icon: Volume2,
      iconColor: 'bg-blue-500/20 border-blue-500/40 text-blue-400',
      description: 'استمع لنطق الكلمات الإنجليزية ورتب الحروف لتهجئة الكلمة الصحيحة بدون أخطاء.',
      btnGradient: 'from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white',
      statLabel: 'الكلمات:',
      statVal: `${profile.stats.completedSpellingBee || 0} كلمات`
    }
  ];

  const filteredGames = games.filter(
    g => filterSubject === 'all' || g.subject === filterSubject
  );

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4 sm:p-6 text-white shadow-2xl space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 text-white shadow-lg">
            <Gamepad2 className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">مدينة ألعاب التحدي الذكية</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              ألعاب تعليمية تفاعلية مصممة لطلاب الصف السادس الابتدائي في العربي والإنجليزي والرياضيات
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            playSound.click();
            onBackToQuests();
          }}
          className="px-4 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 flex items-center gap-1.5 self-start sm:self-auto transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>العودة للمناهج</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => {
            playSound.click();
            setFilterSubject('all');
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition whitespace-nowrap ${
            filterSubject === 'all'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          🎮 جميع الألعاب ({games.length})
        </button>
        <button
          onClick={() => {
            playSound.click();
            setFilterSubject('math');
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition whitespace-nowrap ${
            filterSubject === 'math'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          📐 ألعاب الرياضيات (2)
        </button>
        <button
          onClick={() => {
            playSound.click();
            setFilterSubject('arabic');
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition whitespace-nowrap ${
            filterSubject === 'arabic'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          📖 ألعاب اللغة العربية (3)
        </button>
        <button
          onClick={() => {
            playSound.click();
            setFilterSubject('english');
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition whitespace-nowrap ${
            filterSubject === 'english'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          🇬🇧 ألعاب اللغة الإنجليزية (3)
        </button>
      </div>

      {/* Game Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGames.map(game => {
          const IconComponent = game.icon;

          return (
            <div
              key={game.id}
              className="bg-gradient-to-b from-slate-800 to-slate-850 border border-slate-700/80 hover:border-slate-500 rounded-3xl p-5 flex flex-col justify-between shadow-lg hover:scale-[1.02] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div
                    className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${game.iconColor}`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-[11px] font-extrabold px-2.5 py-1 rounded-xl border ${game.badgeColor}`}
                  >
                    {game.badgeText}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-white mb-1.5">
                  {game.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4 min-h-[48px]">
                  {game.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-700/60 mt-auto">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    <span>{game.statLabel}</span>
                  </span>
                  <span className="font-extrabold text-white">{game.statVal}</span>
                </div>

                <button
                  id={`start-${game.id}-btn`}
                  onClick={() => {
                    playSound.click();
                    setActiveGame(game.id);
                  }}
                  className={`w-full py-2.5 rounded-2xl bg-gradient-to-r ${game.btnGradient} font-black text-sm shadow transition flex items-center justify-center gap-1.5`}
                >
                  <span>العب وتحدَّ الآن</span>
                  <span>🚀</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
