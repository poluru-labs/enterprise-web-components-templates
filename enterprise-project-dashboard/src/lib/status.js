export const STATUS_TONE = {
  active: 'success',
  approved: 'success',
  hired: 'success',
  enrolled: 'success',
  completed: 'success',
  published: 'success',
  ok: 'success',
  healthy: 'success',
  on_track: 'success',
  done: 'success',
  closed: 'success',
  green: 'success',
  open: 'info',
  interview: 'info',
  screen: 'info',
  review: 'info',
  planning: 'info',
  in_progress: 'brand',
  pending: 'warning',
  on_leave: 'warning',
  on_hold: 'warning',
  offer: 'warning',
  invited: 'warning',
  watch: 'warning',
  amber: 'warning',
  denied: 'danger',
  rejected: 'danger',
  offboarding: 'danger',
  cancelled: 'danger',
  blocked: 'danger',
  at_risk: 'danger',
  red: 'danger',
  draft: 'neutral',
  filled: 'neutral',
  inactive: 'neutral',
  archived: 'neutral',
  to_do: 'neutral',
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
  if (key === 'low' || key === 'ok' || key === 'green') return 'info';
  if (key === 'resolved' || key === 'passed') return 'success';
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
