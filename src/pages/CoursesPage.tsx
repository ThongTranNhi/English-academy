import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { Search } from "lucide-react";
import type { CefrLevel, CourseCategory } from "@/types";
import { courses } from "@/data/courses";
import { courseCategoryLabels } from "@/data/categories";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/shared/Container";
import { EmptyState } from "@/components/shared/EmptyState";
import { Tabs } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/features/courses/CourseCard";
import { usePageMeta } from "@/hooks/usePageMeta";
import { matchesQuery } from "@/lib/utils";

const levels: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];
const sorts = { popular: "Phổ biến", rating: "Đánh giá cao", priceAsc: "Giá thấp → cao", priceDesc: "Giá cao → thấp" } as const;
type SortKey = keyof typeof sorts;

export default function CoursesPage() {
  const [params, setParams] = useSearchParams();
  const category = (params.get("category") ?? "all") as "all" | CourseCategory;
  const level = params.get("level") ?? "all";
  const q = params.get("q") ?? "";
  const sort = (params.get("sort") ?? "popular") as SortKey;

  usePageMeta(category === "all" ? "Khóa học" : `Khóa học ${courseCategoryLabels[category]}`, "Danh sách khóa học IELTS, TOEIC, giao tiếp, General English và tiếng Anh thương mại.");

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (!value || value === "all" || (key === "sort" && value === "popular")) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    const list = courses.filter(
      (c) =>
        (category === "all" || c.category === category) &&
        (level === "all" || c.level === level) &&
        matchesQuery(q, c.title, c.shortDescription),
    );
    const sorters: Record<SortKey, (a: (typeof list)[number], b: (typeof list)[number]) => number> = {
      popular: (a, b) => b.students - a.students,
      rating: (a, b) => b.rating - a.rating,
      priceAsc: (a, b) => a.price - b.price,
      priceDesc: (a, b) => b.price - a.price,
    };
    return [...list].sort(sorters[sort]);
  }, [category, level, q, sort]);

  return (
    <>
      <PageHeader title="Khóa học" description="Chọn khóa học theo mục tiêu và trình độ của bạn. Mỗi khóa đều có bài học thử miễn phí." breadcrumbs={[{ label: "Khóa học" }]} />
      <Container className="py-10 lg:py-14">
        <div className="mb-8 space-y-4">
          <Tabs
            label="Danh mục khóa học"
            value={category}
            onChange={(v) => update("category", v)}
            items={[{ value: "all", label: "Tất cả" }, ...(Object.keys(courseCategoryLabels) as CourseCategory[]).map((k) => ({ value: k, label: courseCategoryLabels[k] }))]}
          />
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
              <Input type="search" value={q} onChange={(e) => update("q", e.target.value)} placeholder="Tìm khóa học…" aria-label="Tìm khóa học" className="pl-10" />
            </div>
            <select value={level} onChange={(e) => update("level", e.target.value)} aria-label="Lọc theo cấp độ" className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm">
              <option value="all">Mọi cấp độ</option>
              {levels.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
            <select value={sort} onChange={(e) => update("sort", e.target.value)} aria-label="Sắp xếp" className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm">
              {(Object.keys(sorts) as SortKey[]).map((k) => <option key={k} value={k}>{sorts[k]}</option>)}
            </select>
          </div>
        </div>

        <p className="mb-5 text-sm text-slate-600" aria-live="polite">{filtered.length} khóa học</p>

        {filtered.length === 0 ? (
          <EmptyState title="Không tìm thấy khóa học phù hợp" description="Thử bỏ bớt bộ lọc hoặc dùng từ khóa khác." action={<Button variant="outline" onClick={() => setParams({})}>Xóa bộ lọc</Button>} />
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((c) => (
              <li key={c.slug} className="flex">
                <CourseCard course={c} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
