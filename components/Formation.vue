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
		modelName="abstractOne"
		:modelTimeDecay="10"
		:modelIsBaked="false"
	>

		<SlotList 
			:slots="props.wording.slots"
			:stepIsActive="status.isActive"
		/>

    </NuxtLayout>
	
</template>