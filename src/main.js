import * as THREE from "three";
import Maze from "./maze.js";
import { generateMazeLayout, generateQuizLayout } from "./mazeGenerator.js";
import { loadTexture } from "./loader.js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MeshStandardMaterial, PointLight, PointLightHelper } from "three/webgpu";
import { metalness, roughness, triNoise3D } from "three/tsl";

// scene
const scene = new THREE.Scene();
// cam
const cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100);

// render
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

cam.position.y = 2;
cam.position.z = 50;

// Clock
const clock = new THREE.Clock();

// loader
const textureLoader = new THREE.TextureLoader();

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
        rougness: true,
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
    displacementScale: 0.01,
    roughness: 1,
    color: 0x2f4f2f,
})

const groundMaterial = new MeshStandardMaterial({
    ...groundTexture,
    displacementScale: 0.01,
    roughness: 1,
    color: 0x333333,
})

const gemMaterial = new THREE.MeshStandardMaterial({
    ...gemTexture,
    displacementScale: 0.00001,
    roughness: 1,
    metalness: 1,
    emissive: 0x2f8f5f,
    emissiveIntensity: 0.5
})

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new PointLight(0xffffff, 1000)
pointLight.position.set(0, 20, 0)
pointLight.castShadow = true
scene.add(pointLight)

const pointLightHelper = new PointLightHelper(pointLight, 5);
scene.add(pointLightHelper)

// Maze
const maze = new Maze();
const rows = 20; // lebar maze
const cols = 20; // panjang maze

const mazeLayout = generateMazeLayout(rows, cols);
const quizLayout = generateQuizLayout(mazeLayout, 5, rows / 2);
maze.generateMaze(quizLayout, 3, bushMaterial, groundMaterial, gemMaterial);
maze.addToScene(scene);

// controls
const controls = new OrbitControls(cam, renderer.domElement);

function draw() {
    controls.update();
    renderer.render(scene, cam);

    const elapsedTime = clock.getElapsedTime();

    for (const element of maze.elements) {
        if (element.getType() === "Quiz") {
            element.update(elapsedTime);
        }
    }

    requestAnimationFrame(draw);
}
draw();

renderer.render(scene, cam);