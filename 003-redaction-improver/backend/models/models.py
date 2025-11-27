from pydantic import BaseModel

class RedactionRequest(BaseModel):
    draft: str
    tone: str
    dialect: str

class RedactionResponse(BaseModel):
    redacted_text: str
