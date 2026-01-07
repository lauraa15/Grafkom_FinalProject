import * as THREE from "three";

export default class Quiz {
    constructor(size, color) {
        // bentuk gemstone
        const geometry = new THREE.OctahedronGeometry(size);
        const material = new THREE.MeshBasicMaterial({ color: color });
        this.mesh = new THREE.Mesh(geometry, material);

        // lampu supaya keliatan glowing
        this.light = new THREE.PointLight(color, 1, 6);
        this.light.position.set(0, 1, 0);
        this.mesh.add(this.light);
    }

    setPosition(x, y, z) {
        this.mesh.position.set(x, y, z);
    }

    addToScene(scene) {
        scene.add(this.mesh);
    }
}
