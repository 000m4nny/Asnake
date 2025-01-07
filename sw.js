const CACHE_NAME = "planner-cache-v1";
const urlsToCache = [
    "/homework-planner/",
    "/homework-planner/index.html",
    "/homework-planner/style.css",
    "/homework-planner/app.js",
    "/homework-planner/manifest.json",
    "/homework-planner/icons/icon-192x192.png",
    "/homework-planner/icons/icon-512x512.png"
  ];  

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
