from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

# Load GPT-J model
model_name = "EleutherAI/gpt-j-6B"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    torch_dtype=torch.float16,
    revision="float16",
    low_cpu_mem_usage=True
)

# Device configuration
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# Initialize FastAPI app
app = FastAPI()

# Mount static files and templates
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# Request model
class StoryRequest(BaseModel):
    keywords: list
    max_length: int = 300

# Serve frontend
@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# API endpoint
@app.post("/generate_story/")
async def generate_story(req: StoryRequest):
    prompt = f"Write a creative story using the keywords: {', '.join(req.keywords)}.\n\nOnce upon a time"
    input_ids = tokenizer.encode(prompt, return_tensors="pt").to(device)

    output = model.generate(
        input_ids,
        max_length=req.max_length,
        do_sample=True,
        temperature=0.9,
        top_p=0.95,
        top_k=50,
        pad_token_id=tokenizer.eos_token_id
    )

    story = tokenizer.decode(output[0], skip_special_tokens=True)
    return {"story": story}
