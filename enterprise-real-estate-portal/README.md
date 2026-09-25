# Haven · Poluru Homes

Real-estate workspace for **Poluru Homes**. Light theme, brand `#64E2B7`, hash routing.

The canvas starts **full width**. Use the menu control (or `⌘\`) to open the sidebar; hide it again to return to full width.

## Screenshot

<img width="3360" height="3462" alt="enterprise-real-estate-portal" src="https://github.com/user-attachments/assets/d17907a0-24cd-4191-875c-105aa6a3d590" />


Demo people use the surname **Poluru**. Signed in as **Subbu Poluru**, Portfolio director. Property manager is **Subra Poluru**.

## Run

```bash
npm install
npm run dev
npm test
npm run build
```

Opens at [http://localhost:5189](http://localhost:5189). Preview build at port **4189**.

## Asset-mix header

Haven uses an **asset-mix header** — a mint canvas (`#E7F9F2`) with **Multifamily / Office / Retail / Industrial** mix cells and an **occupancy** chip (`93% leased`). Right side: asset search, ⌘K command palette, Log request, inbox, and profile. The house brand mark sits on mint `#64E2B7`. Implemented as the `<haven-header>` custom element with open shadow DOM.

This is intentionally distinct from Keystone’s build-stage rail, Orbit’s dispatch board, and Atlas’s purchase pipeline.

## Folder map

```
src/
  main.js                 # boot: tokens, DS, styles, mount <haven-shell>
  components/
    app-shell.js          # <haven-shell>
    app-header.js         # <haven-header> asset-mix header
    app-sidebar.js
    content-card.js       # equal-height <content-card>
    widgets.js            # pageHeader, statGrid, property/work cards
  pages/                  # one file per hash route
  data/index.js           # demo catalog (8 assets, 8 leases, 8 work orders)
  lib/                    # format, search, status, router + tests
  styles/                 # tokens, layout, header
  test/setup.js
```

## Pages

Overview, Properties (and property detail), Leases, Occupancy, Maintenance, Performance, Settings, **Search** (`#/search`).

Jump with `⌘K` (command palette) or the header search (routes to `#/search`).

## Tests

Vitest + jsdom unit tests cover format/search/status/router helpers and the `content-card` / `haven-header` custom elements:

```bash
npm test
```

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com
