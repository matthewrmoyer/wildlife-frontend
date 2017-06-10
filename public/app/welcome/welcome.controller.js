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


		var x = new Image()
		x.src = '../images/icons/icon-128x128.png'

		vm.sendMessageToSW = sendMessageToSW

		vm.$onInit = function() {
			console.log('WELCOMESTATEINITWELCOMESTATEINITWELCOMESTATEINITWELCOMESTATEINITWELCOMESTATEINIT')
			vm.sendMessageToSW(x)
			if (authService.getCachedProfile()) {
				vm.userProfile = authService.getCachedProfile();
			} else {
				authService.getProfile(function(err, profile) {
					vm.userProfile = profile;
				});
			}
		}


		function sendMessageToSW(msg) {
			 navigator.serviceWorker.controller.postMessage("Client says " + msg);
		}
	}
})()