(function() {
	angular.module('app')
		.service('postsService', service)

	service.$inject = ['$http']

	function service($http) {
		const vm = this
		vm.posts = []
		vm.specieSet = new Set()
		vm.specieArray = []
		// vm.specieSet.forEach(element => vm.specieArray.push(element))


		$http.get('https://wildlife-backend.herokuapp.com/posts')
			.then((response) => {
				response.data.forEach(element => {
					vm.posts.push(element)
					vm.specieSet.add(element.specie)
					// .then(vm.specieArray.push(element.specie))
				})
				// .then(function(){
				// 	vm.specieArray = Array.from(vm.specieSet)
				// })
			}, function() {
				console.log('Error getting posts')
			})
	}
})()

