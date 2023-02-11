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
        
            <!-- here comes Formation.vue / Bio.vue / Experience.vue > -->
            <slot :status="status"/>

        </section>
    </div>
</template>

<style lang="scss" scoped>
.layout-step {

    
    // padding-top: 4rem;

    &-inner {
        @include glassMorph;
        border-radius: var(--borderRadiusMedium);
        
        height: 170vh;
        padding: 2rem;

        filter: grayscale(0) blur(0);

        transition: filter var(--transitionDurationLong);

        &.isGreyed {
            filter: grayscale(1) blur(40px);
        }

        &.bio {
		    background: linear-gradient(217deg, rgb(12, 64, 12), rgba(255,0,0,0) 70.71%),
                                linear-gradient(127deg, #0a1c45, rgba(79, 5, 0, 0.8) 70.71%),
                                linear-gradient(336deg, rgba(0,0,255,.8), #2e1d40 70.71%);
        }

        &.formation {
            background: linear-gradient(217deg, #2e1d40, rgb(15, 0, 82) 70.71%),
                                linear-gradient(127deg, #0a1c45, rgba(0,255,0,0) 70.71%),
                                linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,255,0,.8) 70.71%);
        }

        &.experience {
            background: linear-gradient(217deg, #1d401da4, rgb(6, 144, 182) 70.71%),
                                linear-gradient(127deg, #0a1c45, rgba(0,255,0,0) 70.71%),
                                linear-gradient(336deg, rgba(0,0,255,.8), rgba(74, 0, 158, 0.561) 70.71%);
        }

    }
}

.layout-style-test {
    border: solid 25px white;
}
</style>