# app/main.py
import os, json
from fastapi import FastAPI, HTTPException, Request, Query
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from app.llm import rephrase, LLMError

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RephraseIn(BaseModel):
    text: str

class RephraseOut(BaseModel):
    professional: str
    casual: str
    polite: str
    social_media: str


@app.post("/api/rephrase", response_model=RephraseOut)
async def rephrase_endpoint(body: RephraseIn):
    try:
        result = await rephrase(body.text)
        return RephraseOut(**result)
    except LLMError:
        # Don't leak internal details
        raise HTTPException(status_code=500, detail="LLM call failed")

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/hello")
def hello():
    return {"message": "Hello from FastAPI"}

