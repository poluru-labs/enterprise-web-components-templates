export const STATUS_TONE = {
  active: 'brand',
  on_track: 'success',
  ahead: 'success',
  green: 'success',
  approved: 'success',
  healthy: 'success',
  ok: 'success',
  complete: 'success',
  cleared: 'success',
  reimbursed: 'success',
  posted: 'success',
  met: 'success',
  confirmed: 'success',
  departed: 'success',
  used: 'success',
  in_house: 'success',
  in_policy: 'success',
  booked: 'brand',
  in_trip: 'brand',
  submitted: 'brand',
  on_time: 'brand',
  pending: 'warning',
  watch: 'warning',
  amber: 'warning',
  held: 'warning',
  overdue: 'warning',
  exception: 'warning',
  delayed: 'warning',
  behind: 'danger',
  at_risk: 'danger',
  red: 'danger',
  denied: 'danger',
  cancelled: 'danger',
  elevated: 'danger',
  restricted: 'danger',
  closed: 'neutral',
  draft: 'neutral',
  inactive: 'neutral',
  home: 'neutral',
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
  if (key === 'critical' || key === 'high' || key === 'error' || key === 'red' || key === 'elevated') return 'danger';
  if (key === 'medium' || key === 'moderate' || key === 'watch' || key === 'warn' || key === 'amber') return 'warning';
  if (key === 'low' || key === 'ok' || key === 'green' || key === 'cleared') return 'success';
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
