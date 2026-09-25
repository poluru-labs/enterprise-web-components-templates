# Sentinel

Security command center for the **Threat command center** workspace. Light theme, brand `#BF092F`, hash routing.

Signed in as **Mira Poluru**, Security administrator. Snapshot date: **Friday 11 September 2026**.

## Screenshot

<img width="3360" height="3326" alt="enterprise-manufacturing-dashboard" src="https://github.com/user-attachments/assets/69ef1a0b-f758-4d11-b920-0fb0f83ddcf5" />


## Run

Requires Node.js 20+.

```bash
cd enterprise-manufacturing-dashboard
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

`src/main.js` loads design-system tokens and mounts `<signal-shell>`. A dark sidebar stays open on wide screens and slides in from the menu button below 1000px. The header is a live command bar: Sentinel wordmark, search (`⌘K`), inbox, **New incident**, and the signed-in administrator. A ticker under the bar shows open incidents, alerts, risk, coverage, and MTTR.

## Routes

| Hash | Sidebar label |
| --- | --- |
| `#/overview` | Command center |
| `#/alerts` | Incidents |
| `#/scorecards` | Alerts |
| `#/goals` | Vulnerabilities |
| `#/trends` | Investigations |
| `#/teams` | Response playbooks |
| `#/reviews` | Threat intel |
| `#/reports` | Reports |
| `#/settings` | Settings |

Every hash currently paints the same command-center page: open incidents, alert volume, control coverage, and the audit trail.

## Demo behavior

**New incident** and **Start investigation** open the alert dialog. Saving it shows a toast and does not add a row. Search opens the command list. Figures such as **02** open incidents, **18** active alerts, **8.4/10** risk, and **87%** coverage are a fixed 11 September snapshot. No detection platform or ticketing system is connected.

## Tests

Vitest + jsdom covers the author footer on the shell, plus format, search, status, and router helpers:

```bash
npm test
```

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com

Built with [@poluru-labs/enterprise-design-system-wc](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-wc).
