<script setup>

import { useMotion } from '@vueuse/motion'

const count = ref(0)
const targetElement = ref(null)


const { variant } = useMotion(targetElement, {
  initial: {
    scale: 1,
    opacity: 0,
	rotate: 0,
	y: 0
  },
  enter: {
    opacity: 1,
	scale: 2,
	rotate: 0,
    transition: {
		duration: 250,
		// This will go to `custom` when enter is complete.
		onComplete: () => {
			variant.value = 'customHookMaison'
			console.log("finish launch customHookMaison")
		},
		onUpdate: () => {
			console.log("update : variant.value : ", variant.value)

			count.value++
		}
    },
  },
  customHookMaison: {
    scale: 0.4,
	rotate: 2000,
	y: 300,

    transition: {
		duration: 4300,
		damping: 500,
		// type: spring,
		onComplete: () => {
			variant.value = 'suiteEtFin'
		},
    },
  },
  suiteEtFin: {
		scale: 0.9,
		rotate: 0,
		opacity: 0,
		y: 0,

		transition: {
			duration: 1700,
			
			type: 'spring',
			stiffness: 250,
			damping: 25,
			mass: 0.5,

			onComplete: () => {
				variant.value = 'enter'
				console.log("finished")

				count.value = 0
			},
		},
  },
})



</script>

<template>
	<div class="targetElement-bio" ref="targetElement">
		step bio
	</div>

	<pre>
		{{ variant }}
	</pre>
	<pre>
		{{ count }}
	</pre>
</template>

<style lang="scss" scoped>

.targetElement-bio{
	display: inline-block;
	border: solid 10px blue;
}
</style>
