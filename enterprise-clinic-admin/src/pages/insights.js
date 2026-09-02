import { insightPulse, volumeWeeks } from '../data/index.js';
import { bars, cardGrid, chartPanel, equalHeightRow, pageHeader, snapshotCard } from '../components/widgets.js';

export function render() {
  return `
    ${pageHeader({
      eyebrow: 'Operations',
      title: 'Insights',
      lead: 'Visit volume, wait time, no-shows, and panel growth for the last twelve weeks.',
    })}
    ${equalHeightRow([
      {
        className: 'col-lg-8',
        html: chartPanel({
          title: 'Weekly visit volume',
          action: '<eds-badge label="T12W" variant="brand" pill></eds-badge>',
          body: sparklineFrom(volumeWeeks),
        }),
      },
      {
        className: 'col-lg-4',
        html: chartPanel({
          title: 'Visit mix',
          body: `
            <div class="halo-mix">
              <div><div class="d-flex justify-content-between"><strong>Follow-up</strong><span>44%</span></div><div class="halo-mix-track"><span style="width:44%"></span></div></div>
              <div><div class="d-flex justify-content-between"><strong>New / consult</strong><span>18%</span></div><div class="halo-mix-track"><span style="width:18%"></span></div></div>
              <div><div class="d-flex justify-content-between"><strong>Pediatrics</strong><span>21%</span></div><div class="halo-mix-track"><span style="width:21%"></span></div></div>
              <div><div class="d-flex justify-content-between"><strong>Telehealth</strong><span>17%</span></div><div class="halo-mix-track"><span style="width:17%"></span></div></div>
            </div>
          `,
        }),
      },
    ])}
    ${equalHeightRow([
      {
        className: 'col-lg-6',
        html: chartPanel({
          title: 'Access',
          body:
            bars([77, 14, 6, 3], 'Kept, cancelled, no-show, late') +
            '<p class="halo-muted mt-2 mb-0">77% kept · 14% cancelled · 6% no-show · 3% late</p>',
        }),
      },
      {
        className: 'col-lg-6',
        html: `
          <halo-content-card stretch title="Snapshot">
            <eds-description-list id="insight-facts"></eds-description-list>
          </halo-content-card>
        `,
      },
    ])}
    <div class="halo-section-title mt-4">
      <h2>Access snapshot</h2>
    </div>
    ${cardGrid(
      insightPulse.map((item) =>
        snapshotCard({
          title: item.label,
          hint: `${item.value} · ${item.hint}`,
          href: '#/insights',
          tone: item.value,
        }),
      ),
    )}
  `;
}

function sparklineFrom(points) {
  const max = Math.max(...points);
  const coords = points
    .map((value, index) => {
      const x = (index / (points.length - 1)) * 360;
      const y = 86 - (value / max) * 70;
      return `${x},${y}`;
    })
    .join(' ');
  const area = `0,92 ${coords} 360,92`;
  return `
    <svg class="halo-sparkline" viewBox="0 0 360 92" role="img" aria-label="Completed visits by week">
      <polygon fill="rgb(217 0 0 / 0.12)" points="${area}"></polygon>
      <polyline fill="none" stroke="#D90000" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" points="${coords}" />
    </svg>
  `;
}

export function hydrate(root) {
  const facts = root.querySelector('#insight-facts');
  if (facts) {
    facts.items = [
      { term: 'Kept rate', description: '77%' },
      { term: 'No-show', description: '6%' },
      { term: 'Avg wait', description: '10 min' },
      { term: 'Same-day fill', description: '66%' },
      { term: 'Telehealth', description: '17%' },
      { term: 'Panel growth', description: '+9.1%' },
    ];
    facts.columns = 2;
  }
}
