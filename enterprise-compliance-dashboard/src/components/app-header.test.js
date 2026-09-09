import { describe, expect, it, beforeEach } from 'vitest';
import './app-header.js';

describe('aegis-header', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers the custom element', () => {
    expect(customElements.get('aegis-header')).toBeDefined();
  });

  it('renders the framework readiness strip with meters and next-audit chip', () => {
    const header = document.createElement('aegis-header');
    header.setAttribute('product', 'Aegis');
    header.setAttribute('workspace', 'Poluru Trust');
    header.setAttribute('audit-label', 'SOC 2 · 18 Sep');
    header.frameworks = [
      { id: 'soc2', label: 'SOC 2', value: '88%', ready: 88, href: '#/audits', hot: true },
      { id: 'gdpr', label: 'GDPR', value: '74%', ready: 74, href: '#/policies' },
    ];
    document.body.appendChild(header);

    const root = header.shadowRoot;
    expect(root?.textContent).toContain('Aegis');
    expect(root?.textContent).toContain('Poluru Trust');
    expect(root?.textContent).toContain('SOC 2');
    expect(root?.textContent).toContain('GDPR');
    expect(root?.textContent).toContain('SOC 2 · 18 Sep');
    expect(root?.querySelector('.framework-strip')).toBeTruthy();
    expect(root?.querySelector('.audit-chip')).toBeTruthy();
    expect(root?.querySelector('.fw-meter')).toBeTruthy();
    expect(root?.querySelector('.pipeline-strip')).toBeFalsy();
    expect(root?.querySelector('.scoreboard')).toBeFalsy();
  });

  it('routes a framework cell to its href', () => {
    const header = document.createElement('aegis-header');
    document.body.appendChild(header);
    header.frameworks = [{ id: 'soc2', label: 'SOC 2', value: '88%', ready: 88, href: '#/audits', hot: true }];

    header.shadowRoot.querySelector('.fw-cell').click();
    expect(window.location.hash).toBe('#/audits');
  });
});
