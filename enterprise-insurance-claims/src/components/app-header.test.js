import { describe, expect, it, beforeEach } from 'vitest';
import './app-header.js';

describe('beacon-header', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers the custom element', () => {
    expect(customElements.get('beacon-header')).toBeDefined();
  });

  it('renders the claims-stage header with stages and reserve chip', () => {
    const header = document.createElement('beacon-header');
    header.setAttribute('product', 'Beacon');
    header.setAttribute('workspace', 'Poluru Cover');
    header.setAttribute('reserve-label', '$4.8M reserved');
    header.claimStages = [
      { id: 'intake', label: 'Intake', count: 2, href: '#/claims' },
      { id: 'assigned', label: 'Assigned', count: 3, href: '#/adjusters', hot: true },
    ];
    document.body.appendChild(header);

    const root = header.shadowRoot;
    expect(root?.textContent).toContain('Beacon');
    expect(root?.textContent).toContain('Poluru Cover');
    expect(root?.textContent).toContain('Intake');
    expect(root?.textContent).toContain('Assigned');
    expect(root?.textContent).toContain('$4.8M reserved');
    expect(root?.querySelector('.claim-strip')).toBeTruthy();
    expect(root?.querySelector('.reserve-chip')).toBeTruthy();
    expect(root?.querySelector('.build-strip')).toBeFalsy();
    expect(root?.querySelector('.mix-strip')).toBeFalsy();
    expect(root?.querySelector('.dispatch-strip')).toBeFalsy();
  });
});
