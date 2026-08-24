import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@poluru-labs/enterprise-design-system-wc';
import './style.css';

document.querySelector('#app').innerHTML = `
  <div class="container py-5">
    <header class="mb-5"><span class="eyebrow">Enterprise workspace</span><h1 class="display-5 fw-semibold mt-2">Clinic Admin</h1><p class="lead text-secondary">A focused starting point for coordinated patient care.</p></header>
    <section class="row g-4" aria-label="Clinic overview">
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-calendar2-week"></i><span>Appointments</span><strong>128</strong><small>34 scheduled today</small></article></div>
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-person-vcard"></i><span>Patients served</span><strong>2,846</strong><small>+8.5% this month</small></article></div>
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-heart-pulse"></i><span>Care capacity</span><strong>82%</strong><small>14 slots available</small></article></div>
      <div class="col-sm-6 col-xl-3"><article class="metric-card"><i class="bi bi-clipboard2-pulse"></i><span>Pending reviews</span><strong>16</strong><small>4 need attention</small></article></div>
    </section>
  </div>
`;
