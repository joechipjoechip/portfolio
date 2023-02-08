<script setup>

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