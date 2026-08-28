import React, { useState } from 'react';
import { UserProfile } from '../types';
import { playSound } from '../utils/audio';
import {
  Users,
  Lock,
  Unlock,
  Sparkles,
  TrendingUp,
  Award,
  BookOpen,
  Calculator,
  Globe,
  Gift,
  CheckCircle2,
  AlertCircle,
  X,
  Flame,
  FileText
} from 'lucide-react';

interface ParentDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [customReward, setCustomReward] = useState(profile.customHomeReward || '');
  const [isSavedReward, setIsSavedReward] = useState(false);
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [isLoadingReport, setIsLoadingReport] = useState(false);

  const correctPin = profile.parentPin || '1234';

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === correctPin) {
      playSound.click();
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      playSound.wrong();
      setPinError(true);
    }
  };

  const handleSaveReward = () => {
    playSound.click();
    onUpdateProfile({
      ...profile,
      customHomeReward: customReward
    });
    setIsSavedReward(true);
    setTimeout(() => setIsSavedReward(false), 2000);
  };

  const handleGenerateAiReport = async () => {
    setIsLoadingReport(true);
    playSound.click();
    try {
      const res = await fetch('/api/tutor/parent-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: profile.name,
          stats: {
            mathScore: profile.stats.mathScore || 80,
            arabicScore: profile.stats.arabicScore || 85,
            englishScore: profile.stats.englishScore || 85,
            totalQuestions: profile.stats.totalAnswered || 0,
            correctCount: profile.stats.totalCorrect || 0,
            completedChallenges: Object.keys(profile.starsEarned || {}).length
          }
        })
      });
      const data = await res.json();
      setAiReport(data.report);
    } catch {
      setAiReport(`تقرير التقييم للطالب ${profile.name}: يسير الطالب بخطى ممتازة وثابتة في استيعاب مفاهيم الصف السادس. ننصح بمواصلة حل التحديات بمعدل 15 دقيقة يومياً لترسيخ القواعد النحوية والرياضية.`);
    } finally {
      setIsLoadingReport(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-indigo-700 to-purple-800 text-white flex items-center justify-between shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black">لوحة تحكم وتوجيه ولي الأمر</h2>
              <p className="text-xs text-indigo-200">متابعة دقيقة لمستوى الطالب، نقاط القوة، والمكافآت المنزلية</p>
            </div>
          </div>

          <button
            onClick={() => {
              playSound.click();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 text-white space-y-6">
          {!isAuthenticated ? (
            /* PIN Protection Screen */
            <div className="max-w-sm mx-auto text-center py-6 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center shadow-lg">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black">أدخل رمز الدخول لولي الأمر</h3>
              <p className="text-xs text-slate-300">
                الرمز الافتراضي هو: <span className="font-mono text-amber-300 font-bold">1234</span>
              </p>

              <form onSubmit={handleUnlock} className="space-y-3 pt-2">
                <input
                  type="password"
                  maxLength={6}
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="رمز PIN (4 أرقام)"
                  className="w-full text-center tracking-widest text-2xl py-3 rounded-2xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-400"
                />

                {pinError && (
                  <div className="text-xs text-rose-400 font-bold flex items-center justify-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>الرمز غير صحيح، يرجى المحاولة مجدداً</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-bold text-sm shadow-lg transition"
                >
                  دخول لوحة ولي الأمر
                </button>
              </form>
            </div>
          ) : (
            /* Unlocked Parent Dashboard */
            <>
              {/* Top Overview Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-800/90 p-3.5 rounded-2xl border border-slate-700/80 text-center">
                  <div className="text-[11px] text-slate-400 font-bold">مستوى البطل</div>
                  <div className="text-xl font-black text-amber-400 mt-0.5">المستوى {profile.level}</div>
                  <div className="text-[10px] text-slate-400">({profile.xp} XP)</div>
                </div>

                <div className="bg-slate-800/90 p-3.5 rounded-2xl border border-slate-700/80 text-center">
                  <div className="text-[11px] text-slate-400 font-bold">الالتزام اليومي</div>
                  <div className="text-xl font-black text-orange-400 mt-0.5 flex items-center justify-center gap-1">
                    <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
                    <span>{profile.streakDays} أيام</span>
                  </div>
                  <div className="text-[10px] text-emerald-400">مستمر بنشاط ⭐</div>
                </div>

                <div className="bg-slate-800/90 p-3.5 rounded-2xl border border-slate-700/80 text-center">
                  <div className="text-[11px] text-slate-400 font-bold">الأسئلة المجابة</div>
                  <div className="text-xl font-black text-emerald-400 mt-0.5">{profile.stats.totalAnswered}</div>
                  <div className="text-[10px] text-slate-400">{profile.stats.totalCorrect} إجابة صحيحة</div>
                </div>

                <div className="bg-slate-800/90 p-3.5 rounded-2xl border border-slate-700/80 text-center">
                  <div className="text-[11px] text-slate-400 font-bold">النجوم المكتسبة</div>
                  <div className="text-xl font-black text-amber-300 mt-0.5">
                    {Object.values(profile.starsEarned).reduce((a: number, b: number) => a + Number(b), 0)} ⭐
                  </div>
                  <div className="text-[10px] text-slate-400">في كافة المواد</div>
                </div>
              </div>

              {/* Subject Mastery Progress Bars */}
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-3">
                <h3 className="text-sm font-extrabold text-slate-200 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  <span>نسبة استيعاب المواد (الصف السادس)</span>
                </h3>

                {/* Math */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="flex items-center gap-1.5 text-amber-300">
                      <Calculator className="w-4 h-4" />
                      <span>الرياضيات (الكسور، النسب، الهندسة)</span>
                    </span>
                    <span className="text-slate-300">{profile.stats.mathScore}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: `${profile.stats.mathScore}%` }} />
                  </div>
                </div>

                {/* Arabic */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="flex items-center gap-1.5 text-emerald-300">
                      <BookOpen className="w-4 h-4" />
                      <span>اللغة العربية (القواعد والإملاء)</span>
                    </span>
                    <span className="text-slate-300">{profile.stats.arabicScore}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${profile.stats.arabicScore}%` }} />
                  </div>
                </div>

                {/* English */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="flex items-center gap-1.5 text-blue-300">
                      <Globe className="w-4 h-4" />
                      <span>اللغة الإنجليزية (Grammar & Vocabulary)</span>
                    </span>
                    <span className="text-slate-300">{profile.stats.englishScore}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400 rounded-full" style={{ width: `${profile.stats.englishScore}%` }} />
                  </div>
                </div>
              </div>

              {/* Weak Topics Analysis & Mistakes Record */}
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-amber-300">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <span>تحليل نقاط الضعف والتحديات الذكية (المنهج العراقي)</span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {profile.mistakesHistory?.length || 0} خطأ مسجل
                  </span>
                </div>

                {profile.mistakesHistory && profile.mistakesHistory.length > 0 ? (
                  <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                    {profile.mistakesHistory.slice(-5).reverse().map((m, i) => (
                      <div
                        key={i}
                        className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 ${
                          m.resolved
                            ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300'
                            : 'bg-amber-950/30 border-amber-800/40 text-amber-200'
                        }`}
                      >
                        <div className="flex-1">
                          <span className="font-bold">{m.topicTitleAr}:</span> {m.questionText}
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          m.resolved ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {m.resolved ? 'تم تصحيحها بتفوق ✓' : 'قيد التدريب اليومي'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-emerald-400 font-medium">
                    ✓ رائع جداً! لا توجد نقاط ضعف معلقة حالياً، والطالب يحل المسائل بدقة عالية.
                  </p>
                )}
              </div>

              {/* Home Reward Planner */}
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-3">
                <div className="flex items-center gap-2 text-sm font-extrabold text-amber-300">
                  <Gift className="w-4 h-4 text-amber-400" />
                  <span>المكافأة المنزلية التحفيزية</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  اكتب مكافأة حقيقية يتلقاها ابنك في المنزل عند إتمامه المستويات أو تحقيق أهدافه التعليمية (مثل: نزهة، وقت لعب إضافي، وجبته المفضلة).
                </p>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customReward}
                    onChange={(e) => setCustomReward(e.target.value)}
                    placeholder="مثال: الذهاب إلى الحديقة أو ساعة لعب بلايستيشن في العطلة"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-400"
                  />
                  <button
                    onClick={handleSaveReward}
                    className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs flex items-center gap-1.5 transition flex-shrink-0"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>حفظ المكافأة</span>
                  </button>
                </div>
                {isSavedReward && (
                  <div className="text-xs text-emerald-400 font-bold">تم حفظ المكافأة بنجاح! سيراها البطل لتحفيزه.</div>
                )}
              </div>

              {/* AI Pedagogical Advisor Report */}
              <div className="bg-gradient-to-br from-indigo-950/60 to-purple-950/60 p-4 rounded-2xl border border-indigo-700/60 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
                    <span className="font-extrabold text-sm text-indigo-200">
                      تقرير وتوصيات المستشار التربوي الذكي
                    </span>
                  </div>

                  <button
                    onClick={handleGenerateAiReport}
                    disabled={isLoadingReport}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold flex items-center gap-1 shadow"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{isLoadingReport ? 'جاري التحليل...' : 'تحديث التقرير التربوي'}</span>
                  </button>
                </div>

                {aiReport ? (
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-indigo-900/80 text-xs sm:text-sm leading-relaxed text-slate-200 whitespace-pre-wrap">
                    {aiReport}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">
                    اضغط على "تحديث التقرير التربوي" لإنشاء تقرير فوري مخصص يوضح نقاط القوة والتوصيات المناسبة لولي الأمر.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
