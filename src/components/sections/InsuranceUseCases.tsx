// Sección "Qué haría en Mercantil": 4 casos de uso concretos de IA en seguros
"use client";

import { useEffect, useRef, useState } from "react";

// Casos de uso: RAG, claims, riesgo, monitoreo — cada uno con gradiente de hover
const useCases = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: "RAG de pólizas",
    description:
      "Base de conocimiento inteligente: cualquier empleado pregunta en lenguaje natural y obtiene respuestas precisas sobre pólizas, procedimientos y coberturas.",
    gradient: "from-blue-500/10 to-merc-blue/5",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: "Automatización de claims",
    description:
      "Clasificación automática de reclamos, extracción de datos de documentos, y enrutamiento inteligente. Lo que tomaba días, toma minutos.",
    gradient: "from-merc-orange/10 to-orange-500/5",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Análisis de riesgo",
    description:
      "Evaluación de perfiles con IA que detecta patrones en datos históricos, complementando el juicio del analista con insights basados en datos.",
    gradient: "from-merc-amber/10 to-yellow-500/5",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: "Monitoreo 24/7",
    description:
      "Agentes que nunca duermen: supervisando procesos, detectando anomalías, y alertando al equipo humano cuando algo requiere atención.",
    gradient: "from-emerald-500/10 to-green-500/5",
  },
];

export default function InsuranceUseCases() {
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
    <section
      id="mercantil"
      ref={sectionRef}
      className="relative py-24 sm:py-32"
    >
      {/* Línea divisora sutil entre secciones */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-merc-blue/30 to-transparent" />

      <div className="mx-auto max-w-6xl px-5">
        {/* Título con gradiente naranja-ámbar en "Mercantil" */}
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Qué haría en{" "}
            <span className="bg-gradient-to-r from-merc-orange to-merc-amber bg-clip-text text-transparent">
              Mercantil
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground text-lg">
            Casos de uso concretos donde la IA genera valor real en seguros.
          </p>
        </div>

        {/* Grid 2x2 de cards con gradiente de fondo que aparece al hover */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {useCases.map((uc, i) => (
            <div
              key={uc.title}
              className={`group relative rounded-2xl bg-merc-dark-card border border-merc-blue/10 p-6 sm:p-8 hover:border-merc-blue/20 transition-all duration-500 hover:-translate-y-0.5 overflow-hidden ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: visible ? `${300 + i * 120}ms` : "0ms",
              }}
            >
              {/* Gradiente de fondo: invisible por defecto, aparece al hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${uc.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              {/* Contenido sobre el gradiente */}
              <div className="relative z-10">
                <div className="inline-flex p-2.5 rounded-xl bg-white/5 text-white mb-4">
                  {uc.icon}
                </div>
                <h3 className="font-display text-xl font-semibold text-white mb-3">
                  {uc.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-[15px]">
                  {uc.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
