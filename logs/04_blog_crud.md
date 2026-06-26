# Blog CRUD (Admin & Dynamic Data)

**Tanggal:** 26 Juni 2026
**Tujuan:** Mengubah blog dari static data menjadi dinamis dari database dengan fitur CRUD admin

## File yang Dibuat

### Backend (Express + Prisma)
- `prisma/migrations/20260626000000_add_blog_article/migration.sql` — Migrasi tabel `blog_articles`
- `src/validation/blogValidation.ts` — Zod validation schema (CREATE, UPDATE)
- `src/model/blogModel.ts` — Type request/response + mapper `toBlogResponse` + utility `slugify`
- `src/services/blogService.ts` — Business logic CRUD (create, list, getBySlug, getById, update, delete)
- `src/controllers/blogController.ts` — Handler endpoint

### Frontend — Services & Utilities
- `src/services/blog.ts` — Public service (list, getBySlug)
- `src/services/admin/blog.ts` — Admin CRUD service (create, list, getById, update, delete)
- `src/validations/blog/blogValidation.ts` — Form validation
- `src/utils/renderBlogContent.tsx` — Parser konten artikel (heading, list, paragraf) — pure function
- `src/components/ui/form/textarea.tsx` — Component TextArea
- `src/components/ui/confirm-modal.tsx` — Modal konfirmasi hapus (bukan `confirm()`)

### Frontend — Hooks (Logic Layer)
- `src/hooks/blog/useBlogTable.ts` — State & side effect untuk tabel blog (fetch, search, delete)
- `src/hooks/blog/useBlogForm.ts` — State & side effect untuk form blog (validasi, submit, tags)

### Frontend — Components (Presentation)
- `src/components/admin/blog/FormBlog.tsx` — Form create/edit dengan input tags dinamis
- `src/components/admin/blog/BlogTable.tsx` — Tabel daftar artikel + search + delete
- `src/components/blog/HeroBlog.tsx` — Hero section halaman list blog
- `src/components/blog/ArticleGrid.tsx` — Grid artikel dengan empty state
- `src/components/blog/DetailHero.tsx` — Hero section halaman detail artikel
- `src/components/blog/DetailContent.tsx` — Meta info + konten + tags + tombol kembali

### Frontend — Pages
- `src/app/admin/blog/create/page.tsx` — Halaman create artikel
- `src/app/admin/blog/edit/[id]/page.tsx` — Halaman edit artikel (client component)

## File yang Diubah

### Backend
- `prisma/schema.prisma` — Menambahkan model `BlogArticle`
- `src/routes/publicApi.ts` — Menambahkan route public: GET `/api/blogs`, GET `/api/blogs/:slug`
- `src/routes/api.ts` — Menambahkan route admin (auth): POST, GET by id, PUT, DELETE `/api/blogs`

### Frontend — Pages
- `src/app/(main)/blog/page.tsx` — Dari static + inline → fetch + render components
- `src/app/(main)/blog/[slug]/page.tsx` — Dari static + inline → fetch + render components
- `src/app/admin/blog/page.tsx` — Dari placeholder → `BlogTable`
- `src/app/admin/categories/page.tsx` — Konsisten heading dengan halaman admin lain

### Frontend — Admin Layout
- `src/components/admin/layout/MainLayout.tsx` — `h-screen`, `overflow-y-auto`, `min-w-0` untuk scroll proper
- `src/components/admin/layout/Sidebar.tsx` — `min-w-0` untuk collapse, nav tanpa scroll, active link pakai `startsWith`

### Frontend — Types & Components
- `src/types/blog.ts` — Update `BlogArticle` dengan `createdAt`/`updatedAt` + `date` opsional
- `src/types/errorMessage.ts` — Tambah interface `ErrorBlog`
- `src/components/cards/BlogCard.tsx` — Fallback `date` ke `createdAt`
- `src/constants/blog.ts` — Dihapus (tidak digunakan lagi)

## Detail Implementasi

### Arsitektur Frontend (Separation of Concerns)

```
Page (orchestrator)
  ├── fetch data dari services/
  ├── render components (presentation)
  └── hooks/ (state & side effects)

Component (presentation only)
  ├── menerima props
  ├── panggil hooks untuk logic
  └── render JSX murni

Hooks (logic layer)
  ├── state management
  ├── API calls via services/
  └── form handling & validation

Utils (pure functions)
  └── renderBlogContent — parser konten tanpa JSX campur logic
```

### Database (Prisma)
- Model `BlogArticle` dengan field: id, slug (unique), title, excerpt, content (Text), image, category, author, tags (JSON string), readingTime, createdAt, updatedAt
- Tags disimpan sebagai JSON string (`["tag1","tag2"]`) dan diparse/distringify di service

### API Endpoints

**Public (tanpa auth):**
- `GET /api/blogs?search=` — List artikel (desc by createdAt), bisa search
- `GET /api/blogs/:slug` — Detail artikel by slug

**Admin (dengan auth middleware):**
- `POST /api/blogs` — Create artikel
- `GET /api/blogs/detail/:id` — Detail artikel by id (untuk form edit)
- `PUT /api/blogs/:id` — Update artikel
- `DELETE /api/blogs/:id` — Hapus artikel

### Slug
- Digenerate otomatis dari title menggunakan fungsi `slugify()`
- Unique constraint di database
- Dicek duplikasi saat create dan update

### Admin Components
- **BlogTable**: Table dengan kolom Title, Category, Author, Date, Actions (Edit/Delete). Dilengkapi search field, tombol New Article, dan ConfirmModal untuk konfirmasi hapus.
- **FormBlog**: Form lengkap dengan validasi client-side, input tags dinamis (tambah/hapus), reusable untuk create dan edit. Semua logic di-extract ke `useBlogForm`.

### Halaman Public
- `page.tsx`: Fetch data dari API (server component), render `<HeroBlog />` + `<ArticleGrid />`
- `[slug]/page.tsx`: Fetch by slug (server component), render `<DetailHero />` + `<DetailContent />`
- `renderBlogContent()` dipisah ke `utils/` agar component murni presentation

### Admin Layout
- Sidebar: `min-w-0` untuk collapse di flex layout, `overflow-hidden` cegah scroll, nav tanpa scroll
- Main: `overflow-y-auto` + `flex-1` + `min-w-0` untuk scroll konten yang panjang
- Content wrapper: `flex-1` biar halaman pendek tetap full-height

## Catatan
- Tidak ada instalasi package baru
- Migration SQL dibuat manual (database tidak berjalan saat develop)
- Semua error TypeScript di backend adalah pre-existing (`verbatimModuleSyntax`)
- Admin blog menggunakan credentials cookie (sama seperti admin category)
- `confirm()` diganti dengan `ConfirmModal` komponen custom

## Todo Berikutnya
- Seed data untuk blog articles
- Fitur upload image untuk blog
- Pagination jika artikel bertambah banyak
- Fitur pencarian di frontend blog
