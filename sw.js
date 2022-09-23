const CACHE_NAME = 'v1_social_media_cache',
    urlsToCache = [
        './',
        './img/fb.png',
        './img/ins.png',
        './img/tw.png',
        './img/sm.png',
        './img/funny.png',
        './style.css',
        './script.js'
    ]


self.addEventListener('install', (e)=> {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
            .then(()=> self.skipWaiting())
        })
        .catch((err) => console.log("Fallo en el registro del cache"))
    )
});

self.addEventListener('activate', (e)=> {
    const cacheWhitelist = [CACHE_NAME]
    e.waitUntil(
        caches.keys()
          .then(cacheNames => {
            return Promise.all(
              cacheNames.map(cacheName => {
                //Eliminamos lo que ya no se necesita en cache
                if (cacheWhitelist.indexOf(cacheName) === -1) {
                  return caches.delete(cacheName)
                }
              })
            )
          })
          // Le indica al SW activar el cache actual
          .then(() => self.clients.claim())
      )
});

self.addEventListener('fetch', (e)=> {

    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if(res) {
                return res
            }

            return fetch(e.request)
        })
    )
})