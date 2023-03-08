<template>
	<div class="layout-default-wrapper">

		
		<!-- <AppHeader /> -->
		<h1 class="name">
			Lionel
			<br>
			Orsini
			<br>
			<span>.fr</span>
		</h1>
		
		<slot />
		<!-- <AppFooter /> -->

		<!-- et globalement, tout ce qui va venir se supersposer à l'ensemble -->

	</div>
</template>

<style lang="scss" scoped>

.layout-default-wrapper {
	// border: dashed 2px green;
	margin: 0 auto;
	padding-top: 60px;
	height: calc(100vh - 60px);
	position: relative;
	overflow-x: hidden;
	overflow-y:auto;

	.name {
		position: fixed;
		top: 5rem;
		left: 5rem;
		z-index: 99;
		text-transform: uppercase;
		color: var(--bg-white-90);
		font-size: 5.3rem;
		line-height: 5.3rem;

		text-shadow: 0 0 20px rgba(0,0,0,0.2);
		
		span {
			color: var(--bg-white-40);
		}
	}
}

* {
	margin: 0;
	padding: 0;

	-webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

</style>
