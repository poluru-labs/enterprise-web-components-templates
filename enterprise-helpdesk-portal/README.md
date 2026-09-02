# Relay — Enterprise Helpdesk Portal

Hash-routed helpdesk workspace for **Poluru Support**, built with Vite, Bootstrap 5, and `@poluru-labs/enterprise-design-system-wc`.

## Product

- **Product:** Relay
- **Workspace:** Poluru Support
- **Brand:** Navy `#03346E`
- **Signed-in user:** Elena Poluru, Shift lead
- **Dates:** Aug–Sep 2026 sample data

## Stack

- Vite 7 (dev port **5180**, preview **4180**)
- Bootstrap 5 + bootstrap-icons
- Enterprise design system web components (`eds-*`)
- Vanilla custom elements with open shadow DOM for `relay-header` and `content-card`
- Vitest + jsdom

## Features

- **Dispatch header** — light command bar plus navy rail with SLA clock, severity mix, queue lanes, and floor coverage
- **Overview** — 8 metric cells + 6 queue/team cards with equal-height layout
- **Tickets** — Filterable table with 13 sample tickets
- **Ticket detail** — `#/tickets/:id` with conversation thread
- **Teams** — 7 agents with online status
- **SLA policies** — 6 policies with breach rates
- **Knowledge** — 7 articles with search/filter
- **Reports** — Export catalog and quick export
- **Settings** — Workspace profile and density
- **Search** — Full catalog search page
- **Command palette** — ⌘K jump menu
- **Create ticket modal** — Multi-step intake
- **Inbox drawer** — Shift notifications

## Scripts

```bash
npm install
npm run dev      # http://localhost:5180
npm test
npm run build
npm run preview  # http://localhost:4180
```

## Structure

```
src/
  main.js
  components/   app-shell, relay-header, sidebar, content-card, widgets
  pages/        overview, tickets, ticket-detail, teams, sla, knowledge, reports, settings, search
  data/         mock tickets, agents, articles, queues
  lib/          format, search, status, router (+ tests)
  styles/       tokens, layout, header (relay- prefix)
  test/         vitest setup
```

## Routing

Hash routes:

- `#/overview`
- `#/tickets`
- `#/tickets/HD-4821`
- `#/teams`
- `#/sla`
- `#/knowledge`
- `#/reports`
- `#/settings`
- `#/search` and `#/search/:query`

## License

MIT
