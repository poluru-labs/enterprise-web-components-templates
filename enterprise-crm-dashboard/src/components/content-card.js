const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
    }
    .card {
      display: flex;
      flex-direction: column;
      flex: 1;
      height: 100%;
      min-height: 0;
      padding: 1rem 1.1rem 1.1rem;
      border: 1px solid var(--crm-rule, #d7e0ee);
      border-radius: 16px;
      background: var(--crm-sheet, #fff);
      box-shadow: 0 10px 28px rgb(16 85 201 / 0.04);
    }
    .header {
      margin-bottom: 0.75rem;
    }
    .header:empty {
      display: none;
    }
    .body {
      display: flex;
      flex: 1;
      flex-direction: column;
      min-height: 0;
    }
  </style>
  <article class="card">
    <header class="header"><slot name="header"></slot></header>
    <div class="body"><slot></slot></div>
  </article>
`;

export class LyraContentCard extends HTMLElement {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }
}

if (!customElements.get('lyra-content-card')) {
  customElements.define('lyra-content-card', LyraContentCard);
}
