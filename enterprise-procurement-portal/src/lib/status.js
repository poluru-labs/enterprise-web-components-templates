export const STATUS_TONE = {
  active: 'success',
  preferred: 'success',
  approved: 'success',
  received: 'success',
  ordered: 'info',
  submitted: 'info',
  open: 'info',
  pending: 'warning',
  in_review: 'warning',
  watch: 'warning',
  expiring: 'warning',
  draft: 'neutral',
  rejected: 'danger',
  denied: 'danger',
  expired: 'danger',
  closed: 'neutral',
  inactive: 'neutral',
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
  if (key === 'breach' || key === 'breached' || key === 'error' || key === 'at risk') return 'danger';
  if (key === 'risk' || key === 'at_risk' || key === 'warn' || key === 'watch') return 'warning';
  return 'success';
}

export function badgeVariant(status) {
  const tone = statusTone(status);
  return tone === 'brand' ? 'info' : tone;
}
