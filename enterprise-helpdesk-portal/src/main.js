import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@poluru-labs/enterprise-design-system-wc';
import './style.css';

document.querySelector('#app').innerHTML = `
  <div class="container py-5">
    <header class="mb-5"><span class="eyebrow">Enterprise workspace</span><h1 class="display-5 fw-semibold mt-2">Helpdesk Portal</h1><p class="lead text-secondary">A focused starting point for responsive customer support.</p></header>
    <section class="row g-4" aria-label="Helpdesk overview">
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-ticket-perforated"></i><span>Open tickets</span><strong>248</strong><small>38 created today</small></article></div>
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-stopwatch"></i><span>First response</span><strong>42m</strong><small>12% faster this week</small></article></div>
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-emoji-smile"></i><span>Satisfaction</span><strong>94.2%</strong><small>+2.1% this month</small></article></div>
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-check2-all"></i><span>Resolved today</span><strong>186</strong><small>91% within SLA</small></article></div>
    </section>
  </div>
`;
