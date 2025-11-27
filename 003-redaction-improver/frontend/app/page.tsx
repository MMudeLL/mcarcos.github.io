import RedactionForm from "@/components/RedactionForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Fondo Decorativo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center gap-8">
        {/* Cabecera */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Redaction Improver
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Mejora tus textos al instante con Inteligencia Artificial.
            Ajusta el tono y el dialecto para comunicar exactamente lo que quieres.
          </p>
        </div>

        {/* Componente Principal */}
        <RedactionForm />

        {/* Footer */}
        <footer className="text-sm text-gray-600 mt-12">
          Powered by LangChain & OpenAI
        </footer>
      </div>
    </main>
  );
}
