<script setup>
</script>

<template>
    <NuxtLayout name="step-layout">

        <div class="bio-wrapper">
            hey ici le component bio
            <slot />
        </div>

    </NuxtLayout>
</template>

<style lang="scss" scoped>

.bio {
    &-wrapper {
        
    }
}

</style>