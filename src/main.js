import * as THREE from "three";
import Walls from "./maze.js";
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

const ambientLight = new THREE.AmbientLight(0xffffff, 0.09);
scene.add(ambientLight);


// plane
// const planeGeometry = new THREE.PlaneGeometry(25, 25);
// const material3 = new THREE.MeshLambertMaterial({normalMap: groundTexture, map: groundTexture, side: THREE.DoubleSide });
// const plane = new THREE.Mesh(planeGeometry, material3);
// plane.rotation.x =  Math.PI / 2;
// scene.add(plane);

// walls
const walls = new Walls();

// lebar
const rows = 25;
// panjang
const cols = 25;

const mazeLayout = generateMazeLayout(rows, cols);
const quizLayout = generateQuizLayout(mazeLayout, 5, 10);
walls.generateMaze(quizLayout, 3, 0x0000ff);

walls.addToScene(scene);

// controls
const controls = new OrbitControls(cam, renderer.domElement);

function draw() {
    controls.update();
    renderer.render(scene, cam);
    requestAnimationFrame(draw);
}
draw();

renderer.render(scene, cam);