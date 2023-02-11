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