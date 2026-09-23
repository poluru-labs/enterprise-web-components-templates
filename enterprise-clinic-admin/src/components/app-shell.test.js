import { describe, expect, it } from 'vitest';
import { renderAppShell } from './app-shell.js';

describe('halo app shell footer', () => {
  it('credits the author and design system', () => {
    document.body.innerHTML = renderAppShell();
    const footer = document.querySelector('.app-footer');
    expect(footer?.textContent).toContain('Created by');
    expect(footer?.querySelector('a[href="https://polurus.com"]')?.textContent).toBe('Subrahmanyam Poluru');
    expect(
      footer?.querySelector('a[href="https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-wc"]')
        ?.textContent,
    ).toBe('@poluru-labs/enterprise-design-system-wc');
  });
});
