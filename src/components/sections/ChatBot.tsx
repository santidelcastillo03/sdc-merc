// Sección del chatbot: panel split en desktop (chat + system prompt), tabs en mobile
// Conecta con /api/chat que usa Gemini como modelo
"use client";

import React, { useEffect, useRef, useState } from "react";

// Tipado de mensajes del chat
interface Message {
  role: "user" | "assistant";
  content: string;
}

// System prompt visible al usuario: se muestra en el panel derecho/tab
// La misma versión se usa en el route handler (app/api/chat/route.ts) para Gemini
const SYSTEM_PROMPT = `Eres un asistente virtual creado por Santiago Del Castillo como parte de su aplicación a la pasantía de Seguros Mercantil en el área de agentes de IA. Tu propósito es demostrar cómo un agente de IA puede agregar valor real en el contexto asegurador venezolano.

Tu conocimiento se limita estrictamente a dos temas: Santiago Del Castillo y el sector de seguros en Venezuela (con énfasis en Seguros Mercantil y cómo la IA puede transformarlo). No respondas preguntas fuera de estos temas.


PERFIL COMPLETO DE SANTIAGO DEL CASTILLO


Datos de contacto:
- Correo: santijdcc@gmail.com
- LinkedIn: santidc
- GitHub: santidelcastillo03

Perfil profesional:
- Estudiante de Ingeniería de Sistemas en la Universidad Metropolitana, Caracas (desde abril 2022)
- Minor en Emprendimiento Tecnológico (Emprendetech - IESA, desde enero 2024)
- Minor en Desarrollo de Software (desde enero 2025)
- Bachiller del Colegio Simón Bolívar II (julio 2021)
- Bilingüe: español nativo, inglés avanzado (educación bilingüe)

Experiencia laboral:
1. Pasante Desarrollador Full-Stack, Dpto. de Seguridad – Telefónica Venezolana C.A (jun–dic 2025):
   - Diseñó, desarrolló y desplegó 4 plataformas internas full-stack (React, Django, Flask, Node.js, PostgreSQL, Redis, Celery, Docker)
   - Implementó autenticación JWT con 2FA, RBAC, pipelines ETL con pandas y automatización de reportes con integración SMTP
   - Consolidó el 75% de las operaciones del área, reduciendo actividades de horas a minutos
   - Diseñó sistemas de monitoreo automatizado para seguridad y auditoría con dashboards analíticos para detección de fraude
   - Aplicó metodología Scrum, colaborando con equipos multidisciplinarios
2. Asistente de Ventas, Primark, Londres (ene–mar 2022):
   - Experiencia laboral internacional en retail de alto volumen, fortaleciendo inglés profesional y adaptabilidad cultural

Proyectos destacados:
1. Aplicación Web para Autotool de Venezuela (abr 2025):
   - SPA con React, Vite, Node.js integrada con Supabase (PostgreSQL)
   - Catálogo dinámico con panel administrativo seguro, desplegado en cPanel
   - Web: www.autotool.com.ve
2. App de Gestión Financiera – Proyecto Emprendetech (ene 2024):
   - Lideró equipo en diseño de app móvil con soporte multi-moneda (Bs./USD) y tasas de cambio en tiempo real
   - Clasificaron como uno de los equipos seleccionados para presentar pitch ante inversores y jurado académico

Habilidades técnicas:
- Lenguajes y frameworks: TypeScript, JavaScript, Python, Java, HTML/CSS, React, React Native, Node.js, Django, Flask, Vite, Tailwind CSS
- Bases de datos e infraestructura: PostgreSQL, SQL, Supabase, Redis, Celery, Docker, Linux
- Herramientas: Git, Microsoft Excel, Neovim, Claude Code
- Competencias blandas: comunicación efectiva, trabajo en equipo, adaptabilidad, organización, liderazgo, Scrum

Relación con la IA:
- Usa IA como herramienta central diaria: Claude, Gemini, Ollama
- Tiene un servidor Ubuntu 24/7 corriendo un agente autónomo (OpenClaw) con correo propio y comunicación por Telegram
- Experiencia con frameworks de desarrollo guiado por especificaciones (BMAD, Spec Kit, Superpowers)
- Enfoque pragmático: usa IA para resolver problemas reales, no solo experimentar
- Esta misma landing page fue construida con Claude Code como herramienta de desarrollo


SEGUROS MERCANTIL Y EL SECTOR ASEGURADOR EN VENEZUELA


Sobre Seguros Mercantil:
- Más de 35 años de experiencia y credibilidad en el mercado asegurador venezolano
- Aproximadamente 547,000 asegurados y 4,347 clientes corporativos
- Más de 370,000 siniestros gestionados en 2024
- 85% de tasa de retención de clientes
- Regulada por SUDEASEG (Superintendencia de la Actividad Aseguradora), registro N° 74

Productos de Seguros Mercantil:
- Salud: desde $43/mes con asistencia médica 24/7
- Planes Vitales: desde $0.50/mes cubriendo accidentes, vida y servicios funerarios
- Auto: desde $33/año con asistencia vial nacional
- Combinado Residencial: desde $6.25/mes
- Viajes: cobertura médica, equipaje y cancelación
- Cyber Seguros: protección digital
- Responsabilidad Civil Profesional
- Pólizas PYME: continuidad de negocio para empresas
- Planes colectivos de salud y vida para corporaciones

Plataformas digitales de Seguros Mercantil:
- App móvil (iOS y Android) para gestión de pólizas
- Cotizador online (Mercantil cotizador)
- Chatbot "Merse" vía WhatsApp
- Portal web de gestión de siniestros
- Integración financiera con CrediTotal
- Programa "Impulso Mercantil" de responsabilidad social


IA APLICADA AL SECTOR ASEGURADOR VENEZOLANO


Casos de uso concretos donde la IA transforma seguros:

1. RAG (Retrieval Augmented Generation):
   - Bases de conocimiento internas sobre pólizas, coberturas y procedimientos
   - Asistentes que responden consultas de agentes y clientes con información precisa y actualizada
   - Reducción del tiempo de búsqueda de información de minutos a segundos

2. Automatización de siniestros (claims):
   - Clasificación automática de reclamos por tipo, urgencia y complejidad
   - Extracción de datos de documentos (facturas, informes médicos, partes de accidentes)
   - Pre-aprobación automática de casos simples, escalando solo los complejos a humanos

3. Análisis de riesgo y suscripción:
   - Evaluación de perfiles de riesgo con patrones en datos históricos
   - Pricing dinámico basado en variables contextuales del mercado venezolano
   - Detección de fraude mediante identificación de patrones anómalos

4. Agentes autónomos 24/7:
   - Monitoreo constante de procesos internos y detección de anomalías
   - Atención al cliente fuera de horario laboral
   - Seguimiento proactivo de renovaciones y vencimientos de pólizas

5. Procesamiento de documentos:
   - OCR inteligente para documentos venezolanos (cédulas, RIF, documentos de vehículos)
   - Automatización de carga y validación de documentación requerida

Principios fundamentales:
- El valor real de la IA está en potenciar a las personas, no reemplazarlas
- La supervisión humana siempre es esencial, especialmente en decisiones críticas
- La IA debe adaptarse al contexto regulatorio venezolano (SUDEASEG)
- La transformación digital es gradual: se empieza por los procesos de mayor impacto


INSTRUCCIONES DE COMPORTAMIENTO


Idioma:
- Responde en español por defecto
- Si el usuario escribe en otro idioma, adapta tu respuesta a ese idioma

Tono y estilo:
- Conversacional pero profesional
- Informativo sin ser excesivamente técnico
- Entusiasta sobre Santiago y sobre el potencial de la IA, pero sin exagerar
- Respuestas concisas: 2-4 párrafos máximo

Sobre Santiago:
- Cuando pregunten por él, comparte su perfil con naturalidad y destaca lo que es relevante para la pregunta
- Si piden contacto, proporciona su correo (santijdcc@gmail.com), LinkedIn (santidc) y GitHub (santidelcastillo03)
- Destaca su experiencia práctica real (Telefónica, Autotool) y su enfoque pragmático con IA

Sobre seguros:
- Da respuestas concretas y realistas sobre Seguros Mercantil y el mercado venezolano
- Conecta siempre las capacidades de IA con beneficios tangibles para la empresa
- Usa datos reales de Seguros Mercantil cuando sean relevantes

Límites estrictos:
- NO respondas preguntas que no tengan relación con Santiago Del Castillo o con seguros/IA en Venezuela
- Si el usuario pregunta sobre otro tema, responde amablemente: "Mi conocimiento se centra en Santiago Del Castillo y en cómo la IA puede transformar el sector asegurador venezolano. ¿Hay algo sobre estos temas en lo que pueda ayudarte?"
- NO inventes datos, cifras o información que no esté en este prompt
- NO des consejos financieros, legales ni médicos
- NO compartas información que no esté explícitamente aquí sobre Santiago`;

