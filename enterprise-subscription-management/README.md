# Prism

Subscription operations workspace for the **Poluru workspace**. Light theme, brand `#ED3F27`, hash routing.

Signed in as **Alex Poluru**, Workspace admin. Demo people use the surname **Poluru**. Portfolio snapshot: **September 2026**.

## Screenshot

<img width="3360" height="4068" alt="enterprise-subscription-management" src="https://github.com/user-attachments/assets/2431b717-7146-400f-aafd-2d42a0a9ca83" />


## Run

Requires Node.js 20+.

```bash
cd enterprise-subscription-management
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

`src/main.js` loads design-system tokens and mounts Prism from `src/prism.js`. The shell is a fixed sidebar (`prism.` wordmark, workspace switcher, section nav) and a sticky top bar with Explore, subscription search (`⌘K`), notifications, and the profile menu.

## Routes

| Hash | View |
| --- | --- |
| `#overview` | MRR, plan mix, renewals callout, subscription register |
| `#subscriptions` | Full register with status tabs, search, and plan filters |
| `#plans-&-entitlements` | Starter, Growth, and Enterprise plans |
| `#renewals` | Upcoming renewals |
| `#usage` | Per-account API capacity |
| `#cancellations` | Canceled accounts |
| `#revenue-retention` | Revenue chart and retention playbook |
| `#settings` | Workspace name, renewal and usage notices, currency |

## Demo behavior

Create a subscription, filter and search the register, export a CSV, save entitlement policies, and cancel or reactivate an account. Changes persist in this browser under `prism-subscriptions`, `prism-entitlements`, and `prism-preferences`.

New customer names must end with **Poluru**. Overview KPIs are a fixed September snapshot and are not recalculated from the register. No billing provider or email service is connected.

## Tests

Vitest + jsdom covers the overview, combined search and plan filters, subscription create, cancel and reactivate, and entitlement save:

```bash
npm test
```

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com

Built with [@poluru-labs/enterprise-design-system-wc](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-wc).
