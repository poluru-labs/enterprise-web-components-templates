import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { addTask, currentUser, frameworkOptions, people, tasks } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, pageHeader, statusChip } from '../components/widgets.js';

export function renderTasks() {
  return `
    ${pageHeader({
      eyebrow: 'Work queue',
      title: 'Tasks',
      lead: 'Open work before Alder Advisory arrives. Maya Poluru’s access review is the oldest SOC 2 item.',
      actions: '<eds-button id="tasks-add" variant="primary" icon="plus">New task</eds-button>',
    })}
    ${filterBar(`
      <eds-search id="tsk-search" placeholder="Filter tasks" clearable></eds-search>
      <eds-select id="tsk-status" label="Status"></eds-select>
    `)}
    <div class="card-grid cols-2" id="tsk-grid"></div>
    <eds-empty-state id="tsk-empty" hidden heading="No matches" description="Try an owner or framework." icon="search"></eds-empty-state>
    <eds-modal id="task-modal" heading="New task" close-on-backdrop close-on-escape>
      <div class="stack">
        <eds-input id="tsk-title" label="Title" placeholder="Close leftover access for contractors" icon="check"></eds-input>
        <eds-select id="tsk-owner" label="Owner"></eds-select>
        <eds-select id="tsk-framework" label="Framework"></eds-select>
      </div>
      <div slot="footer" class="inline-actions">
        <eds-button id="save-task" variant="primary">Add task</eds-button>
        <eds-button id="close-task" variant="tertiary">Cancel</eds-button>
      </div>
    </eds-modal>
  `;
}

function taskCard(item) {
  return `
    <content-card>
      <div slot="header" class="section-title">
        <h2>${item.title}</h2>
        ${statusChip(item.status)}
      </div>
      <div class="task-meta">
        <span class="muted">${item.owner} · ${item.framework}</span>
        <strong>Due ${item.due}</strong>
        <span class="muted">${item.control}</span>
      </div>
      <div slot="footer" class="inline-actions">
        <eds-button class="done-btn" variant="primary" data-id="${item.id}" icon="check">Mark done</eds-button>
      </div>
    </content-card>
  `;
}

export function hydrateTasks(root) {
  const grid = root.querySelector('#tsk-grid');
  const empty = root.querySelector('#tsk-empty');
  const search = root.querySelector('#tsk-search');
  const status = root.querySelector('#tsk-status');
  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Open', value: 'open' },
      { label: 'In progress', value: 'in_progress' },
      { label: 'In review', value: 'in_review' },
      { label: 'Overdue', value: 'overdue' },
      { label: 'Done', value: 'done' },
    ];
  }

  const owner = root.querySelector('#tsk-owner');
  if (owner) {
    owner.options = people.map((item) => ({ label: item.name, value: item.name }));
    owner.value = currentUser.name;
  }
  const framework = root.querySelector('#tsk-framework');
  if (framework) {
    framework.options = frameworkOptions;
    framework.value = 'SOC 2';
  }

  const paint = () => {
    let hits = searchRecords(tasks, search?.value ?? '', ['title', 'owner', 'framework', 'control']);
    if (status?.value) hits = hits.filter((item) => item.status === status.value);
    if (grid) grid.innerHTML = hits.map((item) => taskCard(item)).join('');
    if (empty) empty.hidden = hits.length > 0;
    root.querySelectorAll('.done-btn').forEach((btn) => {
      btn.addEventListener('eds-click', (event) => {
        event.stopPropagation();
        const item = tasks.find((entry) => entry.id === btn.getAttribute('data-id'));
        showToast({ message: `${item?.title || 'Task'} marked done (demo)`, variant: 'success' });
      });
    });
  };

  paint();
  search?.addEventListener('eds-input', paint);
  status?.addEventListener('eds-change', paint);
  root.querySelector('#tasks-add')?.addEventListener('eds-click', () => root.querySelector('#task-modal')?.show());
  root.querySelector('#save-task')?.addEventListener('eds-click', () => {
    const title = root.querySelector('#tsk-title')?.value;
    if (!title?.trim()) {
      showToast({ message: 'Title required', variant: 'warning' });
      return;
    }
    addTask({
      title,
      owner: root.querySelector('#tsk-owner')?.value,
      framework: root.querySelector('#tsk-framework')?.value,
    });
    root.querySelector('#task-modal')?.close();
    showToast({ message: 'Task added to the queue', variant: 'success' });
    paint();
  });
  root.querySelector('#close-task')?.addEventListener('eds-click', () => root.querySelector('#task-modal')?.close());
}
