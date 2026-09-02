# Vespera Projects

Project delivery workspace for **Fieldline Studio**. Light theme, brand `#A0153E`, sprint strip header, and `@poluru-labs/enterprise-design-system-wc` throughout.

Demo people use the surname **Poluru** (Ananya, Kavya, Arjun, Meera, and others). The product name is Vespera.

## Run

```bash
npm install
npm run dev
```

Opens at [http://localhost:5177](http://localhost:5177). Preview production at port 4177.

```bash
npm run build
npm run preview
npm test
```

## Structure

```
src/
  main.js
  components/   app-shell, app-header, app-sidebar, content-card, widgets
  pages/        overview, projects, board, search, …
  data/         demo catalog
  lib/          format, search, status, router (+ Vitest)
  styles/       tokens, layout, header
  test/         jsdom setup
```

## Header

Wine `#A0153E` **sprint strip** with days-remaining meter, mini burndown ticks, and “Sprint 34 · 4 days left”. Main bar: brand **V**, search, `⌘K` command palette, New task, profile.

## Pages

Overview, Projects (and project detail), Board, Timeline, Tasks, Sprints, Team, Risks, Time, Reports, Settings, **Search** (`#/search`).

Jump with `⌘K` or the header search. Equal-height `content-card` grids use `align-items: stretch`.
