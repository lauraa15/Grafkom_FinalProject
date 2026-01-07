// menggunakan algoritma DFS untuk generate layout dari maze

// fungsi untuk randomize arah pergerakan dfs
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function distance(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

export function generateMazeLayout(rows, cols) {
    // 0 = path, 1 = wall
    // rows & cols HARUS ganjil
    if (rows % 2 === 0) rows++;
    if (cols % 2 === 0) cols++;

    // / inisialisasi maze tembok
    const maze = [];
    for (let i = 0; i < rows; i++) {
        maze[i] = [];

        for (let j = 0; j < cols; j++) {
            maze[i][j] = 1;
        }
    }


    // buat jalan
    function path(x1, y1) {
        // buat start jadi kosong/path
        maze[x1][y1] = 0;

        // gerakan diacak supaya jalan lebih acak
        // pakai langkah 2 supaya ada tembok di antara jalannya
        const directions = shuffle([
            { dx: 0, dy: 2 },
            { dx: 0, dy: -2 },
            { dx: 2, dy: 0 },
            { dx: -2, dy: 0 },
        ]);

        // coba setiap arah
        for (const direction of directions) {
            // ambil koordinat 2 langkah di arah tersebut
            var x3 = x1 + direction.dx;
            var y3 = y1 + direction.dy;


            if ((x3 > 0) &&  // tidak keluar dari batas atas
                (y3 > 0) && // tidak keluar dari batas kiri
                x3 < rows - 1 && // tidak keluar dari batas bawah
                y3 < cols - 1 && // tidak keluar dari batas kanan
                maze[x3][y3] === 1 // koordinat masih tembok
            ) {
                // buka tembok di antara x1,y1 dan x3,y3
                var x2 = x1 + direction.dx / 2;
                var y2 = y1 + direction.dy / 2;
                maze[x2][y2] = 0;
                // lanjut ke koordinat baru
                path(x3, y3);
            }
        }
    }

    // start dari (1,1)
    path(1, 1);
    // end di (rows-2, cols-2)

    return maze;
}

export function generateQuizLayout(maze, quizCount, minDistance = 3) {
    const rows = maze.length;
    const cols = maze[0].length;

    const paths = [];
    const quizzes = [];

    for (let i = 1; i < rows - 1; i++) {
        for (let j = 1; j < cols - 1; j++) {
            if (maze[i][j] === 0) {
                paths.push({ x: i, y: j });
            }
        }
    }

    shuffle(paths);

    for (const cell of paths) {
        if (quizzes.length >= quizCount) break;

        let valid = true;

        for (const q of quizzes) {
            if (distance(cell, q) < minDistance) {
                valid = false;
                break;
            }
        }

        if (valid) {
            maze[cell.x][cell.y] = 2;
            quizzes.push(cell);
        }
    }

    return maze;
}

