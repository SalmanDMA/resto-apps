class Tips extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
     <section class="tips">
        <h2>Restaurant Tips</h2>
        <div class="tip-list">
          <article class="tip-item">
            <h3>How to Choose the Best Restaurant for a Special Occasion</h3>
            <p>Looking for a place to celebrate an important event?</p>
            <a href="https://www.thehandbook.com/special-occasion-restaurants/">Read More</a>
          </article>
          <article class="tip-item">
            <h3>5 Hidden Gem Restaurants You Must Try</h3>
            <p>Discover some of the best-kept secrets in the city...</p>
            <a href="https://www.socialexpat.net/5-unique-restaurants-in-jakarta-you-must-try/">Read More</a>
          </article>
        </div>
      </section>
   `;
  }
}

customElements.define('app-tips', Tips);
