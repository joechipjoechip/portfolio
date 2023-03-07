<script setup>

import * as THREE from 'three';

import { useGetEventPosition } from "@/composables/getEventPosition";

import { useUserStore } from '@/stores/user';

const store = useUserStore()

const textureLoader = new THREE.TextureLoader();


// IMAGES COLLECTION LOGIC - - - - - - - - - - -
const collection = ref([])

function formatIndex(index) {

	let stringIndex = new String(index)

	switch( stringIndex.length ){
		case 1:
			stringIndex = "00" + stringIndex
			break;
		case 2:
			stringIndex = "0" + stringIndex
			break;
	}

	return stringIndex

}

function createCollection(){

	for (let index = 0; index < store.bgHomeCount; index++) {

		const formatedIndex = formatIndex(index)
		const pathString = `./images/prompt/${formatedIndex}.png`
		const texture = textureLoader.load(pathString)
	
		collection.value[index] = {
			id: formatedIndex,
			src: pathString,
			texture
		}
	
	}

	console.log("collection : ", collection.value[0].texture)

}

onBeforeMount(() => createCollection())
// - - - - - - - - - - - - - - - - - - - - - - -



// MOUSEMOVE LOGIC - - - - - - - - - - - - - - -
const { $on } = useNuxtApp()
$on("main-touch-move", onMainTouchMove)

const mouse = reactive({})

function onMainTouchMove( event ){

	const { x, y } = useGetEventPosition(event)

	mouse.x = x / window.innerWidth
	mouse.y = y / window.innerHeight

}
// - - - - - - - - - - - - - - - - - - - - - - -


// THREE LOGIC - - - - - - - - - - - - - - - - -
const canvas = ref(null)

onMounted(() => {

	let scene
	let camera
	let mesh
	let renderer
	let deltaTime = 0
	let clones = []
	
	const frameRate = 1/60
	const clock = new THREE.Clock()
	const clonesCount = 7
	

	scene = new THREE.Scene();
	
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 )
	camera.position.z = 4;

	const light = new THREE.AmbientLight(0xFFFFFF)
	
	
	const geometry = new THREE.PlaneGeometry( 1.6, 0.9 )

	const material = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide });
	
	mesh = new THREE.Mesh( geometry, material );

	scene.add(light)
	scene.add( mesh )

	
	renderer = new THREE.WebGLRenderer({
		canvas: canvas.value,
		antialias: true
	})

	renderer.setSize( window.innerWidth, window.innerHeight )
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	// renderer.setClearColor(currentWorldConfig.main.spaceColor);
	renderer.outputEncoding = THREE.sRGBEncoding

	renderer.shadowMap.enabled = true
	renderer.shadowMap.type = THREE.PCFShadowMap

	



	function displayTexture( item ){
		console.log("item : ", item)

		const currentMaterial = new THREE.MeshStandardMaterial({
			map: item.texture
		})

		mesh.material = currentMaterial
		mesh.material.needsUpdate = true

		if( clones.length ){
			clones.forEach(mesh => mesh.dispose())
			clones = []
		}

		for(let i = 0; i < clonesCount; i++){
			clones[i] = mesh.clone()
			clones[i].material = currentMaterial
			// clones[i].position.y = i * 1
			clones[i].position.z = i * 0.9
			clones[i].position.y = i * -0.2
			
			clones[i].material.needsUpdate = true

			scene.add(clones[i])
		}


	}
	
	


	function mainTick(){
		const elapsedTime = clock.elapsedTime

		deltaTime += clock.getDelta()

		
		// NOW CHECK IF FRAMERATE IS GOOD
		if( deltaTime > frameRate ){


			doRotation(mesh, elapsedTime)

			clones.forEach(mesh => doRotation(mesh, elapsedTime))


			renderer.render(scene, camera);
			
			deltaTime = deltaTime % frameRate;
		}

		window.requestAnimationFrame(mainTick);

	}

	function doRotation( passedMesh, elapsedTime ){

		passedMesh.rotation.y = Math.sin(elapsedTime / 5);

	}

	displayTexture(collection.value[0])
	mainTick()
	
	
	// animation
	
	// function animation( time ) {
	
	// 	mesh.rotation.x = time / 2000;
	// 	mesh.rotation.y = time / 1000;
	
	// 	renderer.render( scene, camera );
	
	// }

})




// - - - - - - - - - - - - - - - - - - - - - - -




</script>

<template>

	<canvas 
		ref="canvas"
		class="background-container"
		width="800" height="500" 
	></canvas>

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

		&::after {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(130deg, rgba(255,78,78,0.08) 60%, rgba(78,106,255,0.8) 100%);
		}

	}

}

</style>