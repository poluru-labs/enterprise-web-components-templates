const metrics = [
  { label: 'Active shipments', value: '2,486', detail: '1,904 in transit · 582 awaiting handoff', tone: 'teal' },
  { label: 'On-time delivery', value: '94.8%', detail: 'Target 93.5% · 1.6 pts above last week', tone: 'green' },
  { label: 'Route health', value: '87 / 92', detail: 'Healthy lanes · 5 lanes need attention', tone: 'amber' },
  { label: 'Open exceptions', value: '38', detail: '12 critical · 26 being worked', tone: 'red' },
];

const routes = [
  { lane: 'Chicago → Dallas', mode: 'Linehaul · 182 loads', eta: '98.4%', status: 'On plan', tone: 'green' },
  { lane: 'Newark → Atlanta', mode: 'Intermodal · 96 loads', eta: '91.2%', status: 'Watch', tone: 'amber' },
  { lane: 'Long Beach → Phoenix', mode: 'Drayage · 64 loads', eta: '86.7%', status: 'At risk', tone: 'red' },
];

const carriers = [
  { name: 'Atlas Freight', loads: '428 loads', score: '96', service: '97.8%' },
  { name: 'Northstar Lines', loads: '316 loads', score: '92', service: '94.1%' },
  { name: 'Blue River Transport', loads: '284 loads', score: '88', service: '91.6%' },
];

const exceptions = [
  { title: 'Temperature alert', shipment: 'ML-20481 · Chicago → Dallas', owner: 'Cold chain desk', age: '18 min', tone: 'red' },
  { title: 'Missed appointment window', shipment: 'ML-20392 · Newark → Atlanta', owner: 'East region', age: '42 min', tone: 'amber' },
  { title: 'Proof of delivery pending', shipment: 'ML-20276 · Phoenix → Reno', owner: 'Last mile desk', age: '1 hr', tone: 'blue' },
];

const handoffs = [
  { facility: 'Chicago DC · Dock 14', detail: 'Inbound to linehaul', time: '14:20', status: 'Ready', tone: 'green' },
  { facility: 'Dallas Hub · Door 08', detail: 'Carrier check-in', time: '15:05', status: 'In progress', tone: 'amber' },
  { facility: 'Atlanta Crossdock · Bay 03', detail: 'Outbound scan', time: '15:40', status: 'Queued', tone: 'blue' },
];

function statusTemplate(label, tone) {
  return `<span class="logi-status logi-status-${tone}"><span></span>${label}</span>`;
}

function renderRows(items, rowTemplate) {
  return items.map(rowTemplate).join('');
}

export function renderOverview() {
  return `<section class="logi-overview" aria-labelledby="overview-title">
    <header class="logi-page-head"><div><p class="logi-kicker">Network operations · Live view</p><h1 id="overview-title">Good afternoon, Mira</h1><p class="logi-lede">The network is moving well. Here is what needs your attention before the next shift handoff.</p></div><div class="logi-head-actions"><span class="logi-updated"><span></span>Updated 2 min ago</span><a class="logi-action" href="#/reports">View network report <span aria-hidden="true">↗</span></a></div></header>
    <div class="logi-metrics">${renderRows(metrics, (metric) => `<article class="logi-metric logi-metric-${metric.tone}"><span class="logi-eyebrow">${metric.label}</span><strong>${metric.value}</strong><small>${metric.detail}</small></article>`)}</div>
    <div class="logi-grid logi-grid-primary"><section class="logi-panel logi-panel-wide" aria-labelledby="route-title"><div class="logi-panel-head"><div><p class="logi-kicker">Network pulse</p><h2 id="route-title">Route health</h2></div><a href="#/routes">All routes <span aria-hidden="true">→</span></a></div><div class="logi-route-list">${renderRows(routes, (route) => `<div class="logi-route-row"><div><strong>${route.lane}</strong><small>${route.mode}</small></div><div class="logi-route-eta"><strong>${route.eta}</strong><small>ETA confidence</small></div><div>${statusTemplate(route.status, route.tone)}</div></div>`)}</div></section><section class="logi-panel" aria-labelledby="carrier-title"><div class="logi-panel-head"><div><p class="logi-kicker">Service quality</p><h2 id="carrier-title">Carrier performance</h2></div><a href="#/carriers">Compare <span aria-hidden="true">→</span></a></div><div class="logi-carrier-list">${renderRows(carriers, (carrier) => `<div class="logi-carrier-row"><div><strong>${carrier.name}</strong><small>${carrier.loads} · On-time ${carrier.service}</small></div><b>${carrier.score}</b></div>`)}</div></section></div>
    <div class="logi-grid logi-grid-secondary"><section class="logi-panel" aria-labelledby="exception-title"><div class="logi-panel-head"><div><p class="logi-kicker">Needs attention</p><h2 id="exception-title">Delivery exceptions</h2></div><a href="#/exceptions">Open queue <span aria-hidden="true">→</span></a></div><div class="logi-exception-list">${renderRows(exceptions, (exception) => `<div class="logi-exception-row"><span class="logi-exception-icon logi-exception-${exception.tone}" aria-hidden="true">!</span><div><strong>${exception.title}</strong><small>${exception.shipment} · ${exception.owner}</small></div><time>${exception.age}</time></div>`)}</div></section><section class="logi-panel" aria-labelledby="handoff-title"><div class="logi-panel-head"><div><p class="logi-kicker">Next 90 minutes</p><h2 id="handoff-title">Warehouse handoffs</h2></div><a href="#/warehouses">See facilities <span aria-hidden="true">→</span></a></div><div class="logi-handoff-list">${renderRows(handoffs, (handoff) => `<div class="logi-handoff-row"><div><strong>${handoff.facility}</strong><small>${handoff.detail}</small></div><time>${handoff.time}</time>${statusTemplate(handoff.status, handoff.tone)}</div>`)}</div></section></div>
  </section>`;
}

export function hydrateOverview() {}
export function renderView() { return renderOverview(); }
export function hydrateView(root) { hydrateOverview(root); }
