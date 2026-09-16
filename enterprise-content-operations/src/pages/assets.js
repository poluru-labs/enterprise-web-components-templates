import { showToast } from '@poluru-labs/enterprise-design-system-wc';
import { assets } from '../data/index.js';
import { searchRecords } from '../lib/search.js';
import { assetGrid, filterBar, pageHeader, sheet } from '../components/widgets.js';

export function renderAssets() {
  return `
    ${pageHeader({
      eyebrow: 'Library',
      title: 'Assets',
      lead: `Ishaan Poluru’s library. Photos from Priya Poluru, cuts from Subra Poluru, reels on Flare.`,
      actions: '<eds-button id="as-upload" variant="primary" icon="upload">Upload</eds-button>',
    })}
    ${filterBar(`
      <eds-search id="as-search" placeholder="Filter assets" clearable></eds-search>
      <eds-select id="as-kind" label="Kind"></eds-select>
      <eds-select id="as-status" label="Status"></eds-select>
    `)}
    <div class="row g-3">
      <div class="col-lg-3">
        ${sheet({
          title: 'Folders',
          body: '<eds-tree-view id="as-tree"></eds-tree-view>',
        })}
      </div>
      <div class="col-lg-9">
        <div id="as-grid"></div>
        <eds-empty-state id="as-empty" hidden heading="No matches" description="Try a name, owner, or kind." icon="search"></eds-empty-state>
        ${sheet({
          title: 'Drop new files',
          body: '<eds-file-upload id="as-drop" label="Add to the library" accept="image/*,video/*" multiple hint="Photos, illustrations, or reels" icon="upload"></eds-file-upload>',
        })}
      </div>
    </div>
  `;
}

export function hydrateAssets(root) {
  const grid = root.querySelector('#as-grid');
  const empty = root.querySelector('#as-empty');
  const search = root.querySelector('#as-search');
  const kind = root.querySelector('#as-kind');
  const status = root.querySelector('#as-status');
  const tree = root.querySelector('#as-tree');

  if (tree) {
    tree.items = [
      {
        id: 'lib',
        label: 'Fieldline library',
        children: [
          { id: 'photo', label: 'Photos' },
          { id: 'illustration', label: 'Illustrations' },
          { id: 'video', label: 'Video' },
        ],
      },
    ];
    tree.expandedIds = { lib: true };
  }

  if (kind) {
    kind.options = [
      { label: 'All kinds', value: '' },
      { label: 'Photo', value: 'photo' },
      { label: 'Illustration', value: 'illustration' },
      { label: 'Video', value: 'video' },
    ];
    kind.value = '';
  }
  if (status) {
    status.options = [
      { label: 'All statuses', value: '' },
      { label: 'Ready', value: 'ready' },
      { label: 'Draft', value: 'draft' },
      { label: 'Hold', value: 'hold' },
      { label: 'Published', value: 'published' },
    ];
    status.value = '';
  }

  const paint = () => {
    let hits = searchRecords(assets, search?.value ?? '', ['name', 'kind', 'owner', 'used']);
    const kindValue = kind?.value;
    const statusValue = status?.value;
    if (kindValue && kindValue !== 'All kinds') hits = hits.filter((item) => item.kind === kindValue);
    if (statusValue && statusValue !== 'All statuses') hits = hits.filter((item) => item.status === statusValue);
    if (grid) grid.innerHTML = hits.length ? assetGrid(hits) : '';
    if (empty) {
      empty.hidden = hits.length > 0;
      empty.style.display = hits.length > 0 ? 'none' : '';
    }
  };

  paint();
  search?.addEventListener('eds-input', paint);
  kind?.addEventListener('eds-change', paint);
  status?.addEventListener('eds-change', paint);
  tree?.addEventListener('eds-select', (event) => {
    const id = event.detail?.id ?? event.detail?.itemId ?? event.detail?.node?.id;
    if (kind && ['photo', 'illustration', 'video'].includes(id)) {
      kind.value = id;
      paint();
    }
  });
  root.querySelector('#as-upload')?.addEventListener('eds-click', () => {
    showToast({ message: 'Drop files into the library below', variant: 'info' });
  });
  root.querySelector('#as-drop')?.addEventListener('eds-change', () => {
    showToast({ message: 'Upload is a demo in this template', variant: 'success' });
  });
}
