// Sección "Qué haría en Mercantil": 4 casos de uso concretos de IA en seguros
"use client";

import { useEffect, useRef, useState } from "react";

// Casos de uso: cada uno con banda de color de encabezado estilo expediente
const useCases = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: "RAG de pólizas",
    description:
      "Base de conocimiento inteligente: cualquier empleado pregunta en lenguaje natural y obtiene respuestas precisas sobre pólizas, procedimientos y coberturas.",
    caseNumber: "01",
    headerBg: "bg-gradient-to-r from-blue-600/15 to-merc-blue/5",
    headerBorder: "border-merc-blue/15",
    headerText: "text-blue-300/60",
    iconColor: "text-blue-300/60",
    hoverGradient: "from-blue-500/8 to-transparent",
    hoverBorder: "hover:border-merc-blue/20",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: "Automatización de reclamos",
    description:
      "Clasificación automática de reclamos, extracción de datos de documentos, y enrutamiento inteligente. ",
    caseNumber: "02",
    headerBg: "bg-gradient-to-r from-merc-orange/15 to-orange-500/5",
    headerBorder: "border-merc-orange/15",
    headerText: "text-merc-orange/60",
    iconColor: "text-merc-orange/60",
    hoverGradient: "from-merc-orange/8 to-transparent",
    hoverBorder: "hover:border-merc-orange/20",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Análisis de riesgo",
    description:
      "Evaluación de perfiles con IA que detecta patrones en datos históricos, complementando el juicio del analista con insights basados en datos.",
    caseNumber: "03",
    headerBg: "bg-gradient-to-r from-merc-amber/15 to-yellow-500/5",
    headerBorder: "border-merc-amber/15",
    headerText: "text-merc-amber/60",
    iconColor: "text-merc-amber/60",
    hoverGradient: "from-merc-amber/8 to-transparent",
    hoverBorder: "hover:border-merc-amber/20",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: "Monitoreo 24/7",
    description:
      "Agentes que nunca duermen: supervisando procesos, detectando anomalías, y alertando al equipo humano cuando algo requiere atención.",
    caseNumber: "04",
    headerBg: "bg-gradient-to-r from-emerald-500/15 to-green-500/5",
    headerBorder: "border-emerald-500/15",
    headerText: "text-emerald-400/60",
    iconColor: "text-emerald-400/60",
    hoverGradient: "from-emerald-500/8 to-transparent",
    hoverBorder: "hover:border-emerald-500/20",
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
            ¿Qué podría hacer en{" "}
            <span className="bg-gradient-to-r from-merc-orange to-merc-amber bg-clip-text text-transparent">
              Seguros Mercantil
            </span>?
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground text-lg">
            Casos de uso concretos donde la IA genera valor real en seguros.
          </p>
        </div>

        {/* Grid 2x2: cards estilo expediente con banda de color superior */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {useCases.map((uc, i) => (
            <div
              key={uc.title}
              className={`group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-merc-dark-card ${uc.hoverBorder} transition-all duration-500 hover:-translate-y-0.5 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: visible ? `${300 + i * 120}ms` : "0ms",
              }}
            >
              {/* Banda de encabezado con número de caso e icono */}
              <div
                className={`flex items-center justify-between px-5 py-3 border-b ${uc.headerBorder} ${uc.headerBg}`}
              >
                <span
                  className={`font-mono text-[10px] font-semibold uppercase tracking-[0.22em] ${uc.headerText}`}
                >
                  Caso {uc.caseNumber}
                </span>
                <span className={uc.iconColor}>{uc.icon}</span>
              </div>

              {/* Contenido de la card */}
              <div className="relative p-5 sm:p-6 overflow-hidden">
                {/* Gradiente de hover que emerge desde la esquina superior izquierda */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${uc.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />
                <div className="relative">
                  <h3 className="font-display text-xl font-semibold text-white mb-3">
                    {uc.title}
                  </h3>
                  <p className="text-muted-foreground text-[15px] leading-relaxed">
                    {uc.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Card "Quiero aprender" — ancho completo, mismo estilo que las otras */}
          <div
            className={`group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-merc-dark-card sm:col-span-2 hover:border-violet-500/20 transition-all duration-500 hover:-translate-y-0.5 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: visible ? "780ms" : "0ms" }}
          >
            {/* Header band: mismo patrón que las demás cards */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-violet-500/15 bg-gradient-to-r from-violet-500/15 to-violet-500/5">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-400/60">
                Objetivo Principal
              </span>
              <span className="text-violet-400/60">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </span>
            </div>

            {/* Contenido */}
            <div className="relative p-5 sm:p-6 overflow-hidden">
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative sm:flex sm:items-start sm:gap-8">
                <div className="sm:flex-1">
                  <h3 className="font-display text-xl font-semibold text-white mb-3">
                    
                    <span className="bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 bg-clip-text text-transparent"> 
                      Aprender
                    </span>
                    
                  </h3>
                  <p className="text-muted-foreground text-[15px] leading-relaxed">
                    Los casos de uso son ideas, no certezas. Lo que sí sé es que Seguros Mercantil tiene décadas de conocimiento del negocio que yo no tengo y eso me interesa tanto como la IA. Una pasantía para mí no es solo ejecutar, es entender cómo funciona una aseguradora por dentro, qué problemas son reales, y desarrollar el criterio para construir soluciones que de verdad tengan sentido.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
