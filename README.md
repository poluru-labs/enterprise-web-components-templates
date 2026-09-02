# Enterprise Web Components Templates

Starter enterprise interfaces built with [Bootstrap](https://getbootstrap.com/), [Bootstrap Icons](https://icons.getbootstrap.com/), [Vite](https://vite.dev/), and [@poluru-labs/enterprise-design-system-wc](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-wc).

Each template is an independent Vite application. Layout chrome is vanilla custom elements (Open WC-style folders). Forms, tables, drawers, and toasts use `eds-*` design-system tags.

## Templates

| Product | Use case | Header | Dev | Folder |
| --- | --- | --- | --- | --- |
| Signal | Executive KPIs and scorecards | Dark scoreboard ticker | 5178 | [enterprise-kpi-dashboard](enterprise-kpi-dashboard/) |
| Lyra | Pipeline, accounts, and deals | Blue glass stage pills | 5179 | [enterprise-crm-dashboard](enterprise-crm-dashboard/) |
| Alder | People, leave, hiring, learning | Teal leave avatars + holiday chip | 5181 | [enterprise-hrms-portal](enterprise-hrms-portal/) |
| Vespera | Projects, sprints, and capacity | Wine sprint strip + burndown | 5177 | [enterprise-project-dashboard](enterprise-project-dashboard/) |
| Verdant | Invoices, AR, and subscriptions | Cream ledger ribbon | 5174 | [enterprise-billing-dashboard](enterprise-billing-dashboard/) |
| Nimbus | Stock, inbound, and warehouses | Purple stock-health rings | 5183 | [enterprise-inventory-dashboard](enterprise-inventory-dashboard/) |
| Halo | Appointments, patients, census | Clinical occupancy + next visits | 5175 | [enterprise-clinic-admin](enterprise-clinic-admin/) |
| Relay | Tickets, SLA, and queues | Navy SLA countdown + severity dots | 5180 | [enterprise-helpdesk-portal](enterprise-helpdesk-portal/) |
| Helix | Reports, quality, and insights | Crimson Ask Helix console | 5173 | [enterprise-bi-dashboard](enterprise-bi-dashboard/) |
| Helio | Orgs, seats, and uptime | Dark tenancy bar + seat meter | 5176 | [enterprise-saas-admin](enterprise-saas-admin/) |

Each header is a distinct custom element — ticker, pipeline pills, people cluster, sprint meter, ledger blotter, warehouse rings, shift board, queue ribbon, insight console, or tenancy bar.

## Folder structure

Templates follow the Open WC / web-components layout:

```
src/
  main.js                 # boot: tokens, design system, define elements, mount
  components/
    app-shell.js          # <product-shell>
    app-header.js         # unique header custom element + tests
    app-sidebar.js
    content-card.js       # equal-height card custom element + tests
    widgets.js
  pages/                  # one module per hash route, plus search
  data/                   # mock catalogs
  lib/                    # format, search, status, router + unit tests
  styles/                 # tokens, layout, header
  test/setup.js
```

Content cards sit in stretch grids (`align-items: stretch`) so rows share a height. Overview pages use even card counts (4 / 6 / 8).

## Getting started

Requirements: Node.js 20 or newer.

```bash
cd enterprise-bi-dashboard
npm install
npm run dev
```

Replace `enterprise-bi-dashboard` with any folder from the table.

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local development server |
| `npm test` | Vitest + jsdom unit tests |
| `npm run build` | Production build (`base: './'`) |
| `npm run preview` | Preview the production build |

Jump around a template with `⌘K`. Search from the header goes to `#/search`.

## Shared stack

- Vanilla custom elements for shell, header, and equal-height cards
- `@poluru-labs/enterprise-design-system-wc` for `eds-*` controls
- Bootstrap 5 for responsive `row` / `col-*` grids
- Bootstrap Icons
- Vite 7, Vitest, jsdom
- Hash routing

Dependencies and `dist/` are excluded from Git through the root [.gitignore](.gitignore).
