# CivicWorks Administration

Civic administration workspace for **Harbor City**. Light theme, brand `#129990`.

The canvas starts **full width**. Use the menu control (or `⌘\`) to open a simple sidebar; hide it again to return to full width.

Demo people use the surname **Poluru**. The product name is CivicWorks. Signed in as **Mira Poluru**, City administrator.

## Run

```bash
npm install
npm run dev
npm test
npm run build
```

Opens at [http://localhost:5184](http://localhost:5184). Preview build at port **4184**.

## Scoreboard header

CivicWorks uses a **live scoreboard header** — cool ink (`#101C1B`) with a `#129990` LED stripe, civic hall brand mark, and six scannable cells (Open 311, Permits, Cases, SLA, Budget, Inspections). Cells route into Requests, Permits, Cases, Service, and Budgets. Center search, ⌘K, inbox count, New request, and profile. Implemented as `<civic-header>` with open shadow DOM.

## Folder map

```
src/
  main.js                 # boot: tokens, DS, styles, mount <civic-shell>
  components/
    app-shell.js          # <civic-shell>
    app-header.js         # <civic-header> scoreboard ticker
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

Overview, Requests (and request detail), Permits, Cases, Departments, Budgets, Service, Reports, Settings, **Search** (`#/search`).

Jump with `⌘K` (command palette) or the header search (routes to `#/search`).

## Tests

Vitest + jsdom unit tests cover format/search/status/router helpers and the `content-card` / `civic-header` custom elements:

```bash
npm test
```
