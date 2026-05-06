"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, MessageSquare, Mic, 
  Send, FileText, CheckCircle2,
  Cpu, Clock, User, Filter,
  Mail, ChevronRight, Search,
  ArrowUpDown, Users, Phone,
  PhoneOff, MicOff, Volume2, X,
  Link as LinkIcon, Copy, ExternalLink
} from "lucide-react";
import Link from "next/link";
import AgentStatus from "@/components/AgentStatus";
import { mockCandidates, Candidate } from "@/utils/candidateData";
import { analyzeCandidates, initiateRealCall } from "@/utils/aiEngine";
import { voiceAssistant } from "@/utils/voiceAssistant";

export default function RecruiterPage() {
  const [activeTab, setActiveTab] = useState<"queue" | "active" | "log">("queue");
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isSorting, setIsSorting] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [callStatus, setCallStatus] = useState<"connecting" | "active" | "ended">("connecting");
  const [currentTranscription, setCurrentTranscription] = useState("");
  const [callLogs, setCallLogs] = useState<string[]>([]);
  const [callMode, setCallMode] = useState<"demo" | "real">("demo");

  // Filter candidates who are in "Screening" status
  const queue = candidates.filter(c => c.status === "Screening");

  const handleSortByProfile = async () => {
    setIsSorting(true);
    
    // Call Python AI Engine
    const jd = "Senior Frontend Architect with React/Next.js and 5+ years experience";
    const result = await analyzeCandidates(jd, candidates);
    
    if (result && result.results) {
      const updated = candidates.map(c => {
        const aiMatch = result.results.find((r: any) => r.candidate_id === c.id);
        if (aiMatch) {
          return { ...c, matchScore: aiMatch.match_score, score: aiMatch.final_score };
        }
        return c;
      });
      
      const sorted = [...updated].sort((a, b) => b.score - a.score);
      setCandidates(sorted);
    } else {
      // Fallback if AI Engine is offline
      const sorted = [...candidates].sort((a, b) => b.matchScore - a.matchScore);
      setCandidates(sorted);
    }
    
    setIsSorting(false);
  };

  const startScreening = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setActiveTab("active");
  };

  const handlePromoteToTech = (candidate: Candidate) => {
    const updated = candidates.map(c => 
      c.id === candidate.id ? { ...c, status: "Waiting for 2nd Round" as const, emailSent: true } : c
    );
    setCandidates(updated);
    if (selectedCandidate?.id === candidate.id) {
       setSelectedCandidate({ ...candidate, status: "Waiting for 2nd Round" as const, emailSent: true });
    }
  };

  const mockChat = [
    { type: "ai", text: `Hello ${selectedCandidate?.name || "Candidate"}! I'm RecruitPro AI. To start, could you introduce yourself and tell me about your availability?` },
    { type: "user", text: `Hi! I'm a developer with ${selectedCandidate?.experience || "some"} experience. I'm available ${selectedCandidate?.availability || "soon"}.` },
    { type: "ai", text: "Great. I see you've applied for the " + (selectedCandidate?.role || "position") + ". What's your expected salary range?" },
    { type: "user", text: "I'm looking for a competitive package in line with my experience." },
    { type: "ai", text: "Noted. I'll summarize our conversation and give you a score shortly." },
  ];

  const handleVoiceCall = async (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsCalling(true);
    setCallStatus("connecting");
    setCallLogs([]);
    
    const askAndListen = async (question: string, retryCount = 0): Promise<string> => {
      setCallLogs(prev => [...prev, `AI: ${question}`]);
      await voiceAssistant.speak(question);
      
      try {
        const transcript = await voiceAssistant.listen();
        setCallLogs(prev => [...prev, `You: ${transcript}`]);
        return transcript;
      } catch (err) {
        if (err === "no-speech" && retryCount < 1) {
          return await askAndListen("I'm sorry, I didn't catch that. Could you please repeat your answer?", retryCount + 1);
        }
        throw err;
      }
    };

    // Simulate connection
    setTimeout(async () => {
      setCallStatus("active");
      
      try {
        // AI Introduction & Question 1
        await askAndListen(`Hello ${candidate.name}, this is the RecruitPro AI Assistant calling. I've reviewed your profile for the ${candidate.role} position. To start, can you briefly introduce yourself and tell me about your availability?`);
        
        // Question 2
        await askAndListen("Thank you. I've noted that. What would you say is your biggest technical achievement in your recent role?");
        
        // Closing
        const closing = "Excellent. I have recorded your responses and will share the summary with our team. We will get back to you soon. Goodbye!";
        setCallLogs(prev => [...prev, `AI: ${closing}`]);
        await voiceAssistant.speak(closing);
        
        setCallStatus("ended");
        setTimeout(() => setIsCalling(false), 2000);
      } catch (err) {
        console.error("Voice Error:", err);
        setCallLogs(prev => [...prev, `System: Call ended due to ${err}`]);
        setCallStatus("ended");
        setTimeout(() => setIsCalling(false), 3000);
      }
    }, 2000);
  };

  const handleRealMobileCall = async (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsCalling(true);
    setCallStatus("connecting");
    setCallLogs(["Requesting Twilio to initiate physical call..."]);
    
    const result = await initiateRealCall(candidate.phone);
    if (result && result.status === "initiated") {
      setCallLogs(prev => [...prev, "Twilio: Call connected to mobile network.", "Note: The AI script is now running on your phone."]);
      setCallStatus("active");
      // Physical calls handle their own audio, so we don't use voiceAssistant.speak here
    } else {
      setCallLogs(prev => [...prev, "Error: Could not connect to Twilio. Check your credentials and ngrok URL."]);
      setCallStatus("ended");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* HEADER */}
      <header className="bg-white border-b border-slate-100 p-4 md:p-8 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 md:gap-6">
            <Link href="/dashboard" className="p-2 md:p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-brand-blue hover:bg-blue-50 transition-all">
              <ArrowLeft size={18} />
            </Link>
            <div>
              <div className="flex items-center gap-2 md:gap-3">
                <h1 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tighter">AI Recruiter</h1>
                <AgentStatus status="active" />
              </div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Screening Instance #042</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <div className="bg-slate-100 p-1 rounded-xl flex flex-grow md:flex-grow-0">
               <button 
                 onClick={() => setCallMode("demo")}
                 className={`flex-grow px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${callMode === "demo" ? "bg-white text-brand-blue shadow-sm" : "text-slate-400"}`}
               >
                 Demo
               </button>
               <button 
                 onClick={() => setCallMode("real")}
                 className={`flex-grow px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${callMode === "real" ? "bg-white text-brand-blue shadow-sm" : "text-slate-400"}`}
               >
                 Mobile
               </button>
            </div>
            <button 
               onClick={handleSortByProfile}
               disabled={isSorting}
               className="bg-white border border-slate-200 text-slate-600 px-4 md:px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-center gap-2 flex-grow md:flex-grow-0"
            >
              <ArrowUpDown size={14} /> {isSorting ? "..." : "Sort"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-8">
        
        {/* TABS */}
        <div className="flex gap-4 md:gap-8 border-b border-slate-200 mb-8 overflow-x-auto no-scrollbar">
          {[
            { id: "queue", label: "Queue", icon: Users },
            { id: "active", label: "Active", icon: MessageSquare },
            { id: "log", label: "Logs", icon: FileText },
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all relative whitespace-nowrap ${activeTab === tab.id ? "text-brand-blue" : "text-slate-400 hover:text-slate-600"}`}
            >
              {tab.id === "active" && selectedCandidate && <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />}
              <tab.icon size={12} /> {tab.label}
              {activeTab === tab.id && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-brand-blue rounded-full" />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "queue" && (
            <motion.div 
              key="queue"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center px-2">
                 <h2 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tighter">Available Talent</h2>
                 <p className="text-[10px] font-bold text-slate-400">{queue.length} Pending</p>
              </div>
              
              <div className="grid gap-4">
                {candidates.filter(c => c.status === "Screening" || c.status === "Waiting for 2nd Round").map((c) => (
                  <motion.div 
                    key={c.id}
                    layout
                    className="bg-white p-4 md:p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-brand-blue/30 transition-all"
                  >
                    <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 flex-shrink-0">
                        {c.name.charAt(0)}
                      </div>
                      <div className="flex-grow">
                        <p className="font-bold text-slate-900 text-sm md:text-base">{c.name}</p>
                        <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{c.role} • {c.experience}</p>
                      </div>
                      <div className="md:hidden text-right">
                         <p className="text-[9px] font-black text-brand-blue uppercase">{c.matchScore}% Match</p>
                      </div>
                    </div>

                    <div className="hidden md:flex gap-12">
                       <div className="px-6 border-l border-slate-50">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Phone</p>
                          <p className="text-xs font-bold text-slate-700">{c.phone}</p>
                       </div>
                       <div className="px-6 border-l border-slate-50">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Match</p>
                          <p className="text-xs font-bold text-brand-blue">{c.matchScore}%</p>
                       </div>
                    </div>
                    
                    <div className="flex items-center justify-between w-full md:w-auto gap-3 pt-4 md:pt-0 border-t md:border-0 border-slate-50">
                      {c.status === "Waiting for 2nd Round" ? (
                        <div className="flex-grow md:flex-grow-0 flex items-center justify-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest border border-green-100">
                          <Mail size={12} /> Email Sent
                        </div>
                      ) : (
                        <div className="flex gap-2 flex-grow md:flex-grow-0">
                           <button 
                             onClick={() => {
                               const url = `${window.location.origin}/interview/${c.id}`;
                               navigator.clipboard.writeText(url);
                               alert("Interview Link Copied!");
                             }}
                             className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-brand-blue hover:bg-blue-50 transition-all flex items-center justify-center"
                             title="Copy Interview Link"
                           >
                             <LinkIcon size={16} />
                           </button>
                           <button 
                             onClick={() => callMode === "demo" ? handleVoiceCall(c) : handleRealMobileCall(c)}
                             className="flex-grow bg-brand-blue text-white px-4 md:px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                           >
                             <Phone size={14} /> {callMode === "demo" ? "Call" : "Real"}
                           </button>
                        </div>
                      )}
                      <button className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-slate-600 transition-all hidden md:block">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "active" && selectedCandidate && (
            <motion.div 
              key="active"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 space-y-8">
                <div className="glass-card rounded-[2.5rem] overflow-hidden flex flex-col h-[600px]">
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-brand-blue font-bold">
                        {selectedCandidate.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{selectedCandidate.name}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Applying for {selectedCandidate.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 rounded-full">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest">AI Calling...</span>
                    </div>
                  </div>

                  <div className="flex-grow overflow-y-auto p-8 space-y-6 bg-slate-50/30">
                    {mockChat.map((msg, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: msg.type === "ai" ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex ${msg.type === "ai" ? "justify-start" : "justify-end"}`}
                      >
                        <div className={`max-w-[80%] p-4 rounded-2xl font-medium text-sm leading-relaxed ${msg.type === "ai" ? "bg-white text-slate-900 shadow-sm rounded-tl-none border border-slate-100" : "bg-brand-blue text-white shadow-lg shadow-blue-500/10 rounded-tr-none"}`}>
                          {msg.text}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-6 bg-white border-t border-slate-100 flex items-center justify-between">
                     <p className="text-xs font-medium text-slate-400">Recording candidate response & transcribing...</p>
                     <div className="flex gap-2">
                        <button 
                          onClick={() => handlePromoteToTech(selectedCandidate)}
                          className="bg-brand-green text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-green-500/20"
                        >
                          End Call & Promote
                        </button>
                     </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="glass-card p-8 rounded-[2.5rem] bg-slate-900 text-white space-y-8">
                   <div className="flex items-center gap-3 border-b border-white/10 pb-6">
                      <Cpu className="text-brand-blue" />
                      <h3 className="text-lg font-black uppercase tracking-tighter">AI Analysis</h3>
                   </div>
                   
                   <div className="space-y-6">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Live Transcript Snippets</p>
                        <div className="bg-white/5 p-4 rounded-2xl text-[11px] text-slate-300 font-medium italic border border-white/5">
                          "I've worked with React for 5 years... currently looking for new opportunities... available immediately."
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                         <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase text-slate-500">Predicted Score</span>
                            <span className="text-xl font-black text-brand-blue">94%</span>
                         </div>
                         <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                           <motion.div initial={{ width: 0 }} animate={{ width: "94%" }} className="h-full bg-brand-blue" />
                         </div>
                      </div>
                   </div>

                   <div className="pt-4 space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Candidate Summary</p>
                      <p className="text-xs text-slate-300 leading-relaxed">
                         Candidate demonstrates clear communication and confirms immediate availability. Strong alignment with React leadership requirements.
                      </p>
                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "log" && (
             <motion.div 
               key="log"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden"
             >
                <table className="w-full text-left">
                   <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                         <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400">Candidate</th>
                         <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400">Introduction Summary</th>
                         <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400">Availability</th>
                         <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400">AI Score</th>
                         <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400">Status</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      {candidates.filter(c => c.score > 0).map(c => (
                        <tr key={c.id}>
                           <td className="px-8 py-5 font-bold text-slate-900">{c.name}</td>
                           <td className="px-8 py-5 text-xs text-slate-500 max-w-xs truncate">{c.summary}</td>
                           <td className="px-8 py-5 text-xs font-bold text-slate-700">{c.availability}</td>
                           <td className="px-8 py-5 font-black text-brand-blue">{c.score}%</td>
                           <td className="px-8 py-5">
                              <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[9px] font-black uppercase">
                                 {c.status}
                              </span>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </motion.div>
          )}
        </AnimatePresence>

        {/* VOICE CALL MODAL */}
        <AnimatePresence>
          {isCalling && selectedCandidate && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
                className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl" 
              />
              
              <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="relative w-full max-w-md bg-white rounded-[3rem] overflow-hidden shadow-4xl flex flex-col items-center p-12 text-center space-y-8"
              >
                <div className="space-y-2">
                   <p className="text-xs font-black uppercase tracking-[0.3em] text-brand-blue">
                     {callStatus === "connecting" ? "Connecting..." : callStatus === "active" ? "AI Call in Progress" : "Call Ended"}
                   </p>
                   <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                     {selectedCandidate.name}
                   </h2>
                   <p className="text-sm font-bold text-slate-400">{selectedCandidate.phone}</p>
                </div>

                <div className="relative w-48 h-48 flex items-center justify-center">
                   <motion.div 
                     animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                     transition={{ duration: 2, repeat: Infinity }}
                     className="absolute inset-0 bg-brand-blue rounded-full"
                   />
                   <div className="relative w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center shadow-inner">
                      {callStatus === "connecting" ? (
                        <Phone size={48} className="text-slate-400 animate-bounce" />
                      ) : (
                        <Volume2 size={48} className="text-brand-blue" />
                      )}
                   </div>
                </div>

                <div className="w-full bg-slate-50 rounded-2xl p-6 min-h-[120px] max-h-[200px] overflow-y-auto text-left space-y-3">
                   {callLogs.map((log, i) => (
                     <p key={i} className={`text-[11px] font-medium leading-relaxed ${log.startsWith("AI:") ? "text-brand-blue" : "text-slate-600"}`}>
                        {log}
                     </p>
                   ))}
                   {callStatus === "active" && !currentTranscription && (
                     <p className="text-[11px] font-black text-slate-300 animate-pulse uppercase tracking-widest">
                       Listening to your voice...
                     </p>
                   )}
                </div>

                <div className="flex gap-8">
                   <button 
                     onClick={() => {
                        voiceAssistant.stop();
                        setIsCalling(false);
                     }}
                     className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center shadow-xl shadow-red-500/20 hover:scale-110 active:scale-95 transition-all"
                   >
                     <PhoneOff size={24} />
                   </button>
                   <button className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center hover:bg-slate-200 transition-all">
                     <MicOff size={24} />
                   </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}
