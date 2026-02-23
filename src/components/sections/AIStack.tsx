// Sección "Mi stack de IA": herramientas que uso, con card destacada de OpenClaw estilo terminal
"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";

// Herramientas secundarias: cada una con icono SVG, nombre, descripción y categoría
const tools = [
  {
    name: "Claude & Claude Code",
    description: "Mi herramienta principal. Desde escribir código hasta analizar problemas complejos.",
    category: "Core",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5m-4.25-11.396c.251.023.501.05.75.082M12 3v5.714" />
      </svg>
    ),
  },
  {
    name: "Gemini & NotebookLM",
    description: "Chat diario y compañero de universidad. Procesamiento de documentos y estudio asistido.",
    category: "Chat & Estudio",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
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
      </div>
    </section>
  );
}
