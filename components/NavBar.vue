<script setup>


import { useUserStore } from "@/stores/user"
import { useGetEventPosition } from "@/composables/getEventPosition";

const store = useUserStore()


// - - - Navbar follow cursor when it's near - - - 
const { $on } = useNuxtApp()
$on("main-touch-move", onMainTouchMove)

const decayX = ref(0)
const decayY = ref(0)
const transformString = computed(() => `translateX(calc(-50% + ${decayX.value}px)) translateY(${decayY.value}px)`)

function onMainTouchMove( event ){

	const { x, y } = useGetEventPosition(event)

	const cursorIsBottom = (y / window.innerHeight) > 0.87
	const cursorIsCenter = (x / window.innerWidth) > 0.3 && (x / window.innerWidth) < 0.7
	const cursorIsNearNavbar = cursorIsBottom && cursorIsCenter

	if( cursorIsNearNavbar ){

		const computedX = ((x / window.innerWidth) - 0.5 )* 250

		const computedY = (y / window.innerHeight - 0.75) * -250

		decayX.value = computedX

		decayY.value = computedY

		store.setNavigationNavbarIsMoving(true)
		store.setNavigationNavbarPosition({ x: computedX, y: computedY })
		
	} else {
		
		decayX.value = 0
		
		decayY.value = 0
		
		store.setNavigationNavbarIsMoving(false)
		store.setNavigationNavbarPosition({x: 0,y: 0})

	}

}
// - - - - - - - - - - - - - - - - - - -


</script>

<template>

	<div 
		class="navbar-wrapper"
		:style="{
			transform: transformString
		}"
	>

		<IconsUiChevronLeft 
			color="mediumVioletRed"
			title="previous"
			@click="store.setBgCurrentIndexDecrement()"
		/>

		<IconsGameIconsDividedSquare
			color="orange"
			title="bio"
			:isCircular="true"
			@click="store.setCurrentStepIndex(0)"
		/>

		<IconsGameIconsStripedSun
			color="darkTurquoise"
			title="formation"
			@click="store.setCurrentStepIndex(1)"
		/>

		<IconsGameIconsMoebiusTrefoil
			color="limegreen"
			title="experience"
			:isCircular="true"
			@click="store.setCurrentStepIndex(2)"
		/>

		<IconsUiChevronRight 
			color="mediumVioletRed"
			title="next"
			@click="store.setBgCurrentIndexIncrement()"
		/>

	</div>

</template>

<style lang="scss" scoped>

	.navbar {
		&-wrapper {
			@include glassMorph;
			z-index: 250;
			position: fixed;

			bottom: 25px;
			left: 50%;
			transform: translateX(-50%);

			display: flex;
			justify-content: space-between;
			
			padding: 0.3rem;
			// letter-spacing: 2px;
			
			border-radius: var(--navbarIconBorderRadius);
			backdrop-filter: blur(15px);

			background-color: rgba(0,0,0,0.25);

			transition: padding .3s,
						transform .3s;

			&:hover {
				padding: 1rem;

				:deep(.layout-svg-navbar-wrapper){
					margin: 0 0.5rem;
				}

				:deep(.layout-svg-navbar-container) {

					svg {
						width: 50px;
						height: 50px;
					}

				}
			}

			:deep(.layout-svg-navbar-wrapper) {

				margin: 0 0.2rem;

				transition: margin .3s;

				&:first-of-type {
					margin-left: 0;
				}
				&:last-of-type {
					margin-right: 0;
				}

			}

			:deep(.layout-svg-navbar-container) {

				border-radius: var(--navbarIconBorderRadius);
				

				svg {
					width: var(--navbarIconWidth);
					height: var(--navbarIconWidth);
				}

			}

		}

	}

</style>