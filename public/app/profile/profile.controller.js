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
		vm.login = authService.login
		vm.userProfile = authService.userProfile;

		vm.$onInit = function() {
			console.log('profile-state init')
			if (authService.getCachedProfile()) {
				vm.userProfile = authService.getCachedProfile();
			} else {
				authService.getProfile(function(err, profile) {
					console.log(profile)
					vm.userProfile = profile;
				});
			}
		}
	}
})()