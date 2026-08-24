import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@poluru-labs/enterprise-design-system-wc';
import './style.css';

document.querySelector('#app').innerHTML = `
  <div class="container py-5">
    <header class="mb-5"><span class="eyebrow">Enterprise workspace</span><h1 class="display-5 fw-semibold mt-2">CRM Dashboard</h1><p class="lead text-secondary">A focused starting point for your customer relationships.</p></header>
    <section class="row g-4" aria-label="CRM overview">
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-person-plus"></i><span>New leads</span><strong>384</strong><small>+18.6% this month</small></article></div>
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-briefcase"></i><span>Open deals</span><strong>72</strong><small>14 closing this week</small></article></div>
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-currency-dollar"></i><span>Pipeline value</span><strong>$1.2M</strong><small>+9.4% this month</small></article></div>
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-chat-square-text"></i><span>Follow-ups</span><strong>28</strong><small>6 due today</small></article></div>
    </section>
  </div>
`;
