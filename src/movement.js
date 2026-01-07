// movement.js
import * as THREE from "three";

export function updatePlayerMovement({
    cam,
    controls,
    move,
    speed,
    delta,
    checkCollision
}) {
    const moveVector = new THREE.Vector3();

    const direction = new THREE.Vector3();
    controls.getDirection(direction);
    direction.y = 0;
    direction.normalize();

    // forward / backward
    if (move.forward) moveVector.add(direction);
    if (move.backward) moveVector.sub(direction);

    // left / right
    const right = new THREE.Vector3()
        .crossVectors(direction, cam.up)
        .normalize();

    if (move.right) moveVector.add(right);
    if (move.left) moveVector.sub(right);

    if (moveVector.length() === 0) return;

    moveVector.normalize().multiplyScalar(speed * delta);

    const nextPosition = cam.position.clone().add(moveVector);

    if (!checkCollision(nextPosition)) {
        cam.position.copy(nextPosition);
        return;
    }

    // sliding X
    const slideX = cam.position.clone();
    slideX.x += moveVector.x;
    if (!checkCollision(slideX)) {
        cam.position.x = slideX.x;
        return;
    }

    // sliding Z
    const slideZ = cam.position.clone();
    slideZ.z += moveVector.z;
    if (!checkCollision(slideZ)) {
        cam.position.z = slideZ.z;
    }
}
