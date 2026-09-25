# Harbor Vendor Management

A responsive vendor workspace built with Vite and `@poluru-labs/enterprise-design-system-wc`, themed in #D70654.

Includes a sticky mega-menu header, simple sidebar, portfolio metrics, onboarding pipeline, risk distribution, vendor search and filters, vendor creation, review notes, renewal details, contract register, and CSV export. Sample people use the Poluru surname.

## Screenshot

<img width="3360" height="3228" alt="enterprise-vendor-management" src="https://github.com/user-attachments/assets/2e65059b-07d2-4375-b7a0-0d8dd5eafa72" />


## Run locally

```sh
npm ci
npm run dev
```

## Validation

```sh
npm test
npm run build
```

The dashboard uses illustrative portfolio totals and six interactive sample vendor records. Export operates on the filtered sample records. New vendors, notes, and preferences remain in the current session; refreshing restores the initial sample workspace. No backend or authentication is connected.
