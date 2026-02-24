# Santiago Del Castillo — Pasantia Seguros Mercantil

Landing page interactiva creada como entregable praa la pasantia en **Seguros Mercantil**.

La pagina demuestra conocimiento tecnico, creatividad y vision sobre como la inteligencia artificial puede generar valor real en la industria aseguradora venezolana.

**[Ver en vivo →](https://sdc-sm.vercel.app)**

---

## Que incluye

- **Hero** con fondo gradient mesh animado y presentacion personal
- **El potencial de la IA** — vision equilibrada: que puede hacer, que no puede, y donde esta el valor real
- **Mi stack de IA** — las herramientas que uso a diario (Claude, Gemini, OpenClaw+Ollama, frameworks de desarrollo)
- **Que haria en Mercantil** — casos de uso concretos: RAG de polizas, automatizacion de reclamos, analisis de riesgo, monitoreo 24/7
- **Chatbot funcional** conectado a Gemini API — con el system prompt visible para transparencia total
- **Footer** con links de contacto

## Stack

| Tecnologia | Uso |
|---|---|
| Next.js 16 (App Router) | Framework principal |
| TypeScript | Tipado estatico |
| Tailwind CSS 4 | Estilos y tema custom |
| shadcn/ui | Componentes base |
| Google Gemini API | Chatbot (gemini-3-flash-preview) |
| Vercel | Deploy |

## Ejecutar localmente

```bash
# Clonar el repositorio
git clone https://github.com/santidelcastillo03/sdc-merc.git
cd sdc-merc

# Instalar dependencias
npm install

# Configurar la API key de Gemini
cp .env.local.example .env.local
# Editar .env.local con tu GEMINI_API_KEY

# Iniciar servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Variables de entorno

| Variable | Descripcion |
|---|---|
| `GEMINI_API_KEY` | API key de Google Gemini (requerida para el chatbot) |

## Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx          # Layout global (fuentes, metadata, dark mode)
│   ├── page.tsx            # Composicion de todas las secciones
│   ├── globals.css         # Tema custom, animaciones, variables CSS
│   └── api/chat/route.ts   # Route handler para Gemini API
├── components/
│   ├── sections/           # Secciones de la landing page
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── AIPotential.tsx
│   │   ├── AIStack.tsx
│   │   ├── InsuranceUseCases.tsx
│   │   ├── ChatBot.tsx
│   │   └── Footer.tsx
│   └── ui/                 # Componentes shadcn/ui
└── lib/utils.ts            # Utilidad cn() para clases
```

## Chatbot

El chatbot usa Gemini 3 Flash Preview y tiene un system prompt hibrido que conoce sobre:

- **Santiago Del Castillo** — perfil profesional, experiencia, habilidades, proyectos
- **Seguros Mercantil** — datos de la empresa, productos, plataformas digitales
- **IA en seguros** — casos de uso concretos, principios, vision

El system prompt esta visible en la pagina (panel derecho en desktop, tab en mobile) para demostrar transparencia sobre como funciona el agente.

## Contacto

- **Email:** santijdcc@gmail.com
- **LinkedIn:** [santidc](https://www.linkedin.com/in/santidc/)
- **GitHub:** [santidelcastillo03](https://github.com/santidelcastillo03)
