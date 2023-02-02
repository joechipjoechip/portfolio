<script setup>

import { useUserStore } from "@/stores/index"

const store = useUserStore()


</script>

<template>
	<div class="first-container">

		<p>
			from first, le store user.name est : {{ store.name }}
		</p>

		<button @click="store.changeName('julia')">change to julia</button>
		
		<button @click="store.changeName('rebecca')">change to Rebecca</button>


	</div>
</template>

<style lang="scss" scoped>
.first-container {
	border: solid 5px rebeccapurple;
}
</style>
