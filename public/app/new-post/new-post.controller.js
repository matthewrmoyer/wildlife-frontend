(function(){
	'use strict'
	angular.module('app')
		.component('newPost', {
			controller: ('NewPostController', NewPostController),
			templateUrl: './app/new-post/new-post.html'
	})

		NewPostController.$inject = ['postsService']

		function NewPostController(postsService) {
			const vm = this;
			vm.specieArray = postsService.specieArray

			vm.$onInit = function() {
				console.log('new post controller init')
			}
		}
	
})()