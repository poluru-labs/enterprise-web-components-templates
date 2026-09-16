# Pulse Customer Success

Customer success workspace for **Aetherline**. Light theme, brand `#3396D3`.

The canvas starts **full width**. Use the menu control (or `⌘\`) to open a simple sidebar; hide it again to return to full width.

Demo people use the surname **Poluru**. The product name is Pulse. Signed in as **Priya Poluru**, VP customer success.

## Run

```bash
npm install
npm run dev
npm test
npm run build
```

Opens at [http://localhost:5182](http://localhost:5182). Preview build at port **4182**.

## Scoreboard header

Pulse uses a **live scoreboard header** — cool ink (`#12181C`) with a blue `#3396D3` LED stripe, pulse brand mark, and six scannable cells (NRR, GRR, Health, At risk, Renewals, Expansion). Cells route into Health, Renewals, and Expansion. Center search, ⌘K, inbox count, New account, and profile. Implemented as `<pulse-header>` with open shadow DOM.

## Folder map

```
src/
  main.js                 # boot: tokens, DS, styles, mount <pulse-shell>
  components/
    app-shell.js          # <pulse-shell>
    app-header.js         # <pulse-header> scoreboard ticker
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

Overview, Accounts (and account detail), Health, Renewals, Onboarding, Expansion, Playbooks, Reports, Settings, **Search** (`#/search`).

Jump with `⌘K` (command palette) or the header search (routes to `#/search`).

## Tests

Vitest + jsdom unit tests cover format/search/status/router helpers and the `content-card` / `pulse-header` custom elements:

```bash
npm test
```
