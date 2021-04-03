<script>
	import { Header } from '../Header'
	import { Sidemenu } from '../Sidemenu'
	import { Loader } from '../../components/Loader'
	
	var Dashboard = {
		components:{
			Header,
			Sidemenu,
			Loader,
		},
		data() {
			return {
				showLoader : false,
			}
		},
		created() {
		},
		methods: {
      showLoading() {
      	this.showLoader = true;
      },
      hideLoading() {
				this.showLoader = false;
      },
    }
	}
	export default Dashboard
</script>