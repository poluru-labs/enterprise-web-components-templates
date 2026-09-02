# Lyra CRM

Enterprise sales workspace with a **pipeline command header**, full-height sticky
sidebar, kanban pipeline, deals, leads, accounts, global search, and forecast.
Light theme with brand **`#1055C9`**.

## Run

Requires Node.js 20+.

```bash
cd enterprise-crm-dashboard
npm install
npm run dev
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server on http://localhost:5179 |
| `npm run preview` | Production preview on http://localhost:4179 |
| `npm test` | Vitest unit tests (lib helpers + custom elements) |
| `npm run build` | Production build (`base: './'`) |

## Structure

```
src/
  main.js
  components/     lyra-shell, lyra-header, lyra-sidebar, lyra-content-card
  pages/          Hash-routed views (overview, pipeline, search, …)
  data/           Mock CRM records (Poluru family · Aug–Sep 2026)
  lib/            format, search, status, router + tests
  styles/         tokens, layout, header
  test/setup.js
```

## Routes

| Route | Page |
| --- | --- |
| `#/overview` | KPI pulse, pipeline trend, quota, hot deals |
| `#/pipeline` | Kanban board — drag deals between stages |
| `#/search` | Global record search |
| `#/deals` | Opportunity ledger with saved views |
| `#/deal/deal_harbor` | Deal record |
| `#/leads` | Lead queue and convert drawer |
| `#/contacts` | Buying committee directory |
| `#/contact/con_meera` | Contact profile |
| `#/accounts` | Company directory |
| `#/account/acc_harbor` | Account profile |
| `#/activities` | Calls, meetings, tasks |
| `#/forecast` | Quota vs commit |
| `#/reports` | Coverage, win/loss, conversion |
| `#/settings` | Workspace configuration |

## Header

Translucent blue **pipeline command bar** with deal-stage pills
(Prospect → Qualified → Proposal → Negotiation → Won), search + ⌘K command
palette, New deal, notifications, and profile. Brand mark **L**.

Typography: **Outfit** headings, **Plus Jakarta Sans** UI. Stack: Vite,
Bootstrap 5 grid, `@poluru-labs/enterprise-design-system-wc`, Vitest + jsdom.
