# Meridian

Marketing operations workspace for **Meridian Studio**. Light theme, brand `#1A2A4F`, hash routing.

Signed in as **Anika Poluru**, Marketing director. Demo people use the surname **Poluru**. Reporting period: **September 2026**.

## Screenshot

<img width="3360" height="4196" alt="enterprise-marketing-operations" src="https://github.com/user-attachments/assets/44c547f5-c450-4edb-b553-4287b182c3f9" />


## Run

Requires Node.js 20+.

```bash
cd enterprise-marketing-operations
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

`src/main.js` loads design-system tokens and mounts `<meridian-shell>` from `src/components/meridian-shell.js`. The page opens full width. The menu button reveals a sidebar for Overview through Channel performance. The section nav repeats those pages. The top bar has the `meridian.` wordmark, campaign search (`⌘K`), notifications, and the signed-in marketing director.

## Routes

| Hash | View |
| --- | --- |
| `#/overview` | Revenue, active campaigns, reach, return on ad spend, and the campaign register |
| `#/campaigns` | Full campaign list with status filters and row selection |
| `#/audiences` | Brand explorers, everyday enthusiasts, and Meridian insiders |
| `#/calendar` | Upcoming content for September 18–20 |
| `#/budgets` | Spend against planned campaign budgets |
| `#/channels` | Paid social, paid search, email, and organic |

## Demo behavior

Search campaigns, filter by status, select visible rows, export a CSV, and create a campaign. A new campaign needs a name and a budget of zero or more. Names are escaped before they render. Campaigns created in the session stay in memory for this page load and are not written to `localStorage`.

Overview figures, including **$128,640** campaign revenue and **4.6x** return on ad spend, are a fixed September snapshot. Switching the period to last month shows the August set. No ad platform or email service is connected.

## Tests

Vitest + jsdom covers the sidebar toggle, campaign search and status filters, campaign create, every marketing section, row selection, and the author footer:

```bash
npm test
```

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com

Built with [@poluru-labs/enterprise-design-system-wc](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-wc).
