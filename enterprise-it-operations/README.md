# TechStar

IT operations workspace for **Northline Systems**. Light theme, brand `#88BDA4`, hash routing.

Signed in as **Mira Poluru**, Operations manager. Demo people use the surname **Poluru**. Snapshot: **week of 16 Sep 2026**.

## Run

Requires Node.js 20+.

```bash
cd enterprise-it-operations
npm install
npm run dev
```

Dev server: http://127.0.0.1:5188

Preview build: `npm run build && npm run preview` → http://127.0.0.1:4188

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server (port 5188) |
| `npm run build` | Production build (`base: './'`) |
| `npm run preview` | Preview build (port 4188) |
| `npm test` | Vitest unit tests |

## Workspace

`src/main.js` loads design-system tokens and mounts `<techstar-shell>`. The header stays fixed: TechStar wordmark, Operations / Estate / Services mega menu, search (`⌘K`), inbox, **Raise incident**, and the signed-in manager. A live ticker shows identity SLO, the open P1, tonight’s changes, Chicago health, asset count, and the on-call primary. The sidebar lists Overview through Settings. Only the main column scrolls, and the author footer stays aligned with that content.

## Routes

| Hash | Page |
| --- | --- |
| `#/overview` | Estate pulse, open queue, and control scorecard |
| `#/assets` | CMDB register |
| `#/asset/ci_sso` | Configuration item |
| `#/incidents` | Incident queue |
| `#/incident/INC-10482` | Major incident, Identity / SSO |
| `#/changes` | Change board |
| `#/change/CHG-2201` | Change record |
| `#/health` | Infrastructure health across sites |
| `#/availability` | Service SLOs |
| `#/oncall` | On-call rota |
| `#/maintenance` | Maintenance windows |
| `#/services` | Service catalog |
| `#/search` | Record search |
| `#/settings` | Workspace preferences |

On-call, maintenance, and services are in the mega menu. The sidebar covers overview, assets, incidents, changes, health, availability, and settings.

## Demo behavior

Raising an incident, submitting a change, registering a CI, publishing a maintenance window, approving a change, resolving an incident, or paging Sahana Poluru shows a toast. Those actions do not write to `localStorage`. Overview figures — **11** open incidents, **96%** estate health, **99.94%** service SLO, **412** configuration items — are a fixed week-of-16-Sep snapshot. No monitoring, CMDB, or paging service is connected.

## Tests

Vitest + jsdom covers the author footer, the Operations mega menu, the header ticker, and format, search, status, and router helpers:

```bash
npm test
```

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com

Built with [@poluru-labs/enterprise-design-system-wc](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-wc).
