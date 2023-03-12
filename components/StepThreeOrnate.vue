<script setup>

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';

const props = defineProps({
    modelName: {
        type: String,
        required: true
    },
    stepIsActive: {
        type: Boolean,
        required: true
    }
})



// BASICS - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - -
const canvas = ref(null)
const glbIsLoaded = ref(false)
const canvasSize = reactive({})
const isEnabled = ref(false)
let timeoutID

onMounted(() => {

    initScene()
    initRenderer()
    loadGlb()

    console.log("onMOUNTED THREEORNATE")
})



watch(() => props.stepIsActive, newVal => {

    if( newVal ){

        nextTick(() => {

            if( timeoutID ){
                clearTimeout(timeoutID)
                timeoutID = null
            }

            timeoutID = setTimeout(() => {
                sizeCanvasInfos()
                mainTick()
                isEnabled.value = true
                
            }, 700)
            
        })

    } else {

        isEnabled.value = false

    }
})


function sizeCanvasInfos(){

    const { width, height } = canvas.value.parentNode?.getBoundingClientRect()

    canvasSize.width = width
    canvasSize.height = height

    camera.aspect = canvasSize.width / canvasSize.height

    camera.updateProjectionMatrix()

    renderer.setSize(canvasSize.width, canvasSize.height)

}
// - - - - - - - - - - - - - - - - - -




// THREE LOGIC - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - -
let scene
let camera
let renderer
let composer
let renderPass
let deltaTime = 0
const timeDecay = 60
const clock = new THREE.Clock()
const frameRate = 1/60
const cameraBasePositionZ = 2.2
const elements = {
    lights: [],
    meshs: []
}
const postProcsPass = []

function initScene(){


    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 70, canvasSize.width / canvasSize.height, 0.01, 10 )
    camera.position.z = cameraBasePositionZ;
    camera.position.y = 0.05;

    scene.add(camera)

}

function initRenderer(){

    renderer = new THREE.WebGLRenderer({
        canvas: canvas.value,
        antialias: true,
        alpha: true
    })

    renderer.setSize(canvasSize.width, canvasSize.height )
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor( 0x000000, 0 )

    renderer.outputEncoding = THREE.sRGBEncoding

    // assetsStore.setRenderer(store.currentStepIndex, renderer)
    
    // renderer.shadowMap.enabled = true
    // renderer.shadowMap.type = THREE.PCFShadowMap

}

function loadGlb(){
    const loader = new GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data)
    // const dracoLoader = new DRACOLoader();
    // dracoLoader.setDecoderPath( './js/draco/' );
    // loader.setDRACOLoader( dracoLoader );

    loader.load(
        `./3d/${props.modelName}.glb`,

        file => {
            // called when the resource is loaded

            // assetsStore.setModel(store.currentStepIndex, file.scene)

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
    addElementsToTheScene()
}

function storeElements( file ) {

    file.traverse(child => {

        child.name = child.name.toLowerCase()

        if( child.name.includes("light") ){

            elements.lights.push(child.clone())

        } else if( child.name.includes("sphere") || child.name.includes("cube") ){

            elements.meshs.push(child.clone())

        }

    })

}

function addElementsToTheScene(){

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

    // GLITCH :
    postProcsPass.push(new GlitchPass())

}

function addPostProcs(){

    postProcsPass.forEach(postProc => composer.addPass(postProc))

}

function mainTick(){
    if( !props.stepIsActive ){ return }

	const elapsedTime = clock.elapsedTime

	deltaTime += clock.getDelta()

	// NOW CHECK IF FRAMERATE IS GOOD
	if( deltaTime > frameRate ){

		doRotation(elapsedTime)
        
        console.log("render tick")

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

    const moveValue = Math.sin((elapsedTime + timeDecay) / 25)

    elements.meshs.forEach((mesh, index) => {

        const isPair = index % 2 === 0

        if( isPair ){

            mesh.rotation.y = moveValue
            mesh.rotation.x = moveValue * 2
            mesh.rotation.z = moveValue * 6

            // elements.lights[index].position.z = 2 + moveValue / 2
            
        } else {
            
            mesh.rotation.x = moveValue * -2
            mesh.rotation.y = moveValue * -1
            mesh.rotation.z = moveValue * -8
            
            // if( elements.lights[index].name !== "light3" ){
            //     elements.lights[index].position.z = 2 + moveValue / - 2

            // }

        }


    })

}

</script>

<template>
    <canvas 
        ref="canvas" 
        class="canvas"
        :class="{ isEnabled }"
        :width="canvasSize.width"
        :height="canvasSize.height"
    ></canvas>
</template>

<style lang="scss" scoped>
.canvas {
    width: 100%;
    height: 100%;
    overflow: hidden;

    position: absolute;
    top: 0;
    left: 0;

    filter: brightness(1) sepia(0) blur(0) opacity(1);

    opacity: 0;

    transition: opacity 10s;

    will-change: opacity, filter;

    &.isEnabled {
        opacity: 1;
        animation: 30s animateModelRender infinite;
    }


}

@keyframes animateModelRender {
    0%, 100% {
        filter: brightness(1) sepia(0) blur(35px) opacity(1);
    }
    
    40% {
        filter: brightness(1) sepia(0) blur(0) opacity(1);
    }

    50% {
        filter: brightness(2) sepia(3) blur(0) opacity(1);
    }
    
    75% {
        filter: brightness(1) sepia(0) blur(0) opacity(0);

    }
}

</style>