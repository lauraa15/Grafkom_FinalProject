import * as THREE from "three";
export default class Quiz {
    constructor(size, gemMaterial) {
        // bentuk gemstone
        // nanti diubah scroll
        const geometry = new THREE.OctahedronGeometry(size);
        this.mesh = new THREE.Mesh(geometry, gemMaterial);
        const edgesGeometry = new THREE.EdgesGeometry(geometry);

        // material garis (bisa disesuaikan warnanya)
        const edgeMaterial = new THREE.LineBasicMaterial({
            color: 0x38c811,
            transparent: true,
            opacity: 0.3,
            linewidth: 5
        });
        // bikin line dari edges
        this.edge = new THREE.LineSegments(edgesGeometry, edgeMaterial);

        // sedikit lebih besar biar gak z-fighting
        this.edge.scale.set(1.01, 1.01, 1.01);

        // tempelin ke mesh
        this.mesh.add(this.edge);
        
        // lampu supaya keliatan glowing
        this.light = new THREE.PointLight(gemMaterial.emissive, 2, 5);
        this.light.position.set(0, 1, 0);
        this.mesh.add(this.light);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        // status quiz (active/inactive/completed)
        // active = scroll muncul, inactive = scroll tidak muncul, completed = scroll transparan
        this.status = 'active';

        // set animasi
        this.baseY = this.mesh.position.y;
        this.speed = 0.0025;
        this.maxY = this.baseY + 1;
        this.minY = this.baseY;
        this.direction = 1;
    }

    setPosition(x, y, z) {
        this.mesh.position.set(x, y, z);
        this.baseY = this.mesh.position.y
        this.maxY = this.baseY + 0.1;
        this.minY = this.baseY - 0.2;
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

    update() {
        this.mesh.position.y += this.speed * this.direction

        if ((this.mesh.position.y >= this.maxY) || (this.mesh.position.y <= this.minY)) {
            this.direction *= -1
        }

        this.mesh.rotation.y += 0.01;
    }
}
