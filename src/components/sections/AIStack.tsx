// Sección "Mi stack de IA": herramientas que uso, con card destacada de OpenClaw estilo terminal
"use client";

import { useEffect, useRef, useState } from "react";
// Herramientas secundarias: cada una con icono SVG, nombre, descripción y categoría
const tools = [
  {
    name: "Claude & Claude Code",
    description: "Mi herramienta principal. Desde escribir código hasta analizar problemas complejos.",
    category: "Core",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2" />
        <rect x="7" y="7" width="10" height="10" rx="1.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
        <rect x="9.5" y="9.5" width="5" height="5" rx="0.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
      </svg>
    ),
  },
  {
    name: "Gemini & NotebookLM",
    description: "Chat diario y compañero de universidad. Procesamiento de documentos y estudio asistido.",
    category: "Chat & Estudio",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2c0 0 1.5 7.5 2.5 8.5S22 12 22 12s-7.5 1.5-8.5 2.5S12 22 12 22s-1.5-7.5-2.5-8.5S2 12 2 12s7.5-1.5 8.5-2.5S12 2 12 2z" />
      </svg>
    ),
  },
  {
    name: "Frameworks de desarrollo",
    description: "BMAD, Spec Kit, Superpowers. Desarrollo guiado por especificaciones, no por improvisación.",
    category: "Metodología",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
];

// Menciones honorarias: herramientas que uso ocasionalmente
const honorableMentions = [
  {
    name: "Perplexity",
    note: "Búsqueda con IA en tiempo real",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    name: "GitHub Copilot",
    note: "Autocompletado en el editor",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
];

// Datos de OpenClaw: agente autónomo destacado con lista de características
const openClaw = {
  name: "OpenClaw + Ollama",
  description:
    "Un servidor Ubuntu corriendo 24/7 con un agente autónomo. Tiene su propio correo electrónico, se comunica conmigo por Telegram, y opera de manera independiente. Usa un híbrido de modelos locales (Qwen 3:14B) junto con APIs en la nube para máxima flexibilidad. Es un agente que trabaja mientras duermo.",
  highlights: [
    "Servidor Ubuntu 24/7",
    "Modelos locales",
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
            Las herramientas que me acompañan en mi trabajo diario.
          </p>
        </div>

        {/* Card destacada de OpenClaw: ventana de terminal */}
        <div
          className={`mt-12 overflow-hidden rounded-2xl border border-merc-orange/20 glow-orange transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Barra superior de terminal con puntos de semáforo */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-merc-orange/10 bg-merc-orange/[0.03]">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/55" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/55" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/55" />
            <span className="ml-4 font-mono text-xs text-merc-orange/40">
              agent@openclaw:~$
            </span>
            <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-emerald-400/70">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70 animate-pulse" />
              ONLINE
            </span>
          </div>

          {/* Cuerpo de la card con patrón de puntos */}
          <div className="relative p-6 sm:p-8 bg-merc-dark-card">
            <div className="dot-grid absolute inset-0 pointer-events-none" />

            <div className="relative flex flex-col lg:flex-row gap-6 lg:gap-10">
              {/* Lado izquierdo: nombre, badge y descripción */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                    {openClaw.name}
                  </h3>
                 
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {openClaw.description}
                </p>
              </div>

              {/* Lado derecho: highlights estilo comandos de terminal */}
              <div className="flex flex-wrap lg:flex-col gap-2 lg:min-w-[200px]">
                {openClaw.highlights.map((h) => (
                  <span
                    key={h}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded border border-merc-orange/15 bg-merc-dark text-sm text-merc-orange font-mono"
                  >
                    <span className="text-merc-orange/40 text-base leading-none">
                      ›
                    </span>
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Grid de herramientas: chips horizontales con línea de acento izquierda */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, i) => (

            <div
              key={tool.name}
              className={`group relative overflow-hidden rounded-xl bg-merc-dark-card border border-white/[0.04] p-5 hover:border-merc-blue/25 transition-all duration-500 hover:-translate-y-0.5 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: visible ? `${500 + i * 120}ms` : "0ms",
              }}
            >
              {/* Línea de acento izquierda que se ilumina al hover */}
              <span className="absolute left-0 top-3 bottom-3 w-[2px] bg-merc-blue/20 group-hover:bg-merc-blue/55 rounded-full transition-colors duration-300" />

              <div className="pl-4">
                {/* Fila superior: categoría + icono */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-blue-500">
                    {tool.category}
                  </span>
                  <span className="text-blue-500 group-hover:text-blue-500 transition-colors duration-300">
                    {tool.icon}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-2">
                  {tool.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {tool.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Menciones honorarias: fila de chips minimalistas */}
        <div
          className={`mt-6 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: visible ? "740ms" : "0ms" }}
        >
          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-white/[0.05]" />
            <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Menciones honorarias
            </span>
            <span className="h-px flex-1 bg-white/[0.05]" />
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {honorableMentions.map((item) => (
              <div
                key={item.name}
                className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-lg border border-white/[0.06] bg-merc-dark-card hover:border-white/[0.12] transition-colors duration-300"
              >
                <span className="text-muted-foreground/70 group-hover:text-white/80 transition-colors duration-300">
                  {item.icon}
                </span>
                <span className="font-display text-sm font-semibold text-white/85 group-hover:text-white transition-colors duration-300">
                  {item.name}
                </span>
                <span className="text-[11px] text-muted-foreground hidden sm:inline">
                  {item.note}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
