<script setup>

import { useUserStore } from "@/stores/user"

const store = useUserStore()



const stepperWrapper = ref(null)

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

	// @TODO : mainntenant que j'ai cet index : 
	// allons y pour des sweet anims discrêtes pour améliorer le look&feel
	// selon quel élément est attrapé (isNext isPrevious tac tac)
	
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






// - - - CLASS LOGIC - - - -
let componentState = reactive({
	isActive: false,
	isPrevious: false,
	isNext: false,
	isOutPrevious: false,
	isOutNext: false,
})

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
// - - - - - - - - - - - -


// - - - - DYNAMIC STYLE LOGIC - - - -
const decayX = ref(110)
const decayXPositiveString = computed(() => `${decayX.value}%`)
const decayXNegativeString = computed(() => `${-decayX.value}%`)

const decayY = ref(0)
const decayYStringPrimary = computed(() => `${decayY.value / 3}%`)
const decayYStringSecondary = computed(() => `${decayY.value}%`)

const scaleRatio = ref(0.95)





</script>

<template>
	<div class="stepper-wrapper" ref="stepperWrapper">

		<component 
			v-for="(step, index) in goodSteps" :key="index"
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
		>
			<p>{{ isCurrentlyManipulatedIndex }}</p>
		</component>

	</div>
</template>

<style lang="scss" scoped>
.stepper {
	&-wrapper {
		position: relative;
		// border: solid 2px red;
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
		transform: translateX(0) translateY(0) scale(1);
		height: 170vh;

		transition: 
			opacity 0.9s,
			transform 1.2s,
			left 0.2s;
	
		&.isActive {
			z-index: 100;
			position: relative;
			transform: translateX(0) translateY(v-bind(decayYStringPrimary)) scale(1);
		}
	
		&.isPrevious,
		&.isNext {
			opacity: 0.4;
			z-index: 50;
		}
	
		&.isPrevious {
			transform: translateX(v-bind(decayXNegativeString)) translateY(v-bind(decayYStringSecondary)) scale(v-bind(scaleRatio));
		}
	
		&.isNext {
			transform: translateX(v-bind(decayXPositiveString)) translateY(v-bind(decayYStringSecondary)) scale(v-bind(scaleRatio));
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