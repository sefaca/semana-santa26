const CACHE_NAME = 'ss-sevilla-v1';

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/css/animations.css',
  '/js/app.js',
  '/js/data.js',
  '/js/position.js',
  '/js/favorites.js',
  '/js/weather.js',
  '/js/map.js'
];

// ── Install: precache essential files ──────────────────────────────────
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
});

// ── Activate: delete old caches ────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch strategies ───────────────────────────────────────────────────

function isApiRequest(url) {
  return url.hostname.includes('open-meteo') ||
         url.pathname.includes('tile');
}

function isStaticAsset(url) {
  return /\.(css|js|png|jpg|jpeg|gif|svg|webp|ico|woff2?)$/i.test(url.pathname);
}

// Network first, fall back to cache
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

// Stale-while-revalidate: serve from cache immediately, update cache in background
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => cached);

  return cached || fetchPromise;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Navigation requests: network first, fall back to cache
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  // API / tile requests: network first with cache fallback
  if (isApiRequest(url)) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Static assets (CSS, JS, images): stale-while-revalidate
  if (isStaticAsset(url)) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // Everything else: network first
  event.respondWith(networkFirst(request));
});
