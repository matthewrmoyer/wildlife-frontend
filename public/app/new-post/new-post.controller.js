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

			vm.newPost;
			vm.displayNewSpecieInput = false;

			vm.hideNewSpecieInput = hideNewSpecieInput
			vm.showNewSpecieInput = showNewSpecieInput
			vm.getSelectedSpecie = getSelectedSpecie

			vm.$onInit = function() {
				console.log('new post controller init')
			}

			function hideNewSpecieInput() {
				vm.displayNewSpecieInput = false
			}

			function showNewSpecieInput() {
				vm.displayNewSpecieInput = true
			}

			function getSelectedSpecie() {
				if(!vm.newPost.specie){
					console.log('asdfasdf')
					vm.showNewSpecieInput()
				}
				else{
					vm.hideNewSpecieInput()
				}
			}
		}
	
})()