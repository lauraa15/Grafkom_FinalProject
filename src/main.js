import * as THREE from "three";
import Walls from "./walls.js";
import { generateMazeLayout } from "./mazeGenerator.js";
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
document.body.appendChild(renderer.domElement);

// loaders
const textureLoader = new THREE.TextureLoader();
const groundTexture = textureLoader.load('/Ground099.png');

// lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 50, 0);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.09);
scene.add(ambientLight);

// light helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(directionalLightHelper);

// plane
const planeGeometry = new THREE.PlaneGeometry(25, 25);
const material3 = new THREE.MeshLambertMaterial({normalMap: groundTexture, map: groundTexture, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, material3);
plane.rotation.x =  Math.PI / 2;
scene.add(plane);

// walls
const walls = new Walls();

const rows = 21;
const cols = 21;
const mazeLayout = generateMazeLayout(rows, cols);

const wallMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
walls.generateMaze(mazeLayout, 3, wallMaterial);
walls.addToScene(scene);

// spawn player
const spawn = getRandomSpawn(mazeLayout, 1.2, 1.2);
cam.position.copy(spawn);

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


const checkCollision = createCollisionChecker(walls, 0.4);


let prevTime = performance.now();

function animate() {
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
    requestAnimationFrame(animate);
}
animate();