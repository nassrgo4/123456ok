import React, { useState } from 'react';
import { UserProfile, SmartReminderSettings } from '../types';
import { playSound } from '../utils/audio';
import {
  Bell,
  X,
  Clock,
  CheckCircle2,
  Sparkles,
  Calendar,
  ShieldCheck,
  Send,
  Volume2,
  HeartHandshake
} from 'lucide-react';

interface SmartRemindersModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSaveSettings: (settings: SmartReminderSettings) => void;
}

const PRESET_TIMES = [
  {
    time: '16:30',
    title: 'جلسة العصر الذهبية 🌅',
    desc: 'بعد العودة من المدرسة وتناول الغداء (4:30 عصراً)'
  },
  {
    time: '19:30',
    title: 'تحدي المساء والتركيز 🌙',
    desc: 'وقت هادئ لمراجعة قواعد اللغة والرياضيات (7:30 مساءً)'
  },
  {
    time: '21:00',
    title: 'تثبيت المفردات قبل النوم ⚡',
    desc: 'مراجعة خفيفة وسريعة لـ English for Iraq (9:00 مساءً)'
  }
];

export const SmartRemindersModal: React.FC<SmartRemindersModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveSettings
}) => {
  if (!isOpen) return null;

  const currentSettings: SmartReminderSettings = profile.smartReminder || {
    enabled: true,
    time: '16:30',
    timeLabelAr: 'وقت العصر الذهبي (4:30 عصراً)',
    dailyTargetMinutes: 20,
    browserNotifications: false,
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6]
  };

  const [enabled, setEnabled] = useState(currentSettings.enabled);
  const [selectedTime, setSelectedTime] = useState(currentSettings.time);
  const [targetMinutes, setTargetMinutes] = useState(currentSettings.dailyTargetMinutes || 20);
  const [browserNotifications, setBrowserNotifications] = useState(currentSettings.browserNotifications || false);
  const [testNotificationSent, setTestNotificationSent] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<string>(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default'
  );

  const handleRequestBrowserPerms = async () => {
    playSound.click();
    if ('Notification' in window) {
      try {
        const res = await Notification.requestPermission();
        setPermissionStatus(res);
        if (res === 'granted') {
          setBrowserNotifications(true);
          new Notification('هدية أبي الغالي ❤️', {
            body: 'تم تفعيل التذكيرات الذكية بنجاح! سنذكرك يومياً بموعد مراجعة دروسك.',
            icon: '/favicon.ico'
          });
        }
      } catch (e) {
        console.warn('Notification permission error:', e);
      }
    }
  };

  const handleSendTestNotification = () => {
    playSound.starPop();
    setTestNotificationSent(true);

    if (browserNotifications && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification('تنبيه المذاكرة الذكي - هدية أبي الغالي 🇮🇶', {
          body: `حان الآن وقت مراجعة الرياضيات وقواعد اللغة العربية يا ${profile.name}! 20 دقيقة تصنع الفرق ⭐`,
          icon: '/favicon.ico'
        });
      } catch {}
    }

    setTimeout(() => {
      setTestNotificationSent(false);
    }, 4500);
  };

  const handleSave = () => {
    playSound.correct();
    const matchedPreset = PRESET_TIMES.find((p) => p.time === selectedTime);
    const timeLabelAr = matchedPreset ? matchedPreset.title : `الساعة ${selectedTime}`;

    onSaveSettings({
      enabled,
      time: selectedTime,
      timeLabelAr,
      dailyTargetMinutes: targetMinutes,
      browserNotifications,
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6]
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in text-right">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-850 via-slate-800 to-slate-850 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow text-white font-bold">
              <Bell className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                التذكيرات الذكية ومواعيد المذاكرة
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                برمج وقتك اليومي للحفاظ على شعلة الحماس والـ Streak بدون انقطاع
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playSound.click();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Main Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/90 border border-slate-700">
            <div className="space-y-0.5">
              <div className="text-sm font-black text-white flex items-center gap-2">
                <span>تفعيل التذكير اليومي التلقائي</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  ذكي ومخصص
                </span>
              </div>
              <p className="text-xs text-slate-300">
                إرسال تنبيه تشجيعي لطيف في الموعد المحدد لتثبيت عادة التعلم اليومي
              </p>
            </div>

            <button
              onClick={() => {
                playSound.click();
                setEnabled(!enabled);
              }}
              className={`w-14 h-8 rounded-full transition-colors relative p-1 ${
                enabled ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white shadow-md transition-transform ${
                  enabled ? '-translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Test Notification Banner if fired */}
          {testNotificationSent && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-emerald-900/60 to-slate-900 border border-emerald-500 text-emerald-200 animate-fade-in flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-amber-300 flex-shrink-0 animate-spin" />
              <div className="text-xs space-y-0.5 flex-1">
                <strong className="block text-white text-sm">🔔 تجربة التنبيه الذكي:</strong>
                <span>"يا بطل! حان وقت جلسة المذاكرة اليومية (20 دقيقة) لحماية الـ Streak وكسب أوسمة جديدة!"</span>
              </div>
            </div>
          )}

          {/* Presets */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-300 block">
              اختر أفضل وقت يناسب جدولك اليومي:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {PRESET_TIMES.map((preset) => {
                const isSelected = selectedTime === preset.time;
                return (
                  <button
                    key={preset.time}
                    onClick={() => {
                      playSound.click();
                      setSelectedTime(preset.time);
                    }}
                    className={`p-3 rounded-2xl border text-right transition flex flex-col justify-between gap-1.5 ${
                      isSelected
                        ? 'bg-indigo-600/25 border-indigo-400 text-white ring-2 ring-indigo-500/40 shadow-md'
                        : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-black">{preset.title}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">{preset.desc}</p>
                    <span className="text-xs font-black text-amber-400 mt-1">{preset.time}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Time & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-800/70 border border-slate-700 space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>تحديد وقت مخصص:</span>
              </label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-indigo-400 text-center"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/70 border border-slate-700 space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>الهدف اليومي الموصى به:</span>
              </label>
              <div className="flex items-center gap-2">
                {[15, 20, 30].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => {
                      playSound.click();
                      setTargetMinutes(mins);
                    }}
                    className={`flex-1 py-2 rounded-xl text-xs font-black border transition ${
                      targetMinutes === mins
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                        : 'bg-slate-900 border-slate-700 text-slate-400'
                    }`}
                  >
                    {mins} دقيقة
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Browser Notifications Integration */}
          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <div>
                <span className="font-bold text-white block">إشعارات المتصفح والنظام:</span>
                <span className="text-slate-400 text-[11px]">
                  {permissionStatus === 'granted'
                    ? 'الإشعارات مفعلة ومصرح لها على جهازك ✓'
                    : 'اسمح للمتصفح بإرسال إشعارات لتصلك حتى لو كان التطبيق مغلقاً'}
                </span>
              </div>
            </div>

            {permissionStatus !== 'granted' ? (
              <button
                onClick={handleRequestBrowserPerms}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] whitespace-nowrap transition"
              >
                تفعيل الإذن
              </button>
            ) : (
              <span className="text-emerald-400 font-extrabold text-xs">مفعلة ✓</span>
            )}
          </div>

          {/* Father Encouragement Quote */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-800 to-amber-500/5 border border-amber-500/30 flex items-center gap-2.5 text-xs text-amber-200">
            <HeartHandshake className="w-5 h-5 text-rose-400 flex-shrink-0" />
            <p className="leading-relaxed">
              <strong>نصيحة ذهبية:</strong> الاستمرار 20 دقيقة يومياً أفضل بكثير من الدراسة لساعات طويلة قبل الامتحان بيوم واحد. ثقتك بنفسك تبدأ من هنا!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-850 border-t border-slate-700/80 flex items-center justify-between gap-3">
          <button
            onClick={handleSendTestNotification}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition"
          >
            <Send className="w-3.5 h-3.5 text-amber-400" />
            <span>تجربة التنبيه الآن</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playSound.click();
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
            >
              إلغاء
            </button>
            <button
              id="save-smart-reminders-button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-indigo-500/20 flex items-center gap-1.5 transition"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>حفظ وتثبيت الموعد</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
