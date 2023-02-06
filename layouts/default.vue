<template>
	<div class="layout-default-wrapper">

		
		<!-- <AppHeader /> -->
		
		<slot />
		<!-- <AppFooter /> -->

		<!-- et globalement, tout ce qui va venir se supersposer à l'ensemble -->

	</div>
</template>

<style lang="scss" scoped>

.layout-default-wrapper {
	border: dashed 2px green;
	margin: 0 auto;
	top: 90px;
	position: relative;
	overflow-x: hidden;
}





</style>
