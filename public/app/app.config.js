(function() {
	'use strict';

	angular.module('app').config(config)

	config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']

	function config($stateProvider, $urlRouterProvider, $locationProvider) {
		$locationProvider.html5Mode(true)

		$stateProvider
			.state({
				name: 'home',
				url: '/',
				component: 'welcome',
			})
			.state({
				name: 'map',
				url: '/map',
				component: 'map',
			})
			.state({
				name: 'newPost',
				url: '/newPost',
				component: 'newPost',
			})
	}

}());