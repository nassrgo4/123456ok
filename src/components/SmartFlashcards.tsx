import React, { useState } from 'react';
import { GRADE_6_FLASHCARDS } from '../data/flashcards';
import { SubjectType, Flashcard } from '../types';
import { playSound, speakText } from '../utils/audio';
import { 
  BookOpen, 
  Sparkles, 
  RotateCw, 
  Volume2, 
  CheckCircle2, 
  HelpCircle, 
  ChevronRight, 
  ChevronLeft, 
  Shuffle, 
  Filter,
  Check,
  RefreshCw,
  Award
} from 'lucide-react';

interface SmartFlashcardsProps {
  onBack: () => void;
}

export const SmartFlashcards: React.FC<SmartFlashcardsProps> = ({ onBack }) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectType | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('knowledge_hero_mastered_flashcards');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const filteredCards = GRADE_6_FLASHCARDS.filter(
    c => selectedSubject === 'all' || c.subject === selectedSubject
  );

  const currentCard = filteredCards[currentIndex] || filteredCards[0];
  const isMastered = currentCard ? masteredIds.includes(currentCard.id) : false;

  const handleFlip = () => {
    playSound.click();
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    playSound.click();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    playSound.click();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleShuffle = () => {
    playSound.starPop();
    setIsFlipped(false);
    const randomIdx = Math.floor(Math.random() * filteredCards.length);
    setCurrentIndex(randomIdx);
  };

  const toggleMastery = (cardId: string) => {
    playSound.starPop();
    let updated: string[];
    if (masteredIds.includes(cardId)) {
      updated = masteredIds.filter(id => id !== cardId);
    } else {
      updated = [...masteredIds, cardId];
    }
    setMasteredIds(updated);
    try {
      localStorage.setItem('knowledge_hero_mastered_flashcards', JSON.stringify(updated));
    } catch {}
  };

  const handleReadVoice = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSound.click();
    if (!currentCard) return;
    const textToRead = isFlipped ? currentCard.back : currentCard.front;
    speakText(textToRead, currentCard.subject === 'english' ? 'en' : 'ar');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5 animate-fade-in" dir="rtl">
      {/* Top Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3 text-center sm:text-right">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-xl font-bold shadow-lg flex-shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 justify-center sm:justify-start">
              بطاقات المراجعة الذكية (Flashcards) 📇
            </h2>
            <p className="text-xs text-slate-400 font-bold">
              راجع أهم القواعد، القوانين، والمفردات لمنهج الصف السادس بلمسة واحدة
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-black flex items-center gap-1.5 shadow">
            <Award className="w-4 h-4 text-amber-400" />
            <span>أتقنت: {masteredIds.length} / {GRADE_6_FLASHCARDS.length}</span>
          </div>
          <button
            onClick={onBack}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
          >
            العودة للمنهج
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
        <div className="flex items-center gap-2">
          {[
            { id: 'all', label: 'الكل 📚' },
            { id: 'math', label: 'الرياضيات 📐' },
            { id: 'arabic', label: 'اللغة العربية ✍️' },
            { id: 'english', label: 'اللغة الإنجليزية 🇬🇧' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                playSound.click();
                setSelectedSubject(tab.id as SubjectType | 'all');
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition ${
                selectedSubject === tab.id
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg'
                  : 'bg-slate-850 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleShuffle}
          className="px-3 py-2 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-300 text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition"
          title="ترتيب عشوائي"
        >
          <Shuffle className="w-3.5 h-3.5 text-purple-400" />
          <span className="hidden sm:inline">خلط البطاقات</span>
        </button>
      </div>

      {/* Interactive Flashcard Container */}
      {currentCard ? (
        <div className="space-y-4">
          <div
            onClick={handleFlip}
            className="min-h-[320px] sm:min-h-[360px] w-full rounded-3xl p-6 sm:p-8 cursor-pointer relative select-none transition-all duration-300 shadow-2xl flex flex-col justify-between border-2 border-slate-700/80 hover:border-purple-400/80 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 group"
          >
            {/* Top Bar of Card */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-800 text-purple-300 text-xs font-extrabold border border-purple-500/30">
                  {currentCard.tag}
                </span>
                <span className="text-xs text-slate-400 font-bold">
                  بطاقة {currentIndex + 1} من {filteredCards.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleReadVoice}
                  className="p-2 rounded-xl bg-slate-800/80 hover:bg-purple-600/30 text-purple-300 border border-slate-700 hover:border-purple-400 transition"
                  title="استمع للنطق الصوتي"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMastery(currentCard.id);
                  }}
                  className={`p-2 rounded-xl border transition ${
                    isMastered
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                  title={isMastered ? 'أتقنت هذه البطاقة' : 'تحديد كمتقن'}
                >
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Card Content (Front / Back) */}
            <div className="text-center py-6 sm:py-8 space-y-4">
              {!isFlipped ? (
                <div className="space-y-3 animate-fade-in">
                  <span className="text-xs font-black text-purple-400 tracking-wider">سؤال أو مفهوم:</span>
                  <h3 className="text-xl sm:text-3xl font-black text-white leading-relaxed">
                    {currentCard.front}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-bold bg-slate-800/60 px-3 py-1 rounded-full border border-slate-700">
                    <RotateCw className="w-3.5 h-3.5 text-purple-400 animate-spin" />
                    <span>المس أو انقر لقلب البطاقة ومعرفة الإجابة والقاعدة</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  <span className="text-xs font-black text-emerald-400 tracking-wider">القاعدة والشرح:</span>
                  <p className="text-base sm:text-xl font-bold text-slate-100 whitespace-pre-line leading-relaxed max-w-2xl mx-auto">
                    {currentCard.back}
                  </p>
                  {currentCard.example && (
                    <div className="bg-slate-900/90 border border-slate-700/80 p-3 rounded-2xl max-w-xl mx-auto text-xs sm:text-sm text-amber-300 font-bold">
                      <span className="text-slate-400 font-normal">مثال تطبيقي: </span>
                      {currentCard.example}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Footer Hint */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              <span className="font-bold text-slate-300">{currentCard.title}</span>
              <span className="text-[11px]">
                {isFlipped ? '✅ تم كشف الإجابة والقاعدة' : '🔍 انقر لقلب البطاقة'}
              </span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={handlePrev}
              className="px-4 py-3 rounded-2xl bg-slate-850 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 border border-slate-700 transition"
            >
              <ChevronRight className="w-4 h-4" />
              <span>البطاقة السابقة</span>
            </button>

            <button
              onClick={handleFlip}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-lg flex items-center gap-2 transition"
            >
              <RotateCw className="w-4 h-4" />
              <span>قلب البطاقة</span>
            </button>

            <button
              onClick={handleNext}
              className="px-4 py-3 rounded-2xl bg-slate-850 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 border border-slate-700 transition"
            >
              <span>البطاقة التالية</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-slate-900 rounded-3xl border border-slate-800 text-slate-400">
          لا توجد بطاقات في هذا التصنيف حالياً.
        </div>
      )}
    </div>
  );
};
