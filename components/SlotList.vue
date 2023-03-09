<script setup>

import { useUserStore } from '@/stores/user';

const store = useUserStore()

const props = defineProps({
	slots: {
		type: Object,
		required: true
	},

    stepIsActive: {
        type: Boolean,
        required: true
    }
})

</script>

<template>

    <SlotItem
        v-for="(dataItem, index) in props.slots" :key="index"
        :data="dataItem"
        :stepIsActive="stepIsActive"
        :slotIndex="index"
        :animationConfig="store.animation.config"
    />

</template>