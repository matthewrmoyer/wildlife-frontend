(function(){
	'use strict'
	angular.module('app')
		.component('welcome', {
			controller: ('WelcomeController', WelcomeController),
			templateUrl: './app/welcome/welcome.html'
		})

		WelcomeController.$inject = ['postsService', 'authService']

		function WelcomeController(postsService, authService){
			const vm = this;
			vm.login = authService.login
			vm.$onInit = function(){
				console.log('welcome-state init')
			}
		}
})()