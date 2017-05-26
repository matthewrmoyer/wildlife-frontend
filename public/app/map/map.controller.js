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


		vm.generateAllMarker = generateAllMarker;


		vm.generateMooseMarker = generateMooseMarker;
		vm.hideMooseMarker = hideMooseMarker;


		vm.generateBobcatMarker = generateBobcatMarker;
		vm.hideBobcatMarker = hideBobcatMarker;


		vm.generateElkMarker = generateElkMarker;
		vm.hideElkMarker = hideElkMarker;



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


		// WIP Moose Layer
		// vm.mooseGroup = []
		// vm.mooseLayer = L.layerGroup(vm.mooseGroup)




		// LAYERS TO FILTER ANIMALS
		vm.littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
    	vm.denver = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
    	vm.aurora = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
    	vm.golden = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');




    	vm.citiesGroup = [vm.littleton, vm.denver, vm.aurora, vm.golden];
    	vm.citiesLayer = L.layerGroup(vm.citiesGroup)
    	vm.overlayMaps = {"Cities": vm.citiesLayer, /*"Moose": vm.mooseLayer*/}
		L.control.layers(vm.overlayMaps).addTo(vm.wildlifeMap);




    	
		vm.$onInit = function() {
			console.log('map init')
			console.log(vm.specieToFilterFor)
		}



		function generateAllMarker(post, map){
			L.marker([post.latitude, post.longitude])
				.addTo(vm.wildlifeMap)
				.bindPopup(`
					<h1>${post.specie}</h1>
					<p> Spotted At: ${post.created_at}<p/>
					<p>${post.description}<p/>
					<img class = "popup-image" src=${post.image_url}>
					<p> - ${post.user_name}</p>
					`);
		}

		function generateMooseMarker(post, map) {
			if(post.specie == 'Moose')
			L.marker([post.latitude, post.longitude])
				.addTo(vm.wildlifeMap)
				.bindPopup(`
					<h1>${post.specie}</h1>
					<p> Spotted At: ${post.created_at}<p/>
					<p>${post.description}<p/>
					<img class = "popup-image" src=${post.image_url}>
					<p> - ${post.user_name}</p>
					`);
		}

		function generateBobcatMarker(post, map) {
			if(post.specie == 'Bobcat')
			L.marker([post.latitude, post.longitude])
				.addTo(vm.wildlifeMap)
				.bindPopup(`
					<h1>${post.specie}</h1>
					<p> Spotted At: ${post.created_at}<p/>
					<p>${post.description}<p/>
					<img class = "popup-image" src=${post.image_url}>
					<p> - ${post.user_name}</p>
					`);
		}

		function generateElkMarker(post, map) {
			if(post.specie == 'Elk')
			L.marker([post.latitude, post.longitude])
				.addTo(vm.wildlifeMap)
				.bindPopup(`
					<h1>${post.specie}</h1>
					<p> Spotted At: ${post.created_at}<p/>
					<p>${post.description}<p/>
					<img class = "popup-image" src=${post.image_url}>
					<p> - ${post.user_name}</p>
					`);
		}

		function hideMooseMarker(){

		}
		
		function hideBobcatMarker(){

		}
		function hideElkMarker(){

		}


		function changeSpecieToFilterFor(){
			console.log(vm.specieToFilterFor)
		}
	}

})()