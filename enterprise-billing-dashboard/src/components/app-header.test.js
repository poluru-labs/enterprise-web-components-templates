import { describe, expect, it, beforeEach } from 'vitest';
import { renderHeaderMarkup } from './app-header.js';
import { currentUser, ledgerMetrics } from '../data/index.js';

describe('vd-app-header ledger ribbon', () => {
  beforeEach(() => {
    document.body.innerHTML = renderHeaderMarkup({ user: currentUser });
  });

  it('renders the Verdant brand mark and ledger cells', () => {
    expect(document.querySelector('.vd-ledger-header__mark')?.textContent).toBe('V');
    expect(document.querySelectorAll('.vd-ledger-cell')).toHaveLength(ledgerMetrics.length);
  });

  it('shows MRR, open AR, and dunning in tabular ledger cells', () => {
    const labels = [...document.querySelectorAll('.vd-ledger-cell__label')].map((node) => node.textContent);
    expect(labels).toContain('MRR');
    expect(labels).toContain('Open AR');
    expect(labels).toContain('Dunning');
  });

  it('includes search, new invoice, and profile controls', () => {
    expect(document.querySelector('#global-search')).toBeTruthy();
    expect(document.querySelector('#new-invoice-btn')).toBeTruthy();
    expect(document.querySelector('#profile-btn')).toBeTruthy();
    expect(document.querySelector('.vd-ledger-kbd')?.textContent).toBe('⌘K');
  });

  it('keeps the blotter above a separate toolbar', () => {
    const header = document.querySelector('.vd-ledger-header');
    const ribbon = document.querySelector('.vd-ledger-ribbon');
    const toolbar = document.querySelector('.vd-ledger-toolbar');
    expect(header?.firstElementChild).toBe(ribbon);
    expect(toolbar).toBeTruthy();
    expect(document.querySelector('.vd-ledger-meta')?.textContent).toMatch(/EIN/);
  });
});
