<script>
	import { Loader } from '../../components/Loader'
	import axios from 'axios'
	
	var Settings = {
		components:{
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
				formData: {},
				formErrors: [],
				errMsg: [],
				succMsg: '',
				userDetails: {},
			}
		},
		created() {
			this.getUserDetails();
		},
		methods: {
      toggleLoader(opt) {
				let vm = this
      	vm.showLoader = opt;
      },
			getUserDetails(){
				let vm = this
				vm.toggleLoader(true);
				axios.get(`/user?id=${vm.requestedHeaders.headers.Authorization}`)
					.then((res) => {
						console.log(res);
						vm.userDetails = res.data.user;
						vm.formData = vm.userDetails;
						vm.toggleLoader(false);
					})
					.catch((err) => {
						console.log(err.response.data.message);
						vm.toggleLoader(false);
						vm.$swal('Error', err.response.data.message, 'error');
					})
			},
			checkForm(formData){
				let vm = this
				vm.formErrors = [];
				vm.succMsg = '';
				vm.errMsg = [];
				let required = [
					'first_name',
					'last_name',
					'mobile',
					'email',
					'address',
					// 'password',
					// 'repassword',
				];
				let err = 0;
				required.map((key)  =>  {
					if(!formData[key]) {
						err += 1;
						vm.formErrors.push(key);
					}
				});
				if(err > 0){
					vm.errMsg.push('Please input all fields.');
				}
				if(vm.formData.email && vm.validateEmail(vm.formData.email) == false){
					vm.errMsg.push('Email invalid format');
					vm.formErrors.push('email');
					err += 1;
				}
				// if(vm.formData.password != vm.formData.repassword){
				// 	vm.errMsg.push('Password did not match.');
				// 	vm.formErrors.push('password');
				// 	vm.formErrors.push('repassword');
				// 	err += 1;
				// }
				return err > 0 ? false : true;
			},
			updateInformation() {
				let vm = this
				if(vm.checkForm(vm.formData) == false){
					return false;
				}
				
				vm.toggleLoader(true);
				let data = {
					first_name: vm.formData.first_name,
					last_name: vm.formData.last_name,
					mobile: vm.formData.mobile,
					email: vm.formData.email,
					_id: vm.userDetails._id,
					address: vm.userDetails.address
					// password: vm.formData.password,
				}
				vm.succMsg = '';
				axios.put(`/user/update`, data)
					.then((res) => {
						console.log(res);
						if(res.data.status){
							// vm.$swal('Success', res.data.message, 'success');
							vm.succMsg = res.data.message;
						}else{
							vm.errMsg.push(res.data.message);
							// vm.$swal('Error', res.data.message, 'error');
						}
						vm.toggleLoader(false);
					})
					.catch((err) => {
						console.log(err.response.data.message);
						vm.toggleLoader(false);
						vm.$swal('Error', err.response.data.message, 'error');
					})
			},
			validateEmail(email) {
				const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return re.test(String(email).toLowerCase());
			},
    }
	}
	export default Settings
</script>