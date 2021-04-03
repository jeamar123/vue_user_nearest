<template>
	<div 
		class="spinner-container"
	>
		<div 
			class="spinner"
			:class="[options.class]"
			:style="{
				'border-width': options.borderWidth ? options.borderWidth : '3px',
				'border-left-color': options.borderColor ? options.borderColor : '#393c8e',
				'border-top-color': options.borderColor ? options.borderColor : '#393c8e',
				'width': options.width ? options.width : '24px',
				'height': options.height ? options.height : '24px',
			}"
		></div>
	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<script>
	import InsideSpinner from './function.vue'
	export default InsideSpinner
</script>