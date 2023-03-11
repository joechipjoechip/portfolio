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
    <NuxtLayout class="layout-exception" name="layout-step" :status="status" :wording="wording">

        <div class="bio-wrapper">
            hey ici le component bio
            <slot />

            <p class="layout-style-test">ceci est un test de style unscoped de la part du layout</p>
        </div>

    </NuxtLayout>
</template>

<style lang="scss" scoped>

.layout-exception {
    opacity: 0;
}

.bio {
    &-wrapper {
        //
    }
}

</style>