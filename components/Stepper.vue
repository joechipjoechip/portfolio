<script setup>


import { useUserStore } from "@/stores/user"
const store = useUserStore()

const { $on } = useNuxtApp()

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

let componentState = reactive({
	isActive: false,
	isPrevious: false,
	isNext: false,
	isOutPrevious: false,
	isOutNext: false,
})


const dynamicLeft = ref("0px")
$on("update-step-positions", onPositionUpdateRequest)
$on("update-step-positions-end", onPositionUpdateRequestEnd)

const stepTab = ref([])

function onPositionUpdateRequest( diff ){

	// console.log("dans stepper : diff : ", diff

	dynamicLeft.value = `${diff * -1}px`

}

function onPositionUpdateRequestEnd(){

	dynamicLeft.value = "0px"

}

function defineDynamicClasses(index){
	componentState = reactive({
		isActive: index === store.currentStepIndex,
		isPrevious: index === store.currentStepIndex - 1,
		isNext: index === store.currentStepIndex + 1,
		isOutPrevious: store.currentStepIndex - index > 1,
		isOutNext: index - store.currentStepIndex > 1
	})

	return componentState
}





</script>

<template>
	<div class="stepper-wrapper" ref="stepperWrapper">

		<component 
			v-for="(step, index) in goodSteps" :key="index"
			ref="stepTab"
			:is="step.component"
			class="step-component"
			:data-index="index"
			:class="[
				`step-${step.name.toLowerCase()}`,
				defineDynamicClasses(index)
			]"
			:style="{ 
				left: dynamicLeft
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

.step {

	&-component {
		width: 100%;
		position: absolute;
		top: 0;
		transform: translateX(0) scale(1);
		height: 170vh;

		transition: 
			opacity 0.8s,
			transform 1s,
			left 0.3s;
	
		&.isActive {
			z-index: 100;
			position: relative;
		}
	
		&.isPrevious,
		&.isNext {
			opacity: 0.45;
			z-index: 50;
		}
	
		&.isPrevious {
			transform: translateX(-110%) scale(0.9);
		}
	
		&.isNext {
			transform: translateX(110%) scale(0.9);
		}
	
		&.isOutPrevious,
		&.isOutNext {
			opacity: 0;
			pointer-events: none;
		}
	
		&.isOutPrevious {
			transform: translateX(-120%) scale(0.7);
		}
	
		&.isOutNext {
			transform: translateX(120%) scale(0.7);
		}

	}

	&-bio {
		background-color: orange;
	}

	&-experience {
		background-color: rebeccapurple;
	}

	&-formation {
		background-color: lime;
	}

}

</style>