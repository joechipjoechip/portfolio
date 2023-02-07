<script setup>

</script>

<template>
    <div class="step-layout">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.step-layout {
    border: dashed 35px red;

    border-radius: 60px;
    padding: 2rem;
}
</style>