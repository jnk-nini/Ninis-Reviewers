const CACHE="cselc03c-reviewer-v5";
const ASSETS=["./","index.html","style.css","app.js","manifest.webmanifest","icon.svg","facts1.js","facts2.js","facts3.js","fill1.js","tf1.js","tf2.js","mc1.js","mc2.js","mc3.js","notes_o1.js","notes_i1.js","notes_r1.js","notes_s1.js","facts_m1.js","fill_m1.js","tf_m1.js","mc_m1.js","notes_f1.js","notes_n1.js","notes_e1.js","core.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>{
    const net=fetch(e.request).then(r=>{if(r&&r.ok&&new URL(e.request.url).origin===location.origin){const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp))}return r}).catch(()=>hit||caches.match("index.html"));
    return hit||net}))});
