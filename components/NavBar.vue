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
			color="yellow" 
			@click="store.setCurrentStepIndex(2)"
		/>

		<IconsUiChevronRight 
			color="rebeccapurple" 
			@click="store.setCurrentStepIndexIncrement()"
		/>

	</div>

</template>

<style lang="scss" scoped>

	$navbarWidth: 350px;

	$iconWidth: 40px;
	$iconBorderRadius: 18px;

	.navbar {
		&-wrapper {
			z-index: 250;
			position: fixed;
			bottom: 45px;
			width: $navbarWidth;
			padding: 15px;
			
			border-radius: $iconBorderRadius;
			backdrop-filter: blur(5px);
			box-shadow: 0px 10px 25px rgba(0,0,0,0.2);
			transform: translateX(calc(50vw - ($navbarWidth / 2)));

			background-color: rgba(0,0,0,0.4);

			display: flex;
			justify-content: space-between;

			.layout-svg-navbar {

				border-radius: $iconBorderRadius;

				:deep(svg) {
					width: $iconWidth;
					height: $iconWidth;
				}
			}

		}

	}

</style>