# Nimbus Inventory

Inventory, purchase orders, and warehouse capacity for **Poluru Supply Co.** Light theme, brand `#5C3E94`.

Signed in as **Aditi Poluru**, inventory operations lead. Demo people use the surname **Poluru**. Dates span Aug–Sep 2026.

## Run

```bash
npm install
npm run dev
npm test
npm run build
```

Opens at [http://localhost:5183](http://localhost:5183). Preview build at port **4183**.

## Warehouse-status header

Nimbus uses a **warehouse-status header** — soft purple `#F6F4FB` with three **stock-health rings** (in-stock 76% · low 15% · stockout 9%) and an **inbound dock countdown** (`Dock 2 · 18 min`). The square **N** brand mark sits in the toolbar below. Center search routes to `#/search`; right-side ⌘K command palette, inbox, **New receipt**, and profile. Implemented as the `<nimbus-header>` custom element with open shadow DOM.

## Folder map

```
src/
  main.js                 # boot: tokens, DS, styles, mount <nimbus-shell>
  components/
    app-shell.js          # <nimbus-shell>
    app-header.js         # <nimbus-header> warehouse status
    app-sidebar.js
    content-card.js       # equal-height <content-card>
    widgets.js            # pageHeader, statGrid, sparkline helpers
  pages/                  # one file per hash route (+ search)
  data/index.js           # demo catalog
  lib/                    # format, search, status, router + tests
  styles/                 # tokens, layout, header
  test/setup.js
```

## Pages

Overview, Inventory (and item detail), Purchase orders, Warehouses, Suppliers, Team, Alerts, Reports, Settings, **Search** (`#/search`).

Jump with `⌘K` (command palette) or the header search (routes to `#/search`).

## Tests

Vitest + jsdom unit tests cover format/search/status/router helpers and the `content-card` / `nimbus-header` custom elements:

```bash
npm test
```
