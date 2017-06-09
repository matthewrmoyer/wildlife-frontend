(function() {
	'use strict'
	angular.module('app')
		.component('profile', {
			controller: ('ProfileController', ProfileController),
			templateUrl: './app/profile/profile.html'
		})
	ProfileController.$inject = ['postsService']

	function ProfileController(postsService) {

	}
})()