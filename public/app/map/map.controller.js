(function() {
	'use strict'
	angular.module('app')
		.component('map', {
			controller: ('MapController', MapController),
			templateUrl: './app/map/map.html'
		})

	MapController.$inject = ['postsService']

	function MapController(postsService) {
		const vm = this;
		vm.posts = postsService.posts;
		vm.moosePosts = postsService.moosePosts;
		vm.elkPosts = postsService.elkPosts;
		vm.bobcatPosts = postsService.bobcatPosts;
		vm.generateMarker = generateMarker;
		vm.removeAllMarkers = removeAllMarkers;


		vm.specieToFilterFor;

		vm.changeSpecieToFilterFor = changeSpecieToFilterFor;


		vm.wildlifeMap = L.map('wildlife-map').setView([40.3428, -105.6836], 7);
		vm.wildlifeMapTileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
			maxZoom: 18,
			layers: [vm.cities, vm.grayscale],
			id: 'mapbox.satellite',
			accessToken: 'pk.eyJ1IjoibWF0dGhld3Jtb3llciIsImEiOiJjajM2MzA1YWkwNGZ3MndwNm11NGZuNm1jIn0.Gh0P6Glzi5ERnaHcnwDA3A'
		}).addTo(vm.wildlifeMap);


		vm.allMarkerGroup = L.layerGroup().addTo(vm.wildlifeMap) 


		vm.$onInit = function() {
			console.log(vm.moosePosts)
			console.log(vm.elkPosts)
			console.log(vm.bobcatPosts)

		}

		function generateMarker(post, map){
			L.marker([post.latitude, post.longitude])
				.addTo(vm.allMarkerGroup)
				.bindPopup(`
					<h1>${post.specie}</h1>
					<p> Spotted At: ${post.created_at}<p/>
					<p>${post.description}<p/>
					<img class = "popup-image" src=${post.image_url}>
					<p> - ${post.user_name}</p>
					`);
		}

		function removeAllMarkers(){
			vm.allMarkerGroup.clearLayers()
		}

		function changeSpecieToFilterFor(){
			vm.removeAllMarkers()
			console.log(vm.specieToFilterFor)
		}
	}

})()