(function() {
	'use strict'
	angular.module('app')
		.component('profile', {
			controller: ('ProfileController', ProfileController),
			templateUrl: './app/profile/profile.html'
		})
	ProfileController.$inject = ['postsService', 'authService']

	function ProfileController(postsService, authService) {
		const vm = this
		vm.auth = authService
	}
})()