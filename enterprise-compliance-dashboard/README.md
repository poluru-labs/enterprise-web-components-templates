# Aegis · Poluru Trust

Compliance workspace for **Poluru Trust**. Light theme, brand `#C08552`, hash routing. Titles use **Roboto**; body copy uses **Open Sans**.

The canvas starts **full width**. Use the menu control (or `⌘\`) to open the sidebar; hide it again to return to full width.

Demo people use the surname **Poluru**. Signed in as **Subbu Poluru**, Chief compliance officer.

## Run

```bash
npm install
npm run dev
npm test
npm run build
```

Opens at [http://localhost:5185](http://localhost:5185). Preview build at port **4185**.

## Framework readiness header

Aegis uses a **framework readiness header** — a copper-tinted canvas (`#F8F1E8`) with **SOC 2 / ISO 27001 / GDPR / HIPAA** meter cells and a **next audit** chip (`SOC 2 Type II · 18 Sep`). Right side: control-room search, ⌘K command palette, New policy, inbox, and profile. The shield **A** brand mark sits on copper `#C08552`. Implemented as the `<aegis-header>` custom element with open shadow DOM.

This is intentionally distinct from Signal’s red ticker, Atlas’s purchase pipeline, and Helio’s tenancy bar.

## Folder map

```
src/
  main.js                 # boot: tokens, DS, styles, mount <aegis-shell>
  components/
    app-shell.js          # <aegis-shell>
    app-header.js         # <aegis-header> framework readiness header
    app-sidebar.js
    content-card.js       # equal-height <content-card>
    widgets.js            # pageHeader, statGrid, policy/control/audit cards
  pages/                  # one file per hash route
  data/index.js           # demo catalog (8 policies, 8 controls, 6 audits)
  lib/                    # format, search, status, router + tests
  styles/                 # tokens, layout, header
  test/setup.js
```

## Pages

Overview, Policies (and policy detail), Controls, Audits, Tasks, Evidence, Findings, Settings, **Search** (`#/search`).

Jump with `⌘K` (command palette) or the header search (routes to `#/search`).

## Tests

Vitest + jsdom unit tests cover format/search/status/router helpers and the `content-card` / `aegis-header` custom elements:

```bash
npm test
```

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com
