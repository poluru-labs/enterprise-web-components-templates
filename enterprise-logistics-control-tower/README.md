# Meridian Logistics

Meridian Logistics is an enterprise logistics control tower starter for monitoring shipments, routes, carrier performance, delivery exceptions, and warehouse handoffs in one operational workspace.

## Starter capabilities

- Shipment flow: track in-transit volume, on-time delivery, and active loads.
- Route health: scan lane status, ETA risk, and network throughput.
- Carrier performance: compare service levels and tender acceptance.
- Delivery exceptions: prioritize delayed, damaged, or held shipments.
- Warehouse handoffs: monitor dock queues and transfer readiness.

## Local setup

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Validation

```bash
npm run build
npm test
```

## Structure

- `src/components/`: reusable shell and design-system web components.
- `src/data/`: starter workspace data and navigation exports.
- `src/pages/`: route rendering and view hydration.
- `src/styles/`: product tokens and shell/layout styling.
- `src/lib/`: routing, formatting, search, and status helpers.
- `src/test/`: project-level test fixtures and checks.
