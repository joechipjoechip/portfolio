<script setup>

const props = defineProps({
	status: {
		type: Object,
		required: true
	}
})

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
                    'isCurrentlyManipulated': props.status.isCurrentlyManipulated
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

        &.bio {
		background-color: orange;
        }

        &.experience {
            background-color: lime;
        }

        &.formation {
            background-color: rgb(43, 43, 43);
        }
    }
}

.layout-style-test {
    border: solid 25px white;
}
</style>