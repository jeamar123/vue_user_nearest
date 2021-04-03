<script>
	import axios from 'axios'
	var Sidemenu = {
		data() {
			return {
				requestedHeaders: {
					headers: {
						Authorization: process.env.VUE_APP_AUTHORIZATION,
						'x-access-token': localStorage.getItem("auth_token")
					}
				},
				isShowUserChildMenu: false,
				isShowLimitChildMenu: false,
				pendingUsersCount: 0,
				pendingLimitUsersCount: 0,
			}
		},
		async created() {
			let vm = this
			this.initializeShowHideListener();
			console.log(vm.$route.name);
			if(vm.$route.name == 'Users'){
				vm.pendingUsersCount = await this.getUserStatusCount(1); /* Get Pending Users Count */
			}
			if(vm.$route.name == 'Change Limit'){
				vm.pendingLimitUsersCount = await this.getLimitStatusCount(0); /* Get Pending Users Count */
			}

			vm.$on('refreshData', vm.refreshData() );
		},
		methods: {
			async refreshData(){
				console.log('refresh');
				let vm = this
				console.log(vm.$route.name);
				if(vm.$route.name == 'Users'){
					vm.pendingUsersCount = await this.getUserStatusCount(1); /* Get Pending Users Count */
				}
				if(vm.$route.name == 'Change Limit'){
					vm.pendingLimitUsersCount = await this.getLimitStatusCount(0); /* Get Pending Users Count */
				}
			},
			toggleLoader(opt, msg){ /* Toggle Parent Loader */
				let vm = this
				vm.$parent.toggleLoader(opt, msg);
			},
			/*
			 * For ShowHide Toggle Event Listeners
			 */
      async initializeShowHideListener()	{
				let vm = this
				document.addEventListener("click",async function(e){
					// if(vm.isShowUserChildMenu){
					// 	var parentMatchUser = await vm.checkParentMatch(e, 'sidemenu-user-toggle');
					// 	vm.isShowUserChildMenu = parentMatchUser;
					// }
					if(vm.isShowLimitChildMenu){
						var parentMatchLimit = await vm.checkParentMatch(e, 'sidemenu-limit-toggle');
						vm.isShowLimitChildMenu = parentMatchLimit;
					}
				});
			},
			async checkParentMatch(e, parentClass)	{
				var el = e.target;
				var parentSelector = document.getElementsByClassName(parentClass)[0];
				if (parentSelector === undefined) {
					parentSelector = document;
				}
				var p = el.parentNode;
				var parentMatch = false;
				if(p == parentSelector){
					parentMatch = true;
				}else{
					while (p !== parentSelector) {
						var o = p;
						if(o == null){
							break;
						}
						p = o.parentNode;
						if(p == parentSelector){
							parentMatch = true;
						}
					}
				}
				return parentMatch;
			},
			toggleDrop(opt){
				let vm = this
				vm.isShowUserChildMenu = opt == 'users' ? (vm.isShowUserChildMenu ? false : true) : false;
				vm.isShowLimitChildMenu = opt == 'users' ? (vm.isShowLimitChildMenu ? false : true) : false;
			},
			async getUserStatusCount(status){
				let vm = this
				try {
					let url = `/api/users?skip=0&limit=10000`;
					if(status != null){
						url += `&status=${status}`;
					}
					let totalRows = await axios.get(url, vm.requestedHeaders)
					// console.log(totalRows);
					return totalRows.data.total;
				} catch (err) {
					console.log(err);
					this.$swal('Error!', err ,'error')
					vm.toggleLoader(false);
				}
			},
			async getLimitStatusCount(status){
				let vm = this
				try {
					let url = `/api/users/getuserupdatecredit?skip=0&limit=10000`
					if(status != null){
						url += `&status=${status}`;
					}
					let totalRows = await axios.get(url, vm.requestedHeaders)
					// console.log(totalRows);
					return totalRows.data.total;
				} catch (err) {
					console.log(err);
					this.$swal('Error!', err ,'error')
					vm.toggleLoader(false);
				}
			},
    }
	}
	export default Sidemenu
</script>