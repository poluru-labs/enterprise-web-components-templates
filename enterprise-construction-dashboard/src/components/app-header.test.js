import { describe, expect, it, beforeEach } from 'vitest';
import './app-header.js';

describe('keystone-header', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers the custom element', () => {
    expect(customElements.get('keystone-header')).toBeDefined();
  });

  it('renders the build-stage header with stages and budget chip', () => {
    const header = document.createElement('keystone-header');
    header.setAttribute('product', 'Keystone');
    header.setAttribute('workspace', 'Poluru Builds');
    header.setAttribute('budget-label', '$92.1M left');
    header.buildStages = [
      { id: 'mobilize', label: 'Mobilize', count: 2, href: '#/sites' },
      { id: 'structure', label: 'Structure', count: 3, href: '#/schedule', hot: true },
    ];
    document.body.appendChild(header);

    const root = header.shadowRoot;
    expect(root?.textContent).toContain('Keystone');
    expect(root?.textContent).toContain('Poluru Builds');
    expect(root?.textContent).toContain('Mobilize');
    expect(root?.textContent).toContain('Structure');
    expect(root?.textContent).toContain('$92.1M left');
    expect(root?.querySelector('.build-strip')).toBeTruthy();
    expect(root?.querySelector('.budget-chip')).toBeTruthy();
    expect(root?.querySelector('.dispatch-strip')).toBeFalsy();
    expect(root?.querySelector('.pipeline-strip')).toBeFalsy();
  });
});
