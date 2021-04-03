<template>
	<div class="loader-container fixed w-full h-screen top-0 left-0 bg-loader">
		<div class="flex items-center justify-center h-full">
			<div id="loader"></div>
			<p class="text-white font-bold mt-32 text-sm">Please wait</p>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<script>
	import Loader from './function.vue'
	export default Loader
</script>