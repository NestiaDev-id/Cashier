# SCAPA POS

**Smart Cashier and Point-of-Sales Application**

![SCAPA Logo](assets/scapa-logo.png) <!-- Ganti dengan logo atau hapus jika belum ada -->

---

## 🧾 What is SCAPA?

**SCAPA POS** adalah aplikasi kasir modern yang dirancang untuk kebutuhan toko skala kecil hingga menengah. SCAPA menyediakan dua peran utama: **Penjual** (kasir) dan **Pemilik** (owner), masing-masing dengan fitur yang disesuaikan. Aplikasi ini bertujuan untuk menyederhanakan proses transaksi, memantau penjualan, dan memberikan kontrol penuh kepada pemilik usaha atas aktivitas kasir mereka.

---

## 🎯 Key Features

- 🔐 **Role-based Access**
  - **Penjual**: melakukan transaksi penjualan, cetak struk, dan pengelolaan produk terbatas.
  - **Pemilik**: mengelola semua data, memantau aktivitas penjualan, serta menambah atau menghapus kasir.

- 📦 **Manajemen Produk & Stok**
  - Tambah, edit, dan hapus produk secara langsung.
  - Pantau ketersediaan stok dengan notifikasi minimum.

- 📊 **Laporan Penjualan Real-time**
  - Statistik harian, mingguan, dan bulanan.
  - Ekspor laporan ke format CSV atau PDF *(fitur opsional)*.

- 💡 **Interface Modern & Cepat**
  - Menggunakan ViteJS untuk antarmuka yang ringan dan responsif.

---

## 🛠️ Tech Stack

| Layer       | Teknologi               |
|-------------|-------------------------|
| Frontend    | **ViteJS** (React/TS)   |
| Backend     | **Express.js** (NodeJS) |
| Database    | **MongoDB**             |

---

## 🚀 Getting Started

Ikuti langkah-langkah berikut untuk menjalankan SCAPA POS secara lokal:

### 1. Clone Repository

```bash
git clone https://github.com/username/scapa-pos.git
cd scapa-pos
```

### 2. Jalankan backend
```bash
cd backend
npm install
npm run dev
```
Pastikan MongoDB sudah terinstall dan berjalan di mongodb://localhost:3000.
### 3. Jalankan frontend

```bash
cd frontend
npm install
npm run dev
```
Aplikasi frontend akan berjalan di http://localhost:5173
