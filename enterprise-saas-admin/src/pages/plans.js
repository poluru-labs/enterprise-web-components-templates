import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { plans, subscriptionColumns, subscriptions } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderPlans() {
  return `
    ${pageHeader({
      eyebrow: 'Billing',
      title: 'Plans',
      lead: 'Starter, Growth, Enterprise, and Platform. Change a subscription or open a custom quote.',
      actions: `
        <eds-split-button id="plan-split" label="New quote" variant="primary" icon="star">
          <eds-menu-item label="Growth upgrade" value="growth"></eds-menu-item>
          <eds-menu-item label="Enterprise quote" value="enterprise"></eds-menu-item>
        </eds-split-button>
      `,
    })}
    <section class="row g-3 mb-3 stretch-grid">
      ${plans
        .map(
          (plan) => `
        <div class="col-md-6 col-xl-3">
          <eds-card class="sheet plan-card${plan.highlight ? ' plan-card--highlight' : ''}" padded elevated>
            <div slot="header">
              <span class="kicker">${plan.orgs} orgs</span>
              <h2>${plan.name}</h2>
            </div>
            <p class="plan-price">${plan.price}<small>/mo</small></p>
            <p class="muted">${plan.seats}</p>
            <p>${plan.features}</p>
            <div slot="footer">
              <eds-button class="plan-pick" variant="${plan.name === 'Enterprise' || plan.highlight ? 'primary' : 'secondary'}" data-plan="${plan.name}">Select</eds-button>
            </div>
          </eds-card>
        </div>`,
        )
        .join('')}
    </section>
    ${sheet({
      title: 'Subscriptions',
      body: '<eds-data-table id="sub-table" sortable striped></eds-data-table>',
    })}
  `;
}

export function hydratePlans(root) {
  const table = root.querySelector('#sub-table');
  if (table) {
    table.columns = subscriptionColumns;
    table.rows = subscriptions;
  }
  root.querySelector('#plan-split')?.addEventListener('eds-click', () => {
    showToast({ message: 'Quote opened for Growth', variant: 'info' });
  });
  root.querySelector('#plan-split')?.addEventListener('eds-select', (event) => {
    showToast({ message: `${event.detail?.label} started`, variant: 'success' });
  });
  root.querySelectorAll('.plan-pick').forEach((button) => {
    button.addEventListener('eds-click', () => {
      showToast({ message: `${button.dataset.plan} selected`, variant: 'success' });
    });
  });
}
