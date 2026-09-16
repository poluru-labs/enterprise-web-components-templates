import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { accounts, currentUser, kpis, nrrTrend, qbrs, workspace } from '../data/index.js';
import { accountGrid, cadenceList, healthMix, hydrateStats, pageHeader, sheet, sparkline, statGrid } from '../components/widgets.js';
import { formatCurrency } from '../lib/format.js';

export function renderOverview() {
  return `
    ${pageHeader({
      eyebrow: workspace.period,
      title: 'Portfolio pulse',
      lead: `Good afternoon, ${currentUser.name.split(' ')[0]}. NRR is 118%. Lattice Energy is the only red account. Fold Paper renews in six days.`,
      actions: `
        <eds-segmented-control id="dash-period"></eds-segmented-control>
        <eds-button id="qa-account" variant="primary" icon="plus">New account</eds-button>
        <eds-button id="qa-play" variant="secondary" icon="file">Run playbook</eds-button>
      `,
    })}
    <eds-alert id="risk-alert" variant="warning" dismissible title="Lattice Energy is at risk" message="Health 58 against a 70 floor. Support CSAT slipped and adoption is 52%. Hana Poluru owns the recovery play."></eds-alert>
    ${statGrid(kpis, 'kpi')}
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-8">
        ${sheet({
          title: 'Net revenue retain',
          action: '<eds-badge label="T12M" variant="brand" pill></eds-badge>',
          body: `${sparkline(nrrTrend, 'Trailing twelve months of net revenue retention')}
            <p class="muted mb-0 mt-2">118% year to date. Expansion from Brightwell and Lumen is the lift. Gross retain holds at 96%.</p>`,
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Book health',
          action: '<eds-status label="Hold" variant="success" pulse></eds-status>',
          body: `
            <div class="health-block">
              <eds-circular-progress id="health-ring" value="84" max="100" size="148" stroke-width="8" show-value></eds-circular-progress>
              <eds-meter value="84" min="0" max="100" low="65" high="80" optimum="90" label="Portfolio score" show-value></eds-meter>
              <p class="muted mb-0">Seven healthy, two watch, one at risk. Onboarding for Alder and Northline is in week 9.</p>
            </div>`,
        })}
      </div>
    </section>
    <section class="mt-3">
      <div class="section-title mb-2">
        <h2>Accounts</h2>
        <eds-link href="#/accounts" variant="subtle">All</eds-link>
      </div>
      ${accountGrid(accounts.slice(0, 6))}
    </section>
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-5">
        ${sheet({
          title: 'Needs a look',
          action: '<eds-link href="#/health" variant="subtle">Health</eds-link>',
          body: '<eds-list id="watch-list" divided></eds-list>',
        })}
      </div>
      <div class="col-lg-7">
        ${sheet({
          title: 'Recent movement',
          action: '<eds-link href="#/renewals" variant="subtle">Renewals</eds-link>',
          body: '<eds-data-table id="recent-accounts" compact striped></eds-data-table>',
        })}
      </div>
    </section>
    <section class="row g-3 mt-1 stretch">
      <div class="col-lg-8">
        ${sheet({
          title: 'QBR cadence',
          action: `
            <div class="inline-actions">
              <eds-badge label="This week" variant="brand" pill></eds-badge>
              <eds-link href="#/playbooks" variant="subtle">Playbooks</eds-link>
            </div>`,
          body: cadenceList(qbrs),
        })}
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Health mix',
          action: '<eds-link href="#/health" variant="subtle">Scores</eds-link>',
          body: healthMix(accounts),
        })}
      </div>
    </section>
  `;
}

export function hydrateOverview(root) {
  hydrateStats(root, kpis, 'kpi');
  const period = root.querySelector('#dash-period');
  if (period) {
    period.options = [
      { label: 'Week', value: 'week' },
      { label: 'Q3', value: 'q3' },
      { label: 'FY26', value: 'fy' },
    ];
    period.value = 'q3';
  }
  const watch = root.querySelector('#watch-list');
  if (watch) {
    watch.items = [
      { label: 'Lattice Energy', description: 'Hana Poluru · health 58', icon: 'alert-triangle', href: '#/account/ac_lattice' },
      { label: 'Fold Paper renewal', description: 'Rohan Poluru · 22 Sep', icon: 'clock', href: '#/renewals' },
      { label: 'Northline SSO', description: 'Elena Poluru · onboarding', icon: 'file', href: '#/onboarding' },
      { label: 'Pine & Copper NPS', description: 'Luca Poluru · 36', icon: 'eye', href: '#/account/ac_pine' },
    ];
  }
  const recent = root.querySelector('#recent-accounts');
  if (recent) {
    recent.columns = [
      { key: 'name', label: 'Account' },
      { key: 'csm', label: 'CSM' },
      { key: 'status', label: 'Status' },
      { key: 'arr', label: 'ARR' },
    ];
    recent.rows = accounts.slice(0, 5).map((item) => ({
      name: item.name,
      csm: item.csm,
      status: item.status,
      arr: formatCurrency(item.arr),
    }));
  }
  recent?.addEventListener('click', () => {
    window.location.hash = '#/account/ac_harbor';
  });
  watch?.addEventListener('eds-select', (event) => {
    const href = event.detail?.href ?? event.detail?.item?.href;
    if (href) window.location.hash = href;
  });
  root.querySelector('#qa-account')?.addEventListener('eds-click', () => document.querySelector('#account-modal')?.show());
  root.querySelector('#qa-play')?.addEventListener('eds-click', () => document.querySelector('#play-modal')?.show());
  root.querySelector('#risk-alert')?.addEventListener('eds-dismiss', () => {
    showToast({ message: 'Lattice reminder dismissed', variant: 'info' });
  });
}
