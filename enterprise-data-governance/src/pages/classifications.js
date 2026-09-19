import { classificationColumns, classifications } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderClassifications() {
  return `
    ${pageHeader({
      eyebrow: 'Classifications',
      title: 'Sensitivity labels',
      lead: 'PII, restricted, confidential, internal, and public — applied at column level.',
      actions: `<eds-button variant="primary" icon="plus" id="classify-column">Classify column</eds-button>`,
    })}
    <div class="card-grid">
      ${classifications
        .map(
          (item) => `
        <content-card>
          <div slot="header" class="section-title">
            <h2>${item.name}</h2>
            <eds-badge label="${item.level}" variant="${item.level === 'Critical' ? 'danger' : item.level === 'High' ? 'warning' : 'neutral'}" pill></eds-badge>
          </div>
          <p class="muted mb-2">${item.policy}</p>
          <p class="muted mb-3">${item.owner} · ${item.columns.toLocaleString()} columns</p>
          <eds-status label="${item.status}" variant="success"></eds-status>
        </content-card>`,
        )
        .join('')}
    </div>
    ${sheet({
      title: 'Label register',
      body: '<eds-data-table id="class-table" sortable></eds-data-table>',
    })}
    ${sheet({
      title: 'Apply a label',
      body: `<div class="stack">
        <eds-radio-group id="class-level" label="Sensitivity" name="class-level" value="pii">
          <eds-radio value="pii" label="PII"></eds-radio>
          <eds-radio value="restricted" label="Restricted"></eds-radio>
          <eds-radio value="confidential" label="Confidential"></eds-radio>
        </eds-radio-group>
        <eds-checkbox label="Mask in lower environments" checked></eds-checkbox>
        <eds-switch label="Require named access" checked></eds-switch>
      </div>`,
    })}
  `;
}

export function hydrateClassifications(root) {
  const table = root.querySelector('#class-table');
  if (table) {
    table.columns = classificationColumns;
    table.rows = classifications.map((item) => ({ ...item, columns: item.columns.toLocaleString() }));
  }
  root.querySelector('#classify-column')?.addEventListener('eds-click', () => document.querySelector('#classify-modal')?.show());
}
