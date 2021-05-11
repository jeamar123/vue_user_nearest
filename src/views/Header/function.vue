<script>
	// import axios from 'axios';

	var Header = {
		components:	{
		},
		props: {
			headerOptions: Object,
			toggleSidemenu: Function
		},
		data() {
			return {
				requestedHeaders: {
					headers: {
						Authorization: process.env.VUE_APP_AUTHORIZATION,
						'x-access-token': localStorage.getItem("auth_token")
					}
				},
				headerOpt : this.headerOptions ? this.headerOptions : {},
				routePage : 'Nearest',
				headerBtns: {
					arrowleft: false,
					arrowright: false,
					menu: false,
					settings: false,
				}
			}
		},
		created() {
			this.setPageTitle();
		},
		watch: {
    	async $route() {
				// to, from
				this.setPageTitle();
			}
		},
		methods: {
			setPageTitle(){
				let vm = this
				if(vm.$route.name == 'Settings'){
					vm.routePage = 'My Profile';
					vm.headerBtns = {
						arrowleft: true,
						arrowright: false,
						menu: false,
						settings: false,
					}
				}else if(vm.$route.name == 'Home'){
					vm.headerBtns = {
						arrowleft: false,
						arrowright: false,
						menu: true,
						settings: true,
					}
					vm.routePage = 'Nearest';
				}else if(vm.$route.name == 'Favorites'){
					vm.headerBtns = {
						arrowleft: false,
						arrowright: false,
						menu: true,
						settings: true,
					}
					vm.routePage = 'Favorites';
				}
			}
    }
	}
	export default Header
</script>