// Sección "El potencial de la IA": 3 cards con visión equilibrada sobre las capacidades de la IA
"use client";

import { useEffect, useRef, useState } from "react";

// Datos de las 3 cards: qué puede, qué no puede, y dónde está el valor real
// Cada card tiene clases estáticas de Tailwind (no dinámicas) para compatibilidad con JIT
const cards = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Qué puede hacer",
    description:
      "Automatizar lo repetitivo, procesar volúmenes masivos de información, y asistir en decisiones complejas con datos que un humano tardaría semanas en analizar.",
    iconBg: "bg-merc-orange/10",
    iconColor: "text-merc-orange",
    hoverBorder: "hover:border-merc-orange/30",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Qué no puede hacer",
    description:
      "Reemplazar el criterio humano en situaciones ambiguas, entender el contexto emocional de un cliente, ni tomar decisiones éticas por sí sola. La supervisión humana sigue siendo esencial.",
    iconBg: "bg-merc-amber/10",
    iconColor: "text-merc-amber",
    hoverBorder: "hover:border-merc-amber/30",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Dónde está el valor real",
    description:
      "En la intersección: IA que potencia a las personas, no que las reemplaza. Un agente que prepara todo para que el experto tome la mejor decisión en segundos.",
    iconBg: "bg-merc-blue/10",
    iconColor: "text-merc-blue",
    hoverBorder: "hover:border-merc-blue/30",
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
            Una visión honesta: ni hype exagerado ni escepticismo ciego.
          </p>
        </div>

        {/* Grid de cards: animación escalonada (cada card aparece 150ms después de la anterior) */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className={`group relative rounded-2xl bg-merc-dark-card border border-merc-blue/10 p-6 sm:p-8 ${card.hoverBorder} transition-all duration-500 hover:-translate-y-1 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: visible ? `${300 + i * 150}ms` : "0ms" }}
            >
              {/* Icono con fondo coloreado */}
              <div className={`inline-flex p-3 rounded-xl ${card.iconBg} ${card.iconColor} mb-4`}>
                {card.icon}
              </div>
              <h3 className="font-display text-xl font-semibold text-white mb-3">
                {card.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
