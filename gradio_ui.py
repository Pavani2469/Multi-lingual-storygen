import gradio as gr
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

model_name = "EleutherAI/gpt-j-6B"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype=torch.float16, revision="float16", low_cpu_mem_usage=True)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

def generate_story(keywords, max_length):
    prompt = f"Write a creative story using the keywords: {keywords}.\n\nOnce upon a time"
    input_ids = tokenizer.encode(prompt, return_tensors="pt").to(device)
    output = model.generate(
        input_ids,
        max_length=int(max_length),
        do_sample=True,
        temperature=0.9,
        top_k=50,
        top_p=0.95,
        pad_token_id=tokenizer.eos_token_id
    )
    story = tokenizer.decode(output[0], skip_special_tokens=True)
    return story

iface = gr.Interface(fn=generate_story,
                     inputs=[
                         gr.Textbox(label="Enter Keywords (comma separated)"),
                         gr.Slider(100, 600, value=300, step=50, label="Story Length")
                     ],
                     outputs="text",
                     title="Story Generator with GPT-J",
                     description="Generate a creative story from your keywords")

iface.launch()
