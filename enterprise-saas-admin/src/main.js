import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@poluru-labs/enterprise-design-system-wc';
import './style.css';

document.querySelector('#app').innerHTML = `
  <div class="container py-5">
    <header class="mb-5"><span class="eyebrow">Enterprise workspace</span><h1 class="display-5 fw-semibold mt-2">SaaS Admin</h1><p class="lead text-secondary">A focused starting point for managing your platform.</p></header>
    <section class="row g-4" aria-label="SaaS overview">
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-buildings"></i><span>Organizations</span><strong>842</strong><small>+32 this month</small></article></div>
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-person-check"></i><span>Active seats</span><strong>12,480</strong><small>82% utilization</small></article></div>
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-credit-card"></i><span>Monthly recurring</span><strong>$186K</strong><small>+13.6% this month</small></article></div>
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-shield-check"></i><span>Uptime</span><strong>99.98%</strong><small>Last 30 days</small></article></div>
    </section>
  </div>
`;
