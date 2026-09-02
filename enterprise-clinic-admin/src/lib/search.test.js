import { describe, expect, it } from 'vitest';
import { matchesQuery, normalizeQuery, searchGroups, searchRecords } from './search.js';

const patients = [
  { id: 'pt_maya', name: 'Maya Poluru', mrn: 'RFM-10482', pcp: 'Dr. Elena Poluru' },
  { id: 'pt_anika', name: 'Anika Patel', mrn: 'RFM-14201', pcp: 'Dr. Marcus Poluru' },
  { id: 'pt_james', name: 'James Chen', mrn: 'RFM-14202', pcp: 'Dr. Priya Poluru' },
];

describe('search helpers', () => {
  it('normalizes whitespace and case', () => {
    expect(normalizeQuery('  Maya Poluru  ')).toBe('maya poluru');
    expect(normalizeQuery(null)).toBe('');
  });

  it('matches a haystack case-insensitively', () => {
    expect(matchesQuery('Maya Poluru asthma', 'maya')).toBe(true);
    expect(matchesQuery('Maya Poluru asthma', 'chen')).toBe(false);
    expect(matchesQuery('anything', '')).toBe(true);
  });

  it('returns the original list when the query is empty', () => {
    expect(searchRecords(patients, '  ')).toEqual(patients);
  });

  it('filters records across selected fields', () => {
    const hits = searchRecords(patients, 'patel', ['name', 'mrn', 'pcp']);
    expect(hits).toHaveLength(1);
    expect(hits[0].id).toBe('pt_anika');
  });

  it('filters command groups down to matching items', () => {
    const groups = searchGroups(
      [
        {
          group: 'Go to',
          items: [
            { label: 'Schedule', hint: 'Room board' },
            { label: 'Patients', hint: 'Chart directory' },
          ],
        },
      ],
      'chart',
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].items.map((item) => item.label)).toEqual(['Patients']);
  });
});
