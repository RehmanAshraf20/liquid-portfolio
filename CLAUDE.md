# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Portfolio site for Rehman Ashraf (Software Engineer). It is a streaming-style portfolio in the spirit of stellar.rip: the site should feel like a media/streaming app (glass panels, blur, soft borders, smooth transitions), with portfolio content presented the way such an app presents its catalogue.

## Structure

Single page, no router. `App.jsx` renders `NavBar`, `Hero`, then `Projects`, `Experience`, `Skills`, `Credentials` and `Contact` (all in `src/components/`). The nav links are in-page anchors to the section ids.

- All content lives in `src/data/portfolio.js` and comes from the CV in `ref/`. Change text there, not in components. Don't invent facts, links or dates that aren't in the CV. The phone number is deliberately left off the site.
- `Projects` is a horizontal shelf of poster cards (generated gradient art from each project's `colors` and `icon`, with a glass plate on top). Clicking a card opens `ProjectDetail`, a glass dialog (closes on X, Escape or backdrop click), and tints the ambient background with the project's colors through `onTint`.
- `Hero` has a "Now playing" glass card showing `experience[0]`, so keep the current role first in that list.
- Section headers use `SectionHeading` (cyan eyebrow, accent bar, 40px semibold title); `Eyebrow` and `Chip` are exported from the same file.

## Stack

React 19, Vite 8, Tailwind CSS v4 (`@tailwindcss/vite`) and framer-motion 13. Plain JavaScript (JSX), no TypeScript. No router, no icon library (use inline SVGs).

## Commands

```
npm run dev       # Vite dev server with HMR
npm run build     # production build to dist/
npm run preview   # serve the production build
npm run lint      # ESLint over the whole project
```

There is no test runner and there are no tests.

## Design system

The design foundation is ported from the Waveform audio player (`../audio-player/audio-player`). That project is a read-only reference: never edit, move or delete anything in it.

New UI must always use the pieces below; don't hand-write equivalents.

- Tailwind v4 via the `@tailwindcss/vite` plugin; no `tailwind.config.js` or PostCSS config. Tokens live in `src/index.css`: `--font-sans` (Inter), `--color-accent` (cyan, `text-accent`), `--color-night` (page background, `bg-night`) and `--gutter` (page side padding, used as `px-[var(--gutter)]`; card rows bleed right with `-mr-[var(--gutter)]`; it drops to 1.25rem on phones).
- Font: Inter, loaded from Google Fonts in `index.html` (weights 400–700). Counters and rank tags use `font-mono`.
- Background: `src/components/AmbientBackground.jsx`, rendered once in `App.jsx`. Near-black navy with a starfield and faint drifting blobs. The optional `colors` prop (four CSS colors) retints the blobs with a cross-fade. Don't add page-level backgrounds elsewhere. Content above it needs `relative z-10`.
- Surfaces: `src/components/GlassPanel.jsx`. Use `<GlassPanel className="...">`; pass `as={motion.div}` (or `"section"`, `motion.button`, ...) to change the element, and all other props are forwarded. It owns the blur, border, glow and resting shadow. The default is clear "ice" glass (near-zero blur, edge refraction, bright rim); `clear={false}` gives the frosted surface.
- Motion: `src/lib/motion.js`. `springs` (snappy, smooth, bouncy); `interactive` / `interactiveGlass` / `interactiveCard` for hover + tap (pick the one matching the element's resting shadow); `entrance` on a section with `staggerItem` on its children, or `fadeUp` for a lone element; `fade` + `pop` for overlays and dialogs; `useTilt()` for cards. Don't write inline spring values or one-off hover/tap objects.

## How to work with me

- Keep responses short: no explanations unless I ask.
- Edit only what's needed; never rewrite whole files.
- `ref/` (the source CV) is git-ignored on purpose; never commit it.
