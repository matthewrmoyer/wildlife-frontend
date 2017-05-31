var cacheName = 'shell'
var shellFilesToCache = [
	'/',
	'./index.html',
	'./css/bootstrap/css/bootstrap-theme.css',
	'./css/bootstrap/css/bootstrap-theme.min.css',
	'./css/bootstrap/css/bootstrap.css',
	'./css/bootstrap/css/bootstrap.min.css',
	'./css/reset.css',
	'./css/style.css',
	'./images/welcome-state-image.png',
	'./images/user-icon.png',
	'./images/location-image.png',

	'./node_modules/angular/angular.min.js',
	'./node_modules/angular-ui-router/release/angular-ui-router.min.js',
	'./app/app.config.js',
	'./app/app.module.js',

	'./app/welcome/welcome.html',
	'./app/welcome/welcome.controller.js'
]

self.addEventListener('install', (e) => {
	console.log('[ServiceWorker Install')
	e.waitUntil(
		caches.open(cacheName).then(cache => {
			console.log('[ServiceWorker] Caching Shell')
			return cache.addAll(shellFilesToCache)
		})
	)
})

self.addEventListener('activate', (e) => {
	console.log('[ServiceWorker] Activate')
	e.waitUntil(
		caches.keys().then(function(keyList) {
			return Promise.all(keyList.map(function(key) {
				// this is checking if there is an old version of the app cached
				if (key !== cacheName && key !== dataCacheName) {
					//if there is an old version delete it
					//immediately before this step, there would be two different versions installed already 
					console.log('[ServiceWorker] Removing old cache', key);
					return caches.delete(key);
				}
			}));
		})
	);
	return self.clients.claim();
})

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});