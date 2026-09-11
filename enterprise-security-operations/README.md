# Sentinel · Poluru Shield

Security operations workspace for **Poluru Shield**. Light theme, brand `#D10056`, hash routing. Titles use **Roboto**; body copy uses **Open Sans**.

The canvas starts **full width**. Use the menu control (or `⌘\`) to open the sidebar; hide it again to return to full width.

Demo people use the surname **Poluru**. Signed in as **Subbu Poluru**, Chief information security officer.

## Run

```bash
npm install
npm run dev
npm test
npm run build
```

Opens at [http://localhost:5186](http://localhost:5186). Preview build at port **4186**.

## Queue strip header

Sentinel uses a **queue strip header** — Alerts, Incidents, Vulns, and Cases as separate cells, plus an **MTTA 14m** chip. Right side: security search, ⌘K command palette, Open incident, inbox, and profile. The shield brand mark sits on magenta `#D10056`. Implemented as the `<sentinel-header>` custom element with open shadow DOM.

This is intentionally distinct from Aegis’s copper meters, Signal’s ticker, and Atlas’s purchase pipeline.

Cards use full 1px borders. There are no gradients and no left or top accent bars.

## Folder map

```
src/
  main.js                 # boot: tokens, DS, styles, mount <sentinel-shell>
  components/
    app-shell.js          # <sentinel-shell>
    app-header.js         # <sentinel-header> queue strip + MTTA chip
    app-sidebar.js
    content-card.js       # equal-height <content-card>
    widgets.js            # pageHeader, statGrid, item cards, sparkline
  pages/                  # one file per hash route
  data/index.js           # demo catalog (alerts, incidents, CVEs, cases)
  lib/                    # format, search, status, router + tests
  styles/                 # tokens, layout, header
  test/setup.js
```

## Pages

Overview, Alerts, Incidents (and incident detail), Vulnerabilities, Investigations, Response, Settings, **Search** (`#/search`).

Jump with `⌘K` (command palette) or the header search (routes to `#/search`).

## Tests

Vitest + jsdom unit tests cover format/search/status/router helpers and the `content-card` / `sentinel-header` custom elements:

```bash
npm test
```

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com
