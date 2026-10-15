import { describe, expect, it } from "vitest";
import { buildRobots, buildSitemap, sitemapRoutes } from "./seoPlugin";
import { courses } from "../src/data/courses";
import { lessons } from "../src/data/lessons";

describe("SEO files", () => {
  it("sitemap có trang tĩnh, mọi khóa học và bài học, không có trang demo", () => {
    const routes = sitemapRoutes();
    expect(routes).toContain("/placement-test");
    expect(routes).toContain(`/courses/${courses[0].slug}`);
    expect(routes.filter((r) => r.startsWith("/learning/"))).toHaveLength(lessons.length);
    expect(routes).not.toContain("/dashboard");
    expect(new Set(routes).size).toBe(routes.length);
  });

  it("sitemap dùng URL tuyệt đối, bỏ dấu / thừa ở domain", () => {
    const xml = buildSitemap("https://example.com/", "2026-10-15");
    expect(xml).toContain("<loc>https://example.com/courses</loc>");
    expect(xml).toContain("<lastmod>2026-10-15</lastmod>");
    expect(xml).not.toContain("example.com//");
  });

  it("robots chặn trang demo và chỉ khai báo sitemap khi biết domain", () => {
    expect(buildRobots()).toContain("Disallow: /dashboard");
    expect(buildRobots()).not.toContain("Sitemap:");
    expect(buildRobots("https://example.com")).toContain("Sitemap: https://example.com/sitemap.xml");
  });
});
