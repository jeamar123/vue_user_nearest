<template>
	<div class="input-div py-3 px-3 w-full bg-white flex">
		<label for="" class="text-c-fade-gray font-bold text-sm w-2/12">
			{{ label }}
		</label>
		<input 
			:type="type" 
			v-model="value" 
			:placeholder="label"
			class="text-right w-10/12"
		>
	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<script>
	import FormInput from './function.vue'
	export default FormInput
</script>