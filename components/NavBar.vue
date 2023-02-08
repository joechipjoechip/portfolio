<script setup>


import { useUserStore } from "@/stores/user"
import { useGetEventPosition } from "@/composables/getEventPosition";

const store = useUserStore()

const { $on } = useNuxtApp()

$on("main-touch-move", onMainTouchMove)

const decayX = ref(0)
const decayY = ref(0)
const transformString = computed(() => `translateX(calc(-50% + ${decayX.value}px)) translateY(${decayY.value}px)`)

function onMainTouchMove( event ){

	const { x, y } = useGetEventPosition(event)

	const cursorIsBottom = (y / window.innerHeight) > 0.8
	const cursorIsCenter = (x / window.innerWidth) > 0.1 && (x / window.innerWidth) < 0.9
	const cursorIsNearNavbar = cursorIsBottom && cursorIsCenter

	if( cursorIsNearNavbar ){

		decayX.value = ((x / window.innerWidth) - 0.5 )* 200

		decayY.value = (y / window.innerHeight - 0.8) * -200

	} else {

		decayX.value = 0

		decayY.value = 0

	}

	console.log("decayY", decayY.value)

}


</script>

<template>

	<div 
		class="navbar-wrapper"
		:style="{
			transform: transformString
		}"
	>

		<IconsUiChevronLeft 
			color="#00FF00"
			title="previous"
			@click="store.setCurrentStepIndexDecrement()"
		/>

		<IconsGameIconsCrackedDisc 
			color="yellow"
			title="bio"
			@click="store.setCurrentStepIndex(2)"
		/>

		<IconsGameIconsDoubleDiaphragm 
			color="orange"
			title="formation"
			@click="store.setCurrentStepIndex(2)"
		/>

		<IconsGameIconsMoebiusTrefoil
			color="pink"
			title="experience"
			@click="store.setCurrentStepIndex(2)"
		/>

		<IconsUiChevronRight 
			color="rebeccapurple"
			title="next"
			@click="store.setCurrentStepIndexIncrement()"
		/>

	</div>

</template>

<style lang="scss" scoped>

	$iconWidth: 30px;
	$iconBorderRadius: 18px;

	.navbar {
		&-wrapper {
			z-index: 250;
			position: fixed;
			bottom: 25px;
			left: 50%;
			transform: translateX(-50%);

			display: flex;
			justify-content: space-between;
			
			padding: 1rem;
			
			border-radius: $iconBorderRadius;
			backdrop-filter: blur(5px);
			box-shadow: 0px 10px 25px rgba(0,0,0,0.2),
						inset -1px 1px 1px rgba(255,255,255,0.1);

			background-color: rgba(0,0,0,0.4);

			transition: padding .3s,
						transform .1s;

			&:hover {
				padding: 2rem;

				:deep(.layout-svg-navbar-wrapper){
					margin: 0 1.5rem;
				}

				:deep(.layout-svg-navbar-container) {

					svg {
						width: 40px;
						height: 40px;
					}

				}
			}

			:deep(.layout-svg-navbar-wrapper) {

				margin: 0 0.75rem;

				transition: margin .3s;

				&:first-of-type {
					margin-left: 0;
				}
				&:last-of-type {
					margin-right: 0;
				}

			}

			:deep(.layout-svg-navbar-container) {

				border-radius: $iconBorderRadius;
				

				svg {
					width: $iconWidth;
					height: $iconWidth;
				}

			}

		}

	}

</style>