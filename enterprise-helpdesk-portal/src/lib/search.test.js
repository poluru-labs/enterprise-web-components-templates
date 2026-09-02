import { describe, expect, it } from 'vitest';
import { buildSearchIndex, searchIndex, searchRecords } from './search.js';

describe('search helpers', () => {
  const records = [
    { id: 'HD-4821', summary: 'Login loop on billing', requester: 'Maya Poluru' },
    { id: 'HD-4817', summary: 'VPN profile refresh', requester: 'Nila Poluru' },
  ];

  it('filters records by query', () => {
    expect(searchRecords(records, 'vpn')).toHaveLength(1);
    expect(searchRecords(records, '')).toHaveLength(2);
  });

  it('searches a prebuilt index', () => {
    const index = buildSearchIndex([
      { label: 'Login loop', description: 'Billing', type: 'Ticket' },
      { label: 'VPN refresh', description: 'Access', type: 'Ticket' },
    ]);
    expect(searchIndex(index, 'billing')).toHaveLength(1);
  });
});
