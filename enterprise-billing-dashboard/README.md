# Verdant Billing

Premium SaaS finance and billing workspace for **Northshore Cloud, Inc.** — invoices,
payments, subscriptions, customers, analytics, and reports. Light theme with brand
**`#1D4533`** on cream **`#F4EFE6`**.

## Stack

- Vite 7 + Bootstrap 5 + bootstrap-icons
- `@poluru-labs/enterprise-design-system-wc` (`eds-*` components)
- Vanilla custom elements (`vd-*`) with hash routing
- Vitest + jsdom

## Run

Requires Node.js 20+.

```bash
cd enterprise-billing-dashboard
npm install
npm run dev
```

Default dev server: http://localhost:5174  
Preview build: `npm run build && npm run preview` → http://localhost:4174

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server (port 5174) |
| `npm run build` | Production build (`base: './'`) |
| `npm run preview` | Preview build (port 4174) |
| `npm test` | Vitest unit tests |

## Routes

| Route | Page |
| --- | --- |
| `#/overview` | KPI pulse, trends, recent invoices |
| `#/search` | Ledger search across invoices, customers, payments |
| `#/search?q=harbor` | Filtered search results |
| `#/invoices` | Full ledger, filters, preview drawer |
| `#/invoice/INV-2841` | Invoice detail |
| `#/payments` | Payments ledger |
| `#/subscriptions` | Plans and lifecycle |
| `#/customers` | Directory |
| `#/customer/cus_harbor` | Customer profile |
| `#/analytics` | MRR / ARR / mix |
| `#/reports` | Aging, recon, tax, retention |
| `#/settings` | Billing configuration |

Press **⌘K** (or focus the header search) for the command palette.

## Project structure

```
src/
  main.js
  components/   app-shell, app-header, app-sidebar, content-card, widgets
  pages/        overview, search, invoices, payments, …
  data/         demo ledger data
  lib/          format, search, status, router + tests
  styles/       tokens, layout, header
  test/         Vitest setup
```

Typography: **Manrope** headings and ledger figures, **Inter** UI.
