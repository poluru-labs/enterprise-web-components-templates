import { describe, expect, it, beforeEach } from 'vitest';
import './app-shell.js';

describe('techstar-shell', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    window.location.hash = '';
  });

  it('credits the author and design system', () => {
    const shell = document.createElement('techstar-shell');
    document.body.appendChild(shell);
    const footer = shell.querySelector('.app-footer');
    expect(footer?.textContent).toContain('Created by');
    expect(footer?.querySelector('a[href="https://polurus.com"]')?.textContent).toBe('Subrahmanyam Poluru');
    expect(
      footer?.querySelector('a[href="https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-wc"]')
        ?.textContent,
    ).toBe('@poluru-labs/enterprise-design-system-wc');
  });

  it('opens and closes the sticky mega menu from Operations', () => {
    const shell = document.createElement('techstar-shell');
    document.body.appendChild(shell);
    const toggle = shell.querySelector('#mega-ops');
    const menu = shell.querySelector('#mega-menu');
    expect(menu.hidden).toBe(true);
    toggle.click();
    expect(menu.hidden).toBe(false);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    toggle.click();
    expect(menu.hidden).toBe(true);
  });
});
