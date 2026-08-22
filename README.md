# Pixoraa Digital — site rebuild

React (Vite) + Express. Dark editorial base, molten-orange accent.

## Run

```bash
# client → http://localhost:5173
cd client && npm run dev

# server → http://localhost:5050
cd server && npm run dev
```

## Structure rule

**One folder per section.** Every part of a section is its own file inside
that folder. A single `main_<section>.jsx` composes them, and that composer
is the only thing `App.jsx` imports.

```
components/header/
├── logo.jsx
├── nav_links.jsx
├── location_tag.jsx
├── menu_button.jsx
├── mobile_menu.jsx
└── main_header.jsx    ← imports the five above, exports <Header />
```

- `assets/` — all media (images, video, fonts, icons). No components.
- `data/`   — all copy and content. No text hardcoded in JSX.
- `common/` — primitives reused across sections (button, marquee, cursor…).
- `styles/tokens.css` — every colour, size, and easing. No literals in components.

Filenames are `snake_case`. Child files are named for what they are
(`service_card`), composers are always `main_<foldername>`.

## Built so far

| Section | Status |
|---|---|
| preloader | done — DSLR shutter intro, once per session |
| overlay | done — scroll progress bar, live world clock |
| header | done |
| hero | done |
| partners | done — dual scroll-velocity marquees |
| services | done — fold-swap labels, sticky preview |
| work | done — image corridor band + project grid |
| gallery | done — draggable bento + lightbox |
| process | done — sticky rail tracking the active phase |
| footer | done — giant wordmark, newsletter wired to Express |
| team, testimonials, blog, faq | folders scaffolded, not built |

## Interaction inventory

Ported and upgraded from the live site:

| Effect | Where | Notes |
|---|---|---|
| Per-letter curtain | `preloader/` | sessionStorage-gated; skipped for reduced motion |
| Live world clock | `overlay/` | `mix-blend-difference`; retires over the footer |
| Fold-swap labels | `common/text_swap.jsx` | `origin-top` / `origin-bottom` scaleY pair |
| 1s image zoom | `work/work.css` | the `--ease-quint` signature easing |
| Logo/arrow hover trade | `work/project_card.jsx` | wordmark out, molten disc in |
| Velocity marquees | `common/velocity_marquee.jsx` | scroll speed drives them; direction flips |
| Sticky process rail | `process/` | tracks which phase is actually on screen |
| Image corridor | `work/image_stream.jsx` | 3D perspective rails |
| Draggable bento | `gallery/` | reorder by drag, lightbox with keyboard nav |
| Scroll progress | `overlay/scroll_progress.jsx` | spring-damped |
| Counters | `common/counter.jsx` | eased count-up on first view |

`--ease-quint` (`cubic-bezier(0.23, 1, 0.32, 1)`) is the signature easing
carried over from the live site — it's what makes long transforms feel
weighted rather than mechanical.

## Ported components

Two components were supplied as shadcn/Tailwind/TypeScript. They were
**ported to this project's stack** rather than converting the project:

- `work/image_stream.jsx` — the perspective corridor. Geometry maths kept
  verbatim; Tailwind classes and TS types replaced with `image_stream.css`
  and the `cqw` container-query units retained.
- `gallery/` — the bento gallery. Restyled from its light `sky-400`/`gray-50`
  defaults to the molten palette, tiles made real `<button>`s (they were
  click-handled `div`s, unreachable by keyboard), and the lightbox given
  Escape-to-close, arrow-key paging, scroll lock, and focus management.
  The single `lucide-react` icon is inlined as SVG rather than adding the
  dependency.

Both use gradient tone plates so they work before any photography exists.
Give a project or gallery item a `src` / `url` and it renders real media
with no other change.

## The shutter intro

`components/preloader/` — a DSLR fires a frame, and the site is revealed
through the flash decay.

| Beat | ms | What happens |
|---|---|---|
| raise | 0 | camera rises into frame, viewfinder grid behind |
| hunt | 620 | AF brackets hunt inward onto the subject |
| lock | 1250 | focus confirms — brackets and AF lamp go molten, EXIF strip appears |
| fire | 1650 | shutter button dips, iris snaps shut (110ms) and reopens (260ms) |
| flash | 1850 | strobe: hard white spike + radial bloom from the lens |
| clear | 2150 | curtain lifts *through* the flash decay |
| done | 2950 | `.site--developing` settles the page from scale 1.035 → 1 |

Two details that carry it: the iris closes faster than it opens, which is
what makes it read as a mechanism rather than a symmetrical pulse; and the
reveal happens *inside* the flash decay, so the site appears out of the
light instead of the light fading to black and the page arriving after.

The aperture is one hexagon scaled to zero behind a mask — not six
animated blades, which drift out of register. A six-blade iris stopped
down really is hexagonal.

Runs once per session (`sessionStorage`), and is skipped entirely under
`prefers-reduced-motion`.

### Previewing it

The intro is over in three seconds and won't replay, which makes it
almost impossible to tune. So:

```
?shutter        replay, ignoring the once-per-session flag
?shutter=slow   replay at quarter speed
?shutter=lock   hold on one beat — hunt | lock | fire | flash
```

## `?static` — for screenshots and debugging

Entry animations hide their content until they run, which makes the page
impossible to capture when `requestAnimationFrame` is paused (background
tab, headless screenshot tooling).

```
http://localhost:5173/?static
```

renders every entry animation in its final state. Dev builds only — see
`src/common/motion_env.js`.

## API

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/health` | liveness |
| POST | `/api/contact` | project enquiry — validated, rate-limited, honeypot-guarded |
| POST | `/api/newsletter` | email subscribe |

Both POST routes validate and log. Actual delivery (SMTP / CRM) is one
clearly marked `TODO(delivery)` hook in each controller rather than a
half-wired integration.

Copy `server/.env.example` to `server/.env`.

## Notes

- `motion` and `framer-motion` are the same library; only `motion` is installed.
- Fonts: Archivo (display), Inter (body), JetBrains Mono (numbers/labels),
  Instrument Serif (the one italic accent).
- Gold rule from the design references: numbers that represent facts are
  always set in mono.
