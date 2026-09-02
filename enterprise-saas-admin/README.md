# Helio Admin

SaaS control plane for **Poluru Cloud** with a **dark ink tenancy bar**, chrome-yellow
seat meter, org switcher, and sidebar navigation for organizations, seats, plans,
feature flags, usage, and uptime. Light workspace theme with brand **`#F8DE22`**.

## Run

Requires Node.js 20+.

```bash
cd enterprise-saas-admin
npm install
npm run dev
```

Default dev server: http://127.0.0.1:5176

Preview build: `npm run build && npm run preview` → http://127.0.0.1:4176

If Vite prints a different port, open **that** URL with `127.0.0.1`, not `localhost`.

## Test

```bash
npm test
```

Vitest + jsdom. Utils copied from the HR dashboard template (`format`, `search`, `status`).

## Structure

```
src/
  main.js
  components/   app-shell, app-header, app-sidebar, content-card, widgets
  pages/        split views + search
  data/         orgs, seats, subscriptions, incidents
  lib/          format, search, status, router + tests
  styles/       tokens, layout, header
  test/setup.js
```

## Routes

| Route | Page |
| --- | --- |
| `#/overview` | Pulse, uptime, usage, recent orgs |
| `#/search` | Cross-workspace search |
| `#/organizations` | Tenant directory |
| `#/org/org_harbor` | Organization record |
| `#/members` | Seats and roles |
| `#/plans` | Subscriptions and upgrades |
| `#/flags` | Feature flags and rollout |
| `#/usage` | API, seats, and storage meters |
| `#/incidents` | Uptime and incident timeline |
| `#/audit` | Admin audit log |
| `#/settings` | SSO, keys, webhooks, density |

## Header

Sticky **tenancy bar** on ink `#1A1A12`: brand mark **H**, org switcher chip, chrome-yellow
**842 / 1,000** seat meter, search with **⌘K**, **Invite org**, and profile menu.

Typography: **Sora** headings, **Plus Jakarta Sans** UI. Stack: Vite, Bootstrap 5 grid,
`@poluru-labs/enterprise-design-system-wc` (`eds-*` components). Custom elements use
`helio-*` prefix; CSS tokens use `helio-` prefix.
