# Project Guide: Portfolio Workspace

## Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui (Radix UI based)
- **Preset/Theme:** Vega (menggunakan Lucide Icons / Geist Font)
- **Animation:** GSAP (`gsap` & `@gsap/react`)

## Build & Dev Commands
- Run development server: `npm run dev`
- Build for production: `npm run build`
- Start production server: `npm run start`
- Lint code: `npm run lint`
- Add new shadcn component: `npx shadcn@latest add [component-name]`

## Project Structure & Architecture
- **Layout:** Menggunakan struktur `Sidebar` (kiri) dan `Main Content` (kanan) sesuai referensi UI.
- **Dark/Light Mode:** Menggunakan `next-themes` terintegrasi dengan shadcn/ui.
- **`src/components/ui`:** Khusus untuk komponen dasar dari shadcn (Atoms).
- **`src/components/shared`:** Komponen global seperti `Sidebar.tsx`, `ThemeToggle.tsx`, `SkillBadge.tsx`.
- **`src/hooks` / `src/lib`:** Logika kustom dan utilitas.

## Code Conventions
- **Naming:** 
  - Components: `PascalCase.tsx` (contoh: `SidebarNav.tsx`)
  - Hooks/Utils: `camelCase.ts` (contoh: `useAnimation.ts`)
  - Folders: `kebab-case` (contoh: `shared-components/`)
- **TypeScript:** Wajib menggunakan *strict typing*. Hindari penggunaan `any`.
- **Imports:** Gunakan alias `@/` untuk semua path internal (contoh: `@/components/ui/button`).

## Animation Guidelines (GSAP)
- **Hook Wajib:** Selalu gunakan `useGSAP()` dari `@gsap/react` di Next.js agar *cleanup* animasi aman dan tidak menyebabkan *memory leak*.
- **Performa:** Hindari menganimasi properti berat seperti `width` atau `height`. Gunakan `x`, `y`, `opacity`, dan `scale` (transform).
- **Scope:** Selalu gunakan properti `{ scope: containerRef }` di dalam `useGSAP` untuk membatasi area animasi.