# Helio Admin

SaaS control plane with a **full-width sticky header**, a simple sidebar, and
workspaces for organizations, seats, plans, feature flags, usage, and uptime.
Light theme with brand **`#F8DE22`**.

## Run

Requires Node.js 20+.

```bash
cd enterprise-saas-admin
npm install
npm run dev
```

Default dev server: http://127.0.0.1:5176

If Vite prints a different port (for example `5177`), open **that** URL with `127.0.0.1`, not `localhost`. `localhost` can hit a different empty process on the same port.

| Route | Page |
| --- | --- |
| `#/overview` | Pulse, uptime, usage, recent orgs |
| `#/organizations` | Tenant directory |
| `#/org/org_harbor` | Organization record |
| `#/members` | Seats and roles |
| `#/plans` | Subscriptions and upgrades |
| `#/flags` | Feature flags and rollout |
| `#/usage` | API, seats, and storage meters |
| `#/incidents` | Uptime and incident timeline |
| `#/audit` | Admin audit log |
| `#/settings` | SSO, keys, webhooks, density |

Typography: **Sora** headings, **Plus Jakarta Sans** UI. Stack: Vite,
Bootstrap 5 grid, `@poluru-labs/enterprise-design-system-wc`.
