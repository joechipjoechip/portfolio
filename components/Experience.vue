<script setup>

</script>

<template>
    <NuxtLayout name="step-layout">

        <div class="experience-wrapper">
            hey ici le component experience
            <slot />
        </div>
        
    </NuxtLayout>
</template>

<style lang="scss" scoped>
.experience {
    &-wrapper {
        // height: 70vh;
        
    }
}
</style>