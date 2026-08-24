import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@poluru-labs/enterprise-design-system-wc';
import './style.css';

document.querySelector('#app').innerHTML = `
  <div class="container py-5">
    <header class="mb-5"><span class="eyebrow">Enterprise workspace</span><h1 class="display-5 fw-semibold mt-2">HRMS Portal</h1><p class="lead text-secondary">A focused starting point for your people operations.</p></header>
    <section class="row g-4" aria-label="HR overview">
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-people"></i><span>Total employees</span><strong>1,284</strong><small>+24 this quarter</small></article></div>
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-calendar2-check"></i><span>Leave requests</span><strong>18</strong><small>5 need review</small></article></div>
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-mortarboard"></i><span>Training progress</span><strong>74%</strong><small>+6% this month</small></article></div>
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-heart-pulse"></i><span>Engagement</span><strong>8.6/10</strong><small>+0.4 this quarter</small></article></div>
    </section>
  </div>
`;
