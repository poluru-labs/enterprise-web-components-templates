# Beacon · Poluru Cover

Insurance workspace for **Poluru Cover**. Light theme, brand `#780C28`, hash routing.

The canvas starts **full width**. Use the menu control (or `⌘\`) to open the sidebar; hide it again to return to full width.

Demo people use the surname **Poluru**. Signed in as **Subbu Poluru**, Claims director. Senior adjuster is **Subra Poluru**.

## Run

```bash
npm install
npm run dev
npm test
npm run build
```

Opens at [http://localhost:5190](http://localhost:5190). Preview build at port **4190**.

## Claims-stage header

Beacon uses a **claims-stage header** — a wine canvas (`#F8E8EC`) with **Intake / Assigned / Investigate / Settle** stage cells and a **reserves** chip (`$4.8M reserved`). Right side: claims search, ⌘K command palette, Log claim, inbox, and profile. The beacon brand mark sits on wine `#780C28`. Implemented as the `<beacon-header>` custom element with open shadow DOM.

This is intentionally distinct from Haven’s asset-mix rail, Keystone’s build-stage rail, and Atlas’s purchase pipeline.

## Folder map

```
src/
  main.js                 # boot: tokens, DS, styles, mount <beacon-shell>
  components/
    app-shell.js          # <beacon-shell>
    app-header.js         # <beacon-header> claims-stage header
    app-sidebar.js
    content-card.js       # equal-height <content-card>
    widgets.js            # pageHeader, statGrid, claim/adjuster cards
  pages/                  # one file per hash route
  data/index.js           # demo catalog (8 claims, 8 policies, 8 flags)
  lib/                    # format, search, status, router + tests
  styles/                 # tokens, layout, header
  test/setup.js
```

## Pages

Overview, Claims (and claim detail), Adjusters, Policies, Fraud, Settlements, Settings, **Search** (`#/search`).

Jump with `⌘K` (command palette) or the header search (routes to `#/search`).

## Tests

Vitest + jsdom unit tests cover format/search/status/router helpers and the `content-card` / `beacon-header` custom elements:

```bash
npm test
```

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com
