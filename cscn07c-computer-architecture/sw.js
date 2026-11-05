/* Offline support: cache the whole app on install. Network-first (always fresh online), cache when offline. */
const CACHE = "cscn07c-v3";
const FILES = ["./", "index.html", "style.css", "lesson3.css", "notes.js", "lesson3_notes.js", "bank.js", "lesson3_bank.js", "labs.js", "lesson3_labs.js", "app.js", "manifest.webmanifest", "icon.svg"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request, {cache: "no-cache"}).then(res => {
    if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
    return res;
  }).catch(() => caches.match(e.request, {ignoreSearch: true}).then(hit => hit || caches.match("index.html"))));
});
