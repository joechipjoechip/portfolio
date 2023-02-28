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

    <NuxtLayout name="layout-step" :status="status" :wording="wording">

		<SlotItemList
			v-for="(dataItem, index) in props.wording.slots" :key="index"
			:data="dataItem"
			:stepIsActive="status.isActive"
		/>

    </NuxtLayout>
	
</template>