(function(){
	'use strict'
	angular.module('app')
		.component('welcome', {
			controller: ('WelcomeController', WelcomeController),
			templateUrl: './app/welcome/welcome.html'
		})

		WelcomeController.$inject = []

		function WelcomeController(){
			const vm = this;
			vm.$onInit = function(){
				console.log('welcome-state init')
			}
		}
})()