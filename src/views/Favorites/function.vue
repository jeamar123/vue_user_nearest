<script>
	import { Loader } from '../../components/Loader'
	import axios from 'axios'
	
	var Favorites = {
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
				userDetails: {},
				favoritesList: [],
			}
		},
		async created() {
			await this.getUserDetails();
			await this.getFavorites();
		},
		methods: {
      toggleLoader(opt) {
				let vm = this
      	vm.showLoader = opt;
      },
			async getUserDetails(){
				let vm = this
				vm.toggleLoader(true);
				await axios.get(`/user?id=${vm.requestedHeaders.headers.Authorization}`)
					.then((res) => {
						console.log(res);
						vm.userDetails = res.data.user;
						// vm.toggleLoader(false);
					})
					.catch((err) => {
						console.log(err.response.data.message);
						vm.toggleLoader(false);
						vm.$swal('Error', err.response.data.message, 'error');
					})
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
					vm.toggleLoader(false);
				})
				.catch((err) => {
					console.log(err.response.data.message);
					vm.toggleLoader(false);
					vm.$swal('Error', err.response.data.message, 'error');
				})
			},
			favShop(shop_data){
				let vm = this
				let data = {
					shop_id : shop_data._id,
					user_id : vm.userDetails._id,
					active: false,
				}
				axios.post(`/favorites`, data, vm.requestedHeaders)
				.then( async (res) => {
					console.log(res);
					if(res.data.status){
						console.log(res.data.message);
						vm.getFavorites();
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
			goToShopDetails(shop){
				let vm = this;
				vm.$router.push({ name: 'ShopInfo', params: { id: shop._id } });
			},
    },
	}
	export default Favorites
</script>