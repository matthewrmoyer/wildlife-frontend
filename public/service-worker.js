importScripts('./node_modules/localforage/dist/localforage.js')

var cacheName = 'shell';
var dataCacheName = 'dataCache'
var imageCacheName = 'imageCache88'
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
	'./node_modules/angular-localforage/dist/angular-localForage.js',

	'./app/welcome/welcome.html',
	'./app/welcome/welcome.controller.js',

	'./app/services/posts.service.js',

	'./app/map/map.html',
	'./app/map/map.controller.js',

	'./app/new-post/new-post.html',
	'./app/new-post/new-post.controller.js',

	'./app/user-map/user-map.html',
	'./app/user-map/user-map.controller.js',

	'./app/profile/profile.html',
	'./app/profile/profile.controller.js'

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
				if (key !== cacheName && key !== dataCacheName && key !== imageCacheName) {
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

// TODO: SERVICE WORKER GOES OFF AND ON SO GLOBAL VARIABLE WILL BE GONE
// INSTEAD OF GLOBAL VARIABLE, STORE WITH LOCAL FORAGE, THEN GET IT OUT IN POST IMAGE FUNCTION
var imageMessage;
var messageObject

self.addEventListener('message', function(event) {
	console.log("SW Received Message: " + event.data);
	messageObject = event.data
	imageMessage = event.data.image
	console.log(imageMessage)
	console.log(typeof imageMessage)
	console.log(messageObject)
});


//this is called in background sync
function postImage() {
	console.log('POST IMAGE FUNCTION CALLED FROM SYNC EVENT ON SUBMIT BUTTON' + imageMessage)

	let formData = new FormData()
	formData.append("image", imageMessage)

	var myInit = {
		method: 'POST',
		mode: 'cors',
		body: formData,
		header: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
		}
	};
	return fetch('https://wildlife-backend.herokuapp.com/posts/image', myInit).then(function(data) {
		console.log(data)
	}, function(data) {
		console.log(data)
	});
}



self.addEventListener('sync', function(e) {
	console.log('SW SYNC')
	if (e.tag === 'image-post') {
		e.waitUntil(postImage());
	}
});



self.addEventListener('fetch', function(e) {

	var dataUrl = 'https://wildlife-backend.herokuapp.com/posts';
	var imageUrl = 'https://wildlife-backend.herokuapp.com/posts/image';

	// requesting posts / data from backend
	// this is 1 of 2 requeSts being made, this request to the backend, there is another request being made to the cache in the postservice
	if (e.request.url == dataUrl) {
		e.respondWith(
			caches.open(dataCacheName).then(cache => {
				// get response from network
				return fetch(e.request).then(response => {
						// put request url and clone of response from network in cache
					cache.put(e.request.url, response.clone())
						// return network response
					return response
				})
			})
		)
		// post to image backend
	} else if (e.request.url == imageUrl) {
		const clonedRequest = e.request.clone()
		e.respondWith(fetch(e.request)
			.catch(error => {
				console.log(error)
				return error
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