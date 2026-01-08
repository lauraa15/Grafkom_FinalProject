import * as THREE from "three";
export default class Ground {
    constructor(width, height, material) {
        const geometry = new THREE.PlaneGeometry(width, height);
        geometry.setAttribute('uv2', new THREE.BufferAttribute(geometry.attributes.uv.array, 2));
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.receiveShadow = true;
        this.hitbox = new THREE.Box3().setFromObject(this.mesh);
        this.mesh.rotation.x = -Math.PI / 2
    }

    setPosition(x, y, z) {
        this.mesh.position.set(x, y, z);
    }

    addToScene(scene) {
        scene.add(this.mesh);
    }
}