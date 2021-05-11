<script>
	import { Loader } from '../../components/Loader'
	import { InsideSpinner } from '../../components/InsideSpinner'

	import axios from 'axios'
	
	var Home = {
		components:{
			Loader,
			InsideSpinner,
		},
		data() {
			return {
				requestedHeaders: {
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem("auth_token"),
					}
				},
				showLoader : false,
				categoriesArr:	[],
				searchVal: '',
				shopsArr: [],
				currentLocation: {},
				userDetails: {},
				favoritesList: [],
			}
		},
		async created() {
			await this.getUserDetails();
			await this.getFavorites();
			this.getCategoryList();
			await this.getShopList();
			this.getCurrentLocation();	
		},
		computed: {
			filteredShops: function(){
				if(this.searchVal != ''){
					return this.shopsArr.filter((value) => {
						return value.name.toLowerCase().includes(this.searchVal); 
					});
				}else{
					return this.shopsArr;
				}
			}
		},
		methods: {
      toggleLoader(opt) {
				let vm = this
      	vm.showLoader = opt;
      },
			goToShopDetails(shop){
				let vm = this;
				vm.$router.push({ name: 'ShopInfo', params: { id: shop._id } });
			},
			async getCategoryList(){
				let vm = this
				await axios.get(`/categories`, vm.requestedHeaders)
        .then((res) => {
          console.log(res);
          if(res.data.status){
						vm.categoriesArr = res.data.categories;
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
			async getShopList(){
				let vm = this
				vm.toggleLoader(true);
				await axios.get(`/shops?status=1`, vm.requestedHeaders)
        .then( async (res) => {
          console.log(res);
          if(res.data.status){
						vm.shopsArr = res.data.shops;
						vm.shopsArr.map((value)	=>	{
							value.category = JSON.parse(value.category);
							value.isFavorite = (vm._.findIndex(vm.favoritesList, { 'shop_id' : value._id }) > -1) ? true : false;
						})
          }else{
            vm.$swal('Error', res.data.message, 'error');
          }
          // vm.toggleLoader(false);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          vm.toggleLoader(false);
          vm.$swal('Error', err.response.data.message, 'error');
        })
			},
			getCurrentLocation(){
				let vm = this
				if (window.navigator.geolocation) {
					if(vm.shopsArr.length > 0){
						window.navigator.geolocation.watchPosition((position) => {
								vm.currentLocation = {
									lat: position.coords.latitude,
									lng: position.coords.longitude,
								}
								vm.getDistanceFromCurrentPosition();
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
			getDistanceFromCurrentPosition(){
				let vm = this;
				vm.shopsArr.forEach((value, index) => {
					value.distance = ((window.google.maps.geometry.spherical.computeDistanceBetween(
						new window.google.maps.LatLng(vm.currentLocation.lat, vm.currentLocation.lng),
						new window.google.maps.LatLng(value.latitude, value.longitude)
					)) / 1000).toFixed(1) + 'km';

					if(index == vm.shopsArr.length - 1){
						this.shopsArr = this._.orderBy(this.shopsArr, 'distance', 'asc');
						vm.toggleLoader(false);
					}
				});        
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
			}
    }
	}
	export default Home
</script>