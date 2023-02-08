<template>

	<NuxtLayout>

		<NuxtPage />
		
	</NuxtLayout>

</template>

<style lang="scss">

@import "@/assets/fonts/playfair/fontfaces.css";

body {
	margin: 0;
	padding: 0;

	font-family: "Playfair Display";
}

.page-enter-active,
.page-leave-active {
	transition: all 1s;
}
.page-enter-from,
.page-leave-to {
	transform: translateY(80px);
	opacity: 0;
	filter: blur(1rem);
}


.layout-enter-active,
.layout-leave-active {
  transition: all 3s;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}


</style>