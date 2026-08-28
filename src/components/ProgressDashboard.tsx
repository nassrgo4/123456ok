import React, { useState } from 'react';
import { UserProfile, SubjectType } from '../types';
import { LESSON_UNITS, AVATARS } from '../data/curriculum';
import { playSound } from '../utils/audio';
import {
  TrendingUp,
  Award,
  Star,
  CheckCircle2,
  Flame,
  Coins,
  Printer,
  Calendar,
  BookOpen,
  Calculator,
  Globe,
  Sparkles,
  Zap,
  Download,
  Share2,
  Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProgressDashboardProps {
  profile: UserProfile;
  onOpenSubject: (sub: SubjectType) => void;
  onOpenMiniGames: () => void;
  onClose: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  profile,
  onOpenSubject,
  onOpenMiniGames,
  onClose
}) => {
  const [showCertificate, setShowCertificate] = useState(false);
  const currentAvatar = AVATARS.find(a => a.id === profile.avatarId) || AVATARS[0];

  const totalQuestionsAnswered = profile.stats.totalAnswered || profile.completedQuestions.length;
  const totalCorrect = profile.stats.totalCorrect || profile.completedQuestions.length;
  const overallAccuracy =
    totalQuestionsAnswered > 0
      ? Math.min(100, Math.round((totalCorrect / totalQuestionsAnswered) * 100))
      : 88;

  // Subject Stats calculations
  const mathQuestionsCount = profile.completedQuestions.filter(id => id.startsWith('m_')).length;
  const arabicQuestionsCount = profile.completedQuestions.filter(id => id.startsWith('a_')).length;
  const englishQuestionsCount = profile.completedQuestions.filter(id => id.startsWith('e_')).length;

  const mathStars = Object.entries(profile.starsEarned)
    .filter(([k]) => k.startsWith('math_'))
    .reduce((acc, [_, v]) => acc + Number(v), 0);

  const arabicStars = Object.entries(profile.starsEarned)
    .filter(([k]) => k.startsWith('arabic_'))
    .reduce((acc, [_, v]) => acc + Number(v), 0);

  const englishStars = Object.entries(profile.starsEarned)
    .filter(([k]) => k.startsWith('english_'))
    .reduce((acc, [_, v]) => acc + Number(v), 0);

  const totalStars = mathStars + arabicStars + englishStars;

  const subjectProgress = [
    {
      id: 'math' as SubjectType,
      title: 'الرياضيات والهندسة',
      icon: Calculator,
      color: 'from-amber-500 to-orange-600',
      accentColor: 'text-amber-400',
      bgLight: 'bg-amber-950/40 border-amber-800/50',
      progressPercent: Math.min(100, Math.round(((profile.unlockedLevels.math || 1) / 10) * 100)),
      unlockedLevel: profile.unlockedLevels.math || 1,
      stars: mathStars,
      score: profile.stats.mathScore || 85,
      solvedCount: mathQuestionsCount,
      strongSkills: ['الكسور والتناسب', 'المعادلات الجبرية', 'المساحات والحجوم'],
      recommendedPractice: 'مسائل التناسب المعكوس والمجسمات'
    },
    {
      id: 'arabic' as SubjectType,
      title: 'اللغة العربية والضاد',
      icon: BookOpen,
      color: 'from-emerald-500 to-teal-700',
      accentColor: 'text-emerald-400',
      bgLight: 'bg-emerald-950/40 border-emerald-800/50',
      progressPercent: Math.min(100, Math.round(((profile.unlockedLevels.arabic || 1) / 10) * 100)),
      unlockedLevel: profile.unlockedLevels.arabic || 1,
      stars: arabicStars,
      score: profile.stats.arabicScore || 88,
      solvedCount: arabicQuestionsCount,
      strongSkills: ['الأفعال الخمسة', 'همزات الوصل والقطع', 'الاشتقاق والمشتقات'],
      recommendedPractice: 'إعراب جمع المؤنث السالم والأسماء الخمسة'
    },
    {
      id: 'english' as SubjectType,
      title: 'اللغة الإنجليزية (English)',
      icon: Globe,
      color: 'from-blue-500 to-indigo-700',
      accentColor: 'text-blue-400',
      bgLight: 'bg-blue-950/40 border-blue-800/50',
      progressPercent: Math.min(100, Math.round(((profile.unlockedLevels.english || 1) / 10) * 100)),
      unlockedLevel: profile.unlockedLevels.english || 1,
      stars: englishStars,
      score: profile.stats.englishScore || 90,
      solvedCount: englishQuestionsCount,
      strongSkills: ['Present Continuous', 'Spelling & Phonics', 'Vocabulary Matching'],
      recommendedPractice: 'Comparative Adjectives & Irregular Past Verbs'
    }
  ];

  const handlePrintCertificate = () => {
    playSound.click();
    window.print();
  };

  const handleOpenCert = () => {
    playSound.victory();
    try {
      confetti({ particleCount: 80, spread: 100 });
    } catch {}
    setShowCertificate(true);
  };

  return (
    <div className="space-y-6 animate-fade-in text-white">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br ${currentAvatar.bgGradient} flex items-center justify-center text-3xl sm:text-4xl shadow-xl ring-4 ring-slate-800`}>
              {currentAvatar.emoji}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl sm:text-2xl font-black text-white">{profile.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black border border-amber-400/30">
                  المستوى {profile.level}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                بطل الصف السادس الابتدائي • {currentAvatar.name}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs font-bold text-slate-400">
                <span className="flex items-center gap-1 text-orange-400">
                  <Flame className="w-4 h-4 fill-orange-400" />
                  <span>سلسلة {profile.streakDays} أيام</span>
                </span>
                <span className="flex items-center gap-1 text-amber-300">
                  <Coins className="w-4 h-4 fill-amber-300" />
                  <span>{profile.coins} جوهرة</span>
                </span>
                <span className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-yellow-400" />
                  <span>{totalStars} نجمة</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleOpenCert}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg flex items-center gap-2 transition hover:scale-105 active:scale-95"
            >
              <Award className="w-4 h-4" />
              <span>شهادة الشرف والتفوق 📜</span>
            </button>

            <button
              onClick={() => {
                playSound.click();
                onOpenMiniGames();
              }}
              className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition"
            >
              الألعاب والأنشطة
            </button>
          </div>
        </div>
      </div>

      {/* High-Level Overview Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4 text-center">
          <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">{profile.xp}</div>
          <div className="text-xs font-bold text-slate-400">إجمالي نقاط الخبرة (XP)</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4 text-center">
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 mb-1">{overallAccuracy}%</div>
          <div className="text-xs font-bold text-slate-400">نسبة الدقة والإجابات الصحيحة</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4 text-center">
          <div className="text-2xl sm:text-3xl font-black text-blue-400 mb-1">{profile.completedQuestions.length}</div>
          <div className="text-xs font-bold text-slate-400">مسائل ومراحل مكتملة</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4 text-center">
          <div className="text-2xl sm:text-3xl font-black text-purple-400 mb-1">{profile.unlockedBadges.length}</div>
          <div className="text-xs font-bold text-slate-400">أوسمة وبطولات مفتوحة</div>
        </div>
      </div>

      {/* Detailed Subject Mastery Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            <span>تتبع مستوى وإتقان المواد الدراسية</span>
          </h3>
          <span className="text-xs text-slate-400 font-bold">منهج الصف السادس الابتدائي</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {subjectProgress.map(sub => {
            const Icon = sub.icon;
            return (
              <div
                key={sub.id}
                className={`rounded-3xl border p-5 flex flex-col justify-between bg-slate-900/90 shadow-xl ${sub.bgLight}`}
              >
                <div>
                  {/* Title & Level Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2.5 rounded-2xl bg-gradient-to-br ${sub.color} text-white shadow`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-extrabold text-white">{sub.title}</h4>
                        <span className="text-[11px] text-slate-400 font-semibold">
                          المستوى المفتوح: {sub.unlockedLevel} من 10
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`text-lg font-black ${sub.accentColor}`}>
                        {sub.score}%
                      </div>
                      <div className="text-[10px] text-slate-400">معدل الإتقان</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 my-3">
                    <div className="flex justify-between text-xs font-bold text-slate-300">
                      <span>إنجاز مراحل المنهج</span>
                      <span>{sub.progressPercent}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                      <div
                        className={`h-full bg-gradient-to-r ${sub.color} transition-all duration-500 rounded-full`}
                        style={{ width: `${sub.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats list */}
                  <div className="grid grid-cols-2 gap-2 my-3 p-2.5 bg-slate-950/60 rounded-2xl border border-slate-800 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">النجوم المحققة:</span>
                      <span className="font-extrabold text-amber-300 flex items-center gap-1 mt-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-300" />
                        <span>{sub.stars} / 30</span>
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">المسائل المجابة:</span>
                      <span className="font-extrabold text-slate-200 block mt-0.5">
                        {sub.solvedCount} مسألة
                      </span>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>نقاط القوة المتقنة:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {sub.strongSkills.map((sk, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-lg bg-slate-800 border border-slate-700 text-[11px] text-slate-300"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Practice Recommendation */}
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-400">
                    <span className="text-amber-300 font-bold">التوصية المقترحة: </span>
                    <span>{sub.recommendedPractice}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800">
                  <button
                    onClick={() => {
                      playSound.click();
                      onOpenSubject(sub.id);
                    }}
                    className={`w-full py-2 rounded-xl bg-gradient-to-r ${sub.color} text-white font-bold text-xs shadow transition hover:opacity-90 flex items-center justify-center gap-1.5`}
                  >
                    <span>متابعة مغامرة {sub.title.split(' ')[0]}</span>
                    <span>←</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mini-Games Records Showcase */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
        <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <span>أرقام وأرقام قياسية في ألعاب التحدي</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-800/40 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400">سباق الحساب الذهني</div>
              <div className="text-base font-black text-amber-300">
                {profile.stats.highScoreSpeedMath || 0} نقطة
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400">صياد القواعد والهمزات</div>
              <div className="text-base font-black text-emerald-300">
                {profile.stats.grammarCatchScore || 0} نقطة
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-950/30 border border-blue-800/40 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400">التهجئة الإنجليزية (Spelling)</div>
              <div className="text-base font-black text-blue-300">
                {profile.stats.completedSpellingBee || 0} كلمات
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-4 sm:p-6 space-y-4 shadow-2xl animate-fade-in text-slate-900">
            {/* Modal Controls (Hidden when printing) */}
            <div className="flex justify-between items-center text-white pb-2 border-b border-slate-800 print:hidden">
              <h3 className="text-lg font-black text-amber-400 flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span>شهادة الشرف والتفوق الأكاديمي</span>
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintCertificate}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-1 shadow"
                >
                  <Printer className="w-4 h-4" />
                  <span>طباعة أو حفظ PDF</span>
                </button>
                <button
                  onClick={() => setShowCertificate(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                >
                  إغلاق
                </button>
              </div>
            </div>

            {/* Printable Certificate Canvas */}
            <div
              id="printable-certificate-box"
              className="bg-amber-50 text-slate-900 border-8 border-double border-amber-600 rounded-3xl p-6 sm:p-8 text-center space-y-4 relative shadow-inner"
            >
              {/* Corner Ornaments */}
              <div className="text-amber-700 text-2xl font-serif">⚜️</div>

              <div className="space-y-1">
                <span className="text-xs font-black tracking-widest text-amber-800 uppercase">
                  منصة أبطال المعرفة • الصف السادس الابتدائي
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-amber-950 font-serif">
                  شهادة شرف وتفوق أكاديمي
                </h1>
                <p className="text-xs text-amber-900">Certificate of Educational Excellence</p>
              </div>

              <div className="py-2">
                <p className="text-sm text-slate-700 font-bold">تُمنح هذه الشهادة بكل فخر واعتزاز للبطل:</p>
                <h2 className="text-2xl sm:text-3xl font-black text-indigo-950 my-2 underline decoration-amber-500 underline-offset-8">
                  {profile.name}
                </h2>
                <p className="text-xs text-slate-700 max-w-md mx-auto leading-relaxed">
                  تقديراً لاجتهاده وتميزه الرائع في إتقان مواد <strong>الرياضيات</strong>، و<strong>اللغة العربية</strong>، و<strong>اللغة الإنجليزية</strong>، وبلوغه المستوى <strong>{profile.level}</strong> بنسبة إتقان عامة بلغت <strong>{overallAccuracy}%</strong>.
                </p>
              </div>

              {/* Achievement Summary Grid */}
              <div className="grid grid-cols-3 gap-2 py-2 max-w-md mx-auto text-xs">
                <div className="bg-amber-100/80 p-2 rounded-xl border border-amber-300 font-bold">
                  <div className="text-amber-800">الرياضيات</div>
                  <div className="text-sm font-black text-slate-900">{profile.stats.mathScore || 85}%</div>
                </div>
                <div className="bg-emerald-100/80 p-2 rounded-xl border border-emerald-300 font-bold">
                  <div className="text-emerald-800">اللغة العربية</div>
                  <div className="text-sm font-black text-slate-900">{profile.stats.arabicScore || 88}%</div>
                </div>
                <div className="bg-blue-100/80 p-2 rounded-xl border border-blue-300 font-bold">
                  <div className="text-blue-800">اللغة الإنجليزية</div>
                  <div className="text-sm font-black text-slate-900">{profile.stats.englishScore || 90}%</div>
                </div>
              </div>

              {/* Signatures & Seal */}
              <div className="pt-4 border-t border-amber-300 flex items-center justify-between text-xs text-slate-600 font-bold px-4">
                <div className="text-right">
                  <div>التاريخ: {new Date().toLocaleDateString('ar-EG')}</div>
                  <div className="text-[10px] text-slate-500">الرمز: #{profile.xp}-{profile.streakDays}</div>
                </div>

                {/* Golden Seal Badge */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 border-2 border-amber-600 text-amber-950 flex flex-col items-center justify-center font-black text-[10px] shadow">
                  <span>🏆</span>
                  <span>معتمد</span>
                </div>

                <div className="text-left">
                  <div>المعلم الذكي حكيم</div>
                  <div className="text-[10px] text-indigo-700">اعتماد الإنجاز والتفوق</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
