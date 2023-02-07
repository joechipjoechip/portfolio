<script setup>

</script>

<template>
    <div class="step-layout">
        <div class="step-layout-inner">
            <slot />
        </div>
    </div>
</template>

<style lang="scss">
.step-layout {

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