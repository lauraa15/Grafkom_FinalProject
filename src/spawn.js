// spawn.js
import * as THREE from "three";

export function getRandomSpawn(layout, wallWidth, wallDepth, y = 1.7) {
    const paths = [];

    for (let i = 0; i < layout.length; i++) {
        for (let j = 0; j < layout[i].length; j++) {
            if (layout[i][j] === 0) {
                paths.push({ i, j });
            }
        }
    }

    const cell = paths[Math.floor(Math.random() * paths.length)];

    const offsetX = (layout[0].length * wallWidth) / 2;
    const offsetZ = (layout.length * wallDepth) / 2;

    return new THREE.Vector3(
        cell.j * wallWidth - offsetX + wallWidth / 2,
        y,
        cell.i * wallDepth - offsetZ + wallDepth / 2
    );
}
