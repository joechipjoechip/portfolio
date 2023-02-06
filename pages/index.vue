
<script setup>

import { useUserStore } from "@/stores/user"

import { useUserInteractions } from "@/composables/userInteractions"
import { useGetEventPosition } from "@/composables/getEventPosition"

const store = useUserStore()
useUserInteractions()

// logic : detect mouse/pointer swipe actions
const { $on, $emit } = useNuxtApp()

$on("main-touch-start", onStart)
$on("main-touch-move", onMove)
$on("main-touch-end", onEnd)


const isDown = ref(false)
const positionOrigin = reactive({ x: 0, y: 0 })
const positionMoving = reactive({ x: 0, y: 0 })
const direction = ref(null)
const threshold = 400

function onStart( event ){

	const { x, y } = useGetEventPosition(event)

	positionOrigin.x = x
	positionOrigin.y = y

	isDown.value = true

}

function onMove( event ){

	if( isDown.value ){

		const { x, y } = useGetEventPosition(event)

		positionMoving.x = x
		positionMoving.y = y

		computePositionDiff()

	}
}

function onEnd( event ){

	isDown.value = false

	positionOrigin.x = 0
	positionOrigin.y = 0

	direction.value = null
	
	$emit("update-step-positions-end")

}

function computePositionDiff(){
	const diff = positionOrigin.x - positionMoving.x

	if( diff === 0 ){ return }

	direction.value = diff < 0 ? "left" : "right"
	
	if( Math.abs(diff) > threshold ){

		if( direction.value === "left" ){
			store.setCurrentStepIndexDecrement()
		} else {
			store.setCurrentStepIndexIncrement()
		}

		onEnd()

	} else {

		$emit("update-step-positions", diff)

	}

}





</script>

<template>
	<div class="index-wrapper" ref="indexWrapper">

		<p>index</p>

		<Stepper />

		<NavBar/>

	</div>
</template>

<style lang="scss" scoped>
.index {
	&-wrapper {
		position: relative;
		border: solid 5px orange;
	}
}



</style>