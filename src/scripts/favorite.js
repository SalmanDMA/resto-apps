import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import './components/Navbar';
import './components/Sidebar';
import './components/Footer';
import './components/RestoList';
import { getAllFavorites } from './db';

document.addEventListener('DOMContentLoaded', async () => {
 const favoriteList = document.getElementById('favorite-list');
 const loadingIndicator = document.getElementById('loading');

 const renderFavorites = async () => {
  loadingIndicator.style.display = 'block';
  try {
   const favorites = await getAllFavorites();
   if (favorites.length === 0) {
    favoriteList.innerHTML = '<p>No favorites added yet.</p>';
   } else {
    favorites.forEach(restaurant => {
     const restoItem = document.createElement('resto-list');
     restoItem.restoList = restaurant;
     favoriteList.appendChild(restoItem);
    });
   }
  } catch (error) {
   console.error('Failed to load favorites:', error);
   favoriteList.innerHTML = '<p>Error loading favorites. Please try again later.</p>';
  } finally {
   loadingIndicator.style.display = 'none';
  }
 };

 renderFavorites();
});

