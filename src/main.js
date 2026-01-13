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
// pake 1K texture supaya ga berat
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
// pake (...texture) biar pake attribute sesuai loader
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

// lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 100)
// pointLight.position.set(0, 20, 0)
// pointLight.castShadow = true
// scene.add(pointLight)

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 5);
// scene.add(pointLightHelper)

// flashlight
const flashlight = new THREE.SpotLight(0xffffff, 10);
flashlight.angle = Math.PI / 6; // cone angle
flashlight.penumbra = 0.3; // soft edges
flashlight.decay = 1.5;
flashlight.distance = 50;
flashlight.castShadow = true;
flashlight.shadow.mapSize.width = 1024;
flashlight.shadow.mapSize.height = 1024;
flashlight.shadow.camera.near = 0.5;
flashlight.shadow.camera.far = 50;

// target for the flashlight to point at
const flashlightTarget = new THREE.Object3D();
scene.add(flashlightTarget);
flashlight.target = flashlightTarget;

cam.add(flashlight);
flashlight.position.set(0, 0, 0); // at camera position
scene.add(cam); // add camera to scene so flashlight is rendered

let flashlightOn = true;

// maze genertae
const maze = new Maze();
const rows = 30; // lebar maze
const cols = 30; // panjang maze
const wall = { wallWidth: 2.5, wallHeight: 3, wallDepth: 2.5 }
const mazeLayout = generateMazeLayout(rows, cols);
const quizLayout = generateQuizLayout(mazeLayout, 8, rows / 2);
quizLayout[rows][cols - 1] = 0
maze.generateMaze(quizLayout, wall, bushMaterial, groundMaterial, gemMaterial);

// spawn player
const spawn = getRandomSpawn(mazeLayout, 2.5, 2.5);
console.log(spawn);

// controls
const controls = new PointerLockControls(cam, renderer.domElement);
const backsound = document.getElementById('backsound');

// game udah mulai or not
let gameStarted = false;

// mulai game dr awal
function startGame() {
    gameStarted = true;

    maze.addToScene(scene);
    cam.position.copy(spawn);
    document.addEventListener('click', handleGameClick);

    //backsound
    if (backsound.paused) {
        backsound.play().catch(error => {
            console.log("Audio error: ", error);
        });
    }

    loadHorrorMask();
    showClickToPlay();
}

//overlay start game
function showClickToPlay() {
    const overlay = document.createElement('div');
    overlay.id = 'click-to-play';
    overlay.innerHTML = '<p>Click anywhere to start playing</p>';
    overlay.style.cssText =
        `position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        cursor: pointer;`;
    overlay.querySelector('p').style.cssText =
        `color: white;
        font-size: 32px;
        font-family: 'Jolly Lodger', system-ui;`;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => {
        controls.lock();
        overlay.remove();
    });
}
// handle click to start game
function handleGameClick() {
    if (!gameStarted || menuActive) return;
    controls.lock();
    if (backsound.paused) {
        backsound.play().catch(error => {
            console.log("Audio error: ", error);
        });
    }
}

// menu
let menuActive = true;
const menuModal = document.getElementById('menu-modal');
const startBtn = document.getElementById('start-btn');

cam.position.set(0, 50, 0);
cam.lookAt(0, 0, 0);

// start btn buat mulai
startBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!menuActive) return;

    menuActive = false;
    menuModal.style.display = 'none';
    startGame();
});

// keyboard buat mulai
window.addEventListener('keydown', (e) => {
    if (!menuActive) return;
    if (e.code === 'Enter' || e.code === 'Space') {
        menuActive = false;
        menuModal.style.display = 'none';
        startGame();
    }
});
// move set
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
                    if (points >= 5) {
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

// load horror mask
const gltfLoader = new GLTFLoader();
let horrorMask = null;

function loadHorrorMask() {
    gltfLoader.load(
        "/models/horrorMask/horror_mask.glb",
        (gltf) => {
            horrorMask = gltf.scene;
            horrorMask.scale.set(200, 200, 200);

            horrorMask.position.set(0, 40, -cols - 75);

            horrorMask.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = false;
                }
            });

            scene.add(horrorMask);
        },
        undefined,
        (error) => {
            console.error("Failed to load Mask:", error);
        }
    );
}

const offsetX = (quizLayout[0].length * wall.wallWidth) / 2;
const offsetZ = (quizLayout.length * wall.wallDepth) / 2;
const posX = (rows-1) * wall.wallWidth - offsetX + wall.wallWidth / 2;
const posZ = cols * wall.wallDepth - offsetZ + wall.wallDepth / 2;
let door = null;
let actions = [];
let doorMixer = null;
let doorHitBox = null;
gltfLoader.load(
    "/models/door/door.glb",
    (gltf) => {
        door = gltf.scene;

        door.scale.set(2.5, 1.5, 2.5);
        door.position.set(posX, 0, posZ);

        door.traverse((obj) => {
            if (obj.isMesh) {
                obj.castShadow = true;
                obj.receiveShadow = true;
            }
        });
        scene.add(door);

        doorHitBox = new THREE.Box3();
        doorHitBox.setFromObject(door);
        doorHitBox.expandByScalar(0.3); 
        
        let doorAnimation = gltf.animations;
        doorMixer = new THREE.AnimationMixer(door);
        actions = doorAnimation.map((clip) => doorMixer.clipAction(clip));
        console.log("Door animations loaded:", actions);
    },
    undefined,
    (error) => {
        console.error("Failed to load door:", error);
    }
);

let shakeInterval = 10;
let shakeTimer = 0;
let isShaking = false;
let shakeDuration = 3;
let shakeElapsed = 0;

document.addEventListener("keydown", (e) => {
    if (!gameStarted || menuActive) return;

    switch (e.code) {
        case "KeyW": move.forward = true; break;
        case "KeyS": move.backward = true; break;
        case "KeyA": move.left = true; break;
        case "KeyD": move.right = true; break;
        case "KeyF":
            // toggle flashlight
            flashlightOn = !flashlightOn;
            flashlight.visible = flashlightOn;
            break;
        case "KeyE":
            if (currentQuiz && currentQuiz.status === 'active') {
                openQuizModal(currentQuiz);
            }
            break;
    }
});

document.addEventListener("keyup", (e) => {
    if (!gameStarted) return;

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

    if (!menuActive && gameStarted) {
        // Create a bounding sphere around player for door collision
        const playerSphere = new THREE.Sphere(cam.position, 0.4);
        
        updatePlayerMovement({
            cam,
            controls,
            move,
            speed: 5,
            delta,
            checkCollision: (pos) => {
                // Check maze collision
                if (checkCollision(pos)) return true;
                
                // Check door collision
                if (doorHitBox && doorHitBox.containsPoint(pos)) {
                    return true;
                }
                
                return false;
            }
        });

        // flaslight
        const direction = new THREE.Vector3();
        cam.getWorldDirection(direction);
        flashlightTarget.position.copy(cam.position).add(direction.multiplyScalar(10));

        // horror mask ngeliatin player
        if (horrorMask) {
            horrorMask.lookAt(cam.position);
        }

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

        for (const element of maze.elements) {
            if (element.getType() === "Quiz") {
                element.update();
            }
        }
    }


    shakeTimer += delta;

    if (doorMixer) {
        doorMixer.update(delta);
    }

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

    renderer.render(scene, cam);
}

animate();