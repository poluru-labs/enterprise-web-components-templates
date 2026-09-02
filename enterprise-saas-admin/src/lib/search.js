export function normalizeQuery(query) {
  return String(query ?? '').trim().toLowerCase();
}

export function matchesQuery(text, query) {
  const needle = normalizeQuery(query);
  if (!needle) return true;
  return String(text ?? '').toLowerCase().includes(needle);
}

export function recordHaystack(record, fields) {
  if (!record || typeof record !== 'object') return '';
  const keys = Array.isArray(fields) && fields.length ? fields : Object.keys(record);
  return keys
    .map((key) => {
      const value = record[key];
      if (value == null) return '';
      if (typeof value === 'object') return JSON.stringify(value);
      return String(value);
    })
    .join(' ');
}

export function searchRecords(records = [], query, fields) {
  const needle = normalizeQuery(query);
  if (!needle) return records;
  return records.filter((record) => matchesQuery(recordHaystack(record, fields), needle));
}

export function searchGroups(groups, query) {
  const needle = normalizeQuery(query);
  if (!needle) return groups;
  return groups
    .map((group) => ({
      ...group,
      items: (group.items || []).filter((item) =>
        matchesQuery(`${item.label || ''} ${item.hint || ''} ${item.group || ''}`, needle),
      ),
    }))
    .filter((group) => group.items.length > 0);
}

export function buildSearchIndex({
  organizations = [],
  members = [],
  flags = [],
  commandItems = [],
} = {}) {
  const hits = [];
  organizations.forEach((row) => {
    hits.push({
      id: row.id,
      type: 'Organization',
      label: row.name,
      hint: `${row.plan} · ${row.owner} · ${row.status}`,
      href: `#/org/${row.id}`,
    });
  });
  members.forEach((row) => {
    hits.push({
      id: row.email,
      type: 'Member',
      label: row.name,
      hint: `${row.org} · ${row.role} · ${row.status}`,
      href: '#/members',
    });
  });
  flags.forEach((row) => {
    hits.push({
      id: row.key,
      type: 'Flag',
      label: row.name,
      hint: `${row.key} · ${row.rollout}% · ${row.status}`,
      href: '#/flags',
    });
  });
  commandItems.forEach((row) => {
    hits.push({
      id: row.href,
      type: 'Jump',
      label: row.label,
      hint: row.description,
      href: row.href,
    });
  });
  return hits;
}

export function searchIndex(hits, query) {
  const needle = normalizeQuery(query);
  if (!needle) return hits.slice(0, 24);
  return hits.filter((hit) => matchesQuery(`${hit.label} ${hit.hint} ${hit.type}`, needle)).slice(0, 48);
}
