<script setup>

import { useMotion, useMotionProperties } from '@vueuse/motion'

const target = ref()

const motionInstance = useMotion(target, {
    initial: {
        opacity: 0,
        y: 100
    },
    enter: {
        opacity: 1,
        y: 0,
		transition: {
		  duration: 8000
		}
    },
})

const { motionProperties } = useMotionProperties(target)

motionProperties.opacity = 0

motionProperties.scale = 2

watch(() => motionProperties, newVal => {

	console.log("newVal : ", newVal)

})



</script>

<template>
	<div ref="target">
		step bio
	</div>

	<pre>
		{{ motionProperties }}
	</pre>
</template>

<style lang="scss" scoped>

*[ref="target"]{
	border: dotted 10px blue;
}
</style>
