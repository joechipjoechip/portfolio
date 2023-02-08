<script setup>


import { useUserStore } from "@/stores/user"

const store = useUserStore()


</script>

<template>
	<div class="navbar-wrapper">

		<IconsUiChevronLeft 
			color="#00FF00" 
			@click="store.setCurrentStepIndexDecrement()"
		/>

		<IconsBodyBalance 
			color="#FF0000" 
			@click="store.setCurrentStepIndex(2)"
		/>

		<IconsUiChevronRight 
			color="#000000" 
			@click="store.setCurrentStepIndexIncrement()"
		/>

	</div>

</template>

<style lang="scss" scoped>

	$navbarWidth: 550px;

	$iconWidth: 40px;

	.navbar {
		&-wrapper {
			z-index: 250;
			position: fixed;
			bottom: 45px;
			width: $navbarWidth;
			padding: 15px;
			
			border-radius: 10px;
			backdrop-filter: blur(5px);
			box-shadow: 0px 10px 25px rgba(0,0,0,0.2);
			transform: translateX(calc(50vw - ($navbarWidth / 2)));

			background-color: rgba(255,255,255,0.1);

			display: flex;
			justify-content: space-between;

			.layout-svg-navbar {

				::v-deep svg {
					width: $iconWidth;
					height: $iconWidth;
				}
			}

		}

	}

</style>