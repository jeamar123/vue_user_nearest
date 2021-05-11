<template>
	<div class="favorites-container w-full h-screen">
		<Loader v-if="showLoader"/>

    <div class="favorites-content-container overflow-auto">
      <div v-for="list in favoritesList" :key="list.index" class="m-2">
        <div class="bg-white p-2 flex items-center rounded">
          <div @click="goToShopDetails(list)" class="w-20 mr-3">
            <img :src="list.image || '../assets/img/noshopimage.jpg'" class="rounded w-full" alt="">
          </div>
          <div @click="goToShopDetails(list)" class="flex-1">
            <p class="font-bold mb-2 leading-none">{{ list.name }}</p>
            <p class="text-xs leading-none">{{ list.address }}</p>
          </div>
          <div class="w-14 text-c-fade-blue ">
						<svg @click="favShop(list)" xmlns="http://www.w3.org/2000/svg" class="w-8 cursor-pointer text-c-fade-blue hover:opacity-50 ml-auto" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
						</svg>
					</div>
        </div>
      </div>
    </div>
	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<script>
	import Favorites from './function.vue'
	export default Favorites
</script>