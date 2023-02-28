<script setup>
import UiSearch from './icons/uiSearch.vue';

const props = defineProps({
    color: {
        type: String,
        default: "currentColor"
    }
})


</script>

<template>

	<div class="search-wrapper">

		<div class="icon">

			<UiSearch :color="props.color" />

		</div>

		<input 
			class="input"
			type="text"
			placeholder="search something"
		>

	</div>

</template>

<style lang="scss" scoped>

.search {

	&-wrapper {
		background-color: var(--bg-black-45);
		border-radius: 999px;
		backdrop-filter: blur(8px);

		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		align-items: center;
		padding: 0.25rem;

		.icon {
			z-index: 20;
			width: 3.5rem;
			height: 3.5rem;

			svg {
				display: block;
				width: 100%;
				height: 100%;
			}
		}

		.input {
			z-index: 10;
			outline: none;
			border: none;
			border-radius: 999px;
			background-color: transparent;
			
		
			color: var(--bg-white-80);
			margin-left: 0.5rem;
			padding-right: 3rem;
			
			&::placeholder {
				color: var(--bg-white-25);
			}

		}

	}

}


</style>