import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import './components/Sidebar';
import './components/Hero';
import './components/Footer';
import './components/Navbar';
import './components/Testimonials';
import './components/Tips';
import './components/RestoList';
import { fetchRestaurants } from './api';

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

  const restoList = document.getElementById('restaurant-list');
  const loadingIndicator = document.getElementById('loading');

  const renderRestoList = async () => {
    loadingIndicator.style.display = 'block';
    try {
      const data = await fetchRestaurants();
      data.forEach((restaurant) => {
        const restoItem = document.createElement('resto-list');
        restoItem.restoList = restaurant;
        restoList.appendChild(restoItem);
      });
    } catch (error) {
      console.log(error);
    } finally {
      loadingIndicator.style.display = 'none';
    }
  };


  renderRestoList();
});

console.log('Hello Coders! :)');
