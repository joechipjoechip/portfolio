
<script setup>

import { useUserStore } from "@/stores/index"

const store = useUserStore()

store.$subscribe((mutation, state) => {
	console.log("le subscribe : ", mutation, state.name)
})

function handleChangeName( event ){
	console.log("data set name : ", event.target.dataset.name)

	store.changeName(event.target.dataset.name)
}

</script>

<template>
	<div class="index-wrapper">
		<p>
			hello w, le store user.name est : {{ store.name }}
		</p>

		<button 
			@click="handleChangeName"
			data-name="tomy"
		>
			change to tomy
		</button>

		<button 
			@click="handleChangeName"
			data-name="Jack"
		>
			change to Jack
		</button>

		<first-component />

	</div>
</template>

<style lang="scss" scoped>
.index-wrapper {
	border: solid 5px orange;
}
</style>