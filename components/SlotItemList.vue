<script setup>

const props = defineProps({
	data: {
		type: Object,
		required: true
	},
	stepIsActive: {
		type: Boolean,
		required: true
	},
	isExpandable: {
		type: Boolean,
		default: false
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
		
				<time class="year">
					{{ props.data.date.year }}
				</time>
		
				<time class="duration">
					{{ props.data.date.duration }}
				</time>
		
			</div>
		
		
			<div class="step-slot-body">
		
				<h5 class="title">
					{{ props.data.title }}
					<span class="location">{{ props.data.location }}</span>
				</h5>
		
				<h4 class="name">
					<span v-html="props.data.body"></span>
				</h4>
		
				<div class="description">
		
					<p v-for="sentence in props.data.description" :key="sentence.id" v-html="sentence">
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
			
			width: 100%;
			box-sizing: border-box;
			margin-top: 0;

			transition: margin-top var(--transitionDurationMedium);
			
			
			&.isHovered {

				.step-slot-inner {
					
					background-color: var(--bg-black-65);
					margin: 2rem 0;
					padding: 1rem 0;

				}

				& + .step-slot-wrapper {
					margin-top: 4rem;
				}
				

				.year {
					color: var(--bg-white-55);
				}

				.duration,
				.location {
					opacity: 1;
					transform: translateX(0) translateY(0);
				}

			}

		}

		&-inner {
			@include glassMorph;
			width: 100%;
			height: 100%;
			// position: relative;
			border-radius: 0 999px 999px 0;
			background-color: var(--bg-black-45);
			backdrop-filter: blur(15px);

			box-sizing: border-box;

			margin: 0;
			padding: 0;
			
			transition: 
				background-color var(--transitionDurationShort),
				margin var(--transitionDurationLong),
				padding var(--transitionDurationMedium);
		}

		&-head {
			position: absolute;
			top: 0.8rem;
			left: 0;
			margin-left: 4.1rem;

			display: flex;
			flex-flow: row nowrap;
			justify-content: flex-start;
			align-items: center;

			.year,
			.duration {
				font-style: italic;
				font-weight: 300;
				color: var(--bg-white-45);
				
				transition: color var(--transitionDurationMedium);
			}
			
			.duration {
				font-style: normal;
				opacity: 0;
				margin-left: 1rem;
				transform: translateX(2rem);

				transition: 
					opacity var(--transitionDurationLong),
					transform var(--transitionDurationLong);
			}

		

		}

		&-body {
			text-align: center;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;

			width: calc(100% - 9rem);
			height: 100%;
			padding-left: 7rem;

			.title {
				position: relative;
				font-weight: 300;
				font-size: 2rem;
				width: 35%;
				text-align: left;
				text-transform: capitalize;
			}

			.location {
				position: absolute;
				top: 2.25rem;
				left: 0;
				font-size: 1.3rem;
				color: var(--bg-white-45);

				opacity: 0;
				transform: translateY(1rem);

				transition: 
					opacity var(--transitionDurationMedium),
					transform var(--transitionDurationMedium);
			}
			
			.name {
				width: 25%;
				font-size: 1.5rem;
				font-weight: bold;
				text-transform: uppercase;
				text-align: right;
				line-height: 2rem;
				color: var(--bg-white-100);
				border-radius: 999px var(--borderRadiusSmallest) var(--borderRadiusSmallest) 999px;
				padding-right: 2rem;
			}
			
			.description {
				font-size: 1.25rem;
				width: 40%;
				font-weight: 300;
				text-align: left;
				line-height: 0.75rem;
				border-radius: var(--borderRadiusSmallest) 999px 999px var(--borderRadiusSmallest);
				margin-left: 2rem;
				
				p {
					color: var(--bg-white-70);
					margin-top: 0;
					margin-left: 2rem;
					margin-bottom: 1rem;
					
					&:last-of-type {
						margin-bottom: 0;
					}
				}
			}

			.name,
			.description {
				@include glassMorph;
				background-color: var(--bg-black-25);
				height: calc(100% - 2.5rem);
				display: flex;
				flex-flow: column nowrap;
				justify-content: center;
			}

		}

	}

}

</style>