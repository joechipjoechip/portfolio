
<script setup>

import { useUserStore } from "@/stores/user"

import { useUserInteractions } from "@/composables/userInteractions"
import { useGetEventPosition } from "@/composables/getEventPosition"

const store = useUserStore()
useUserInteractions()

// logic : detect mouse/pointer swipe actions
const { $on, $emit } = useNuxtApp()

$on("main-touch-start", onMainTouchStart)
$on("main-touch-move", onMainTouchMove)
$on("main-touch-end", onMainTouchEnd)


const isDown = ref(false)
const positionOrigin = reactive({ x: 0, y: 0 })
const positionMoving = reactive({ x: 0, y: 0 })
const direction = ref(null)
const threshold = 0.35

function onMainTouchStart( event ){

	const { x, y } = useGetEventPosition(event)

	positionOrigin.x = x
	positionOrigin.y = y

	isDown.value = true

	$emit("update-step-positions-start", event)

}

function onMainTouchEnd( event ){

	isDown.value = false

	positionOrigin.x = 0
	positionOrigin.y = 0

	direction.value = null

	$emit("update-step-positions-end")

}

function onMainTouchMove( event ){

	if( isDown.value ){

		const { x, y } = useGetEventPosition(event)

		positionMoving.x = x
		positionMoving.y = y

		computePositionDiff()

	}
}

watch(isDown, newVal => {
	store.navigation.setStepGrabbed = newVal
})



function computePositionDiff(){
	const diffX = positionOrigin.x - positionMoving.x
	const diffY = positionOrigin.y - positionMoving.y

	if( diffX === 0 ){ return }

	direction.value = diffX < 0 ? "left" : "right"
	
	if( Math.abs(diffX / window.innerWidth) < threshold ){

		$emit("update-step-positions", { diffX, diffY })

	} else {
		
		if( direction.value === "left" ){
			store.setCurrentStepIndexDecrement()
		} else {
			store.setCurrentStepIndexIncrement()
		}

		onMainTouchEnd()
		
	}

}





</script>

<template>
	<div class="index-wrapper" ref="indexWrapper">

		<!-- <Kaleidoscope /> -->

		<Stepper />

		<NavBar/>

	</div>
</template>

<style lang="scss" scoped>
.index {
	&-wrapper {
		position: relative;
	}
}



</style>