<script setup>

import { useUserStore } from "@/stores/user"
const store = useUserStore()

const goodSteps = [
    {
        name: "Bio",
        component: resolveComponent('Bio')
    },
    {
        name: "Experience",
        component: resolveComponent('Experience')
    },
    {
        name: "Formation",
        component: resolveComponent('Formation')
    }
]

store.setStepsCount(goodSteps.length)


</script>

<template>
	<div class="stepper-wrapper">

		<component 
			v-for="(step, index) in goodSteps" :key="index"
			:is="step.component"
			class="component"
			:class="{
				isActive: index === store.currentStepIndex,
				isPrevious: index === store.currentStepIndex - 1,
				isNext: index === store.currentStepIndex + 1,
				isOutPrevious: store.currentStepIndex - index > 1,
				isOutNext: index - store.currentStepIndex > 1
			}"
		/>

	</div>
</template>

<style lang="scss" scoped>
.stepper {
	&-wrapper {
		position: relative;
		border: solid 2px red;
		width: 80%;
		max-width: 800px;
		margin: 0 auto;
	}
}

.component {
	width: 100%;
	position: absolute;
	top: 0;
	transform: translateX(0);
	transition: all 1s;

	&.isActive {
		z-index: 100;
		position: relative;
		background-color: pink;
	}

	&.isPrevious,
	&.isNext {
		opacity: 0.35;
		z-index: 50;
	}

	&.isPrevious {
		transform: translateX(-110%);
		background-color: grey;
	}

	&.isNext {
		transform: translateX(110%);
		background-color: tan;
	}

	&.isOutPrevious,
	&.isOutNext {
		opacity: 0;
		pointer-events: none;
	}

	&.isOutPrevious {
		transform: translateX(-120%);
	}

	&.isOutNext {
		transform: translateX(120%);
	}

}

</style>