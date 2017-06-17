(function() {
	'use strict'
	angular.module('app')
		.component('customNavbar', {
			controller: ('CustomNavbarController', CustomNavbarController),
			templateUrl: './app/custom-navbar/custom-navbar.html'
		})

	CustomNavbarController.$inject = ['postsService', 'authService']


	function CustomNavbarController(postsService, authService) {
		const vm = this



		vm.items = [1, 2, 3, 4, 5, 6, 7];
		vm.selectedItem;
		vm.getSelectedText = function() {
			if (vm.selectedItem !== undefined) {
				return "You have selected: Item " + vm.selectedItem;
			} else {
				return "Please select an item";
			}
		};



	}
})()