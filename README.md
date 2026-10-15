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
- push lên `main` và các nhánh `feature/**`, `fix/**`, `refactor/**`, `docs/**`, `chore/**`, `test/**`.

Các bước: `npm ci` → `npm run typecheck` → `npm run lint` → `npm run test` → `vite build`, trên Node.js theo `.nvmrc` (24 LTS). Workflow chỉ có quyền `contents: read`, không dùng secrets và **không deploy**. Việc deploy do Cloudflare Pages Git integration đảm nhận (xem bên dưới), nên mỗi commit chỉ được deploy một lần.

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

`/` · `/courses` · `/courses/:slug` · `/learning/:slug` · `/learning-paths` · `/placement-test` · `/listening` · `/speaking` · `/reading` · `/writing` · `/vocabulary` · `/grammar` · `/practice` · `/library` · `/teachers` · `/teachers/:slug` · `/dashboard` · `/login` · `/register` · `/search?q=` · `/help/:slug` (about, contact, faq, terms, privacy, refund)

## Tính năng học tập

- **Nội dung bài học:** mọi bài trong đề cương đều có nội dung, từ vựng và quiz; bài audio/video có transcript. Dữ liệu ở `src/data/lessons.ts` và `src/data/lesson-content/*`; test toàn vẹn (`src/data/integrity.test.ts`) chặn bài thiếu nội dung hoặc còn văn bản giữ chỗ.
- **Trình phát bài học** (`features/lessons/LessonPlayer.tsx`): đọc transcript bằng giọng đọc trình duyệt, tô sáng câu đang đọc, phụ đề trên ảnh bìa, đổi tốc độ 0.75x–1.25x. Khi có file video/audio thật có thể thay phần giọng đọc bằng thẻ `<video>/<audio>`.
- **Test xếp lớp CEFR** (`/placement-test`): 18 câu (3 câu/cấp, dữ liệu ở `src/data/placement.ts`), xếp theo bậc thang – cấp đạt khi đúng ≥ 2/3; gợi ý lộ trình và khóa học.
- **Ôn từ vựng lặp lại ngắt quãng** (`/vocabulary#review`): biến thể SM-2 (`features/vocabulary/srs.ts`) với 4 mức Quên/Khó/Nhớ/Dễ, mỗi phiên gồm từ đến hạn + tối đa 5 từ mới.
- **Chuỗi ngày học & mục tiêu ngày** (Dashboard): XP cho bài học (+20), quiz (+10, đạt 100% +5), ôn từ (+2), thuộc từ (+2), test xếp lớp (+15); mỗi sự kiện chỉ cộng một lần. Logic ở `features/progress/streak.ts`.

Toàn bộ tiến độ lưu trong `localStorage` (store `src/store/progressStore.ts`).

## SEO & tốc độ tải

- Mỗi trang cập nhật `title`, `description`, Open Graph và canonical (`usePageMeta`); trang khóa học có JSON-LD `Course`, `index.html` có JSON-LD `EducationalOrganization`.
- Khi build, plugin `build/seoPlugin.ts` sinh `robots.txt` (chặn trang demo). Nếu đặt biến môi trường **`SITE_URL`** (vd. `https://<project>.pages.dev` – trên Cloudflare Pages: Settings → Environment variables), plugin sinh thêm `sitemap.xml` (mọi khóa học, bài học, giảng viên) và thẻ `og:image`/`og:url`/canonical tuyệt đối.
- Hộp tìm kiếm và dữ liệu bài học được lazy-load, nên bundle chính không chứa nội dung bài học.

## Deploy Cloudflare Pages

Deploy bằng **Cloudflare Pages Git integration** (không dùng GitHub Actions để deploy, tránh deploy hai lần):

| Thiết lập | Giá trị |
|---|---|
| Repository | `ThongTranNhi/English-academy` |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js | theo `.nvmrc` (Cloudflare build image v3 tự đọc file này) |

- Mỗi lần merge vào `main`, Cloudflare tự build và deploy production. Nhánh khác chỉ tạo bản preview.
- SPA fallback cho React Router có sẵn trong `public/_redirects` (`/* /index.html 200`) và được chép vào `dist/` khi build.
- Không cần secrets nào trong repo: kết nối GitHub ↔ Cloudflare do Cloudflare GitHub App quản lý.

## Ghi chú trước khi phát hành

- **Dữ liệu mẫu:** khóa học, giá, số học viên, giảng viên và phản hồi học viên (`src/data/*`) đều là dữ liệu minh họa. Hãy thay bằng dữ liệu thật; chỉ đặt `verified: true` trong `testimonials.ts` khi đã đối chiếu kết quả.
- **Đăng nhập/Đăng ký** là mô phỏng: không tạo tài khoản, không lưu mật khẩu, không gửi dữ liệu. Phiên mất khi tải lại trang.
- **Tiến độ học** (bài hoàn thành, từ đã thuộc, điểm quiz, XP/streak, lịch ôn từ, kết quả xếp lớp) lưu trong `localStorage` của trình duyệt.
- **Audio/phát âm** dùng Web Speech API của trình duyệt (giọng đọc tự động, chất lượng tùy trình duyệt/hệ điều hành). Khi có bản ghi thật, đặt file vào `public/audio`, `public/videos`.
- Link mạng xã hội trong footer (`SocialIcons.tsx`) đang là `#`. Nội dung điều khoản/bảo mật trong `data/info.ts` là bản nháp.
- SEO: xem mục **SEO & tốc độ tải**. Nếu cần SEO chuyên sâu (crawler không chạy JavaScript), thêm prerender hoặc chuyển sang SSG.
