export const STATUS_TONE = {
  active: 'success',
  approved: 'success',
  hired: 'success',
  enrolled: 'success',
  completed: 'success',
  published: 'success',
  ok: 'success',
  healthy: 'success',
  expanding: 'success',
  ga: 'success',
  open: 'info',
  interview: 'info',
  screen: 'info',
  trial: 'info',
  beta: 'info',
  internal: 'info',
  invited: 'info',
  pending: 'warning',
  on_leave: 'warning',
  review: 'warning',
  on_hold: 'warning',
  offer: 'warning',
  partial: 'warning',
  at_risk: 'warning',
  near_cap: 'warning',
  past_due: 'danger',
  suspended: 'danger',
  denied: 'danger',
  rejected: 'danger',
  offboarding: 'danger',
  cancelled: 'danger',
  suspended: 'danger',
  closed: 'neutral',
  draft: 'neutral',
  filled: 'neutral',
  inactive: 'neutral',
  archived: 'neutral',
  off: 'neutral',
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

export function statusFor(value) {
  const map = {
    Healthy: 'success',
    Expanding: 'success',
    Active: 'success',
    GA: 'success',
    SLA: 'success',
    Invited: 'info',
    Trial: 'info',
    Beta: 'info',
    Internal: 'info',
    Partial: 'warning',
    'At risk': 'warning',
    'Near cap': 'warning',
    'Past due': 'danger',
    Suspended: 'danger',
    Off: 'neutral',
  };
  return map[value] || statusTone(value);
}
