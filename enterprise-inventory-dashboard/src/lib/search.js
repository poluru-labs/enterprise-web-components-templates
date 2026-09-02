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
  products = [],
  purchaseOrders = [],
  warehouses = [],
  alerts = [],
  suppliers = [],
  people = [],
} = {}) {
  const hits = [];
  products.forEach((row) => {
    hits.push({
      id: row.id,
      type: 'SKU',
      label: row.name,
      description: `${row.sku} · ${row.warehouse} · ${row.status}`,
      href: `#/product/${row.id}`,
    });
  });
  purchaseOrders.forEach((row) => {
    hits.push({
      id: row.id,
      type: 'Purchase order',
      label: row.id.toUpperCase(),
      description: `${row.supplier} · ${row.warehouse} · ${row.status}`,
      href: '#/orders',
    });
  });
  warehouses.forEach((row) => {
    hits.push({
      id: row.id,
      type: 'Warehouse',
      label: row.name,
      description: `${row.location} · ${row.manager} · ${row.capacityUsed}% capacity`,
      href: '#/warehouses',
    });
  });
  alerts.forEach((row) => {
    hits.push({
      id: row.id,
      type: 'Alert',
      label: row.title,
      description: `${row.location} · ${row.owner} · ${row.severity}`,
      href: '#/alerts',
    });
  });
  suppliers.forEach((row) => {
    hits.push({
      id: row.id,
      type: 'Supplier',
      label: row.name,
      description: `${row.category} · ${row.leadTime} lead · ${row.status}`,
      href: '#/suppliers',
    });
  });
  people.forEach((row) => {
    hits.push({
      id: row.name,
      type: 'Team',
      label: row.name,
      description: `${row.role} · ${row.squad}`,
      href: '#/team',
    });
  });
  return hits;
}

export function searchIndex(hits, query) {
  const needle = normalizeQuery(query);
  if (!needle) return hits.slice(0, 24);
  return hits
    .filter((hit) => matchesQuery(`${hit.label} ${hit.description} ${hit.type}`, needle))
    .slice(0, 48);
}
