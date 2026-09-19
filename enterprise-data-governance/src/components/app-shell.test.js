import { describe, expect, it, beforeEach } from 'vitest';
import './app-shell.js';

describe('verity-shell mega menu', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    window.location.hash = '';
  });

  it('opens and closes the sticky mega menu', () => {
    const shell = document.createElement('verity-shell');
    document.body.appendChild(shell);
    const toggle = shell.querySelector('#mega-toggle');
    const menu = shell.querySelector('#mega-menu');
    expect(menu.hidden).toBe(true);
    toggle.click();
    expect(menu.hidden).toBe(false);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    toggle.click();
    expect(menu.hidden).toBe(true);
  });

  it('credits the author and design system in the footer', () => {
    const shell = document.createElement('verity-shell');
    document.body.appendChild(shell);
    const footer = shell.querySelector('.page-footer');
    expect(footer.textContent).toContain('Subrahmanyam Poluru');
    expect(footer.querySelector('a[href="https://polurus.com"]')?.textContent).toBe('polurus.com');
    expect(
      footer.querySelector('a[href="https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-wc"]')?.textContent,
    ).toBe('@poluru-labs/enterprise-design-system-wc');
  });
});
