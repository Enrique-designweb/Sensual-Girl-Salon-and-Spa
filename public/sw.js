const CACHE_NAME = 'sensual-girl-v2';
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
  '/galeria5.webp',
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
  // Estrategia: Cache First, luego Red (para cargar offline rápido)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Si está en caché, lo devuelve al instante
      }
      
      return fetch(event.request).then((networkResponse) => {
        // Si es una imagen o un video, guardarlo en caché para la próxima
        if (event.request.url.match(/\.(png|jpg|jpeg|webp|css|js|ttf|mp4)$/)) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      });
    }).catch(() => {
      // Fallback si no hay red y no está en caché
      if (event.request.mode === 'navigate') {
        return caches.match('/');
      }
    })
  );
});
