import { describe, expect, it, beforeEach } from 'vitest';
import './app-shell.js';

describe('signal-shell footer', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    window.location.hash = '';
  });

  it('credits the author and design system', () => {
    const shell = document.createElement('signal-shell');
    document.body.appendChild(shell);
    const footer = shell.querySelector('.app-footer');
    expect(footer?.textContent).toContain('Created by');
    expect(footer?.querySelector('a[href="https://polurus.com"]')?.textContent).toBe('Subrahmanyam Poluru');
    expect(
      footer?.querySelector('a[href="https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-wc"]')
        ?.textContent,
    ).toBe('@poluru-labs/enterprise-design-system-wc');
  });
});
