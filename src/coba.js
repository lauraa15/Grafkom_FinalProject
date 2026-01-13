import * as THREE from "three";
import Maze from "./maze.js";
import { generateMazeLayout, generateQuizLayout } from "./mazeGenerator.js";
import { loadTexture } from "./loader.js"

import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import { getRandomSpawn } from "./spawn.js";
import { createCollisionChecker } from "./collision.js";
import { updatePlayerMovement } from "./movement.js";
import { questions, generateQuestions } from "./quizData.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


// scene
const scene = new THREE.Scene();
// cam
const cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100);

// render
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

cam.position.y = 2;
cam.position.z = 50;

// Clock
const clock = new THREE.Clock();

// load horror mask model
const gltfLoader = new GLTFLoader();
let doorScene = await gltfLoader.loadAsync("/public/models/door/door.glb")

let door = doorScene.scene
door.traverse((obj) => {
    if (obj.isMesh) {
        obj.castShadow = true;
    }
});

door.scale.set(2.5, 2.5, 2.5)
scene.add(door)

let doorAnimation = doorScene.animations;
let doorMixer = new THREE.AnimationMixer(door);

console.log(doorAnimation);

const actions = doorAnimation.map((clip) => doorMixer.clipAction(clip));

let shakeInterval = 10;
let shakeTimer = 0;
let isShaking = false;
let shakeDuration = 3;
let shakeElapsed = 0;

const pointLight = new THREE.PointLight(0xffffff, 100)
pointLight.position.set(0, 0, -10)
scene.add(pointLight)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 5, 0xffffff)
scene.add(pointLightHelper)

const horrorMaskLight = new THREE.DirectionalLight(0x88ccff, 2);
horrorMaskLight.position.set(0, 0, 0 + 100);
scene.add(horrorMaskLight);

const controls = new OrbitControls(cam, renderer.domElement);


function animate() {
    controls.update();
    renderer.render(scene, cam);

    const delta = clock.getDelta();
    d.update(delta);

    shakeTimer += delta;

    if (!isShaking && shakeTimer >= shakeInterval) {
        shakeTimer = 0;
        
        isShaking = true
        actions[0].stop();
        actions[9].reset().play();
    }

    if (isShaking) {
        shakeElapsed += delta;

        if (shakeElapsed >= shakeDuration) {
            isShaking = false;
            shakeElapsed = 0;

            actions[9].stop();
            actions[0].reset().play();
        }
    }

    requestAnimationFrame(animate);
}

animate();