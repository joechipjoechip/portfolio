<script setup>

import { useUserStore } from '@/stores/user';

const props = defineProps({
	status: {
		type: Object,
		required: true
	}
})

const store = useUserStore()

</script>

<template>
    <div class="layout-step">
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
        
            <!-- here comes : Formation.vue || Bio.vue || Experience.vue > -->
            <slot />

        </section>
    </div>
</template>

<style lang="scss" scoped>
.layout-step {

    backdrop-filter: blur(30px);
    border-radius: var(--borderRadiusMedium);
    overflow: hidden;

    
    // padding-top: 4rem;

    &-inner {
        @include glassMorph;
        
        height: 70vh;
        padding: 2rem;

        
        filter: grayscale(0) blur(0);

        transition: filter var(--transitionDurationLong);

        &.isGreyed {
            filter: grayscale(1) blur(40px);
        }

        &.bio {
            background: linear-gradient(
                            217deg, 
                            rgba(255, 255, 255, 0.419), 
                            rgba(212, 255, 0, 0.542) 70%
                        );
        }

        &.formation {
            background: linear-gradient(
                217deg, 
                #2e1d408b, 
                rgba(255, 3, 104, 0.476) 70%
            );
        }

        &.experience {
            background: linear-gradient(
                            217deg, 
                            rgba(0, 123, 255, 0.419), 
                            rgba(255, 255, 255, 0.361) 70.71%
                        );
        }

    }
}

.layout-style-test {
    border: solid 25px white;
}
</style>