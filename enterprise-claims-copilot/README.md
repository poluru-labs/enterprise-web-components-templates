# Vista Hospitality

Hospitality portfolio workspace for **Vista Hospitality**. Light theme, brand `#31AAA9`, hash routing.

Demo people use the surname **Poluru**. Signed in as **Mira Poluru**, Portfolio manager. Portfolio snapshot date: **23 Sep 2026**.

## Screenshot

<img width="3360" height="3090" alt="enterprise-claims-copilot" src="https://github.com/user-attachments/assets/6832be7f-e8cd-42bc-add2-438c6052e072" />




## Run

```bash
npm install
npm run dev
npm test
npm run build
```

Opens at [http://localhost:5178](http://localhost:5178). Preview build at port **4178**.

## Hospitality workspace header

Vista uses a **sticky topbar** with the `vista.` wordmark, a **Hospitality workspace** mega menu, guest/reservation search (`⌘K`), guest-issues inbox, and profile. The left sidebar lists Overview through Revenue, plus Settings and Help. Implemented as the `<vista-dashboard>` custom element.

## Folder map

```
src/
  main.js                      # boot: tokens, DS, styles, mount <vista-dashboard>
  components/
    vista-dashboard.js         # <vista-dashboard> shell, routes, and workflows
    vista-dashboard.test.js
  styles/
    tokens.css                 # brand #31AAA9 and EDS overrides
    layout.css
    vista.css                  # hospitality layout, cards, charts
  test/setup.js
```

## Pages

Overview, Properties, Reservations, Occupancy, Housekeeping, Guest issues, Revenue, Settings, Help.

Jump with `⌘K` (focuses search) or the mega menu / sidebar.

Interactive demo workflows: create reservations, check guests in/out, progress housekeeping tasks, resolve guest issues, and export a CSV. Reservation, housekeeping, and issue changes persist in browser `localStorage`. Portfolio KPIs are a fixed September 23 snapshot and are not recalculated from the demo register. No live PMS or email service is connected.

## Tests

Vitest + jsdom unit tests cover hospitality routes, mega menu, property filters, reservation search, booking/check-in, housekeeping, and guest-issue workflows:

```bash
npm test
```

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com

Built with [@poluru-labs/enterprise-design-system-wc](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-wc).
