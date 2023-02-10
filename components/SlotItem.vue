<script setup>

const props = defineProps({
	data: {
		type: Object,
		required: true
	}
})
</script>

<template>
	<div class="step-slot">
		item
		<pre>{{ props.data }}</pre>
	</div>
</template>

<style lang="scss" scoped>


.step {

	&-slot {
		border: solid 1px red;

		margin: 2rem 0;

		&:first-of-type {
			margin-top: 0;
		}

		&:last-of-type {
			margin-bottom: 0;
		}
	}

}

</style>