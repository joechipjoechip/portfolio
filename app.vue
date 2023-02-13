<template>

	<NuxtLayout>

		<NuxtPage />
		
	</NuxtLayout>

</template>

<style lang="scss">

@import "@/assets/fonts/playfair/stylesheet.css";
@import "@/assets/fonts/pt/stylesheet.css";

html {
	font-size: 20px;
}

body {
	margin: 0;
	padding: 0;

	// font-family: "Playfair Display";
	font-family: "PT Sans";

	// letter-spacing: 1.7px;

	background-color: rgb(18, 18, 18);


	color: #69eaf4;
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