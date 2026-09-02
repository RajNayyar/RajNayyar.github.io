# RajNayyar.github.io — Repo Context

## What this repo is
GitHub Pages mono-repo. No build step. All projects are standalone HTML/CSS/JS files.
Deployed at `rajnayyar.github.io`.

## Project map

| Path | What it is | Status |
|------|-----------|--------|
| `/` (root) | Portfolio landing page (Raj Nayyar) | Active — `index.html`, `app.js`, `content.json`, `styles.css` |
| `BlackWingsClub/` | Luxury private charter demo site | Active — see `BlackWingsClub/CLAUDE.md` |
| `eliteJets/` | Earlier private-jet demo (point-to-point focus) | Reference only — informed BlackWingsClub P2P mode |
| `santzorb/` | Product landing page demo | Standalone |
| `portfolio_landing_page_v11_drawer_clickfix/` | Archived portfolio version | Not active |
| `portfolio-v2.html` | Portfolio v2 experiment | Single file |

## Tech conventions across all projects
- **No framework, no build.** Vanilla HTML + embedded `<style>` + `<script>`. Open the file in a browser.
- **CSS variables** in `:root` for the entire design token system — always edit tokens, not hardcoded values.
- **Single-page JS routing** via `showPage(id)` / page `display` toggling — no router library.
- All images use Unsplash CDN URLs (`images.unsplash.com/photo-…?w=800&q=80`).
- Google Fonts loaded via `<link>` — Cormorant Garamond (serif headlines) + Space Grotesk / Inter (UI).

## Portfolio root (`index.html` + `app.js` + `content.json`)
- Content is data-driven from `content.json` — jobs, skills, projects live there.
- `app.js` reads `content.json` and renders DOM; no inline content in `index.html`.
- `styles.css` is the external stylesheet (only project in the repo using a separate CSS file).

## Working in this repo
- **To preview any project:** open its `index.html` directly in a browser (or use Live Server).
- **No `npm install`, no `package.json`** — nothing to install.
- Commits go straight to `master`; GitHub Pages serves the root automatically.
