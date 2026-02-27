import os
from dotenv import load_dotenv
from typing import Any, Dict, List, Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import traceback
import opengradient as og


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    model: str
    messages: List[ChatMessage]
    max_tokens: Optional[int] = 600
    temperature: Optional[float] = 0.1


load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://og-signalz.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_client() -> og.Client:
    private_key = os.environ.get("OG_PRIVATE_KEY")
    if not private_key:
        raise RuntimeError("OG_PRIVATE_KEY is not set")
    return og.Client(private_key=private_key)


@app.get("/healthz")
def healthz() -> Dict[str, str]:
    return {"status": "ok"}


def resolve_model(model: str):
    try:
        enum = og.TEE_LLM
    except Exception:
        return model

    # Try direct match on values
    for name in dir(enum):
        if name.startswith("_"):
            continue
        value = getattr(enum, name)
        if isinstance(value, str) and value == model:
            return value

    # Try normalized name match
    normalized = model.upper().replace("/", "_").replace("-", "_").replace(".", "_")
    for name in dir(enum):
        if name.startswith("_"):
            continue
        if name == normalized:
            return getattr(enum, name)

    return model


@app.post("/v1/chat/completions")
def chat_completions(payload: ChatRequest) -> Dict[str, Any]:
    try:
        client = get_client()

        # Ensure Permit2 allowance for OPG payments
        # This is idempotent and only transacts if needed.
        client.llm.ensure_opg_approval(opg_amount=5.0)

        result = client.llm.chat(
            model=resolve_model(payload.model),
            messages=[m.dict() for m in payload.messages],
            max_tokens=payload.max_tokens or 600,
            temperature=payload.temperature or 0.1,
        )

        # Try to normalize output into OpenAI-style response
        content = None
        payment_hash = None

        if hasattr(result, "chat_output"):
            try:
                content = result.chat_output.get("content")
            except Exception:
                content = None
        if content is None and hasattr(result, "completion_output"):
            content = result.completion_output

        if hasattr(result, "payment_hash"):
            payment_hash = result.payment_hash

        if content is None:
            content = str(result)

        return {
            "id": "og-chat",
            "object": "chat.completion",
            "choices": [
                {
                    "index": 0,
                    "message": {"role": "assistant", "content": content},
                    "finish_reason": "stop",
                }
            ],
            "payment": {"hash": payment_hash},
        }
    except RuntimeError as err:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(err)) from err
    except Exception as err:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(err)) from err
