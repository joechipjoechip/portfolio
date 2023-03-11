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
        :soundEnabled="store.sound.enabled"

        v-motion
        :initial="{ 
            y: 500,
            scale: 0.001,
        }"
        :enter="{ 
            y: 0,
            scale: 1,

            transition: {
                duration: store.animation.config.long,
                ease: 'backInOut',
            }
        }"
    />

</template>

<style lang="scss" scoped>
.list {
    width: 100%;
    padding-top: 15rem;

    box-sizing: border-box;
}
</style>