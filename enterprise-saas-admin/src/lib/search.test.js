import { describe, expect, it } from 'vitest';
import { matchesQuery, normalizeQuery, searchGroups, searchRecords } from './search.js';

const people = [
  { id: 'p-mira', name: 'Mira Poluru', title: 'Platform admin', department: 'Poluru Cloud' },
  { id: 'p-arjun', name: 'Arjun Poluru', title: 'Admin', department: 'Nimbus Retail' },
  { id: 'p-kavya', name: 'Kavya Poluru', title: 'Member', department: 'Brightline Labs' },
];

describe('search helpers', () => {
  it('normalizes whitespace and case', () => {
    expect(normalizeQuery('  Mira Poluru  ')).toBe('mira poluru');
    expect(normalizeQuery(null)).toBe('');
  });

  it('matches a haystack case-insensitively', () => {
    expect(matchesQuery('Mira Poluru platform admin', 'mira')).toBe(true);
    expect(matchesQuery('Mira Poluru platform admin', 'atlas')).toBe(false);
    expect(matchesQuery('anything', '')).toBe(true);
  });

  it('returns the original list when the query is empty', () => {
    expect(searchRecords(people, '  ')).toEqual(people);
  });

  it('filters records across selected fields', () => {
    const hits = searchRecords(people, 'nimbus', ['name', 'title', 'department']);
    expect(hits).toHaveLength(1);
    expect(hits[0].id).toBe('p-arjun');
  });

  it('filters command groups down to matching items', () => {
    const groups = searchGroups(
      [
        {
          group: 'Go to',
          items: [
            { label: 'Overview', hint: 'Dashboard pulse' },
            { label: 'Flags', hint: 'Rollouts and kill switches' },
          ],
        },
      ],
      'rollout',
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].items.map((item) => item.label)).toEqual(['Flags']);
  });
});
