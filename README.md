# Portfolio de Aplicaciones IA

Bienvenido a mi portfolio personal. En este repositorio iré documentando mi aprendizaje y desarrollo de aplicaciones prácticas utilizando Inteligencia Artificial Generativa.

## 📂 Proyectos

### 🤖 1. Chatbot con Memoria (001-chatbot)
Un asistente conversacional inteligente capaz de mantener el contexto de la conversación, simulando una experiencia de chat natural.

**🛠️ Stack Tecnológico:**
*   **Python**: Lenguaje principal.
*   **Streamlit**: Para la interfaz de usuario web.
*   **LangChain**: Framework para orquestar la lógica del LLM y la memoria.
*   **OpenAI GPT-3.5**: Modelo de lenguaje.

**✨ Funcionalidades Clave:**
*   **Memoria de Sesión**: El bot recuerda lo que le has dicho anteriormente en la conversación.
*   **Interfaz Gráfica**: Chat visual estilo mensajería.
*   **Historial Persistente**: Los mensajes no se borran al interactuar con la app.

**🚀 Cómo ejecutar:**
```bash
pip install -r 001-chatbot/requirements.txt
streamlit run 001-chatbot/main.py
```

---

### 🌿 2. Explorador de Naturaleza RAG (002-rag-retriever)
Sistema de Búsqueda Aumentada (RAG) que responde preguntas basándose exclusivamente en una base de conocimientos propia sobre naturaleza e historia.

**🛠️ Stack Tecnológico:**
*   **LangChain**: Cadenas de recuperación (Retrieval Chains).
*   **ChromaDB**: Base de datos vectorial para búsqueda semántica.
*   **OpenAI Embeddings**: Para vectorizar el texto.

**✨ Funcionalidades Clave:**
*   **RAG (Retrieval Augmented Generation)**: Combina búsqueda documental con generación de texto.
*   **Citas de Fuentes**: Indica qué documento utilizó para generar la respuesta.
*   **Anti-Alucinación**: Instruido para responder solo con el contexto dado.

**🚀 Cómo ejecutar:**
```bash
pip install -r 002-rag-retriever/requirements.txt
streamlit run 002-rag-retriever/main.py
```

---
*Desarrollado por Manuel*