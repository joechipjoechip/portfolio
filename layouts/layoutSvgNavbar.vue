<script setup>
defineProps({
    color: {
        type: String,
        default: "currentColor"
    }
})

</script>

<template>
    <div class="layout-svg-navbar">
        <div class="layout-svg-navbar-inner">
            <slot />
        </div>
    </div>
</template>

<style lang="scss">

    .layout-svg-navbar {
        cursor: pointer;
        overflow: hidden;
        border-radius: 15px;
        background-color: rgba(255,255,255,0.09);
        box-shadow: inset 0 2px 1px rgba(255,255,255,0.1),
                    inset 0 -2px 1px rgba(0,0,0,0.2);

        transform: translateY(0);
        transition: box-shadow .1s, 
                    transform .18s cubic-bezier(0,1.61,1,1.67);

        &:hover {

            transform: translateY(-10px);
            box-shadow: inset -2px 2px 1px rgba(255,255,255,0.1),
                        inset 1px -1px 1px v-bind(color);

            .layout-svg-navbar-inner {

                &::after {
                    transform: translateY(-150%);
                }

            }

        } 

        &-inner {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 0.7rem;
            overflow: hidden;

            svg {
                filter: drop-shadow(0 0 8px v-bind(color));
            }

            &::after {
                content: "";
                width: 30%;
                height: 10px;
                background-color: v-bind(color);
                display: block;
                position: absolute;
                bottom: 0;
                transform: translateY(0);
                filter: blur(14px);

                transition: transform .5s;
            }

        }

        
    }

</style>