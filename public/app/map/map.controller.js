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
		// variables
		vm.posts = postsService.posts;
		vm.specieSet = postsService.specieSet
		vm.specieArray = postsService.specieArray;
		vm.specieToFilterFor = postsService.specieToFilterFor;
		vm.wildlifeMap;
		vm.wildlifeMapTileLayer;
		vm.allMarkerGroup = L.layerGroup() // create a marker group to populate with all posts
			// functions
		vm.populateAllMarkerGroup = populateAllMarkerGroup;
		vm.removeAllMarkers = removeAllMarkers;
		vm.displayMarkerGroup = displayMarkerGroup;

		vm.getAndWatchUserLocation = getAndWatchUserLocation;
		vm.showPosition = showPosition;
		vm.centerOnUser = centerOnUser;

		vm.userLatitude;
		vm.userLongitude;

		vm.userMarker;
		vm.userCircle;



		vm.$onInit = function() {
			console.log(vm.posts)
			console.log(vm.specieSet)
			console.log(vm.specieArray)


			vm.getAndWatchUserLocation(vm.showPosition)

			// generate map
			vm.wildlifeMap = L.map('wildlife-map').setView([40.3428, -105.6836], 7);
			vm.wildlifeMapTileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
				maxZoom: 18,
				id: 'mapbox.satellite',
				accessToken: 'pk.eyJ1IjoibWF0dGhld3Jtb3llciIsImEiOiJjajM2MzA1YWkwNGZ3MndwNm11NGZuNm1jIn0.Gh0P6Glzi5ERnaHcnwDA3A'
			}).addTo(vm.wildlifeMap);
			// add allMarkerGroup to map
			displayMarkerGroup(vm.allMarkerGroup, vm.wildlifeMap)
				// vm.watchPosition;
		}

		// populate allMarkerGroup array
		function populateAllMarkerGroup(post, map) {
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

		function displayMarkerGroup(markerGroup, map) {
			markerGroup.addTo(map)
		}

		function removeAllMarkers(layerGroup) {
			layerGroup.clearLayers()
		}

		function getAndWatchUserLocation(showPosition) {
			if (navigator.geolocation) {
				navigator.geolocation.watchPosition(showPosition)

			} else {
				alert('Geolocation is not supported on your device')
			}
		}

		function showPosition(position) {

			if (vm.userMarker) {
				vm.wildlifeMap.removeLayer(vm.userMarker)
			}

			if (vm.userCircle) {
				vm.wildlifeMap.removeLayer(vm.userCircle)
			}
			console.log("New Location")
			vm.userLatitude = position.coords.latitude;
			console.log(vm.userLatitude)
			vm.userLongitude = position.coords.longitude;
			console.log(vm.userLongitude)

			vm.userMarker = L.marker([position.coords.latitude, position.coords.longitude])
				.bindPopup("Your Location");

			vm.userCircle = L.circle([position.coords.latitude, position.coords.longitude], {
				color: 'red',
				fillColor: 'blue',
				fillOpacity: .5,
				radius: 100
			})

			vm.wildlifeMap.addLayer(vm.userMarker)
			vm.wildlifeMap.addLayer(vm.userCircle)

		}

		function centerOnUser() {
			console.log('centering')
			if (vm.userLatitude && vm.userLongitude) {
				vm.wildlifeMap.setView([vm.userLatitude, vm.userLongitude], 20)
			}
		}

	}

})()