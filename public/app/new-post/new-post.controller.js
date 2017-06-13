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
		vm.postedImageId = postsService.postedImageId
		// vm.createNewPost = createNewPost
		vm.sendNewPost = postsService.sendNewPost
		vm.goBackToPreviousView = goBackToPreviousView
		vm.messageObject = postsService.messageObject
		vm.updateLocationFromUserInput = updateLocationFromUserInput
		vm.getDescription = getDescription
		vm.x = new Image()
		vm.x.src = '../images/icons/icon-128x128.png'


		vm.updateSpecieFromUserInput = updateSpecieFromUserInput


		vm.$onInit = function() {
			console.log('new post controller init')
			vm.getUserLocation()
			document.getElementById('new-post-submit').addEventListener('click', () => {
				navigator.serviceWorker.ready.then(function(swRegistration) {
					console.log('REGISTER SYNC FROM NEW POST CONTROLLER')
					return swRegistration.sync.register('image-post');
				});
			});;
		}

		function hideNewSpecieInput() {
			vm.displayNewSpecieInput = false
		}

		function showNewSpecieInput() {
			vm.displayNewSpecieInput = true
		}

		function getSelectedSpecie() {
			console.log(vm.newPost.specie)

			vm.messageObject.specie = vm.newPost.specie

			console.log(postsService.messageObject.specie)


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
			vm.messageObject.latitude = position.coords.latitude
			vm.messageObject.longitude = position.coords.longitude
			console.log(vm.userLatitude)
			console.log(vm.userLongitude)
		}

		function submitPost() {
			var img = document.getElementById('newPostPhotoInput').files[0]
			vm.postImage(img)
				// .then(vm.createNewPost)
			vm.goBackToPreviousView()
		}

		function getDescription() {
			vm.messageObject.description = vm.newPost.description
		}

		function goBackToPreviousView() {
			history.back()
		}

		function updateLocationFromUserInput() {
			vm.messageObject.latitude = vm.userLatitude
			vm.messageObject.longitude = vm.userLongitude
		}

		function updateSpecieFromUserInput() {
			vm.messageObject.specie = vm.newPost.specie
			console.log(postsService.messageObject.specie)
		}
	}
})()