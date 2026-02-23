import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Tipografía display para títulos y headings
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

// Tipografía body para texto general
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

// Metadata SEO y Open Graph para compartir en redes
export const metadata: Metadata = {
  title: "Santiago Del Castillo — Pasantía Seguros Mercantil",
  description:
    "Landing page interactiva sobre IA aplicada a seguros. Pasantía en creación de agentes de IA para Seguros Mercantil.",
  openGraph: {
    title: "Santiago Del Castillo — IA + Seguros Mercantil",
    description:
      "Demostración de conocimiento técnico, creatividad y visión sobre IA en la industria aseguradora.",
    type: "website",
  },
};

// Layout raíz: envuelve toda la app con las fuentes y modo oscuro forzado
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${syne.variable} ${jakarta.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
