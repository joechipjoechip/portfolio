<script setup>

</script>

<template>
    <div class="step-layout">
        <div class="step-layout-inner">
            <slot />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.step-layout {

    border-radius: 60px;
    height: 170vh;
    // padding-top: 4rem;

    &-inner {
        padding: 2rem;
    }
}
</style>