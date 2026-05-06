from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from engine.matcher import engine
from engine.scorer import scorer
from twilio.rest import Client
from twilio.twiml.voice_response import VoiceResponse
import os

app = FastAPI(title="RecruitPro AI Engine")

class CandidateProfile(BaseModel):
    id: str
    text: str
    experience_years: float
    skills_count: int
    availability_status: int # 1 for immediate, 0 for notice

class AnalysisRequest(BaseModel):
    job_description: str
    candidates: List[CandidateProfile]

# Twilio Configuration (Replace with your credentials)
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID", "your_sid_here")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN", "your_token_here")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER", "your_twilio_number")
BASE_URL = os.getenv("BASE_URL", "https://your-ngrok-url.ngrok-free.app")

@app.get("/")
def read_root():
    return {"status": "online", "model": "RecruitPro-v1", "twilio_ready": TWILIO_ACCOUNT_SID != "your_sid_here"}

@app.post("/voice/initiate-call")
def initiate_call(phone_number: str):
    try:
        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        call = client.calls.create(
            url=f"{BASE_URL}/voice/twiml",
            to=phone_number,
            from_=TWILIO_PHONE_NUMBER
        )
        return {"call_sid": call.sid, "status": "initiated"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/voice/twiml")
def get_twiml():
    response = VoiceResponse()
    response.say("Hello! This is the RecruitPro AI Assistant. We are calling to verify your availability for the AI Recruitment Lead position.")
    response.say("Please tell us about your current status and when you can start.")
    
    # Gather speech input
    gather = response.gather(
        input='speech',
        action=f'{BASE_URL}/voice/completed',
        timeout=5,
        speech_timeout='auto'
    )
    
    return response.to_xml()

@app.post("/voice/completed")
def voice_completed(SpeechResult: str = None):
    # This is where we process the transcription from the real phone call
    print(f"Candidate Response: {SpeechResult}")
    response = VoiceResponse()
    response.say("Thank you for your response. We have recorded your availability. Our team will contact you soon. Goodbye!")
    return response.to_xml()

@app.post("/analyze")
def analyze_candidates(request: AnalysisRequest):
    try:
        # 1. Semantic Matching
        resume_texts = [c.text for c in request.candidates]
        match_scores = engine.calculate_similarity(request.job_description, resume_texts)

        # 2. Advanced Scoring
        results = []
        for i, candidate in enumerate(request.candidates):
            features = {
                "experience_years": candidate.experience_years,
                "match_score": match_scores[i],
                "availability_status": candidate.availability_status,
                "skills_count": candidate.skills_count
            }
            final_score = scorer.predict_score(features)
            
            results.append({
                "candidate_id": candidate.id,
                "match_score": match_scores[i],
                "final_score": final_score
            })

        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/train")
def train_model(data_file: str = "data/training_data.csv"):
    if not os.path.exists(data_file):
        raise HTTPException(status_code=404, detail="Training data not found.")
    
    msg = scorer.train(data_file)
    return {"message": msg}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
