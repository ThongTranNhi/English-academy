import type { Plugin } from "vite";
import { courses } from "../src/data/courses";
import { lessons } from "../src/data/lessons";
import { teachers } from "../src/data/teachers";
import { infoPages } from "../src/data/info";

/** Các route tĩnh trong src/app/router.tsx (trừ trang demo đăng nhập/dashboard/tìm kiếm). */
const STATIC_ROUTES = [
  "/", "/courses", "/learning-paths", "/placement-test", "/practice", "/listening", "/speaking", "/reading", "/writing",
  "/vocabulary", "/grammar", "/library", "/teachers",
];

export function sitemapRoutes(): string[] {
  return [
    ...STATIC_ROUTES,
    ...courses.map((c) => `/courses/${c.slug}`),
    ...lessons.map((l) => `/learning/${l.slug}`),
    ...teachers.map((t) => `/teachers/${t.slug}`),
    ...infoPages.map((p) => `/help/${p.slug}`),
  ];
}

const xmlEscape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function buildSitemap(siteUrl: string, lastmod: string): string {
  const base = siteUrl.replace(/\/+$/, "");
  const urls = sitemapRoutes()
    .map((path) => `  <url><loc>${xmlEscape(base + path)}</loc><lastmod>${lastmod}</lastmod></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function buildRobots(siteUrl?: string): string {
  const lines = ["User-agent: *", "Allow: /", "Disallow: /dashboard", "Disallow: /login", "Disallow: /register", "Disallow: /search"];
  if (siteUrl) lines.push("", `Sitemap: ${siteUrl.replace(/\/+$/, "")}/sitemap.xml`);
  return lines.join("\n") + "\n";
}

/**
 * Sinh robots.txt và sitemap.xml khi build, chèn URL tuyệt đối cho og:image/og:url.
 * Sitemap và URL tuyệt đối cần domain thật, nên chỉ sinh khi có biến môi trường SITE_URL
 * (vd. SITE_URL=https://english-academy.pages.dev npm run build).
 */
export function seoPlugin(siteUrl = process.env.SITE_URL): Plugin {
  const base = siteUrl?.replace(/\/+$/, "");
  return {
    name: "english-academy-seo",
    apply: "build",
    transformIndexHtml(html) {
      if (!base) return html;
      return {
        html,
        tags: [
          { tag: "link", attrs: { rel: "canonical", href: `${base}/` }, injectTo: "head" },
          { tag: "meta", attrs: { property: "og:url", content: `${base}/` }, injectTo: "head" },
          { tag: "meta", attrs: { property: "og:image", content: `${base}/images/academy-video-poster.jpg` }, injectTo: "head" },
        ],
      };
    },
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "robots.txt", source: buildRobots(base) });
      if (base) {
        this.emitFile({ type: "asset", fileName: "sitemap.xml", source: buildSitemap(base, new Date().toISOString().slice(0, 10)) });
      }
    },
  };
}
