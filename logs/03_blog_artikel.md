# Blog Artikel

**Tanggal:** 25 Juni 2026
**Tujuan:** Transformasi halaman blog dari placeholder profile data menjadi halaman artikel/berita kopi dengan tampilan yang konsisten

## File yang Dibuat

- `src/constants/blog.ts` — Data artikel kopi (6 artikel) dengan tipe `BlogArticle`
- `src/components/cards/BlogCard.tsx` — Komponen kartu artikel mengikuti pola `ProductCard`

## File yang Diubah

- `src/app/(main)/blog/page.tsx` — Hero section diperbarui + menggunakan `blogArticles` dan `BlogCard`
- `src/app/(main)/blog/[slug]/page.tsx` — Dari data profile menjadi tampilan artikel lengkap

## Penjelasan Perubahan

### Hero Section
- Badge: "Karya Blog Kami" → "Artikel & Berita Kopi"
- Title: "Blog **Artikel**" → "Artikel **Kopi**"
- Deskripsi: lebih sesuai konten blog
- Tambahan dekorasi garis aksen `w-20 h-1 bg-[#C67C4E] rounded-full`
- Tinggi hero dikurangi `md:h-[80vh]` → `md:h-[70vh]`

### Blog Card (BlogCard.tsx)
- Menggunakan komponen `Card` sebagai wrapper (sama dengan `ProductCard`)
- Background `bg-[#F1F0EE]` (konsisten)
- Menampilkan: cover image, category badge, title, excerpt, author, date, reading time
- Hover effect: title berubah warna `#C67C4E`

### Halaman Detail ([slug]/page.tsx)
- Hero kecil (50vh) dengan cover image + overlay
- Meta info: author, tanggal (format Indonesia), reading time
- Konten artikel dirender dengan `renderContent()` — parser otomatis mendeteksi:
  - Heading bernomor (dari `1.` dst) → `h2` dengan font-playfair
  - Sub-heading (baris pendek) → `h3` dengan font-playfair
  - List items (diawali `- `) → `ul` dengan bullet `#C67C4E`
  - Paragraf biasa → `p` dengan `text-lg`
- Ukuran teks konten: `text-lg` (lebih besar dari sebelumnya)
- Tags dengan hover effect
- Tombol kembali dengan shadow hover

### Data Artikel (blog.ts)
- 6 artikel tentang kopi: Sejarah, Tips, Kesehatan, Edukasi, Perbandingan, Panduan Seduh
- Menggunakan gambar dari `/public/assets/image/` yang sudah ada
- Mengikuti interface `BlogArticle` di `types/blog.ts`
- Tanda `**` (bold marker) telah dihapus dari semua konten

## Catatan
- Tidak ada instalasi package baru
- Tidak ada perubahan pada layout, navbar, atau footer
- Semua gambar menggunakan asset yang sudah ada
- Routing menggunakan slug (URL friendly), bukan ID numerik

## Todo Berikutnya
- Admin blog management (CRUD)
- API service untuk blog
- Fitur pencarian artikel
- Pagination jika artikel bertambah banyak
