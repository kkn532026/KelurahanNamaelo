# 🏛️ Website Kelurahan Namaelo

**Portal Resmi Informasi & Layanan Publik**  
Kelurahan Namaelo · Kecamatan Kota Masohi · Kabupaten Maluku Tengah · Maluku

---

## 📋 Deskripsi

Website statis (HTML, CSS, JavaScript murni) untuk Kelurahan Namaelo. Dirancang dengan tampilan modern, mobile-first, dan bernuansa Maluku (biru laut, hijau tropis, emas hangat).

### Data Resmi Kelurahan Namaelo
- **Berdiri sejak:** 2 September 1981 (kelurahan tertua di Kec. Kota Masohi)
- **Luas wilayah:** 16,67 km² (44,69% dari 37,30 km² Kec. Kota Masohi)
- **Penduduk:** 17.050 jiwa (L: 8.254, P: 8.796)
- **Jumlah KK:** 2.733 KK
- **Jumlah RT:** 20 Rukun Tetangga
- **Koordinat:** 03°17′06″–03°18′04″ LS, 128°57′02″–128°57′03″ BT
- **Batas:** U=Kel. Ampera, S=Tanah Negara, T=Kel. Letwaru, B=Kel. Namasina
- **Kode Pos:** 97511
- **Jarak:** 0,3 km ke ibu kota kecamatan, 1 km ke ibu kota kabupaten, 106 km ke Ambon

### Fitur Utama
- ✅ Desain responsif (HP, tablet, desktop)
- ✅ Dark mode dengan toggle
- ✅ Navbar sticky dengan hamburger menu (mobile)
- ✅ Animasi fade-in saat scroll
- ✅ Hero section dengan statistik animasi
- ✅ Profil kelurahan lengkap (sejarah, visi misi, batas wilayah)
- ✅ Struktur pemerintahan dengan kartu pejabat
- ✅ Layanan publik (accordion dengan persyaratan & alur)
- ✅ Berita & pengumuman dengan modal detail
- ✅ Potensi wilayah (perikanan, pertanian, UMKM, budaya)
- ✅ Galeri foto dengan lightbox dan filter kategori
- ✅ Formulir pengaduan (diteruskan ke WhatsApp)
- ✅ Peta Google Maps embed
- ✅ SEO dasar + Open Graph

---

## 🚀 Cara Menjalankan

### Cara 1 — Langsung buka file (paling mudah)
```
Klik dua kali → index.html
```
> ⚠️ Beberapa browser (terutama Chrome) membatasi `fetch()` dari file lokal. Gunakan server lokal agar data JSON termuat dengan benar.

### Cara 2 — Dengan Live Server (VS Code)
1. Install ekstensi **Live Server** di VS Code
2. Klik kanan `index.html` → **"Open with Live Server"**
3. Browser akan membuka `http://127.0.0.1:5500`

### Cara 3 — Python HTTP Server
```bash
# Di folder proyek ini:
python -m http.server 8000
# Buka: http://localhost:8000
```

### Cara 4 — Node.js (npx serve)
```bash
npx serve .
# atau
npx http-server .
```

---

## 📁 Struktur Proyek

```
web kelurahan namaelo/
│
├── index.html              ← Halaman utama (single page)
├── README.md               ← Dokumentasi ini
│
├── css/
│   └── style.css           ← Semua gaya (CSS custom properties, responsive, dark mode)
│
├── js/
│   └── main.js             ← Semua logika (render data, animasi, accordion, lightbox, dll)
│
├── data/                   ← File JSON konten yang mudah diedit
│   ├── perangkat.json      ← Data lurah, sekretaris, kasi, RT/RW
│   ├── berita.json         ← Daftar berita & pengumuman
│   ├── layanan.json        ← Layanan publik (persyaratan & alur)
│   ├── potensi.json        ← Potensi wilayah
│   └── galeri.json         ← Foto galeri
│
└── assets/
    └── img/                ← Tempatkan foto-foto asli di sini
        ├── lurah.jpg
        ├── sekretaris.jpg
        ├── kasi1.jpg ... kasi4.jpg
        └── (foto lainnya)
```

---

## ✏️ Cara Mengedit Konten

