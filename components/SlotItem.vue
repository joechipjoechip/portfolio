<script setup>

import { random } from "@/assets/js/utils.js"

const props = defineProps({
	data: {
		type: Object,
		required: true
	},
	animationConfig: {
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
	},
	slotIndex: {
		type: Number,
		required: true
	}
})


// - - - - - - - - - - - - - 
// BASIC LOGIC - - - - -
const isHovered = ref(false)

function onMouseEnter(){
	isHovered.value = true
}

function onMouseLeave(){
	isHovered.value = false
}
// - - - - - - - - - - - - - 




// - - - - - - - - - - - - - 
// ANIMATION LOGIC - - - - -
const speed = ref(0.2)
const idealDelay = computed(() => props.animationConfig.short * props.slotIndex)
const isPair = ref(props.slotIndex % 2 === 0)

const animationsAreFinished = ref(false)
const isVisible = computed(() => animationsAreFinished.value && props.stepIsActive)

function handleInnerComplete(){
	console.log("complete triggered - - - - - - - ")
	animationsAreFinished.value = true
}

function handleStart(){
	console.log("start triggered - - - - - - - ")

	createSound()

	setTimeout(() => {
		
		playSound()
	
	}, idealDelay.value)
	
}

// - - - - - - - - - - - - - 





// - - - - - - - - - - - - - 
// SOUND LOGIC - - - - -
const soundTypes = ["synth", "laserShoot"]
const sound = ref()

function createSound(){

	const forgedSoundOptions = {
		"oldParams": true,
		"wave_type": 1,
		"p_env_attack": 0,
		"p_env_sustain": 0.106,
		"p_env_punch": 0.02169253542627644,
		"p_env_decay": 0.6224005654145803,
		"p_base_freq": 0.312,
		"p_freq_limit": 0,
		"p_freq_ramp": -0.12371676533548343,
		"p_freq_dramp": 0.7881488219954658,
		"p_vib_strength": 0.007838497625868867,
		"p_vib_speed": -0.1720389707774026,
		"p_arp_mod": 0.10556844719355096,
		"p_arp_speed": 0.5281848848135842,
		"p_duty": -0.2553719256156919,
		"p_duty_ramp": 0.05653564786890511,
		"p_repeat_speed": 0,
		"p_pha_offset": 0.21837455263952593,
		"p_pha_ramp": -0.020158793844971545,
		"p_lpf_freq": 0.04316895631061235,
		"p_lpf_ramp": 0.10032919647346196,
		"p_lpf_resonance": 0,
		"p_hpf_freq": 0.028011702230671846,
		"p_hpf_ramp": -0.3411499172388156,
		"sound_vol": 0.25,
		"sample_rate": 44100,
		"sample_size": 8
	}

	forgedSoundOptions.p_base_freq = random(0.35, 0.95)
	forgedSoundOptions.sound_vol = random(0.4, 0.7)

	try {
		sound.value = sfxr.toAudio(forgedSoundOptions);
	}
	catch{
		console.log("jsfxr is not well loaded")
	}
	
	
}

function playSound(){
	
	try {
		sound.value.play();
	}
	catch {
		console.log("jsfxr is not well loaded, so no sound to .play()")
	}

}

watch(isHovered, newVal => {

	if( newVal ){

		createSound()
		playSound()

	}
	
})

// - - - - - - - - - - - - -

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

		<div class="step-slot-inner"
			:class="{ isVisible }"
			v-motion
			:initial="{ 
				opacity: 0,
				y:  800 * speed,
			}"
			:delay="idealDelay"
			:enter="{ 
				opacity: 1,
				y: 0,

				transition: {
					duration: props.animationConfig.medium,
					onPlay: handleStart,
					onComplete: handleInnerComplete,
					ease: 'easeInOut'
				},
			}"
		>
			
			<div class="step-slot-head"
				v-motion
				:initial="{ x: -300 * speed }"
				:delay="idealDelay"
				:enter="{ 
					x: 0,

					transition: {
						duration: props.animationConfig.long
					}
				}"
			>
		
				<time class="year">
					{{ props.data.date.year }}
				</time>
		
				<time class="duration">
					{{ props.data.date.duration }}
				</time>
		
			</div>
		
		
			<div class="step-slot-body"
				v-motion
				:initial="{ y: !isPair ? 300 * speed : 600 * speed }"
				:delay="idealDelay"
				:enter="{ 
					y: 0,

					transition: {
						duration: props.animationConfig.long
					}
				}"
			>
		
				<h5 class="title"
					v-motion
					:initial="{ 
						x: random(-4000, -800) * speed,
						opacity: 0.2
					}"
					:enter="{ 
						x: 0,
						opacity: 1,

						transition: {
							duration: props.animationConfig.long,
							delay: idealDelay + 100,
							ease: 'backInOut'
						}
					}"
				>
					{{ props.data.title }}
					<span class="location">{{ props.data.location }}</span>
				</h5>
		
				<h4 class="name">
					<span 
						v-html="props.data.body"

						v-motion
						:initial="{ 
							y: 300,
							opacity: 0
						}"
						:delay="idealDelay * 0.7"

						:enter="{ 
							y: 0,
							opacity: 1,

							transition: {
								duration: props.animationConfig.long * 1.7,
								ease: 'backInOut'
							}
						}"
					></span>
				</h4>
		
				<div class="description">
		
					<p v-for="sentence in props.data.description" :key="sentence.id" 
						v-html="sentence"

						v-motion
						:initial="{ 
							y: random(400, 800),
							opacity: 0
						}"
						:delay="idealDelay"
						:enter="{ 
							y: 0,
							opacity: 1,

							transition: {
								duration: props.animationConfig.long * 1.5,
								ease: 'backInOut'
							}
						}"
					></p>
		
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

			will-change: margin-top;

			transition: margin-top var(--transitionDurationMedium);
			
			&.isHovered {

				.step-slot-inner {
					
					background-color: var(--bg-black-85);
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
			backdrop-filter: blur(0px);
			border-radius: 0 999px 999px 0;
			background-color: var(--bg-black-55);
			

			box-sizing: border-box;

			margin: 0;
			padding: 0;

			// will-change: backdrop-filter, background-color, margin, padding;
			
			transition: 
				backdrop-filter 8s,
				background-color var(--transitionDurationMedium),
				margin var(--transitionDurationLong),
				padding var(--transitionDurationMedium);

			&.isVisible {
				backdrop-filter: blur(10px);
			}

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

				span {
					display: block;
				}
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