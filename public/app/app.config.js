(function() {
	'use strict';

	angular.module('app').config(config)

	config.$inject = ['angularAuth0Provider', '$stateProvider', '$urlRouterProvider', '$locationProvider']

	function config(angularAuth0Provider, $stateProvider, $urlRouterProvider, $locationProvider) {

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
			// Initialization for the angular-auth0 library
		angularAuth0Provider.init({
			clientID: 'X7GOoX2jsq7Et0e75iVTk8Rlv1HkAPeQ',
			domain: 'matthewrmoyer.auth0.com',
			responseType: 'token id_token',
			audience: 'https://matthewrmoyer.auth0.com/userinfo',
			redirectUri: 'http://localhost:3000/map',
			scope: 'openid'
		});

		$urlRouterProvider.otherwise('/');

		$locationProvider.hashPrefix('');

		$locationProvider.html5Mode(true)
		
	}

}());