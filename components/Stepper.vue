<script setup>

import { useUserStore } from "@/stores/user"

const store = useUserStore()


</script>

<template>
	<div>
		Stepper

		<!-- <Transition name="animation-step"> -->
			<StepBio 
				v-if="store.currentStep === 'bio'" 
			/>
		<!-- </Transition> -->

		<!-- <Transition name="animation-step"> -->
			<div 
				v-if="store.currentStep === 'experience'"
			>

				<StepExperience />

			</div>

		<!-- </Transition> -->

		end stepper
	</div>
</template>

<style lang="scss" scoped>

</style>