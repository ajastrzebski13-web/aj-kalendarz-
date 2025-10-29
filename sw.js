const CACHE_NAME='aj-pro-plus-v1';
const PRECACHE=['/','/index.html','/manifest.json','/icons/icon-192.png','/icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(PRECACHE)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.mode==='navigate'){
    e.respondWith(fetch(r).catch(()=>caches.match('/index.html'))); return;
  }
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(resp=>{
    const clone=resp.clone(); caches.open(CACHE_NAME).then(c=>c.put(r,clone)); return resp;
  }).catch(()=>caches.match(r))));
});
