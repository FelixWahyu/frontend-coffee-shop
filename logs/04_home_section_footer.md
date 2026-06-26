# Home Section, Footer & Auth Pages Redesign

**Tanggal:** 26 Juni 2026
**Tujuan:** Merapikan tampilan Why Choose Us section, menambah CTA banner, redesign footer, dan redesign halaman login & register full-screen modern

## File yang Dibuat

- `src/components/sections/home/SectionCta.tsx` — CTA banner dengan background image, overlay, dan WhatsApp link

## File yang Diubah

- `src/components/sections/home/SectionWhyUs.tsx` — Perbaikan layout, konten, dan visual stats
- `src/components/home/homePage.tsx` — Menambahkan `<CtaSection />` setelah `ReviewSection`
- `src/components/layout/Footer.tsx` — Redesign total footer dengan tampilan modern
- `src/app/(auth)/layout.tsx` — Disederhanakan untuk full-screen layout
- `src/components/auth/LoginForm.tsx` — Redesign total halaman login
- `src/components/auth/RegisterForm.tsx` — Redesign total halaman register (full-screen, icons, confirm password)
- `src/types/login.ts` — Tambah field `confirmPassword` di `RegisterRequest`
- `src/types/errorMessage.ts` — Tambah field `confirmPassword?` di `ErrorMsg`

---

## 1. Why Choose Us Section

### Perubahan Layout

- **Statistik:** Dari horizontal card (`bg-white/50 rounded-xl shadow-sm`) menjadi vertikal dengan icon di samping kiri masing-masing stat
- **Image:** Dari `aspect-square` menjadi `h-72 md:h-auto` — menyesuaikan tinggi konten teks
- **Flex container:** Dari `items-center` menjadi `items-stretch` agar kedua kolom sama tinggi di desktop

### Konten & Ikon

- **Lorem ipsum** diganti copywriting asli tentang biji kopi pilihan dan barista profesional
- **Ikon lucide-react** ditambahkan pada masing-masing stat:
  - `Clock` — 10+ Tahun Pengalaman
  - `Coffee` — 50+ Jenis Kopi
  - `Heart` — 1K+ Pelanggan Setia
- **Button** diubah dari `<button>` menjadi `<Link href="/about">` dengan styling konsisten

---

## 2. CTA Section (Baru)

### Design

- Full-width banner dengan background image `cafe-front.jpg`
- Dark gradient overlay (`from-[#30261C]/90 to-[#30261C]/40`) — konsisten dengan Hero section
- Teks center, dibungkus `max-w-2xl mx-auto`
- Tinggi: `py-20 md:py-28`

### Copywriting

- **Headline:** "Siap Menikmati Kopi Terbaik Hari Ini?" — Playfair Display italic bold
- **Subtext:** Deskripsi singkat tentang kopi pilihan dan barista profesional
- **CTA Button:** "Pesan Sekarang" — `bg-[#C67C4E]` dengan link WhatsApp

### Link

- Tombol menggunakan `<a>` dengan `href="https://wa.me/6281282829298"`, `target="_blank"`, `rel="noopener noreferrer"`
- Import `Link` dari next/link dihapus karena tidak digunakan

### Posisi

- Dirender setelah `ReviewSection` di `homePage.tsx`

---

## 3. Footer Redesign

### Layout Grid

- 4 kolom responsif (1 kolom mobile, 2 tablet, 4 desktop) — tetap sama
- Spacing dan padding diperhalus

### Kolom 1 — Brand & Newsletter

- **Deskripsi:** Dari lorem ipsum menjadi copywriting asli tentang kopi Nusantara
- **Newsletter (baru):** Input email + tombol Subscribe dengan icon `Send`
  - Styling input: `bg-white/10 border-white/20`, focus `border-[#C67C4E]`
  - Button: `bg-[#C67C4E]` konsisten dengan tombol CTA

### Kolom 2 — Navigasi

- Hover effect diubah: `hover:underline` → `hover:text-[#C67C4E] hover:translate-x-1`
- Font size: `text-sm` → `text-base`

### Kolom 3 — Kontak

- Ikon diwarnai `text-[#C67C4E]` (sebelumnya putih default)
- Ukuran teks: `text-sm` → `text-base`

