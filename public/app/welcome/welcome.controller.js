(function() {
	'use strict'
	angular.module('app')
		.component('welcome', {
			controller: ('WelcomeController', WelcomeController),
			templateUrl: './app/welcome/welcome.html'
		})

	WelcomeController.$inject = ['postsService', 'authService']

	function WelcomeController(postsService, authService) {
		const vm = this;
		vm.auth = authService
		vm.login = authService.login
		vm.logout = authService.logout
		vm.profile;

		vm.$onInit = function() {
			console.log('welcome-state init')


			if (authService.getCachedProfile()) {
				vm.profile = authService.getCachedProfile();
				console.log(vm.profile)
			} else {
				authService.getProfile(function(err, profile) {
					vm.profile = profile;
					console.log(vm.profile)
				});
			}
		}
	}
})()