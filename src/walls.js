import Wall from "./wall.js";

// class untuk mengelola banyak wall
export default class Walls {
    // array untuk menyimpan wall
    constructor() {
        this.walls = [];
    }

    // menambahkan wall ke array
    addWall(wall) {
        this.walls.push(wall);
    }

    // menambahkan semua wall ke scene
    addToScene(scene) {
        this.walls.forEach(wall => wall.addToScene(scene));
    }

    // generate maze dari layout 
    generateMaze(layout, wallHeight, wallColor) {
        // ukuran wall
        const wallWidth = 1.2;
        const wallDepth = 1.2;

        // menengahka maze ke tengah scene
        const offsetX = (layout[0].length * wallWidth) / 2;
        const offsetZ = (layout.length * wallDepth) / 2;    

        // buat wall sesuai layout
        for (let i = 0; i < layout.length; i++) {
            for (let j = 0; j < layout[i].length; j++) {

                // cek di posisi i,j ada wall atau tidak (1 = wall, 0 = path)
                if (layout[i][j] === 1) {
                    const wall = new Wall(wallWidth, wallHeight, wallDepth, wallColor);

                    // set posisi wall sesuai grid
                    const posX = j * wallWidth - offsetX + wallWidth / 2;
                    const posZ = i * wallDepth - offsetZ + wallDepth / 2;
                    
                    wall.setPosition(posX, wallHeight / 2, posZ);
                    this.addWall(wall);
                }
            }
        }
    }
}