<template>
	<div class="settings-container w-full h-screen">
		<Loader v-if="showLoader"/>

		<p class="text-xs my-1 text-center font-bold uppercase">Contact Information</p>

		<form @submit.prevent="updateInformation()" class="h-full sm:w-96 mx-auto">
      <div class="input-div w-full bg-white flex mb-1 rounded relative" :class="{'bg-red-100' : formErrors.indexOf('firstName') != -1}">
        <label for="" class="text-gray-500 font-bold text-sm absolute top-4 left-3">
          First Name
        </label>
        <input 
          type="text" 
          v-model="formData.first_name" 
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
          v-model="formData.last_name" 
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

			<div class="input-div w-full bg-white flex mb-1 rounded relative" :class="{'bg-red-100' : formErrors.indexOf('address') != -1}">
        <label for="" class="text-gray-500 font-bold text-sm absolute top-4 left-3">
          Address
        </label>
        <textarea 
          v-model="formData.address" 
          class="text-right w-full h-full py-4 pr-3 pl-28 text-sm font-bold bg-transparent"
					style="resize: none;"
					autocomplete="none"
        >
				</textarea>
      </div>

      <!-- <div class="input-div w-full bg-white flex mb-1 rounded relative" :class="{'bg-red-100' : formErrors.indexOf('password') != -1}">
        <label for="" class="text-gray-500 font-bold text-sm absolute top-4 left-3">
          Password
        </label>
        <input 
          type="password" 
          v-model="formData.password" 
          placeholder="Password"
          class="text-right w-full h-full py-4 pr-3 pl-28 text-sm font-bold bg-transparent"
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
        >
      </div> -->

      <p v-if="succMsg != '' && succMsg" class="my-2 text-green-600 font-bold text-center">{{ succMsg }}</p>
      <p v-for="list in errMsg" :key="list.index" class="my-2 text-red-400 font-bold  text-center">{{ list }}</p>

      <button type="submit" class="btn bg-c-primary text-center mt-8 py-3 px-4 text-c-fade-blue font-bold w-full mx-auto block">Update</button>
    </form>
	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<script>
	import Settings from './function.vue'
	export default Settings
</script>