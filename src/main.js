import * as THREE from "three";
import Maze from "./maze.js";
import { generateMazeLayout, generateQuizLayout } from "./mazeGenerator.js";
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

// loader
const textureLoader = new THREE.TextureLoader();

// load wall textures
// pakai 1K texture supaya ga berat
const colorMap = textureLoader.load("/textures/bush/Grass001_1K-JPG_Color.jpg");
colorMap.colorSpace = THREE.SRGBColorSpace;
const normalMap = textureLoader.load("/textures/bush/Grass001_1K-JPG_NormalGL.jpg");
const roughnessMap = textureLoader.load("/textures/bush/Grass001_1K-JPG_Roughness.jpg");
const aoMap = textureLoader.load("/textures/bush/Grass001_1K-JPG_AmbientOcclusion.jpg");
const displacementMap = textureLoader.load("/textures/bush/Grass001_1K-JPG_Displacement.jpg");

// buat material wall
const bushMaterial = new THREE.MeshStandardMaterial({
    map: colorMap,
    normalMap: normalMap,
    roughnessMap: roughnessMap,
    aoMap: aoMap,
    displacementMap: displacementMap,
    displacementScale: 0.01,
    roughness: 1,
    color: 0x00ff00,
});

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);


// plane
// const planeGeometry = new THREE.PlaneGeometry(25, 25);
// const material3 = new THREE.MeshLambertMaterial({normalMap: groundTexture, map: groundTexture, side: THREE.DoubleSide });
// const plane = new THREE.Mesh(planeGeometry, material3);
// plane.rotation.x =  Math.PI / 2;
// scene.add(plane);

// Maze
const maze = new Maze();
const rows = 20; // lebar maze
const cols = 20; // panjang maze

const mazeLayout = generateMazeLayout(rows, cols);
const quizLayout = generateQuizLayout(mazeLayout, 5, rows / 2);
maze.generateMaze(quizLayout, 3, bushMaterial);
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