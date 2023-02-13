<script setup>

const props = defineProps({
	status: {
		type: Object,
		required: true
	},
	wording: {
		type: Object,
		required: true
	}
})

console.log("le bon wording ? : ", props.wording)


</script>

<template>
    <NuxtLayout name="layout-step" :status="status" :wording="wording">

		<SlotItemFormation
			v-for="(dataItem, index) in props.wording.slots" :key="index"
			:data="dataItem"
			:stepIsActive="status.isActive"
		/>
	
        <!-- <div class="step-wrapper">

            <div class="step-head">

                <h2 class="step-head-title">
                    {{ props.status.name }}
                </h2>

                <h3 class="step-head-catcher">
                    {{ props.wording.catcher }}
                </h3>

            </div>

            <div class="step-body">
                
                <SlotItemFormation
                    v-for="(dataItem, index) in props.wording.slots" :key="index"
                    :data="dataItem"
                    :stepIsActive="status.isActive"
                />

            </div>

            <div class="step-footer">

            </div>

        </div> -->

    </NuxtLayout>
</template>

<style lang="scss" scoped>

// .step {

// 	&-head {
// 		// border: solid 1px white;
// 		padding: 40px 0;
// 		margin-bottom: 20px;
// 		background-color: rgba(0,0,0,0.4);

// 		& > * {
// 			margin: 0;
// 		}

// 		&-title {
// 			text-align: center;
// 			text-transform: capitalize;
// 			letter-spacing: 2px;
// 			font-weight: 100;
// 			font-size: 2rem;
// 		}

// 		&-catcher {
// 			text-align: center;
// 			font-size: 0.75rem;
// 			font-style: italic;
// 			font-weight: 100;
// 		}
// 	}

// 	&-body {

// 		@include flex;

// 	}

// 	&-footer {
// 		// border: solid 1px orange;
// 		//
// 	}

// }

</style>