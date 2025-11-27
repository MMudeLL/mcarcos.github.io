from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models.models import RedactionRequest, RedactionResponse
from services.llm import improve_text

app = FastAPI(title="Redaction Improver API", version="1.0.0")

# Configuración de CORS (Permitir peticiones desde el frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción deberías restringir esto a tu dominio frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Redaction Improver API is running"}

@app.post("/improve", response_model=RedactionResponse)
async def improve_redaction(request: RedactionRequest):
    """
    Endpoint para mejorar la redacción de un texto.
    Recibe: draft, tone, dialect
    Devuelve: redacted_text
    """
    try:
        improved_text = improve_text(request.draft, request.tone, request.dialect)
        return RedactionResponse(redacted_text=improved_text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
