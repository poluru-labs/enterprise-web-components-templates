import { describe, expect, it } from 'vitest';
import { matchesQuery, normalizeQuery, searchGroups, searchRecords } from './search.js';

const people = [
  { id: 'p-ananya', name: 'Ananya Poluru', title: 'Delivery lead', department: 'Platform' },
  { id: 'p-kavya', name: 'Kavya Poluru', title: 'Product designer', department: 'Experience' },
  { id: 'p-arjun', name: 'Arjun Poluru', title: 'Engineering manager', department: 'Platform' },
];

describe('search helpers', () => {
  it('normalizes whitespace and case', () => {
    expect(normalizeQuery('  Ananya Poluru  ')).toBe('ananya poluru');
    expect(normalizeQuery(null)).toBe('');
  });

  it('matches a haystack case-insensitively', () => {
    expect(matchesQuery('Ananya Poluru delivery lead', 'ananya')).toBe(true);
    expect(matchesQuery('Ananya Poluru delivery lead', 'atlas')).toBe(false);
    expect(matchesQuery('anything', '')).toBe(true);
  });

  it('returns the original list when the query is empty', () => {
    expect(searchRecords(people, '  ')).toEqual(people);
  });

  it('filters records across selected fields', () => {
    const hits = searchRecords(people, 'designer', ['name', 'title', 'department']);
    expect(hits).toHaveLength(1);
    expect(hits[0].id).toBe('p-kavya');
  });

  it('filters command groups down to matching items', () => {
    const groups = searchGroups(
      [
        {
          group: 'Go to',
          items: [
            { label: 'Overview', hint: 'Delivery pulse' },
            { label: 'Board', hint: 'Sprint board' },
          ],
        },
      ],
      'board',
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].items.map((item) => item.label)).toEqual(['Board']);
  });
});
