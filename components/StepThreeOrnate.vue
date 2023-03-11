<script setup>

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';


const props = defineProps({
    modelName: {
        type: String,
        required: true
    }
})


// BASICS - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - -
const canvas = ref(null)
const glbIsLoaded = ref(false)
const canvasSize = reactive({})

onMounted(() => {
    const { width, height } = canvas.value.getBoundingClientRect()
    canvasSize.width = width
    canvasSize.height = height

    initScene()
    loadGlb()
})

watch(glbIsLoaded, newVal => {
    if( newVal ){
        addElementsToTheScene()
        orbitInit()

        // initComposer()
        // buildPostProcs()
        // addPostProcs()

        mainTick()
    }
})
// - - - - - - - - - - - - - - - - - -




// THREE LOGIC - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - -
let scene
let orbit
let camera
let renderer
let composer
let renderPass
let deltaTime = 0
const clock = new THREE.Clock()
const frameRate = 1/60
const cameraBasePositionZ = 1.8
const orbitEnabled = ref(true)
const elements = {
    lights: [],
    meshs: []
}
const postProcsPass = []

function initScene(){

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 70, canvasSize.width / canvasSize.height, 0.01, 10 )
    camera.position.z = cameraBasePositionZ;


   scene.add(camera)


    renderer = new THREE.WebGLRenderer({
        canvas: canvas.value,
        antialias: true,
        alpha: true
    })

    renderer.setSize(canvasSize.width, canvasSize.height )
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor( 0x000000, 0 )

    renderer.outputEncoding = THREE.sRGBEncoding

    // renderer.shadowMap.enabled = true
    // renderer.shadowMap.type = THREE.PCFShadowMap

}

function loadGlb(){

    // Instantiate a loader
    const loader = new GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data)
    // const dracoLoader = new DRACOLoader();
    // dracoLoader.setDecoderPath( './js/draco/' );
    // loader.setDRACOLoader( dracoLoader );

    console.log("props : ", props.modelName)

    loader.load(
        `./3d/${props.modelName}.glb`,

        file => {
            // called when the resource is loaded
            console.log("glb bien loaded - - - - ")
            onGlbLoad(file.scene)
        },

        xhr => {
            // called while loading is progressing

            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },

        error => {
            // called when loading has errors

            console.log( 'An error happened' , error);
        }

    );

}

function onGlbLoad( file ){
    storeElements(file)
    glbIsLoaded.value = true
}

function storeElements( file ) {

    file.traverse(child => {

        child.name = child.name.toLowerCase()

        if( child.name.includes("light") ){

            // child.castShadow = true
            elements.lights.push(child)

        } else if( child.name.includes("sphere") || child.name.includes("cube") ){

            // child.castShadow = true
            // child.receiveShadow = true
            elements.meshs.push(child)

        }

    })

    console.log("elements stored - - - ", elements)

}

function addElementsToTheScene(){

    console.log("addElements : ", elements)

    elements.meshs.forEach((element, index) => {

        giveMeshGlossyMaterial(element, index)

        scene.add(element)

    })

    elements.lights.forEach(lightFromBlender => {

        if( lightFromBlender.name.includes("2") ){

            lightFromBlender.intensity /= 1000
            scene.add(lightFromBlender)

        } else {

            lightFromBlender.intensity /= 100
            scene.add(lightFromBlender)

        }


        console.log("light from blender : ", lightFromBlender)

    })


}

function giveMeshGlossyMaterial(mesh, index){

    const material = new THREE.MeshPhongMaterial( {
        color: 0xFFFFFF,
        specular: index % 2 === 0 ? 0xFFFFFF : 0x0000FF,
        shininess: 100,
    })

    mesh.material = material
}

function orbitInit(){
    orbit = new OrbitControls(camera, canvas.value);
    orbit.enabled = orbitEnabled.value;
    orbit.enableDamping = true;
    orbit.target = elements.meshs[0].position;
}

function initComposer(){

    renderPass = new RenderPass(scene, camera);

    //
    renderPass.clearColor = new THREE.Color( 0, 0, 0 );
    renderPass.clearAlpha = 0;
    //

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
    postProcsPass.push(new GlitchPass())


    // BLOOM :
    // const strength = .55
    // const threshold = 0.045
    // const radius = 0.01

    // const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );

    // bloomPass.renderToScreen = true;
    // // bloomPass.material.transparent = true; // FIX

    // postProcsPass.push(
    //     Object.assign(bloomPass, { threshold, strength, radius })
    // );

}

function addPostProcs(){

    postProcsPass.forEach(postProc => composer.addPass(postProc))

}

function mainTick(){

	const elapsedTime = clock.elapsedTime

	deltaTime += clock.getDelta()


	// NOW CHECK IF FRAMERATE IS GOOD
	if( deltaTime > frameRate ){

		if( orbit && orbit.enabled ){
			orbit.update()
		}

		doRotation(elapsedTime)

		if( postProcsPass.length ){
			composer.render(scene, camera);
		} else {
			renderer.render(scene, camera)
		}

		deltaTime = deltaTime % frameRate;
	}

	window.requestAnimationFrame(mainTick);

}

function doRotation( elapsedTime ){

    const rotateValue = Math.sin(elapsedTime / 15)

    elements.meshs[0].rotation.y = rotateValue
    elements.meshs[1].rotation.y = rotateValue * -1

    elements.meshs[0].rotation.x = rotateValue * 2
    elements.meshs[1].rotation.x = rotateValue * -2

    elements.meshs[0].rotation.z = rotateValue * 6
    elements.meshs[1].rotation.z = rotateValue * -8

}

</script>

<template>
    <canvas ref="canvas" class="canvas"></canvas>
</template>

<style lang="scss" scoped>
.canvas {
    width: 100%;
    height: 100%;
    overflow: hidden;
    // border: solid 1px red;

    position: absolute;
    top: 0;
    left: 0;

    filter: brightness(1) sepia(0) blur(0);

    // opacity: 0.7;

    will-change: filter;

    animation: 10s animateModelRender infinite;

}

@keyframes animateModelRender {
    0%, 100% {
        filter: brightness(1) sepia(0) blur(0);
    }
    
    40%, 60% {
        filter: brightness(0.5) sepia(0.2) blur(0);
    }
    
    45% {
        filter: brightness(0.4) sepia(0) blur(15px);

    }


    50% {
        filter: brightness(2) sepia(2) blur(0);
    }
}

</style>