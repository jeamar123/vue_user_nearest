<script>
	// import axios from 'axios'
	var Sidemenu = {
		props:	{
			toggleSidemenu: Function,
		},
		data() {
			return {
				requestedHeaders: {
					headers: {
						Authorization: localStorage.getItem("auth_token"),
					}
				},
			}
		},
		async created() {
		},
		methods: {
			logout(){
				this.$swal({
					title: 'Confirm!',
					text: 'Are you sure you want to logout?',
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Yes',
					cancelButtonText: 'No',
				})
				.then((res)	=>	{
					console.log(res);
					if(res.value){
						this.toggleSidemenu(false);
						this.$auth.logout({
							success() {},
							error() {},
							redirect: "/login"
						});
					}
				});
			},
    }
	}
	export default Sidemenu
</script>