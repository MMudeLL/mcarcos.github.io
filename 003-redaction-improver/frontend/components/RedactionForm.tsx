"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wand2, Loader2, Copy, Check } from "lucide-react";

export default function RedactionForm() {
    const [draft, setDraft] = useState("");
    const [tone, setTone] = useState("Formal");
    const [dialect, setDialect] = useState("Español (España)");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Evitar problemas de hidratación renderizando solo en cliente
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!draft) return;

        setLoading(true);
        setResult("");

        try {
            const response = await fetch("http://127.0.0.1:8000/improve", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    draft,
                    tone,
                    dialect,
                }),
            });

            if (!response.ok) {
                throw new Error("Error al conectar con el servidor");
            }

            const data = await response.json();
            setResult(data.redacted_text);
        } catch (error) {
            console.error(error);
            setResult("Error: No se pudo mejorar el texto. Asegúrate de que el backend está funcionando.");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!mounted) return null;

    return (
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Columna Izquierda: Formulario */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-xl"
            >
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="bg-purple-500/20 text-purple-400 p-2 rounded-lg">
                        1
                    </span>
                    Configura tu Redacción
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Tu Borrador</label>
                        <textarea
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            placeholder="Escribe o pega aquí tu texto..."
                            className="w-full h-40 bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none transition-all"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Tono</label>
                            <select
                                value={tone}
                                onChange={(e) => setTone(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none cursor-pointer"
                            >
                                <option value="Formal" className="text-white bg-black">Formal</option>
                                <option value="Informal" className="text-white bg-black">Informal</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Dialecto</label>
                            <select
                                value={dialect}
                                onChange={(e) => setDialect(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none cursor-pointer"
                            >
                                <option value="Español (España)" className="text-white bg-black">Español (España)</option>
                                <option value="Español (Latinoamérica)" className="text-white bg-black">Español (Latinoamérica)</option>
                                <option value="Catalán" className="text-white bg-black">Catalán</option>
                                <option value="Gallego" className="text-white bg-black">Gallego</option>
                                <option value="Inglés" className="text-white bg-black">Inglés</option>
                                <option value="Francés" className="text-white bg-black">Francés</option>
                                <option value="Alemán" className="text-white bg-black">Alemán</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !draft}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20 cursor-pointer"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Mejorando...
                            </>
                        ) : (
                            <>
                                <Wand2 size={20} />
                                Mejorar Texto
                            </>
                        )}
                    </button>
                </form>
            </motion.div>

            {/* Columna Derecha: Resultado */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-xl flex flex-col h-full"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                        <span className="bg-blue-500/20 text-blue-400 p-2 rounded-lg">
                            2
                        </span>
                        Resultado
                    </h2>
                    {result && (
                        <button
                            onClick={copyToClipboard}
                            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                            title="Copiar"
                        >
                            {copied ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
                        </button>
                    )}
                </div>

                <div className="flex-grow bg-black/20 border border-white/10 rounded-xl p-4 text-gray-300 overflow-auto min-h-[200px]">
                    {result ? (
                        <p className="whitespace-pre-wrap leading-relaxed">{result}</p>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-2">
                            <Wand2 size={40} className="opacity-20" />
                            <p className="text-sm">El texto mejorado aparecerá aquí</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
