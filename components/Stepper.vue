<script setup>

import { stepsWording } from "@/assets/wording/steps"

import { useUserStore } from "@/stores/user"

const store = useUserStore()



const stepperWrapper = ref(null)

const goodSteps = [
	{
		name: "Bio",
        component: resolveComponent('Bio')
    },
	{
		name: "Formation",
        component: resolveComponent('Formation')
    },
    {
		name: "Experience",
        component: resolveComponent('Experience')
    }
]

store.setStepsCount(goodSteps.length)


// - - BASIC CLICK LOGIC - - -
function onMouseDown( index ){

	if( store.currentStepIndex !== index ){
		store.setCurrentStepIndex(index)
	}
}

function onMouseUp( event, index ){

	if( store.currentStepIndex !== index ){
		event.preventDefault()
	}

}
// - - - - - - - - - - - 



// - - - - TOUCH LOGIC - - - -
const isCurrentlyManipulatedIndex = ref(0)
const dynamicLeft = ref("0px")

const { $on } = useNuxtApp()

$on("update-step-positions", onTouchMove)
$on("update-step-positions-start", onTouchStart)
$on("update-step-positions-end", onTouchEnd)

function onTouchStart( event ){

	decayX.value *= 0.9

	decayY.value = -5

	isCurrentlyManipulatedIndex.value = parseInt(event.target.dataset.index)
	
}

function onTouchEnd(){
	
	isCurrentlyManipulatedIndex.value = false

	decayX.value = 110

	decayY.value = 0
	
	dynamicLeft.value = "0px"

}

function onTouchMove( diffsObj ){

	dynamicLeft.value = `${diffsObj.diffX * -1}px`

	decayY.value = diffsObj.diffY / -10

}
// - - - - - - - - - - - - -






// - - - COMPONENT STATUS / CLASS LOGIC - - - -
let componentStatus = reactive({
	isActive: false,
	isPrevious: false,
	isNext: false,
	isOutPrevious: false,
	isOutNext: false,
	isCurrentlyManipulated: false
})

function defineDynamicStatus(index){

	componentStatus = reactive({
		name: goodSteps[index].name?.toLowerCase(),
		isActive: index === store.currentStepIndex,
		isPrevious: index === store.currentStepIndex - 1,
		isNext: index === store.currentStepIndex + 1,
		isOutPrevious: store.currentStepIndex - index > 1,
		isOutNext: index - store.currentStepIndex > 1,
		isCurrentlyManipulated: isCurrentlyManipulatedIndex.value === index
	})

	return componentStatus
}
// - - - - - - - - - - - -


// - - - - DYNAMIC STYLE LOGIC - - - -
const decayX = ref(110)
const decayXPositiveString = computed(() => `${decayX.value}%`)
const decayXNegativeString = computed(() => `${-decayX.value}%`)

const decayY = ref(0)
const decayYMax = 10
const decayYStringPrimary = computed(() => `${Math.min(decayY.value, decayYMax) / 3}%`)
const decayYStringSecondary = computed(() => `${Math.min(decayY.value, decayYMax)}%`)

const scaleRatio = ref(0.9)

</script>

<template>
	<div class="stepper-wrapper" ref="stepperWrapper">

		<component 
			v-for="(step, index) in goodSteps" :key="index"
			:is="step.component"
			
			class="step-item"
			:class="[
				`step-${step.name.toLowerCase()}`,
				defineDynamicStatus(index)
			]"

			@mousedown="onMouseDown(index)"
			@mouseup="onMouseUp($event, index)"

			:data-index="index"
			:status="defineDynamicStatus(index)"
			:wording="stepsWording[defineDynamicStatus(index).name]"

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
		width: 70%;
		max-width: 800px;
		margin: 0 auto;
		border-radius: 60px;
		// border: solid 2px red;

		// color: white;
	}
}

.step {

	&-item {
		width: 100%;
		// overflow: hidden;
		position: absolute;
		top: 0;
		transform: translateX(0) translateY(0) scale(1);
		

		transition: 
			opacity 1.2s,
			transform 0.6s,
			left 0.6s;
	
		&.isActive {
			z-index: 100;
			position: relative;
			transform: translateX(0) translateY(v-bind(decayYStringPrimary)) scale(1);
		}
	
		&.isPrevious,
		&.isNext {
			opacity: 0.4;
			z-index: 50;

			&:hover {
				opacity: 0.9;
			}
		}
	
		&.isPrevious {
			transform: translateX(v-bind(decayXNegativeString)) translateY(v-bind(decayYStringSecondary)) scale(v-bind(scaleRatio));
			
			&:hover {
				transform: translateX(v-bind(decayXNegativeString)) translateY(v-bind(decayYStringSecondary)) scale(0.97);
			}
		}
	
		&.isNext {
			transform: translateX(v-bind(decayXPositiveString)) translateY(v-bind(decayYStringSecondary)) scale(v-bind(scaleRatio));
			
			&:hover {
				transform: translateX(v-bind(decayXPositiveString)) translateY(v-bind(decayYStringSecondary)) scale(0.97);
			}
		}
	
		&.isOutPrevious,
		&.isOutNext {
			opacity: 0;
			pointer-events: none;
		}
	
		&.isOutPrevious {
			transform: translateX(-70%) scale(0.75);
		}
	
		&.isOutNext {
			transform: translateX(70%) scale(0.75);
		}

	}

}

</style>