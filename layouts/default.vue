<template>
	<div class="layout-default-wrapper">
		<!-- <AppHeader /> -->
		<slot />
		<!-- <AppFooter /> -->

		<!-- ici la nav -->

		<!-- et globalement, tout ce qui va venir se supersposer à l'ensemble -->

		<NavBar />
	</div>
</template>

<style lang="scss" scoped>

.layout-default-wrapper {
	border: solid 20px green;
	margin: 0 auto;
	width: 80%;
	max-width: 500px;
	top: 90px;
	position: relative;

}



</style>
