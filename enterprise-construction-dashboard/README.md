# Keystone Construction

Keystone Construction is an enterprise workspace for job sites, budgets, schedules, RFIs, subcontractors, and safety reports. It gives project teams one place to track field progress, cost exposure, schedule commitments, information requests, trade partners, and site safety.

The starter is built for **Poluru Builds** with a light theme, brand `#347433`, and hash-based routing.

The canvas starts **full width**. Use the menu control (or `⌘\`) to open the sidebar; hide it again to return to full width.

Demo people use the surname **Poluru**. Signed in as **Subbu Poluru**, Project director. Superintendent is **Subra Poluru**.

## Screenshot

<img width="3360" height="3462" alt="enterprise-construction-dashboard" src="https://github.com/user-attachments/assets/6c1a0cb0-c4b9-4804-97ea-384d653780ac" />


## Run

```bash
npm install
npm run dev
npm test
npm run build
```

Opens at [http://localhost:5188](http://localhost:5188). Preview build at port **4188**.

## Build-stage header

Keystone uses a **build-stage header** — a green-tinted canvas (`#EAF4EA`) with **Mobilize / Structure / Fit-out / Punch** stage cells and a **budget remaining** chip (`$92.1M left`). Right side: jobs search, ⌘K command palette, Log RFI, inbox, and profile. The keystone **K** brand mark sits on green `#347433`. Implemented as the `<keystone-header>` custom element with open shadow DOM.

This is intentionally distinct from Signal’s red ticker, Atlas’s purchase pipeline, and Orbit’s dispatch board.

## Folder map

```
src/
  main.js                 # boot: tokens, DS, styles, mount <keystone-shell>
  components/
    app-shell.js          # <keystone-shell>
    app-header.js         # <keystone-header> build-stage header
    app-sidebar.js
    content-card.js       # equal-height <content-card>
    widgets.js            # pageHeader, statGrid, site/RFI/sub cards
  pages/                  # one file per hash route
  data/index.js           # demo catalog (8 jobs, 8 RFIs, 8 trades)
  lib/                    # format, search, status, router + tests
  styles/                 # tokens, layout, header
  test/setup.js
```

## Workspace Pages

Overview, Job sites (and site detail), Budgets, Schedule, RFIs, Subcontractors, Safety reports, Settings, and **Search** (`#/search`).

Jump with `⌘K` (command palette) or the header search (routes to `#/search`).

## Tests

Vitest + jsdom unit tests cover format/search/status/router helpers and the `content-card` / `keystone-header` custom elements:

```bash
npm test
```

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com
