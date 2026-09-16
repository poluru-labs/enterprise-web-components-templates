# Circuit Platform

Developer platform for **Lattice Forge**. Light theme, brand `#129990`.

The **top menu stays sticky** (scoreboard header with icons). The canvas starts **full width**. Use the menu control (or `⌘\`) to open a simple icon sidebar; hide it again to return to full width.

Demo people use the surname **Poluru**. The product name is Circuit. Signed in as **Nikhil Poluru**, Head of platform.

## Run

```bash
npm install
npm run dev
npm test
npm run build
```

Opens at [http://localhost:5186](http://localhost:5186). Preview build at port **4186**.

## Scoreboard header

Circuit uses a **sticky live scoreboard header** — cool ink (`#101C1B`) with a `#129990` LED stripe, chip brand mark, and six scannable cells (Services, Deploys, Error budget, P95, Owners, Envs). Cells route into Services, Deployments, Health, Owners, and Environments. Center search, ⌘K, inbox count, New service, and profile. Implemented as `<circuit-header>` with open shadow DOM.

## Folder map

```
src/
  main.js                 # boot: tokens, DS, styles, mount <circuit-shell>
  components/
    app-shell.js          # <circuit-shell>
    app-header.js         # <circuit-header> sticky scoreboard
    app-sidebar.js
    content-card.js
    widgets.js
  pages/
  data/index.js
  lib/
  styles/
  test/setup.js
```

## Pages

Overview, Services (and service detail), Deployments, Environments, Health, Owners, Reports, Settings, **Search** (`#/search`).

Jump with `⌘K` or the header search.

## Tests

```bash
npm test
```
