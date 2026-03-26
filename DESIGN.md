# Design System — Ink & Earth

## Product Context
- **What this is:** A poetry and literary blog website with CMS-powered content management
- **Who it's for:** A non-technical poet who needs a visual dashboard to write, edit, and publish poems, blog posts, events, and publications
- **Space/industry:** Literary / poetry / personal creative website
- **Project type:** Editorial / blog site (SSG with headless CMS)

## Aesthetic Direction
- **Direction:** Organic/Natural
- **Decoration level:** Intentional — subtle paper-like texture on backgrounds, thin decorative dividers between sections (not harsh lines). The poems are the decoration.
- **Mood:** Like opening a handcrafted letterpress journal. Quiet, warm, literary, handcrafted. Every choice points the same direction: the words are the star.

## Typography
- **Display/Poems:** Cormorant Garamond — elegant transitional serif with beautiful italics. Literary without being stuffy. This is the soul of the site.
- **Body/UI:** Source Sans 3 — clean, readable, warm humanist sans-serif. Disappears so the content shines.
- **Labels/Nav:** Cormorant SC (small caps) — typographic sophistication for navigation, section headers, meta text. Unusual for nav, gives the site its own face.
- **Loading:** Google Fonts CDN
  ```
  Cormorant Garamond: 300, 300i, 400, 400i, 500, 600, 700
  Cormorant SC: 300, 400, 500, 600, 700
  Source Sans 3: 300, 400, 500, 600, 700 + italics
  ```
- **Scale:**
  - Hero/Site name: clamp(48px, 8vw, 80px) — Cormorant Garamond 300
  - Poem title: 32px — Cormorant Garamond 400 italic
  - Poem body: 22px — Cormorant Garamond 300, line-height 2.0
  - Page heading: 36px — Cormorant Garamond 400
  - Card title: 24px — Cormorant Garamond 400
  - Body text: 17px — Source Sans 3 400, line-height 1.7
  - Small body: 15px — Source Sans 3 400
  - Nav/Labels: 13px — Cormorant SC, letter-spacing 0.2em
  - Meta/Tags: 12px — Cormorant SC, letter-spacing 0.15em

## Color
- **Approach:** Restrained — one accent (sage) + warm neutrals. Color is rare and meaningful.
- **Tokens:**
  ```css
  :root {
    --color-cream:        #FAF7F2;    /* page background */
    --color-warm-white:   #FFFDF9;    /* card/section backgrounds */
    --color-parchment:    #F0EBE1;    /* subtle borders, dividers */
    --color-sage:         #8B9E7C;    /* primary accent — buttons, links, highlights */
    --color-sage-dark:    #6B7F5E;    /* hover states */
    --color-sage-light:   #A8B89C;    /* light accent variant */
    --color-terracotta:   #C4785B;    /* secondary accent — tags, decorative elements */
    --color-terracotta-dark: #A8623E; /* secondary hover */
    --color-charcoal:     #2C2C2C;    /* primary text */
    --color-stone:        #6B6560;    /* secondary text, muted copy */
    --color-fog:          #D4CFC7;    /* disabled states, light borders */
  }
  ```
- **Dark mode strategy:** Reduce saturation ~10%, warm dark backgrounds (not pure black), accent colors shift lighter.
  ```css
  [data-theme="dark"] {
    --bg-page:       #1A1916;
    --bg-surface:    #242220;
    --bg-elevated:   #2E2C29;
    --border:        #3A3733;
    --text-primary:  #E8E4DC;
    --text-secondary: #9E9890;
    --text-muted:    #5A5650;
    --accent:        #A8B89C;
    --accent-hover:  #8B9E7C;
    --accent-2:      #D4906E;
    --accent-2-hover: #C4785B;
  }
  ```

## Spacing
- **Base unit:** 8px
- **Density:** Comfortable — generous margins, especially for poetry
- **Scale:** 2xs(2) xs(4) sm(8) md(16) lg(24) xl(32) 2xl(48) 3xl(64) 4xl(96)
- **Poem-specific:** Poems use 2xl-3xl vertical margins to let the text breathe

## Layout
- **Approach:** Grid-disciplined — clean columns, generous margins, predictable alignment. Poetry needs calm structure, not creative chaos.
- **Grid:** Single column for poems/blog, 2-3 column grid for poem/blog listings
- **Max content width:** 960px (container), 600px (poem text), 1200px (wide sections)
- **Border radius:** sm: 4px, md: 8px, lg: 12px

## Motion
- **Approach:** Minimal-functional — only transitions that aid comprehension
- **Easing:** enter/exit: cubic-bezier(0.16, 1, 0.3, 1)
- **Duration:** short: 200ms (hovers, focus), medium: 350ms (page transitions)
- **Effects used:** Subtle hover underlines on links, gentle border-color transitions on cards, fade-in on page transitions
- **Effects NOT used:** No parallax, no scroll effects, no bouncing, no hero animations

## Design Risks (deliberate departures)
1. **Cormorant SC small caps for navigation** — unusual for nav, gives typographic sophistication most poetry sites lack
2. **Terracotta as secondary accent** — most earthy sites go all-green. The warm clay tone adds unexpected depth
3. **No hero image on homepage** — the featured poem IS the hero. Text as visual centerpiece

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-26 | Initial design system created | Created by /design-consultation. Earthy/organic direction for poetry site |
| 2026-03-26 | Cormorant Garamond selected | Best literary serif with excellent italics — soul of the site |
| 2026-03-26 | Cormorant SC for nav/labels | Typographic sophistication without adding a 4th font family |
| 2026-03-26 | Text-as-hero homepage | Featured poem displayed in full as the homepage hero — words are the star |
| 2026-03-26 | Restrained color approach | One accent + neutrals — color is rare and meaningful on a poetry site |
