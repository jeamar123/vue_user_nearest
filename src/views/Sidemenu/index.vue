<template>
	<div class="sidemenu-container w-64 py-4 h-full shadow-lg bg-sidemenuColor">
		<div class="logo-wrapper h-10 mb-5 px-4">
			<router-link active-class="bg-transparent" :to="{ name: 'Users', params: { status: 'all' } }" >
				<img :src="'../assets/img/EmpatKali_Logo.png'" alt="" class="h-full">
			</router-link>
		</div>
		<div class="mb-8 px-4">
			<p class="text-md"><span class="font-bold">Verification</span> Dashboard</p>
		</div>

		<div class="sidemenu-items px-4 pb-4 overflow-y-auto">

			<!-- <router-link 
				:to="{ name: 'Home'}" 
				class="w-full rounded-xl inline-block mb-2"
				v-bind:class="{
					'bg-sidemenuActiveColor' : $route.name == 'Home'
				}"
			>
				<div class="menu-item flex items-center px-4 py-5 cursor-pointer rounded-xl">
					<div class="icon-container w-7 mr-3">
						<img :src="'../assets/img/dashboard.png'" class="w-full" alt="">
					</div>
					<div class="flex-1">
						<p class="text-md ff-medium font-bold">Dashboard</p>
					</div>
				</div>
			</router-link> -->

			<div 
				class="menu-item-w-child sidemenu-user-toggle rounded-xl mb-2"
				v-bind:class="{
					'bg-sidemenuChildBgColor' : isShowUserChildMenu 
				}"
			>
				<!-- <router-link 
					:to="{ name: 'Users', params: { status: 'all' } }" 
					class="w-full rounded-xl inline-block"
					v-bind:class="{
						'bg-sidemenuActiveColor' : $route.name == 'Users'
					}"
				> -->
				<div 
					class="w-full rounded-xl inline-block"
					v-bind:class="{
						'bg-sidemenuActiveColor' : isShowUserChildMenu || $route.name == 'Users'
					}"
					@click="toggleDrop('users')"
				>
					<div class="menu-item flex items-center px-4 py-5 cursor-pointer rounded-xl">
						<div class="icon-container w-7 mr-3">
							<img :src="'../assets/img/users.png'" class="w-full" alt="">
						</div>
						<div class="flex-1">
							<p class="text-md ff-medium font-bold">Users</p>
						</div>
						<div class="flex-1 text-center">
							<svg v-if="!isShowUserChildMenu" xmlns="http://www.w3.org/2000/svg" class="w-4 text-gray-400 inline-block"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
							</svg>

							<svg v-if="isShowUserChildMenu" xmlns="http://www.w3.org/2000/svg" class="w-4 text-gray-400 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
							</svg>
						</div>
					</div>
				</div>
				<!-- </router-link> -->

				<div v-if="isShowUserChildMenu" class="menu-child-items pt-2">
					<router-link :to="{ name: 'Users', params: { status: 'all' } }" >
						<div class="child-item px-4 pt-4 pb-6 rounded mb-1 cursor-pointer">
							<p class="text-md ff-medium font-bold" v-bind:class="{ 'text-sidemenuTextActiveColor' : $route.params.status == 'all' }">All Users</p>
						</div>
					</router-link>
					<router-link :to="{ name: 'Users', params: { status: 'active' } }" >
						<div class="child-item px-4 pt-4 pb-6 rounded mb-1 cursor-pointer">
							<p class="text-md ff-medium font-bold" v-bind:class="{ 'text-sidemenuTextActiveColor' : $route.params.status == 'active' }">Active</p>
						</div>
					</router-link>
					<router-link :to="{ name: 'Users', params: { status: 'pending' } }" >
						<div class="child-item px-4 pt-4 pb-6 rounded mb-1 cursor-pointer flex items-center">
							<p class="text-md ff-medium font-bold flex-1" v-bind:class="{ 'text-sidemenuTextActiveColor' : $route.params.status == 'pending' }">Pending</p>

							<div class="flex-none">
								<div 
									class="count-badge rounded-2xl px-4 py-2 inline-block font-bold text-xxs ml-3 bg-v-status-pending text-white"
								>
									{{ pendingUsersCount }}
								</div>
							</div>
						</div>
					</router-link>
					<router-link :to="{ name: 'Users', params: { status: 'incomplete' } }" >
						<div class="child-item px-4 pt-4 pb-6 rounded mb-1 cursor-pointer">
							<p class="text-md ff-medium font-bold" v-bind:class="{ 'text-sidemenuTextActiveColor' : $route.params.status == 'incomplete' }">Incomplete</p>
						</div>
					</router-link>
					<router-link :to="{ name: 'Users', params: { status: 'banned' } }" >
						<div class="child-item px-4 pt-4 pb-6 rounded mb-1 cursor-pointer">
							<p class="text-md ff-medium font-bold" v-bind:class="{ 'text-sidemenuTextActiveColor' : $route.params.status == 'banned' }">Banned</p>
						</div>
					</router-link>
					<router-link :to="{ name: 'Users', params: { status: 'freeze' } }" >
						<div class="child-item px-4 pt-4 pb-6 rounded mb-1 cursor-pointer">
							<p class="text-md ff-medium font-bold" v-bind:class="{ 'text-sidemenuTextActiveColor' : $route.params.status == 'freeze' }">Freeze</p>
						</div>
					</router-link>
					<router-link :to="{ name: 'Users', params: { status: 'approved' } }" >
						<div class="child-item px-4 pt-4 pb-6 rounded mb-1 cursor-pointer">
							<p class="text-md ff-medium font-bold" v-bind:class="{ 'text-sidemenuTextActiveColor' : $route.params.status == 'approved' }">Approved</p>
						</div>
					</router-link>
					<router-link :to="{ name: 'Users', params: { status: 'rejected' } }" >
						<div class="child-item px-4 pt-4 pb-6 rounded mb-1 cursor-pointer">
							<p class="text-md ff-medium font-bold" v-bind:class="{ 'text-sidemenuTextActiveColor' : $route.params.status == 'rejected' }">Rejected</p>
						</div>
					</router-link>
				</div>
			</div>

			<div 
				class="menu-item-w-child sidemenu-limit-toggle rounded-xl mb-2"
				v-bind:class="{
					'bg-sidemenuChildBgColor' : $route.name == 'Change Limit'
				}"
			>
				<router-link 
					:to="{ name: 'Change Limit', params: { status: 'pending' } }" 
					class="w-full rounded-xl inline-block"
					v-bind:class="{
						'bg-sidemenuActiveColor' : $route.name == 'Change Limit'
					}"
				>
					<div class="menu-item flex items-center px-4 py-5">
						<div class="icon-container w-7 mr-3">
							<img :src="'../assets/img/change-limit.png'" class="w-full" alt="">
						</div>
						<div class="flex-1">
							<p class="text-md ff-medium font-bold" v-bind:class="{'text-sidemenuTextActiveColor' : $route.name == 'Change Limit'}">Change Limit</p>
						</div>
					</div>
				</router-link>

				<div v-if="$route.name == 'Change Limit'" class="menu-child-items pt-2">
					<router-link :to="{ name: 'Change Limit', params: { status: 'all' } }" >
						<div class="child-item px-4 pt-4 pb-6 rounded mb-1 cursor-pointer">
							<p class="text-md ff-medium font-bold" v-bind:class="{ 'text-sidemenuTextActiveColor' : $route.params.status == 'all' }">All Request</p>
						</div>
					</router-link>
					<router-link :to="{ name: 'Change Limit', params: { status: 'pending' } }" >
						<div class="child-item px-4 pt-2 pb-6 rounded mb-1 cursor-pointer flex items-center">
							<p class="text-md ff-medium font-bold flex-1"  v-bind:class="{ 'text-sidemenuTextActiveColor' : $route.params.status == 'pending' }">Pending</p>
							<div class="flex-none">
								<div 
									class="count-badge rounded-2xl px-4 py-2 inline-block font-bold text-xxs ml-3 bg-v-status-pending text-white"
								>
									{{ pendingLimitUsersCount }}
								</div>
							</div>
						</div>
					</router-link>
					<router-link :to="{ name: 'Change Limit', params: { status: 'approved' } }" >
						<div class="child-item px-4 pt-2 pb-6 rounded mb-1 cursor-pointer">
							<p class="text-md ff-medium font-bold" v-bind:class="{ 'text-sidemenuTextActiveColor' : $route.params.status == 'approved' }">Approved</p>
						</div>
					</router-link>
					<router-link :to="{ name: 'Change Limit', params: { status: 'rejected' } }" >
						<div class="child-item px-4 pt-2 pb-6 rounded mb-1 cursor-pointer">
							<p class="text-md ff-medium font-bold" v-bind:class="{ 'text-sidemenuTextActiveColor' : $route.params.status == 'rejected' }">Rejected</p>
						</div>
					</router-link>
				</div>
			</div>

			<!-- <router-link 
				:to="{ name: 'Messages'}" 
				class="w-full rounded-xl inline-block mb-2"
				v-bind:class="{
					'bg-sidemenuActiveColor' : $route.name == 'Messages'
				}"
			>
				<div class="menu-item flex items-center px-4 py-5">
					<div class="icon-container w-7 mr-3">
						<img :src="'../assets/img/messages.png'" class="w-full" alt="">
					</div>
					<div class="flex-1">
						<p class="text-md ff-medium font-bold">Messages</p>
					</div>
				</div>
			</router-link> -->

			<router-link 
				:to="{ name: 'Settings'}" 
				class="w-full rounded-xl inline-block mb-2"
				v-bind:class="{
					'bg-sidemenuActiveColor' : $route.name == 'Email Template'
				}"
			>
				<div class="menu-item flex items-center px-4 py-5">
					<div class="icon-container w-7 mr-3">
						<img :src="'../assets/img/settings.png'" class="w-full" alt="">
					</div>
					<div class="flex-1">
						<p class="text-md ff-medium font-bold">Settings</p>
					</div>
				</div>
			</router-link>

		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<script>
	import Sidemenu from './function.vue'
	export default Sidemenu
</script>