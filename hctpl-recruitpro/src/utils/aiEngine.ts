// Change this to your ngrok URL (e.g., https://xyz.ngrok-free.app) when testing on mobile
const AI_ENGINE_URL = "http://localhost:8000";

export const analyzeCandidates = async (jd: string, candidates: any[]) => {
  try {
    const response = await fetch(`${AI_ENGINE_URL}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        job_description: jd,
        candidates: candidates.map(c => ({
          id: c.id,
          text: c.notes || c.summary || c.name, // Use notes/summary as "resume text" for simulation
          experience_years: parseFloat(c.experience),
          skills_count: c.matchScore / 10, // Simulated skill count
          availability_status: c.availability === "Immediate" ? 1 : 0
        }))
      })
    });

    if (!response.ok) throw new Error("AI Engine offline");
    return await response.json();
  } catch (error) {
    console.error("AI Engine error:", error);
    return null;
  }
};

export const trainAIModel = async () => {
  try {
    const response = await fetch(`${AI_ENGINE_URL}/train`, { method: "POST" });
    return await response.json();
  } catch (error) {
    return null;
  }
};

export const initiateRealCall = async (phoneNumber: string) => {
  try {
    const response = await fetch(`${AI_ENGINE_URL}/voice/initiate-call?phone_number=${encodeURIComponent(phoneNumber)}`, {
      method: "POST"
    });
    return await response.json();
  } catch (error) {
    console.error("Real Call error:", error);
    return null;
  }
};
