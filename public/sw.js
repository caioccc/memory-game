const CACHE = "memory-core-v5";
const APP_SHELL = ["/", "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then(async (cache) => {
      await cache.addAll(APP_SHELL);
      const assets = [
        "transport/car", "transport/train", "transport/rocket", "transport/airplane",
        "transport/sailboat", "transport/bicycle", "transport/bus", "transport/truck",
        "transport/helicopter", "transport/motorcycle", "transport/tractor", "transport/ship",
        "transport/subway", "transport/tram", "transport/ambulance", "transport/firetruck",
        "animals/lion", "animals/tiger", "animals/eagle", "animals/dolphin",
        "animals/wolf", "animals/elephant", "animals/giraffe", "animals/zebra",
        "animals/bear", "animals/fox", "animals/owl", "animals/penguin", "animals/horse",
        "animals/rabbit", "animals/monkey", "animals/kangaroo",
        "instruments/guitar", "instruments/piano", "instruments/drums", "instruments/saxophone",
        "instruments/violin", "instruments/trumpet", "instruments/flute", "instruments/accordion",
        "instruments/cello", "instruments/harp", "instruments/banjo", "instruments/microphone",
        "instruments/oboe", "instruments/tuba", "instruments/maracas", "instruments/xylophone"
      ].map((asset) => `/assets/${asset}.jpg`);
      await cache.addAll(assets);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
