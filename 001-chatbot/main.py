import streamlit as st
from langchain_openai import ChatOpenAI, OpenAI
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.messages import HumanMessage
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

st.set_page_config(page_title="Chatbot", page_icon=":robot_face:", layout="wide")

st.title("Chatbot")

##### BACKEND #####

# Memoria del chatbot
if 'memory' not in st.session_state:
    st.session_state.memory = {}

# Historial de la sesión
def get_session_history(session_id: str) -> BaseChatMessageHistory:
    if session_id not in st.session_state.memory:
        st.session_state.memory[session_id] = ChatMessageHistory()
    return st.session_state.memory[session_id]

# Inicialización del modelo
model = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.7)

# Creación del chatbot con memoria
chatbot_with_memory = RunnableWithMessageHistory(model, get_session_history)


##### FRONTEND #####

# Historial de la sesión
if 'messages' not in st.session_state:
    st.session_state.messages = []

# Mensajes antiguos
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.write(message["content"])

# Input del usuario
prompt = st.chat_input("Pregunta algo al chatbot...")

if prompt:
    # Mostrar mensaje del usuario
    with st.chat_message("user"):
        st.markdown(prompt)

    # Guardar el historial
    st.session_state.messages.append({"role": "user", "content": prompt})

    # Respuesta del chatbot
    with st.chat_message("assistant"):
        # Definit ID de sesión
        config = {"configurable": {"session_id": "any"}}

        # Invocar modelo con memoria
        response = chatbot_with_memory.invoke([HumanMessage(content=prompt)], config=config)

        # Mostrar respuesta
        st.markdown(response.content)

    # Guardar respuesta en el historial
    st.session_state.messages.append({"role": "assistant", "content": response.content})



