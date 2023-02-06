<script setup>


import { useUserStore } from "@/stores/user"

const store = useUserStore()


</script>

<template>
	<div class="navbar-wrapper">

		<button @click="store.setCurrentStepIndexDecrement()">
			go -
		</button>
	
		<button @click="store.setCurrentStepIndexIncrement()">
			go +
		</button>

	</div>

</template>

<style lang="scss" scoped>

$navbarHeight: 250px;

.navbar {
	&-wrapper {
		z-index: 250;
		position: fixed;
		bottom: 45px;
		width: $navbarHeight;
		
		border: solid 5px red;
		transform: translateX(calc(50vw - ($navbarHeight / 2)));

		display: flex;
		justify-content: center;
		align-items: center;
	}
}

</style>