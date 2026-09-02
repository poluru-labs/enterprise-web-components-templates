import { describe, expect, it } from 'vitest';
import { matchesQuery, normalizeQuery, searchGroups, searchRecords } from './search.js';

const people = [
  { id: 'p-aisha', name: 'Aisha Poluru', title: 'Enterprise sales lead', department: 'Sales' },
  { id: 'p-maya', name: 'Maya Poluru', title: 'Account executive', department: 'Sales' },
  { id: 'p-meera', name: 'Meera Poluru', title: 'VP Operations', department: 'Customer' },
];

describe('search helpers', () => {
  it('normalizes whitespace and case', () => {
    expect(normalizeQuery('  Aisha Poluru  ')).toBe('aisha poluru');
    expect(normalizeQuery(null)).toBe('');
  });

  it('matches a haystack case-insensitively', () => {
    expect(matchesQuery('Aisha Poluru sales lead', 'aisha')).toBe(true);
    expect(matchesQuery('Aisha Poluru sales lead', 'atlas')).toBe(false);
    expect(matchesQuery('anything', '')).toBe(true);
  });

  it('returns the original list when the query is empty', () => {
    expect(searchRecords(people, '  ')).toEqual(people);
  });

  it('filters records across selected fields', () => {
    const hits = searchRecords(people, 'operations', ['name', 'title', 'department']);
    expect(hits).toHaveLength(1);
    expect(hits[0].id).toBe('p-meera');
  });

  it('filters command groups down to matching items', () => {
    const groups = searchGroups(
      [
        {
          group: 'Go to',
          items: [
            { label: 'Overview', hint: 'Pipeline pulse' },
            { label: 'Forecast', hint: 'Quota vs commit' },
          ],
        },
      ],
      'quota',
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].items.map((item) => item.label)).toEqual(['Forecast']);
  });
});
