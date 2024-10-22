class RestoList extends HTMLElement {
  set restoList(restaurant) {
    this.innerHTML = `
     <div class="restaurant-card">
        <img src="https://restaurant-api.dicoding.dev/images/large/${restaurant.pictureId}" alt="${restaurant.name}" />
        <div>
          <h3>${restaurant.name}</h3>
          <p>Location: ${restaurant.city}</p>
          <p>Rating: ${restaurant.rating}</p>
          <p>${restaurant.description}</p>
          <a href="/detail.html?id=${restaurant.id}" class="btn-details">See Details</a>
        </div>
     </div>
   `;
  }
}

customElements.define('resto-list', RestoList);
