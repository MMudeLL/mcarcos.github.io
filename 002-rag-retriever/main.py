import streamlit as st
import os
from dotenv import load_dotenv, find_dotenv
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_core.documents import Document
from langchain_chroma import Chroma
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough

load_dotenv(find_dotenv())

# Configurar página
st.set_page_config(page_title="Explorador de documentos", page_icon="🌿")
st.title("🌿Explorador de documentos🌿")

# Base de datos ficticia
documents = [
    Document(
        page_content="Machu Picchu es una ciudadela inca ubicada en las alturas de las montañas de los Andes en Perú, sobre el valle del río Urubamba. Fue construida en el siglo XV y luego abandonada.",
        metadata={"source": "historia-inca"},
    ),
    Document(
        page_content="La Gran Barrera de Coral es el sistema de arrecifes de coral más grande del mundo, compuesto por más de 2,900 arrecifes individuales y 900 islas.",
        metadata={"source": "biologia-marina"},
    ),
    Document(
        page_content="La selva amazónica, que cubre gran parte del noroeste de Brasil y se extiende hasta Colombia, Perú y otros países de Sudamérica, es la selva tropical más grande del mundo.",
        metadata={"source": "geografia-naturaleza"},
    ),
    Document(
        page_content="Pompeya fue una antigua ciudad romana cerca de la actual Nápoles, que fue enterrada bajo metros de ceniza y piedra pómez tras la erupción del Monte Vesubio en el año 79 d.C.",
        metadata={"source": "historia-romana"},
    ),
    Document(
        page_content="Las auroras boreales son un fenómeno natural de luces brillantes en el cielo, causado por la colisión de partículas cargadas del sol con la atmósfera terrestre.",
        metadata={"source": "fenomenos-naturales"},
    )
]

# Configurar modelo
model = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.7)

# Base de datos vectorial
vectorstore = Chroma.from_documents(documents, embedding=OpenAIEmbeddings())

# Retriever (recuperador)
retriever = vectorstore.as_retriever(
    search_type="similarity",
    search_kwargs={"k":1}
)

# Cadena de búsqueda
message = """
Eres un asistente experto. Contesta a la pregunta basándote SOLO en el siguiente contexto proporcionado.
Si no encuentras la respuesta en el contexto, di que no lo sabes.
Contexto: {context}
Pregunta: {question}
"""

prompt_template = ChatPromptTemplate.from_messages([("human", message)])

# Cadena final
# 1. RunnablePassthrough: Deja pasar la pregunta tal cual.
# 2. retriever: Busca información relevante.
# 3. prompt_template: Junta la pregunta y la información encontrada.
# 4. model: El cerebro (GPT) genera la respuesta final.

rag_chain = ({"context": retriever, "question": RunnablePassthrough()} | prompt_template | model)

# Input usuario
question = st.chat_input("Pregunta sobre los documentos...")

if question:
    # Mostrar mensaje del usuario
    with st.chat_message("user"):
        st.markdown(question)

    # Generar respuesta
    with st.chat_message("assistant"):
        response = rag_chain.invoke(question)
        st.markdown(response.content)

    # Mostrar la fuente
    docs = retriever.invoke(question)
    source = docs[0].metadata["source"]
    st.caption(f"Fuente: {source}")

