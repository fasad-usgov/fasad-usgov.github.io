/**
 * History of US atrocities & Intervention - Service Worker
 * Offline-first PWA caching strategy
 */

const CACHE_NAME = 'hoi-archive-v1.3.1';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './about.html',
  './timeline.html',
  './coups.html',
  './oligarchy.html',
  './military-industrial-complex.html',
  './regions.html',
  './countries.html',
  './companies.html',
  './sources.html',
  './search.html',
  './offline.html',
  './404.html',
  './events/index.html',
  './countries/index.html',
  './companies/index.html',
  './sources/index.html',
  './css/main.css',
  './css/layout.css',
  './css/print.css',
  './js/app.js',
  './js/storage.js',
  './js/search.js',
  './js/timeline.js',
  './js/filters.js',
  './manifest.webmanifest',
  './assets/icons/icon-192.svg',
  './assets/icons/icon-512.svg',
  './data/indices/catalog.json',
  './data/indices/search-index.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
      .catch((err) => {
        console.warn('Pre-caching partial failure:', err);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Only handle GET requests within same origin
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  // 1. Navigation requests (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache fresh copy
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;
          const offlinePage = await caches.match('./offline.html');
          return offlinePage || new Response('Offline - page not cached', { status: 503, headers: { 'Content-Type': 'text/plain' } });
        })
    );
    return;
  }

  // 2. Data JSON requests: Stale-While-Revalidate
  if (url.pathname.includes('/data/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        const fetchPromise = fetch(request).then((networkResponse) => {
          if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => null);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 3. Static Assets (CSS, JS, Fonts, Icons, SVGs): Cache-First
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(request).then((networkResponse) => {
        if (networkResponse.ok) {
          const copy = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return networkResponse;
      });
    })
  );
});
