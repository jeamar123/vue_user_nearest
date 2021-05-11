<script>
	import { Header } from '../Header'
	import { Sidemenu } from '../Sidemenu'
	import { Loader } from '../../components/Loader'

	import axios from 'axios'
	
	var Dashboard = {
		components:{
			Header,
			Sidemenu,
			Loader,
		},
		data() {
			return {
				requestedHeaders: {
					headers: {
						Authorization: localStorage.getItem("auth_token"),
					}
				},
				showLoader : false,
				userDetails: {},
				isShowSideMenu: false,
			}
		},
		created() {
			// this.getUserDetails();
		},
		methods: {
      toggleLoader(opt) {
				console.log(opt);
				let vm = this
      	vm.showLoader = opt;
      },
			getUserDetails(){
				let vm = this
				vm.toggleLoader(true);
				axios.get(`/user?token=${vm.requestedHeaders.headers.Authorization}`)
					.then((res) => {
						console.log(res);
						vm.userDetails = res.data;
						vm.toggleLoader(false);
					})
					.catch((err) => {
						console.log(err.response.data.message);
						vm.toggleLoader(false);
						vm.$swal('Error', err.response.data.message, 'error');
					})
			},
			toggleSidemenu(opt){
				let vm = this
				vm.isShowSideMenu = opt != undefined ? opt : (vm.isShowSideMenu ? false : true);
			}
    }
	}
	export default Dashboard
</script>