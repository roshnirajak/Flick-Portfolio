const CACHE_NAME = 'video-cache-v1';
const VIDEOS_TO_CACHE = [
  '/video/full-screen-video/video (1).mp4',
  '/video/full-screen-video/video (2).mp4',
  '/video/full-screen-video/video (3).mp4',
  '/video/full-screen-video/video (4).mp4',
  '/video/full-screen-video/video (5).mp4',
  '/video/full-screen-video/video (6).mp4',
  '/video/full-screen-video/video (7).mp4',
  '/video/full-screen-video/video (8).mp4',
];

// Install event - cache videos on first load
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Don't pre-cache all videos, let them cache on demand
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - cache videos on demand
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Only handle video requests from full-screen-video and breakdown folders
  if (url.pathname.includes('/video/full-screen-video/') || url.pathname.includes('/video/breakdown/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          // Return from cache if available
          if (response) {
            return response;
          }

          // Otherwise fetch from network and cache it
          return fetch(event.request).then((networkResponse) => {
            // Only cache successful responses
            if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            // If fetch fails and no cache, return the request to fail
            return caches.match(event.request);
          });
        });
      })
    );
  }
});
