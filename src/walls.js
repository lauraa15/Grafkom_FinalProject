import Wall from "./wall.js";

export default class Walls {
    constructor() {
        this.walls = [];
    }

    addWall(wall) {
        this.walls.push(wall);
    }

    addToScene(scene) {
        this.walls.forEach(wall => wall.addToScene(scene));
    }

    generateMaze(layout, wallHeight, wallColor) {
        const wallWidth = 1;
        const wallDepth = 1;
        const offsetX = (layout[0].length * wallWidth) / 2;
        const offsetZ = (layout.length * wallDepth) / 2;    
        for (let i = 0; i < layout.length; i++) {
            for (let j = 0; j < layout[i].length; j++) {
                if (layout[i][j] === 1) {
                    const wall = new Wall(wallWidth, wallHeight, wallDepth, wallColor);
                    const posX = j * wallWidth - offsetX + wallWidth / 2;
                    const posZ = i * wallDepth - offsetZ + wallDepth / 2;
                    wall.setPosition(posX, wallHeight / 2, posZ);
                    this.addWall(wall);
                }
            }
        }
    }
}