import { useEffect } from "react";

const SITE = "English Academy";

/** Cập nhật title và meta description cho từng trang (SEO cơ bản cho SPA). */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE}` : `${SITE} – Học viện tiếng Anh trực tuyến`;
    if (description) {
      let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = description;
    }
  }, [title, description]);
}
