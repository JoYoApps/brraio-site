/* Brraio service worker: always asks the network first (so updates arrive straight away) and falls back to the saved copy when you're offline. */
const C = "brraio-v1";
self.addEventListener("install", e => { self.skipWaiting(); e.waitUntil(caches.open(C).then(c => c.addAll(["./", "icon-192.png", "manifest.webmanifest"])).catch(()=>{})); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return;
  e.respondWith(fetch(r).then(res => { if (res && res.ok) { const cp = res.clone(); caches.open(C).then(c => c.put(r, cp)).catch(()=>{}); } return res; })
    .catch(() => caches.match(r).then(m => m || caches.match("./"))));
});
