self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("tictactoe-cache").then((cache) => {
      return cache.addAll([
        "./",
        "index.html",
        "Tac.css",
        "Toe.js",
        "manifest.json",
        "icons/192_Tic.png",
        "icons/512_Tac.png"
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
