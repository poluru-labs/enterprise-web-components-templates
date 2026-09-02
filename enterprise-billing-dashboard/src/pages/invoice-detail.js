import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { company, customers, invoiceLines, invoices, invoiceTimeline } from '../data/index.js';
import { badgeHtml, cardGrid, contentCard, pageHeader } from '../components/widgets.js';

export function renderInvoiceDetail(id) {
  const invoice = invoices.find((item) => item.id === id) ?? invoices[0];
  const customer = customers.find((item) => item.id === invoice.customerId);
  const lines = invoiceLines[invoice.id] ?? [
    { item: `${customer?.plan ?? 'Plan'} · Aug 2026`, qty: 1, rate: invoice.amount, total: invoice.amount },
  ];
  const related = [];
  const seen = new Set();
  for (const item of [...invoices.filter((row) => row.customerId === invoice.customerId), ...invoices]) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    related.push(item);
    if (related.length === 4) break;
  }
  return `
    ${pageHeader({
      eyebrow: 'Invoice',
      title: invoice.id,
      lead: `${invoice.customer} · issued ${invoice.issued} · due ${invoice.due}`,
      actions: `
        <eds-button id="inv-pdf" variant="secondary" icon="download">Download PDF</eds-button>
        <eds-button id="inv-remind" variant="secondary" icon="mail">Send reminder</eds-button>
        <eds-button id="inv-paid" variant="primary" icon="check">Mark as paid</eds-button>
        <eds-button id="inv-dupe" variant="tertiary" icon="copy">Duplicate</eds-button>
      `,
    })}
    <div class="row g-3 stretch-grid">
      <div class="col-lg-8">
        ${contentCard({
          title: '',
          body: `
            <div class="invoice-hero mb-3">
              <span class="kicker">Amount due</span>
              <strong>${invoice.amount}</strong>
              <div>${badgeHtml(invoice.status)} · ${invoice.method}</div>
            </div>
            <table class="line-table">
              <thead><tr><th>Description</th><th>Qty</th><th>Rate</th><th>Total</th></tr></thead>
              <tbody>
                ${lines.map((line) => `<tr><td>${line.item}</td><td>${line.qty}</td><td>${line.rate}</td><td>${line.total}</td></tr>`).join('')}
              </tbody>
            </table>
            <eds-description-list id="inv-totals" class="mt-3"></eds-description-list>
            <p class="muted mt-3 mb-0">Payment terms ${company.terms}. Late fees accrue after day 15.</p>
          `,
        })}
      </div>
      <div class="col-lg-4 stack">
        ${contentCard({
          title: 'Customer',
          body: `
            <p class="mb-1"><strong>${customer?.company}</strong></p>
            <p class="muted mb-1">${customer?.contact} · ${customer?.email}</p>
            <p class="muted">${customer?.address}</p>
            <eds-link href="#/customer/${customer?.id}" variant="default">Open profile</eds-link>
          `,
        })}
        ${contentCard({
          title: 'Audit timeline',
          body: '<eds-timeline id="inv-timeline"></eds-timeline>',
        })}
      </div>
    </div>
    <h2 class="section-kicker">Related invoices</h2>
    ${cardGrid(
      related.map(
        (item) => contentCard({
          title: item.id,
          action: badgeHtml(item.status),
          body: `
            <p class="muted mb-1">${item.customer} · due ${item.due}</p>
            <p class="ledger-amount mb-0">${item.amount}</p>
            <div class="inline-actions">
              <eds-link href="#/invoice/${item.id}" variant="default">Open</eds-link>
            </div>
          `,
        }),
      ),
    )}
  `;
}

export function hydrateInvoiceDetail(root, route) {
  const totals = root.querySelector('#inv-totals');
  if (totals) {
    totals.items = [
      { term: 'Subtotal', description: '$18,400' },
      { term: 'Discount', description: '$0' },
      { term: 'Tax', description: 'Included' },
      { term: 'Amount due', description: invoices.find((item) => item.id === route.id)?.amount ?? '$18,400' },
    ];
  }
  const timeline = root.querySelector('#inv-timeline');
  if (timeline) timeline.items = invoiceTimeline;
  root.querySelector('#inv-pdf')?.addEventListener('eds-click', () => showToast({ message: 'PDF downloaded', variant: 'success' }));
  root.querySelector('#inv-remind')?.addEventListener('eds-click', () => showToast({ message: 'Reminder sent', variant: 'success' }));
  root.querySelector('#inv-paid')?.addEventListener('eds-click', () => showToast({ message: 'Marked as paid', variant: 'success' }));
  root.querySelector('#inv-dupe')?.addEventListener('eds-click', () => showToast({ message: 'Draft duplicate created', variant: 'info' }));
}
