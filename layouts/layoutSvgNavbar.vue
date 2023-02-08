<script setup>

defineProps({
    color: {
        type: String,
        default: "currentColor"
    },
    title: {
        type: String,
        required: true
    }
})


// - - - HOVER LOGIC - - 

const isHovered = ref(false)

function onMouseEnter(){
    isHovered.value = true
}

function onMouseLeave(){
    isHovered.value = false
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

            <div class="layout-svg-navbar-inner">

                <slot />

            </div>

        </div>

    </div>
</template>

<style lang="scss">

    $transitionDuration: 0.3s;
    $transitionDurationShort: 0.18s;
    $transitionDurationLong: 0.7s;

    .layout-svg-navbar {

        &-wrapper {
            position: relative;

            filter: grayscale(0);

            transition: filter $transitionDurationLong;
            
            &.isGreyed {
                
                filter: grayscale(100);
            }

            &:hover {

                .layout-svg-navbar {

                    &-container {
                        transform: translateY(-10px) scale(1.1);
                        box-shadow: inset -2px 2px 1px rgba(255,255,255,0.1),
                                    inset 0 0 14px rgba(0,0,0,0.6),
                                    0 -20px 130px v-bind(color);
                    }

                    &-inner {

                        &::after {
                            width: 100%;
                            filter: blur(25px);
                            bottom: -10px;
                        }

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

            cursor: pointer;
            overflow: hidden;
            border-radius: 15px;
            background-color: rgba(255,255,255,0.09);
            box-shadow: inset 0 2px 1px rgba(255,255,255,0.1),
                        inset -1px 1px 18px rgba(0,0,0,0.4),
                        1px -1px 1px transparent;
    
            transform: translateY(0) scale(1);
            transition: box-shadow $transitionDurationLong, 
                        transform $transitionDurationShort cubic-bezier(0,1.61,1,1.67);

        }

        &-inner {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 1rem;
            overflow: hidden;
            margin: 0;

            svg {
                filter: drop-shadow(0 0 6px v-bind(color));

                transition: width $transitionDuration;
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

                transition: all $transitionDuration;
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

            transition: opacity $transitionDurationLong,
                        transform $transitionDuration cubic-bezier(0,.93,.38,.98),
                        filter $transitionDurationLong cubic-bezier(0,.93,.38,.98);
        }
        
    }

</style>