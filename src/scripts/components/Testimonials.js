class Testimonials extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
     <section class="testimonials">
        <h2>What Our Users Say</h2>
        <div class="testimonial-list">
          <div class="testimonial-item">
            <p>"Resto Apps has made finding great places to eat easier than ever. Highly recommend!"</p>
            <p>- Sarah L.</p>
          </div>
          <div class="testimonial-item">
            <p>"The restaurant recommendations are spot on. I discovered my new favorite place thanks to this app!"</p>
            <p>- John D.</p>
          </div>
        </div>
      </section>
   `;
  }
}

customElements.define('app-testimonials', Testimonials);
