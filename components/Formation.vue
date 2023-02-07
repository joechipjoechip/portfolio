<script setup>

</script>

<template>
    <NuxtLayout name="step-layout">

        <div class="formation-wrapper">
            hey ici le component formation
            <slot />
        </div>
        
    </NuxtLayout>
</template>

<style lang="scss" scoped>
.formation {
    &-wrapper {
        // height: 70vh;
    }
}
</style>