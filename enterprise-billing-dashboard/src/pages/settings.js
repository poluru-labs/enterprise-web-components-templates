import { company } from '../data/index.js';
import { formSection, pageHeader } from '../components/widgets.js';
import { showToast } from '@poluru-labs/enterprise-design-system-wc';

export function renderSettings() {
  return `
    ${pageHeader({
      eyebrow: 'Configuration',
      title: 'Billing settings',
      lead: 'Company profile, tax, templates, terms, currency, gateways, and notices.',
    })}
    <div class="row g-3 stretch-grid">
      <div class="col-lg-4">
        ${formSection({
          title: 'Company billing profile',
          body: `
            <eds-input label="Legal name" value="${company.name}" icon="edit"></eds-input>
            <eds-textarea label="Billing address" rows="3" value="${company.address}"></eds-textarea>
            <eds-input label="Tax ID" value="${company.taxId}"></eds-input>
          `,
        })}
      </div>
      <div class="col-lg-4">
        ${formSection({
          title: 'Tax & currency',
          body: `
            <eds-select id="currency" label="Default currency"></eds-select>
            <eds-switch label="Collect sales tax automatically" checked></eds-switch>
            <eds-switch label="Show VAT ID on invoices" checked></eds-switch>
            <eds-input label="Default tax rate" value="8.25%"></eds-input>
          `,
        })}
      </div>
      <div class="col-lg-4">
        ${formSection({
          title: 'Invoice template',
          body: `
            <eds-input label="From display name" value="Northshore Cloud"></eds-input>
            <eds-select id="terms" label="Default payment terms"></eds-select>
            <eds-textarea label="Footer" rows="3" value="Thank you for building with Northshore. Questions: billing@northshore.example"></eds-textarea>
          `,
        })}
      </div>
      <div class="col-lg-4">
        ${formSection({
          title: 'Gateways & notifications',
          body: `
            <eds-status variant="success" label="Stripe connected" pulse></eds-status>
            <eds-status variant="success" label="ACH via Plaid" ></eds-status>
            <eds-switch class="mt-2" label="Email customers when invoices are issued" checked></eds-switch>
            <eds-switch label="Slack #revops on failed payments" checked></eds-switch>
            <eds-switch label="Dunning sequence (3 reminders)" checked></eds-switch>
            <eds-button id="save-settings" variant="primary" icon="save">Save configuration</eds-button>
          `,
        })}
      </div>
      <div class="col-lg-4">
        ${formSection({
          title: 'Dunning cadence',
          body: `
            <eds-input label="Reminder 1" value="Day 1 · invoice issued"></eds-input>
            <eds-input label="Reminder 2" value="Day 8 · polite follow-up"></eds-input>
            <eds-input label="Reminder 3" value="Day 15 · pause auto-renew"></eds-input>
            <eds-switch label="Copy #revops on reminder 3" checked></eds-switch>
          `,
        })}
      </div>
      <div class="col-lg-4">
        ${formSection({
          title: 'Fiscal calendar',
          body: `
            <eds-input label="Fiscal year start" value="1 February"></eds-input>
            <eds-select id="close-day" label="Monthly close"></eds-select>
            <eds-switch label="Lock posted periods" checked></eds-switch>
            <p class="muted mb-0">Books currently closed through 31 Jul 2026.</p>
          `,
        })}
      </div>
    </div>
  `;
}

export function hydrateSettings(root) {
  const currency = root.querySelector('#currency');
  if (currency) {
    currency.options = [
      { label: 'USD', value: 'usd' },
      { label: 'EUR', value: 'eur' },
      { label: 'GBP', value: 'gbp' },
      { label: 'INR', value: 'inr' },
    ];
    currency.value = 'usd';
  }
  const terms = root.querySelector('#terms');
  if (terms) {
    terms.options = [
      { label: 'Due on receipt', value: '0' },
      { label: 'Net 15', value: '15' },
      { label: 'Net 30', value: '30' },
    ];
    terms.value = '15';
  }
  const closeDay = root.querySelector('#close-day');
  if (closeDay) {
    closeDay.options = [
      { label: 'Last business day', value: 'last' },
      { label: 'Fifth of the month', value: '5' },
      { label: 'Tenth of the month', value: '10' },
    ];
    closeDay.value = 'last';
  }
  root.querySelector('#save-settings')?.addEventListener('eds-click', () => {
    showToast({ message: 'Billing configuration saved', variant: 'success' });
  });
}
