# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Turbopack) at localhost:3000
npm run build    # Production build — use to verify no errors
npm run lint     # ESLint with Next.js + TypeScript rules
npm run start    # Start production server (requires build first)
```

## Architecture

Single-page landing page built with **Next.js 16 (App Router)** + **TypeScript** + **Tailwind CSS 4** + **shadcn/ui**.

### Page composition

`app/page.tsx` composes all sections in order: Navbar → Hero → AIPotential → AIStack → InsuranceUseCases → ChatBot → Footer. Each section is a `"use client"` component in `components/sections/`.

### Chatbot

- **API route**: `app/api/chat/route.ts` — POST handler calling Google Gemini 2.0 Flash
- **Frontend**: `components/sections/ChatBot.tsx` — split panel on desktop (chat + system prompt), tabs on mobile
- **System prompt** is defined in both the API route and the ChatBot component (displayed to users for transparency)
- Requires `GEMINI_API_KEY` in `.env.local`

### Styling

- **Always dark mode** — `<html className="dark">` hardcoded in layout
- **Custom colors**: `merc-blue` (#003392), `merc-orange` (#fb5401), `merc-amber` (#f9a421), `merc-dark` (#020B1F), `merc-dark-card`, `merc-dark-lighter` — defined in `globals.css` as CSS variables and Tailwind theme tokens
- **Fonts**: Syne (display/headings via `font-display`) + Plus Jakarta Sans (body via `font-sans`) loaded through `next/font/google`
- **Animations**: Custom keyframes in `globals.css` (gradient-mesh, reveal-up, blink). Scroll-triggered via IntersectionObserver in each section component
- **No emojis** — all icons are inline SVGs

### Key conventions

- Path alias: `@/*` maps to `./src/*`
- shadcn components in `components/ui/` — use `npx shadcn@latest add <component>` to add new ones
- Tailwind dynamic class names don't work (JIT) — always use static full class strings
- Language is Spanish throughout (content, metadata, system prompt)
