<template>
	<div class="main-container h-screen">
		<Loader v-if="showLoader"/>
		<Header 
			v-if="$route.name != 'ShopInfo'"
			:toggleSidemenu="toggleSidemenu" 
			:isSideMenuShow="isShowSideMenu" 
			:class="{'relative md:left-60 sm:left-2/4 left-2/3' : isShowSideMenu}"
		/>

		<div class="main-content">
			<Sidemenu v-if="isShowSideMenu" :toggleSidemenu="toggleSidemenu" />

			<div class="flex h-full" :class="{'relative md:left-60 sm:left-2/4 left-2/3' : isShowSideMenu}">
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