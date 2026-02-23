// Route handler POST /api/chat — conecta el chatbot del frontend con la API de Gemini
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// System prompt: define la personalidad del bot (conoce sobre Santiago y sobre IA en seguros)
// Se duplica en ChatBot.tsx para mostrarlo al usuario en el panel de "System Prompt"
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

export async function POST(req: NextRequest) {
  try {
    // Leer API key del entorno (configurada en .env.local)
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY no configurada" },
        { status: 500 }
      );
    }

    // Extraer el historial de mensajes del body
    const { messages } = await req.json();

    // Inicializar el cliente de Gemini con el modelo flash (rápido y económico)
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      // System instruction como objeto Content (requerido por gemini-3)
      systemInstruction: {
        role: "user",
        parts: [{ text: SYSTEM_PROMPT }],
      },
    });

    // Crear sesión de chat con historial previo (sin el último mensaje)
    // Gemini usa "model" en vez de "assistant" para los mensajes del bot
    const chat = model.startChat({
      history: messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })),
    });

    // Enviar el último mensaje del usuario y obtener respuesta
    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const response = result.response.text();

    return NextResponse.json({ response });
  } catch (error: unknown) {
    console.error("Gemini API error:", error);
    // Detectar rate limiting para mostrar mensaje amigable
    const statusCode = (error as { status?: number })?.status;
    if (statusCode === 429) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Espera unos segundos e intenta de nuevo." },
        { status: 429 }
      );
    }
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
