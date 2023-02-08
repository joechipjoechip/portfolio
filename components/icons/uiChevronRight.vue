<script setup>
defineProps({
    color: {
        type: String,
        default: "currentColor"
    }
})
</script>

<template>

    <NuxtLayout name="layout-svg-navbar" :color="color">

        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path :fill="color" d="m15.713 12l-6.01-6.01l-1.415 1.414l4.6 4.6l-4.6 4.593l1.414 1.414L15.713 12Z"></path></svg>

    </NuxtLayout>

</template>
