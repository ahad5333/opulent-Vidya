import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, X, Send, Mic, RotateCcw,
  MessageSquare, Loader2, Globe, ChevronRight,
  Sparkles, Search, GraduationCap, MapPin, 
  PhoneCall, Volume2, VolumeX, ArrowRight, Bot
} from 'lucide-react';

// --- Types ---
type ChatStep = 'CHOOSE_LANG' | 'INTRO' | 'ASK_NAME' | 'ASK_EMAIL' | 'ASK_PHONE' | 'INTERACTIVE';
type AssistantState = 'idle' | 'listening' | 'thinking' | 'speaking';

interface Translation {
  header: string;
  replyTime: string;
  inputPlaceholder: string;
  langPrompt: string;
  introMessage: string;
  askEmail: (name: string) => string;
  askPhone: string;
  interactiveStart: string;
  ansDefault: string;
  errName: string;
  errEmail: string;
  errPhone: string;
}

const translations: Record<string, Translation> = {
  en: {
    header: "Vidhya AI Assistant",
    replyTime: "Expert Counselor Online",
    inputPlaceholder: "Ask about courses or study abroad...",
    langPrompt: "Hello! I am Vidhya, your AI education counselor. Please choose your preferred language to begin.",
    introMessage: "Welcome to Opulent Vidya! I'm here to help you find the perfect course or study destination. May I know your name?",
    askEmail: (name: string) => `Nice to meet you, ${name}! Please share your email address so our expert counselors can send you detailed brochures.`,
    askPhone: "Great! One last thing, can I have your phone number for a quick callback? (Or type 'Skip')",
    interactiveStart: "Excellent! I've saved your details. How can I assist you today? You can ask about our 100+ courses, study destinations like USA/Canada, or book a free consultation.",
    ansDefault: "That's an interesting question! I specialize in IT courses and Study Abroad guidance. Would you like to see our top courses or explore countries?",
    errName: "Please enter your name.",
    errEmail: "Please enter a valid email address.",
    errPhone: "Please enter a valid phone number or type 'Skip'.",
  },
  hi: {
    header: "विद्या एआई सहायक",
    replyTime: "विशेषज्ञ परामर्शदाता ऑनलाइन",
    inputPlaceholder: "कोर्स या विदेश में पढ़ाई के बारे में पूछें...",
    langPrompt: "नमस्ते! मैं विद्या हूँ, आपकी एआई शिक्षा परामर्शदाता। कृपया बातचीत शुरू करने के लिए अपनी भाषा चुनें।",
    introMessage: "ऑपुलेंट विद्या में आपका स्वागत है! मैं यहाँ आपको सही कोर्स या पढ़ाई के लिए सही देश खोजने में मदद करने के लिए हूँ। क्या मैं आपका नाम जान सकती हूँ?",
    askEmail: (name: string) => `आपसे मिलकर अच्छा लगा, ${name}! कृपया अपना ईमेल साझा करें ताकि हमारे विशेषज्ञ आपको विस्तृत जानकारी भेज सकें।`,
    askPhone: "बहुत बढ़िया! एक आखिरी बात, क्या मुझे आपका फोन नंबर मिल सकता है? (या 'Skip' लिखें)",
    interactiveStart: "बहुत अच्छा! मैंने आपका विवरण सुरक्षित कर लिया है। आज मैं आपकी कैसे मदद कर सकती हूँ? आप हमारे 100+ कोर्सेज, या यूएसए/कनाडा जैसे देशों के बारे में पूछ सकते हैं।",
    ansDefault: "यह एक दिलचस्प सवाल है! मैं आईटी कोर्सेज और विदेश में पढ़ाई के मार्गदर्शन में विशेषज्ञ हूँ। क्या आप हमारे टॉप कोर्सेज देखना चाहेंगे?",
    errName: "कृपया अपना नाम दर्ज करें।",
    errEmail: "कृपया एक मान्य ईमेल पता दर्ज करें।",
    errPhone: "कृपया एक मान्य फोन नंबर दर्ज करें या 'Skip' लिखें।",
  }
};

const languagesList = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'hi', label: 'हिंदी', flag: '🇮🇳' }
];

const suggestedQuestions = [
  "What are your top IT courses?",
  "Tell me about studying in Canada",
  "How can I book a free consultation?",
  "What is the duration of AWS certification?",
  "Best engineering courses for my career?"
];

