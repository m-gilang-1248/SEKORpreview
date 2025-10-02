# Aplikasi Papan Skor Pribadi

Aplikasi ini adalah alat bantu sederhana namun fungsional untuk membuat dan mencatat skor pertandingan olahraga pribadi Anda secara manual. Lupakan kertas dan pensil, catat skor Futsal, Basket, atau Bulu Tangkis Anda dengan mudah melalui papan skor interaktif dan simpan riwayatnya.

## Fitur Utama

- **Pilih Olahraga**: Pilih dari berbagai genre olahraga yang didukung (Futsal, Tenis Meja, Bulu Tangkis, Voli, Basket).
- **Setup Pertandingan**: Masukkan nama tim yang akan bertanding sebelum memulai.
- **Papan Skor Interaktif**: Ubah skor secara dinamis dengan tombol `+` dan `-`, serta kelola timer pertandingan (mulai/jeda).
- **Riwayat Pertandingan**: Semua pertandingan yang telah selesai akan tersimpan secara otomatis, lengkap dengan skor akhir, tanggal, dan durasi.
- **Desain Modern**: Antarmuka yang bersih, responsif, dan dikemas dalam mockup bingkai ponsel untuk pengalaman yang imersif.

---

## Tampilan Aplikasi

Berikut adalah pratinjau dari masing-masing halaman utama dalam aplikasi:

### 1. Halaman Beranda (Home)
Halaman utama tempat pengguna memilih jenis olahraga yang ingin dimainkan. Terdapat header dengan informasi aplikasi dan avatar pengguna, serta daftar olahraga yang disajikan dalam bentuk kartu yang menarik.

### 2. Halaman Setup Pertandingan (Match Setup)
Setelah memilih olahraga, pengguna akan diarahkan ke halaman ini untuk memasukkan nama kedua tim yang akan bertanding.

### 3. Halaman Papan Skor (Scoreboard)
Ini adalah halaman inti tempat pencatatan skor berlangsung. Pengguna dapat menambah atau mengurangi skor untuk masing-masing tim, mengontrol timer, dan mengakhiri pertandingan. Terdapat juga petunjuk perhitungan poin sesuai genre olahraga yang dipilih.

### 4. Halaman Riwayat (History)
Menampilkan daftar semua pertandingan yang telah diselesaikan. Setiap entri menunjukkan tim yang bertanding, skor akhir, tanggal, dan durasi pertandingan.

### 5. Halaman Detail Riwayat (History Detail)
Menampilkan ringkasan statis dari satu pertandingan yang dipilih dari halaman riwayat.

### 6. Halaman Pengaturan (Settings)
Halaman untuk konfigurasi aplikasi, seperti mode tampilan (contoh) dan informasi langganan (placeholder).

---

## Cara Menjalankan Proyek

Proyek ini adalah aplikasi web statis yang dibuat dengan React dan TypeScript, sehingga tidak memerlukan proses _build_ yang kompleks untuk menjalankannya. Anda hanya perlu menyajikan file-file ini menggunakan server web lokal.

**Prasyarat:**
- Anda memiliki [Node.js](https://nodejs.org/) terinstal (untuk menggunakan `npx`).

**Langkah-langkah:**

1.  **Buka Terminal**
    Buka terminal atau command prompt Anda dan arahkan ke direktori utama proyek ini (folder yang berisi file `index.html`).

2.  **Jalankan Server Lokal**
    Cara termudah adalah menggunakan paket `serve`. Jalankan perintah berikut di terminal:
    ```bash
    npx serve .
    ```
    Perintah ini akan secara otomatis mengunduh paket `serve` (jika belum ada) dan menjalankannya di direktori saat ini.

3.  **Buka di Browser**
    Setelah server berjalan, terminal akan menampilkan alamat URL lokal, biasanya seperti `http://localhost:3000`. Buka alamat tersebut di browser web Anda untuk melihat aplikasi berjalan.

---

## Struktur Proyek

```
.
├── components/          # Komponen UI yang dapat digunakan kembali
│   ├── icons/           # Komponen ikon SVG
│   └── BottomNavBar.tsx # Komponen navigasi bawah
├── screens/             # Komponen untuk setiap halaman/layar aplikasi
│   ├── HomeScreen.tsx
│   ├── MatchSetupScreen.tsx
│   ├── ScoreboardScreen.tsx
│   ├── HistoryScreen.tsx
│   ├── HistoryDetailScreen.tsx
│   └── SettingsScreen.tsx
├── App.tsx              # Komponen utama yang mengatur state dan navigasi
├── data.ts              # Data statis aplikasi (daftar olahraga)
├── types.ts             # Definisi tipe TypeScript
├── index.html           # File HTML utama (entry point)
├── index.tsx            # Skrip utama untuk me-render aplikasi React
└── README.md            # Dokumentasi ini
```
