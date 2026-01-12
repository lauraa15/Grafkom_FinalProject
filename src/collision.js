// collision.js
import * as THREE from "three";

export function createCollisionChecker(maze, radius = 0.6, y = 1.7) {
    return function checkCollision(position) {
        const playerSphere = new THREE.Sphere(
            new THREE.Vector3(position.x, y, position.z),
            radius
        );

        for (const element of maze.elements) {
            if (!element.hitbox) continue;
            if (element.hitbox.intersectsSphere(playerSphere)) {
                return true;
            }
        }
        return false;
    };
}