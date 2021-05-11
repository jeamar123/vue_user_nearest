<template>
  <div class="login-container h-screen w-full">
    <Loader v-if="loader.isShow" :message="loader.message"/>

    <Header :headerOptions="{ pageName: 'Register' }"/>

    <form @submit.prevent="register()" class="h-full lg:w-5/12 lg:mx-auto mt-5">
      <div class="input-div w-full bg-white flex mb-1 rounded relative" :class="{'bg-red-100' : formErrors.indexOf('firstName') != -1}">
        <label for="" class="text-gray-500 font-bold text-sm absolute top-4 left-3">
          First Name
        </label>
        <input 
          type="text" 
          v-model="formData.firstName" 
          placeholder="First Name"
          class="text-right w-full h-full py-4 pr-3 pl-28 text-sm font-bold bg-transparent"
          autocomplete="none"
        >
      </div>

      <div class="input-div w-full bg-white flex mb-1 rounded relative" :class="{'bg-red-100' : formErrors.indexOf('lastName') != -1}">
        <label for="" class="text-gray-500 font-bold text-sm absolute top-4 left-3">
          Last Name
        </label>
        <input 
          type="text" 
          v-model="formData.lastName" 
          placeholder="Last Name"
          class="text-right w-full h-full py-4 pr-3 pl-28 text-sm font-bold bg-transparent"
          autocomplete="none"
        >
      </div>

      <div class="input-div w-full bg-white flex mb-1 rounded relative" :class="{'bg-red-100' : formErrors.indexOf('email') != -1}">
        <label for="" class="text-gray-500 font-bold text-sm absolute top-4 left-3">
          Email
        </label>
        <input 
          type="text" 
          v-model="formData.email" 
          placeholder="Email"
          class="text-right w-full h-full py-4 pr-3 pl-28 text-sm font-bold bg-transparent"
          autocomplete="none"
        >
      </div>

      <div class="input-div w-full bg-white flex mb-1 rounded relative" :class="{'bg-red-100' : formErrors.indexOf('mobile') != -1}">
        <label for="" class="text-gray-500 font-bold text-sm absolute top-4 left-3">
          Mobile Number
        </label>
        <input 
          type="text" 
          v-model="formData.mobile" 
          placeholder="Mobile Number"
          class="text-right w-full h-full py-4 pr-3 pl-28 text-sm font-bold bg-transparent"
          autocomplete="none"
        >
      </div>

      <div class="input-div w-full bg-white flex mb-1 rounded relative" :class="{'bg-red-100' : formErrors.indexOf('password') != -1}">
        <label for="" class="text-gray-500 font-bold text-sm absolute top-4 left-3">
          Password
        </label>
        <input 
          type="password" 
          v-model="formData.password" 
          placeholder="Password"
          class="text-right w-full h-full py-4 pr-3 pl-28 text-sm font-bold bg-transparent"
          autocomplete="none"
        >
      </div>
      
      <div class="input-div w-full bg-white flex mb-1 rounded relative" :class="{'bg-red-100' : formErrors.indexOf('repassword') != -1}">
        <label for="" class="text-gray-500 font-bold text-sm absolute top-4 left-3">
          Confirm Password
        </label>
        <input 
          type="password" 
          v-model="formData.repassword" 
          placeholder="Confirm Password"
          class="text-right w-full h-full py-4 pr-3 pl-28 text-sm font-bold bg-transparent"
          autocomplete="none"
        >
      </div>

      <p v-if="succMsg != '' && succMsg" class="my-2 text-green-600 font-bold  text-center">{{ succMsg }}</p>
      <p v-for="list in errMsg" :key="list.index" class="my-2 text-red-400 font-bold  text-center">{{ list }}</p>

      <button type="submit" class="btn bg-c-primary text-center mt-8 py-3 px-4 text-c-fade-blue font-bold lg:w-full w-11/12 mx-auto block">Go</button>
    
    
      <router-link :to="{name: 'Login'}" class="underline text-center block my-4 text-xs font-bold text-gray-500">Already have an account? Login</router-link>
    </form>
  </div>
</template>

<script>
import { Loader } from '../components/Loader'
import { Header } from './Header'
import axios from 'axios'

export default {
  components: {
    Loader,
    Header
  },
  data() {
  	return {
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
  created() {
  },
  methods: {
    checkForm(formData){
      let vm = this
      vm.formErrors = [];
      vm.succMsg = '';
      vm.errMsg = [];
      let required = [
        'firstName',
        'lastName',
        'mobile',
        'email',
        'password',
        'repassword',
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
      if(vm.formData.password != vm.formData.repassword){
        vm.errMsg.push('Password did not match.');
        vm.formErrors.push('password');
        vm.formErrors.push('repassword');
        err += 1;
      }
      return err > 0 ? false : true;
    },
    register() {
      let vm = this
      if(vm.checkForm(vm.formData) == false){
        return false;
      }
      
      vm.toggleLoader(true);
      let data = {
        first_name: vm.formData.firstName,
        last_name: vm.formData.lastName,
        mobile: vm.formData.mobile,
        email: vm.formData.email,
        password: vm.formData.password,
      }
      vm.succMsg = '';
      axios.post(`/user/register`, data)
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
    toggleLoader(opt){
      let vm = this
      vm.loader.isShow = opt;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
