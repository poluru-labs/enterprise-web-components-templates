import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@poluru-labs/enterprise-design-system-wc';
import './style.css';

document.querySelector('#app').innerHTML = `
  <div class="container py-5">
    <header class="mb-5"><span class="eyebrow">Enterprise workspace</span><h1 class="display-5 fw-semibold mt-2">Project Dashboard</h1><p class="lead text-secondary">A focused starting point for planning and delivery.</p></header>
    <section class="row g-4" aria-label="Project overview">
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-kanban"></i><span>Active projects</span><strong>24</strong><small>8 due this month</small></article></div>
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-list-check"></i><span>Tasks completed</span><strong>1,842</strong><small>+16.8% this month</small></article></div>
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-speedometer2"></i><span>On schedule</span><strong>91%</strong><small>+4.2% this month</small></article></div>
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-person-workspace"></i><span>Team capacity</span><strong>78%</strong><small>12 hours available</small></article></div>
    </section>
  </div>
`;
