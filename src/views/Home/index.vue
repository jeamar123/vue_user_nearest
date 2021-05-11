<template>
	<div class="home-container w-full">
		<!-- <Loader v-if="showLoader"/> -->

		<div v-if="showLoader" class="flex justify-center pt-10">
			<InsideSpinner :options="{
				width: '40px',
				height: '40px',
				borderColor: '#999',
				borderWidth: '4px'
			}"/>
		</div>

		<div v-if="!showLoader" class="w-full mx-auto flex flex-col h-full">
		
			<div class="relative block bg-white md:h-12 h-10 md:mx-2 md:mt-2 md:mb-1 m-1 rounded border md:border-gray-300 border-gray-100">
				<svg class="md:w-6 w-4 absolute top-3 left-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
				<input type="text" class="bg-transparent w-full h-full md:pl-10 pl-8 md:text-base text-sm" placeholder="e.g Food, Cars..." v-model="searchVal">
			</div>

			<!-- <div v-if="searchVal == ''" class="my-2 mx-1 grid grid-cols-3 gap-2 h-52">
				<div v-for="(list, index) in categoriesArr " :class="{'hidden': index > 4}" :key="list.index" class="bg-white rounded p-3 border border-gray-100 flex items-center text-xs font-bold justify-center hover:opacity-50">
					<div>
						<svg class="w-10 text-gray-300 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
						</svg>
						<span class="block text-center">{{ list.name }}</span>
					</div>
				</div>
				<div class="bg-white rounded p-3 border border-gray-100 flex items-center text-xs font-bold justify-center hover:opacity-50">
					See more
				</div>
			</div> -->

			<p v-if="filteredShops.length == 0" class="font-bold text-lg mx-1 text-center">No Records found</p>

			<!-- <p v-if="filteredShops.length > 0" class="font-bold text-sm mx-1">Nearby Shops</p> -->

			<div class="shop-scroll-container xl:grid-cols-4 md:grid-cols-3 md:gap-2 sm:grid-cols-2 grid gap-1 flex-1 overflow-auto md:mx-2 md:m-2 mx-1 pb-5">

				<div 
					v-for="list in filteredShops" :key="list.index" 
					class="bg-white w-full font-bold flex flex-col hover:opacity-80 rounded mx-auto cursor-pointer md:h-64 h-80"
				>
					<div class="relative flex-1 bg-gray-900 overflow-hidden rounded-t">
						<img @click="goToShopDetails(list)" :src="list.image || '../assets/img/noshopimage.jpg'" alt="" class="rounded absolute left-0 right-0 object-cover h-full w-full">

						<div class="absolute bottom-0 right-0 p-2">
							<svg v-if="!list.isFavorite" @click="favShop(list, true)" xmlns="http://www.w3.org/2000/svg" class="w-8 text-gray-200 hover:opacity-50 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
							</svg>
							<svg v-if="list.isFavorite" @click="favShop(list, false)" xmlns="http://www.w3.org/2000/svg" class="w-8 text-gray-200 hover:opacity-50 ml-auto" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
							</svg>
						</div>
					</div>
					<div @click="goToShopDetails(list)" class="p-2">
						<div class="flex w-full mb-1">
							<div class="w-5/6">
								<p class="mb-1 flex items-center text-sm capitalize">
									{{ list.name.toLowerCase() }}
									<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
										<path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
									</svg>
								</p>

								<div v-if="list.rating_average != 0" class="flex items-center mb-1">
									<div class="mr-2 flex">
										<font-awesome-icon 
											:icon="
												list.rating_average == 0 ? ['far', 'star'] :
													list.rating_average > 0 && list.rating_average < 1 ? ['fas', 'star-half-alt'] : ['fas', 'star']
											" 
											class="text-yellow-300 text-xs" />
										<font-awesome-icon 
											:icon="
												list.rating_average <= 1 ? ['far', 'star'] :
													list.rating_average > 1 && list.rating_average < 2 ? ['fas', 'star-half-alt'] : ['fas', 'star']
											" 
											class="text-yellow-300 text-xs" />
										<font-awesome-icon 
											:icon="
												list.rating_average <= 2 ? ['far', 'star'] :
													list.rating_average > 2 && list.rating_average < 3 ? ['fas', 'star-half-alt'] : ['fas', 'star']
											" 
											class="text-yellow-300 text-xs" />
										<font-awesome-icon 
											:icon="
												list.rating_average <= 3 ? ['far', 'star'] :
													list.rating_average > 3 && list.rating_average < 4 ? ['fas', 'star-half-alt'] : ['fas', 'star']
											" 
											class="text-yellow-300 text-xs" />
										<font-awesome-icon 
											:icon="
												list.rating_average <= 4 ? ['far', 'star'] :
													list.rating_average > 4 && list.rating_average < 5 ? ['fas', 'star-half-alt'] : ['fas', 'star']
											" 
											class="text-yellow-300 text-xs" />
									</div>
									<div>
										<p class="font-bold text-gray-500 text-xxs">{{parseFloat(list.rating_average).toFixed(1)}}</p>
									</div>
								</div>
								<p v-if="list.rating_average == 0" class="italic text-gray-400 text-xxs mb-2">No Rating yet</p>

								<p class="text-gray-400 text-xxs leading-normal flex items-center">
									<!-- <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
										<path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
									</svg> -->
									{{ list.address }}
								</p>

								<span v-for="(cat, index) in list.category" :key="cat.index" class="font-thin text-xxs text-gray-400 capitalize">{{ cat }}{{ index != (list.category.length-1) ? ' . ' : '' }}</span>
							</div>
							<div class="w-1/6 text-xxs text-gray-500 text-right">
								<!-- <p>{{ list.distance_values ? list.distance_values.time.text : '' }}</p> -->
								<p>{{ list.distance ? list.distance : 'N/A' }}</p>
							</div>
						</div>
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
	import Home from './function.vue'
	export default Home
</script>