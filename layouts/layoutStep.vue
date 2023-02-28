<script setup>

import { useUserStore } from '@/stores/user';

const props = defineProps({
	status: {
		type: Object,
		required: true
	},
	wording: {
		type: Object,
		required: true
	},
})

const store = useUserStore()

</script>

<template>
    <div class="layout-step">
        <section 
            class="layout-step-inner"
            :class="[
                props.status.name,
                {
                    'isActive': props.status.isActive,
                    'isPrevious': props.status.isPrevious,
                    'isNext': props.status.isNext,
                    'isOutPrevious': props.status.isOutPrevious,
                    'isOutNext': props.status.isOutNext,
                    'isCurrentlyManipulated': props.status.isCurrentlyManipulated,

                    'isGreyed': store.navigation.navbar.isMoving
                }
            ]"
        >

        <div class="step-wrapper">

            <div class="step-head">

                <h2 class="step-head-title">
                    {{ props.wording.title }}
                </h2>

            </div>

            <div class="step-body">
                
                <!-- here comes : Formation.vue || Bio.vue || Experience.vue > -->
                <slot />

            </div>

            <div class="step-footer">

            </div>

        </div>
        

        </section>
    </div>
</template>

<style lang="scss" scoped>

.layout-step {

    border-radius: var(--borderRadiusMedium);
    overflow: hidden;

    &-inner {
        position: relative;
        height: 100%;
        padding: 0 2rem 0 0;

        background: linear-gradient(
                                217deg, 
                                rgba(255, 255, 255, 0), 
                                rgba(255, 255, 255, 0) 70%
                            );

        transition: background 2s;

        // filter: grayscale(0) blur(0);

        // transition: filter var(--transitionDurationLong);

        // &.isGreyed {
        //     filter: grayscale(1) blur(40px);
        // }


        // &.isPrevious,
        // &.isNext {

        //     &.bio {
        //         background: linear-gradient(
        //                         217deg, 
        //                         rgba(255, 255, 255, 0.419), 
        //                         rgb(60, 161, 255) 70%
        //                     );
        //     }
    
        //     &.formation {
        //         background: linear-gradient(
        //                         217deg, 
        //                         #2e1d408b, 
        //                         rgb(91, 3, 255) 70%
        //                     );
        //     }
    
        //     &.experience {
        //         background: linear-gradient(
        //                         217deg, 
        //                         rgba(0, 123, 255, 0.419), 
        //                         rgb(255, 25, 151) 70.71%
        //                     );
        //     }

        // }

    }
}

.layout-style-test {
    border: solid 25px white;
}

.step {

    &-wrapper {
        position: relative;
        height: 100%;
    }

	&-head {
		// border: solid 1px white;
		margin-bottom: .75rem;
        height: 10%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        
		& > * {
            margin: 0;
		}
        
		&-title {
            // overflow: hidden;
            width: 40%;
            // border-radius: 999px 999px 999px var(--borderRadiusSmallest);
            // background-color: var(--bg-black-45);
            // backdrop-filter: blur(8px);


            font-weight: 100;
            font-style: italic;
			text-align: center;
			text-transform: uppercase;
			font-size: 4rem;
            color: var(--bg-white-55);
		}

	}

	&-body {
        //
        @include scrollbar;
        height: 90%;
        overflow-y: scroll;
        padding-right: 2rem;
	}

	&-footer {
		// border: solid 1px orange;
		//
	}

}

</style>