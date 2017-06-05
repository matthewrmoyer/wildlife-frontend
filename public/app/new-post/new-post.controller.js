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

		vm.createNewPost = createNewPost
		vm.sendNewPost = postsService.sendNewPost


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
			var img = document.getElementById('newPostPhotoInput').files[0]
			vm.postImage(img).then(vm.createNewPost)

		}

		function createNewPost(){

			var objToPost = {}
			objToPost.user_email = "USEREMAILHARDCODED@GMAIL.COM",
			objToPost.user_name ="USERNAMEHARDCODED",

			objToPost.latitude = vm.userLatitude,
			objToPost.longitude = vm.userLongitude,
			objToPost.specie = vm.newPost.specie,
			// trail: vm.newPost.trail,
			objToPost.description = vm.newPost.description,
			objToPost.image_url = 'https://s3-us-west-2.amazonaws.com/wildlifeimagebucket/' + postsService.postedImageId 


			console.log(objToPost)
			vm.sendNewPost(objToPost)
		}
	}

})()