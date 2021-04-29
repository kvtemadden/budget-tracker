const FILES_TO_CACHE = [
    "/",
    "/styles.css",
    "/js/indexedDB.js",
    "/index.html",
    "/index.js",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png"
  ];
  
  
  const STATIC_CACHE = "static-cache-v1";
  const RUNTIME_CACHE = "data-cache";
  
  self.addEventListener("install", function(event) {
    // Perform install steps
    event.waitUntil(
      caches.open(STATIC_CACHE).then(function(cache) {
        console.log("Opened cache");
        return cache.addAll(FILES_TO_CACHE);
      })
    );
  });

  self.addEventListener("fetch", function(event) {
    // cache all get requests to /api routes
    if (event.request.url.includes("/api/")) {
      event.respondWith(
        caches.open(RUNTIME_CACHE).then(cache => {
          return fetch(event.request)
            .then(response => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                cache.put(event.request.url, response.clone());
              }
  
              return response;
            })
            .catch(err => {
              // Network request failed, try to get it from the cache.
              return cache.match(event.request);
            });
        }).catch(err => console.log(err))
      );
  
      return;
    }
  
    event.respondWith(
      fetch(event.request).catch(function() {
        return caches.match(event.request).then(function(response) {
          if (response) {
            return response;
          } else if (event.request.headers.get("accept").includes("text/html")) {
            // return the cached home page for all requests for html pages
            return caches.match("/");
          }
        });
      })
    );
  });
  