import * as THREE from "three";
import Walls from "./walls.js";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Raycaster, Vector2 } from "three";

// scene
const scene = new THREE.Scene();

// cam
const cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100);

const controls = new PointerLockControls(cam, document.body);

document.addEventListener("click", () => {
    controls.lock();
});

scene.add(cam);
cam.position.set(0, 2, 25);

// WASD
const move ={
    forward: false,
    backward: false,
    left: false,
    right: false
};

document.addEventListener("keydown", (e) => {
    if (e.code === "KeyW") move.forward = true;
    if (e.code === "KeyS") move.backward = true;
    if (e.code === "KeyA") move.left = true;
    if (e.code === "KeyD") move.right = true;
});

document.addEventListener("keyup", (e) => {
    if (e.code === "KeyW") move.forward = false;
    if (e.code === "KeyS") move.backward = false;
    if (e.code === "KeyA") move.left = false;
    if (e.code === "KeyD") move.right = false;
});

// puzzleOpen
let puzzleOpen = false;

// render
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// cam.position.y = 2;
// cam.position.z = 50;

// plane
const planeGeometry = new THREE.PlaneGeometry(25, 25);
const material3 = new THREE.MeshBasicMaterial({ color: 0xffffff });
const plane = new THREE.Mesh(planeGeometry, material3);
plane.rotation.x = - Math.PI / 2;
scene.add(plane);

// walls
const walls = new Walls();
const mazeLayout = [
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1],
    
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
    
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    
    [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
    
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
walls.generateMaze(mazeLayout, 3, 0x0000ff);
walls.addToScene(scene);

// // controls
// const controls = new OrbitControls(cam, renderer.domElement);

// puzzle box
const puzzleBox = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.8, 0.8),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
puzzleBox.position.set(2, 0.4, -3);
scene.add(puzzleBox);

const puzzleObjects = [puzzleBox];

const raycaster = new Raycaster();
const centerScreen = new Vector2(0, 0);

window.addEventListener("keydown", (e)=>{
    if (e.code === "KeyE") {
        raycaster.setFromCamera(centerScreen, cam);
        const intersects = raycaster.intersectObjects(puzzleObjects);

        if (intersects.length > 0) {
            openPuzzle();
        }
    }
});


// door
const door = new THREE.Mesh(
    new THREE.BoxGeometry(1, 3, 0.2),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
door.position.set(5, 1.5, 0);
scene.add(door);

function openPuzzle() {
    if (puzzleOpen) return;
    puzzleOpen = true;
    document.getElementById("puzzleUI").classList.remove("hidden");
    controls.unlock();
}

function closePuzzle() {
    puzzleOpen = false;
    document.getElementById("puzzleUI").classList.add("hidden");
    controls.lock();
}

window.answerPuzzle = function(isCorrect) {
    if (isCorrect) {
        // door.visible = false;
        // checkpoint = cam.position.clone();
        console.log("Correct! The door is now open.");
    } else {
        // if (checkpoint) {
        //     cam.position.copy(checkpoint);
        // }
        console.log("Puzzle incorrect");
    }
    closePuzzle();
}

function draw() {
    const speed = 0.05;

    if (!puzzleOpen){
        if (move.forward) controls.moveForward(speed);
        if (move.backward) controls.moveForward(-speed);
        if (move.left) controls.moveRight(-speed);
        if (move.right) controls.moveRight(speed);
    }

    // controls.update();
    renderer.render(scene, cam);
    requestAnimationFrame(draw);
}
draw();


renderer.render(scene, cam);