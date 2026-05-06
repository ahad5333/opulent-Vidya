"use client";

import { useState, useEffect } from "react";
import { 
  Mic, PhoneOff, Volume2, 
  ShieldCheck, Cpu, User,
  Sparkles, CheckCircle2
} from "lucide-react";
import { voiceAssistant } from "@/utils/voiceAssistant";
import { mockCandidates } from "@/utils/candidateData";
import { analyzeCandidates } from "@/utils/aiEngine";
import { useParams, useRouter } from "next/navigation";

export default function InterviewRoom() {
  const { id } = useParams();
  const router = useRouter();
  const candidate = mockCandidates.find(c => c.id === id) || mockCandidates[0];

  const [status, setStatus] = useState<"ready" | "active" | "completed" | "error">("ready");
  const [errorMessage, setErrorMessage] = useState("");
  const [logs, setLogs] = useState<{ type: "ai" | "user", text: string }[]>([]);

  const startInterview = async () => {
    setStatus("active");
    setErrorMessage("");
    
    const askAndListen = async (question: string, retryCount = 0): Promise<string> => {
      try {
        setLogs(prev => [...prev, { type: "ai", text: question }]);
        await voiceAssistant.speak(question);
        
        const transcript = await voiceAssistant.listen();
        setLogs(prev => [...prev, { type: "user", text: transcript }]);
        return transcript;
      } catch (err: any) {
        if (err === "no-speech" && retryCount < 1) {
          return await askAndListen("I'm sorry, I didn't catch that. Could you please repeat your answer?", retryCount + 1);
        }
        throw err;
      }
    };

    try {
      await askAndListen(`Hello ${candidate.name}, welcome to your RecruitPro AI interview. To start, could you please introduce yourself?`);
      await askAndListen("Excellent. Now, tell me about your experience with AI and recruitment technology?");
      
      const closing = "Thank you! I've recorded your responses. Have a great day!";
      setLogs(prev => [...prev, { type: "ai", text: closing }]);
      await voiceAssistant.speak(closing);
      
      try {
        const fullTranscript = logs.map(l => l.text).join(" ");
        await analyzeCandidates("Interview Session Analysis", [{ ...candidate, notes: fullTranscript }]);
      } catch (e) {
        console.warn("Backend sync failed", e);
      }
      
      setStatus("completed");
    } catch (err: any) {
      console.error("Interview Error:", err);
      setErrorMessage(err.toString() || "An unknown error occurred.");
      setStatus("error");
    }
  };

  return (
    <div style={{ minHeight: '100-vh', backgroundColor: '#0f172a', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '900', textTransform: 'uppercase', fontStyle: 'italic' }}>
          Recruit<span style={{ color: '#3b82f6' }}>Pro</span>
        </h1>
        <p style={{ fontSize: '10px', color: '#94a3b8', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Secure AI Interview Room</p>
      </div>

      <div style={{ width: '100%', maxWidth: '500px' }}>
        
        {status === "ready" && (
          <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '40px', borderRadius: '32px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ width: '80px', height: '80px', backgroundColor: '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <User size={40} color="white" />
            </div>
            <p style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '12px', marginBottom: '8px' }}>INCOMING AI CALL</p>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Interview for {candidate.role}</h2>
            <button 
              onClick={startInterview}
              style={{ width: '80px', height: '80px', backgroundColor: '#22c55e', borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}
            >
              <Mic size={32} color="white" />
            </button>
            <p style={{ marginTop: '16px', fontSize: '12px', color: '#64748b' }}>Tap to Accept</p>
          </div>
        )}

        {status === "active" && (
          <div style={{ textAlign: 'center', spaceY: '32px' }}>
            <div style={{ width: '150px', height: '150px', backgroundColor: 'rgba(59,130,246,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
              <Cpu size={48} color="#3b82f6" />
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>AI is listening...</h2>
            
            <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '16px', marginTop: '32px', textAlign: 'left', height: '150px', overflowY: 'auto' }}>
              {logs.slice(-2).map((log, i) => (
                <p key={i} style={{ fontSize: '14px', marginBottom: '8px', color: log.type === 'ai' ? '#3b82f6' : 'white' }}>
                  <strong>{log.type === 'ai' ? 'AI: ' : 'You: '}</strong> {log.text}
                </p>
              ))}
            </div>

            <button 
              onClick={() => { voiceAssistant.stop(); setStatus("completed"); }}
              style={{ marginTop: '32px', width: '60px', height: '60px', backgroundColor: 'rgba(239,68,68,0.2)', border: '1px solid #ef4444', borderRadius: '50%', color: '#ef4444', cursor: 'pointer' }}
            >
              <PhoneOff size={24} />
            </button>
          </div>
        )}

        {status === "error" && (
          <div style={{ backgroundColor: 'rgba(239,68,68,0.05)', padding: '40px', borderRadius: '32px', textAlign: 'center', border: '1px solid rgba(239,68,68,0.2)' }}>
            <h2 style={{ color: '#ef4444', marginBottom: '16px' }}>Call Failed</h2>
            <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '16px' }}>{errorMessage}</p>
            <button onClick={startInterview} style={{ padding: '12px 24px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold' }}>Retry</button>
          </div>
        )}

        {status === "completed" && (
          <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '40px', borderRadius: '32px', textAlign: 'center' }}>
            <CheckCircle2 size={48} color="#22c55e" style={{ marginBottom: '16px' }} />
            <h2>Interview Finished</h2>
            <button onClick={() => router.push("/")} style={{ marginTop: '24px', color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer' }}>Back to Home</button>
          </div>
        )}

      </div>
    </div>
  );
}
