import { describe, expect, it, beforeEach } from 'vitest';
import './app-header.js';

describe('atlas-header', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers the custom element', () => {
    expect(customElements.get('atlas-header')).toBeDefined();
  });

  it('renders the purchase pipeline header with stages and budget chip', () => {
    const header = document.createElement('atlas-header');
    header.setAttribute('product', 'Atlas');
    header.setAttribute('workspace', 'Poluru Works');
    header.setAttribute('budget-label', '$3.56M left · FY26');
    header.pipelineStages = [
      { id: 'request', label: 'Request', count: 2, href: '#/requests' },
      { id: 'approve', label: 'Approve', count: 2, href: '#/approvals', hot: true },
    ];
    document.body.appendChild(header);

    const root = header.shadowRoot;
    expect(root?.textContent).toContain('Atlas');
    expect(root?.textContent).toContain('Poluru Works');
    expect(root?.textContent).toContain('Request');
    expect(root?.textContent).toContain('Approve');
    expect(root?.textContent).toContain('$3.56M left · FY26');
    expect(root?.querySelector('.pipeline-strip')).toBeTruthy();
    expect(root?.querySelector('.budget-chip')).toBeTruthy();
    expect(root?.querySelector('.header-ticker')).toBeFalsy();
    expect(root?.querySelector('.leave-cluster')).toBeFalsy();
  });
});
