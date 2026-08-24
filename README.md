# Enterprise Web Components Templates

Starter enterprise interfaces built with [Bootstrap](https://getbootstrap.com/), [Bootstrap Icons](https://icons.getbootstrap.com/), [Vite](https://vite.dev/), and [@poluru-labs/enterprise-design-system-wc](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-wc).

Each template is an independent Vite application with its own `package.json`, HTML entrypoint, and `src/` directory.

## Templates

| Template | Use case | Folder |
| --- | --- | --- |
| KPI Dashboard | Key performance indicators and executive metrics | [enterprise-kpi-dashboard](enterprise-kpi-dashboard/) |
| CRM Dashboard | Customer relationships, leads, and sales pipeline | [enterprise-crm-dashboard](enterprise-crm-dashboard/) |
| HRMS Portal | Employee operations, leave, and training | [enterprise-hrms-portal](enterprise-hrms-portal/) |
| Project Dashboard | Project planning, tasks, and team capacity | [enterprise-project-dashboard](enterprise-project-dashboard/) |
| Billing Dashboard | Invoices, collections, and recurring revenue | [enterprise-billing-dashboard](enterprise-billing-dashboard/) |
| Inventory Dashboard | Stock levels, inbound orders, and alerts | [enterprise-inventory-dashboard](enterprise-inventory-dashboard/) |
| Clinic Admin | Appointments, patients, and care capacity | [enterprise-clinic-admin](enterprise-clinic-admin/) |
| Helpdesk Portal | Support tickets, response times, and service levels | [enterprise-helpdesk-portal](enterprise-helpdesk-portal/) |
| BI Dashboard | Reports, data quality, and shared insights | [enterprise-bi-dashboard](enterprise-bi-dashboard/) |
| SaaS Admin | Organizations, seats, subscriptions, and uptime | [enterprise-saas-admin](enterprise-saas-admin/) |

## Getting Started

Requirements: Node.js 20 or newer.

Choose a template, install its dependencies, and start the development server:

```bash
cd enterprise-bi-dashboard
npm install
npm run dev
```

Replace `enterprise-bi-dashboard` with any folder from the table above. Use `npm run build` to create a production build or `npm run preview` to preview one locally.

## Shared Stack

- Bootstrap 5 for responsive layout and utility classes
- Bootstrap Icons for interface icons
- `@poluru-labs/enterprise-design-system-wc` for enterprise web components
- Vite for local development and production builds

Dependencies and build output are excluded from Git through the root [.gitignore](.gitignore).
