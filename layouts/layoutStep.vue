<script setup>

import { useUserStore } from '@/stores/user';

const props = defineProps({
	status: {
		type: Object,
		required: true
	},
	wording: {
		type: Object,
		required: true
	},
    modelName: {
        type: String,
        required: false
    },
    modelTimeDecay: {
        type: Number,
        default: 10
    },
    modelIsBaked: {
        type: Boolean,
        default: false
    }
})

const store = useUserStore()

const titleIsDisplayed = computed(() => props.status.isActive)

</script>

<template>
    <div class="layout-step-wrapper">
        <section 
            class="layout-step-inner"
            :class="[
                props.status.name,
                {
                    'isActive': props.status.isActive,
                    'isPrevious': props.status.isPrevious,
                    'isNext': props.status.isNext,
                    'isOutPrevious': props.status.isOutPrevious,
                    'isOutNext': props.status.isOutNext,
                    'isCurrentlyManipulated': props.status.isCurrentlyManipulated,

                    'isGreyed': store.navigation.navbar.isMoving
                }
            ]"
        >

            <div
                class="step-wrapper"
                v-show="props.status.isActive"
            >

                <StepThreeOrnate
                    v-if="modelName"
                    :stepIsActive="props.status.isActive"
                    :modelName="props.modelName"
                    :modelTimeDecay="props.modelTimeDecay"
                    :isBaked="props.modelIsBaked"
                />

                <div class="step-head">

                    <h2 class="step-head-title"
                        v-if="titleIsDisplayed"
                        v-motion
                        :initial="{ y: 335, opacity: 0 }"
                        :delay="1100"
                        :enter="{ 
                            y: 0,
                            opacity: 1,

                            transition: {
                                duration: 650,
                                ease: 'backInOut'
                            }
                        }"

                    >
                        {{ props.wording.title }}
                    </h2>

                    <SearchBar class="step-head-search" 
                        v-if="titleIsDisplayed"
                        :color="props.wording.color" 
                        :placeholder="props.wording.placeholder"

                        v-motion
                        :initial="{ 
                            y: 480,
                            opacity: 0
                        }"
                        :enter="{ 
                            y: 0,
                            opacity: 1,

                            transition: {
                                duration: 650,
                                delay: 1400,
                                ease: 'backInOut'
                            }
                        }"
                    />

                </div>

                <div class="step-body">
                    
                    <!-- here comes : Formation.vue || Bio.vue || Experience.vue > -->
                    <slot />

                </div>

                <div class="step-footer">
                    <!--  -->
                </div>

            </div>
        

        </section>
    </div>
</template>

<style lang="scss" scoped>

.layout-step {

    &-wrapper {

        border-radius: var(--borderRadiusBig);
        overflow: hidden;
    
        :deep(.step-slot-wrapper){
    
            &:first-of-type {
                margin-top: 0.25rem;
            }
        
            &:last-of-type {
                margin-bottom: 2rem;
            }
        }

    }


    &-inner {
        position: relative;
        height: 100%;
        padding: 0 2rem 0 0;

        background: linear-gradient(
                                217deg, 
                                rgba(255, 255, 255, 0), 
                                rgba(255, 255, 255, 0) 70%
                            );

        transition: background 2s;

        .step {
        
            &-wrapper {
                position: relative;
                height: 100%;
            }
        
            &-head {
                z-index: 30;
                margin-bottom: .75rem;
                height: 10%;
                display: flex;
                flex-flow: column nowrap;
                justify-content: center;
                align-items: center;
                
                & > * {
                    margin: 0;
                }
                
                &-title {
                    // width: 40%;
                    font-weight: 100;
                    font-style: italic;
                    text-align: center;
                    text-transform: uppercase;
                    font-size: 2.7rem;
                    color: var(--bg-white-55);

                    background-color: var(--bg-black-45);
                    padding: 0.5rem 3rem;
                    border-radius: 999px;
                    backdrop-filter: blur(8px);
                }

                &-search {
                    position: absolute;
                    right: 0;
                    margin-right: calc(2rem + var(--scrollbar-width));
                }
        
            }
        
            &-body {
                z-index: 20;
                @include scrollbar;
                // position: relative;
                height: 90%;
                overflow-y: scroll;
                padding-right: 2rem;
        
                display: flex;
                flex-flow: row wrap;
                row-gap: 0.65rem;
            }
        
            &-footer {
                // border: solid 1px orange;
                //
            }
        
        }

    }

}


</style>