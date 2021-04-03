<script>
	// import axios from 'axios';

	var Header = {
		components:	{
		},
		props: {
			headerOptions: Object
		},
		data() {
			return {
				requestedHeaders: {
					headers: {
						Authorization: process.env.VUE_APP_AUTHORIZATION,
						'x-access-token': localStorage.getItem("auth_token")
					}
				},
				headerOpt : this.headerOptions ? this.headerOptions : {}
			}
		},
		created() {
		},
		methods: {
			
    }
	}
	export default Header
</script>