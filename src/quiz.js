import * as THREE from "three";
import Ground from "./ground";
export default class Quiz {
    constructor(size, color, groundWidth, groundHeight, groundMaterial) {
        // bentuk gemstone
        // nanti diubah scroll
        const geometry = new THREE.OctahedronGeometry(size);
        const material = new THREE.MeshBasicMaterial({ color: color });
        this.mesh = new THREE.Mesh(geometry, material);

        // lampu supaya keliatan glowing
        this.light = new THREE.PointLight(color, 1, 6);
        this.light.position.set(0, 1, 0);
        this.mesh.add(this.light);

        // status quiz (active/inactive/completed)
        // active = scroll muncul, inactive = scroll tidak muncul, completed = scroll transparan
        this.status = 'active';
    }

    setPosition(x, y, z) {
        this.mesh.position.set(x, y, z);
    }

    // buat ganti status quiz
    setStatus(status) {
        this.status = status;
    }

    addToScene(scene) {
        scene.add(this.mesh);
    }
}
