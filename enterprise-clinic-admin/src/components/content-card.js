export class HaloContentCard extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'subtitle', 'stretch'];
  }

  connectedCallback() {
    if (!this.dataset.rendered) this.render();
  }

  attributeChangedCallback() {
    if (this.dataset.rendered) this.render();
  }

  render() {
    const title = this.getAttribute('title') || '';
    const subtitle = this.getAttribute('subtitle') || '';
    const stretch = this.hasAttribute('stretch');
    this.classList.add('halo-content-card');
    if (stretch) this.classList.add('is-stretch');

    const headerSlot = this.querySelector('[slot="header"]');
    const headerHtml = headerSlot
      ? headerSlot.outerHTML
      : title
        ? `<div slot="header" class="halo-section-title"><h2>${title}</h2>${subtitle ? `<p class="halo-muted">${subtitle}</p>` : ''}</div>`
        : '';

    const body = Array.from(this.childNodes)
      .filter((node) => !(node instanceof HTMLElement && node.getAttribute('slot') === 'header'))
      .map((node) => (node instanceof HTMLElement ? node.outerHTML : node.textContent))
      .join('');

    this.innerHTML = `
      ${headerHtml}
      <div class="halo-content-card-body">${body}</div>
    `;
    this.dataset.rendered = 'true';
  }
}

if (!customElements.get('halo-content-card')) {
  customElements.define('halo-content-card', HaloContentCard);
}
