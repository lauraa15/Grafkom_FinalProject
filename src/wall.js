import * as THREE from "three";
export default class Wall {
    // buat wall dengan ukuran dan warna dari parameter
    // width = lebar, height = tinggi, depth = panjang (kedalaman)
    constructor(width, height, depth, color) {
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const material = new THREE.MeshBasicMaterial({ color: color });
        this.mesh = new THREE.Mesh(geometry, material);
        this.hitbox = new THREE.Box3().setFromObject(this.mesh);
    }

    setPosition(x, y, z) {
        this.mesh.position.set(x, y, z);
    }

    addToScene(scene) {
        scene.add(this.mesh);
    }
}