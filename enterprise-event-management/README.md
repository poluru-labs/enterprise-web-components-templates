# Gather Events

Events workspace for **Alder Hall**. Light theme, brand `#129990`.

The **top menu stays sticky** (scoreboard header with icons). The canvas starts **full width**. Use the menu control (or `⌘\`) to open a simple icon sidebar; hide it again to return to full width.

Demo people use the surname **Poluru**. The product name is Gather. Signed in as **Mira Poluru**, Head of events.

## Run

```bash
npm install
npm run dev
npm test
npm run build
```

Opens at [http://localhost:5185](http://localhost:5185). Preview build at port **4185**.

## Scoreboard header

Gather uses a **sticky live scoreboard header** — cool ink (`#101C1B`) with a `#129990` LED stripe, calendar brand mark, and six scannable cells (Live, Registered, Check-in, Speakers, Sponsors, Rooms). Cells route into Events, Registrations, Attendance, Speakers, Sponsors, and Venues. Center search, ⌘K, inbox count, New event, and profile. Implemented as `<gather-header>` with open shadow DOM.

## Folder map

```
src/
  main.js                 # boot: tokens, DS, styles, mount <gather-shell>
  components/
    app-shell.js          # <gather-shell>
    app-header.js         # <gather-header> sticky scoreboard
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

Overview, Events (and event detail), Registrations, Venues, Speakers, Schedule, Sponsors, Attendance, Reports, Settings, **Search** (`#/search`).

Jump with `⌘K` or the header search.

## Tests

```bash
npm test
```
