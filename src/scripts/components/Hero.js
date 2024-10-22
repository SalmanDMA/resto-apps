class Hero extends HTMLElement {
 constructor() {
  super();
 }

 connectedCallback() {
  this.innerHTML = `
    <section class="hero" id="main-content">
      <div class="hero-content">
        <h1>Welcome to Resto Apps</h1>
        <p>Discover the best restaurants around you.</p>
      </div>
    </section>
   `;
 }
}

customElements.define('app-hero', Hero);