### Kolom 4 — Sosial Media

- **WhatsApp:** Button diubah jadi `<a>` dengan link `wa.me/6281282829298`, icon `MessageCircle`
- **Instagram:** `<a>` placeholder (`href="#"`), icon `Camera`
- Hover effect: `hover:bg-[#C67C4E] hover:scale-110`

### Bottom Bar

- Sebelumnya: hanya copyright di tengah
- Sesudah: flex row (stack di mobile) — copyright kiri, Privacy Policy + Terms of Service kanan
- Link hover: `text-[#C67C4E]`

### Ukuran Teks

Semua teks utama diperbesar dari `text-sm` (14px) ke `text-base` (16px):

- Deskripsi brand
- Link navigasi
- Info kontak
- Input & tombol newsletter

Bottom bar tetap `text-sm` karena bersifat sekunder/legal.

---

## 4. Login Page Redesign

### Tujuan

Membuat halaman login full-screen (tanpa padding/page margin) dengan tampilan modern, tetap konsisten dengan warna dan font existing.

### Layout

- **Grid:** `min-h-screen` dengan `md:grid-cols-2` — full viewport
- **AuthLayout:** Wrapper flex centering dihapus, menjadi pass-through agar form mengatur layout sendiri

### Kolom Kiri — Image

- Image `biji-coffe-cup.jpg` full height dengan `object-cover`
- Overlay: `bg-linear-to-r from-[#30261C]/80 to-[#30261C]/20` — lebih modern dari sebelumnya (`bg-[#30261C]/70`)
- Teks overlay: `absolute inset-0 flex items-center justify-center` — center sempurna di tengah image

### Kolom Kanan — Form

- Background putih penuh, `flex items-center justify-center`
- Max width form: `max-w-sm`
- Input styling:
  - `bg-gray-50 border border-gray-200`
  - Focus: `border-[#C67C4E] ring-2 ring-[#C67C4E]/20`
  - Border radius: `rounded-xl`
- **Ikon dalam input:**
  - Username: icon `User` (lucide-react) absolute left, `pl-10` pada input
  - Password: icon `Lock` (lucide-react) absolute left, `pl-10` pada input (eye toggle tetap di kanan)
- **Lupa Password?** — Link baru di bawah input password, rata kanan, warna `#C67C4E`, `href="/forgot-password"`
- Tombol Login: `rounded-xl` dengan `hover:shadow-md`

### Link

- **Lupa Password:** `/forgot-password` (placeholder page, perlu dibuat)
- **Daftar:** `/register` — tetap sama

---

## 5. Register Page Redesign

### Tujuan
Menyamakan tampilan halaman register dengan login — full-screen, modern, dan konsisten.

### Layout
- Sama seperti login: `min-h-screen` grid 2 kolom
- Kolom kiri: image dengan gradient overlay dan teks center
- Kolom kanan: form di atas background putih

### Input Fields (dengan ikon)

| Field | Icon | Keterangan |
|-------|------|------------|
| Name | `User` | Absolute left, `pl-10` |
| Username | `User` | Absolute left, `pl-10` |
| Password | `Lock` | Absolute left, eye toggle di kanan |
| Confirm Password | `KeyRound` | Absolute left, share `showPassword` dengan field password |

### Validasi Confirm Password
- Wajib diisi (`"Confirm password is required"`)
- Harus sama dengan password (`"Password does not match"`)

### Perbaikan Lain
- Import path diperbaiki: `@/src/components/...` → `@/components/...`
- Styling input: `bg-gray-50 border focus:ring-2 focus:ring-[#C67C4E]/20 rounded-xl`
- Button: `rounded-xl` dengan `hover:shadow-md`
- Setelah submit sukses, `confirmPassword` ikut di-reset

---

## Catatan

- `lucide-react` sudah terinstall (digunakan juga di section lain)
- Tidak ada instalasi package baru
- Warna konsisten dengan palette existing: `#30261C`, `#C67C4E`, `#E2D9C8`
- WhatsApp link `6281282829298` — sesuai nomor yang diberikan

## Todo Berikutnya

- Newsletter form functionality (backend integration)
- Instagram link aktual
- Privacy Policy & Terms of Service pages
- Nomor kontak & email aktual
- Halaman lupa password
