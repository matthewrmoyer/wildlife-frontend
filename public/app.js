(function() {

	// register service worker
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
			.register('./service-worker.js')
			.then(function() {
				console.log('Service Worker Registered');
			}, function(){
				console.log('0934u8eiorwjfsdkn')
			});
	}


	localforage.setDriver([
		localforage.INDEXEDDB,
		localforage.WEBSQL,
		localforage.LOCALSTORAGE
	]).then(function() {
		console.log('local forage setDriver success')
	}, function() {
		console.log('ERROR: LOCALFORAGE DRIVER NOT SET')
	})

})()