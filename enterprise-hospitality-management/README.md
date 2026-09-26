# Vista Hospitality

A responsive hospitality portfolio dashboard built with Vite and `@poluru-labs/enterprise-design-system-wc`, using the #31AAA9 theme.

## Screenshot

<img width="3360" height="3590" alt="enterprise-hospitality-management" src="https://github.com/user-attachments/assets/78d967d1-3985-4f1e-ae2b-55d4800d56b5" />


## Run and validate

```sh
npm ci
npm run dev
npm test
npm run build
```

Includes a sticky header and mega menu, simple sidebar, illustrated property cards, revenue and occupancy charts, property filters, reservation search, check-in and checkout, housekeeping workflows, guest issue resolution, and CSV export.

The fictional portfolio uses a September 23, 2026 snapshot. Creating reservations, updating housekeeping tasks, and resolving guest issues persist in browser local storage. Portfolio metrics are illustrative snapshots and are not recalculated from the small demo reservation register. No live hotel systems or email service are connected. All sample people have the surname Poluru; no AI features are included.

Main implementation: `src/components/vista-dashboard.js`. Styling: `src/styles/vista.css`, `src/styles/layout.css`, and `src/styles/tokens.css`.

Created by [Subrahmanyam Poluru](https://polurus.com). Built with [@poluru-labs/enterprise-design-system-wc](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-wc).
