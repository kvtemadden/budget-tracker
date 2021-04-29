const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/index.js",
    "/dist/bundle.js",
    "/icons/icon-192x192.png",
    "/icons/icon-192x192.png"
  ];
  
  
  const STATIC_CACHE = "static-cache-v1";
  const RUNTIME_CACHE = "runtime-cache";
  
  self.addEventListener("install", event => {
    event.waitUntil(
      caches
        .open(STATIC_CACHE)
        .then(cache => cache.addAll(FILES_TO_CACHE))
        .then(() => self.skipWaiting())
    );
  });
  
 
  
   
  