import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Layers, Sparkles, Layout } from "lucide-react";

interface SkillItem {
  name: string;
  description: string;
}

interface Skill {
  category: string;
  items: SkillItem[];
  icon: React.ElementType;
}

const skills: Skill[] = [
  {
    category: "Full Stack Development",
    icon: Layers,
    items: [
      { name: "Desarrollo Backend", description: "Python & FastAPI" },
      { name: "Frontend Moderno", description: "React & Next.js" },
      { name: "Bases de Datos", description: "SQL & NoSQL" },
      { name: "APIs REST", description: "Diseño y Consumo" },
    ],
  },
  {
    category: "Inteligencia Artificial",
    icon: Sparkles,
    items: [
      { name: "Modelos LLM", description: "Gemini, OpenAI, Claude" },
      { name: "Sistemas RAG", description: "Recuperación Aumentada" },
      { name: "Frameworks IA", description: "LangChain" },
      { name: "Vector DBs", description: "ChromaDB" },
    ],
  },
  {
    category: "Web & CMS",
    icon: Layout,
    items: [
      { name: "Maquetación", description: "HTML5 & CSS3" },
      { name: "Estilos", description: "TailwindCSS" },
      { name: "CMS", description: "Gestión de Contenidos" },
      { name: "Despliegue", description: "Vercel, Render & Git" },
    ],
  },
];

const SkillsList = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (category: string) => {
    setOpenItem(openItem === category ? null : category);
  };

  return (
    <div className="text-left pt-3 md:pt-9">
      <h3 className="text-[var(--white)] text-3xl md:text-4xl font-semibold md:mb-6">
        ¿Qué hago?
      </h3>
      <ul className="space-y-4 mt-4 text-lg">
        {skills.map((skill) => (
          <li key={skill.category} className="w-full">
            <div
              onClick={() => toggleItem(skill.category)}
              className="md:w-[400px] w-full bg-[#1414149c] rounded-2xl text-left hover:bg-opacity-80 transition-all border border-[var(--white-icon-tr)] cursor-pointer overflow-hidden"
            >
              <div className="flex items-center gap-3 p-4">
                <skill.icon className="w-6 h-6 text-[var(--sec)] opacity-70" />
                <div className="flex items-center gap-2 flex-grow justify-between">
                  <div className="min-w-0 max-w-[200px] md:max-w-none overflow-hidden">
                    <span className="block truncate text-[var(--white)] text-lg">
                      {skill.category}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: openItem === skill.category ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-[var(--white)]" />
                  </motion.div>
                </div>
              </div>

              <AnimatePresence>
                {openItem === skill.category && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4"
                  >
                    <ul className="space-y-2 text-[var(--white-icon)] text-sm">
                      {skill.items.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-[var(--sec)] mt-1">•</span>
                          <span>
                            <strong className="text-white">{item.name}:</strong>{" "}
                            {item.description}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsList;
