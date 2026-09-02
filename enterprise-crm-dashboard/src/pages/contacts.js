import {
  accountColumns,
  accounts,
  activities,
  activityColumns,
  activityFeed,
  agenda,
  atRisk,
  contactColumns,
  contacts,
  currentUser,
  dealColumns,
  deals,
  forecast,
  funnel,
  insights,
  kpis,
  leadColumns,
  leads,
  pipelineMonths,
  reports,
  sourceMix,
  stages,
  teamBoard,
  workspaceName,
} from '../data/index.js';
import {
  bars,
  chartPanel,
  dashCell,
  dashGrid,
  emptyState,
  filterBar,
  formSection,
  money,
  pageHeader,
  ring,
  sparkline,
  statGrid,
  statusChip,
} from '../components/widgets.js';
import { viewState } from './state.js';

export function renderContacts() {
  return `
    ${pageHeader({
      eyebrow: 'People',
      title: 'Contacts',
      lead: 'Champions, buyers, and influencers across the book.',
      actions: `<eds-button id="add-contact" variant="primary" icon="plus">Add contact</eds-button>`,
    })}
    <section class="sheet">
      ${filterBar(`<eds-search id="contact-search" placeholder="Search contact or account" clearable></eds-search>`)}
      <div class="mt-3">
        <eds-data-table id="contact-table" sortable striped compact></eds-data-table>
      </div>
    </section>
  `;
}

export function renderContactDetail(id) {
  const contact = contacts.find((item) => item.id === id) ?? contacts[0];
  return `
    ${pageHeader({
      eyebrow: 'Contact',
      title: contact.name,
      lead: `${contact.title} · ${contact.account}`,
      actions: `
        <eds-button id="con-mail" variant="secondary" icon="mail">Email</eds-button>
        <eds-button id="con-call" variant="primary" icon="plus">Log call</eds-button>
      `,
    })}
    ${dashGrid([
      dashCell(
        `
        <section class="sheet">
          <eds-avatar name="${contact.name}" size="lg"></eds-avatar>
          <p class="mt-2 mb-1"><strong>${contact.title}</strong></p>
          <p class="muted mb-1">${contact.email}</p>
          <p class="muted">${contact.phone}</p>
          ${statusChip(contact.influence)}
        </section>`,
        4,
      ),
      dashCell(
        `
        <section class="sheet">
          <eds-tabs>
            <eds-tab label="Context" active>
              <eds-description-list id="con-facts"></eds-description-list>
            </eds-tab>
            <eds-tab label="Notes">
              <eds-textarea label="Internal note" rows="4" placeholder="Meeting notes, objections, or next steps."></eds-textarea>
              <eds-button class="mt-3" variant="secondary" icon="save">Save note</eds-button>
            </eds-tab>
            <eds-tab label="Activity">
              <eds-timeline id="con-activity"></eds-timeline>
            </eds-tab>
          </eds-tabs>
        </section>`,
        8,
      ),
    ])}
  `;
}

