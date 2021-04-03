<template>
	<div class="header-container bg-c-primary h-14 w-full">
		<div class="flex w-full h-full items-center">
			<div class="w-2/12 px-4 text-c-fade-blue">
				<svg 
					v-if="headerOpt.pageName != 'Login' && headerOpt.pageName != 'Register'" 
					class="w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</div>
			<div class="w-8/12 text-center text-lg text-c-fade-blue font-bold">
				{{ headerOpt.pageName ? headerOpt.pageName : 'Nearest' }}
			</div>
			<div class="w-2/12 px-4 text-right text-c-fade-blue">
				<svg 
					v-if="headerOpt.pageName != 'Login' && headerOpt.pageName != 'Register'" 
					class="w-8 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
				</svg>
			</div>
		</div>

	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<script>
	import Header from './function.vue'
	export default Header
</script>