export const STATUS_TONE = {
  active: 'success',
  approved: 'success',
  hired: 'success',
  enrolled: 'success',
  completed: 'success',
  published: 'success',
  ok: 'success',
  healthy: 'success',
  in_visit: 'brand',
  in_clinic: 'success',
  checked_in: 'info',
  telehealth: 'info',
  virtual: 'info',
  collected: 'info',
  open: 'info',
  interview: 'info',
  screen: 'info',
  waiting: 'warning',
  pending: 'warning',
  on_leave: 'warning',
  review: 'warning',
  on_hold: 'warning',
  offer: 'warning',
  invited: 'warning',
  turnover: 'warning',
  busy: 'warning',
  on_break: 'warning',
  no_show_risk: 'danger',
  denied: 'danger',
  rejected: 'danger',
  offboarding: 'danger',
  cancelled: 'danger',
  in_progress: 'brand',
  scheduled: 'neutral',
  closed: 'neutral',
  draft: 'neutral',
  filled: 'neutral',
  inactive: 'neutral',
  archived: 'neutral',
  available: 'success',
  resulted: 'success',
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
