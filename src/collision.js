// collision.js
import * as THREE from "three";

export function createCollisionChecker(maze, radius = 0.6, y = 1.7, doorCollider = null) {
    return function checkCollision(position) {
        const playerSphere = new THREE.Sphere(
            new THREE.Vector3(position.x, y, position.z),
            radius
        );

        // ga tabrak maze
        for (const element of maze.elements) {
            if (!element.hitbox) continue;
            if (element.hitbox.intersectsSphere(playerSphere)) {
                return true;
            }
        }
        
        // ga tabrak door
        if (doorCollider && doorCollider.doorBoundingBox) {
            if (doorCollider.doorBoundingBox.intersectsSphere(playerSphere)) {
                return true;
            }
        }
        
        return false;
    };
}