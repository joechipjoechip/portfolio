<script setup>

defineProps({
    color: {
        type: String,
        default: "currentColor"
    },
    title: {
        type: String,
        required: true
    },
    isCircular: {
        type: Boolean,
        default: false
    }
})


// - - - HOVER LOGIC - - 
const isHovered = ref(false)
const randomDeg = ref("0deg")
const multiples = [-270, -90, 90, 270, 450]

function onMouseEnter(){
    isHovered.value = true

    handleCircular()
}

function onMouseLeave(){
    isHovered.value = false
    
    handleCircular()
}

function handleCircular(){

    if( isHovered.value ){

        randomDeg.value = `${
            multiples[ Math.floor(Math.random() * (multiples.length - 1)) ]
        }deg`

    } else {

        randomDeg.value = "0deg"

    }

}
// - - - - - - - - - - - -

</script>

<template>
    <div 
        class="layout-svg-navbar-wrapper"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        :class="{
            'isGreyed': !isHovered
        }"
    >

        <div class="layout-svg-navbar-title">{{ title }}</div>

        <div class="layout-svg-navbar-container">

            <div 
                class="layout-svg-navbar-inner"
                :class="{ 'isCircular': isCircular }"
            >

                <slot />

            </div>

        </div>

    </div>
</template>

<style lang="scss">

    .layout-svg-navbar {

        &-wrapper {
            position: relative;

            filter: grayscale(0);

            transition: filter var(--transitionDurationLong);
            
            &.isGreyed {
                
                filter: grayscale(100);
            }

            &:hover {

                .layout-svg-navbar {

                    &-container {
                        @include glassMorphHover(v-bind(color));

                        transform: translateY(-10px) scale(1.1);
                    }

                    &-inner {

                        &.isCircular {

                            svg {
                                transform: rotate(v-bind(randomDeg));
                            }

                        }


                        // NOPE because cause flickering on chrome mac
                        // &::after {
                        //     width: 100%;
                        //     filter: blur(25px);
                        //     bottom: -10px;
                        // }

                    }

                    &-title {
                        opacity: 1;
                        filter: blur(0);
                        transform: translateX(-50%) translateY(5.2rem);
                    }
                }

            } 

        }

        &-container {
            // @include glassMorph;
            // background-color: rgba(255,255,255,0.09);

            cursor: pointer;
            overflow: hidden;
            border-radius: var(--borderRadiusSmall);
    
            transform: translateY(0) scale(1);
            transition: box-shadow var(--transitionDurationLong), 
                        transform var(--transitionDurationShort) cubic-bezier(0,1.61,1,1.67);

        }

        &-inner {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 0.5rem;
            overflow: hidden;
            margin: 0;

            svg {
                transform: rotate(0deg);
                filter: drop-shadow(0 0 6px v-bind(color));

                transition: width var(--transitionDurationMedium),
                            transform var(--transitionDurationMedium);
            }

            &::after {
                content: "";
                width: 20%;
                height: 10px;
                background-color: v-bind(color);
                display: block;
                position: absolute;
                bottom: 0;
                filter: blur(12px);

                transition: all var(--transitionDurationMedium);
            }

        }

        &-title {
            pointer-events: none;
            color:v-bind(color);
            display: block;
            position: absolute;
            left: 50%;
            transform: translateX(-50%) translateY(1400%);

            text-transform: capitalize;
            font-size: 1.1rem;
            // font-style: italic;
            font-weight: light;
            // text-shadow: 0 -8px 40px v-bind(color);

            filter: blur(20px);
            opacity: 0;

            transition: opacity var(--transitionDurationLong),
                        transform var(--transitionDurationMedium) cubic-bezier(0,.93,.38,.98),
                        filter var(--transitionDurationLong) cubic-bezier(0,.93,.38,.98);
        }
        
    }

</style>