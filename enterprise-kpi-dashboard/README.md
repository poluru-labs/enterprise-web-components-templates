# Signal KPIs

Executive scorecard workspace for **Clearline Holdings**. Light theme, brand `#DD0303`.

The canvas starts **full width**. Use the menu control (or `⌘\`) to open a simple sidebar; hide it again to return to full width.

Demo people use the surname **Poluru**. The product name is Signal. Signed in as **Mira Poluru**, Head of performance.

## Run

```bash
npm install
npm run dev
npm test
npm run build
```

Opens at [http://localhost:5178](http://localhost:5178). Preview build at port **4178**.

## Scoreboard header

Signal uses a **live scoreboard header** — dark ink (`#161616`) with a red `#DD0303` LED stripe, equalizer brand mark, and six scannable KPI cells (Revenue, NRR, Margin, NPS, Pipeline, Uptime) with deltas. Cells route into Trends, Scorecards, Goals, Benchmarks, and Alerts. Center search, ⌘K, inbox count, New alert, and profile. Implemented as `<signal-header>` with open shadow DOM.

## Folder map

```
src/
  main.js                 # boot: tokens, DS, styles, mount <signal-shell>
  components/
    app-shell.js          # <signal-shell>
    app-header.js         # <signal-header> scoreboard ticker
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

Overview, Scorecards (and scorecard detail), Goals, Trends, Teams, Alerts, Reviews, Benchmarks, Reports, Settings, **Search** (`#/search`).

Jump with `⌘K` (command palette) or the header search (routes to `#/search`).

## Tests

Vitest + jsdom unit tests cover format/search/status/router helpers and the `content-card` / `signal-header` custom elements:

```bash
npm test
```
