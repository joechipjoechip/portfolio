<script setup>


import { useUserStore } from "@/stores/user"

const store = useUserStore()

// store.$subscribe((mutation, state) => {
// 	console.log("le subscribe : ", mutation, state.name)
// })

function handleButtonClick( destination ){
	store.setCurrentStep(destination)
}

</script>

<template>
	<div>
		ici la navbar
		<button 
			@click="handleButtonClick('bio')"
		>
			go to bio
		</button>
		<button @click="handleButtonClick('experience')">go to experience</button>
	</div>
</template>

<style lang="scss" scoped>

</style>