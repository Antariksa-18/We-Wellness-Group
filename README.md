# We Wellness Group — Operation Monitoring

Dashboard operasional untuk menghubungkan Manajemen, Customer Service, Personal Trainer (PT), Fitness Consultant (FC), dan Klien. Fitur mencakup ringkasan KPI, progress klien, jadwal sesi, aktivitas tim, dan tindak lanjut.

## Struktur aplikasi

- `client/` — React + Vite dashboard.
- `server/` — Express API, PostgreSQL schema, dan contoh data.

## Menjalankan dashboard

```bash
cd client
npm install
npm run dev
```

Dashboard menggunakan data contoh agar dapat langsung dipreview.

## Menjalankan API

```bash
cd server
npm install
cp .env.example .env
# Isi DATABASE_URL di .env, lalu jalankan schema.sql pada PostgreSQL.
npm run dev
```

API menyediakan endpoint ringkasan operasional, daftar klien, detail progress, sesi PT, dan pencatatan update progress. Lindungi endpoint dengan autentikasi dan otorisasi sebelum dipakai di lingkungan produksi.
