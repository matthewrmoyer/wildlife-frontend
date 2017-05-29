(function() {
	angular.module('app')
		.service('postsService', service)

	service.$inject = ['$http']

	function service($http) {
		const vm = this
		vm.posts = []
		vm.moosePosts = []
		vm.elkPosts = []
		vm.bobcatPosts = []

		$http.get('https://wildlife-backend.herokuapp.com/posts')
			.then((response) => {
				response.data.forEach(element => {
					vm.posts.push(element)
					switch(element.specie) {
						case "Moose":
							vm.moosePosts.push(element)
							break;
						case "Elk":
							vm.elkPosts.push(element)
							break;
						case "Bobcat":
							vm.bobcatPosts.push(element)
							break;
					}
				})
			}, function(){
				console.log('Error getting posts')
			})
	}
})()