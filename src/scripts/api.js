const API_URL = 'https://restaurant-api.dicoding.dev';

export const fetchRestaurants = async () => {
 const cacheName = 'restaurant-api-cache-v1';
 const cacheKey = `${API_URL}/list`;

 const cache = await caches.open(cacheName);
 const cachedResponse = await cache.match(cacheKey);

 if (cachedResponse) {
  return cachedResponse.json().then(result => result.restaurants);
 }

 const response = await fetch(cacheKey);
 const result = await response.json();

 if (response.ok) {
  return result.restaurants;
 }

 throw new Error(result.message);
};


export const fetchRestaurantDetail = async (id) => {
 const cacheName = 'restaurant-api-cache-v1';
 const cacheKey = `${API_URL}/detail/${id}`;

 const cache = await caches.open(cacheName);
 const cachedResponse = await cache.match(cacheKey);

 if (cachedResponse) {
  return cachedResponse.json().then(result => result.restaurant);
 }

 const response = await fetch(cacheKey);
 const result = await response.json();

 if (response.ok) {
  return result.restaurant;
 }

 throw new Error(result.message);
};


export const addReview = async (reviewData) => {
 const response = await fetch(`${API_URL}/review`, {
  method: 'POST',
  headers: {
   'Content-Type': 'application/json',
  },
  body: JSON.stringify(reviewData),
 });
 const result = await response.json();
 console.log(result, 'result');
 if (response.ok) {
  return result;
 }
 throw new Error(result.message);
};