import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { ticketThreads, tickets } from '../data/index.js';
import { formatAge, formatDateTime } from '../lib/format.js';
import { pageHeader, priorityChip, sheet, slaChip, statusChip } from '../components/widgets.js';

export function renderTicketDetail(route) {
  const ticket = tickets.find((item) => item.id === route.id);
  if (!ticket) {
    return `
      ${pageHeader({
        eyebrow: 'Ticket',
        title: 'Ticket not found',
        lead: 'The ticket you requested is not in this workspace snapshot.',
        actions: '<eds-button href="#/tickets" variant="secondary">Back to tickets</eds-button>',
      })}
      <eds-empty-state heading="No ticket" description="Try another ID from the tickets table." icon="ticket"></eds-empty-state>
    `;
  }

  return `
    ${pageHeader({
      eyebrow: ticket.queue,
      title: `${ticket.id} · ${ticket.summary}`,
      lead: `Requester ${ticket.requester}. Assignee ${ticket.assignee}. Open for ${formatAge(ticket.ageMinutes)}.`,
      actions: `
        <eds-button id="ticket-escalate" variant="primary" icon="alert-triangle">Escalate</eds-button>
        <eds-button id="ticket-reassign" variant="secondary" icon="user">Reassign</eds-button>
        <eds-button id="ticket-back" variant="tertiary" icon="arrow-left">Tickets</eds-button>
      `,
    })}
    <div class="ticket-hero">
      <div class="tag-row">
        ${priorityChip(ticket.priority)}
        ${statusChip(ticket.status)}
        ${slaChip(ticket.sla)}
        <eds-badge label="${ticket.category}" variant="neutral" pill></eds-badge>
      </div>
    </div>
    <div class="row g-3">
      <div class="col-lg-8">
        ${sheet({
          title: 'Conversation',
          action: '<eds-badge label="Live thread" variant="brand" pill></eds-badge>',
          body: '<div id="thread-list" class="thread-list"></div>',
        })}
        <eds-card padded class="mt-3">
          <eds-textarea id="reply-box" label="Reply" rows="4" placeholder="Add an internal note or customer reply"></eds-textarea>
          <div class="inline-actions mt-3">
            <eds-button id="send-reply" variant="primary">Send reply</eds-button>
            <eds-button id="add-note" variant="secondary">Internal note</eds-button>
          </div>
        </eds-card>
      </div>
      <div class="col-lg-4">
        ${sheet({
          title: 'Details',
          body: `
            <eds-description-list id="ticket-meta"></eds-description-list>
            <eds-divider></eds-divider>
            <eds-progress-bar value="${ticket.ageMinutes}" max="480" label="Age ${formatAge(ticket.ageMinutes)}" show-value></eds-progress-bar>
          `,
        })}
        ${sheet({
          title: 'Related articles',
          body: '<eds-list id="related-articles" divided></eds-list>',
        })}
      </div>
    </div>
  `;
}

export function hydrateTicketDetail(root, route) {
  const ticket = tickets.find((item) => item.id === route.id);
  if (!ticket) return;

  const threads = ticketThreads(ticket.id);
  const threadList = root.querySelector('#thread-list');
  if (threadList) {
    threadList.innerHTML = threads
      .map(
        (item) => `
      <article class="thread-item">
        <div class="section-title">
          <strong>${item.author}</strong>
          <span class="muted">${formatDateTime(item.time)}</span>
        </div>
        <eds-badge label="${item.role}" variant="neutral" pill></eds-badge>
        <p class="mb-0 mt-2">${item.body}</p>
      </article>`,
      )
      .join('');
  }

  const meta = root.querySelector('#ticket-meta');
  if (meta) {
    meta.items = [
      { term: 'Requester', description: ticket.requester },
      { term: 'Assignee', description: ticket.assignee },
      { term: 'Queue', description: ticket.queue },
      { term: 'Created', description: formatDateTime(ticket.created) },
      { term: 'Updated', description: formatDateTime(ticket.updated) },
    ];
  }

  const related = root.querySelector('#related-articles');
  if (related) {
    related.items = [
      { label: 'VPN setup for remote analysts', description: 'Access · Maya Poluru', icon: 'file', href: '#/knowledge' },
      { label: 'Billing portal MFA troubleshooting', description: 'Billing · Nila Poluru', icon: 'file', href: '#/knowledge' },
    ];
  }

  root.querySelector('#ticket-back')?.addEventListener('eds-click', () => {
    window.location.hash = '#/tickets';
  });
  root.querySelector('#ticket-escalate')?.addEventListener('eds-click', () => {
    showToast({ message: `${ticket.id} escalated to Tara Poluru`, variant: 'warning' });
  });
  root.querySelector('#ticket-reassign')?.addEventListener('eds-click', () => {
    document.querySelector('#filter-drawer')?.show();
  });
  root.querySelector('#send-reply')?.addEventListener('eds-click', () => {
    showToast({ message: 'Reply sent to requester', variant: 'success' });
  });
  root.querySelector('#add-note')?.addEventListener('eds-click', () => {
    showToast({ message: 'Internal note saved', variant: 'info' });
  });
}
