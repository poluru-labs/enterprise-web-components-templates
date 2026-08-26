# Lyra CRM

Enterprise sales workspace with a **full-height sticky sidebar**, pipeline
kanban, deals, leads, accounts, activities, and forecast. Light theme with
brand **`#1055C9`**.

## Run

Requires Node.js 20+.

```bash
cd enterprise-crm-dashboard
npm install
npm run dev
```

Default dev server: http://localhost:5175

| Route | Page |
| --- | --- |
| `#/overview` | KPI pulse, pipeline trend, quota, hot deals |
| `#/pipeline` | Kanban board — drag deals between stages |
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

Typography: **Outfit** headings, **Plus Jakarta Sans** UI. Stack: Vite,
Bootstrap 5 grid, `@poluru-labs/enterprise-design-system-wc`.
