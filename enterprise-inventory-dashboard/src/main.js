import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@poluru-labs/enterprise-design-system-wc';
import './style.css';

document.querySelector('#app').innerHTML = `
  <div class="container py-5">
    <header class="mb-5"><span class="eyebrow">Enterprise workspace</span><h1 class="display-5 fw-semibold mt-2">Inventory Dashboard</h1><p class="lead text-secondary">A focused starting point for stock visibility and control.</p></header>
    <section class="row g-4" aria-label="Inventory overview">
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-box-seam"></i><span>Items in stock</span><strong>28,640</strong><small>Across 6 locations</small></article></div>
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-truck"></i><span>Inbound orders</span><strong>86</strong><small>24 arriving today</small></article></div>
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-bar-chart-line"></i><span>Stock accuracy</span><strong>98.4%</strong><small>+1.2% this quarter</small></article></div>
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-bell"></i><span>Low stock alerts</span><strong>14</strong><small>3 need attention</small></article></div>
    </section>
  </div>
`;
