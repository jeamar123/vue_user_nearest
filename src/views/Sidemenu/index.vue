<template>
	<div class="fixed top-0 left-0 z-50 h-full w-full flex ">
		<div class="sidemenu-container md:w-60 sm:w-2/4 w-2/3 bg-white">
			<div class="bg-c-primary h-14 w-full"></div>
			<div class="sidemenu-items px-3 py-3 overflow-y-auto">
				<router-link 
					:to="{ name: 'Home'}" 
					class="p-2 mb-2 rounded font-bold cursor-pointer text-sm block"
					:class="{'bg-gray-200 ' : $route.name == 'Home' || $route.name == 'Dashboard'}"
					@click.native="toggleSidemenu(false)"
				>
					Home
				</router-link>
				<router-link 
					:to="{ name: 'Favorites'}" 
					class="p-2 mb-2 rounded font-bold cursor-pointer text-sm block"
					:class="{'bg-gray-200 ' : $route.name == 'Favorites'}"
					@click.native="toggleSidemenu(false)"
				>
					Favorites
				</router-link>
				<router-link 
					:to="{ name: 'Settings'}" 
					class="p-2 mb-2 rounded font-bold cursor-pointer text-sm block"
					:class="{'bg-gray-200 ' : $route.name == 'Settings'}"
					@click.native="toggleSidemenu(false)"
				>
					Settings
				</router-link>
				<a class="p-2 mb-2 rounded font-bold cursor-pointer text-sm block" @click="logout(false)">Logout</a>
			</div>
		</div>
		<div class="bg-black bg-opacity-40 flex-1" @click="toggleSidemenu(false)"></div>
	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<script>
	import Sidemenu from './function.vue'
	export default Sidemenu
</script>