(function() {
	angular.module('app')
		.service('postsService', service)

	service.$inject = ['$http']

	function service($http) {
		const vm = this
		vm.posts = []
		vm.specieSet = new Set()
		vm.specieArray = [];
		vm.allPostsUrl = 'https://wildlife-backend.herokuapp.com/posts'

		vm.postImage = postImage
			// cache logic
		if ('caches' in window) {
			caches.match(vm.allPostsUrl).then(response => {
				if (response) {
					// response.data.forEach(element => {
					// 	vm.posts.push(element)
					// 	vm.specieSet.add(element.specie)
					// })

					response.json().then(data => ({
						data: data,
						status: response.status
					})).then(res => {
						console.log('23450239583205893409583240958309582304958342095843509483509348509348503948590435 2345023958320589340958324095830958230495834209584350948350934850934850394859043523450239583205893409583240958309582304958342095843509483509348509348503948590435234502395832058934095832409583095823049583420958435094835093485093485039485904352345023958320589340958324095830958230495834209584350948350934850934850394859043523450239583205893409583240958309582304958342095843509483509348509348503948590435')
						console.log(res.data)
						res.data.forEach(element => {
							vm.posts.push(element)
							vm.specieSet.add(element.specie)
						})
					})



				}
			}).then(function() {
				vm.specieSet.forEach(element => {
					vm.specieArray.push(element)
				})
			})
		}


		// Fetch the latest data.
		// this is intercepted by the service worker which caches the response, so that the cache is populated with the data from the most recent requests
		$http.get(vm.allPostsUrl)
			.then((response) => {
				response.data.forEach(element => {
					vm.posts.push(element)
					vm.specieSet.add(element.specie)
				})
			}, function() {
				console.log('Error Getting Posts')
			}).then(function() {
				vm.specieSet.forEach(element => {
					vm.specieArray.push(element)
				})
			})

		function postImage(img) {
			console.log('postsService POSTINMAGE FHCTIUON')
			let formData = new FormData()
			formData.append("image", img)
			console.log(formData)
			$http.post('https://wildlife-backend.herokuapp.com/posts/image', formData, {
				headers: {"Content-Type": undefined},
				transformRequest: angular.identity
			}).then(function successCallback(response) {
				// this callback will be called asynchronously
				// when the response is available
				console.log(formData)
			}, function errorCallback(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
				console.log(formData)
			});
		}
	}
})()