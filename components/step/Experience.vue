<script setup>

import { useMotion } from '@vueuse/motion'

</script>

<template>
	<div>

		<!-- <p v-motion
			:initial="{ opacity: 0, y: 100 }"
			:enter="{ opacity: 1, y: 0, scale: 1 }"
			:variants="{ custom: { scale: 2 } }"
			:hovered="{ scale: 1.2 }"
			:delay="200"
		>
			step e
			xperience
		</p> -->

		<p v-motion
			
		>
			step experience
		</p>

		<div>
			<p class="wsh" v-motion-roll-left>
				wsh
			</p>
		</div>

	</div>
</template>

<style lang="scss" scoped>
.wsh {
	display: inline-block;
	// border: solid 5px red;
}
</style>
