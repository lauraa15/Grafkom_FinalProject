import Wall from "./wall.js";
import Quiz from "./quiz.js";

// class untuk mengelola banyak wall
export default class Maze {
    // array untuk menyimpan wall
    constructor() {
        this.elements = [];
    }

    // menambahkan wall ke array
    addWall(wall) {
        this.elements.push(wall);
    }

    // menambahkan semua wall ke scene
    addToScene(scene) {
        this.elements.forEach(element => element.addToScene(scene));
    }

    // generate maze dari layout 
    generateMaze(layout, wallHeight, material) {
        // ukuran wall
        const wallWidth = 2.5;
        const wallDepth = 2.5;

        // menengahkan maze ke tengah scene
        const offsetX = (layout[0].length * wallWidth) / 2;
        const offsetZ = (layout.length * wallDepth) / 2;    

        // buat wall sesuai layout
        for (let i = 0; i < layout.length; i++) {
            for (let j = 0; j < layout[i].length; j++) {

                // cek di posisi i,j (1 = wall, 0 = path, 2 = quiz)
                if (layout[i][j] === 1) {
                    // buat wall
                    const wall = new Wall(wallWidth, wallHeight, wallDepth, material);
                    
                    // set posisi wall sesuai grid
                    const posX = j * wallWidth - offsetX + wallWidth / 2;
                    const posZ = i * wallDepth - offsetZ + wallDepth / 2;
                    
                    wall.setPosition(posX, wallHeight / 2, posZ);
                    this.addWall(wall);
                }
                else if (layout[i][j] === 2) { 
                    // buat quiz 
                    const quiz = new Quiz(0.5, 0x00ff00);
                    const posX = j * wallWidth - offsetX + wallWidth / 2;
                    const posZ = i * wallDepth - offsetZ + wallDepth / 2;
                    quiz.setPosition(posX, 1, posZ);
                    this.addWall(quiz);
                }
            }
        }
    }
}