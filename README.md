# English Academy – Website (Frontend)

Học viện tiếng Anh trực tuyến, đa giảng viên. Phiên bản 1.2 – chỉ frontend, dữ liệu mẫu bằng TypeScript.

**Stack:** React 19 + Vite 8 + TypeScript 7 · Tailwind CSS v4 · UI kiểu shadcn/ui (`src/components/ui`) · Lucide React · React Router · Zustand · React Hook Form + Zod

**Yêu cầu:** Node.js `>=22.13` (khuyến nghị Node 24 LTS – xem `.nvmrc`), npm.

## Chạy dự án

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # kiểm tra TypeScript (TS 7)
npm run build      # typecheck + vite build → dist/
npm run preview    # xem bản build
```

## Kiểm tra chất lượng

```bash
npm run lint        # ESLint (typescript-eslint, react-hooks, react-refresh)
npm run test        # Vitest + React Testing Library, chạy một lần
npm run test:watch  # Vitest ở chế độ watch khi phát triển
npm run check       # typecheck → lint → test → build (giống CI)
```

- Test đặt cạnh mã nguồn: `*.test.ts(x)` trong `src/`. Cấu hình Vitest nằm trong `vite.config.ts` (môi trường `jsdom`), setup chung ở `src/test/setup.ts` (jest-dom matchers, reset store và localStorage sau mỗi test), helper `renderWithRouter` ở `src/test/render.tsx`.
- Phạm vi test hiện tại: chuẩn hóa/tìm kiếm tiếng Việt không dấu, sinh quiz từ vựng, schema đăng nhập/đăng ký, component `Quiz`, `Flashcards` và `Header` (mega menu chuột/cảm ứng/bàn phím, menu di động, hộp tìm kiếm Ctrl+K, trạng thái đăng nhập demo).
- ESLint cấu hình ở `eslint.config.js` (flat config). Rule `react-refresh/only-export-components` chỉ tắt cho `src/components/ui` (file kiểu shadcn export kèm biến thể) và file test.

### Vì sao có hai gói TypeScript?

`typescript@7` là trình biên dịch native và không còn JavaScript API mà `typescript-eslint` cần (yêu cầu `typescript <6.1`). Vì vậy trong `devDependencies`:

| Tên cài đặt | Gói thực tế | Dùng cho |
|---|---|---|
| `typescript` | `@typescript/typescript6` (gói chính thức của nhóm TypeScript) | API cho ESLint (`typescript-eslint`) |
| `typescript-native` | `typescript@7` | Kiểm tra kiểu: `npm run typecheck` gọi `node node_modules/typescript-native/bin/tsc` |

Không gọi `npx tsc` trực tiếp, vì lệnh `tsc` trong `node_modules/.bin` có thể trỏ tới bản 6. Khi `typescript-eslint` hỗ trợ TS 7, có thể gộp lại thành một gói `typescript`.

## GitHub Actions CI

Workflow `.github/workflows/frontend-ci.yml` chạy khi:

- có Pull Request;
- push lên các nhánh `feature/**`, `fix/**`, `refactor/**`, `docs/**`, `chore/**`, `test/**`.

Các bước: `npm ci` → `npm run typecheck` → `npm run lint` → `npm run test` → `vite build`, trên Node.js theo `.nvmrc` (24 LTS). Workflow chỉ có quyền `contents: read`, không dùng secrets và **không deploy** – việc deploy Cloudflare Pages vẫn được cấu hình riêng (xem bên dưới) và cần phê duyệt.

## Cấu trúc

```
src/
  app/            App.tsx, router.tsx (lazy-load từng trang), providers/
  components/
    ui/           Button, Card, Badge, Input, Tabs, Progress
    layout/       Header (sticky, mega menu, hamburger), Footer, MainLayout, SearchDialog
    shared/       Container, SectionHeading, PageHeader, CoverArt, Avatar, Quiz, SpeakButton…
  features/       home/ courses/ lessons/ vocabulary/ grammar/ listening/ speaking/
                  reading/ writing/ teachers/ practice/ auth/
  pages/          Mỗi route một trang
  data/           Dữ liệu mẫu: courses, lessons, teachers, cefr, library, vocabulary,
                  grammar, skills, testimonials, navigation, info
  store/          authStore (phiên demo trong bộ nhớ), progressStore (localStorage)
  hooks/ lib/ types/ styles/
```

Màu và font được khai báo trong `src/styles/index.css` (`@theme`): `primary` #4F46E5, `navy` #0F172A, `surface` #F8FAFC, `accent` #06B6D4, `highlight` #F59E0B.

## Sitemap

`/` · `/courses` · `/courses/:slug` · `/learning/:slug` · `/learning-paths` · `/listening` · `/speaking` · `/reading` · `/writing` · `/vocabulary` · `/grammar` · `/practice` · `/library` · `/teachers` · `/teachers/:slug` · `/dashboard` · `/login` · `/register` · `/search?q=` · `/help/:slug` (about, contact, faq, terms, privacy, refund)

## Deploy Cloudflare Pages

1. Đẩy repo lên GitHub → Cloudflare Pages → *Connect to Git*.
2. Build command: `npm run build` · Output directory: `dist`.
3. SPA fallback cho React Router đã có sẵn trong `public/_redirects` (`/* /index.html 200`).

## Ghi chú trước khi phát hành

- **Dữ liệu mẫu:** khóa học, giá, số học viên, giảng viên và phản hồi học viên (`src/data/*`) đều là dữ liệu minh họa. Hãy thay bằng dữ liệu thật; chỉ đặt `verified: true` trong `testimonials.ts` khi đã đối chiếu kết quả.
- **Đăng nhập/Đăng ký** là mô phỏng: không tạo tài khoản, không lưu mật khẩu, không gửi dữ liệu. Phiên mất khi tải lại trang.
- **Tiến độ học** (bài hoàn thành, từ đã thuộc, điểm quiz) lưu trong `localStorage` của trình duyệt.
- **Audio/phát âm** dùng Web Speech API của trình duyệt; video/audio bài giảng hiện là khung giữ chỗ. Đặt file thật vào `public/audio`, `public/images`.
- Link mạng xã hội trong footer (`SocialIcons.tsx`) đang là `#`. Nội dung điều khoản/bảo mật trong `data/info.ts` là bản nháp.
- SEO: mỗi trang tự đặt `title` và `meta description` (`usePageMeta`). Nếu cần SEO chuyên sâu, thêm prerender (ví dụ `vite-plugin-prerender` hoặc chuyển sang SSG).
