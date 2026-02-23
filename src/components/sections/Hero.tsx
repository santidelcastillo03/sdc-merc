// Hero: sección principal con nombre, frase gancho y fondo animado gradient mesh
"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  // Se activa al montar para disparar las animaciones de entrada escalonadas
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Fondo: gradiente mesh animado con colores Mercantil */}
      <div className="absolute inset-0 gradient-mesh" />
      {/* Capa de ruido sutil para textura visual */}
      <div className="absolute inset-0 noise" />

      {/* Líneas de grid decorativas muy tenues */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center">
        {/* Badge superior: contexto de la pasantía (delay 200ms) */}
        <div
          className={`transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase border border-merc-blue/30 text-merc-blue bg-merc-blue/5">
            Pasantía 2025 &mdash; Agentes de IA
          </span>
        </div>

        {/* Nombre con gradiente naranja-ámbar en "Del Castillo" (delay 400ms) */}
        <h1
          className={`mt-8 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] transition-all duration-700 delay-400 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-white">Santiago</span>
          <br />
          <span className="bg-gradient-to-r from-merc-orange via-merc-amber to-merc-orange bg-clip-text text-transparent">
            Del Castillo
          </span>
        </h1>

        {/* Frase gancho (delay 600ms) */}
        <p
          className={`mt-6 max-w-xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed transition-all duration-700 delay-600 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Construyo con IA todos los días. Quiero llevar eso a{" "}
          <span className="text-white font-semibold">Seguros Mercantil</span>.
        </p>

        {/* CTA para hacer scroll a la siguiente sección (delay 800ms) */}
        <div
          className={`mt-12 transition-all duration-700 delay-[800ms] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="#potencial"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors group"
          >
            <span>Descubre cómo veo la IA</span>
            {/* Flecha con animación bounce */}
            <svg
              className="w-4 h-4 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Degradado inferior: transición suave al fondo oscuro de la siguiente sección */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-merc-dark to-transparent" />
    </section>
  );
}
