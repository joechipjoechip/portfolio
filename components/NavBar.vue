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
		<button @click="store.setCurrentStepIndexDecrement()">
			go -
		</button>
		
		<button @click="store.setCurrentStepIndexIncrement()">
			go +
		</button>


	</div>
</template>

<style lang="scss" scoped>

</style>