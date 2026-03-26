@AGENTS.md

## Design System
Always read DESIGN.md before making any visual or UI decisions.
All font choices, colors, spacing, and aesthetic direction are defined there.
Do not deviate without explicit user approval.

## Project Info
- Poetry/blog website for a non-technical client
- Stack: Next.js 15 + Tailwind CSS v4 + Sanity v3 (headless CMS)
- Color tokens in `src/app/globals.css` — change CSS custom properties to re-theme
- Placeholder data in `src/lib/placeholder-data.ts` — used when Sanity project ID is not configured
- Sanity config needs real project ID in `.env.local` (see `.env.example`)
