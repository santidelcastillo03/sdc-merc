// Sección "El potencial de la IA": 3 cards con visión equilibrada sobre las capacidades de la IA
"use client";

import { useEffect, useRef, useState } from "react";

// Datos de las 3 cards: qué puede, qué no puede, y dónde está el valor real
// Cada card tiene un número de índice editorial y barra de acento lateral
const cards = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "¿Qué puede hacer?",
    description:
      "Automatizar lo repetitivo, procesar volúmenes masivos de información, y ejecutar flujos completos de trabajo. Ya no es solo un chat: los agentes de IA orquestan tareas paso a paso y entregan resultados listos para que el experto decida.",
    number: "",
    accentBar: "",
    accentText: "text-merc-orange",
    accentHex: "#fb5401",
    hoverShadow: "hover:shadow-[0_0_0_1px_rgba(251,84,1,0.2),0_16px_48px_rgba(251,84,1,0.1)]",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "¿Qué no puede hacer?",
    description:
      "Reemplazar el criterio humano en situaciones ambiguas, entender el contexto emocional de un cliente, ni tomar decisiones éticas por sí sola. La supervisión humana sigue siendo esencial.",
    number: "",
    accentBar: "",
    accentText: "text-merc-amber",
    accentHex: "#f9a421",
    hoverShadow: "hover:shadow-[0_0_0_1px_rgba(249,164,33,0.2),0_16px_48px_rgba(249,164,33,0.1)]",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "¿Dónde está el valor real?",
    description:
      "En la intersección: IA que potencia a las personas, no que las reemplaza. Un agente que prepara todo para que el experto tome la mejor decisión en segundos.",
    number: "",
    accentBar: "",
    accentText: "text-emerald-400",
    accentHex: "#003392",
    hoverShadow: "hover:shadow-[0_0_0_1px_rgba(0,51,146,0.25),0_16px_48px_rgba(0,51,146,0.12)]",
  },
];

export default function AIPotential() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // IntersectionObserver: activa animaciones cuando la sección entra en viewport (15%)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="potencial"
      ref={sectionRef}
      className="relative py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5">
        {/* Título con gradiente naranja-ámbar en "IA" */}
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            El potencial de la{" "}
            <span className="bg-gradient-to-r from-merc-orange to-merc-amber bg-clip-text text-transparent">
              IA
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground text-lg">
            Capacidades reales, límites claros, y dónde está la oportunidad.
          </p>
        </div>

        {/* Grid de cards: diseño editorial con índice numerado y barra de acento lateral */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className={`group relative overflow-hidden bg-merc-dark-card border border-white/[0.05] rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1 ${card.hoverShadow} ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: visible ? `${300 + i * 150}ms` : "0ms" }}
            >
              {/* Barra de acento lateral izquierda */}
              <span
                className={`absolute left-0 top-0 bottom-0 w-[3px] ${card.accentBar} rounded-l-2xl`}
              />

              {/* Número gigante fantasma en el fondo */}
              <span
                className="absolute -bottom-3 right-1 font-display font-black leading-none select-none pointer-events-none"
                style={{
                  fontSize: "108px",
                  color: card.accentHex,
                  opacity: 0.055,
                }}
                aria-hidden="true"
              >
                {card.number}
              </span>

              {/* Contenido */}
              <div className="relative pl-3">
                {/* Etiqueta de índice */}
                <p
                  className={`text-[10px] font-bold uppercase tracking-[0.22em] ${card.accentText} mb-4 opacity-70`}
                >
                  {card.number}
                </p>

                {/* Icono en color de acento sin fondo */}
                <div className={`${card.accentText} mb-5`}>{card.icon}</div>

                <h3 className="font-display text-xl font-bold text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-[15px]">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
