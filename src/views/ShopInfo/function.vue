<script>
	import { Loader } from '../../components/Loader'

	import axios from 'axios'
	
	var ShopInfo = {
		components:{
			Loader,
		},
		data() {
			return {
				requestedHeaders: {
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem("auth_token"),
					}
				},
				showLoader : false,
				selectedTab : 'info',
				shopDetails : {},
				currentLocation : {},
				gmapOptions: {
					map: null,
					markers: [],
				},
				favoritesList: [],
				userDetails: {},
				windowSize: {},
				isFirstLoad: false,
			}
		},
		async created() {
			
			await this.getUserDetails();
			await this.getFavorites();
			await this.getShopInfo();
			this.checkWindowSize();
			this.getCurrentLocation();
		},
		methods: {
			selectTab(tab){
				let vm = this
				vm.selectedTab = tab;

				if(tab == 'map' && this.windowSize.width <= 768 ){
					document.getElementById('mob-map-container').style.display = 'block';
					setTimeout(() => {
						this.initMap();
					}, 300);
				}else{
					document.getElementById('mob-map-container').style.display = 'none';
				}
			},
      toggleLoader(opt) {
				let vm = this
      	vm.showLoader = opt;
      },
			async getShopInfo(){
				let vm = this
				vm.toggleLoader(true);
				await	axios.get(`/shops?_id=${vm.$route.params.id}`, vm.requestedHeaders)
        .then((res) => {
          console.log(res);
          if(res.data.status){
						vm.shopDetails = res.data.shop;
						vm.shopDetails.distance = '0.0km';
						vm.shopDetails.time = '0 mins';
						vm.shopDetails.business_hours = JSON.parse(vm.shopDetails.business_hours);
						vm.shopDetails.category = JSON.parse(vm.shopDetails.category);
						vm.shopDetails.status = vm.shopDetails.status == 1 ? true : false;
						vm.shopDetails.isFavorite = (vm._.findIndex(vm.favoritesList, { 'shop_id' : vm.shopDetails._id }) > -1) ? true : false;
						let shopLocation = {
							lat: vm.shopDetails.latitude,
							lng: vm.shopDetails.longitude,
						};
						vm.markers = [shopLocation];

          }else{
            vm.$swal('Error', res.data.message, 'error');
          }
          // vm.toggleLoader(false);
        })
        .catch((err) => {
					console.log(err);
          console.log(err.response.data.message);
          vm.toggleLoader(false);
          vm.$swal('Error', err.response.data.message, 'error');
        })
			},
			callShop(){
				// let vm = this 
				window.open('tel:' + '09955332302');
			},
			goToWebsite(){
				// let vm = this
				window.open('http://google.com');
			},
			async getFavorites(){
				let vm = this
				await axios.get(`/favorites?id=${vm.userDetails._id}`, vm.requestedHeaders)
        .then( async (res) => {
          console.log(res);
          if(res.data.status){
						vm.favoritesList = res.data.favorites;
          }else{
            vm.$swal('Error', res.data.message, 'error');
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
          vm.toggleLoader(false);
          vm.$swal('Error', err.response.data.message, 'error');
        })
			},
			favShop(shop_data, opt){
				let vm = this
				shop_data.isFavorite = opt;
				this.$forceUpdate();
				let data = {
					shop_id : shop_data._id,
					user_id : vm.userDetails._id,
					active: opt,
				}
				axios.post(`/favorites`, data, vm.requestedHeaders)
        .then( async (res) => {
          console.log(res);
          if(res.data.status){
						console.log(res.data.message);
          }else{
            vm.$swal('Error', res.data.message, 'error');
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
          vm.toggleLoader(false);
          vm.$swal('Error', err.response.data.message, 'error');
        })
			},
			async getUserDetails(){
				let vm = this
				await axios.get(`/user?id=${vm.requestedHeaders.headers.Authorization}`, vm.requestedHeaders)
        .then((res) => {
          console.log(res);
          if(res.data.status){
						vm.userDetails = res.data.user;
          }else{
            vm.$swal('Error', res.data.message, 'error');
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
          vm.$swal('Error', err.response.data.message, 'error');
        })
			},
			checkWindowSize(){
				this.windowSize = {
					width : window.innerWidth,
					height : window.innerHeight,
				}
				this.appendMapElement();
			},
			appendMapElement(){
				const div = document.createElement('div');
				div.className = 'w-full h-full';
				div.id = 'map';
				if(this.windowSize.width <= 768){
					document.getElementById('mob-map-container').appendChild(div);
				}else{
					document.getElementById('web-map-container').appendChild(div);
				}
			},
			
			initMap(){
				let vm = this
				vm.gmapOptions.map = new window.google.maps.Map(document.getElementById("map"), {
          center: vm.currentLocation,
          zoom: 15,
					zoomControl: false,
					mapTypeControl: false,
					scaleControl: false,
					streetViewControl: false,
					rotateControl: false,
					fullscreenControl: false
        });
				vm.setMarkers();
				vm.setMapCenter();
				vm.setMapStyle();
				vm.setMapDirections();
			},
			setMarkers(){
				let vm = this
				vm.gmapOptions.markers = [];
				let map = vm.gmapOptions.map;
				vm.gmapOptions.markers[0] = new window.google.maps.Marker({
					position: vm.currentLocation,
					map: map,
					icon: {
						url: '../assets/img/user-marker-icon.png',
						scaledSize: new window.google.maps.Size(50, 50),
						// origin: new window.google.maps.Point(0,0),
						// anchor: new window.google.maps.Point(0, 0)
					}
				});
				vm.gmapOptions.markers[1] = new window.google.maps.Marker({
					position: {
						lat: vm.shopDetails.latitude,
						lng: vm.shopDetails.longitude,
					},
					map: map
				});
			},
			setMapCenter(){
				let vm = this
				let map = vm.gmapOptions.map;
				let latLngs = [vm.currentLocation,{
					lat: vm.shopDetails.latitude,
					lng: vm.shopDetails.longitude,
				}];
				var bounds = new window.google.maps.LatLngBounds();
				for (var i = 0; i < latLngs.length; i++) {
					bounds.extend(latLngs[i]);
				}
				map.fitBounds(bounds);
			},
			setMapStyle(){
				let vm = this
				let map = vm.gmapOptions.map;
				var styles = [
					{
						"featureType": "poi.business",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "poi.park",
						"elementType": "labels.text",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					}
				];
				map.setOptions({styles: styles});
			},
			setMapDirections(){
				let vm = this
				let map = vm.gmapOptions.map;
				const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer({
					suppressMarkers: true,
					polylineOptions: {
						strokeColor: '#476A9D',
						strokeWeight: 5
					}
				});
				directionsRenderer.setMap(map);
				directionsService.route(
					{
						origin: vm.currentLocation,
						destination: {
							lat: vm.shopDetails.latitude,
							lng: vm.shopDetails.longitude,
						},
						travelMode: window.google.maps.TravelMode.DRIVING
					},
					(response, status) => {
						if (status === "OK") {
              directionsRenderer.setDirections(response);
            } else {
              window.alert("Directions request failed due to " + status);
            }
					}
				)
			},
			getCurrentLocation(){
				let vm = this
				if (window.navigator.geolocation) {
					if(vm.shopDetails.name){
						window.navigator.geolocation.watchPosition((position) => {
								vm.currentLocation = {
									lat: position.coords.latitude,
									lng: position.coords.longitude,
								}								
								if(!vm.isFirstLoad && this.windowSize.width > 768){
									vm.isFirstLoad = true;
									setTimeout(() => {
										this.initMap();
									}, 300);
								}
								this.getDistanceAndDuration();
							}, (err) =>{
								console.log(err);
								this.getCurrentLocation();
							}, {
								timeout: (5 * 1000),
								maximumAge: (1000 * 60 * 15),
								enableHighAccuracy: true
							}
						);
					}
				}else{
					window.alert('Geolocation is not supported.');
				}
			},
			reverseGeocode(latlng){
				const geocoder = new window.google.maps.Geocoder();
				geocoder.geocode({ location: latlng }, (results, status) => {
          console.log(results);
          console.log(status);
        });
			},
			getDistanceAndDuration(){
				let vm = this
				var service = new window.google.maps.DistanceMatrixService();
				service.getDistanceMatrix(
					{
						origins: [vm.currentLocation],
						destinations: [{
							lat: vm.shopDetails.latitude, 
							lng: vm.shopDetails.longitude
						}],
						travelMode: window.google.maps.TravelMode.DRIVING,
						unitSystem: window.google.maps.UnitSystem.METRIC,
						avoidHighways: false,
						avoidTolls: false,
					}, (response, status)	=>	{
						// console.log(response);
						if(status == 'OK'){
							vm.shopDetails.distance = response.rows[0].elements[0].distance.text;
							vm.shopDetails.time = response.rows[0].elements[0].duration.text;
							this.$forceUpdate();
						}else{
							vm.shopDetails.distance = ((window.google.maps.geometry.spherical.computeDistanceBetween(
								new window.google.maps.LatLng(vm.currentLocation.lat, vm.currentLocation.lng),
								new window.google.maps.LatLng(vm.shopDetails.latitude, vm.shopDetails.longitude)
							)) / 1000).toFixed(1);
							let distanceTime = (vm.shopDetails.distance) > 1 ? (vm.shopDetails.distance / 0.3) : (vm.shopDetails.distance / 0.1);
							vm.shopDetails.time = distanceTime < 1 ? 1 : distanceTime.toFixed(0);
						}						
						vm.toggleLoader(false);
					});
			}
    }
	}
	export default ShopInfo
</script>