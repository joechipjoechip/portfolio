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
})

const store = useUserStore()

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

        <div class="step-wrapper">

            <div class="step-head">

                <h2 class="step-head-title">
                    {{ props.wording.title }}
                </h2>

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
        
            }
        
            &-body {
                @include scrollbar;
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