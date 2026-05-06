import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
import joblib
import os

class ScoringEngine:
    def __init__(self, model_path='models/scorer_model.joblib'):
        self.model_path = model_path
        self.model = self.load_model()

    def load_model(self):
        if os.path.exists(self.model_path):
            return joblib.load(self.model_path)
        else:
            # Return a default model if not trained yet
            return None

    def predict_score(self, features: dict):
        """
        Predicts a candidate score based on features.
        Features: experience_years, match_score, availability_status (0/1), skills_count
        """
        if self.model is None:
            # Fallback to a simple heuristic if no model is trained
            return round((features['experience_years'] * 5 + features['match_score'] * 0.7), 2)
        
        # Prepare input for model
        X = pd.DataFrame([features])
        prediction = self.model.predict(X)[0]
        return round(float(prediction), 2)

    def train(self, data_path: str):
        """
        Trains the model on a CSV file.
        CSV should have columns: experience_years, match_score, availability_status, skills_count, final_score
        """
        df = pd.read_csv(data_path)
        X = df[['experience_years', 'match_score', 'availability_status', 'skills_count']]
        y = df['final_score']

        self.model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.model.fit(X, y)

        # Ensure directory exists
        os.makedirs(os.path.dirname(self.model_path), exist_ok=True)
        joblib.dump(self.model, self.model_path)
        return "Model trained and saved successfully."

# Singleton instance
scorer = ScoringEngine()
