import { describe, expect, it } from 'vitest';
import { buildSearchIndex, matchesQuery, normalizeQuery, searchGroups, searchIndex, searchRecords } from './search.js';

const people = [
  { id: 'p-aditi', name: 'Aditi Poluru', role: 'Inventory operations lead', squad: 'Central ops' },
  { id: 'p-rohan', name: 'Rohan Poluru', role: 'Warehouse manager', squad: 'Chicago Central' },
  { id: 'p-meera', name: 'Meera Poluru', role: 'Warehouse manager', squad: 'Dallas South' },
];

describe('search helpers', () => {
  it('normalizes whitespace and case', () => {
    expect(normalizeQuery('  Aditi Poluru  ')).toBe('aditi poluru');
    expect(normalizeQuery(null)).toBe('');
  });

  it('matches a haystack case-insensitively', () => {
    expect(matchesQuery('Aditi Poluru inventory lead', 'aditi')).toBe(true);
    expect(matchesQuery('Aditi Poluru inventory lead', 'ferrotech')).toBe(false);
    expect(matchesQuery('anything', '')).toBe(true);
  });

  it('returns the original list when the query is empty', () => {
    expect(searchRecords(people, '  ')).toEqual(people);
  });

  it('filters records across selected fields', () => {
    const hits = searchRecords(people, 'dallas', ['name', 'role', 'squad']);
    expect(hits).toHaveLength(1);
    expect(hits[0].id).toBe('p-meera');
  });

  it('filters command groups down to matching items', () => {
    const groups = searchGroups(
      [
        {
          group: 'Go to',
          items: [
            { label: 'Overview', hint: 'Inventory pulse' },
            { label: 'Alerts', hint: 'Reorder thresholds' },
          ],
        },
      ],
      'reorder',
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].items.map((item) => item.label)).toEqual(['Alerts']);
  });

  it('builds and searches the inventory catalog index', () => {
    const hits = buildSearchIndex({
      products: [{ id: 'sku_001', name: 'Cushioned trail runner', sku: 'NB-1042', warehouse: 'Chicago Central', status: 'In stock' }],
      purchaseOrders: [{ id: 'po_2201', supplier: 'Highline Textiles', warehouse: 'Chicago Central', status: 'In transit' }],
    });
    expect(hits.length).toBeGreaterThan(1);
    const filtered = searchIndex(hits, 'highline');
    expect(filtered[0].type).toBe('Purchase order');
  });
});
