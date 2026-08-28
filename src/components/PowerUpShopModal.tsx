import React, { useState } from 'react';
import { UserProfile, PowerUpInventory } from '../types';
import { AVATARS } from '../data/curriculum';
import { playSound } from '../utils/audio';
import { Shield, Sparkles, Zap, Clock, HelpCircle, ShoppingBag, X, Check, Lock, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PowerUpShopModalProps {
  isOpen: boolean;
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onClose: () => void;
}

export const PowerUpShopModal: React.FC<PowerUpShopModalProps> = ({
  isOpen,
  profile,
  onUpdateProfile,
  onClose
}) => {
  const [activeShopTab, setActiveShopTab] = useState<'powerups' | 'avatars'>('powerups');

  if (!isOpen) return null;

  const currentInventory: PowerUpInventory = profile.inventory || {
    shields: 1,
    fiftyFifties: 2,
    timeFreezes: 2,
    doubleXp: 1
  };

  const powerUpItems = [
    {
      id: 'shield' as const,
      name: 'درع الصمود الذهبي',
      key: 'shields' as keyof PowerUpInventory,
      price: 40,
      icon: Shield,
      color: 'from-amber-500 to-yellow-600',
      description: 'يحميك من خسارة أي قلب عند ارتكاب خطأ في السؤال لمرة واحدة.',
      count: currentInventory.shields
    },
    {
      id: 'fiftyFifty' as const,
      name: 'كاشف الذكاء 50:50',
      key: 'fiftyFifties' as keyof PowerUpInventory,
      price: 30,
      icon: HelpCircle,
      color: 'from-purple-500 to-indigo-600',
      description: 'يحذف خيارين خاطئين فوراً ليتبقى لك خياران فقط!',
      count: currentInventory.fiftyFifties
    },
    {
      id: 'timeFreeze' as const,
      name: 'تجميد الوقت والتركيز',
      key: 'timeFreezes' as keyof PowerUpInventory,
      price: 35,
      icon: Clock,
      color: 'from-cyan-500 to-blue-600',
      description: 'يمنحك +20 ثانية إضافية في التحديات والامتحانات السريعة.',
      count: currentInventory.timeFreezes
    },
    {
      id: 'doubleXp' as const,
      name: 'جرعة الخبرة المضاعفة (2X XP)',
      key: 'doubleXp' as keyof PowerUpInventory,
      price: 50,
      icon: Zap,
      color: 'from-emerald-500 to-teal-600',
      description: 'تضاعف نقاط الخبرة المكتسبة في الجولة القادمة للارتقاء السريع.',
      count: currentInventory.doubleXp
    }
  ];

  const handleBuyPowerUp = (item: typeof powerUpItems[0]) => {
    if (profile.coins < item.price) {
      playSound.wrong();
      return;
    }

    playSound.powerUpBuy();
    try {
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    } catch {}

    const newInventory: PowerUpInventory = {
      ...currentInventory,
      [item.key]: currentInventory[item.key] + 1
    };

    onUpdateProfile({
      ...profile,
      coins: profile.coins - item.price,
      inventory: newInventory
    });
  };

  const handleSelectAvatar = (avatarId: string, minLevel: number) => {
    if (profile.level < minLevel) {
      playSound.wrong();
      return;
    }
    playSound.click();
    onUpdateProfile({
      ...profile,
      avatarId
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in" dir="rtl">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-amber-500/50 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-850/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center shadow-lg font-black text-xl">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                متجر القدرات والأبطال السحري 🛒
              </h3>
              <p className="text-xs text-slate-400 font-bold">
                استثمر جواهرك وذهبك لفتح قدرات استثنائية وأزياء أبطال
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 font-black text-sm flex items-center gap-1.5 shadow">
              <span>{profile.coins}</span>
              <span>💎</span>
            </div>
            <button
              onClick={() => {
                playSound.click();
                onClose();
              }}
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-900/60 px-4 pt-3 gap-2">
          <button
            onClick={() => {
              playSound.click();
              setActiveShopTab('powerups');
            }}
            className={`pb-2.5 px-4 font-bold text-sm flex items-center gap-2 border-b-2 transition ${
              activeShopTab === 'powerups'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>الأدوات المساعدة والقدرات</span>
          </button>

          <button
            onClick={() => {
              playSound.click();
              setActiveShopTab('avatars');
            }}
            className={`pb-2.5 px-4 font-bold text-sm flex items-center gap-2 border-b-2 transition ${
              activeShopTab === 'avatars'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>شخصيات وأزياء الأبطال</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {activeShopTab === 'powerups' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {powerUpItems.map(item => {
                const IconComponent = item.icon;
                const canAfford = profile.coins >= item.price;
                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between gap-3 shadow-lg hover:border-slate-600 transition"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow flex-shrink-0`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-extrabold text-sm text-white">{item.name}</h4>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-900/80 text-amber-300 font-bold border border-slate-700">
                            لديك: {item.count}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">{item.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
                      <div className="text-sm font-black text-amber-400 flex items-center gap-1">
                        <span>{item.price}</span>
                        <span>💎</span>
                      </div>

                      <button
                        onClick={() => handleBuyPowerUp(item)}
                        disabled={!canAfford}
                        className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition ${
                          canAfford
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-md active:scale-95'
                            : 'bg-slate-700/50 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>شراء الآن</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {AVATARS.map(avatar => {
                const isCurrent = profile.avatarId === avatar.id;
                const isUnlocked = profile.level >= avatar.minLevel;
                return (
                  <div
                    key={avatar.id}
                    onClick={() => handleSelectAvatar(avatar.id, avatar.minLevel)}
                    className={`p-3 rounded-2xl border flex flex-col items-center text-center gap-2 cursor-pointer transition relative ${
                      isCurrent
                        ? 'bg-amber-500/20 border-amber-400 shadow-lg scale-102'
                        : isUnlocked
                        ? 'bg-slate-800/80 border-slate-700 hover:border-slate-500'
                        : 'bg-slate-900/40 border-slate-800 opacity-60'
                    }`}
                  >
                    {!isUnlocked && (
                      <div className="absolute top-2 left-2 bg-slate-900/90 text-amber-400 p-1 rounded-lg border border-slate-700 text-[10px] flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        <span>مستوى {avatar.minLevel}</span>
                      </div>
                    )}
                    {isCurrent && (
                      <div className="absolute top-2 left-2 bg-emerald-500 text-slate-950 p-1 rounded-lg font-bold text-[10px] flex items-center gap-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                    )}

                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${avatar.bgGradient} flex items-center justify-center text-3xl shadow`}>
                      {avatar.emoji}
                    </div>

                    <div>
                      <h4 className="font-extrabold text-xs text-white">{avatar.name}</h4>
                      <p className="text-[10px] text-slate-400 line-clamp-1">{avatar.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3.5 bg-slate-950 border-t border-slate-800/80 text-center text-xs text-slate-400">
          💡 يمكنك استخدام الأدوات المساعدة داخل حلبة الأسئلة والتحديات لحماية قلوبك ومضاعفة درجاتك!
        </div>
      </div>
    </div>
  );
};
