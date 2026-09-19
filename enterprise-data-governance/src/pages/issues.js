import { issues } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';
import { severityTone } from '../lib/status.js';

export function renderIssues() {
  return `
    ${pageHeader({
      eyebrow: 'Issues',
      title: 'Quality and access exceptions',
      lead: 'Seven open items. Two sit on the payments path into risk.',
    })}
    ${sheet({
      title: 'Open register',
      body: `<div class="stack">${issues
        .map(
          (item) => `
        <div class="person-head">
          <div>
            <strong>${item.title}</strong>
            <small class="asset-meta">${item.asset} · ${item.owner} · since ${item.since}</small>
            <p class="muted mb-0">${item.note}</p>
          </div>
          <eds-badge label="${item.severity}" variant="${severityTone(item.severity)}" pill></eds-badge>
        </div>`,
        )
        .join('')}</div>`,
    })}
  `;
}

export function hydrateIssues() {}
