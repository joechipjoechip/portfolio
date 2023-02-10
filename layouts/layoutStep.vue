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
        <div 
            class="layout-step-inner"
            :class="[
                props.status.name.toLowerCase(),
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
            <pre>{{ props.status }}</pre>
            <slot />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.layout-step {

    border-radius: 30px;
    // padding-top: 4rem;

    &-inner {
        height: 170vh;
        padding: 2rem;

        &.bio {
		background-color: orange;
        }

        &.experience {
            background-color: rgb(33, 5, 62);
        }

        &.formation {
            background-color: lime;
        }
    }
}

.layout-style-test {
    border: solid 25px white;
}
</style>