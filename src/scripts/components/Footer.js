class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
     <footer>
      <p id="footer-text"></p>
     </footer>
   `;

    const year = new Date().getFullYear();

    const footerText = this.querySelector('#footer-text');

    footerText.textContent = `Copyright © ${year} - Resto Apps`;
  }
}

customElements.define('app-footer', Footer);
