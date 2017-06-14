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
		vm.userProfile = authService.userProfile;

		vm.logoutThenLogin = logoutThenLogin

		vm.$onInit = function() {
			console.log('WELCOMESTATEINITWELCOMESTATEINITWELCOMESTATEINITWELCOMESTATEINITWELCOMESTATEINIT')
			// vm.sendMessageToSW(x)
			if (authService.getCachedProfile()) {
				vm.userProfile = authService.getCachedProfile();
			} else {
				authService.getProfile(function(err, profile) {
					vm.userProfile = profile;
				});
			}
		}

		function logoutThenLogin() {
			vm.logout()
			vm.login()
		}
	}
})()