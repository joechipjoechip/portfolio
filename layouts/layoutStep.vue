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

            <div class="step-wrapper" v-show="props.status.isActive">

                <StepThreeOrnate
                    v-if="modelName"
                    :stepIsActive="props.status.isActive"
                    :modelName="props.modelName"
                    :modelTimeDecay="props.modelTimeDecay"
                    :baked="true"
                />

                <div class="step-head">

                    <h2 class="step-head-title"
                        v-if="titleIsDisplayed"
                        v-motion
                        :initial="{ x: -35, opacity: 0 }"
                        :delay="1000"
                        :enter="{ 
                            x: 0,
                            opacity: 1,

                            transition: {
                                duration: 750,
                                ease: 'backInOut'
                            }
                        }"

                    >
                        {{ props.wording.title }}
                    </h2>

                    <SearchBar class="step-head-search" 
                        :color="props.wording.color" 
                        :placeholder="props.wording.placeholder"
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

        border-radius: var(--borderRadiusMedium);
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
                    width: 40%;
                    font-weight: 100;
                    font-style: italic;
                    text-align: center;
                    text-transform: uppercase;
                    font-size: 4rem;
                    color: var(--bg-white-55);
                }

                &-search {
                    position: absolute;
                    right: 0;
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