<script setup>

</script>

<template>
    <NuxtLayout name="layout-step">

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