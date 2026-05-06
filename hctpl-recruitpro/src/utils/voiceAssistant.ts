"use client";

export class VoiceAssistant {
  private synthesis: SpeechSynthesis | null = null;
  private recognition: any = null;
  private isSpeaking: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.synthesis = window.speechSynthesis;
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';
      }
    }
  }

  public speak(text: string): Promise<void> {
    return new Promise((resolve) => {
      if (!this.synthesis) return resolve();
      
      this.synthesis.cancel(); // Stop any current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      
      utterance.onend = () => {
        this.isSpeaking = false;
        resolve();
      };

      this.isSpeaking = true;
      this.synthesis.speak(utterance);
    });
  }

  public listen(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.recognition) return reject("Speech recognition not supported");

      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        resolve(transcript);
      };

      this.recognition.onerror = (event: any) => {
        this.recognition.stop();
        reject(event.error);
      };

      try {
        this.recognition.start();
      } catch (e) {
        // Recognition might already be started
        console.warn("Recognition start failed:", e);
      }
    });
  }

  public stop() {
    if (this.synthesis) this.synthesis.cancel();
    if (this.recognition) this.recognition.stop();
  }
}

export const voiceAssistant = new VoiceAssistant();
