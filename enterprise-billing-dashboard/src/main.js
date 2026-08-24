import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@poluru-labs/enterprise-design-system-wc';
import './style.css';

document.querySelector('#app').innerHTML = `
  <div class="container py-5">
    <header class="mb-5"><span class="eyebrow">Enterprise workspace</span><h1 class="display-5 fw-semibold mt-2">Billing Dashboard</h1><p class="lead text-secondary">A focused starting point for financial operations.</p></header>
    <section class="row g-4" aria-label="Billing overview">
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-wallet2"></i><span>Collected</span><strong>$482K</strong><small>+11.2% this month</small></article></div>
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-receipt"></i><span>Invoices sent</span><strong>1,248</strong><small>92% paid on time</small></article></div>
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-arrow-repeat"></i><span>Recurring revenue</span><strong>$96K</strong><small>+7.8% this month</small></article></div>
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-exclamation-circle"></i><span>Past due</span><strong>$18.4K</strong><small>12 accounts affected</small></article></div>
    </section>
  </div>
`;
