<script setup>

const props = defineProps({
	data: {
		type: Object,
		required: true
	},
	stepIsActive: {
		type: Boolean,
		required: true
	}
})

const isHovered = ref(false)

function onMouseEnter(){
	isHovered.value = true
}

function onMouseLeave(){
	isHovered.value = false

}
</script>

<template>
	<article 
		v-if="stepIsActive"
		class="step-slot-wrapper"
		:class="{
			isHovered
		}"
		@mouseenter="onMouseEnter"
		@mouseleave="onMouseLeave"
	>

		<div class="step-slot-inner">

			<div class="step-slot-head">

				<div class="year-container">

					<time 
						v-if="props.data.date.year"
						class="year-inner"
					>
						{{ props.data.date.year }}
					</time>

				</div>

				<div class="base-infos-container">

					<h5 class="title">{{ props.data.title }}</h5>

					<h5 class="location">{{ props.data.location }}</h5>

				</div>


			</div>


			<div class="step-slot-body">

				<h4 class="name">
					<span  v-html="props.data.body"></span>
				</h4>

				<div class="description">

					<p v-for="sentence in props.data.description">
						{{ sentence }}
					</p>

				</div>

			</div>

		</div>
	</article>
</template>

<style lang="scss" scoped>


.step {

	&-slot {

		&-wrapper {

			border-radius: var(--borderRadiusSmall);
			background-color: var(--bg-overlay-white-1);

			position: relative;

			&.isHovered {

				.name {
					padding-top: 2rem;
					margin: 0 0 1rem 0;
					border-radius: var(--borderRadiusSmall);
				}

				.description {
					
					height: 100%;
					background-color: var(--bg-overlay-white-1);
					border-radius: var(--borderRadiusSmall);
					padding: 1rem 0;
	
					p {
						opacity: 1;
					}

				}
			}

		}

		&-inner {
			display: flex;
			flex-flow: column nowrap;
			justify-content: space-between;
			align-items: center;
			position: relative;
			height: 100%;

			text-transform: capitalize;

		}

		&-head {
			position: absolute;
			top: 0;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: flex-start;
			width: 100%;

			.year {
				
				&-container {
					@include flex;
					flex-flow: column nowrap;
	
					border-radius: var(--borderRadiusSmall) 0 var(--borderRadiusSmall) 0;
					background-color: var(--bg-overlay-white-1);
					width: 1rem;
					height: 1rem;
					padding: 0.5rem;
				}

				&-inner {
					@include fontSmall;
					font-style: italic;
				}

			}

			.base-infos {

				&-container {
					text-align: right;
					background-color: var(--bg-overlay-white-1);
					border-radius: 0 var(--borderRadiusSmall) 0 var(--borderRadiusSmall);
					padding: 0.5rem;
					padding-bottom: 0.2rem;

					> * {
						margin: 0;
						display: block;
					}

					.title {
						@include fontSmall;
						font-style: italic;
						font-weight: 100;
					}

					.location {
						@include fontSmall;
						font-style: italic;
						font-weight: 100;
						opacity: 0.7;
					}
				}

			}

		}

		&-body {
			width: 100%;
			text-align: center;

			display: flex;
			flex-flow: column nowrap;
			justify-content: flex-end;
			height: 100%;

			.name {
				background-color: var(--bg-overlay-white-1);
				border-radius: 0;
	
				font-size: 1rem;
				letter-spacing: 1.3px;
				text-align: center;
				margin: 0;
				height: 3rem;
				padding: 0.5rem 0;

				@include flex;
				flex-direction: column;

				transition: 
					border-radius var(--transitionDurationShort),
					margin var(--transitionDurationShort),
					padding var(--transitionDurationShort);
			}

			.description {
				@include fontSmall;
				background-color: rgba(255,255,255,0.2);
				border-radius: 0 0  var(--borderRadiusSmall) var(--borderRadiusSmall);
				min-width: calc(100% - 10rem);
				width: 100%;
				align-self: center;
				height: 10%;
				max-height: 4rem;
				overflow-y: scroll;

				display: flex;
				flex-flow: column nowrap;
				justify-content: center;
				align-items: center;
				padding: 0;

				transition: 
					border-radius var(--transitionDurationMedium),
					background-color var(--transitionDurationMedium),
					height var(--transitionDurationMedium),
					padding var(--transitionDurationMedium);

				p {
					opacity: 0;
					margin: 0;
					padding: 0;
					margin-bottom: 0.25rem;

					transition: opacity var(--transitionDurationMedium);
					
				}

				
			}

		}

	}

}

</style>