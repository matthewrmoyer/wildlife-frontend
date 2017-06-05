(function() {
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

		vm.userLatitude
		vm.userLongitude
		vm.getUserLocation = getUserLocation
		vm.setUserLocation = setUserLocation

		vm.hideNewSpecieInput = hideNewSpecieInput
		vm.showNewSpecieInput = showNewSpecieInput
		vm.getSelectedSpecie = getSelectedSpecie

		vm.submitPost = submitPost
		vm.postImage = postsService.postImage

		vm.$onInit = function() {
			console.log('new post controller init')
			vm.getUserLocation()
		}

		function hideNewSpecieInput() {
			vm.displayNewSpecieInput = false
		}

		function showNewSpecieInput() {
			vm.displayNewSpecieInput = true
		}

		function getSelectedSpecie() {
			if (!vm.newPost.specie) {
				console.log('asdfasdf')
				vm.showNewSpecieInput()
			} else {
				vm.hideNewSpecieInput()
			}
		}

		function getUserLocation() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(setUserLocation);
			}
		}

		function setUserLocation(position) {
			vm.userLatitude = position.coords.latitude
			vm.userLongitude = position.coords.longitude
			console.log(vm.userLatitude)
			console.log(vm.userLongitude)
		}

		function submitPost() {
			console.log('hitting submit post')
			var img = document.getElementById('newPostPhotoInput').files[0]
			vm.postImage(img)

			// console.log(vm.newPost)
			// let img = vm.newPost.image
			// console.log(img)
		}
	}

})()