import * as THREE from "three";
import Maze from "./maze.js";
import { generateMazeLayout, generateQuizLayout } from "./mazeGenerator.js";
import { loadTexture } from "./loader.js"

import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import { getRandomSpawn } from "./spawn.js";
import { createCollisionChecker } from "./collision.js";
import { updatePlayerMovement } from "./movement.js";

// scene
const scene = new THREE.Scene();
// cam
const cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

// render
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

// Clock
const clock = new THREE.Clock();

// load texture
// pakai 1K texture supaya ga berat
const bushTexture = loadTexture(
    {
        folder: "bush",
        name: "Grass001_1K-JPG"
    },
    {
        ao: true,
        color: true,
        displacement: true,
        normal: true,
        roughness: true,
    }
)

const groundTexture = loadTexture(
    {
        folder: "ground",
        name: "PavingStones139_1K-JPG"
    },
    {
        ao: true,
        color: true,
        displacement: true,
        normal: true,
        roughness: true,
    }
)

const gemTexture = loadTexture(
    {
        folder: "gem",
        name: "Gem_1K-JPG",
    },
    {
        color: true,
        displacement: true,
        metalness: true,
        normal: true,
        roughness: true,
    }
)

// Material
// pakai (...texture) biar langsung pakai attribute sesuai dengan loader
const bushMaterial = new THREE.MeshStandardMaterial({
    ...bushTexture,
    displacementScale: 0.00001,
    roughness: 1,
    color: 0x2f4f2f,
})

const groundMaterial = new THREE.MeshStandardMaterial({
    ...groundTexture,
    displacementScale: 0.01,
    roughness: 1,
    color: 0x333333,
    side: THREE.DoubleSide
})

const gemMaterial = new THREE.MeshStandardMaterial({
    ...gemTexture,
    displacementScale: 0.00001,
    roughness: 1,
    metalness: 1,
    emissive: 0x56e62b,
    emissiveIntensity: 0.5
})


const ambientLight = new THREE.AmbientLight(0xffffff, 4);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 100)
pointLight.position.set(0, 20, 0)
pointLight.castShadow = true
scene.add(pointLight)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 5);
scene.add(pointLightHelper)



// Maze
const maze = new Maze();
const rows = 8; // lebar maze
const cols = 8; // panjang maze

const mazeLayout = generateMazeLayout(rows, cols);
const quizLayout = generateQuizLayout(mazeLayout, 5, rows / 2);
maze.generateMaze(quizLayout, 3, bushMaterial, groundMaterial, gemMaterial);
maze.addToScene(scene);

// spawn player
const spawn = getRandomSpawn(mazeLayout, 2.5, 2.5);
console.log(spawn)
cam.position.copy(spawn);   

// controls
const controls = new PointerLockControls(cam, renderer.domElement);
document.addEventListener('click', () => {
    controls.lock();
});
const move = {
    forward: false,
    backward: false,
    left: false,
    right: false
};
document.addEventListener("keydown", (e) => {
    switch (e.code) {
        case "KeyW": move.forward = true; break;
        case "KeyS": move.backward = true; break;
        case "KeyA": move.left = true; break;
        case "KeyD": move.right = true; break;
    }
});

document.addEventListener("keyup", (e) => {
    switch (e.code) {
        case "KeyW": move.forward = false; break;
        case "KeyS": move.backward = false; break;
        case "KeyA": move.left = false; break;
        case "KeyD": move.right = false; break;
    }
});

const checkCollision = createCollisionChecker(maze, 0.4);

let prevTime = performance.now();

function animate() {
    requestAnimationFrame(animate);
    const time = performance.now();
    const delta = (time - prevTime) / 1000;
    prevTime = time;

    updatePlayerMovement({
        cam,
        controls,
        move,
        speed: 5,
        delta,
        checkCollision
    });
    renderer.render(scene, cam);
    for (const element of maze.elements) {
        if (element.getType() === "Quiz") {
            element.update();
        }
    }
}

animate();