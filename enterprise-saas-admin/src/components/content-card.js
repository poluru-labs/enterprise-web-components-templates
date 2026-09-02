class ContentCard extends HTMLElement {
  connectedCallback() {
    if (!this.classList.contains('sheet')) {
      this.classList.add('sheet');
    }
  }
}

if (!customElements.get('helio-content-card')) {
  customElements.define('helio-content-card', ContentCard);
}

export { ContentCard };
