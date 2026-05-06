"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, X, Send, Mic, RotateCcw,
  MessageSquare, Loader2, Globe, ChevronRight
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
  faqCategories: {
    id: string;
    label: string;
    questions: { q: string; a: string }[];
  }[];
}

interface Lead {
  name: string;
  email: string;
  phone: string;
  language: string;
  source: string;
  createdAt: string;
}

const translations: Record<string, Translation> = {
  en: {
    header: "Aryan AI Assistant",
    replyTime: "Always Online",
    inputPlaceholder: "Ask about HCTPL services...",
    langPrompt: "Hello, I am Aryan. Please choose your preferred language from the menu to start our conversation.",
    introMessage: "Welcome to HCTPL, your partner for intelligent IT solutions. May I know your name so I can connect you with the right expert?",
    askEmail: (name: string) => `Nice to meet you, ${name}. Please share your business email so our team can follow up with the right specialist.`,
    askPhone: "Thank you. May I also have your phone number for faster follow-up? If you prefer, just type 'Skip'.",
    interactiveStart: "Thanks for sharing your details. I’ve captured your lead and our team will reach out shortly. How can I assist you today? You can select a topic below or ask for a recommendation.",
    ansDefault: "That’s a strong question. I can help with business strategy, team augmentation, AI automation, or digital transformation. What are you looking for?",
    errName: "Please enter a valid name.",
    errEmail: "Please enter a valid email address.",
    errPhone: "Please enter a valid 10-digit phone number or type 'Skip'.",
    faqCategories: [
      { id: 'company', label: '🏢 About HCTPL', questions: [
        { q: "What is HCTPL?", a: "HCTPL is an AI-powered ecosystem company specializing in IT services, recruitment, automation, and digital transformation. We are ISO 9001:2015 certified." },
        { q: "Where are you located?", a: "Our corporate headquarters are in India, and we serve clients across the USA, UK, Europe, and other global markets." },
        { q: "Is HCTPL certified?", a: "Yes, we are ISO 9001:2015 certified for quality management and deliver enterprise-grade solutions with compliance and governance built in." },
        { q: "What is your mission?", a: "Our mission is to empower businesses with cutting-edge AI solutions, reliable IT talent, and measurable growth through digital innovation." },
        { q: "What makes HCTPL different?", a: "We combine AI automation, industry expertise, and a flexible delivery model to help clients launch faster and scale more efficiently." }
      ]},
      { id: 'services', label: '💻 IT Services', questions: [
        { q: "What IT services do you offer?", a: "We provide end-to-end Web and Mobile App Development, Cloud Security, Intelligent Automation, and custom ERP systems designed to scale with your business." },
        { q: "Can I hire developers?", a: "Yes, you can hire pre-vetted developers and dedicated teams through our IT Marketplace with hourly, contract, and retained staffing models." },
        { q: "Do you offer Cloud Solutions?", a: "Yes, we deliver AWS, Azure, and Google Cloud infrastructure, migration, DevOps automation, and managed cloud operations." },
        { q: "How do you qualify leads?", a: "Our chatbot captures visitor details and business intent automatically, creating a qualified lead record that helps our sales team respond faster." },
        { q: "Can you support digital transformation?", a: "Absolutely — we help enterprises modernize applications, optimize workflows, and deliver AI-first customer experiences." }
      ]},
      { id: 'products', label: '🚀 AI Products', questions: [
        { q: "What is AI Recruiter?", a: "AI Recruiter automates candidate screening, technical interviews, and resume parsing so you can hire faster with less bias." },
        { q: "What is IT Marketplace?", a: "IT Marketplace is a curated platform for discovering and hiring pre-vetted developers and teams for short-term or long-term work." },
        { q: "Do you offer AI consulting?", a: "Yes, our AI consulting services include use case discovery, proof-of-concept execution, and enterprise AI roadmaps." }
      ]},
      { id: 'training', label: '🎓 Training & Internships', questions: [
        { q: "Do you offer internships?", a: "Yes, we offer industry-aligned internships in AI, Web Development, and Digital Marketing." },
        { q: "What are the courses?", a: "We provide professional training in modern tech stacks, leadership skills, and workplace-ready tools." },
        { q: "Can you upskill my team?", a: "We offer team upskilling programs tailored to enterprise needs, including AI, cloud, and cyber security pathways." }
      ]},
      { id: 'careers', label: '💼 Careers', questions: [
        { q: "Are you hiring?", a: "We are always looking for talent! Check our careers page or send your CV to hr@hctpl.com." },
        { q: "How can I partner with HCTPL for hiring?", a: "You can partner with us for talent acquisition, contract staffing, and managed recruitment services tailored to your hiring goals." }
      ]}
    ]
  },
  hi: {
    header: "आर्यन एआई सहायक",
    replyTime: "हमेशा ऑनलाइन",
    inputPlaceholder: "HCTPL सेवाओं के बारे में पूछें...",
    langPrompt: "नमस्ते, मैं आर्यन हूँ। कृपया बातचीत शुरू करने के लिए अपनी पसंदीदा भाषा चुनें।",
    introMessage: "HCTPL में आपका स्वागत है! हम एक अग्रणी सॉफ्टवेयर डेवलपमेंट और आईटी सॉल्यूशंस प्रदाता हैं। क्या मैं आपका नाम जान सकता हूँ?",
    askEmail: (name: string) => `आपसे मिलकर अच्छा लगा, ${name}! आपका ईमेल क्या है ताकि हम आपसे संपर्क कर सकें?`,
    askPhone: "बहुत बढ़िया! और आपका 10-अंकीय फ़ोन नंबर क्या है? (यह वैकल्पिक है, आप चाहें तो 'Skip' कह सकते हैं)।",
    interactiveStart: "विवरण के लिए धन्यवाद! अब मैं आपकी मदद के लिए पूरी तरह तैयार हूँ। HCTPL के बारे में कुछ भी पूछें या नीचे दी गई श्रेणी चुनें!",
    ansDefault: "यह एक अच्छा सवाल है! अधिक जानकारी के लिए, कृपया हमारे सेवा पृष्ठ पर जाएँ या हमारी टीम से contact@hctpl.com पर संपर्क करें।",
    errName: "कृपया एक मान्य नाम दर्ज करें।",
    errEmail: "कृपया एक मान्य ईमेल पता दर्ज करें।",
    errPhone: "कृपया 10-अंकीय फोन नंबर दर्ज करें या 'Skip' लिखें।",
    faqCategories: [
      { id: 'company', label: '🏢 HCTPL के बारे में', questions: [
        { q: "HCTPL क्या है?", a: "HCTPL एक एआई-संचालित कंपनी है जो आईटी सेवाओं, भर्ती और स्वचालन (Automation) में विशेषज्ञता रखती है। हम ISO 9001:2015 प्रमाणित हैं।" },
        { q: "आप कहाँ स्थित हैं?", a: "हमारा कॉर्पोरेट मुख्यालय भारत में है, और हम यूएसए, यूके और यूरोप में ग्राहकों की सेवा करते हैं।" },
        { q: "क्या HCTPL प्रमाणित है?", a: "हाँ, हम गुणवत्ता प्रबंधन के लिए ISO 9001:2015 प्रमाणित हैं।" },
        { q: "आपका मिशन क्या है?", a: "हमारा मिशन व्यवसायों को अत्याधुनिक एआई समाधानों और उच्च गुणवत्ता वाली आईटी प्रतिभा के साथ सशक्त बनाना है।" }
      ]},
      { id: 'services', label: '💻 आईटी सेवाएं', questions: [
        { q: "आप कौन सी आईटी सेवाएं देते हैं?", a: "हम वेब और ऐप डेवलपमेंट, क्लाउड सुरक्षा और कस्टम ईआरपी समाधान प्रदान करते हैं।" },
        { q: "क्या मैं डेवलपर्स को काम पर रख सकता हूँ?", a: "हाँ, आप हमारे आईटी मार्केटप्लेस के माध्यम से लचीली परियोजनाओं के लिए टीमों को नियुक्त कर सकते हैं।" },
        { q: "क्या आप क्लाउड समाधान प्रदान करते हैं?", a: "हाँ, हम AWS, Azure और Google क्लाउड इन्फ्रास्ट्रक्चर में विशेषज्ञ हैं।" }
      ]},
      { id: 'products', label: '🚀 एआई उत्पाद', questions: [
        { q: "एआई रिक्रूटर (AI Recruiter) क्या है?", a: "एआई रिक्रूटर उम्मीदवारों की स्क्रीनिंग, तकनीकी साक्षात्कार और रिज्यूमे पार्सिंग को स्वचालित करता है।" },
        { q: "आईटी मार्केटप्लेस (IT Marketplace) क्या है?", a: "यह डेवलपर्स और टीमों को खोजने और नियुक्त करने का एक मंच है।" }
      ]},
      { id: 'training', label: '🎓 प्रशिक्षण और इंटर्नशिप', questions: [
        { q: "क्या आप इंटर्नशिप प्रदान करते हैं?", a: "हाँ, हम एआई, वेब डेवलपमेंट और डिजिटल मार्केटिंग में उद्योग-आधारित इंटर्नशिप प्रदान करते हैं।" },
        { q: "कौन से कोर्स उपलब्ध हैं?", a: "हम आधुनिक तकनीकी और कॉर्पोरेट कौशल में पेशेवर प्रशिक्षण प्रदान करते हैं।" }
      ]},
      { id: 'careers', label: '💼 करियर', questions: [
        { q: "क्या आप भर्तियाँ कर रहे हैं?", a: "हम हमेशा प्रतिभा की तलाश में रहते हैं! हमारे करियर पेज को देखें या अपना सीवी hr@hctpl.com पर भेजें।" }
      ]}
    ]
  },
  es: {
    header: "Asistente Aryan AI",
    replyTime: "Siempre en línea",
    inputPlaceholder: "Pregunta sobre HCTPL...",
    langPrompt: "Hola, soy Aryan. Elige tu idioma para comenzar.",
    introMessage: "¡Bienvenido! ¿Cómo te llamas?",
    askEmail: (name: string) => `¡Gusto en conocerte, ${name}! ¿Cuál es tu correo?`,
    askPhone: "¿Cuál es tu teléfono?",
    interactiveStart: "¡Gracias! Puedes preguntarme lo que quieras sobre HCTPL.",
    ansDefault: "¡Buena pregunta!",
    errName: "Nombre inválido.",
    errEmail: "Email inválido.",
    errPhone: "Teléfono inválido.",
    faqCategories: [{ id: 'company', label: '🏢 Sobre HCTPL', questions: [{ q: "¿Qué es HCTPL?", a: "HCTPL es una empresa líder en desarrollo de software e IA." }] }]
  },
  fr: {
    header: "Assistant Aryan AI",
    replyTime: "En ligne",
    inputPlaceholder: "Posez une question...",
    langPrompt: "Bonjour, je suis Aryan. Choisissez votre langue.",
    introMessage: "Bienvenue! Quel est votre nom?",
    askEmail: (name: string) => `Ravi de vous rencontrer, ${name}! Votre email?`,
    askPhone: "Votre numéro?",
    interactiveStart: "Merci! Je suis prêt.",
    ansDefault: "C'est une bonne question!",
    errName: "Nom invalide.",
    errEmail: "Email invalide.",
    errPhone: "Numéro invalide.",
    faqCategories: [{ id: 'company', label: '🏢 HCTPL', questions: [{ q: "C'est quoi HCTPL?", a: "HCTPL est une entreprise d'IA et d'IT." }] }]
  },
  de: {
    header: "Aryan KI-Assistent",
    replyTime: "Online",
    inputPlaceholder: "Fragen Sie etwas...",
    langPrompt: "Hallo, ich bin Aryan. Wählen Sie eine Sprache.",
    introMessage: "Willkommen! Wie heißen Sie?",
    askEmail: (name: string) => `Freut mich, ${name}! Ihre E-Mail?`,
    askPhone: "Ihre Nummer?",
    interactiveStart: "Danke! Ich bin bereit.",
    ansDefault: "Gute Frage!",
    errName: "Ungültiger Name.",
    errEmail: "Ungültige E-Mail.",
    errPhone: "Ungültige Nummer.",
    faqCategories: [{ id: 'company', label: '🏢 Über HCTPL', questions: [{ q: "Was ist HCTPL?", a: "HCTPL ist ein IT-Unternehmen." }] }]
  }
};

