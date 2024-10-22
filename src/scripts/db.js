import { openDB } from 'idb';

const dbPromise = openDB('restaurant-db', 1, {
 upgrade(db) {
  if (!db.objectStoreNames.contains('favorites')) {
   db.createObjectStore('favorites', { keyPath: 'id' });
  }
 }
});

export async function addFavorite(restaurant) {
 const db = await dbPromise;
 await db.put('favorites', restaurant);
}

export async function removeFavorite(id) {
 const db = await dbPromise;
 await db.delete('favorites', id);
}

export async function isFavorite(id) {
 const db = await dbPromise;
 return (await db.get('favorites', id)) ? true : false;
}

export async function getAllFavorites() {
 const db = await dbPromise;
 return await db.getAll('favorites');
}
