<template>
  <div class="login-container h-screen w-full">
    <Loader v-if="loader.isShow" :message="loader.message"/>

    <Header :headerOptions="{ pageName: 'Login' }"/>

    <form @submit.prevent="login()" class="h-full md:w-5/12 md:mx-auto px-2">

      <div class="img-container">
        <svg class="w-3/12 my-5 mx-auto text-c-fade-gray" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
        </svg>
      </div>

      <div class="input-div w-full bg-white flex mb-1 relative rounded" :class="{'bg-red-100' : formErrors.indexOf('email') != -1}">
        <input 
          type="text" 
          v-model="formData.email" 
          placeholder="Email"
          class="w-full h-full py-4 pr-3 pl-3 font-bold text-sm bg-transparent"
          autocomplete="none"
        >
      </div>

      <div class="input-div w-full bg-white flex mb-1 relative rounded" :class="{'bg-red-100' : formErrors.indexOf('password') != -1}">
        <input 
          type="password" 
          v-model="formData.password" 
          placeholder="Password"
          class="w-full h-full py-4 pr-3 pl-3 font-bold text-sm bg-transparent"
          autocomplete="none"
        >
      </div>

      <p v-for="list in errMsg" :key="list" class="my-2 text-red-400 font-bold text-center">{{ list }}</p>

      <button type="submit" class="btn bg-c-primary text-center mt-8 py-3 px-4 text-c-fade-blue font-bold w-full mx-auto block">Go</button>
    </form>
  </div>
</template>

<script>
import { Loader } from '../components/Loader'
import { Header } from './Header'
// import axios from 'axios'

export default {
  components: {
    Loader,
    Header
  },
  data() {
  	return {
      requestedHeaders: {
        headers: {
          Authorization: process.env.VUE_APP_AUTHORIZATION,
          'x-access-token': localStorage.getItem("auth_token")
        }
      },
      loader:	{
        isShow: false,
        message: 'Loading',
      },
      formData: {},
      formErrors: [],
      errMsg: [],
      succMsg: '',
  	}
  },
  mounted() {
    
  },
  methods: {
    checkForm(formData){
      let vm = this
      vm.formErrors = [];
      vm.errMsg = [];
      let required = [
        'email',
        'password',
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
      return err > 0 ? false : true;
    },
    login() {
      let vm = this

      if(vm.checkForm(vm.formData) == false){
        return false;
      }
      vm.toggleLoader(true);
      let redirect = vm.$auth.redirect()
      vm.$auth
        .login({
          data: vm.formData, 
          rememberMe: true,
          redirect: redirect,
          fetchUser: false,
          headers: {
            // 'Authorization': process.env.VUE_APP_AUTHORIZATION,
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          console.log(res);
          if(res.data.status){
            vm.$router.push({ name: 'Home' });
          }else{
            vm.errMsg.push(res.data.message);
          }
          vm.toggleLoader(false);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          vm.toggleLoader(false);
          vm.$swal('Error', err.response.data.message, 'error');
        })
    },
    toggleLoader(opt){
      let vm = this
      vm.loader.isShow = opt;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
