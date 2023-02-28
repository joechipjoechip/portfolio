<script setup>

import { useUserStore } from '@/stores/user';

const store = useUserStore()

</script>

<template>
    <div class="background-container">
        <img v-if="store.bgCurrentIndex === 0" class="background-content" src="./../assets/images/promptart/001.png" alt="">
        <img v-if="store.bgCurrentIndex === 1" class="background-content" src="./../assets/images/promptart/002.png" alt="">
        <img v-if="store.bgCurrentIndex === 2" class="background-content" src="./../assets/images/promptart/003.png" alt="">
        <img v-if="store.bgCurrentIndex === 3" class="background-content" src="./../assets/images/promptart/004.png" alt="">
        <img v-if="store.bgCurrentIndex === 4" class="background-content" src="./../assets/images/promptart/005.png" alt="">
    </div>
</template>

<style lang="scss" scoped>

.background {

    &-container {
        z-index: -1;
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;

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