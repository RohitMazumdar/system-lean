const CACHE = 'rohit-lean-v1';
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./index.html','./manifest.json'])));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(c => c || fetch(e.request).then(r => {
    if(r&&r.status===200){ const cl=r.clone(); caches.open(CACHE).then(ca=>ca.put(e.request,cl)); }
    return r;
  }).catch(()=>caches.match('./index.html'))));
});