// --- Mock Data (Synced with project) ---
const courseData = [
  { title: "AWS Certification", category: "IT Training", level: "Intermediate", duration: "3 Months" },
  { title: "Data Science Training", category: "Data & AI", level: "Intermediate", duration: "3 Months" },
  { title: "Artificial Intelligence", category: "Data & AI", level: "Advanced", duration: "3 Months" },
  { title: "Python Training", category: "IT Training", level: "Beginner", duration: "2 Months" },
  { title: "Digital Marketing", category: "Digital & Design", level: "Beginner", duration: "2 Months" }
];

const destinationData = [
  { country: "USA", universities: "4,000+", cost: "$25k - $45k", desc: "Hub for innovation and Ivy League excellence." },
  { country: "Canada", universities: "100+", cost: "CAD 20k - 40k", desc: "Great PR opportunities and inclusive environment." },
  { country: "United Kingdom", universities: "160+", cost: "£15k - £30k", desc: "Short degree durations and centuries of excellence." },
  { country: "Australia", universities: "43", cost: "AUD 20k - 35k", desc: "World-class education and relaxed lifestyle." }
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai'; text: string; timestamp: string; type?: 'course' | 'destination' | 'action' }[]>([]);
  const [chatStep, setChatStep] = useState<ChatStep>('CHOOSE_LANG');
  const [isTyping, setIsTyping] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [assistantState, setAssistantState] = useState<AssistantState>('idle');
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = translations[language] || translations.en;

  const getTimestamp = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const speak = (text: string, langOverride?: string) => {
    if (typeof window === 'undefined' || isMuted) return;
    
    window.speechSynthesis.cancel();
    const currentLang = langOverride || language;
    const utterance = new SpeechSynthesisUtterance(text);
    
    const voices = window.speechSynthesis.getVoices();
    const targetLang = currentLang === 'hi' ? 'hi-IN' : 'en-US';
    
    // Robust voice selection
    let voice = voices.find(v => v.lang === targetLang);
    if (!voice) voice = voices.find(v => v.lang.startsWith(targetLang));
    if (!voice && currentLang === 'hi') voice = voices.find(v => v.lang.includes('hi'));
    
    if (voice) {
      utterance.voice = voice;
      console.log("Selected voice:", voice.name, voice.lang);
    }
    
    utterance.lang = targetLang;
    utterance.pitch = 1.0;
    utterance.rate = 1.0;
    utterance.volume = 1.0;
    
    utterance.onstart = () => setAssistantState('speaking');
    utterance.onend = () => setAssistantState('idle');
    utterance.onerror = (e) => {
      console.error("Speech error:", e);
      setAssistantState('idle');
    };
    
    window.speechSynthesis.speak(utterance);
  };

  const simulateAiResponse = (text: string, nextStep?: ChatStep, langOverride?: string) => {
    setIsTyping(true);
    setAssistantState('thinking');
    setTimeout(() => {
      setChatHistory(prev => [...prev, { role: 'ai', text, timestamp: getTimestamp() }]);
      setIsTyping(false);
      setAssistantState('idle');
      if (nextStep) setChatStep(nextStep);
      speak(text, langOverride);
    }, 1000);
  };

  const handleSend = (isButton = false, buttonText = "", langCode?: string) => {
    const msgToSend = isButton ? buttonText : message;
    if (!msgToSend.trim()) return;

    if (langCode) setLanguage(langCode);
    const activeT = langCode ? (translations[langCode] || translations.en) : t;

    setChatHistory(prev => [...prev, { role: 'user', text: msgToSend, timestamp: getTimestamp() }]);
    if (!isButton) setMessage("");

    // Prime speech engine on first interaction
    if (chatStep === 'CHOOSE_LANG') {
      const prime = new SpeechSynthesisUtterance("");
      window.speechSynthesis.speak(prime);
    }

    if (chatStep === 'CHOOSE_LANG') {
      simulateAiResponse(activeT.introMessage, 'ASK_NAME', langCode);
    } else if (chatStep === 'ASK_NAME') {
      if (msgToSend.length < 2) { simulateAiResponse(activeT.errName); return; }
      setUserName(msgToSend);
      simulateAiResponse(activeT.askEmail(msgToSend), 'ASK_EMAIL');
    } else if (chatStep === 'ASK_EMAIL') {
      if (!msgToSend.includes('@') || msgToSend.length < 5) { simulateAiResponse(activeT.errEmail); return; }
      setUserEmail(msgToSend);
      simulateAiResponse(activeT.askPhone, 'ASK_PHONE');
    } else if (chatStep === 'ASK_PHONE') {
      simulateAiResponse(activeT.interactiveStart, 'INTERACTIVE');
    } else {
      const lowerMsg = msgToSend.toLowerCase();
      
      // Smart Knowledge Matching
      if (lowerMsg.includes('course') || lowerMsg.includes('study') || lowerMsg.includes('learn')) {
        simulateAiResponse("I have a list of top-rated IT and Engineering courses. Which field interests you most?");
        return;
      }

      if (lowerMsg.includes('usa') || lowerMsg.includes('canada') || lowerMsg.includes('uk') || lowerMsg.includes('australia')) {
        const dest = destinationData.find(d => lowerMsg.includes(d.country.toLowerCase()));
        if (dest) {
          simulateAiResponse(`${dest.country} is a fantastic choice! It has ${dest.universities} universities and an average cost of ${dest.cost}. ${dest.desc}`);
        } else {
          simulateAiResponse("We support multiple study destinations including USA, Canada, UK, and Australia. Which one would you like to explore?");
        }
        return;
      }

      if (lowerMsg.includes('consultation') || lowerMsg.includes('book') || lowerMsg.includes('call')) {
        simulateAiResponse("Great choice! A counselor will call you shortly at your provided email/phone. Is there anything else you'd like to know?");
        return;
      }

      simulateAiResponse(activeT.ansDefault);
    }
  };

  const resetChat = () => {
    window.speechSynthesis.cancel();
    setChatHistory([{ role: 'ai', text: translations.en.langPrompt, timestamp: getTimestamp() }]);
    setChatStep('CHOOSE_LANG');
    setUserName("");
    setUserEmail("");
    setLanguage('en');
    setIsOpen(true);
    setIsTyping(false);
    setAssistantState('idle');
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    recognition.onstart = () => setAssistantState('listening');
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (transcript) handleSend(true, transcript);
    };
    recognition.onend = () => setAssistantState('idle');
    recognition.start();
  };

  useEffect(() => {
    setMounted(true);
    if (!chatHistory.length) {
      setChatHistory([{ role: 'ai', text: t.langPrompt, timestamp: getTimestamp() }]);
    }

    // Auto-popup after 2 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    // Pre-load voices for better reliability
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      clearTimeout(timer);
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            className="pointer-events-auto flex flex-col bg-white/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/50 overflow-hidden relative h-[550px] w-[360px] max-sm:h-[80vh] max-sm:w-[calc(100vw-32px)] rounded-[2rem]"
          >
            {/* Premium Header */}
            <div className="p-4 bg-gradient-to-br from-secondary to-secondary-light text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner overflow-hidden transition-all duration-500 ${assistantState === 'speaking' ? 'ring-2 ring-primary bg-primary/20 scale-110' : ''}`}>
                      {assistantState === 'speaking' ? (
                        <motion.div
                          animate={{ 
                            y: [0, -2, 0],
                            rotate: [0, -5, 5, 0]
                          }}
                          transition={{ repeat: Infinity, duration: 0.5 }}
                        >
                          <Bot size={28} className="text-white" />
                        </motion.div>
                      ) : (
                        <Bot size={28} className="text-white/80" />
                      )}
                      
                      {/* Sound Waves Animation */}
                      {assistantState === 'speaking' && (
                        <div className="absolute inset-0 flex items-end justify-center gap-0.5 pb-2 opacity-60">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <motion.div
                              key={i}
                              className="w-1 bg-primary rounded-full"
                              animate={{ height: [4, 16, 4] }}
                              transition={{ repeat: Infinity, duration: 0.3, delay: i * 0.1 }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-secondary transition-colors duration-300 ${assistantState === 'speaking' ? 'bg-primary animate-pulse' : 'bg-green-500'}`} />
                  </div>
                  <div>
                    <h3 className="font-black text-base tracking-tight">{t.header}</h3>
                    <div className="flex items-center gap-2 text-white/70 text-xs font-bold uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                      {t.replyTime}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={resetChat} title="Reset Chat" className="p-2 hover:bg-white/10 rounded-xl transition-all">
                    <RotateCcw size={18} />
                  </button>
                  <button onClick={() => setIsMuted(!isMuted)} className="p-2 hover:bg-white/10 rounded-xl transition-all">
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  <button onClick={() => { setIsOpen(false); window.speechSynthesis.cancel(); }} className="p-2 hover:bg-white/10 rounded-xl transition-all">
                    <X size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gray-50/50">
              {chatHistory.map((chat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: chat.role === 'user' ? 20 : -20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] group`}>
                    <div className={`px-5 py-3.5 rounded-[1.5rem] text-sm font-semibold leading-relaxed shadow-sm transition-all ${
                      chat.role === 'user' 
                        ? 'bg-primary text-white rounded-tr-none shadow-primary/20' 
                        : 'bg-white border border-gray-100 text-secondary rounded-tl-none'
                    }`}>
                      {chat.text}
                    </div>
                    <div className={`text-[10px] mt-1.5 font-bold uppercase tracking-widest text-gray-400 ${chat.role === 'user' ? 'text-right' : 'text-left'}`}>
                      {chat.timestamp}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Language Selection */}
              {chatStep === 'CHOOSE_LANG' && (
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {languagesList.map(l => (
                    <button
                      key={l.code}
                      onClick={() => handleSend(true, l.label, l.code)}
                      className="flex items-center justify-center gap-2 px-3 py-3 bg-white border-2 border-gray-100 rounded-2xl text-sm font-black text-secondary hover:border-primary hover:bg-primary/5 transition-all shadow-sm active:scale-95"
                    >
                      <span className="text-xl">{l.flag}</span> {l.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Interactive Dashboard */}
              {chatStep === 'INTERACTIVE' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pt-4">
                  <div className="bg-secondary rounded-2xl p-4 text-white shadow-xl">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles size={16} className="text-primary" />
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Quick Actions</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => handleSend(true, "Top IT Courses")} className="flex flex-col items-center gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all group">
                        <GraduationCap size={20} className="text-primary" />
                        <span className="text-[10px] font-bold">Courses</span>
                      </button>
                      <button onClick={() => handleSend(true, "Study Abroad")} className="flex flex-col items-center gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all">
                        <Globe size={20} className="text-primary" />
                        <span className="text-[10px] font-bold">Destinations</span>
                      </button>
                      <button onClick={() => handleSend(true, "Book a Consultation")} className="col-span-2 flex items-center justify-center gap-3 p-3 bg-primary text-white rounded-2xl font-black text-xs hover:bg-primary-light transition-all shadow-lg shadow-primary/20">
                        <PhoneCall size={16} /> Book Free Call
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Popular Questions</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedQuestions.map((q, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(true, q)}
                          className="px-3 py-2 bg-white border border-gray-100 rounded-xl text-[10px] font-bold text-gray-600 hover:border-primary hover:text-primary transition-all shadow-sm"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-3 text-[10px] text-gray-400 font-bold tracking-widest uppercase">
                  <Loader2 size={14} className="animate-spin text-primary" />
                  Vidhya is thinking...
                </div>
              )}

              {/* Listening Indicator */}
              {assistantState === 'listening' && (
                <div className="flex items-center gap-3 text-[10px] text-primary font-black tracking-widest uppercase animate-pulse">
                  <div className="flex gap-1">
                    <div className="w-1 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1 h-5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '100ms' }} />
                    <div className="w-1 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                  </div>
                  Listening to you...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <div className="p-4 bg-white border-t border-gray-100">
              <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="flex gap-3 relative">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder={t.inputPlaceholder}
                    className="w-full bg-gray-50 rounded-xl pl-4 pr-10 py-3 text-sm font-bold text-secondary outline-none border-2 border-transparent focus:border-primary focus:bg-white transition-all placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={startListening}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${assistantState === 'listening' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-primary'}`}
                  >
                    <Mic size={20} />
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="p-3 bg-secondary text-white rounded-xl shadow-xl shadow-secondary/20 disabled:bg-gray-200 transition-all active:scale-95 group hover:bg-primary"
                >
                  <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
              <div className="mt-4 flex items-center justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <span>Powering your career journey</span>
                <span className="flex items-center gap-1"><Sparkles size={10} className="text-primary" /> Opulent AI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto mt-4 w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-[0_20px_50px_rgba(47,168,79,0.3)] flex items-center justify-center text-white relative group overflow-hidden border-4 border-white/20"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={32} strokeWidth={3} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <div className="relative">
                <MessageCircle size={32} strokeWidth={3} />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
