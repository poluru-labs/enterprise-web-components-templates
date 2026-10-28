import { reviews } from '../data/index.js';
import { cadenceList, pageHeader, sheet } from '../components/widgets.js';

export function renderReviews() {
  return `
    ${pageHeader({
      eyebrow: 'Calendar',
      title: 'Review schedule',
      lead: 'Finding triage, release gate readouts, and hardening workshops.',
    })}
    ${sheet({ title: 'Upcoming', body: cadenceList(reviews) })}
    ${sheet({
      title: 'Release gate checklist',
      body: `
        <eds-accordion>
          <eds-accordion-item heading="Corpus" open>
            Full corpus v5 pass on every blocking surface.
          </eds-accordion-item>
          <eds-accordion-item heading="Controls">
            Allowlist, encoding, and replay checks within policy.
          </eds-accordion-item>
          <eds-accordion-item heading="Sign-off">
            Anika Poluru attestation and zero red findings.
          </eds-accordion-item>
        </eds-accordion>
      `,
    })}
  `;
}

export function hydrateReviews() {}
