import * as THREE from "three";
import Maze from "./maze.js";
import { generateMazeLayout, generateQuizLayout } from "./mazeGenerator.js";
import { loadTexture } from "./loader.js"

import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import { getRandomSpawn } from "./spawn.js";
import { createCollisionChecker } from "./collision.js";
import { updatePlayerMovement } from "./movement.js";
import { questions, generateQuestions } from "./quizData.js";

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

// quiz
const quizElements = maze.elements.filter(el => el.getType() === "Quiz");
generateQuestions(quizElements);

let points = 0;
let wrongAnswers = 0;
let currentQuiz = null;
const pressEPrompt = document.getElementById('press-e-prompt');
const quizModal = document.getElementById('quiz-modal');
const questionText = document.getElementById('question-text');
const optionBtns = document.querySelectorAll('.option-btn');

// event listeners buat quiz options
optionBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        if (currentQuiz) {
            const question = questions[currentQuiz.getQuestionId()];
            const isCorrect = index === question.correct;
            optionBtns.forEach((b, i) => {
                if (i === question.correct) {
                    b.classList.add('correct');
                } else if (i === index && !isCorrect) {
                    b.classList.add('incorrect');
                }
            });
            setTimeout(() => {
                if (isCorrect) {
                    points++;
                    if (points >= 3) {
                        alert("Congratulations! You've successfully escaped this maze. Go find the exit!");
                        // terus diapain lagi ininya?
                    }
                } else {
                    wrongAnswers++;
                    if (wrongAnswers >= 3) {
                        alert("Game Over! You have answered incorrectly 3 times.");
                        
                        location.reload(); // reset
                    }
                }
                currentQuiz.setStatus('completed');
                closeQuizModal();
            }, 1000);
        }
    });
});

document.addEventListener("keydown", (e) => {
    switch (e.code) {
        case "KeyW": move.forward = true; break;
        case "KeyS": move.backward = true; break;
        case "KeyA": move.left = true; break;
        case "KeyD": move.right = true; break;
        case "KeyE": 
            if (currentQuiz && currentQuiz.status === 'active') {
                openQuizModal(currentQuiz);
            }
            break;
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

// quiz functions
function openQuizModal(quiz) {
    if (points >= 3 || wrongAnswers >= 3) return;
    const question = questions[quiz.getQuestionId()];
    questionText.textContent = question.question;
    optionBtns.forEach((btn, index) => {
        btn.textContent = question.options[index];
        btn.classList.remove('correct', 'incorrect');
    });
    quizModal.style.display = 'block';
    controls.unlock();
}

function closeQuizModal() {
    quizModal.style.display = 'none';
    controls.lock();
    currentQuiz = null;
    pressEPrompt.style.display = 'none';
}

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

    // jarak ke gemstone nya
    let nearestQuiz = null;
    let minDistance = Infinity;
    for (const element of maze.elements) {
        if (element.getType() === "Quiz" && element.status === 'active') {
            const distance = cam.position.distanceTo(element.mesh.position);
            if (distance < 3 && distance < minDistance) {
                minDistance = distance;
                nearestQuiz = element;
            }
        }
    }
    // kalo udah jawab bener 3 soal, gabisa buka gemstone yg belum di jawab
    if (nearestQuiz && points < 3 && wrongAnswers < 3) {
        pressEPrompt.style.display = 'block';
        currentQuiz = nearestQuiz;
    } else {
        pressEPrompt.style.display = 'none';
        currentQuiz = null;
    }

    renderer.render(scene, cam);
    for (const element of maze.elements) {
        if (element.getType() === "Quiz") {
            element.update();
        }
    }
}

animate();