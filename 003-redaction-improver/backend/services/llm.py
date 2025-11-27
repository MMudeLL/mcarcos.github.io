import os
from langchain_openai import OpenAI
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv

# Cargar variables de entorno (.env)
load_dotenv()

def improve_text(draft: str, tone: str, dialect: str) -> str:
    """
    Mejora el texto proporcionado utilizando OpenAI a través de LangChain.
    """
    openai_api_key = os.getenv("OPENAI_API_KEY")
    if not openai_api_key:
        raise ValueError("OPENAI_API_KEY no encontrada en las variables de entorno.")

    # Inicializar el LLM
    llm = OpenAI(temperature=0.7, openai_api_key=openai_api_key)

    # Definir el template del prompt
    template = """
    A continuación se presenta un borrador de texto que puede estar mal redactado.
    Tu objetivo es:
    - Redactar correctamente el borrador
    - Convertir el texto al tono especificado
    - Convertir el texto al dialecto o idioma especificado (TRADUCE si es necesario)

    Aquí tienes algunos ejemplos de diferentes Tonos:
    - Formal: Saludos. OpenAI ha anunciado que Sam Altman se reincorpora a la compañía como su Director Ejecutivo.
    - Informal: ¡Hola a todos, vaya semana! Tenemos noticias brutales que compartir: Sam Altman vuelve a OpenAI como jefe.

    IMPORTANTE: Si el dialecto/idioma solicitado es diferente al del borrador, TRADUCE el texto adaptándolo culturalmente.
    
    A continuación está el borrador, el tono y el dialecto/idioma:
    BORRADOR: {draft}
    TONO: {tone}
    DIALECTO/IDIOMA: {dialect}

    TU RESPUESTA EN {dialect}:
    """

    prompt = PromptTemplate(
        input_variables=["tone", "dialect", "draft"],
        template=template,
    )

    # Formatear el prompt y ejecutar el LLM
    formatted_prompt = prompt.format(tone=tone, dialect=dialect, draft=draft)
    
    response = llm.invoke(formatted_prompt)
    
    return response.strip()
