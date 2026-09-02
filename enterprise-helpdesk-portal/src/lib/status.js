export const STATUS_TONE = {
  active: 'success',
  approved: 'success',
  hired: 'success',
  enrolled: 'success',
  completed: 'success',
  published: 'success',
  resolved: 'success',
  ok: 'success',
  healthy: 'success',
  online: 'success',
  open: 'info',
  new: 'info',
  interview: 'info',
  screen: 'info',
  in_progress: 'info',
  pending: 'warning',
  on_leave: 'warning',
  review: 'warning',
  on_hold: 'warning',
  waiting: 'warning',
  offer: 'warning',
  invited: 'warning',
  watch: 'warning',
  at_risk: 'warning',
  denied: 'danger',
  rejected: 'danger',
  offboarding: 'danger',
  cancelled: 'danger',
  critical: 'danger',
  high: 'danger',
  breach: 'danger',
  breached: 'danger',
  closed: 'neutral',
  draft: 'neutral',
  filled: 'neutral',
  inactive: 'neutral',
  archived: 'neutral',
  low: 'neutral',
  medium: 'warning',
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
  if (key === 'critical' || key === 'high' || key === 'error') return 'danger';
  if (key === 'medium' || key === 'moderate' || key === 'watch' || key === 'warn') return 'warning';
  if (key === 'low' || key === 'ok') return 'info';
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

export function priorityTone(priority) {
  return severityTone(priority);
}
