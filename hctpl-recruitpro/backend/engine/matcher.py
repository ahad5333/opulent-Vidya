from sentence_transformers import SentenceTransformer, util
import torch

class MatchingEngine:
    def __init__(self, model_name='all-MiniLM-L6-v2'):
        self.model = SentenceTransformer(model_name)

    def calculate_similarity(self, source_text: str, target_texts: list):
        """
        Compare a source text (e.g., JD) with a list of target texts (e.g., Resumes).
        Returns a list of scores (0-100).
        """
        # Encode both texts
        source_embedding = self.model.encode(source_text, convert_to_tensor=True)
        target_embeddings = self.model.encode(target_texts, convert_to_tensor=True)

        # Compute cosine similarity
        cosine_scores = util.cos_sim(source_embedding, target_embeddings)[0]

        # Convert to percentages
        scores = [round(float(score) * 100, 2) for score in cosine_scores]
        return scores

# Singleton instance
engine = MatchingEngine()
