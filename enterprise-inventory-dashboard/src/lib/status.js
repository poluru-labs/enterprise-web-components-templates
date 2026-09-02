export const STATUS_TONE = {
  active: 'success',
  approved: 'success',
  hired: 'success',
  enrolled: 'success',
  completed: 'success',
  published: 'success',
  ok: 'success',
  healthy: 'success',
  in_stock: 'success',
  preferred: 'success',
  on_track: 'success',
  confirmed: 'brand',
  in_transit: 'brand',
  open: 'info',
  interview: 'info',
  screen: 'info',
  pending: 'warning',
  on_leave: 'warning',
  review: 'warning',
  on_hold: 'warning',
  offer: 'warning',
  invited: 'warning',
  watch: 'warning',
  amber: 'warning',
  delayed: 'warning',
  low_stock: 'danger',
  backordered: 'danger',
  denied: 'danger',
  rejected: 'danger',
  offboarding: 'danger',
  cancelled: 'danger',
  red: 'danger',
  closed: 'neutral',
  draft: 'neutral',
  filled: 'neutral',
  inactive: 'neutral',
  archived: 'neutral',
  green: 'success',
};

export function statusTone(status) {
  if (!status) return 'neutral';
  const key = String(status).toLowerCase().replace(/[\s-]+/g, '_');
  return STATUS_TONE[key] || 'neutral';
}

export function statusLabel(status) {
  if (!status) return 'Unknown';
  return String(status)
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function severityTone(severity) {
  const key = String(severity || '').toLowerCase();
  if (key === 'critical' || key === 'high' || key === 'error' || key === 'red') return 'danger';
  if (key === 'medium' || key === 'moderate' || key === 'watch' || key === 'warn' || key === 'amber') return 'warning';
  if (key === 'low' || key === 'ok') return 'info';
  if (key === 'resolved' || key === 'passed' || key === 'green') return 'success';
  return 'neutral';
}

export function slaTone(status) {
  const key = String(status || '').toLowerCase();
  if (key === 'breach' || key === 'breached' || key === 'error') return 'danger';
  if (key === 'risk' || key === 'at_risk' || key === 'warn' || key === 'watch') return 'warning';
  return 'success';
}

export function badgeVariant(status) {
  const tone = statusTone(status);
  return tone === 'brand' ? 'info' : tone;
}
