<script setup>
const props = defineProps({
    isManipulated: {
        type: Boolean,
        default: false
    },
    stepIndex: {
        type: Number,
        required: true
    }
})


watch(()=> props.isManipulated, newVal => {
    console.log("manip : ", props.stepIndex, newVal)

    // @TODO : c'est bon, la props isManipulated<Boolean> est ready
    // pour faire des trucs funs avec
})

</script>

<template>
    <div class="layout-step">
        <div class="layout-step-inner">
            <slot />
        </div>
    </div>
</template>

<style lang="scss">
.layout-step {

    border-radius: 30px;
    height: 170vh;
    // padding-top: 4rem;

    &-inner {
        padding: 2rem;
    }
}

.layout-style-test {
    border: solid 25px white;
}
</style>