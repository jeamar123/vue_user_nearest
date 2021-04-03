<template>
	<div class="main-container h-screen">
		<Loader v-if="showLoader"/>
		<Header />

		<div class="main-content h-full">
			<div class="flex h-full">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<script>
	import Dashboard from './function.vue'
	export default Dashboard
</script>