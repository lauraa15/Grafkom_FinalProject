import * as THREE from "three";

// scene
const scene = new THREE.Scene();
// cam
const cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100);

// Move camera to see a box corner
cam.position.set(10, 10, 10);
cam.lookAt(0, 0, 0);

// render
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// loaders
const textureLoader = new THREE.TextureLoader();
// Use correct relative path for dev server/public folder
const grassColorMap = textureLoader.load('Grass006_1K-PNG/Grass006_1K-PNG_Color.png');
const grassRoughnessMap = textureLoader.load('Grass006_1K-PNG/Grass006_1K-PNG_Roughness.png');
const grassNormalMap = textureLoader.load('Grass006_1K-PNG/Grass006_1K-PNG_NormalGL.png');
const grassAOMap = textureLoader.load('Grass006_1K-PNG/Grass006_1K-PNG_AmbientOcclusion.png');
const grassDisplacementMap = textureLoader.load('Grass006_1K-PNG/Grass006_1K-PNG_Displacement.png');

// Tile/repeat the grass textures for a more natural look
[grassColorMap, grassRoughnessMap, grassNormalMap, grassAOMap, grassDisplacementMap].forEach(tex => {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 2); // Adjust tiling as needed
});

const grassMaterial = new THREE.MeshStandardMaterial({
    map: grassColorMap,
    roughnessMap: grassRoughnessMap,
    normalMap: grassNormalMap,
    aoMap: grassAOMap,
    displacementMap: grassDisplacementMap,
    displacementScale: 0.05, 
    roughness: 2.0,
    metalness: 0.0,
});

// Use fewer segments for sharp corners
const boxGeometry = new THREE.BoxGeometry(5, 5, 5, 8, 8, 8);
// Ensure geometry has uv2 for aoMap/displacementMap
if (!boxGeometry.attributes.uv2) {
    boxGeometry.setAttribute('uv2', new THREE.BufferAttribute(boxGeometry.attributes.uv.array, 5));
}
const box = new THREE.Mesh(boxGeometry, grassMaterial);
scene.add(box);

// Add grid helper for orientation
const gridHelper = new THREE.GridHelper(20, 20);
scene.add(gridHelper);

// lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 20, 10); // Angle the light for better shading
scene.add(directionalLight);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Slightly brighter ambient
scene.add(ambientLight);
// light helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(directionalLightHelper);

function animate() {
    // box.rotation.y += 0.01;
    renderer.render(scene, cam);
    requestAnimationFrame(animate);
}
animate();