const CACHE_NAME = 'sensual-girl-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/shop',
  '/admin',
  '/servicios/legna',
  '/servicios/kleyan',
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

// Instalar y cachear los archivos base
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activar y limpiar cachés viejos
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

// Interceptar peticiones (Cache First, Network Fallback)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).then((networkResponse) => {
        // Si es una imagen o un archivo estático, lo guardamos en caché
        if (event.request.url.match(/\.(png|jpg|jpeg|webp|css|js|ttf)$/)) {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
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
