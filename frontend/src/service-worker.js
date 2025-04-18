// src/service-worker.js
import { precacheAndRoute } from 'workbox-precaching'

// Precaching
precacheAndRoute(self.__WB_MANIFEST)

// Cache-first strategy for assets
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request)))
})