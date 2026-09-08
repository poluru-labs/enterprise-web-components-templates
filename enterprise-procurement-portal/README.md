# Atlas · Poluru Works

Procurement workspace for **Poluru Works**. Light theme, brand `#FF5722`, hash routing.

The canvas starts **full width**. Use the menu control (or `⌘\`) to open the sidebar; hide it again to return to full width.

Demo people use the surname **Poluru**. Signed in as **Subbu Poluru**, Head of procurement.

## Run

```bash
npm install
npm run dev
npm test
npm run build
```

Opens at [http://localhost:5184](http://localhost:5184). Preview build at port **4184**.

## Purchase pipeline header

Atlas uses a **purchase pipeline header** — an orange-tinted canvas (`#FFF4F0`) with **Request / Approve / Order / Receive** stage cells and a **budget remaining** chip (`$3.56M left · FY26`). Right side: buy-desk search, ⌘K command palette, New request, inbox, and profile. The compass **A** brand mark sits on orange `#FF5722`. Implemented as the `<atlas-header>` custom element with open shadow DOM.

This is intentionally distinct from Signal’s red ticker, Alder’s leave cluster, and Helio’s tenancy bar.

## Folder map

```
src/
  main.js                 # boot: tokens, DS, styles, mount <atlas-shell>
  components/
    app-shell.js          # <atlas-shell>
    app-header.js         # <atlas-header> purchase pipeline header
    app-sidebar.js
    content-card.js       # equal-height <content-card>
    widgets.js            # pageHeader, statGrid, request/supplier/contract cards
  pages/                  # one file per hash route
  data/index.js           # demo catalog (8 PRs, 6 suppliers, 6 contracts)
  lib/                    # format, search, status, router + tests
  styles/                 # tokens, layout, header
  test/setup.js
```

## Pages

Overview, Requests (and request detail), Approvals, Suppliers (quote comparison), Contracts, Spend, Settings, **Search** (`#/search`).

Jump with `⌘K` (command palette) or the header search (routes to `#/search`).

## Tests

Vitest + jsdom unit tests cover format/search/status/router helpers and the `content-card` / `atlas-header` custom elements:

```bash
npm test
```

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com