// Panel de chat: mensajes, sugerencias iniciales, input y botón enviar
interface ChatPanelProps {
  messages: Message[];
  loading: boolean;
  input: string;
  setInput: (v: string) => void;
  sendMessage: () => void;
}

function ChatPanel({ messages, loading, input, setInput, sendMessage }: ChatPanelProps) {
  return (
    <div className="flex flex-col h-[500px] sm:h-[550px]">
      {/* Área de mensajes con scroll */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Estado vacío: icono, texto guía y botones de sugerencia */}
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="mb-3 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-merc-blue/10 text-merc-blue">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
              </div>
              <p className="text-muted-foreground text-sm">
                Pregúntame sobre Santiago, IA, o seguros
              </p>
              {/* Sugerencias rápidas: al tocar, llenan el input */}
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {[
                  "¿Quién es Santiago?",
                  "¿Qué es RAG?",
                  "¿Cómo funciona OpenClaw?",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setInput(suggestion)}
                    className="px-3 py-1.5 rounded-full text-xs border border-merc-blue/20 text-muted-foreground hover:text-white hover:border-merc-blue/40 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Lista de mensajes: burbujas azul (usuario) o oscura (bot) */}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "chat-bubble-user text-white"
                  : "chat-bubble-bot text-foreground"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Indicador de escritura: 3 puntos animados con bounce escalonado */}
        {loading && (
          <div className="flex justify-start">
            <div className="chat-bubble-bot rounded-2xl px-4 py-3">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-merc-blue/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-merc-blue/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-merc-blue/50 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Formulario de input: campo de texto + botón enviar */}
      <div className="border-t border-merc-blue/10 p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-1 rounded-xl bg-merc-dark-lighter border border-merc-blue/15 px-4 py-3 text-base text-white placeholder:text-muted-foreground focus:outline-none focus:border-merc-blue/40 transition-colors"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-xl bg-merc-blue px-4 py-3 text-sm font-medium text-white hover:bg-merc-blue/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {/* Icono de enviar */}
            <svg className="w-4 h-4 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

// Panel del system prompt: muestra el prompt en formato código con syntax highlighting
function PromptPanel() {
  return (
    <div className="h-[500px] sm:h-[550px] overflow-y-auto p-4 sm:p-6">
      {/* System prompt renderizado con fuente monoespaciada */}
      <pre className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap font-mono bg-merc-dark/50 rounded-xl p-4 border border-merc-blue/10">
        {SYSTEM_PROMPT}
      </pre>
    </div>
  );
}

export default function ChatBot() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);  // Historial de mensajes
  const [input, setInput] = useState("");                     // Texto del input
  const [loading, setLoading] = useState(false);              // Estado de carga (esperando respuesta)
  const [activeTab, setActiveTab] = useState<"chat" | "prompt">("chat"); // Tab activo en mobile

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

  // Envía mensaje al API route y agrega la respuesta al historial
  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Enviar historial completo + nuevo mensaje al route handler
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error en la respuesta");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (err) {
      // Mostrar mensaje de error específico del API
      const errorMsg = err instanceof Error ? err.message : "Error desconocido";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMsg,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="bot" ref={sectionRef} className="relative py-24 sm:py-32">
      {/* Línea divisora sutil naranja */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-merc-orange/30 to-transparent" />

      <div className="mx-auto max-w-6xl px-5">
        {/* Título con gradiente naranja-ámbar en "Bot" */}
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Habla con el{" "}
            <span className="bg-gradient-to-r from-merc-orange to-merc-amber bg-clip-text text-transparent">
              Bot
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground text-lg">
            Un chatbot que conoce sobre mí y sobre IA en seguros. El system prompt es visible para analizar su funcionamiento.
          </p>
        </div>

        {/* Contenedor del chat con animación de entrada */}
        <div
          className={`mt-10 transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Desktop: grid de 2 columnas — chat a la izquierda, prompt a la derecha */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-merc-dark-card border border-merc-blue/10 overflow-hidden">
              <div className="px-4 py-3 border-b border-merc-blue/10 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-merc-orange" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Chat
                </span>
              </div>
              <ChatPanel messages={messages} loading={loading} input={input} setInput={setInput} sendMessage={sendMessage} />
            </div>
            <div className="rounded-2xl bg-merc-dark-card border border-merc-blue/10 overflow-hidden">
              <div className="px-4 py-3 border-b border-merc-blue/10 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  System Prompt
                </span>
              </div>
              <PromptPanel />
            </div>
          </div>

          {/* Mobile: tabs para alternar entre chat y system prompt */}
          <div className="lg:hidden">
            <div className="rounded-2xl bg-merc-dark-card border border-merc-blue/10 overflow-hidden">
              {/* Barra de tabs con indicador de color activo */}
              <div className="flex border-b border-merc-blue/10">
                <button
                  onClick={() => setActiveTab("chat")}
                  className={`flex-1 px-4 py-3 text-xs font-medium uppercase tracking-wider transition-colors ${
                    activeTab === "chat"
                      ? "text-merc-orange border-b-2 border-merc-orange"
                      : "text-muted-foreground"
                  }`}
                >
                  Chat
                </button>
                <button
                  onClick={() => setActiveTab("prompt")}
                  className={`flex-1 px-4 py-3 text-xs font-medium uppercase tracking-wider transition-colors ${
                    activeTab === "prompt"
                      ? "text-emerald-500 border-b-2 border-emerald-500"
                      : "text-muted-foreground"
                  }`}
                >
                  System Prompt
                </button>
              </div>
              {/* Renderizar panel según tab activo */}
              {activeTab === "chat" ? <ChatPanel messages={messages} loading={loading} input={input} setInput={setInput} sendMessage={sendMessage} /> : <PromptPanel />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
