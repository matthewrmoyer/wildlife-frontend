(function() {
	angular.module('app')
		.service('postsService', service)

	service.$inject = ['$http']

	function service($http) {
		const vm = this
		vm.posts = []
		vm.specieSet = new Set()
		vm.specieArray = [];
		// vm.specieSet.forEach(element => vm.specieArray.push(element))


		$http.get('https://wildlife-backend.herokuapp.com/posts')
			.then((response) => {
				response.data.forEach(element => {
					vm.posts.push(element)
					vm.specieSet.add(element.specie)
				})
			}, function(){
				console.log('Error Getting Posts')
			}).then(function(){
					 vm.specieSet.forEach(element => {
						vm.specieArray.push(element)
					})
				 })
	}
})()

