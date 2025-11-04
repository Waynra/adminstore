# Store Admin CRUD

Aplikasi admin toko sederhana yang dibangun dengan Node.js, Express, dan MySQL. Aplikasi ini menyediakan fungsi CRUD (Create, Read, Update, Delete) untuk manajemen produk dan pembelian.

## Fitur

- Dashboard dengan tampilan total produk dan total pembelian aktif
- Manajemen Produk (CRUD)
- Manajemen Pembelian
- Monitoring Stok
- Interface yang user-friendly dengan EJS template
- Styling dengan CSS

## Teknologi yang Digunakan

- Node.js
- Express.js
- MySQL
- EJS (Embedded JavaScript templates)
- Body Parser
- CSS untuk styling

## Prasyarat

Sebelum menjalankan aplikasi ini, pastikan Anda telah menginstall:

- Node.js
- MySQL Server
- npm (Node Package Manager)

## Instalasi

1. Clone repository ini:

```bash
git clone [url-repository]
cd store-admin-crud
```

2. Install dependencies:

```bash
npm install
```

3. Konfigurasi database:

   - Buat database MySQL
   - Sesuaikan konfigurasi database di file `config/db.js`

4. Jalankan aplikasi:

```bash
npm start
```

Aplikasi akan berjalan di `http://localhost:3000`

## Struktur Folder

```
store-admin-crud/
├── app.js                # File utama aplikasi
├── package.json          # Dependencies dan konfigurasi project
├── config/
│   └── db.js            # Konfigurasi database
├── public/
│   └── style.css        # File CSS untuk styling
└── views/               # Template EJS
    ├── layout.ejs       # Layout utama
    ├── dashboard.ejs    # Halaman dashboard
    ├── produk.ejs      # Halaman daftar produk
    ├── add-produk.ejs  # Form tambah produk
    ├── edit-produk.ejs # Form edit produk
    ├── pembelian.ejs   # Halaman pembelian
    ├── add-purchase.ejs# Form tambah pembelian
    └── stock.ejs       # Halaman monitoring stok
```

## Fitur Utama

1. **Dashboard**

   - Menampilkan total produk
   - Menampilkan total pembelian aktif

2. **Manajemen Produk**

   - Melihat daftar produk
   - Menambah produk baru
   - Mengubah data produk
   - Menghapus produk

3. **Manajemen Pembelian**

   - Mencatat pembelian baru
   - Melihat riwayat pembelian
   - Mengubah status pembelian

4. **Monitoring Stok**
   - Melihat stok produk
   - Tracking perubahan stok

## Kontribusi

Jika Anda ingin berkontribusi pada project ini, silakan:

1. Fork repository
2. Buat branch baru (`git checkout -b fitur-baru`)
3. Commit perubahan (`git commit -m 'Menambah fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

## Lisensi

[MIT License](LICENSE)
