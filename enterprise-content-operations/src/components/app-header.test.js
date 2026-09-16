import { describe, expect, it, beforeEach } from 'vitest';
import './app-header.js';

describe('loom-header', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers the custom element', () => {
    expect(customElements.get('loom-header')).toBeDefined();
  });

  it('renders the editorial week strip with stages and next-ship chip', () => {
    const header = document.createElement('loom-header');
    header.setAttribute('product', 'Loom');
    header.setAttribute('workspace', 'Fieldline Press');
    header.setAttribute('ship-label', 'Stride · 06:00');
    header.weekStages = [
      { id: 'draft', label: 'Draft', count: 2, href: '#/calendar' },
      { id: 'copy', label: 'Copy', count: 2, href: '#/calendar', hot: true },
    ];
    document.body.appendChild(header);

    const root = header.shadowRoot;
    expect(root?.textContent).toContain('Loom');
    expect(root?.textContent).toContain('Fieldline Press');
    expect(root?.textContent).toContain('Draft');
    expect(root?.textContent).toContain('Copy');
    expect(root?.textContent).toContain('Stride · 06:00');
    expect(root?.querySelector('.loom-strip')).toBeTruthy();
    expect(root?.querySelector('.ship-chip')).toBeTruthy();
    expect(root?.querySelector('.claim-strip')).toBeFalsy();
    expect(root?.querySelector('.build-strip')).toBeFalsy();
    expect(root?.querySelector('.mix-strip')).toBeFalsy();
  });
});
