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
        border-radius: 10px;
        box-shadow: -2px 2px 10px rgba(0,0,0,0.5),
                    inset -5px 5px 20px rgba(255,255,255,0.2);

        &-inner {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 1rem;

            svg {
                filter: drop-shadow(0 0 8px v-bind(color));
            }

        }
    }

</style>