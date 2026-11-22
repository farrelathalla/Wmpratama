# Senkousa: analisis desain dan animasi

Sumber: https://senkousa.com/ (dianalisis 22 November 2026) lewat Playwright, rekaman scroll 1440x900, viewport mobile 390x844, serta pembacaan `css/main.css`, `css/sub_style.css`, `js/main.js`, dan `js/sub_script.js`.

Dokumen ini adalah referensi bahasa desain. Logo, foto, dan teks Senko tidak dipakai di website WM Pratama.

## 1. Stack

| Lapisan | Teknologi |
|---|---|
| CMS | Gnuboard (`theme/basic`, PHP, Apache) |
| DOM | jQuery 1.11 |
| Slider | Swiper 5.4.3 / 11 (beranda), Slick (galeri produk) |
| Scroll reveal | AOS, `AOS.init({ duration: 1500 })` |
| Tween | TweenMax 2.0.2, hanya untuk parallax hero |
| Termuat tapi tidak aktif | GSAP 3, ScrollTrigger, CountUp, CounterUp (0 trigger di beranda) |

## 2. Warna

| Token | Nilai | Pemakaian |
|---|---|---|
| `--color1` | `#2F35ED` | Tab aktif, tombol submit, angka slider aktif, garis hover, pagination aktif |
| `--color2` | `#2AA738` | Tombol back-to-top, badge produk aktif |
| Navy | `#1D2088` | Bingkai 5px gambar produk, hover opsi select |
| Navy gelap | `#101149` | Dropdown level 3 |
| Biru hover nav | `#2C76FF` | Hover menu dan titik 6px |
| Latar utama | `#1A1A1A` | `body`, sitemap, panel search |
| Hitam | `#000000` | Header saat fixed/hover, footer |
| Panel | `#333333` | Kartu detail produk |
| Putih | `#FFFFFF` | Teks utama, section News |
| Abu gambar | `#E7E7E7` | Latar foto produk |
| Abu badge | `#8E8E8E` | Badge nonaktif |
| Abu teks | `#BEBEBE`, `#A8A8A8`, `#6D6D6D` | Footer, sitemap, tanggal |
| Garis | `#D9D9D9`, `#E3E3E3`, `rgba(255,255,255,.4)` | Divider |

Ritme section beranda: gelap, gelap, **putih**, gelap, foto gelap, hitam.

## 3. Tipografi

- **Outfit:** heading, navigasi, tombol. Berat 500 sampai 700.
- **Pretendard:** paragraf, daftar, form, judul slide "What We Do".
- Tracking selalu rapat, -0.4px sampai -2px.

| Elemen | Ukuran (1640px) | Berat | Line height | Tracking |
|---|---|---|---|---|
| Judul hero | 100px | 500 | 1.26 | normal |
| Deskripsi hero | 28px | 400 | 1.25 | -1px |
| Judul sub-visual | 70px | 500 | 1.14 | normal |
| Judul halaman dalam | 60px | 500 | 1.2 | normal |
| Judul section | 50px | 600 | 1.12 | -2px |
| Intro section | 20px | 400 | 1.3 | normal |
| Nama produk | 28px | 700 | 1.14 | -0.4px |
| Judul slide | 40px | 700 | 1 | -2px |
| Baris berita | 24px | 500 | normal | -1px |
| Nav utama | 18px | 600 | 1.5 | normal |
| Nav atas | 14px | 600 | 1.4 | normal |

**Skala fluid:** nilai px berlaku di atas 1640px. Di bawahnya semua berubah ke `vw`, misalnya 50px menjadi 43.92px pada lebar 1440. Rumusnya `nilai * (lebar / 1640)`.

## 4. Layout

- Container `.inner`: `max-width: 1600px`.
- Breakpoint: 1640, 1280, 768, 420.
- Hero: tinggi 950px di 1640 (834px di 1440).
- Sub-visual: tinggi 580px.
- Padding section: 114 sampai 157px atas dan bawah.
- Sudut tajam hampir di semua elemen. Pengecualian: dropdown 5px, badge 5px, tombol top bulat.

### Struktur beranda

1. **Visual:** slider layar penuh, judul kiri, indikator angka dan bar.
2. **Product:** judul tengah, 5 tab, carousel dengan slide tengah membesar.
3. **What We Do:** judul kiri, slide aktif berisi foto dan teks, slide berikutnya mengecil di kanan.
4. **News (putih):** judul kiri, daftar baris di kanan.
5. **Blog:** carousel 2 kartu per layar, foto kiri dan teks kanan.
6. **Contact:** form garis bawah di atas foto gelap.
7. **Footer:** logo dan sosial, alamat, tautan legal.

### Halaman dalam

Semua memakai sub-visual, breadcrumb dengan dropdown, judul tengah 60px, lalu konten:

