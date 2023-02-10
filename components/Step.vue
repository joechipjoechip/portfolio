<script setup>

import { stepsWording } from "@/assets/wording/steps"

const props = defineProps({
	stepInfos: {
		type: Object,
		required: true
	}
})

const wording = stepsWording[props.stepInfos.name]


</script>

<template>
	<div class="step-wrapper">

		<div class="step-head">

			<h2 class="step-head-title">
				{{ props.stepInfos.name }}
			</h2>

			<h3 class="step-head-catcher">
				{{ wording.catcher }}
			</h3>

		</div>

		<div class="step-body">

			<!-- component slotFormation -->
			<SlotItem 
				v-for="(dataItem, index) in wording.slots" :key="index"
				:data="dataItem"
				:stepInfos="stepInfos"
			/>

		</div>

		<div class="step-footer">

		</div>

	</div>
</template>

<style lang="scss" scoped>

.step {

	&-head {
		// border: solid 1px white;
		padding: 40px 0;
		margin-bottom: 20px;
		background-color: rgba(0,0,0,0.4);

		& > * {
			margin: 0;
		}

		&-title {
			text-align: center;
			text-transform: capitalize;
			letter-spacing: 2px;
			font-weight: 100;
			font-size: 2rem;
		}

		&-catcher {
			text-align: center;
			font-size: 0.75rem;
			font-style: italic;
			font-weight: 100;
		}
	}

	&-body {
		// border: solid 1px lime;
		//
	}

	&-footer {
		border: solid 1px orange;
		//
	}

}

</style>