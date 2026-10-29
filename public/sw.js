const CACHE_NAME = 'sensual-girl-v3'; // Versión actualizada
const ASSETS_TO_CACHE = [
  '/',
  '/shop',
  '/login',
  '/manifest.json',
  '/logo-face.png',
  '/legna.webp',
  '/kleyan.webp',
  '/galeria1.webp',
  '/galeria2.webp',
  '/galeria3.webp',
  '/galeria4.webp',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) return caches.delete(cache);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse; // Carga rápida desde caché
      
      return fetch(event.request).then((networkResponse) => {
        // Cachear imágenes y videos dinámicamente
        if (event.request.url.match(/\.(png|jpg|jpeg|webp|css|js|ttf|mp4)$/)) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      });
    }).catch(() => {
      if (event.request.mode === 'navigate') {
        return caches.match('/');
      }
    })
  );
});
