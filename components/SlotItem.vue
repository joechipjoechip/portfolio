<script setup>

defineProps({
	data: {
		type: Object,
		required: true
	},
	stepInfos: {
		type: Object,
		required: true
	}
})

</script>

<template>
	<article 
		v-if="stepInfos.isActive"
		class="step-slot-wrapper"
	>
		<div class="step-slot-inner">

			<time class="year">{{ data.date.year }}</time>
			<h5 class="title">{{ data.title }}</h5>
			<h4 class="subtitle">{{ data.subtitle }}</h4>

		</div>
	</article>
</template>

<style lang="scss" scoped>


.step {

	&-slot {

		&-wrapper {

			border: solid 1px red;
			padding: 20px;
			margin: 2rem 0;

			border-radius: var(--borderRadiusMedium);
	
			&:first-of-type {
				margin-top: 0;
			}
	
			&:last-of-type {
				margin-bottom: 0;
			}


		}

		&-inner {
			border: solid 1px orange;

			> * {
				margin: 0;
			}

			.year {

			}
		}
	}

}

</style>