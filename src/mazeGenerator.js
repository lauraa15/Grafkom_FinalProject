// menggunakan algoritma DFS untuk generate layout dari maze
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

    // fungsi untuk randomize arah pergerakan dfs
    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // buat jalan
    function path(x, y) {
        // buat start jadi kosong/path
        maze[x][y] = 0;

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
            const nx = x + direction.dx;
            const ny = y + direction.dy;


            if ((nx > 0) &&  // tidak keluar dari batas atas
                (ny > 0) && // tidak keluar dari batas kiri
                nx < rows - 1 && // tidak keluar dari batas bawah
                ny < cols - 1 && // tidak keluar dari batas kanan
                maze[nx][ny] === 1 // koordinat masih tembok
            ) {
                // buka tembok di antara x,y dan nx,ny
                maze[x + direction.dx / 2][y + direction.dy / 2] = 0;
                // lanjut ke koordinat baru
                path(nx, ny);
            }
        }
    }

    // start dari (1,1)
    path(1, 1);
    // end di (rows-2, cols-2)

    return maze;
}
