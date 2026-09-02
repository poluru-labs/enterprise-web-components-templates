import { describe, expect, it } from 'vitest';
import { buildSearchIndex, matchesQuery, normalizeQuery, searchGroups, searchIndex, searchRecords } from './search.js';

const people = [
  { id: 'cus_harbor', company: 'Harbor & Co.', contact: 'Meera Poluru', plan: 'Enterprise' },
  { id: 'cus_cedar', company: 'Cedar Analytics', contact: 'Sravani Poluru', plan: 'Scale' },
  { id: 'cus_nimbus', company: 'Nimbus Retail', contact: 'Arjun Poluru', plan: 'Scale' },
];

describe('search helpers', () => {
  it('normalizes whitespace and case', () => {
    expect(normalizeQuery('  Priya Poluru  ')).toBe('priya poluru');
    expect(normalizeQuery(null)).toBe('');
  });

  it('matches a haystack case-insensitively', () => {
    expect(matchesQuery('Harbor & Co. enterprise', 'harbor')).toBe(true);
    expect(matchesQuery('Harbor & Co. enterprise', 'atlas')).toBe(false);
    expect(matchesQuery('anything', '')).toBe(true);
  });

  it('returns the original list when the query is empty', () => {
    expect(searchRecords(people, '  ')).toEqual(people);
  });

  it('filters records across selected fields', () => {
    const hits = searchRecords(people, 'poluru', ['company', 'contact', 'plan']);
    expect(hits.length).toBeGreaterThan(1);
    expect(hits.some((row) => row.id === 'cus_harbor')).toBe(true);
  });

  it('filters command groups down to matching items', () => {
    const groups = searchGroups(
      [
        {
          group: 'Go to',
          items: [
            { label: 'Overview', hint: 'Revenue pulse' },
            { label: 'Search', hint: 'Invoices and customers' },
          ],
        },
      ],
      'invoice',
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].items.map((item) => item.label)).toEqual(['Search']);
  });

  it('builds and filters a unified search index', () => {
    const hits = buildSearchIndex({
      invoices: [{ id: 'INV-2841', customer: 'Harbor & Co.', amount: '$18,400', status: 'Paid' }],
      customers: [{ id: 'cus_harbor', company: 'Harbor & Co.', contact: 'Meera Poluru', plan: 'Enterprise', status: 'Active' }],
    });
    expect(hits.length).toBe(2);
    expect(searchIndex(hits, 'inv-2841')).toHaveLength(1);
  });
});
