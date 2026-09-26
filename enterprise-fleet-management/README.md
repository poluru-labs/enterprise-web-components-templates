# Orbit · Poluru Yards

Fleet workspace for **Poluru Yards**. Light theme, brand `#541212`, hash routing.

The canvas starts **full width**. Use the menu control (or `⌘\`) to open the sidebar; hide it again to return to full width.

## Screenshot

<img width="3360" height="3634" alt="enterprise-fleet-management" src="https://github.com/user-attachments/assets/a8f2ca08-432e-4835-b404-8a91e44374a3" />


Demo people use the surname **Poluru**. Signed in as **Subbu Poluru**, Fleet director. Shop lead is **Subra Poluru**.

## Run

```bash
npm install
npm run dev
npm test
npm run build
```

Opens at [http://localhost:5187](http://localhost:5187). Preview build at port **4187**.

## Dispatch board header

Orbit uses a **dispatch board header** — a burgundy-tinted canvas (`#F7EFEF`) with **Yard / Assigned / On route / Shop** stage cells and a **fuel remaining** chip (`68% avg tank`). Right side: yard search, ⌘K command palette, Assign vehicle, inbox, and profile. The orbit **O** brand mark sits on burgundy `#541212`. Implemented as the `<orbit-header>` custom element with open shadow DOM.

This is intentionally distinct from Signal’s red ticker, Atlas’s purchase pipeline, and Helio’s tenancy bar.

## Folder map

```
src/
  main.js                 # boot: tokens, DS, styles, mount <orbit-shell>
  components/
    app-shell.js          # <orbit-shell>
    app-header.js         # <orbit-header> dispatch board header
    app-sidebar.js
    content-card.js       # equal-height <content-card>
    widgets.js            # pageHeader, statGrid, vehicle/driver/work cards
  pages/                  # one file per hash route
  data/index.js           # demo catalog (8 units, 8 drivers, 8 work orders)
  lib/                    # format, search, status, router + tests
  styles/                 # tokens, layout, header
  test/setup.js
```

## Pages

Overview, Vehicles (and vehicle detail), Maintenance, Drivers, Fuel, Inspections, Settings, **Search** (`#/search`).

Jump with `⌘K` (command palette) or the header search (routes to `#/search`).

## Tests

Vitest + jsdom unit tests cover format/search/status/router helpers and the `content-card` / `orbit-header` custom elements:

```bash
npm test
```

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com
