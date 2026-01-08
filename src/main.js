import * as THREE from "three";
import Maze from "./maze.js";
import Ground from "./ground.js";
import { generateMazeLayout, generateQuizLayout } from "./mazeGenerator.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { PointLight, PointLightHelper } from "three/webgpu";

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

// loader
const textureLoader = new THREE.TextureLoader();

// load wall textures
// pakai 1K texture supaya ga berat
const bushColorMap = textureLoader.load("/textures/bush/Grass001_1K-JPG_Color.jpg");
bushColorMap.colorSpace = THREE.SRGBColorSpace;
const bushNormalMap = textureLoader.load("/textures/bush/Grass001_1K-JPG_NormalGL.jpg");
const bushRoughnessMap = textureLoader.load("/textures/bush/Grass001_1K-JPG_Roughness.jpg");
const bushAoMap = textureLoader.load("/textures/bush/Grass001_1K-JPG_AmbientOcclusion.jpg");
const bushDisplacementMap = textureLoader.load("/textures/bush/Grass001_1K-JPG_Displacement.jpg");

const groundColorMap = textureLoader.load("/textures/ground/PavingStones139_1K-JPG_Color.jpg");
groundColorMap.colorSpace = THREE.SRGBColorSpace;
const groundNormalMap = textureLoader.load("/textures/ground/PavingStones139_1K-JPG_NormalGL.jpg");
const groundRoughnessMap = textureLoader.load("/textures/ground/PavingStones139_1K-JPG_Roughness.jpg");
const groundAoMap = textureLoader.load("/textures/ground/PavingStones139_1K-JPG_AmbientOcclusion.jpg");
const groundDisplacementMap = textureLoader.load("/textures/ground/PavingStones139_1K-JPG_Displacement.jpg");

// buat material wall
const bushMaterial = new THREE.MeshStandardMaterial({
    map: bushColorMap,
    normalMap: bushNormalMap,
    roughnessMap: bushRoughnessMap,
    aoMap: bushAoMap,
    displacementMap: bushDisplacementMap,
    displacementScale: 0.01,
    roughness: 1,
    color: 0x2f4f2f
});

const groundMaterial = new THREE.MeshStandardMaterial({
    map: groundColorMap,
    normalMap: groundNormalMap,
    roughnessMap: groundRoughnessMap,
    aoMap: groundAoMap,
    displacementMap: groundDisplacementMap,
    displacementScale: 0.01,
    roughness: 1,
    color: 0x333333
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
maze.generateMaze(quizLayout, 3, bushMaterial, groundMaterial);
maze.addToScene(scene);

// controls
const controls = new OrbitControls(cam, renderer.domElement);

function draw() {
    controls.update();
    renderer.render(scene, cam);
    requestAnimationFrame(draw);
}
draw();

renderer.render(scene, cam);