<script setup>

const currentIndex = ref(0)

const imagesArr = ref([
    "001.png",
    "002.png",
    "003.png",
    "004.png"
])


function incrementImageIndex(){
    
    currentIndex.value =  (currentIndex.value + 1) % imagesArr.value.length
    console.log("current index : ", currentIndex.value)
}

</script>

<template>
    <div class="background-container">
        <img v-if="currentIndex === 0" class="background-content" src="./../assets/images/promptart/001.png" alt="">
        <img v-if="currentIndex === 1" class="background-content" src="./../assets/images/promptart/002.png" alt="">
        <img v-if="currentIndex === 2" class="background-content" src="./../assets/images/promptart/003.png" alt="">
        <img v-if="currentIndex === 3" class="background-content" src="./../assets/images/promptart/004.png" alt="">
        <button @click="incrementImageIndex">next bg</button>
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
            position: absolute;
            bottom : 10px;
            left : 10px;
        }
    }

    &-content {
        object-fit: cover;
        object-position: center;
        width: 100%;
    }
}

</style>