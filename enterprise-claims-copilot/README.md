# Signal — performance workspace

A responsive enterprise dashboard built with Vite and `@poluru-labs/enterprise-design-system-wc`, themed in #006199.

## Run

```sh
npm ci
npm run dev
```

## Validate

```sh
npm test
npm run build
```

Includes a sticky header with a keyboard-dismissible mega menu, compact sidebar, quarterly revenue chart, portfolio health, searchable and filterable scorecards, team directory, goals, notification drawer, report export, and settings. All sample people use the surname Poluru. There are no AI features or content.

The demo uses fictional data. Created scorecards and preferences persist in local storage on this browser. Exports contain current scorecard data as CSV; no backend or email delivery is connected.

Main implementation: `src/components/dashboard.js`. Theme and responsive layout: `src/styles/tokens.css` and `src/styles/layout.css`.
