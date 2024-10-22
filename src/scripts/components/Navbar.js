class Navbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
     <nav class="navbar">
        <div class="brand-logo" aria-label="Resto Apps Logo">Resto Apps</div>
        <ul class="nav-links">
          <li><a href="/" aria-label="Go to Home">Home</a></li>
          <li><a href="favorite.html" aria-label="View Favorites">Favorite</a></li>
          <li>
            <a
              href="https://bit.ly/my-portofolio-salmandma"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="About Us"
              >About Us</a
            >
          </li>
        </ul>
      </nav>
   `;
  }
}

customElements.define('app-navbar', Navbar);