- **Daftar produk:** sidebar filter kiri dengan checkbox dan badge jumlah, grid 3 kolom kanan.
- **Detail produk:** panel `#333`, padding 100px, galeri 650px dengan thumbnail di kiri, info di kanan.
- **About:** tab 3 kolom, pernyataan tengah, foto lebar.
- **Blog:** grid 4 kolom dengan total item.
- **Market:** foto lebar dengan judul di tengah, teks tengah, kartu.

## 5. Animasi

### 5.1 Hero slider

```js
new Swiper('.visual', {
  slidesPerView: 1, speed: 1200, loop: true,
  watchSlidesProgress: true, autoplay: { delay: 4000 },
});
// parallax antar-slide
innerTranslate = slideProgress * swiper.width * 0.75;
```

| Target | Dari | Ke | Durasi | Delay |
|---|---|---|---|---|
| Slide | geser horizontal | | 1200ms | |
| `.slide-inner` | `x = progress * 75% lebar` | 0 | 1200ms | |
| Foto `.bg` | `scale(1.1)` | `scale(1)` | 1200ms | |
| Judul (mask) | `translateY(100%)`, opacity 0 | 0, opacity 1 | 1000ms | 1000ms |
| Deskripsi (mask) | `translateY(100%)`, opacity 0 | 0, opacity 1 | 1000ms | 1450ms |
| Indikator aktif | lebar 63px | 180px | 200ms | |
| Bar progres | lebar 0 | 100% | 5000ms linear | |

### 5.2 Scroll reveal (AOS)

- Efek `fade-up`: `opacity 0`, `translate3d(0, 100px, 0)` menjadi normal.
- Durasi 1500ms, easing `ease`, offset 120px.
- `once: false`: elemen ter-reset saat keluar lewat bawah viewport dan main lagi saat di-scroll turun.

### 5.3 Carousel produk

- `slidesPerView: 'auto'`, `centeredSlides`, `loop`, autoplay 2500ms, `initialSlide: 2`.
- Slide 400px, margin 15px, opacity .8.
- Slide aktif: `scale(1.258)`, opacity 1, badge berubah `#2AA738`.
- Slide sebelum aktif `translateX(-52px)`, sesudahnya `translateX(52px)`.
- Gambar `scale(1.1)` dengan border 5px `#1D2088`, hover pada slide aktif ke `scale(1)` dalam .5s.

### 5.4 Slider What We Do

- `slidesPerView: 'auto'`, `loop`, speed 1000ms, penomoran `01 / 04`.
- Slide 1066px: foto 550px dan teks.
- Slide nonaktif: `scale(.637)` dari `transform-origin: bottom`, teks tersembunyi.
- Slide aktif: `scale(1)` dalam .7s.
- Teks masuk dari `translateX(-10%)`, opacity 0, durasi .7s, delay .3s.
- Pseudo-element `#1A1A1A` di kiri menutupi slide yang sudah lewat.

### 5.5 Baris News

Garis `1px --color1` dengan `scaleX(0)` ke `none`, `transform-origin: left`, 1s. Teks dan tanggal berubah ke `--color1`.

### 5.6 Kartu Blog

Gambar berbingkai 5px `--color1`, hover `scale(.9)` dalam .5s.

### 5.7 Navigasi

| Interaksi | Perilaku |
|---|---|
| Scroll lebih dari 0 | Header latar `#000` |
| Hover header | Header latar `#000` |
| Hover menu | Teks `#2C76FF`, titik 6px muncul di kiri atas |
| Dropdown | Panel putih tumbuh `height .3s`, item fade .8s, delay bertahap 30ms |
| Search | Panel turun `translateY(-100%)` ke 0, opacity, .5s |
| Sitemap | Layar penuh `translateX(100%)` ke 0, `linear .4s` |
| Tombol top | Lingkaran 65px, scroll ke atas 500ms |

### 5.8 Tombol

`viewBtn` 149x44px, border 1px. Hover: pseudo-element `--color1` tumbuh `width 0` ke 100% dalam .3s.

## 6. Mobile (768px ke bawah)

- Header: logo, ikon bahasa, hamburger.
- Menu: panel penuh dengan akordeon.
- Tab produk: baris scroll horizontal.
- What We Do: judul, foto, teks ditumpuk.
- News: judul di atas, tanggal tetap satu baris.
- Blog: satu kartu dengan foto di atas.
- Form: satu kolom.

## 7. Catatan penerapan untuk WM Pratama

| Senko | WM Pratama |
|---|---|
| `--color1 #2F35ED` | `#0378A6`, biru logo WMP, versi terang `#38C3EF` untuk hover |
| `--color2 #2AA738` | `#F9C10B`, kuning logo WMP |
| Swiper + TweenMax | Swiper + parallax langsung di event `progress` |
| AOS | IntersectionObserver ringan dengan perilaku sama |
| Skala `vw` per breakpoint | `html { font-size: clamp(...) }` dengan unit `rem` |
| Hormati gerak | Semua animasi dimatikan pada `prefers-reduced-motion` |
