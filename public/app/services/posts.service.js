(function() {
	angular.module('app')
		.service('postsService', service)

	service.$inject = ['$http']

	function service($http) {
		const vm = this
		this.posts = []

		$http.get('https://wildlife-backend.herokuapp.com/posts')
			.then((response) => {
				response.data.forEach(element => {
					vm.posts.push(element)
				})
			}, function(){
				console.log('jsadkhflas')
			})

			console.log(vm.posts)
	}
})()