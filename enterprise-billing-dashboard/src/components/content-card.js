class ContentCard extends HTMLElement {
  connectedCallback() {
    if (!this.classList.contains('sheet')) {
      this.classList.add('sheet');
    }
  }
}

if (!customElements.get('vd-content-card')) {
  customElements.define('vd-content-card', ContentCard);
}

export { ContentCard };
