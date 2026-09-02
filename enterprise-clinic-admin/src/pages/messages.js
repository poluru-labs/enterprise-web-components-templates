import { messageQueues, messages } from '../data/index.js';
import { cardGrid, filterBar, pageHeader, snapshotCard } from '../components/widgets.js';
import { viewState } from './state.js';

function paintMessages(root) {
  const list = root.querySelector('#message-list');
  if (!list) return;
  const rows =
    viewState.messageQueue === 'all'
      ? messages
      : messages.filter((item) => item.queue.toLowerCase() === viewState.messageQueue);
  list.innerHTML = rows
    .map(
      (item) => `
      <article class="halo-message-row ${item.unread ? 'is-unread' : ''}">
        <div>
          <strong>${item.from}</strong>
          <span>${item.subject}</span>
          <p>${item.preview}</p>
        </div>
        <aside>
          <eds-badge label="${item.queue}" variant="${item.unread ? 'brand' : 'neutral'}" pill></eds-badge>
          <small>${item.time}</small>
        </aside>
      </article>`,
    )
    .join('');
}

export function render() {
  return `
    ${pageHeader({
      eyebrow: 'Inbox',
      title: 'Messages',
      lead: 'Refills, results, referrals, and front-desk notes in one clinical queue.',
    })}
    ${cardGrid(
      messageQueues.map((item) =>
        snapshotCard({
          title: item.title,
          hint: `${item.value} · ${item.hint}`,
          href: item.href,
          tone: item.tone,
        }),
      ),
    )}
    <halo-content-card class="mt-3">
      ${filterBar(`<eds-segmented-control id="msg-queue"></eds-segmented-control>`)}
      <div class="halo-message-list mt-3" id="message-list"></div>
    </halo-content-card>
  `;
}

export function hydrate(root) {
  const seg = root.querySelector('#msg-queue');
  if (seg) {
    seg.options = [
      { label: 'All', value: 'all' },
      { label: 'Refills', value: 'refills' },
      { label: 'Results', value: 'results' },
      { label: 'Clinical', value: 'clinical' },
      { label: 'Referrals', value: 'referrals' },
    ];
    seg.value = viewState.messageQueue;
    seg.addEventListener('eds-change', (event) => {
      viewState.messageQueue = (event.detail?.value ?? 'all').toLowerCase();
      paintMessages(root);
    });
  }
  paintMessages(root);
  root.querySelector('#message-list')?.addEventListener('click', () => {
    document.querySelector('#message-drawer')?.show();
  });
}
