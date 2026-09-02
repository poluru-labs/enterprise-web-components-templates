import { courses } from '../data/index.js';
import { formatDate } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { filterBar, courseGrid, pageHeader } from '../components/widgets.js';

export function renderLearning() {
  return `
    ${pageHeader({
      eyebrow: 'L&D',
      title: 'Learning',
      lead: `${courses.length} active courses · Benefits 2026 due 12 Sep · Neha Poluru leads L&D.`,
      actions: '<eds-button id="assign-course" variant="primary" icon="plus">Assign course</eds-button>',
    })}
    ${filterBar(`
      <eds-search id="learning-search" placeholder="Filter courses" clearable></eds-search>
      <eds-select id="learning-cat" label="Category"></eds-select>
    `)}
    <div id="learning-grid"></div>
    <eds-empty-state id="learning-empty" hidden heading="No courses match" description="Try another title or category." icon="search"></eds-empty-state>
    <section class="mt-3">
      <eds-card padded>
        <h2>Enrollment roster</h2>
        <eds-data-table id="learning-table" compact striped class="mt-2"></eds-data-table>
      </eds-card>
    </section>
  `;
}

export function hydrateLearning(root) {
  const grid = root.querySelector('#learning-grid');
  const empty = root.querySelector('#learning-empty');
  const search = root.querySelector('#learning-search');
  const cat = root.querySelector('#learning-cat');

  if (cat) {
    cat.options = [
      { label: 'All categories', value: '' },
      ...[...new Set(courses.map((c) => c.category))].map((c) => ({ label: c, value: c })),
    ];
  }

  const paint = () => {
    const query = search?.value ?? '';
    let hits = searchRecords(courses, query, ['title', 'category', 'instructor', 'summary']);
    const catVal = cat?.value;
    if (catVal) hits = hits.filter((c) => c.category === catVal);
    if (grid) grid.innerHTML = hits.length ? courseGrid(hits) : '';
    if (empty) empty.hidden = hits.length > 0;
  };

  paint();
  search?.addEventListener('eds-input', paint);
  cat?.addEventListener('eds-change', paint);

  const table = root.querySelector('#learning-table');
  if (table) {
    table.columns = [
      { key: 'title', label: 'Course' },
      { key: 'category', label: 'Category' },
      { key: 'hours', label: 'Hours' },
      { key: 'enrolled', label: 'Enrolled' },
      { key: 'due', label: 'Due' },
      { key: 'instructor', label: 'Instructor' },
    ];
    table.rows = courses.map((course) => ({
      title: course.title,
      category: course.category,
      hours: course.hours,
      enrolled: course.enrolled,
      due: formatDate(course.due),
      instructor: course.instructor,
    }));
  }

  root.querySelector('#assign-course')?.addEventListener('eds-click', () => {
    window.location.hash = '#/settings';
  });
}
