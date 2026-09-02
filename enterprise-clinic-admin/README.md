# Halo Clinic Admin

Vite + vanilla web components clinic operations demo for **San Jose**. Uses Bootstrap 5, bootstrap-icons, and `@poluru-labs/enterprise-design-system-wc`.

## Stack

- Hash routing (`#/overview`, `#/schedule`, …)
- Product **Halo**, brand `#D90000`, CSS prefix `halo-`
- Signed in as **Aisha Poluru**, Practice administrator
- Dev server port **5175**, preview **4175**

## Scripts

```bash
npm install
npm run dev
npm test
npm run build
npm run preview
```

## Structure

```
src/
  components/   app-shell, app-header, app-sidebar, content-card, widgets
  pages/        Split views + global search
  data/         Patients, appointments, providers (Aug–Sep 2026)
  lib/          format, search, status, router (+ Vitest)
  styles/       tokens, layout, header
```

## Header

**Clinical shift board** — soft mist `#FBF5F5` bar with a horizontal room-occupancy meter, the next three appointments as compact time chips, a red cross mark, and search / ⌘K / New appointment / profile on the right.