const languagesList = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'zh', label: '中文', flag: '🇨🇳' }
];

const suggestedQuestions = [
  "What are you looking for today?",
  "I want to hire developers for a specific project.",
  "Help me understand your AI automation services.",
  "Can you support our digital transformation roadmap?",
  "How can HCTPL reduce our IT operating costs?"
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(true);
  const [language, setLanguage] = useState('en');
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai'; text: string; timestamp: string }[]>([]);
  const [chatStep, setChatStep] = useState<ChatStep>('CHOOSE_LANG');
  const [isTyping, setIsTyping] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [assistantState, setAssistantState] = useState<AssistantState>('idle');
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [pendingInitialSpeak, setPendingInitialSpeak] = useState(false);
  const [speechPromptVisible, setSpeechPromptVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [leadCreated, setLeadCreated] = useState(false);
  const [leadSaving, setLeadSaving] = useState(false);
  const [leadSaveError, setLeadSaveError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pendingInitialSpeakRef = useRef(false);
  const initialGreetingRequestedRef = useRef(false);
  const t = translations[language] || translations.en;
  const hasStartedRef = useRef(false);
  const audioSpokenRef = useRef(false);
  const initialGreetingAttemptsRef = useRef(0);

  const getTimestamp = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const speak = async (text: string, langOverride?: string) => {
    if (typeof window === 'undefined') return;
    const currentLang = langOverride || language;
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLang;
    
    const voices = window.speechSynthesis.getVoices();
    const maleVoice = voices.find(v => {
      const vName = v.name.toLowerCase();
      const vLang = v.lang.toLowerCase();
      const isTargetLang = vLang.includes(currentLang.toLowerCase());
      return isTargetLang && (
        vName.includes('male') || vName.includes('david') || vName.includes('mark') || 
        vName.includes('ravi') || vName.includes('stefan') || vName.includes('pablo') ||
        vName.includes('ichiro') || vName.includes('kangkang') || vName.includes('hemant')
      );
    }) || voices.find(v => v.lang.toLowerCase().includes(currentLang.toLowerCase()) && v.name.toLowerCase().includes('male'))
       || voices.find(v => v.lang.toLowerCase().includes(currentLang.toLowerCase()));

    if (maleVoice) utterance.voice = maleVoice;
    utterance.pitch = 0.9;
    utterance.onstart = () => {
      setAssistantState('speaking');
      audioSpokenRef.current = true;
      setPendingInitialSpeak(false);
      pendingInitialSpeakRef.current = false;
      setSpeechPromptVisible(false);
    };
    utterance.onend = () => {
      setAssistantState('idle');
      if (isVoiceMode) setTimeout(startListening, 500);
    };
    window.speechSynthesis.speak(utterance);
  };

  const simulateAiResponse = (text: string, nextStep?: ChatStep, langOverride?: string) => {
    setIsTyping(true);
    setAssistantState('thinking');
    setTimeout(() => {
      setChatHistory(prev => [...prev, { role: 'ai', text, timestamp: getTimestamp() }]);
      setIsTyping(false);
      if (nextStep) setChatStep(nextStep);
      speak(text, langOverride);
    }, 800);
  };

  const openWhatsApp = () => {
    const whatsappNumber = "911234567890";
    const text = `Hi HCTPL Team, I am ${userName}. I was chatting with Aryan and would like to discuss my requirements further.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const openChatWidget = () => {
    setIsOpen(true);
    setPendingInitialSpeak(true);
    pendingInitialSpeakRef.current = true;
    setSpeechPromptVisible(true);
    initialGreetingRequestedRef.current = false;
    speak(t.langPrompt);
  };

  const triggerInitialSpeech = () => {
    if (pendingInitialSpeakRef.current && !initialGreetingRequestedRef.current) {
      initialGreetingRequestedRef.current = true;
      initialGreetingAttemptsRef.current = 2;
      speak(t.langPrompt);
      setSpeechPromptVisible(false);
    }
  };

  const startListening = () => {
    type SpeechRecognitionConstructor = any;
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.onstart = () => setAssistantState('listening');
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (transcript) handleSend(true, transcript);
    };
    recognition.onend = () => setAssistantState('idle');
    recognition.start();
  };

  useEffect(() => {
    const mountTimer = window.setTimeout(() => setMounted(true), 0);
    
    // Only auto-open on the very first load of the session
    const hasAlreadyOpened = sessionStorage.getItem('hctpl_chat_opened');
    if (!hasAlreadyOpened) {
      setTimeout(() => openChatWidget(), 0);
      sessionStorage.setItem('hctpl_chat_opened', 'true');
      
      // Force open repeatedly for 2 seconds only on first visit
      const forceOpen = setInterval(() => setIsOpen(true), 200);
      setTimeout(() => clearInterval(forceOpen), 2000);
    } else {
      // If already opened once in session, start closed
      window.requestAnimationFrame(() => setIsOpen(false));
    }

    const loadVoices = () => window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    loadVoices();

    const handleFirstInteraction = () => {
      setHasInteracted(true);
      if (pendingInitialSpeakRef.current && !audioSpokenRef.current) {
        triggerInitialSpeech();
      }
    };

    window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });

    if (!hasStartedRef.current) {
      setChatHistory([{ role: 'ai', text: t.langPrompt, timestamp: getTimestamp() }]);
      hasStartedRef.current = true;
    }

    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      window.clearTimeout(mountTimer);
    };
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isVoiceMode && isOpen) {
      startListening();
    }
  }, [isVoiceMode, isOpen]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!pendingInitialSpeak || !hasInteracted || audioSpokenRef.current || initialGreetingAttemptsRef.current > 1 || initialGreetingRequestedRef.current) return;
    initialGreetingAttemptsRef.current += 1;
    speak(t.langPrompt);
  }, [pendingInitialSpeak, hasInteracted, language]);

  useEffect(() => {
    if (videoRef.current) {
      if (assistantState === 'speaking' || assistantState === 'listening') {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [assistantState]);

  const handleSend = (isButton = false, buttonText = "", langCode?: string) => {
    const msgToSend = isButton ? buttonText : message;
    if (!msgToSend.trim()) return;

    if (langCode) setLanguage(langCode);
    const activeT = langCode ? (translations[langCode] || translations.en) : t;

    setChatHistory(prev => [...prev, { role: 'user', text: msgToSend, timestamp: getTimestamp() }]);
    if (!isButton) setMessage("");

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
      const phoneValue = msgToSend.toLowerCase().includes('skip') ? "Not provided" : msgToSend;
      const leadPayload = buildLeadPayload(phoneValue);
      createLead(leadPayload);
      simulateAiResponse(`${activeT.interactiveStart} I have captured your contact details and created a lead for our team.`, 'INTERACTIVE');
    } else {
      const lowerMsg = msgToSend.toLowerCase();
      if (lowerMsg.includes('thank') || lowerMsg.includes('shukriya') || lowerMsg.includes('dhanyawad')) {
        simulateAiResponse("Thank you for contacting! Feel free to contact us through our contact form.");
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      if (typeof window !== 'undefined') {
        const customK = JSON.parse(localStorage.getItem("hctpl_knowledge") || "[]") as { q: string; a: string }[];
        const kMatch = customK.find((k) => lowerMsg.includes(k.q.toLowerCase()));
        if (kMatch) {
          simulateAiResponse(kMatch.a);
          return;
        }
      }
      const allQuestions = activeT.faqCategories.flatMap(cat => cat.questions);
      const match = allQuestions.find(f => lowerMsg.includes(f.q.toLowerCase()));
      simulateAiResponse(match ? match.a : activeT.ansDefault);
    }
  };

  const createLead = async (lead: Lead) => {
    setLeadSaving(true);
    setLeadSaveError(null);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
      });

      const data = await response.json();
      const success = response.ok && data?.success;

      if (!success) {
        throw new Error(data?.message || 'Failed to save lead');
      }

      setLeadCreated(true);
      return true;
    } catch (error) {
      console.error('Lead save error:', error);
      setLeadSaveError('Could not save lead right now. Your details are still captured locally.');
      return false;
    } finally {
      setLeadSaving(false);
    }
  };

  const buildLeadPayload = (phoneValue: string) => ({
    name: userName,
    email: userEmail,
    phone: phoneValue,
    language,
    source: 'Chatbot',
    createdAt: new Date().toISOString()
  });

  const resetChat = () => {
    setChatHistory([]);
    setChatStep('CHOOSE_LANG');
    setUserName("");
    setUserEmail("");
    setAssistantState('idle');
    setLeadCreated(false);
    setLeadSaveError(null);
    window.speechSynthesis.cancel();
    simulateAiResponse(translations[language].langPrompt);
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end max-sm:bottom-2 max-sm:right-2">
      <AnimatePresence initial={false}>
        {isOpen && (
          <div className="flex items-end gap-4 mb-4 max-sm:flex-col-reverse max-sm:items-center max-sm:gap-0 max-sm:mb-2 max-sm:relative">
            {/* 1. Avatar (Left on Desktop, Top on Mobile) */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -50 }} 
              className="flex flex-col items-center max-sm:absolute max-sm:-top-20 max-sm:left-1/2 max-sm:-translate-x-1/2 z-[10001]"
            >
              <div className="relative group">
                <div className="w-56 h-56 max-sm:w-24 max-sm:h-24 rounded-full border-4 border-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden bg-slate-900 relative transition-all duration-500 hover:scale-105">
                  <video ref={videoRef} src="/images/Untitled design.mp4" loop muted playsInline className={`w-full h-full object-cover transition-opacity duration-700 ${assistantState === 'idle' ? 'opacity-40 grayscale' : 'opacity-100'}`} />
                  <AnimatePresence>
                    {assistantState === 'speaking' && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 border-4 border-emerald-500 rounded-full animate-pulse shadow-[0_0_30px_rgba(16,185,129,0.4)]" />}
                    {assistantState === 'listening' && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 border-4 border-red-500 rounded-full animate-ping" />}
                  </AnimatePresence>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-[12px] font-black border-2 border-white uppercase tracking-[0.2em] shadow-2xl max-sm:text-[8px] max-sm:px-2 max-sm:py-0.5 whitespace-nowrap">Aryan AI</div>
              </div>
            </motion.div>

            {/* 2. Chat Window (Right on Desktop, Bottom on Mobile) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 20 }} 
              className="flex flex-col bg-white shadow-2xl border border-slate-200 overflow-hidden relative h-[600px] w-[420px] max-sm:h-[50vh] max-sm:w-[calc(100vw-40px)] rounded-[32px] max-sm:rounded-[20px]"
            >
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-black shadow-lg">A</div>
                  <div><h3 className="font-bold text-slate-800 text-sm">Aryan AI</h3><span className="text-[10px] text-green-500">● Online</span></div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => setShowLanguageMenu(!showLanguageMenu)} className="p-2 hover:bg-slate-100 rounded-full text-xs font-bold text-black flex items-center gap-1"><Globe size={16} /> {language.toUpperCase()}</button>
                  <button onClick={() => setIsVoiceMode(!isVoiceMode)} className={`p-2 rounded-full ${isVoiceMode ? 'bg-emerald-500 text-white' : 'text-slate-500 hover:bg-slate-100'}`}><Mic size={18} /></button>
                  <button onClick={resetChat} className="p-2 text-slate-400 hover:text-emerald-500 transition-colors" title="Reset Chat"><RotateCcw size={18} /></button>
                  <button onClick={() => { setIsOpen(false); window.speechSynthesis.cancel(); }} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><X size={18} /></button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50 space-y-4 custom-scrollbar">
                {speechPromptVisible && (
                  <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-slate-700 shadow-sm mb-2">
                    <p className="font-semibold">Tap to hear Aryan</p>
                    <p className="text-[11px] text-slate-500">Browser audio may be blocked until you interact with the page.</p>
                    <button onClick={triggerInitialSpeech} className="mt-3 inline-flex items-center justify-center rounded-full bg-emerald-500 px-3 py-2 text-white text-[11px] font-bold hover:bg-emerald-600 transition-all">Play Greeting</button>
                  </div>
                )}
                {chatStep === 'CHOOSE_LANG' && chatHistory.length > 0 && chatHistory[chatHistory.length-1].role === 'ai' && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {languagesList.map(l => (
                      <button key={l.code} onClick={() => handleSend(true, l.label, l.code)} className="px-4 py-2 bg-white border-2 border-slate-100 rounded-full text-xs font-bold text-black hover:border-emerald-500 hover:bg-emerald-50 transition-all shadow-sm">{l.flag} {l.label}</button>
                    ))}
                  </div>
                )}
                {chatHistory.map((chat, idx) => (
                  <div key={idx} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-sm ${chat.role === 'user' ? 'bg-emerald-500 text-white rounded-tr-none' : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'}`}>{chat.text}</div>
                  </div>
                ))}

                {leadCreated && (
                  <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900 shadow-sm mb-2">
                    Great! Your lead has been created and our team will follow up soon.
                  </div>
                )}
                {leadSaveError && (
                  <div className="rounded-3xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-900 shadow-sm mb-2">
                    {leadSaveError}
                  </div>
                )}
                {leadSaving && (
                  <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900 shadow-sm mb-2">
                    Saving your lead details now... Please wait.
                  </div>
                )}
                {chatStep === 'INTERACTIVE' && (
                  <div className="space-y-4 pt-2">
                    <div className="bg-slate-100 border border-slate-200 rounded-3xl p-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Not sure where to start?</p>
                      <div className="grid gap-2">
                        {suggestedQuestions.map((q, qIdx) => (
                          <button
                            key={qIdx}
                            onClick={() => handleSend(true, q)}
                            className="w-full text-left px-4 py-3 bg-white border border-slate-200 rounded-2xl text-[12px] font-semibold text-slate-700 hover:border-emerald-500 hover:bg-emerald-50 transition-all shadow-sm"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                    {!selectedCategory ? (
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Knowledge Base Categories</p>
                        <div className="grid grid-cols-1 gap-2">
                          {t.faqCategories.map(cat => (
                            <button 
                              key={cat.id} 
                              onClick={() => {
                                setSelectedCategory(cat.id);
                                setChatHistory(prev => [...prev, { role: 'ai', text: `You are viewing: ${cat.label}. How can I help you with this?`, timestamp: getTimestamp() }]);
                              }} 
                              className="w-full text-left px-4 py-3 bg-white border border-slate-100 rounded-xl text-xs font-bold text-slate-700 hover:border-emerald-500 hover:bg-emerald-50 transition-all shadow-sm flex items-center justify-between group"
                            >
                              {cat.label}
                              <ChevronRight size={14} className="text-slate-300 group-hover:text-emerald-500" />
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between px-2">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Available Questions
                          </p>
                          <button 
                            onClick={() => setSelectedCategory(null)} 
                            className="text-[10px] font-bold text-emerald-500 hover:underline flex items-center gap-1"
                          >
                            <RotateCcw size={10} /> Back to Categories
                          </button>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {t.faqCategories.find(c => c.id === selectedCategory)?.questions.map((q, qIdx) => (
                            <button 
                              key={qIdx} 
                              onClick={() => handleSend(true, q.q)} 
                              className="w-full text-left px-4 py-2.5 bg-white border border-slate-100 rounded-xl text-[11px] font-semibold text-slate-600 hover:border-emerald-500 hover:bg-emerald-50 transition-all shadow-sm"
                            >
                              {q.q}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-100">
                      <button 
                        onClick={openWhatsApp}
                        className="w-full flex items-center justify-center gap-2 p-3 bg-green-500 text-white rounded-2xl text-xs font-bold hover:bg-green-600 transition-all shadow-md active:scale-95"
                      >
                        <MessageSquare size={16} /> Instant WhatsApp Connect
                      </button>
                    </div>
                  </div>
                )}
                {isTyping && <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium px-2"><Loader2 size={10} className="animate-spin" /> Aryan is thinking...</div>}
                {assistantState === 'listening' && <div className="flex items-center gap-2 text-[10px] text-red-500 font-bold px-2 animate-pulse"><div className="w-2 h-2 bg-red-500 rounded-full" /> Aryan is listening...</div>}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 bg-white border-t border-slate-100">
                <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                  <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder={t.inputPlaceholder} className="flex-1 bg-slate-100 rounded-full px-5 py-2.5 text-sm outline-none border border-transparent focus:border-emerald-300 focus:bg-white transition-all text-black font-medium" />
                  <button type="submit" disabled={!message.trim()} className="p-3 bg-emerald-500 text-white rounded-full shadow-lg disabled:bg-slate-200 transition-all active:scale-95"><Send size={18} /></button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => {
          const nextState = !isOpen;
          if (nextState) {
            openChatWidget();
          } else {
            setIsOpen(false);
            // Stop talking when closed
            window.speechSynthesis.cancel();
          }
        }} 
        className="w-14 h-14 max-sm:w-12 max-sm:h-12 bg-emerald-500 rounded-full shadow-2xl flex items-center justify-center text-white mt-4 hover:scale-105 transition-all active:scale-95"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      <AnimatePresence>
        {showLanguageMenu && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute bottom-20 right-0 bg-white border border-slate-100 shadow-2xl rounded-xl z-50 overflow-hidden w-40">
            {languagesList.map(l => (
              <button key={l.code} onClick={() => { setLanguage(l.code); setShowLanguageMenu(false); resetChat(); }} className="w-full px-4 py-2 text-left text-xs hover:bg-emerald-50 flex items-center gap-3 text-black font-semibold">
                <span>{l.flag}</span> {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
