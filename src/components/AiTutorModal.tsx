import React, { useState, useEffect } from 'react';
import { Sparkles, X, Send, Bot, Volume2, Lightbulb, CheckCircle2, MessageSquare } from 'lucide-react';
import { playSound, speakText } from '../utils/audio';
import { Question } from '../types';

interface AiTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialContext?: {
    question: Question;
    userAnswer: string;
  } | null;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

const PRESET_QUESTIONS = [
  '🔢 اشرح لي بطريقة سهلة كيف أجمع كسرين بمقامات مختلفة؟',
  '📖 ما الفرق بين عمل "كان وأخواتها" و"إن وأخواتها"؟',
  '🇬🇧 متى نستخدم الماضي البسيط Past Simple في اللغة الإنجليزية؟',
  '📐 كيف أحسب مساحة المثلث ومحيط الدائرة بسهولة؟',
  '🎯 اعطني لغزاً رياضياً ذكياً لتحدي اليوم!'
];

export const AiTutorModal: React.FC<AiTutorModalProps> = ({
  isOpen,
  onClose,
  initialContext
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'أهلاً بك يا بطل! أنا "حكيم"، معلمك ومساعدك الذكي لمناهج الصف السادس (الرياضيات، لغتنا العربية الجميلة، واللغة الإنجليزية). كيف يمكنني مساعدتك اليوم؟ 🌟',
      timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If opened with a specific question context
  useEffect(() => {
    if (isOpen && initialContext) {
      handleExplainContext(initialContext.question, initialContext.userAnswer);
    }
  }, [isOpen, initialContext]);

  const handleExplainContext = async (q: Question, userAns: string) => {
    const userPrompt = `يا أستاذ حكيم، واجهت هذا السؤال في درس (${q.topicTitleAr}): "${q.question}" وأجبت: "${userAns}". كيف أفهمه جيداً؟`;
    
    setMessages(prev => [
      ...prev,
      {
        id: `user_${Date.now()}`,
        sender: 'user',
        text: userPrompt,
        timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
      }
    ]);

    setIsLoading(true);
    try {
      const res = await fetch('/api/tutor/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q.question,
          userAnswer: userAns,
          correctAnswer: q.correctAnswer,
          subject: q.subject === 'math' ? 'الرياضيات' : q.subject === 'arabic' ? 'اللغة العربية' : 'اللغة الإنجليزية',
          topic: q.topicTitleAr
        })
      });
      const data = await res.json();
      const aiReply = data.explanation || q.explanation;

      setMessages(prev => [
        ...prev,
        {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: aiReply,
          timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: `ai_fallback_${Date.now()}`,
          sender: 'ai',
          text: `أحسنت المحاولة يا بطل! الإجابة الصحيحة هي: (${q.correctAnswer}). ${q.explanation}`,
          timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query || isLoading) return;

    playSound.click();
    setInputVal('');

    const newMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/tutor/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: query,
          userAnswer: '',
          correctAnswer: 'شرح مبسط وتوجيه تربوي',
          subject: 'المنهج الشامل',
          topic: 'سؤال عام'
        })
      });
      const data = await res.json();

      setMessages(prev => [
        ...prev,
        {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: data.explanation || 'أنا هنا لمساعدتك دائماً في كل مواد الصف السادس!',
          timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: 'سؤال رائع! تذكر دائماً مراجعة القواعد والتدرب بحل مسألتين يومياً لتصبح من أوائل المتفوقين!',
          timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[85vh] max-h-[700px]">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white flex items-center justify-between shadow">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow">
              🧙‍♂️
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-black text-base sm:text-lg">
                <span>المعلم الذكي "حكيم"</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950 text-[10px] font-extrabold">
                  متصل
                </span>
              </div>
              <div className="text-xs text-white/90">مرشد ودود لشرح دروس وتمارين الصف السادس</div>
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

        {/* Quick Presets Carousel */}
        <div className="bg-slate-800/80 p-2 border-b border-slate-700/60 overflow-x-auto scrollbar-none flex gap-2">
          {PRESET_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="px-3 py-1.5 rounded-xl bg-slate-700/90 hover:bg-slate-600 text-slate-200 text-xs font-bold whitespace-nowrap transition border border-slate-600 flex-shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/40">
          {messages.map((m) => {
            const isAi = m.sender === 'ai';
            return (
              <div
                key={m.id}
                className={`flex gap-3 ${isAi ? 'flex-row' : 'flex-row-reverse'} items-start`}
              >
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center text-lg flex-shrink-0 shadow ${
                    isAi
                      ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
                      : 'bg-gradient-to-br from-amber-500 to-orange-500 text-slate-950 font-bold'
                  }`}
                >
                  {isAi ? '🧙‍♂️' : '👦'}
                </div>

                <div
                  className={`max-w-[80%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed shadow-md ${
                    isAi
                      ? 'bg-slate-800 border border-slate-700/90 text-slate-100 rounded-tr-none'
                      : 'bg-amber-500 text-slate-950 font-bold rounded-tl-none'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{m.text}</div>
                  
                  <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-white/10 text-[10px] text-slate-400">
                    <span>{m.timestamp}</span>
                    {isAi && (
                      <button
                        onClick={() => speakText(m.text, 'ar')}
                        className="p-1 rounded bg-slate-700 hover:bg-slate-600 text-amber-300 transition"
                        title="استمع لصوت المعلم"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-lg animate-pulse">
                🧙‍♂️
              </div>
              <div className="bg-slate-800 p-3.5 rounded-2xl border border-slate-700 text-xs text-amber-300 font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
                <span>المعلم حكيم يفكر ويجهز لك الشرح المبسط...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="اكتب سؤالك أو مسألتك هنا وسأشرحها لك خطوة بخطوة..."
            className="flex-1 px-4 py-3 rounded-2xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-emerald-400 transition"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputVal.trim() || isLoading}
            className={`p-3 rounded-2xl font-bold flex items-center justify-center transition shadow ${
              inputVal.trim() && !isLoading
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:scale-105'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
