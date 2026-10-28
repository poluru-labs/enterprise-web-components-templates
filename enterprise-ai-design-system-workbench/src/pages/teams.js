import { people } from '../data/index.js';
import { pageHeader, sheet } from '../components/widgets.js';

export function renderTeams() {
  return `
    ${pageHeader({
      eyebrow: 'Guild',
      title: 'Stewards and champions',
      lead: 'People who own components, tokens, patterns, and adoption.',
    })}
    ${sheet({
      title: 'Roster',
      body: `
        <eds-search id="team-search" placeholder="Find a guild member" clearable></eds-search>
        <div class="mt-4">
          <eds-data-table id="team-table" zebra sticky-header></eds-data-table>
        </div>
      `,
    })}
  `;
}

export function hydrateTeams(root) {
  const table = root.querySelector('#team-table');
  const rows = people.map((person) => ({
    name: person.name,
    role: person.role,
    squad: person.squad,
    score: `${person.score}%`,
    rating: `${person.rating}/5`,
  }));
  if (table) {
    table.columns = [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'role', label: 'Role' },
      { key: 'squad', label: 'Squad' },
      { key: 'score', label: 'Doc score' },
      { key: 'rating', label: 'Peer rating' },
    ];
    table.rows = rows;
  }
  root.querySelector('#team-search')?.addEventListener('eds-change', (event) => {
    const query = String(event.detail?.value ?? '').toLowerCase();
    if (!table) return;
    table.rows = rows.filter((row) => `${row.name} ${row.role} ${row.squad}`.toLowerCase().includes(query));
  });
}
