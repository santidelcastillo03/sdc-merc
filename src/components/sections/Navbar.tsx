// Navbar fija con efecto blur al hacer scroll y menú hamburguesa en mobile
"use client";

import { useState, useEffect } from "react";

// Links de navegación: apuntan a los IDs de cada sección para smooth scroll
const navLinks = [
  { label: "IA", href: "#potencial", highlight: false },
  { label: "Stack", href: "#stack", highlight: false },
  { label: "Mercantil", href: "#mercantil", highlight: false },
  { label: "Bot", href: "#bot", highlight: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);    // Detecta si se hizo scroll para cambiar estilo
  const [mobileOpen, setMobileOpen] = useState(false); // Controla el menú mobile

  // Listener de scroll para activar fondo con blur después de 40px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        mobileOpen
          ? "bg-merc-dark border-b border-merc-blue/10"
          : scrolled
          ? "bg-merc-dark/80 backdrop-blur-xl border-b border-merc-blue/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-5 py-4">
        {/* Logo: iniciales con punto naranja */}
        <a
          href="#hero"
          className="font-display text-lg font-bold tracking-tight text-white"
        >
          SDC<span className="text-merc-orange">.</span>
        </a>

        {/* Links de escritorio: ocultos en mobile */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors duration-200 ${
                link.highlight
                  ? "bg-gradient-to-r from-merc-orange via-merc-amber to-merc-orange bg-clip-text text-transparent font-semibold"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Botón hamburguesa: 3 líneas que se animan en X al abrir, con color naranja cuando está abierto */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-[5px] p-2 -mr-1 rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Menu"
        >
          <span
            className={`block h-px transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
              mobileOpen
                ? "w-5 bg-merc-orange rotate-45 translate-y-[6px]"
                : "w-5 bg-white"
            }`}
          />
          <span
            className={`block h-px bg-white transition-all duration-200 ${
              mobileOpen ? "w-0 opacity-0" : "w-3.5 opacity-100"
            }`}
          />
          <span
            className={`block h-px transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
              mobileOpen
                ? "w-5 bg-merc-orange -rotate-45 -translate-y-[6px]"
                : "w-5 bg-white"
            }`}
          />
        </button>
      </div>

      {/* Menú desplegable mobile: panel con efecto slide + stagger por link */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-merc-dark border-b border-merc-blue/10 px-5 py-3">
          {/* Línea decorativa superior */}
          <div className="w-full h-px bg-gradient-to-r from-merc-orange/30 via-merc-blue/20 to-transparent mb-3" />

          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between py-3 text-sm border-b border-merc-blue/5 last:border-0 transition-all duration-200 group ${
                link.highlight ? "" : "text-muted-foreground hover:text-white"
              }`}
              style={{
                // Stagger en la aparición de cada link
                transitionDelay: mobileOpen ? `${i * 40}ms` : "0ms",
              }}
            >
              {/* Label con gradiente para Bot, texto normal para el resto */}
              {link.highlight ? (
                <span className="bg-gradient-to-r from-merc-orange via-merc-amber to-merc-orange bg-clip-text text-transparent font-semibold">
                  {link.label}
                </span>
              ) : (
                <span>{link.label}</span>
              )}

              {/* Flecha sutil a la derecha */}
              <svg
                className={`w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 ${
                  link.highlight ? "text-merc-orange" : "text-merc-blue/30 group-hover:text-merc-blue/60"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
