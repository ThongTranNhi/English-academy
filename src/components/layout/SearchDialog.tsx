import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { BookOpen, GraduationCap, Search, User, X } from "lucide-react";
import { searchAll } from "@/lib/search";
import { useDebounce } from "@/hooks/useDebounce";

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 150);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const results = searchAll(debounced);
  const total = results.courses.length + results.lessons.length + results.teachers.length;

  const groups = [
    { label: "Khóa học", icon: GraduationCap, items: results.courses.slice(0, 4).map((c) => ({ key: c.slug, title: c.title, meta: c.level, href: `/courses/${c.slug}` })) },
    { label: "Bài học", icon: BookOpen, items: results.lessons.slice(0, 4).map((l) => ({ key: l.slug, title: l.title, meta: `${l.durationMinutes} phút`, href: `/learning/${l.slug}` })) },
    { label: "Giảng viên", icon: User, items: results.teachers.slice(0, 3).map((t) => ({ key: t.slug, title: t.name, meta: t.title, href: `/teachers/${t.slug}` })) },
  ].filter((g) => g.items.length);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onClose();
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-navy/60 px-4 pt-[10vh] backdrop-blur-sm" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label="Tìm kiếm" className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={submit} className="flex items-center gap-3 border-b border-slate-100 px-4">
          <Search className="size-5 text-slate-400" aria-hidden />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm khóa học, bài học, giảng viên…"
            aria-label="Từ khóa tìm kiếm"
            className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-slate-400"
          />
          <button type="button" onClick={onClose} aria-label="Đóng tìm kiếm" className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100">
            <X className="size-5" aria-hidden />
          </button>
        </form>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {!debounced.trim() ? (
            <p className="px-3 py-6 text-center text-sm text-slate-500">Gợi ý: IELTS, TOEIC, phát âm, Sarah…</p>
          ) : total === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-slate-500">Không tìm thấy kết quả cho “{debounced}”.</p>
          ) : (
            <>
              {groups.map((g) => (
                <div key={g.label} className="mb-2">
                  <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-slate-400">{g.label}</p>
                  <ul>
                    {g.items.map((item) => (
                      <li key={item.key}>
                        <Link to={item.href} onClick={onClose} className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-primary-soft">
                          <g.icon className="size-4 shrink-0 text-primary" aria-hidden />
                          <span className="flex-1 truncate text-sm font-medium">{item.title}</span>
                          <span className="shrink-0 text-xs text-slate-500">{item.meta}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <button type="button" onClick={submit} className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-primary hover:bg-primary-soft">
                Xem tất cả {total} kết quả →
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
