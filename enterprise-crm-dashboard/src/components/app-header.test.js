import { describe, expect, it, beforeEach } from 'vitest';
import './app-header.js';
import { stageCounts } from '../data/index.js';

describe('lyra-header', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers with open shadow and pipeline stage pills', () => {
    const header = document.createElement('lyra-header');
    header.setAttribute('crumb', 'Lyra / Overview');
    document.body.appendChild(header);

    expect(customElements.get('lyra-header')).toBeDefined();
    expect(header.shadowRoot.mode).toBe('open');

    const pills = header.shadowRoot.querySelectorAll('.stage-pill');
    expect(pills.length).toBe(stageCounts().length);
    expect(pills[0].textContent).toMatch(/Prospect/);
    expect(pills[pills.length - 1].textContent).toMatch(/Won/);
  });

  it('renders the L brand mark and command bar search', () => {
    const header = document.createElement('lyra-header');
    document.body.appendChild(header);

    expect(header.shadowRoot.querySelector('.brand-mark').textContent).toBe('L');
    expect(header.shadowRoot.querySelector('#header-search')).toBeTruthy();
    expect(header.shadowRoot.querySelector('.kbd').textContent).toBe('⌘K');
  });

  it('emits lyra-search when Enter is pressed', () => {
    const header = document.createElement('lyra-header');
    document.body.appendChild(header);

    const input = header.shadowRoot.querySelector('#header-search');
    input.value = 'Harbor';
    let detail;
    header.addEventListener('lyra-search', (event) => {
      detail = event.detail;
    });
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

    expect(detail.query).toBe('Harbor');
    expect(detail.navigate).toBe(true);
  });

  it('emits lyra-new-deal from the primary action', () => {
    const header = document.createElement('lyra-header');
    document.body.appendChild(header);

    let fired = false;
    header.addEventListener('lyra-new-deal', () => {
      fired = true;
    });
    header.shadowRoot.querySelector('#header-new-deal').click();
    expect(fired).toBe(true);
  });
});
