# Alder · Poluru People

People operations portal for **Poluru People**. Light theme, brand `#0F766E`, hash routing.

The canvas starts **full width**. Use the menu control (or `⌘\`) to open the sidebar; hide it again to return to full width.

Demo people use the surname **Poluru**. Signed in as **Sravani Poluru**, People operations lead.

## Run

```bash
npm install
npm run dev
npm test
npm run build
```

Opens at [http://localhost:5181](http://localhost:5181). Preview build at port **4181**.

## People directory header

Alder uses a **people directory header** — a teal-tinted canvas (`#F0FDFA`) with an **avatar stack of teammates on leave this week** and a **next-holiday chip** (Labor Day). Right side: people search, ⌘K command palette, Add employee, inbox, and profile. The leaf **A** brand mark sits on teal `#0F766E`. Implemented as the `<alder-header>` custom element with open shadow DOM.

This is intentionally distinct from Signal’s red ticker, navy queue, and yellow tenancy patterns.

## Folder map

```
src/
  main.js                 # boot: tokens, DS, styles, mount <alder-shell>
  components/
    app-shell.js          # <alder-shell>
    app-header.js         # <alder-header> people directory header
    app-sidebar.js
    content-card.js       # equal-height <content-card>
    widgets.js            # pageHeader, statGrid, person/req/course cards
  pages/                  # one file per hash route
  data/index.js           # demo catalog (18 people, 6 reqs, 6 courses, 10 leave)
  lib/                    # format, search, status, router + tests
  styles/                 # tokens, layout, header
  test/setup.js
```

## Pages

Overview, People (and person detail), Leave, Hiring, Org, Learning, Settings, **Search** (`#/search`).

Jump with `⌘K` (command palette) or the header search (routes to `#/search`).

## Tests

Vitest + jsdom unit tests cover format/search/status/router helpers and the `content-card` / `alder-header` custom elements:

```bash
npm test
```
