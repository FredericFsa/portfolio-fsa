const CACHE_NAME = "fred-portfolio-cache";
const defaultVoiceName = "Microsoft Paul";
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  //'/chat.js',
  '/chat_local_tts_male.js',
  '/bot_responses.json',
  '/manifest.json',
  // '/icon-192.png',  // désactive ces lignes si les fichiers n'existent pas
  // '/icon-512.png',
  // '/favicon.ico',
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return Promise.all(
          urlsToCache.map((url) =>
            fetch(url)
              .then((response) => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return cache.put(url, response);
              })
              .catch((err) => {
                console.warn(`⚠️ Fichier non ajouté au cache (manquant ou erreur) : ${url}`);
              })
          )
        );
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
