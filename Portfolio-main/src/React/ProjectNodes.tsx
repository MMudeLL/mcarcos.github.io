import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink } from "lucide-react";

// DATOS COMPLETOS DE TUS PROYECTOS
const projects = [
    {
        id: 1,
        title: "AI Chatbot con Memoria",
        desc: "Asistente inteligente capaz de recordar el contexto de la conversación.",
        longDesc: "Un chatbot avanzado construido con Python y LangChain que mantiene el contexto de la conversación gracias a una memoria a largo plazo. Ideal para soporte al cliente o asistentes personales.",
        tech: ["Python", "LangChain", "OpenAI", "Streamlit"],
        image: "/mcarcos.github.io/chatbot.png",
        github: "https://github.com/MMudeLL/mcarcos.github.io/tree/main/001-chatbot",
        demo: "#",
        color: "#a476ff",
    },
    {
        id: 2,
        title: "RAG Document Explorer",
        desc: "Sube tus PDFs y chatea con ellos usando Inteligencia Artificial.",
        longDesc: "Sistema RAG (Retrieval-Augmented Generation) que permite subir documentos PDF, indexarlos vectorialmente y realizar preguntas sobre su contenido con alta precisión.",
        tech: ["Python", "LangChain", "Streamlit", "OpenAI", "ChromaDB"],
        image: "/mcarcos.github.io/rag.png",
        github: "https://github.com/MMudeLL/mcarcos.github.io/tree/main/002-rag-retriever",
        demo: "#",
        color: "#a476ff",
    },
    {
        id: 3,
        title: "Social Recipes App",
        desc: "Plataforma Full Stack para compartir y descubrir recetas de cocina.",
        longDesc: "Aplicación web completa con autenticación de usuarios, base de datos en tiempo real y diseño responsive. Permite crear, guardar y valorar recetas de la comunidad.",
        tech: ["React", "Next.js", "Python", "FastAPI", "TailwindCSS", "Supabase"],
        image: "/mcarcos.github.io/recipes.png",
        github: "#", // Desactivado para este proyecto
        demo: "https://syncook.vercel.app/",
        color: "#a476ff",
    },
    {
        id: 4,
        title: "Redaction Improver",
        desc: "Mejora y traduce textos con IA ajustando tono y dialecto.",
        longDesc: "Aplicación Full Stack que utiliza Inteligencia Artificial para reescribir textos, ajustar el tono (formal/informal) y adaptarlos a diferentes dialectos o idiomas (Español, Inglés, Catalán, etc.).",
        tech: ["React", "Next.js", "Python", "FastAPI", "LangChain", "OpenAI"],
        image: "/mcarcos.github.io/redaction-improver.jpg",
        github: "https://github.com/MMudeLL/mcarcos.github.io/tree/main/003-redaction-improver",
        demo: "#",
        color: "#a476ff",
    }
];

