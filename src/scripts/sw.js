const CACHE_NAME = 'restaurant-app-cache-v1';
const API_CACHE_NAME = 'restaurant-api-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/detail.html',
  '/favorite.html',
  '/styles/main.css',
  '/app.bundle.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/data/manifest.json',
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Failed to cache assets:', error);
      })
  );
});


// Cache Strategy for Fetch Events
self.addEventListener('fetch', (event) => {
  // Log request URL untuk debugging
  console.log("event request startsWith & url:", event.request.url.startsWith('http'), event.request.url);

  // Hanya memproses request yang menggunakan protokol HTTP atau HTTPS
  if (event.request.url.startsWith('http')) {
    const url = new URL(event.request.url);

    // Cache API Requests untuk Daftar dan Detail Restoran
    if (url.pathname.startsWith('/list') || url.pathname.startsWith('/detail')) {
      event.respondWith(
        caches.open(API_CACHE_NAME).then((cache) => {
          return cache.match(event.request).then((cachedResponse) => {
            const networkFetch = fetch(event.request).then((networkResponse) => {
              if (networkResponse.ok) {
                cache.put(event.request, networkResponse.clone());
              }
              return networkResponse;
            }).catch(() => {
              // Jika offline dan permintaan API gagal, kembalikan data yang dicache
              return cachedResponse;
            });
            // Kembalikan data yang dicache terlebih dahulu, dan validasi di latar belakang
            return cachedResponse || networkFetch;
          });
        })
      );
    } else {
      // Cache Permintaan Lain (Aset Statis)
      event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
          return cachedResponse || fetch(event.request).then((networkResponse) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          });
        })
      );
    }
  } else {
    // Jika request tidak menggunakan http atau https, kita tidak memprosesnya
    event.respondWith(fetch(event.request)); // Atau bisa juga tidak memproses sama sekali
  }
});


// Hapus Cache Lama saat Activate
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME, API_CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
