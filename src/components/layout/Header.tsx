import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { ChevronDown, LayoutDashboard, LogOut, Menu, Search, X } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";
import { SearchDialog } from "./SearchDialog";

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  // true khi menu đang mở do hover chuột: lần bấm đầu tiên giữ menu mở thay vì đóng.
  const openedByHover = useRef(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);

  // Đóng menu khi chuyển trang (điều chỉnh state trong lúc render thay vì dùng effect).
  const locationKey = location.pathname + location.search + location.hash;
  const [prevLocationKey, setPrevLocationKey] = useState(locationKey);
  if (locationKey !== prevLocationKey) {
    setPrevLocationKey(locationKey);
    setOpenMenu(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const closeSearch = useCallback(() => setSearchOpen(false), []);

  return (
    <header className={cn("sticky top-0 z-50 border-b-2 bg-white/95 backdrop-blur transition-shadow", scrolled ? "border-slate-200 shadow-[0_6px_20px_rgb(30_27_75/0.08)]" : "border-transparent")}>
      <div aria-hidden className="rainbow-bar h-1.5" />
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white">
        Bỏ qua điều hướng
      </a>
      <Container className="flex h-16 items-center gap-4 lg:h-[76px]">
        <Logo />

        {/* Desktop mega menu */}
        <nav aria-label="Điều hướng chính" className="ml-2 hidden flex-1 xl:block">
          <ul className="flex items-center">
            {mainNav.map((item) => (
              <li
                key={item.label}
                className="relative"
                // Chỉ mở theo hover với chuột; trên cảm ứng, chạm sẽ toggle qua onClick
                // (tránh pointerenter + click làm menu mở rồi đóng ngay).
                onPointerEnter={(e) => {
                  if (e.pointerType !== "mouse" || !item.children) return;
                  openedByHover.current = true;
                  setOpenMenu(item.label);
                }}
                onPointerLeave={(e) => {
                  if (e.pointerType !== "mouse") return;
                  openedByHover.current = false;
                  setOpenMenu(null);
                }}
              >
                {item.children ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={openMenu === item.label}
                      aria-haspopup="true"
                      onClick={() => {
                        const keepOpen = openedByHover.current;
                        openedByHover.current = false;
                        setOpenMenu((m) => (m === item.label && !keepOpen ? null : item.label));
                      }}
                      className={cn(
                        "flex items-center gap-0.5 whitespace-nowrap rounded-xl px-2.5 py-2 text-sm font-bold transition-colors hover:bg-primary-soft hover:text-primary 2xl:px-3 2xl:text-[15px]",
                        location.pathname.startsWith(item.href) ? "text-primary" : "text-slate-700",
                      )}
                    >
                      {item.label}
                      <ChevronDown className={cn("size-4 transition-transform", openMenu === item.label && "rotate-180")} aria-hidden />
                    </button>
                    {openMenu === item.label && (
                      <div className="absolute left-0 top-full pt-2">
                        <div className={cn("rounded-3xl border-2 border-slate-200 bg-white p-3 shadow-[0_6px_0_#e2e8f0,0_24px_40px_rgb(30_27_75/0.12)]", item.children.some((c) => c.description) ? "w-[520px]" : "w-60")}>
                          <ul className={cn("grid gap-1", item.children.some((c) => c.description) && "grid-cols-2")}>
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link to={child.href} className="block rounded-xl px-3 py-2.5 hover:bg-primary-soft">
                                  <span className="block text-sm font-semibold text-navy">{child.label}</span>
                                  {child.description && <span className="mt-0.5 block text-xs text-slate-500">{child.description}</span>}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <Link to={item.href} className="mt-2 block rounded-xl bg-surface px-3 py-2.5 text-sm font-semibold text-primary hover:bg-primary-soft">
                            Xem tất cả {item.label.toLowerCase()} →
                          </Link>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={item.href}
                    className={({ isActive }) => cn("block whitespace-nowrap rounded-xl px-2.5 py-2 text-sm font-bold transition-colors hover:bg-primary-soft hover:text-primary 2xl:px-3 2xl:text-[15px]", isActive ? "text-primary" : "text-slate-700")}
                  >
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} aria-label="Tìm kiếm (Ctrl+K)">
            <Search className="!size-5" aria-hidden />
          </Button>
          {user ? (
            <div className="hidden shrink-0 items-center gap-2 sm:flex">
              <Button asChild variant="secondary" size="sm">
                <Link to="/dashboard"><LayoutDashboard aria-hidden /> {user.name.split(" ").pop()}</Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={signOut} aria-label="Đăng xuất"><LogOut aria-hidden /></Button>
            </div>
          ) : (
            <div className="hidden shrink-0 items-center gap-2 sm:flex">
              <Button asChild variant="ghost" size="sm"><Link to="/login">Đăng nhập</Link></Button>
              <Button asChild size="sm"><Link to="/register">Đăng ký</Link></Button>
            </div>
          )}
          <Button variant="ghost" size="icon" className="xl:hidden" onClick={() => setMobileOpen((o) => !o)} aria-expanded={mobileOpen} aria-controls="mobile-menu" aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}>
            {mobileOpen ? <X className="!size-5" aria-hidden /> : <Menu className="!size-5" aria-hidden />}
          </Button>
        </div>
      </Container>

      {/* Mobile / tablet menu */}
      {mobileOpen && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[70px] overflow-y-auto border-t border-slate-200 bg-white lg:top-[82px] xl:hidden">
          <Container className="py-4">
            <nav aria-label="Điều hướng di động">
              <ul className="divide-y divide-slate-100">
                {mainNav.map((item) => (
                  <li key={item.label}>
                    {item.children ? (
                      <>
                        <button
                          type="button"
                          className="flex w-full items-center justify-between py-3.5 text-left font-medium"
                          aria-expanded={mobileSection === item.label}
                          onClick={() => setMobileSection((s) => (s === item.label ? null : item.label))}
                        >
                          {item.label}
                          <ChevronDown className={cn("size-5 text-slate-400 transition-transform", mobileSection === item.label && "rotate-180")} aria-hidden />
                        </button>
                        {mobileSection === item.label && (
                          <ul className="mb-3 grid gap-1 sm:grid-cols-2">
                            {[{ label: `Tất cả ${item.label.toLowerCase()}`, href: item.href }, ...item.children].map((child) => (
                              <li key={child.href}>
                                <Link to={child.href} className="block rounded-lg bg-surface px-3 py-2.5 text-sm text-slate-700 hover:text-primary">{child.label}</Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link to={item.href} className="block py-3.5 font-medium">{item.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:hidden">
              {user ? (
                <>
                  <Button asChild variant="secondary"><Link to="/dashboard">Dashboard</Link></Button>
                  <Button variant="outline" onClick={signOut}>Đăng xuất</Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline"><Link to="/login">Đăng nhập</Link></Button>
                  <Button asChild><Link to="/register">Đăng ký</Link></Button>
                </>
              )}
            </div>
          </Container>
        </div>
      )}

      <SearchDialog open={searchOpen} onClose={closeSearch} />
    </header>
  );
}
