const CACHE = 'portafoglio-v1';
const SHELL = [
  './',
  './index.html',
  'https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      // Cache shell assets, ignora errori su CDN esterni
      return Promise.allSettled(SHELL.map(function(url) {
        return cache.add(url).catch(function(){});
      }));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  // Solo GET, escludi API esterne (prezzi, CoinGecko, Yahoo)
  if(e.request.method !== 'GET') return;
  var url = e.request.url;
  if(url.includes('coingecko') || url.includes('yahoo') || url.includes('corsproxy') || url.includes('allorigins')) return;

  e.respondWith(
    caches.match(e.request).then(function(cached) {
      if(cached) return cached;
      return fetch(e.request).then(function(response) {
        // Cachea solo risposte valide (non API dinamiche)
        if(response && response.status === 200 && response.type !== 'opaque') {
          var clone = response.clone();
          caches.open(CACHE).then(function(cache){ cache.put(e.request, clone); });
        }
        return response;
      }).catch(function() {
        // Offline fallback: ritorna index.html per navigazione
        if(e.request.destination === 'document') return caches.match('./index.html');
      });
    })
  );
});
