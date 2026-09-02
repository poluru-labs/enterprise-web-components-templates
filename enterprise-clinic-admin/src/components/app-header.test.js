import { describe, expect, it, beforeEach } from 'vitest';
import './app-header.js';

describe('halo-app-header', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders the clinical shift board with occupancy bar and appointment chips', () => {
    const header = document.createElement('halo-app-header');
    document.body.appendChild(header);

    expect(header.querySelector('.halo-shift-board')).toBeTruthy();
    expect(header.textContent).toContain('Halo');
    expect(header.textContent).toContain('San Jose');
    expect(header.querySelector('.halo-cross-mark')).toBeTruthy();
    expect(header.querySelector('.halo-occupancy-bar')).toBeTruthy();
    expect(header.textContent).toContain('Room occupancy 82%');
    expect(header.querySelectorAll('.halo-appt-chip').length).toBe(3);
    expect(header.textContent).toMatch(/08:30 Patel/);
    expect(header.textContent).toMatch(/09:00 Chen/);
    expect(header.textContent).toMatch(/09:20 Poluru/);
  });

  it('exposes search, command palette, new appointment, and profile', () => {
    const header = document.createElement('halo-app-header');
    document.body.appendChild(header);

    expect(header.textContent).toContain('New appointment');
    expect(header.textContent).toContain('Aisha Poluru');
    expect(header.querySelector('#halo-global-search')).toBeTruthy();
    expect(header.querySelector('#halo-command-btn')).toBeTruthy();
    expect(header.querySelector('#halo-book-btn')).toBeTruthy();
    expect(header.querySelector('#halo-profile-btn')).toBeTruthy();
  });

  it('updates the now-on label for the active route', () => {
    const header = document.createElement('halo-app-header');
    document.body.appendChild(header);
    header.setRoute({ name: 'schedule' });

    expect(header.dataset.route).toBe('schedule');
    expect(header.querySelector('.halo-now-label')?.textContent).toBe('Schedule');
  });

  it('folds clinic identity into the shift strip', () => {
    const header = document.createElement('halo-app-header');
    document.body.appendChild(header);

    expect(header.textContent).toContain('NPI 1841723901');
    expect(header.textContent).toContain('Mon–Fri 7:30–18:00');
    expect(header.textContent).toContain('(512) 555-0148');
    expect(header.querySelector('#halo-inbox-quick')).toBeTruthy();
  });
});
