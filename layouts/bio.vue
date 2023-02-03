<template>
	<div class="layout-bio-wrapper">
		<!-- <AppHeader /> -->
		<slot />
		<!-- <AppFooter /> -->
		<div class="dummy-left" ref="dummyElementLeft"></div>
		<div class="dummy-right" ref="dummyElementRight"></div>
	</div>
</template>

<style lang="scss" scoped>

.layout-bio-wrapper {
	border: dashed 20px lime;
	margin: 0 auto;
	width: 80%;
	max-width: 500px;
	top: 90px;
	position: relative;

	.dummy {

		&-left,
		&-right {
			border: solid 20px rebeccapurple;
			position: absolute;
			width: 100px;
			height: 100px;
			top: 140px;
		}

		&-left {
			left: -50px;
		}

		&-right {
			right: -50px;
		}

	}

}



</style>
