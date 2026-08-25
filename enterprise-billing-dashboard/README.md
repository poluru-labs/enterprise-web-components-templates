# Verdant Billing

Premium SaaS finance and billing workspace: invoices, payments, subscriptions,
customers, analytics, and reports. Light theme with brand **`#1D4533`**.

## Run

Requires Node.js 20+.

```bash
cd enterprise-billing-dashboard
npm install
npm run dev
```

Default dev server: http://localhost:5174

| Route | Page |
| --- | --- |
| `#/overview` | KPI pulse, trends, recent invoices |
| `#/invoices` | Full ledger, filters, preview |
| `#/invoice/INV-2841` | Invoice detail |
| `#/payments` | Payments ledger |
| `#/subscriptions` | Plans and lifecycle |
| `#/customers` | Directory |
| `#/customer/cus_harbor` | Customer profile |
| `#/analytics` | MRR / ARR / mix |
| `#/reports` | Aging, recon, tax, retention |
| `#/settings` | Billing configuration |

Typography: **Manrope** headings, **Inter** UI. Stack: Vite, Bootstrap 5 grid,
`@poluru-labs/enterprise-design-system-wc`.
