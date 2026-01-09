import * as THREE from "three";
import Ground from "./ground";
export default class Quiz {
    constructor(size, gemMaterial) {
        // bentuk gemstone
        // nanti diubah scroll
        const geometry = new THREE.OctahedronGeometry(size);
        this.mesh = new THREE.Mesh(geometry, gemMaterial);
        this.mesh.castShadow = true;

        // lampu supaya keliatan glowing
        this.light = new THREE.PointLight(gemMaterial.emissive, 2, 5);
        this.light.position.set(0, 1, 0);
        this.mesh.add(this.light);

        // status quiz (active/inactive/completed)
        // active = scroll muncul, inactive = scroll tidak muncul, completed = scroll transparan
        this.status = 'active';

        // set animasi
        this.baseY = this.mesh.position.y
        this.floatAmplitude = 0.1;
        this.floatSpeed = 1;
        this.offset = Math.random() * Math.PI * 2;
    }

    setPosition(x, y, z) {
        this.mesh.position.set(x, y, z);
        this.baseY = this.mesh.position.y
    }

    getType() {
        return "Quiz"
    }

    // buat ganti status quiz
    setStatus(status) {
        this.status = status;
    }

    addToScene(scene) {
        scene.add(this.mesh);
    }

    update(time) {
        this.mesh.position.y = this.baseY + Math.sin(time * this.floatSpeed + this.offset) * this.floatAmplitude;

        this.mesh.rotation.y += 0.01;
    }
}
