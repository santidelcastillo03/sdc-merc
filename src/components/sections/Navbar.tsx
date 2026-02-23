// Navbar fija con efecto blur al hacer scroll y menú hamburguesa en mobile
"use client";

import { useState, useEffect } from "react";

// Links de navegación: apuntan a los IDs de cada sección para smooth scroll
const navLinks = [
  { label: "IA", href: "#potencial" },
  { label: "Stack", href: "#stack" },
  { label: "Mercantil", href: "#mercantil" },
  { label: "Bot", href: "#bot" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);   // Detecta si se hizo scroll para cambiar estilo
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
        scrolled
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
              className="text-sm text-muted-foreground hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Botón hamburguesa para mobile: 3 líneas que se animan en X al abrir */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-1"
          aria-label="Menu"
        >
          <span
            className={`block w-5 h-0.5 bg-white transition-transform duration-200 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-white transition-opacity duration-200 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-white transition-transform duration-200 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Menú desplegable mobile: se cierra al tocar un link */}
      {mobileOpen && (
        <div className="md:hidden bg-merc-dark/95 backdrop-blur-xl border-b border-merc-blue/10 px-5 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm text-muted-foreground hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
