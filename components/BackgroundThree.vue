<script setup>

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { CurtainShader } from './../assets/shaders/CurtainShader.js'

import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';

// import { PixelShader } from 'three/examples/jsm/shaders/PixelShader.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';

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

watch(mouse, newVal => {
	console.log("watch de la mouse : ", newVal.x)
	// if( )
})
// - - - - - - - - - - - - - - - - - - - - - - -


// THREE LOGIC - - - - - - - - - - - - - - - - -
const canvas = ref(null)

let scene
let camera
let mesh
let renderer
let deltaTime = 0
let clones = []
let orbit
let group = new THREE.Group()
let renderPass
let composer
let effects = []
let postProcs = []

const frameRate = 1/60
const clock = new THREE.Clock()
const clonesCount = 12

onMounted(() => {

	scene = new THREE.Scene();
	
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 )
	camera.position.z = 0.5;

	const light = new THREE.AmbientLight(0xFFFFFF)
	
	
	const geometry = new THREE.PlaneGeometry( 0.96, 0.54 )

	const material = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide });
	
	mesh = new THREE.Mesh( geometry, material );

	group.add(mesh)

	scene.add(light)
	scene.add(group)

	orbit = new OrbitControls(camera, canvas.value);
	orbit.enabled = true;
	orbit.enableDamping = true;
	orbit.target = group.position;

	
	renderer = new THREE.WebGLRenderer({
		canvas: canvas.value,
		antialias: true
	})

	renderer.setSize( window.innerWidth, window.innerHeight )
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	// renderer.setClearColor(currentWorldConfig.main.spaceColor);

	// TODO : voir si on laisse ça ou pas (dépend de la presence/absence d'effets postProcs)
	// renderer.outputEncoding = THREE.sRGBEncoding

	renderer.shadowMap.enabled = true
	renderer.shadowMap.type = THREE.PCFShadowMap

	initComposer()

	displayTexture(collection.value[1])

	mainTick()

})


function displayTexture( item ){

	const currentMaterial = new THREE.MeshStandardMaterial({
		map: item.texture
	})

	const transparentMaterial = new THREE.MeshStandardMaterial({
		map: item.texture,
		transparent: true,
		alphaMap: textureLoader.load("./images/misc/mask3.png")
	})

	mesh.material = currentMaterial
	mesh.material.needsUpdate = true

	group.add(mesh)

	if( clones.length ){
		clones.forEach(mesh => mesh.dispose())
		clones = []
	}

	for(let i = 0; i < clonesCount; i++){
		clones[i] = mesh.clone()

		clones[i].material = transparentMaterial

		clones[i].position.z = i * 0.01
		// clones[i].position.y = i * -0.05
		
		clones[i].material.needsUpdate = true

		group.add(clones[i])
	}


}

function initComposer(){

	renderPass = new RenderPass(scene, camera);

	composer = new EffectComposer(renderer);

	composer.setSize(window.innerWidth, window.innerHeight);

	composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

	composer.addPass(renderPass)


	buildPostProcs()
	buildEffects()

	addPostProcs()
	addEffects()

}

function buildPostProcs(){

	// PIXEL :

	// const pixelPass = new ShaderPass( PixelShader );

	// pixelPass.uniforms["resolution"].value = new THREE.Vector2(window.innerWidth, window.innerHeight);

	// pixelPass.uniforms["pixelSize"].value = 40;

	// postProcs.push(pixelPass);

	// - - - -


	// GLITCH :
	// postProcs.push(new GlitchPass())


	// BLOOM :
	// const strength = .25
	// const threshold = 0.045
	// const radius = 0.01

	// const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );

	// postProcs.push(
	// 	Object.assign(bloomPass, { threshold, strength, radius })
	// );
	
}

function addPostProcs(){
	

	postProcs.forEach(postProc => composer.addPass(postProc))
}

function buildEffects(){

	// Curtain custom effect
	effects.push(
		new ShaderPass(CurtainShader)
	)

}

function addEffects(){

	console.log("wsh le effect add : ", effects)

	composer.addPass(renderPass)

	effects.forEach(effect => composer.addPass(effect))

}



function doRotation( passedMesh, elapsedTime ){

	passedMesh.rotation.y = Math.sin(elapsedTime / 5) / 10;

}

function mainTick(){

	const elapsedTime = clock.elapsedTime

	deltaTime += clock.getDelta()


	// NOW CHECK IF FRAMERATE IS GOOD
	if( deltaTime > frameRate ){

		if( orbit ){
			orbit.update()
		}


		doRotation(mesh, elapsedTime)

		clones.forEach(mesh => doRotation(mesh, elapsedTime))

		if( postProcs.length || effects.length ){
			composer.render(scene, camera);
		} else {
			renderer.render(scene, camera)
		}
		
		deltaTime = deltaTime % frameRate;
	}

	window.requestAnimationFrame(mainTick);

}






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
		z-index: 1;
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