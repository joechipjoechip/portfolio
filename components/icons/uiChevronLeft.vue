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

        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path :fill="color" d="m8.288 12l6.01 6.01l1.414-1.414l-4.6-4.6l4.6-4.6l-1.414-1.406L8.288 12Z"></path></svg>

    </NuxtLayout>

</template>