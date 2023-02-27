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

const orderedSlots = computed(() => {
	return props.wording.slots.sort((a,b) => {
		return b.date.year - a.date.year
	})
})

console.log("le bon wording ? : ", props.wording)


</script>

<template>
    <NuxtLayout name="layout-step" :status="status" :wording="wording">

		<div class="formation-wrapper">

			<SlotItemFormation
				v-for="(dataItem, index) in orderedSlots" :key="index"
				:data="dataItem"
				:stepIsActive="status.isActive"
			/>

		</div>

    </NuxtLayout>
</template>

<style lang="scss" scoped>

.formation {

	&-wrapper {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		row-gap: 6rem;
		// max-width: 750px;
		margin: 0 auto;

		> * {
			width: 100%;
			// width: calc(50% - 1.5rem);
			// flex-basis: 40%;
		}
	}

}

</style>