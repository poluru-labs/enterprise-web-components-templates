# Terra Energy

Energy operations workspace for the **Terra Energy** enterprise portfolio. Light theme, brand `#4E61D3`, hash routing.

Signed in as **Aditya Poluru**, Operations manager. Demo people use the surname **Poluru**. Portfolio updated **Sep 16, 2026 · 09:41 AM**.

## Screenshot

<img width="3360" height="4122" alt="enterprise-energy-operations" src="https://github.com/user-attachments/assets/7e1db327-d105-4f0a-9520-f87400911af2" />


## Run

Requires Node.js 20+.

```bash
cd enterprise-energy-operations
npm install
npm run dev
```

Dev server: http://localhost:5178

Preview build: `npm run build && npm run preview` → http://localhost:4178

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server (port 5178) |
| `npm run build` | Production build (`base: './'`) |
| `npm run preview` | Preview build (port 4178) |
| `npm test` | Vitest unit tests |

## Workspace

`src/main.js` loads design-system tokens and starts `src/terra.js`. The top bar has the `terra energy` wordmark, an enterprise workspace chip, search (`⌘K`), notifications, and the signed-in operations manager. The main nav covers Overview through Sustainability, and **All modules** opens a mega menu for operations and performance.

## Routes

| Hash | View |
| --- | --- |
| `#/overview` | Production, consumption, fleet availability, carbon avoided, site table, and maintenance |
| `#/sites` | All six sites, with source filter and search |
| `#/production` | Production and consumption chart |
| `#/outages` | Active outage at Redwood Battery Storage |
| `#/maintenance` | Work orders |
| `#/consumption` | Consumption against production |
| `#/sustainability` | Carbon avoided and the monthly reduction target |

## Demo behavior

Search sites, filter by energy source, open a site drawer, export the portfolio, and schedule a maintenance task. A task needs a name and a date. Work orders persist in this browser under `terra-work-orders`. Compact layout persists under `terra-compact`.

Overview figures — **1,284.6 MWh** production, **846.2 MWh** consumption, **98.6%** fleet availability, **428.5 tCO₂** avoided — are a fixed week-of-Sep-16 snapshot. No SCADA, work-management, or sustainability system is connected.

## Tests

Vitest + jsdom covers the six-site portfolio, combined site filters, the mega menu, maintenance save, and the author footer:

```bash
npm test
```

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com

Built with [@poluru-labs/enterprise-design-system-wc](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-wc).
