import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import './components/Navbar';
import './components/Sidebar';
import './components/Footer';
import './components/Alert';
import { fetchRestaurantDetail, addReview } from './api';
import { addFavorite, removeFavorite, isFavorite } from './db';

document.addEventListener('DOMContentLoaded', async () => {

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.bundle.js')
        .then(registration => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(error => {
          console.log('ServiceWorker registration failed: ', error);
        });
    });
  }


  const params = new URLSearchParams(window.location.search);
  const restaurantId = params.get('id');

  // Tampilkan loading
  const restaurantDetailContainer = document.getElementById('restaurant-detail');
  restaurantDetailContainer.innerHTML = '<p>Loading...</p>';

  try {
    const restaurant = await fetchRestaurantDetail(restaurantId);
    renderRestaurantDetails(restaurant, restaurantId);
  } catch (error) {
    console.error('Failed to load restaurant details:', error);
    restaurantDetailContainer.innerHTML = '<p>Error loading restaurant details.</p>';
    showAlert('Error loading restaurant details.', 'error');
  }
});

async function renderRestaurantDetails(restaurant, restaurantId) {
  const restaurantDetailContainer = document.getElementById('restaurant-detail');

  restaurantDetailContainer.innerHTML = `
    <h2>${restaurant.name}</h2>
    <img src="https://restaurant-api.dicoding.dev/images/large/${restaurant.pictureId}" alt="${restaurant.name}">
    
    <p><strong>Address:</strong> ${restaurant.address}</p>
    <p><strong>City:</strong> ${restaurant.city}</p>
    <p><strong>Rating:</strong> ${restaurant.rating} ⭐</p>
    <p><strong>Description:</strong> ${restaurant.description}</p>
    
    <h3>Categories</h3>
    <ul>
      ${restaurant.categories.map(category => `<li>${category.name}</li>`).join('')}
    </ul>
    
    <h3>Menu</h3>
    
    <h4>Food</h4>
    <ul>
      ${restaurant.menus.foods.map(food => `<li>${food.name}</li>`).join('')}
    </ul>
    
    <h4>Drinks</h4>
    <ul>
      ${restaurant.menus.drinks.map(drink => `<li>${drink.name}</li>`).join('')}
    </ul>
    
    <h3>Customer Reviews</h3>
    <ul id="customer-reviews">
      ${restaurant.customerReviews.map(review => `
        <li>
          <strong>${review.name}</strong> <br>
          <em>Date: ${review.date}</em> <br>
          ${review.review}
        </li>
      `).join('')}
    </ul>
    
    <h3>Add Review</h3>
    <form id="review-form">
      <input type="text" id="reviewer-name" placeholder="Your Name" required />
      <textarea id="review-text" placeholder="Your Review" required></textarea>
      <div class="button-container">
        <button type="submit">Submit Review</button>
      </div>
    </form>
    
    <button id="favorite-btn">Loading...</button>
  `;

  // Cek apakah restoran sudah ada di favorit
  const favoriteBtn = document.getElementById('favorite-btn');
  const isFav = await isFavorite(restaurantId);
  updateFavoriteButton(favoriteBtn, isFav);

  // Tambahkan logika untuk tombol favorit
  favoriteBtn.addEventListener('click', async () => {
    const isFav = await isFavorite(restaurantId);
    if (isFav) {
      await removeFavorite(restaurantId);
      updateFavoriteButton(favoriteBtn, false);
      showAlert('Removed from favorites.', 'success');
    } else {
      await addFavorite(restaurant);
      updateFavoriteButton(favoriteBtn, true);
      showAlert('Added to favorites.', 'success');
    }
  });

  // Tambahkan logika untuk form review
  const reviewForm = document.getElementById('review-form');
  reviewForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('reviewer-name').value;
    const review = document.getElementById('review-text').value;

    try {
      const response = await addReview({ id: restaurantId, name, review });
      if (!response.error) {
        const customerReviewsList = document.getElementById('customer-reviews');
        const newReview = response.customerReviews[response.customerReviews.length - 1]; // Ambil review terbaru
        const reviewItem = document.createElement('li');
        reviewItem.innerHTML = `
          <strong>${newReview.name}</strong> <br>
          <em>Date: ${newReview.date}</em> <br>
          ${newReview.review}
        `;
        customerReviewsList.appendChild(reviewItem);
        showAlert('Review added successfully!', 'success');
        reviewForm.reset();
      } else {
        showAlert('Failed to add review. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error adding review:', error);
      showAlert('An error occurred while adding your review.', 'error');
    }
  });
}

function updateFavoriteButton(button, isFavorite) {
  button.textContent = isFavorite ? 'Remove from Favorites' : 'Add to Favorites';
}

function showAlert(message, type) {
  const alert = document.createElement('custom-alert');
  alert.alertData = { type, message, classes: '' };
  document.body.appendChild(alert);
}

