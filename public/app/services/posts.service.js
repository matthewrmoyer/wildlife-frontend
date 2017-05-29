(function() {
	angular.module('app')
		.service('postsService', service)

	service.$inject = ['$http']

	function service($http) {
		const vm = this
		vm.posts = []
		$http.get('https://wildlife-backend.herokuapp.com/posts')
			.then((response) => {
				response.data.forEach(element => {
					vm.posts.push(element)
				})
			}, function(){
				console.log('Error getting posts')
			})
	}
})()