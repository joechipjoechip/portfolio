<script setup>

import { gsap } from 'gsap';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { CurtainShader } from './../assets/shaders/CurtainShader.js'
import { RGBShader } from './../assets/shaders/RGBShader.js'

import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';

// import { PixelShader } from 'three/examples/jsm/shaders/PixelShader.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';

import { useGetEventPosition } from "@/composables/getEventPosition";
import { useUserStore } from '@/stores/user';

const store = useUserStore()
const devImageIndex = 0
const clonesCount = 6


// - - - - - - - - - - - - - - - - - - - - - - -
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


// - - - - - - - - - - - - - - - - - - - - - - -
// INTERACTIONS LOGIC - - - - - - - - - - - - - - -
const { $on } = useNuxtApp()
const mouse = reactive({
	lastClick: { x: 0, y: 0 },
	x: 0,
	y: 0
})

$on("main-touch-move", onMainTouchMove)
$on("main-touch-and-click", onMainClick)
$on("main-keydown", onMainKeyDown)

function onMainClick( event ){

	
	mouse.lastClick = {
		x: event.clientX,
		y: event.clientY
	}

}

function onMainTouchMove( event ){

	const { x, y } = useGetEventPosition(event)

	mouse.x = x / window.innerWidth
	mouse.y = y / window.innerHeight

}

function onMainKeyDown(){

	buildTimelines()

	timelines.forEach(tl => tl.play())

}
// - - - - - - - - - - - - - - - - - - - - - - -


// - - - - - - - - - - - - - - - - - - - - - - -
// TIMELINE LOGIC - - - - - - - - - - - - - - - -
const timelines = []
const uProgressArr = [1,1,1]
const uDurationsArr = [0.55, 0.75, 1]

function buildTimelines(){

	uProgressArr.forEach((uValue, index) => {

		const tl = gsap.timeline({ paused: true })
	
		const animatedObj = { progress: uValue }
	
		tl.to(animatedObj, 
			uDurationsArr[index] * 1.3, 
			{
				progress: 0,
	
				ease: index % 2 === 0 ? "power4.out" : "slow(0.7, 0.7, false)",

				onUpdate: (uProgressNewVal) => {
					// console.log("uProgressNewVal -> ", uProgressNewVal)
					updateAllWithProgress(index, uProgressNewVal.progress)
	
				},
				onUpdateParams: [animatedObj],
	
				onComplete: () => {
					uProgressArr[index] = 1
	
					if( index === uProgressArr.length ){
						timelines = []
					}
	
				}
			},
			// `+=${
			// 	uDurationsArr[index - 1] ? uDurationsArr[index - 1] / 4 : 0
			// }`
			`start`
		)
	
		timelines.push(tl)

	})
}

function updateAllWithProgress( index, newVal ){

	if( composer && effectsCustomPass.length ){
		const uniformString = `uProgress${index + 1}`

		effectsCustomPass.forEach(effect => {
			effect.uniforms[uniformString].value = newVal
		})

	}

	// clones.forEach((clone, index) => {
	// 	// console.log(" clones : ", clone)
	// 	clone.position.z = newVal * 10 * index *  staggerRatioClonesPositions
	// })

}

// - - - - - - - - - - - - - - - - - - - - - - -


// - - - - - - - - - - - - - - - - - - - - - - -
// THREE LOGIC - - - - - - - - - - - - - - - - -
const canvas = ref(null)
const textureLoader = new THREE.TextureLoader();

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
let effectsCustomPass = []
let postProcsPass = []

const frameRate = 1/60
const staggerRatioClonesPositions = 0.01
const clock = new THREE.Clock()

onMounted(() => {

	scene = new THREE.Scene();
	
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 )
	camera.position.z = 0.55 * (window.innerHeight / window.innerWidth);

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

	// TODO : voir si on laisse ça ou pas (dépend de la presence/absence d'effets postProcsPass)
	// renderer.outputEncoding = THREE.sRGBEncoding

	renderer.shadowMap.enabled = true
	renderer.shadowMap.type = THREE.PCFShadowMap

	initComposer()

	buildPostProcs()
	buildCustomEffects()

	addPostProcs()
	addCustomEffects()

	displayTexture(collection.value[devImageIndex])

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

		clones[i].position.z = i * staggerRatioClonesPositions
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

}

function buildPostProcs(){

	// PIXEL :

	// const pixelPass = new ShaderPass( PixelShader );

	// pixelPass.uniforms["resolution"].value = new THREE.Vector2(window.innerWidth, window.innerHeight);

	// pixelPass.uniforms["pixelSize"].value = 40;

	// postProcsPass.push(pixelPass);

	// - - - -


	// GLITCH :
	// postProcsPass.push(new GlitchPass())


	// BLOOM :
	const strength = .25
	const threshold = 0.045
	const radius = 0.01

	const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );

	postProcsPass.push(
		Object.assign(bloomPass, { threshold, strength, radius })
	);
	
}

function addPostProcs(){
	
	postProcsPass.forEach(postProc => composer.addPass(postProc))

}

function buildCustomEffects(){

	// Curtain custom effect
	effectsCustomPass.push(
		new ShaderPass(CurtainShader)
	)

	// RGB custom effect
	effectsCustomPass.push(
		new ShaderPass(RGBShader)
	)

}

function addCustomEffects(){

	console.log("wsh le effect add : ", effectsCustomPass)

	composer.addPass(renderPass)

	effectsCustomPass.forEach(effect => composer.addPass(effect))

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


		// doRotation(mesh, elapsedTime)
		// clones.forEach(mesh => doRotation(mesh, elapsedTime))

		if( postProcsPass.length || effectsCustomPass.length ){
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

		&::before {
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