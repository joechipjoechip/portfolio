<script setup>

import { useUserStore } from '@/stores/user';

const store = useUserStore()

const imagesPaths = ref([])

function currentStringIndex(index) {

    let stringIndex = new String(index)

    switch( stringIndex.length ){
        case 1:
            stringIndex = "00" + stringIndex
            break;
        case 2:
            stringIndex = "0" + stringIndex
            break;
    }

    return stringIndex

}

for (let index = 0; index < store.bgHomeCount; index++) {

    imagesPaths.value[index] = `/images/prompt/${currentStringIndex(index + 1)}.png`

}

</script>

<template>
    <div 
        v-for="(imageSrc, index) in imagesPaths" :key="imageSrc"
        class="background-container"
        :class="{ active: index === store.bgCurrentIndex }"
    >

        <img
            class="background-content"
            :src="imageSrc"
            alt=""
        />

    </div>
</template>

<style lang="scss" scoped>

.background {

    &-container {
        z-index: -1;
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;

        &.active {
            display: block;
        }

        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(130deg, rgba(255,78,78,0.08) 60%, rgba(78,106,255,0.8) 100%);
        }

        button {
            z-index: 999;
            position: absolute;
            bottom : 10px;
            left : 10px;
        }
    }

    &-content {
        object-fit: cover;
        object-position: center;
        width: 100%;
        height: 100%;
    }
}

</style>