const ProjectNodes = () => {
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);
    const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);
    const [nodes, setNodes] = useState<any[]>([]);

    // Estado para el efecto de escritura
    const [displayedText, setDisplayedText] = useState("");
    const [showCursor, setShowCursor] = useState(true);
    const fullText = "Proyectos";

    // Configuración del contenedor FIJO para garantizar precisión
    const containerSize = 500;
    const center = containerSize / 2;

    // Efecto de escritura del título
    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setDisplayedText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
                setShowCursor(false);
            }
        }, 150);
        return () => clearInterval(interval);
    }, []);

    // Inicialización y Bucle de Animación
    useEffect(() => {
        // 1. Posicionamiento de Proyectos (Estático pero Orgánico)
        const projectNodes = projects.map((p, i) => {
            const angleStep = (2 * Math.PI) / projects.length;
            const angle = i * angleStep - Math.PI / 2;

            // Variación orgánica
            const radiusVariation = (i % 2 === 0 ? 1 : -1) * 20;
            const angleVariation = (i % 3 === 0 ? 0.1 : -0.1);

            const r = 160 + radiusVariation;
            const finalAngle = angle + angleVariation;

            return {
                ...p,
                x: center + r * Math.cos(finalAngle),
                y: center + r * Math.sin(finalAngle),
                type: 'project'
            };
        });

        // 2. Inicialización de Nodos Fantasma (Dinámicos)
        const numGhosts = 6;
        const ghosts = Array.from({ length: numGhosts }).map((_, i) => ({
            id: `ghost-${i}`,
            baseX: Math.random() * containerSize,
            baseY: Math.random() * containerSize,
            phaseX: Math.random() * Math.PI * 2,
            phaseY: Math.random() * Math.PI * 2,
            speedX: 0.0005 + Math.random() * 0.001,
            speedY: 0.0005 + Math.random() * 0.001,
            amplitude: 40 + Math.random() * 40,
            size: 3 + Math.random() * 2,
            type: 'ghost'
        }));

        let animationFrameId: number;
        const animate = () => {
            const time = Date.now();

            const currentGhosts = ghosts.map(g => ({
                ...g,
                x: g.baseX + Math.sin(time * g.speedX + g.phaseX) * g.amplitude,
                y: g.baseY + Math.cos(time * g.speedY + g.phaseY) * g.amplitude,
            }));

            setNodes([...projectNodes, ...currentGhosts]);
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <>
            <div className="w-full flex flex-col items-center justify-center relative py-8" style={{ minHeight: "500px" }}>
                <style>
                    {`
                        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');
                        .font-orbitron { font-family: 'Orbitron', sans-serif; }
                    `}
                </style>

                {/* Título "Proyectos" (Arriba y Centrado) */}
                <div className="text-center mb-4 z-10 relative -ml-16 md:-ml-28">
                    <h3 className="text-4xl md:text-4xl font-normal text-white tracking-tight font-orbitron">
                        {displayedText}
                        <span className={`animate-pulse ${showCursor ? "opacity-100" : "opacity-0"}`}>|</span>
                    </h3>
                </div>

                {/* CONTENEDOR DE LA RED: Tamaño Fijo para Precisión Perfecta */}
                {/* Usamos 'scale' en CSS para hacerlo responsive si es necesario, pero mantenemos coordenadas 1:1 */}
                <div
                    className="relative shrink-0"
                    style={{
                        width: containerSize,
                        height: containerSize,
                    }}
                >
                    {/* SVG Conexiones */}
                    <svg
                        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
                        width={containerSize}
                        height={containerSize}
                        viewBox={`0 0 ${containerSize} ${containerSize}`}
                    >
                        {nodes.map((node, i) =>
                            nodes.slice(i + 1).map((otherNode, j) => {
                                const dx = node.x - otherNode.x;
                                const dy = node.y - otherNode.y;
                                const distance = Math.sqrt(dx * dx + dy * dy);

                                if (distance < 200) {
                                    return (
                                        <line
                                            key={`${i}-${j}`}
                                            x1={node.x}
                                            y1={node.y}
                                            x2={otherNode.x}
                                            y2={otherNode.y}
                                            stroke="#a476ff"
                                            strokeWidth={node.type === 'ghost' || otherNode.type === 'ghost' ? 0.5 : 1}
                                            strokeOpacity={0.15 + (1 - distance / 200) * 0.2}
                                        />
                                    );
                                }
                                return null;
                            })
                        )}
                    </svg>

                    {/* Renderizado de Nodos */}
                    {nodes.map((node) => (
                        <div
                            key={node.id}
                            className="absolute flex items-center justify-center"
                            style={{
                                left: node.x,
                                top: node.y,
                                transform: "translate(-50%, -50%)", // CLAVE: Centra el div exactamente en la coordenada
                                zIndex: 10
                            }}
                        >
                            {node.type === 'ghost' ? (
                                // Nodo Fantasma
                                <div
                                    className="bg-[#a476ff] rounded-full opacity-40 shadow-[0_0_5px_#a476ff]"
                                    style={{ width: node.size, height: node.size }}
                                />
                            ) : (
                                // Nodo Proyecto
                                <motion.div
                                    className="relative flex items-center justify-center cursor-pointer group"
                                    onMouseEnter={() => setHoveredProject(node.id)}
                                    onMouseLeave={() => setHoveredProject(null)}
                                    onClick={() => setSelectedProject(node)}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <div className="w-4 h-4 bg-[#a476ff] rounded-full shadow-[0_0_15px_#a476ff] z-20 relative border border-[#1a1a1a]" />
                                    <motion.div
                                        className="absolute inset-0 bg-[#a476ff] rounded-full opacity-30 z-10"
                                        animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />

                                    {/* Etiqueta de Proyecto (Siempre visible pero sutil) */}
                                    <motion.div
                                        className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap z-50 pointer-events-none"
                                        animate={{
                                            y: hoveredProject === node.id ? 0 : 5,
                                            scale: hoveredProject === node.id ? 1.05 : 1,
                                        }}
                                    >
                                        <div className="flex flex-col items-center">
                                            {/* Título del Proyecto */}
                                            <span
                                                className={`text-xs font-bold tracking-wider uppercase px-2 py-1 rounded transition-all duration-300 ${hoveredProject === node.id
                                                    ? "text-[#a476ff] bg-[#0a0a0a]/80 border border-[#a476ff40] shadow-[0_0_10px_rgba(164,118,255,0.2)]"
                                                    : "text-gray-500/70 bg-transparent"
                                                    }`}
                                            >
                                                {node.title}
                                            </span>

                                            {/* Indicador de Acción (Solo en Hover) */}
                                            <AnimatePresence>
                                                {hoveredProject === node.id && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0, y: -5 }}
                                                        animate={{ opacity: 1, height: "auto", y: 0 }}
                                                        exit={{ opacity: 0, height: 0, y: -5 }}
                                                        className="flex items-center gap-1 mt-1 overflow-hidden"
                                                    >
                                                        <span className="text-[10px] text-white/80 font-light tracking-widest">
                                                            CLICK PARA EXPLORAR
                                                        </span>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>

            </div>

            {/* MODAL DE DETALLE */}
            <AnimatePresence>
                {
                    selectedProject && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedProject(null)}
                                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            />

                            <motion.div
                                layoutId={`project-${selectedProject.id}`}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative w-full max-w-2xl bg-[#141414] border border-[#a476ff40] rounded-2xl overflow-hidden shadow-2xl z-[101]"
                            >
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-white/20 transition-colors z-10"
                                >
                                    <X size={20} />
                                </button>

                                <div className="h-48 md:h-64 w-full overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent z-[1]" />
                                    <img
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="p-6 md:p-8 -mt-12 relative z-[2]">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {selectedProject.tech.map((t) => (
                                            <span
                                                key={t}
                                                className="px-3 py-1 text-xs font-medium bg-[#a476ff20] text-[#a476ff] rounded-full border border-[#a476ff40]"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <h2 className="text-3xl font-bold text-white mb-2">
                                        {selectedProject.title}
                                    </h2>
                                    <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                        {selectedProject.longDesc}
                                    </p>

                                    <div className="flex gap-4">
                                        {selectedProject.github !== "#" && (
                                            <a
                                                href={selectedProject.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-6 py-3 bg-[#a476ff] text-white rounded-xl font-medium hover:bg-[#8e5ee0] transition-colors"
                                            >
                                                <Github size={20} />
                                                Ver Código
                                            </a>
                                        )}
                                        {selectedProject.demo !== "#" && (
                                            <a
                                                href={selectedProject.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-6 py-3 bg-[#ffffff10] text-white border border-[#ffffff20] rounded-xl font-medium hover:bg-[#ffffff20] transition-colors"
                                            >
                                                <ExternalLink size={20} />
                                                Ver Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )
                }
            </AnimatePresence >
        </>
    );
};

export default ProjectNodes;
