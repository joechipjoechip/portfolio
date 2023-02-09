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
	padding-top: 80px;
	position: relative;
	overflow: hidden;
}

* {
	-webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}





</style>
