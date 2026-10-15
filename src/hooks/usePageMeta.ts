import { useEffect } from "react";

const SITE = "English Academy";

/** Tạo hoặc cập nhật một thẻ trong <head> (meta/link) theo selector. */
function upsert(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

const meta = (key: "name" | "property", name: string) => () => {
  const el = document.createElement("meta");
  el.setAttribute(key, name);
  return el;
};

/** Cập nhật title, description, Open Graph và canonical cho từng trang (SEO cơ bản cho SPA). */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE}` : `${SITE} – Học viện tiếng Anh trực tuyến`;
    document.title = fullTitle;
    upsert('meta[property="og:title"]', meta("property", "og:title"), "content", fullTitle);
    if (description) {
      upsert('meta[name="description"]', meta("name", "description"), "content", description);
      upsert('meta[property="og:description"]', meta("property", "og:description"), "content", description);
    }
    const url = window.location.origin + window.location.pathname;
    upsert('link[rel="canonical"]', () => Object.assign(document.createElement("link"), { rel: "canonical" }), "href", url);
    upsert('meta[property="og:url"]', meta("property", "og:url"), "content", url);
  }, [title, description]);
}

/** Chèn dữ liệu cấu trúc schema.org (JSON-LD) cho trang hiện tại; gỡ bỏ khi rời trang. */
export function useJsonLd(data: Record<string, unknown> | null) {
  const json = data ? JSON.stringify(data) : null;
  useEffect(() => {
    if (!json) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.page = "true";
    script.textContent = json;
    document.head.appendChild(script);
    return () => script.remove();
  }, [json]);
}
