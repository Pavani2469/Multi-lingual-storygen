from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import random
from googletrans import Translator  # 🚀 NEW: Translator for actual language change

app = FastAPI()

# 🛡️ CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Optional: Restrict to your frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 📦 Input data model
class StoryRequest(BaseModel):
    keywords: List[str]
    max_length: int
    language: str  # Should be like 'en', 'hi', 'te'

# 🌍 Google Translator setup
translator = Translator()

# 🧾 Basic story creation
def generate_from_model(keywords: List[str], max_length: int) -> str:
    base = " ".join(random.sample(keywords, min(len(keywords), 5)))
    story = f"Once upon a time, someone said: {base}. And that changed everything..."
    return story[:max_length]

# 🌐 Translation helper
def translate_text(text: str, target_lang: str) -> str:
    try:
        translated = translator.translate(text, dest=target_lang)
        return translated.text
    except Exception as e:
        print("🚨 Translation failed:", e)
        return text  # fallback to English

# 🚀 Final API route
@app.post("/generate_story/")
def generate_story(request: StoryRequest):
    try:
        # 1️⃣ Generate base story
        base_story = generate_from_model(request.keywords, request.max_length)

        # 2️⃣ Translate to target language
        final_story = translate_text(base_story, request.language)

        return {"story": final_story}
    except Exception as e:
        print("🔥 Server Error:", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")
