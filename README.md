# Internet Package DNET FE

Frontend untuk proyek Internet Package DNET yang dibuat dengan React, TypeScript, Vite, dan pnpm.

## Kebutuhan Sistem

Pastikan perangkat sudah memiliki:

- Node.js `^20.19.0` atau `>=22.12.0`
- pnpm

Rekomendasi versi Node: gunakan Node.js `22.x LTS` agar sesuai dengan kebutuhan Vite 8.

Untuk mengecek versi Node dan pnpm:

```bash
node -v
pnpm -v
```

Jika belum memiliki pnpm, install dengan:

```bash
npm install -g pnpm
```

Jika menggunakan `nvm`, contoh penggunaan Node 22:

```bash
nvm install 22
nvm use 22
```

## Cara Install Project

1. Clone repository:

```bash
git clone <url-repository>
```

2. Masuk ke folder project:

```bash
cd internet-package-dnet-fe
```

3. Install dependency:

```bash
pnpm install
```

## Cara Menjalankan Project di Local

Project ini membutuhkan dua proses saat development:

- frontend Vite
- mock API menggunakan `json-server`

Jalankan mock API:

```bash
pnpm server
```

Secara default mock API berjalan di:

```text
http://localhost:3001
```

Buka terminal baru, lalu jalankan frontend:

```bash
pnpm dev
```

Secara default frontend berjalan di:

```text
http://localhost:5173
```

## Script yang Tersedia

```bash
pnpm dev
```

Menjalankan development server Vite.

```bash
pnpm server
```

Menjalankan mock API dari file `db.json` di port `3001`.

```bash
pnpm build
```

Membuat build production.

```bash
pnpm preview
```

Menjalankan preview dari hasil build production.

```bash
pnpm lint
```

Menjalankan pengecekan lint.

## Build Production

Untuk membuat build production:

```bash
pnpm build
```

Hasil build akan tersedia di folder `dist`.
