// Sección "Mi stack de IA": herramientas que uso, con card destacada de OpenClaw
"use client";

import { useEffect, useRef, useState } from "react";

// Herramientas secundarias: cada una con icono SVG, nombre, descripción y categoría
const tools = [
  {
    name: "Claude & Claude Code",
    description: "Mi herramienta principal del día a día. Desde escribir código hasta analizar problemas complejos.",
    category: "Core",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5m-4.25-11.396c.251.023.501.05.75.082M12 3v5.714" />
      </svg>
    ),
  },
  {
    name: "Gemini & NotebookLM",
    description: "Chat diario y compañero de universidad. Procesamiento de documentos y estudio asistido.",
    category: "Chat & Estudio",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  {
    name: "Frameworks de desarrollo",
    description: "BMAD, Spec Kit, Superpowers — desarrollo guiado por especificaciones, no por improvisación.",
    category: "Metodología",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
];

// Datos de OpenClaw: agente autónomo destacado con lista de características
const openClaw = {
  name: "OpenClaw + Ollama",
  description:
    "Un servidor Ubuntu corriendo 24/7 con un agente autónomo. Tiene su propio correo electrónico, se comunica conmigo por Telegram, y opera independientemente. No es un chatbot — es un agente que trabaja mientras duermo.",
  highlights: [
    "Servidor Ubuntu 24/7",
    "Correo propio del agente",
    "Comunicación por Telegram",
    "Autonomía total",
  ],
};

export default function AIStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // IntersectionObserver: activa animaciones al 10% de visibilidad
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stack" ref={sectionRef} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        {/* Título con gradiente azul en "IA" */}
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Mi stack de{" "}
            <span className="bg-gradient-to-r from-merc-blue to-blue-400 bg-clip-text text-transparent">
              IA
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground text-lg">
            Las herramientas que uso todos los días, no las que suenan bien en un CV.
          </p>
        </div>

        {/* Card destacada de OpenClaw: borde naranja con efecto glow */}
        <div
          className={`mt-12 rounded-2xl glow-orange border border-merc-orange/20 bg-gradient-to-br from-merc-dark-card to-merc-dark-lighter p-6 sm:p-8 transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            {/* Lado izquierdo: icono, nombre, badge "Highlight" y descripción */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-merc-orange/10 text-merc-orange">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                    {openClaw.name}
                  </h3>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-merc-orange/10 text-merc-orange">
                    Highlight
                  </span>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {openClaw.description}
              </p>
            </div>
            {/* Lado derecho: lista de características con puntos naranjas */}
            <div className="flex flex-wrap lg:flex-col gap-2 lg:min-w-[200px]">
              {openClaw.highlights.map((h) => (
                <span
                  key={h}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-merc-orange/5 border border-merc-orange/10 text-sm text-merc-orange"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-merc-orange" />
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Grid de herramientas secundarias: animación escalonada */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, i) => (
            <div
              key={tool.name}
              className={`rounded-2xl bg-merc-dark-card border border-merc-blue/10 p-6 hover:border-merc-blue/25 transition-all duration-500 hover:-translate-y-0.5 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: visible ? `${500 + i * 120}ms` : "0ms",
              }}
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex text-merc-blue">{tool.icon}</span>
                <div>
                  {/* Etiqueta de categoría en azul */}
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-merc-blue">
                    {tool.category}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-white mt-0.5">
                    {tool.name}
                  </h3>
                </div>
              </div>
              <p className="mt-3 text-muted-foreground text-[15px] leading-relaxed">
                {tool.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
