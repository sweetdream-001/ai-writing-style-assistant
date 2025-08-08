# app/main.py
import os
from fastapi import FastAPI, HTTPException
from pydantic_settings import BaseSettings
from pydantic import ConfigDict
from fastapi.middleware.cors import CORSMiddleware

class Settings(BaseSettings):
    openai_api_key: str

    model_config = ConfigDict(
        env_file=".env",
        env_file_encoding="utf-8"
    )

settings = Settings()  # Will read .env

if not settings.openai_api_key:
    raise RuntimeError("OPENAI_API_KEY not set in .env")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/hello")
def hello():
    return {"message": "Hello from FastAPI"}

