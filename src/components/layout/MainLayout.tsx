import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { RouteFrame } from "./RouteFrame";
import { AcademyMascot } from "@/components/shared/AcademyMascot";

/** Cuộn về đầu trang khi đổi route, hoặc tới phần tử có id khớp với hash. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      // Đợi trang lazy-load render xong.
      const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }), 80);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function PageFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-label="Đang tải">
      <span className="size-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
    </div>
  );
}

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollManager />
      <Header />
      <main id="main" className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <RouteFrame><Outlet /></RouteFrame>
        </Suspense>
      </main>
      <Footer />
      <AcademyMascot />
    </div>
  );
}
