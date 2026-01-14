# 🎮 Entity 404 - 3D Horror Maze Game

![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

> **"Find your way out... if you can."**

Entity 404 adalah game labirin 3D bertema horor yang dibuat menggunakan **Three.js**. Pemain harus menavigasi labirin yang gelap, mengumpulkan gem, dan menjawab pertanyaan trivia untuk bertahan hidup. Tapi hati-hati... sesuatu sedang mengawasimu.

---

## 📸 Preview

```
┌─────────────────────────────────────┐
│           ENTITY 404                │
│      Find your way out...           │
│                                     │
│          ▶ START GAME              │
│                                     │
│    WASD - Move | Mouse - Look       │
│           E - Interact              │
└─────────────────────────────────────┘
```

---

## ✨ Fitur

- 🏰 **Procedurally Generated Maze** - Labirin dibuat secara prosedural setiap kali bermain
- 🔦 **Flashlight System** - Senter dinamis untuk menerangi jalan dalam kegelapan
- 💎 **Quiz Gems** - Kumpulkan gem dan jawab pertanyaan trivia
- 👻 **Horror Atmosphere** - Atmosfer mencekam dengan model 3D menakutkan
- 🎵 **Immersive Audio** - Background music yang menambah suasana horor
- 🎯 **First-Person Controls** - Kontrol orang pertama yang responsif
- 🌟 **PBR Materials** - Material berbasis fisik dengan tekstur realistis

---

## 🎯 Cara Bermain

1. **Tujuan**: Jawab **3 pertanyaan dengan benar** untuk menang
2. **Navigasi**: Jelajahi labirin dan temukan gem berwarna hijau
3. **Interaksi**: Tekan **E** saat dekat gem untuk menjawab pertanyaan
4. **Perhatian**: Jika salah menjawab **3 kali**, kamu kalah!

### Kontrol

| Key | Action |
|-----|--------|
| `W` | Maju |
| `A` | Kiri |
| `S` | Mundur |
| `D` | Kanan |
| `Mouse` | Melihat sekitar |
| `E` | Interaksi dengan gem |
| `Click` | Lock pointer |

---

## 🛠️ Teknologi

- **[Three.js](https://threejs.org/)** - Library 3D JavaScript
- **[Vite](https://vitejs.dev/)** - Build tool dan dev server
- **GLTF/GLB** - Format model 3D
- **PBR Textures** - Tekstur berbasis fisik (Color, Normal, Roughness, AO, Displacement)

---

## 📁 Struktur Project

```
Grafkom_FinalProject/
├── public/
│   ├── models/
│   │   └── horrorMask/      # Model 3D horror mask
│   ├── sounds/              # Audio files
│   └── textures/
│       ├── bush/            # Tekstur dinding labirin
│       ├── gem/             # Tekstur gem
│       └── ground/          # Tekstur lantai
├── src/
│   ├── main.js              # Entry point & game loop
│   ├── maze.js              # Kelas maze manager
│   ├── mazeGenerator.js     # Generator labirin prosedural
│   ├── wall.js              # Kelas dinding
│   ├── ground.js            # Kelas lantai
│   ├── quiz.js              # Kelas quiz/gem
│   ├── quizData.js          # Data pertanyaan trivia
│   ├── collision.js         # Sistem collision detection
│   ├── movement.js          # Sistem pergerakan player
│   ├── spawn.js             # Sistem spawn point
│   └── loader.js            # Texture loader utility
├── index.html               # HTML utama
├── styles.css               # Styling UI
├── package.json             # Dependencies
└── README.md
```

---

## 🚀 Instalasi & Menjalankan

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 atau lebih baru)
- npm atau yarn

### Langkah Instalasi

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd Grafkom_FinalProject
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Jalankan development server**
   ```bash
   npx vite
   ```

4. **Buka browser**
   ```
   http://localhost:5173
   ```

### Build untuk Production

```bash
npx vite build
```

---

## 🎨 Assets

### Tekstur
- **Bush** - Grass001_1K untuk dinding labirin
- **Ground** - PavingStones139_1K untuk lantai
- **Gem** - Gem_1K untuk quiz gems

### Model 3D
- **Horror Mask** - Model GLB untuk elemen horor

### Audio
- **Background Sound** - Musik ambient horor
---

## 🎲 Sistem Quiz

Game ini memiliki sistem quiz dengan pertanyaan trivia dari berbagai kategori:
- 🌍 Geografi
- 📚 Sejarah
- 🎬 Entertainment
- 🔬 Sains

Setiap gem di labirin berisi satu pertanyaan. Jawab dengan benar untuk mendapatkan poin!

---

## 👥 Tim Pengembang

| NIM | Nama |
|---------|--------|
| 2372020 | Denzel |
| 2372060 | Cecil  |
| 2372061 | Laura  |

**Mata Kuliah**: Grafika Komputer  
**Final Project**

---

## 📝 Lisensi

Project ini dibuat untuk keperluan akademis - Final Project Grafika Komputer.

---

## 🙏 Acknowledgments

- [Three.js](https://threejs.org/) untuk library 3D yang luar biasa
- [Vite](https://vitejs.dev/) untuk development experience yang cepat
- [ambientCG](https://ambientcg.com/) untuk tekstur PBR gratis
- [Sketchfab](https://sketchfab.com/) untuk model 3D
- [Poly Pizza](https://poly.pizza/) untuk model 3D
- [Aleksandar Zavisin](https://youtu.be/U2VquHtBaVw?si=Yx1d5VzoboBhG6NL) untuk backsound horror

---

<p align="center">
  <b>🎮 Selamat bermain dan semoga berhasil keluar dari labirin! 👻</b>
</p>