### 1. Ganti Data Perangkat Kelurahan
Edit file `data/perangkat.json`:
```json
{
  "lurah": {
    "nama": "Drs. Ahmad Basir, M.Si",   ← Ganti nama asli
    "jabatan": "Lurah Namaelo",
    "sambutan": "Teks sambutan lurah..."
  }
}
```

### 2. Tambah Berita
Edit file `data/berita.json`, tambah objek baru:
```json
{
  "id": 7,
  "judul": "Judul berita baru",
  "ringkasan": "Ringkasan singkat berita...",
  "isi": "Isi lengkap berita...",
  "tanggal": "2026-11-01",
  "kategori": "Kegiatan",
  "foto": "assets/img/berita7.jpg"
}
```

### 3. Tambah/Ubah Layanan
Edit file `data/layanan.json`. Setiap layanan memiliki:
- `syarat`: array persyaratan dokumen
- `alur`: array langkah-langkah pengurusan
- `waktu`: estimasi waktu selesai
- `biaya`: biaya pengurusan

### 4. Tambah Foto Galeri
Edit file `data/galeri.json` dan letakkan foto di `assets/img/`:
```json
{
  "id": 10,
  "judul": "Judul foto",
  "kategori": "Kegiatan",
  "foto": "assets/img/foto-besar.jpg",
  "thumbnail": "assets/img/foto-kecil.jpg"
}
```
Kategori yang tersedia: `Lingkungan`, `Kegiatan`, `Potensi`, `Sosial`, `Ekonomi`

### 5. Update Nomor WhatsApp
Di file `js/main.js`, cari baris:
```js
const noWa = '[Nomor WhatsApp Kelurahan]';
```
Ganti dengan nomor asli format internasional tanpa `+`, contoh:
```js
const noWa = '6281234567890';
```
Dan update juga di `index.html` (cari `628XXXXXXXXXX`).

### 6. Embed Peta Google Maps
1. Buka [Google Maps](https://maps.google.com)
2. Cari lokasi kantor kelurahan
3. Klik **Bagikan** → **Sematkan peta** → Salin kode `<iframe>`
4. Ganti `<iframe>` di `index.html` section `#kontak` dengan kode baru

### 7. Statistik Hero
Di `index.html`, cari section `hero-stats` dan ubah nilai `data-target`:
```html
<div ... data-target="4500" data-suffix=" jiwa">
```

### 8. Konten Profil & Visi Misi
Langsung edit di `index.html` section `#profil`. Cari teks dalam kurung siku `[...]` dan ganti dengan data asli. Data sejarah, letak geografis, batas wilayah, dan demografi sudah diisi dengan data resmi Kelurahan Namaelo (berdiri 2 September 1981, 17.050 jiwa, 20 RT, 16,67 km²).

### 9. Data RT/RW
Edit file `data/perangkat.json` bagian `rtrw`. Saat ini sudah ada 20 entri RT (001–020). Ganti `[RW]` dengan nomor RW yang sesuai, dan `[Nama Ketua RT ...]` dengan nama asli ketua RT.

---

## 🎨 Kustomisasi Tampilan

### Mengubah Warna Utama
Edit variabel di `css/style.css`:
```css
:root {
  --color-ocean:      #0077B6;   /* Warna utama biru */
  --color-tropic:     #2D7D46;   /* Hijau tropis */
  --color-gold:       #D4A017;   /* Emas hangat */
}
```

### Mengubah Font
Edit baris `@import` di atas `css/style.css` dengan font Google lain, lalu update:
```css
--font-heading: 'NamaFont', serif;
--font-body:    'NamaFont', sans-serif;
```

---

## 🔒 Catatan Penting

- **Semua data bertanda `[...]` adalah placeholder** — wajib diganti dengan data resmi sebelum website diluncurkan.
- Gambar saat ini menggunakan Unsplash (untuk keperluan prototipe). Ganti dengan foto asli kelurahan.
- Formulir pengaduan menggunakan link WhatsApp — tidak perlu backend/server.
- Tidak ada data sensitif warga yang disimpan di website ini.

---

## 📞 Bantuan Teknis

Untuk pertanyaan teknis seputar pengelolaan website, hubungi tim pengembang atau operator IT kelurahan.

---

*Website ini dikembangkan sebagai sarana transparansi dan pelayanan publik Kelurahan Namaelo.*  
*Versi: 1.0 · Tahun 2026*
