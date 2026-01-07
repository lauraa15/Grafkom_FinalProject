// collision.js
import * as THREE from "three";

export function createCollisionChecker(walls, radius = 0.6, y = 1.7) {
    return function checkCollision(position) {
        const playerSphere = new THREE.Sphere(
            new THREE.Vector3(position.x, y, position.z),
            radius
        );

        for (const wall of walls.walls) {
            if (wall.hitbox.intersectsSphere(playerSphere)) {
                return true;
            }
        }
        return false;
    };
}
