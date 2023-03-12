<script setup>

const props = defineProps({
	status: {
		type: Object,
		required: true
	},
	wording: {
		type: Object,
		required: true
	}
})

</script>

<template>

    <NuxtLayout name="layout-step" 
		:status="status" 
		:wording="wording" 
		modelName="abstractThree"
		:modelTimeDecay="8"
	>

		<SlotList 
			:slots="props.wording.slots"
			:stepIsActive="status.isActive"
		/>

    </NuxtLayout>
	
</template>