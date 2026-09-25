# Covera

Revenue cycle workspace for **Covera Medical Group**. Light theme, brand `#E87F24`, hash routing.

Signed in as **Priya Poluru**, Billing administrator. Demo patients use the surname **Poluru**. Reporting period: **September 2026**.

## Run

Requires Node.js 20+.

```bash
cd enterprise-revenue-cycle-dashboard
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

`src/main.js` loads design-system tokens and mounts `<covera-app>` from `src/components/covera.js`. The page opens full width. The menu button reveals a sidebar for Overview through Collections. The workspace bar repeats those sections, with a September or August period selector. The top bar shows the Covera wordmark, a demo-workspace chip, notifications, and the signed-in billing administrator.

## Routes

| Hash | View |
| --- | --- |
| `#/Overview` | Collections, receivables, clean-claim rate, days in A/R, payer mix, patient accounts |
| `#/Patient%20billing` | Patient balances and statements |
| `#/Claims` | Claims from submission to payment |
| `#/Denials` | Denied claims ready for appeal |
| `#/Reimbursements` | Paid and pending remittances |
| `#/Collections` | Overdue balances and payment plans |

## Demo behavior

Search accounts, filter by status, page the register, export a CSV, record a payment, and mark a denied claim in review. A payment cannot exceed the outstanding balance. Payments and appeal status last for this browser session only and are not written to `localStorage`.

Overview figures, including **$284,560** collected against a **$320,000** goal, are a fixed September snapshot. Switching the period to August redraws the collections chart. No payer, clearinghouse, or patient billing service is connected.

## Tests

Vitest + jsdom covers the sidebar toggle, denial worklist search, payment validation, appeal review, pagination, and the author footer:

```bash
npm test
```

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com

Built with [@poluru-labs/enterprise-design-system-wc](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-wc).
