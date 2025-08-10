# app/llm.py
from __future__ import annotations
import json, os
from typing import Dict
from functools import lru_cache
from app.security import validate_api_key

# Exceptions come from the v1+ SDK
try:
    import openai
    from openai import AsyncOpenAI
except Exception as e:
    raise RuntimeError("OpenAI SDK not installed or too old. Run: pip install -U openai") from e

# Load .env only when needed (so import order doesn't matter)
def _load_env():
    try:
        from dotenv import load_dotenv
        load_dotenv()
    except Exception:
        pass  # ok in prod where real env vars are set

class LLMError(Exception):
    pass

@lru_cache
def _client() -> AsyncOpenAI:
    _load_env()
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise LLMError("Missing OPENAI_API_KEY.")
    
    # Validate API key format
    if not validate_api_key(api_key):
        raise LLMError("Invalid OpenAI API key format.")
    
    timeout = float(os.getenv("OPENAI_TIMEOUT", "20"))
    max_retries = int(os.getenv("OPENAI_MAX_RETRIES", "2"))
    return AsyncOpenAI(api_key=api_key, timeout=timeout, max_retries=max_retries)

def _ensure_payload_shape(data: Dict[str, str]) -> Dict[str, str]:
    return {
        "professional": (data.get("professional") or "").strip(),
        "casual": (data.get("casual") or "").strip(),
        "polite": (data.get("polite") or "").strip(),
        "social_media": (data.get("social_media") or "").strip(),
    }

_PROMPT = """You rewrite the user's message in 4 styles.
Return ONLY a JSON object with keys: professional, casual, polite, social_media.
- Keep meaning faithful.
- One sentence per style unless needed.
- No emojis unless social_media.
User:
\"\"\"{text}\"\"\""""

async def rephrase(text: str) -> Dict[str, str]:
    cleaned = (text or "").strip()
    if not cleaned:
        raise LLMError("Input text is empty.")
    
    # Additional input validation
    if len(cleaned) > 5000:
        raise LLMError("Input text is too long. Maximum 5000 characters allowed.")
    
    try:
        resp = await _client().chat.completions.create(
            model=os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
            messages=[
                {"role": "system", "content": "You are a helpful assistant that rephrases text in different styles."},
                {"role": "user", "content": _PROMPT.format(text=cleaned)}
            ],
            response_format={"type": "json_object"},
            temperature=0.7,
            max_tokens=1000,  # Limit response size
        )
        data = json.loads(resp.choices[0].message.content)
        return _ensure_payload_shape(data)
    except openai.APITimeoutError as e:
        raise LLMError("The LLM request timed out.") from e
    except openai.APIConnectionError as e:
        raise LLMError("Network problem reaching the LLM provider.") from e
    except openai.APIStatusError as e:
        if e.status_code == 401:
            raise LLMError("Invalid API key or authentication failed.") from e
        elif e.status_code == 429:
            raise LLMError("Rate limit exceeded for LLM provider.") from e
        elif e.status_code == 400:
            raise LLMError("Invalid request to LLM provider.") from e
        else:
            raise LLMError(f"LLM request failed with status {e.status_code}.") from e
    except json.JSONDecodeError as e:
        raise LLMError("Model returned invalid JSON.") from e
    except Exception as e:
        raise LLMError(f"Unexpected LLM error: {e.__class__.__name__}") from e


async def rephrase_stream(text: str):
    """
    Stream the rephrase response in real-time.
    Yields JSON chunks as they arrive from OpenAI.
    """
    cleaned = (text or "").strip()
    if not cleaned:
        raise LLMError("Input text is empty.")
    
    # Additional input validation
    if len(cleaned) > 5000:
        raise LLMError("Input text is too long. Maximum 5000 characters allowed.")
    
    try:
        stream = await _client().chat.completions.create(
            model=os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
            messages=[
                {"role": "system", "content": "You are a helpful assistant that rephrases text in different styles."},
                {"role": "user", "content": _PROMPT.format(text=cleaned)}
            ],
            response_format={"type": "json_object"},
            temperature=0.7,
            max_tokens=1000,  # Limit response size
            stream=True,
        )
        
        # Yield each chunk as it arrives
        async for chunk in stream:
            if chunk.choices[0].delta.content:
                yield chunk.choices[0].delta.content
                
    except openai.APITimeoutError as e:
        raise LLMError("The LLM request timed out.") from e
    except openai.APIConnectionError as e:
        raise LLMError("Network problem reaching the LLM provider.") from e
    except openai.APIStatusError as e:
        if e.status_code == 401:
            raise LLMError("Invalid API key or authentication failed.") from e
        elif e.status_code == 429:
            raise LLMError("Rate limit exceeded for LLM provider.") from e
        elif e.status_code == 400:
            raise LLMError("Invalid request to LLM provider.") from e
        else:
            raise LLMError(f"LLM request failed with status {e.status_code}.") from e
    except Exception as e:
        raise LLMError(f"Unexpected LLM error: {e.__class__.__name__}") from e
