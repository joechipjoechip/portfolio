<script setup>

const props = defineProps({
	status: {
		type: Object,
		required: true
	},
	wording: {
		type: Object,
		required: true
	}
})

</script>

<template>
    <NuxtLayout name="layout-step" :status="status">

        <div class="bio-wrapper">
            hey ici le component bio
            <slot />

            <p class="layout-style-test">ceci est un test de style unscoped de la part du layout</p>
        </div>

    </NuxtLayout>
</template>

<style lang="scss" scoped>

.bio {
    &-wrapper {
        //
    }
}

</style>