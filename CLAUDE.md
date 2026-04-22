# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev          # Start dev server (Turbopack) on port 3000
npm run build        # Production build
npm run lint         # ESLint

# Docker
docker compose up --build    # Build and run in container (port 3000)
docker compose up -d         # Run detached
```

## Architecture

This is a **portfolio website that reproduces the macOS desktop interface**, built with Next.js 16 (App Router), TypeScript, and Tailwind CSS v4.

### Single-page app, no routing

The entire experience lives on `/`. There are no routes — "apps" open as draggable/resizable windows managed via client-side state. `src/app/page.tsx` renders `<Desktop />` and nothing else.

### Key architectural layers

- **`src/hooks/useWindowManager.ts`** — Central state via `useReducer`. Manages open/close/focus/minimize/maximize/position/size for all windows. Every interactive component depends on this hook. Z-index stacking is handled by incrementing on focus.

- **`src/components/Desktop.tsx`** — Top-level orchestrator. Consumes `useWindowManager`, renders `MenuBar`, all `Window` instances, and `Dock`. This is the wiring layer.

- **`src/components/Window.tsx`** — Generic window wrapper using `react-rnd` (dynamically imported with `ssr: false` to avoid hydration errors). Renders traffic light buttons + title bar + children content.

- **`src/apps/`** — Each file is the content of one "application" (AboutMe, Projects, Terminal, Safari, Mail). These are pure content components — they don't know about window management. Adding a new app means: create a file in `src/apps/`, add its `AppId` to `src/types/index.ts`, add window config in `useWindowManager`, add to `appComponents` map in `Desktop.tsx`, and add a dock entry in `Dock.tsx`.

### Important patterns

- All components below `Desktop` are `"use client"` — the entire UI is interactive.
- `react-rnd` **must** be dynamically imported (`next/dynamic` with `ssr: false`). Direct imports will cause SSR crashes.
- `next.config.ts` uses `output: "standalone"` for the Docker multi-stage build.
- Wallpaper is set via `bg-[url('/wallpaper.jpg')]` on Desktop with a CSS gradient fallback.
