import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@poluru-labs/enterprise-design-system-wc';
import './style.css';

document.querySelector('#app').innerHTML = `
  <div class="container py-5">
    <header class="mb-5">
      <span class="eyebrow">Enterprise workspace</span>
      <h1 class="display-5 fw-semibold mt-2">KPI Dashboard</h1>
      <p class="lead text-secondary">A focused starting point for your key performance indicators.</p>
    </header>
    <section class="row g-4" aria-label="Dashboard overview">
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-graph-up-arrow"></i><span>Revenue</span><strong>$248K</strong><small>+12.4% this month</small></article></div>
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-people"></i><span>Active users</span><strong>18,420</strong><small>+8.2% this month</small></article></div>
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-check2-circle"></i><span>Completion</span><strong>86.8%</strong><small>+3.1% this month</small></article></div>
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-clock-history"></i><span>Response time</span><strong>1.8h</strong><small>14% faster this month</small></article></div>
    </section>
  </div>
`;
