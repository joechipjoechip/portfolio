<script setup>


import { useUserStore } from "@/stores/user"

const store = useUserStore()


</script>

<template>
	<div class="navbar-wrapper">

		<IconsUiChevronLeft 
			color="#000000" 
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

$navbarWidth: 250px;
$navbarHeight: 80px;

$iconWidth: 40px;

.navbar {
	&-wrapper {
		z-index: 250;
		position: fixed;
		bottom: 45px;
		width: $navbarWidth;
		height: $navbarHeight;
		padding: 15px;
		
		border-radius: 10px;
		backdrop-filter: blur(5px);
		box-shadow: 0px 10px 25px rgba(0,0,0,0.2);
		transform: translateX(calc(50vw - ($navbarWidth / 2)));

		display: flex;
		justify-content: center;
		align-items: center;

		svg {
			height: $iconWidth;
			width: $iconWidth;

			background-color: rgba(255,255,255,0.15);
			box-shadow: 0px 10px 25px rgba(0,0,0,0.2);
			border-radius: 5px;
			margin: 0 5px;
			padding: 10px;

			&:first-of-type {
				margin-left: 0;
			}

			&:last-of-type {
				margin-right: 0;
			}
		}
	}
}

</style>