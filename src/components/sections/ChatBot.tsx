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
const SYSTEM_PROMPT = `Eres un asistente creado por Santiago Del Castillo para su aplicación a la pasantía de Seguros Mercantil en el área de agentes de IA.

SOBRE SANTIAGO:
- Estudiante venezolano apasionado por la IA aplicada
- Usa IA como herramienta central todos los días: Claude, Gemini, Ollama
- Tiene un servidor Ubuntu 24/7 corriendo un agente autónomo (OpenClaw) con correo propio y comunicación por Telegram
- Experiencia con frameworks de desarrollo guiado por especificaciones (BMAD, Spec Kit, Superpowers)
- Enfoque pragmático: usa IA para resolver problemas reales, no solo experimentar
- Esta misma landing page fue construida con asistencia de IA (Claude Code)

SOBRE SEGUROS MERCANTIL Y IA:
- La IA puede transformar la industria aseguradora en áreas como:
  * RAG (Retrieval Augmented Generation): bases de conocimiento sobre pólizas y procedimientos
  * Automatización de claims: clasificación y procesamiento de reclamos
  * Análisis de riesgo: evaluación de perfiles con patrones en datos históricos
  * Agentes 24/7: monitoreo constante de procesos y detección de anomalías
- El valor real está en potenciar a las personas, no reemplazarlas
- La supervisión humana siempre es esencial

INSTRUCCIONES:
- Responde en español por defecto, pero adapta al idioma del usuario si escribe en otro idioma
- Sé conversacional pero informativo
- Si preguntan por Santiago, comparte su perfil con entusiasmo pero sin exagerar
- Si preguntan sobre seguros e IA, da respuestas concretas y realistas
- Mantén respuestas concisas (2-4 párrafos máximo)
- Puedes usar un tono ligeramente informal pero siempre profesional`;

// Panel de chat: mensajes, sugerencias iniciales, input y botón enviar
interface ChatPanelProps {
  messages: Message[];
  loading: boolean;
  input: string;
  setInput: (v: string) => void;
  sendMessage: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

function ChatPanel({ messages, loading, input, setInput, sendMessage, messagesEndRef }: ChatPanelProps) {
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
        {/* Elemento invisible para auto-scroll */}
        <div ref={messagesEndRef} />
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
            className="flex-1 rounded-xl bg-merc-dark-lighter border border-merc-blue/15 px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-merc-blue/40 transition-colors"
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
      {/* Indicador verde de "activo" */}
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
          System Prompt
        </span>
      </div>
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
  const messagesEndRef = useRef<HTMLDivElement>(null);        // Ref para auto-scroll al último mensaje

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

  // Auto-scroll al final cuando llegan nuevos mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
              <ChatPanel messages={messages} loading={loading} input={input} setInput={setInput} sendMessage={sendMessage} messagesEndRef={messagesEndRef} />
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
              {activeTab === "chat" ? <ChatPanel messages={messages} loading={loading} input={input} setInput={setInput} sendMessage={sendMessage} messagesEndRef={messagesEndRef} /> : <PromptPanel />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
