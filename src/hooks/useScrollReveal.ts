import { useEffect } from "react";

const SECTIONS = "section:not([data-no-reveal]):not(.is-revealed)";

/**
 * Cho các section trong `rootId` trượt lên khi cuộn tới (CSS ở .reveal-on trong index.css).
 * Không có IntersectionObserver hoặc người dùng giảm chuyển động thì nội dung hiện ngay.
 */
export function useScrollReveal(rootId = "main") {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root || typeof IntersectionObserver === "undefined" || typeof MutationObserver === "undefined") return;
    if (typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -10% 0px" });

    // Trang lazy-load và nội dung đổi theo route: theo dõi section mới mỗi khi DOM thay đổi.
    const scan = () => root.querySelectorAll(SECTIONS).forEach((section) => observer.observe(section));
    scan();
    const mutations = new MutationObserver(scan);
    mutations.observe(root, { childList: true, subtree: true });
    document.documentElement.classList.add("reveal-on");

    return () => {
      document.documentElement.classList.remove("reveal-on");
      mutations.disconnect();
      observer.disconnect();
    };
  }, [rootId]);
}
