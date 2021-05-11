<template>
	<div class="shop-container w-full h-screen md:flex">
		<Loader v-if="showLoader"/>

		<div class="flex flex-col h-full md:border-r-2 xl:w-1/3 md:w-1/2 w-full">
			<div 
				class="h-1/2 w-full relative" 
				:style="{
					'background-image' : shopDetails.image ? `url(${shopDetails.image})` : `url('../assets/img/noshopimage.jpg')`,
					'background-size' : 'cover',
					'background-position' : 'top center',
				}">
				<div class="absolute top-0 left-0 w-full h-full bg-gray-500 opacity-20 z-10"></div>
				<div class="flex w-full h-14 items-center z-50 relative">
					<div class="w-1/2 px-4 text-c-fade-blue">
						<svg 
							@click="$router.go(-1)"
							class="w-8 text-white hover:opacity-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
						</svg>
					</div>
					<div class="w-1/2 px-4 text-c-fade-blue ">
						<svg v-if="!shopDetails.isFavorite" @click="favShop(shopDetails, true)" xmlns="http://www.w3.org/2000/svg" class="w-8 cursor-pointer text-white hover:opacity-50 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
						</svg>
						<svg v-if="shopDetails.isFavorite" @click="favShop(shopDetails, false)" xmlns="http://www.w3.org/2000/svg" class="w-8 cursor-pointer text-white hover:opacity-50 ml-auto" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
						</svg>
					</div>
				</div>
				
				<div class="absolute bottom-0 w-full z-50 px-4 py-3 bg-gray-800 opacity-70">
					<div class="flex items-center w-full text-white">
						<div class="w-2/3">
							<p class="text-2xl font-bold">{{ shopDetails.name }}</p>
						</div>
						<div class="w-1/3 text-right font-bold">
							<p class="mb-3">{{ shopDetails.distance }}</p>
							<p>{{ shopDetails.time }}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="h-1/2 flex flex-col">
				<div class="flex bg-c-primary border-b border-c-primary px-2">
					<div @click="selectTab('info')" class="uppercase text-c-fade-blue text-xxs font-bold text-center cursor-pointer">
						<span class="px-4 py-4 block" :class="{'border-b-2 border-gray-300' : selectedTab == 'info'}">Information</span>
					</div>
					<div @click="selectTab('map')" class="uppercase text-c-fade-blue text-xxs font-bold text-center cursor-pointer md:hidden">
						<span class="px-4 py-4 block" :class="{'border-b-2 border-gray-300' : selectedTab == 'map'}">Directions</span>
					</div>
				</div>

				<!-- Shop Details -->
				<div v-if="selectedTab == 'info'" class="shop-details-container flex-1 pt-4 pb-14 px-4 overflow-auto">
					<!-- <div class="flex items-center w-full">
						<div class="w-2/3">
							<p class="text-2xl font-bold">{{ shopDetails.name }}</p>
						</div>
						<div class="w-1/3 text-right font-bold">{{ shopDetails.distance }}</div>
					</div> -->

					<p class="mb-4 text-lg text-gray-500 font-semibold">{{ shopDetails.address }}</p>
					
					<div class="mb-3">
						<div v-if="shopDetails.rating_average != 0" class="flex items-center">
							<div class="mr-3">
								<font-awesome-icon 
									:icon="
										shopDetails.rating_average == 0 ? ['far', 'star'] :
											shopDetails.rating_average > 0 && shopDetails.rating_average < 1 ? ['fas', 'star-half-alt'] : ['fas', 'star']
									" 
									class="text-yellow-300" />
								<font-awesome-icon 
									:icon="
										shopDetails.rating_average <= 1 ? ['far', 'star'] :
											shopDetails.rating_average > 1 && shopDetails.rating_average < 2 ? ['fas', 'star-half-alt'] : ['fas', 'star']
									" 
									class="text-yellow-300" />
								<font-awesome-icon 
									:icon="
										shopDetails.rating_average <= 2 ? ['far', 'star'] :
											shopDetails.rating_average > 2 && shopDetails.rating_average < 3 ? ['fas', 'star-half-alt'] : ['fas', 'star']
									" 
									class="text-yellow-300" />
								<font-awesome-icon 
									:icon="
										shopDetails.rating_average <= 3 ? ['far', 'star'] :
											shopDetails.rating_average > 3 && shopDetails.rating_average < 4 ? ['fas', 'star-half-alt'] : ['fas', 'star']
									" 
									class="text-yellow-300" />
								<font-awesome-icon 
									:icon="
										shopDetails.rating_average <= 4 ? ['far', 'star'] :
											shopDetails.rating_average > 4 && shopDetails.rating_average < 5 ? ['fas', 'star-half-alt'] : ['fas', 'star']
									" 
									class="text-yellow-300" />
							</div>
							<div>
								<p class="font-bold text-gray-500 text-sm">{{parseFloat(shopDetails.rating_average).toFixed(1)}}</p>
							</div>
						</div>
						<p v-if="shopDetails.rating_average == 0" class="italic">No Rating yet</p>
					</div>

					<div class="mb-3">
						<span v-for="(cat, index) in shopDetails.category" :key="cat.index" class="font-thin text-sm text-gray-400 capitalize">{{ cat }}{{ index != (shopDetails.category.length-1) ? ' . ' : '' }}</span>
					</div>

					<p class="text-xl font-bold mb-3">Business Hours</p>

					<div v-for="(list, index) in shopDetails.business_hours" :key="list.index" class="flex font-bold mb-2 text-gray-500 text-sm">
						<div class="w-1/2 capitalize">
							{{ index }}
						</div>
						<div class="w-1/2">
							<span v-if="list.active">{{ list.start }} - {{ list.end }}</span>
							<span v-else>Closed</span>
						</div>
					</div>
					
				</div>

				<!-- Google Map Directions -->
				<div id="mob-map-container" class="flex-1 overflow-auto" hidden>
					<!-- <div id="map" class="w-full h-full"></div> -->
				</div>

				<div class="flex p-2">
					<button @click="goToWebsite()" class="btn bg-c-primary flex items-center justify-center flex-1 text-gray-200 font-bold rounded mx-1 py-2 text-sm">
						<svg xmlns="http://www.w3.org/2000/svg" class="w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
						</svg>
						Website
					</button>
					<button @click="callShop()" class="btn bg-c-primary flex items-center justify-center flex-1 text-gray-200 font-bold rounded mx-1 py-2 text-sm">
						<svg xmlns="http://www.w3.org/2000/svg" class="w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
						</svg>
						Call
					</button>
				</div>
			</div>
		</div>

		<div id="web-map-container" class="flex-1 h-full"></div>
	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<script>
	import ShopInfo from './function.vue'
	export default ShopInfo
</script>