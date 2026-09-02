import { describe, expect, it, beforeEach } from 'vitest';
import './app-header.js';

describe('vespera-header', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers the custom element', () => {
    expect(customElements.get('vespera-header')).toBeDefined();
  });

  it('renders sprint strip with days remaining and burndown ticks', () => {
    const header = document.createElement('vespera-header');
    header.setAttribute('sprint-name', 'Sprint 34');
    header.setAttribute('days-left', '4');
    header.setAttribute('days-total', '10');
    header.burndownTicks = [1, 0.92, 0.84, 0.76, 0.68, 0.6, 0.52, 0.44, 0.36, 0.28];
    document.body.appendChild(header);

    const text = header.shadowRoot?.textContent ?? '';
    expect(text).toContain('Sprint 34');
    expect(text).toContain('4 days left');
    expect(header.shadowRoot?.querySelector('.sprint-strip')).toBeTruthy();
    expect(header.shadowRoot?.querySelector('.days-meter-fill')).toBeTruthy();
    expect(header.shadowRoot?.querySelectorAll('.burndown-tick').length).toBe(10);
    expect(header.shadowRoot?.querySelector('.brand-mark')?.textContent).toBe('V');
  });

  it('does not render a ticker or pipeline pills', () => {
    const header = document.createElement('vespera-header');
    document.body.appendChild(header);
    const html = header.shadowRoot?.innerHTML ?? '';
    expect(html).not.toMatch(/ticker|pipeline|ledger|chip/i);
  });
});
