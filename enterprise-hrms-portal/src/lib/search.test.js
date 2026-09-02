import { describe, expect, it } from 'vitest';
import { buildSearchIndex, matchesQuery, normalizeQuery, searchGroups, searchIndex, searchRecords } from './search.js';

const people = [
  { id: 'p-sravani', name: 'Sravani Poluru', title: 'People operations lead', department: 'People' },
  { id: 'p-kavya', name: 'Kavya Poluru', title: 'Staff engineer', department: 'Engineering' },
  { id: 'p-rohan', name: 'Rohan Poluru', title: 'Engineering manager', department: 'Engineering' },
];

describe('search helpers', () => {
  it('normalizes whitespace and case', () => {
    expect(normalizeQuery('  Sravani Poluru  ')).toBe('sravani poluru');
    expect(normalizeQuery(null)).toBe('');
  });

  it('matches a haystack case-insensitively', () => {
    expect(matchesQuery('Sravani Poluru people lead', 'sravani')).toBe(true);
    expect(matchesQuery('Sravani Poluru people lead', 'atlas')).toBe(false);
    expect(matchesQuery('anything', '')).toBe(true);
  });

  it('returns the original list when the query is empty', () => {
    expect(searchRecords(people, '  ')).toEqual(people);
  });

  it('filters records across selected fields', () => {
    const hits = searchRecords(people, 'engineering', ['name', 'title', 'department']);
    expect(hits).toHaveLength(2);
    expect(hits.map((item) => item.id)).toEqual(['p-kavya', 'p-rohan']);
  });

  it('filters command groups down to matching items', () => {
    const groups = searchGroups(
      [
        {
          group: 'Go to',
          items: [
            { label: 'Overview', hint: 'Headcount pulse' },
            { label: 'Leave', hint: 'PTO calendar' },
          ],
        },
      ],
      'pto',
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].items.map((item) => item.label)).toEqual(['Leave']);
  });

  it('searches a prebuilt index', () => {
    const index = buildSearchIndex([
      { label: 'People partner', description: 'Austin req', owner: 'Ananya Poluru', type: 'req' },
      { label: 'Benefits 2026', description: 'Open enrollment', owner: 'Neha Poluru', type: 'course' },
    ]);
    const hits = searchIndex(index, 'benefits');
    expect(hits).toHaveLength(1);
    expect(hits[0].type).toBe('course');
  });
});
