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

export function buildSearchIndex({ invoices = [], customers = [], payments = [], subscriptions = [] } = {}) {
  const hits = [];
  invoices.forEach((row) => {
    hits.push({
      id: row.id,
      type: 'Invoice',
      label: row.id,
      hint: `${row.customer} · ${row.amount} · ${row.status}`,
      href: `#/invoice/${row.id}`,
    });
  });
  customers.forEach((row) => {
    hits.push({
      id: row.id,
      type: 'Customer',
      label: row.company,
      hint: `${row.contact} · ${row.plan} · ${row.status}`,
      href: `#/customer/${row.id}`,
    });
  });
  payments.forEach((row) => {
    hits.push({
      id: row.id,
      type: 'Payment',
      label: row.id,
      hint: `${row.customer} · ${row.amount} · ${row.status}`,
      href: '#/payments',
    });
  });
  subscriptions.forEach((row) => {
    hits.push({
      id: row.id,
      type: 'Subscription',
      label: row.customer,
      hint: `${row.plan} · ${row.mrr} · ${row.status}`,
      href: '#/subscriptions',
    });
  });
  return hits;
}

export function searchIndex(hits, query) {
  const needle = normalizeQuery(query);
  if (!needle) return hits.slice(0, 24);
  return hits.filter((hit) => matchesQuery(`${hit.label} ${hit.hint} ${hit.type}`, needle)).slice(0, 48);
}
