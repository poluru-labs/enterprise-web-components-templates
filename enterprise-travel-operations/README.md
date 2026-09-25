# Waypoint Travel Operations

Travel operations workspace for **Meridian Group**. Light theme, brand `#1581BF`.

The canvas starts **full width**. Use the menu control (or `⌘\`) to open a simple sidebar; hide it again to return to full width.

## Screenshot

<img width="3360" height="4886" alt="enterprise-travel-operations" src="https://github.com/user-attachments/assets/f78f3ec2-d218-4463-a274-81243a695eeb" />


Demo people use the surname **Poluru**. The product name is Waypoint. Signed in as **Mira Poluru**, Head of travel.

## Run

```bash
npm install
npm run dev
npm test
npm run build
```

Opens at [http://localhost:5183](http://localhost:5183). Preview build at port **4183**.

## Scoreboard header

Waypoint uses a **live scoreboard header** — cool ink (`#10181E`) with a `#1581BF` LED stripe, compass brand mark, and six scannable cells (In trip, Approvals, Spend, Risk, On time, Unused). Cells route into Trips, Approvals, Expenses, and Risk. Center search, ⌘K, inbox count, New trip, and profile. Implemented as `<way-header>` with open shadow DOM.

## Folder map

```
src/
  main.js                 # boot: tokens, DS, styles, mount <way-shell>
  components/
    app-shell.js          # <way-shell>
    app-header.js         # <way-header> scoreboard ticker
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

Overview, Trips (and trip detail), Travelers, Approvals, Itineraries, Expenses, Risk, Reports, Settings, **Search** (`#/search`).

Jump with `⌘K` (command palette) or the header search (routes to `#/search`).

## Tests

Vitest + jsdom unit tests cover format/search/status/router helpers and the `content-card` / `way-header` custom elements:

```bash
npm test
```
