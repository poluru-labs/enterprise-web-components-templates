import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { orderColumns, orderReviews, orders } from '../data/index.js';
import { bars, cardGrid, chartPanel, equalHeightRow, filterBar, pageHeader, snapshotCard } from '../components/widgets.js';
import { viewState } from './state.js';

export function render() {
  return `
    ${pageHeader({
      eyebrow: 'Diagnostics',
      title: 'Orders',
      lead: 'Labs and procedures from collection through clinician review.',
      actions: `<eds-button id="new-order" variant="primary" icon="plus">New order</eds-button>`,
    })}
    ${cardGrid(orderReviews.map((item) => snapshotCard(item)))}
    <halo-content-card class="mt-3">
      ${filterBar(`<eds-segmented-control id="order-status"></eds-segmented-control>`)}
      <div class="mt-3">
        <eds-data-table id="order-table" sortable striped compact></eds-data-table>
      </div>
    </halo-content-card>
    <div class="mt-3">
    ${equalHeightRow([
      {
        className: 'col-lg-6',
        html: chartPanel({
          title: 'Pipeline',
          body:
            bars([16, 20, 33, 31], 'Pending, collected, in progress, resulted') +
            '<p class="halo-muted mt-2 mb-0">16% pending · 20% collected · 33% in progress · 31% resulted</p>',
        }),
      },
      {
        className: 'col-lg-6',
        html: `
          <halo-content-card stretch title="Review queue">
            <eds-list id="order-review" divided></eds-list>
          </halo-content-card>
        `,
      },
    ])}
    </div>
  `;
}

export function hydrate(root) {
  const table = root.querySelector('#order-table');
  const paint = () => {
    if (!table) return;
    table.columns = orderColumns;
    table.rows =
      viewState.orderStatus === 'all'
        ? orders
        : orders.filter((row) => row.status.toLowerCase() === viewState.orderStatus);
  };
  const seg = root.querySelector('#order-status');
  if (seg) {
    seg.options = [
      { label: 'All', value: 'all' },
      { label: 'Pending', value: 'pending' },
      { label: 'Collected', value: 'collected' },
      { label: 'In progress', value: 'in progress' },
      { label: 'Resulted', value: 'resulted' },
      { label: 'Review', value: 'review' },
    ];
    seg.value = viewState.orderStatus;
    seg.addEventListener('eds-change', (event) => {
      viewState.orderStatus = (event.detail?.value ?? 'all').toLowerCase();
      paint();
    });
  }
  paint();
  const list = root.querySelector('#order-review');
  if (list) {
    list.items = orders
      .filter((item) => item.status === 'Review' || item.status === 'Resulted')
      .map((item) => ({ label: item.test, description: `${item.patient} · ${item.id}`, icon: 'star' }));
  }
  root.querySelector('#new-order')?.addEventListener('eds-click', () => {
    showToast({ message: 'Order ticket opened for the current chart', variant: 'info' });
  });
}
