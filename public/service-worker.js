var cacheName = 'shell';
var dataCacheName = 'dataCache'
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

	'./node_modules/localforage/dist/localforage.js',
	'./node_modules/angular-localforage/dist/angular-localforage.js',

	'./app/welcome/welcome.html',
	'./app/welcome/welcome.controller.js',

	'./app/services/posts.service.js',

	'./app/map/map.html',
	'./app/map/map.controller.js',

	'./app/new-post/new-post.html',
	'./app/new-post/new-post.controller.js'

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
	// console.log('[ServiceWorker] Fetch', e.request.url);

	// requesting posts / data from backend
	// this is 1 of 2 requets being made, this request to the backend, there is another request being made to the cache in the postservice
	var dataUrl = 'https://wildlife-backend.herokuapp.com/posts';
	if (e.request.url.indexOf(dataUrl) > -1) {
		e.respondWith(
			caches.open(dataCacheName).then(cache => {
				// get response from network
				return fetch(e.request).then(response => {
					console.log(e.request, response)
					// put request url and clone of response from network in cache
					cache.put(e.request.url, response.clone())
					// return network response
					return response
				})
			})
		)

		// app is asking for app shell, so use cache with network as fallback
	} else {
		e.respondWith(
			caches.match(e.request).then(function(response) {
				return response || fetch(e.request);
			})
		)
	}


});