# Loom · Fieldline Press

Content operations workspace for **Fieldline Press**. Light theme, brand `#E87F24`, hash routing.

The canvas starts **full width**. Use the menu control (or `⌘\`) to open the sidebar; hide it again to return to full width.

Demo people use the surname **Poluru**. Signed in as **Meera Poluru**, managing editor. Copy chief is **Kavya Poluru**.

## Run

```bash
npm install
npm run dev
npm test
npm run build
```

Opens at [http://localhost:5192](http://localhost:5192). Preview build at port **4192**.

## Editorial-week header

Loom uses an **editorial-week header** — a warm canvas (`#FBEFE3`) with **Draft / Copy / Approve / Ship** stage cells and a **next-ship** chip (`Stride · 06:00`). Right side: desk search, ⌘K command palette, New piece, inbox, and profile. The Loom brand mark sits on amber `#E87F24`. Implemented as the `<loom-header>` custom element with open shadow DOM.

This is intentionally distinct from Beacon’s claims-stage rail, Sterling’s clearing rail, and Haven’s asset-mix rail.

## Folder map

```
src/
  main.js                 # boot: tokens, DS, styles, mount <loom-shell>
  components/
    app-shell.js          # <loom-shell>
    app-header.js         # <loom-header> editorial-week header
    app-sidebar.js
    content-card.js       # equal-height <content-card>
    widgets.js            # pageHeader, statGrid, piece/asset cards
  pages/                  # one file per hash route
  data/index.js           # demo catalog (8 pieces, locales, assets)
  lib/                    # format, search, status, router + tests
  styles/                 # tokens, layout, header
  test/setup.js
```

## Pages

Overview, Calendar (and piece detail), Approvals, Locales, Schedule, Assets, Settings, **Search** (`#/search`).

Jump with `⌘K` (command palette) or the header search (routes to `#/search`).

## Tests

Vitest + jsdom unit tests cover format/search/status/router helpers and the `content-card` / `loom-header` custom elements:

```bash
npm test
```

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com
