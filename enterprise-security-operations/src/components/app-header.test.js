import { describe, expect, it, beforeEach } from 'vitest';
import './app-header.js';

describe('sentinel-header', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers the custom element', () => {
    expect(customElements.get('sentinel-header')).toBeDefined();
  });

  it('renders the queue strip with cells and an MTTA chip', () => {
    const header = document.createElement('sentinel-header');
    header.setAttribute('product', 'Sentinel');
    header.setAttribute('workspace', 'Poluru Shield');
    header.setAttribute('mtta-label', '14m');
    header.queues = [
      { id: 'alerts', label: 'Alerts', value: '18', href: '#/alerts', hot: true },
      { id: 'incidents', label: 'Incidents', value: '6', href: '#/incidents' },
    ];
    document.body.appendChild(header);

    const root = header.shadowRoot;
    expect(root?.textContent).toContain('Sentinel');
    expect(root?.textContent).toContain('Poluru Shield');
    expect(root?.textContent).toContain('Alerts');
    expect(root?.textContent).toContain('18');
    expect(root?.textContent).toContain('Incidents');
    expect(root?.textContent).toContain('MTTA');
    expect(root?.textContent).toContain('14m');
    expect(root?.querySelector('.queue-strip')).toBeTruthy();
    expect(root?.querySelector('.mtta-chip')).toBeTruthy();
    expect(root?.querySelectorAll('.queue-cell').length).toBe(2);
    expect(root?.querySelector('.brand-mark svg')).toBeTruthy();
    expect(root?.querySelector('.scoreboard')).toBeFalsy();
    expect(root?.querySelector('.framework-strip')).toBeFalsy();
  });

  it('routes a queue cell to its href', () => {
    const header = document.createElement('sentinel-header');
    document.body.appendChild(header);
    header.queues = [{ id: 'alerts', label: 'Alerts', value: '18', href: '#/alerts', hot: true }];

    header.shadowRoot.querySelector('.queue-cell').click();
    expect(window.location.hash).toBe('#/alerts');
  });
});
