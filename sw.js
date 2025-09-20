const CACHE_NAME = "monastery360-v2"
const urlsToCache = [
  "/",
  "/app",
  "/app/map",
  "/app/calendar", 
  "/app/archives",
  "/app/tours",
  "/manifest.json",
  "/icon-192.jpg",
  "/icon-512.jpg",
  "/majestic-himalayan-monastery-with-prayer-flags-and.jpg",
  "/rumtek-monastery-golden-roof-traditional-architect.jpg",
  "/pemayangtse-monastery-white-walls-mountain-view.jpg",
  "/tashiding-monastery-hilltop-prayer-flags-valley-vi.jpg",
  "/api/festivals",
  "/api/monasteries",
  "/api/archives",
  "/api/audio-guides"
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch((error) => {
        console.log("Failed to cache some resources:", error)
      })
    })
  )
})

self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      if (response) {
        return response
      }
      
      return fetch(event.request).then((response) => {
        // Don't cache if not a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response
        }

        // Clone the response
        const responseToCache = response.clone()

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache)
        })

        return response
      }).catch(() => {
        // Return offline page for navigation requests
        if (event.request.destination === "document") {
          return caches.match("/")
        }
      })
    })
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})
