# BlackWingsClub — Project Context

## What it is
A luxury private charter club demo site (India-themed). Single file: `index.html`.
Design aesthetic: near-black backgrounds, gold (`#C9A84C`) + platinum (`#C8C8D0`) accents, Cormorant Garamond serif headlines, Space Grotesk UI text.

## File structure
Everything lives in `index.html` — embedded `<style>` block, HTML, inline `<script>`. No external JS or CSS files.

## Page system
Four pages toggled by `display` — only one has class `active` at a time:

| Page ID | Route |
|---------|-------|
| `page-home` | Hero + fleet grid + why section + footer |
| `page-reserve` | Reservation form (two modes) |
| `page-payment` | Card payment form + billing summary |
| `page-confirm` | Booking confirmation |

Navigation: `showPage(id)`, `goHome()`, `transitionTo(id, label)` (shows animated loader then switches).

## Key data structures

### `CRAFT` array — aircraft fleet
```js
{ id, type ('jet'|'helicopter'), category, name, model,
  seats, range, speed, crew, ppd (price/day as number),
  ppdlabel (formatted), img, specs [{v,k}], feats [] }
```

### `ROUTES` array — P2P routes
```js
{ id, from, fcode, to, tcode, hours (flight time), label (display),
  heliOnly? (true = only shown when a helicopter is selected) }
```

## State variables
```js
curTab      // 'all' | 'jet' | 'heli' — fleet filter tab
curCraft    // currently selected CRAFT object
resMode     // 'duration' | 'p2p' — reservation mode
selectedRoute  // currently selected ROUTES object or null
isReturn    // bool — return flight toggled in P2P mode
resDays     // number of days (duration mode)
resPax      // passenger count
reservation // snapshot object built by calcTotal(), consumed by goToPayment() + showConfirm()
```

## Reservation page — two modes

### Duration mode (`resMode === 'duration'`)
- Date range → duration slider (1–30 days)
- Base of operations: departure city, time, return location, aircraft positioning
- Pricing: `ppd × resDays`

### Point-to-Point mode (`resMode === 'p2p'`)
- Route chips (filtered by aircraft type), live from/to visual, swap button
- Departure date + time picker + quick time-slot grid
- Return flight toggle → adds return date/time fields
- Pricing: `(ppd / 8) × hours`, minimum `ppd × 0.25`; return = oneWay × 0.9

Mode switch: `setResMode(mode)` — hides/shows sections, updates sidebar rows, refreshes extras labels.

## Extras / add-ons
Five toggles: Catering (45k), Transfer (18k), Butler (28k), WiFi (12k), Décor (35k flat).
Per-unit labels update to "/ day" or "/ flight" via `updateExtrasLabels()` when mode changes.
Multiplier in `calcTotal()`: duration mode uses `resDays`; P2P uses `isReturn ? 2 : 1` (except Décor which is flat).

## `calcTotal()` — central pricing function
Reads all form state, updates sidebar `ps-*` elements, and writes to `reservation {}`.
Must be called whenever any input changes. Always call before navigating to payment.

## CSS design tokens (`:root`)
```
--gold: #C9A84C          primary accent
--platinum: #C8C8D0      headline text
--muted: rgba(255,255,255,0.38)  secondary text
--surface / --surface2 / --surface3   dark backgrounds
--glass / --glass-border  glassmorphism fills
--serif: 'Cormorant Garamond'   headlines
--sans: 'Space Grotesk'         UI
```

## Adding a new aircraft
Add an object to the `CRAFT` array. The `renderFleet()` function picks it up automatically.

## Adding a new P2P route
Add an object to the `ROUTES` array. Set `heliOnly: true` if it's a short/helicopter-appropriate route.

## Common gotchas
- `calcTotal()` relies on `curCraft` being set — guard with `if (!curCraft) return`.
- P2P sidebar rows (`ps-p2p-rows`) and duration rows (`ps-duration-rows`) are mutually exclusive — toggled by `setResMode()`.
- `selectCraft(id)` resets all mode state back to duration defaults before populating the reserve page.
- The `frv-*` elements (flight route visual) update in `selectRoute()` and `onP2PInput()`.
