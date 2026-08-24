# Architecture

Helix Analytics is a hash-routed single-page template. There is no backend. Sample
metrics live in `src/data.js`.

## Source map

| File | Role |
| --- | --- |
| `index.html` | Document shell, meta, fonts, skip link |
| `src/main.js` | Token import, app shell, routing, global overlays |
| `src/views.js` | View markup and per-route hydration |
| `src/features.js` | Goals, forecasts, sources, usage, team, and overview extras |
| `src/data.js` | Fictional workspace, reports, SQL, nav |
| `src/style.css` | Brand token overrides and layout |
| `vite.config.js` | Relative `base`, ports, sourcemaps |

## Routing

`window.location.hash` selects a route from `routes` in `src/data.js`.
`hashchange` re-renders `#view` and refreshes `eds-side-nav` plus
`eds-breadcrumb`. Unknown hashes fall back to Overview.

## State

`viewState` in `src/views.js` holds catalog page, search text, selected range,
and the Explorer tree selection. Shell overlays (`eds-drawer`, `eds-modal`)
stay mounted so any view can open them.

## Design-system integration

```js
import '@poluru-labs/enterprise-design-system-wc/tokens.css';
import '@poluru-labs/enterprise-design-system-wc';
import { showToast, setDensity, todayISO, formatCount } from '@poluru-labs/enterprise-design-system-wc';
```

Array and object properties (`items`, `columns`, `rows`, `options`, `steps`)
are assigned in JavaScript after the view HTML is inserted. Scalar attributes
can stay in markup.

## Layout

The shell is a two-column CSS grid. Bootstrap supplies only the responsive
`row` / `col-*` system inside each view. Component chrome comes from `eds-*`
elements so the brand tokens apply consistently.
