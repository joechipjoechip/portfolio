<script setup>
import UiSearch from './icons/uiSearch.vue';

const props = defineProps({
    color: {
        type: String,
        default: "currentColor"
    },
    placeholder: {
        type: String,
        default: "search somthing"
    }
})


</script>

<template>

	<div class="search-wrapper">

		<div class="icon">
			<div class="icon-bg"></div>
			<UiSearch :color="props.color" />

		</div>

		<input 
			class="input"
			type="text"
			:placeholder="props.placeholder"
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
			position: relative;
			z-index: 20;
			width: 3.5rem;
			height: 3.5rem;

			&-bg {
				width: 60%;
				height: 60%;
				display: block;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translateY(-50%) translateX(-50%);
				border-radius: 50%;

				background-color: var(--bg-white-100);
			}

			svg {
				display: block;
				width: 100%;
				height: 100%;
				position: relative;
			}

		}

		.input {
			font-size: 1.25rem;
			z-index: 10;
			outline: none;
			border: none;
			border-radius: 999px;
			background-color: transparent;
			
		
			color: var(--bg-white-80);
			margin-left: 0.5rem;
			padding-right: 3rem;

			&::first-letter {
				margin-left: 1rem;
			}
			
			&::placeholder {
				color: var(--bg-white-25);
			}

		}


	}

}


</style>