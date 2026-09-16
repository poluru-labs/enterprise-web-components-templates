export const STATUS_TONE = {
  active: 'brand',
  on_track: 'success',
  ahead: 'success',
  green: 'success',
  approved: 'success',
  complete: 'success',
  attended: 'success',
  checked_in: 'success',
  confirmed: 'success',
  issued: 'success',
  live: 'brand',
  on_stage: 'brand',
  in_use: 'brand',
  booked: 'brand',
  next: 'brand',
  registered: 'brand',
  upcoming: 'brand',
  pending: 'warning',
  watch: 'warning',
  waitlist: 'warning',
  hold: 'warning',
  amber: 'warning',
  draft: 'neutral',
  open: 'neutral',
  overdue: 'danger',
  behind: 'danger',
  at_risk: 'danger',
  denied: 'danger',
  cancelled: 'danger',
  no_show: 'danger',
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
  if (key === 'low' || key === 'ok' || key === 'green') return 'success';
  if (key === 'resolved' || key === 'passed') return 'success';
  return 'neutral';
}

export function slaTone(status) {
  const key = String(status || '').toLowerCase();
  if (key === 'breach' || key === 'breached' || key === 'error' || key === 'at risk' || key === 'overdue') return 'danger';
  if (key === 'risk' || key === 'at_risk' || key === 'warn' || key === 'watch') return 'warning';
  return 'success';
}

export function badgeVariant(status) {
  const tone = statusTone(status);
  return tone === 'brand' ? 'brand' : tone;
}
