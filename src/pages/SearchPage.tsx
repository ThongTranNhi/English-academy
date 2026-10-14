import { Link, useSearchParams } from "react-router";
import { Search } from "lucide-react";
import { searchAll } from "@/lib/search";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/shared/Container";
import { EmptyState } from "@/components/shared/EmptyState";
import { Input } from "@/components/ui/input";
import { CourseCard } from "@/features/courses/CourseCard";
import { TeacherCard } from "@/features/teachers/TeacherCard";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const results = searchAll(q);
  const total = results.courses.length + results.lessons.length + results.teachers.length;
  usePageMeta(q ? `Tìm kiếm: ${q}` : "Tìm kiếm");

  return (
    <>
      <PageHeader title="Tìm kiếm" breadcrumbs={[{ label: "Tìm kiếm" }]}>
        <div className="relative max-w-xl">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
          <Input type="search" value={q} onChange={(e) => setParams(e.target.value ? { q: e.target.value } : {}, { replace: true })} placeholder="Khóa học, bài học, giảng viên…" aria-label="Từ khóa tìm kiếm" className="pl-10" autoFocus />
        </div>
      </PageHeader>
      <Container className="space-y-12 py-10 lg:py-14">
        {!q.trim() ? (
          <EmptyState title="Nhập từ khóa để tìm kiếm" description="Ví dụ: IELTS, phát âm, TOEIC, Sarah…" />
        ) : total === 0 ? (
          <EmptyState title={`Không có kết quả cho “${q}”`} description="Thử từ khóa ngắn hơn hoặc không dấu." />
        ) : (
          <>
            <p className="text-sm text-slate-600" aria-live="polite">{total} kết quả cho “{q}”</p>
            {results.courses.length > 0 && (
              <section aria-labelledby="r-courses">
                <h2 id="r-courses" className="mb-5 text-xl font-bold">Khóa học ({results.courses.length})</h2>
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {results.courses.map((c) => <li key={c.slug} className="flex"><CourseCard course={c} /></li>)}
                </ul>
              </section>
            )}
            {results.lessons.length > 0 && (
              <section aria-labelledby="r-lessons">
                <h2 id="r-lessons" className="mb-5 text-xl font-bold">Bài học ({results.lessons.length})</h2>
                <ul className="divide-y divide-slate-100 rounded-[14px] border border-slate-200 bg-white">
                  {results.lessons.map((l) => (
                    <li key={l.slug}>
                      <Link to={`/learning/${l.slug}`} className="flex flex-col gap-0.5 p-4 hover:bg-surface sm:flex-row sm:items-center sm:justify-between">
                        <span className="font-medium">{l.title}</span>
                        <span className="text-sm text-slate-500">{l.durationMinutes} phút</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {results.teachers.length > 0 && (
              <section aria-labelledby="r-teachers">
                <h2 id="r-teachers" className="mb-5 text-xl font-bold">Giảng viên ({results.teachers.length})</h2>
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {results.teachers.map((t) => <li key={t.slug} className="flex [&>*]:flex-1"><TeacherCard teacher={t} /></li>)}
                </ul>
              </section>
            )}
          </>
        )}
      </Container>
    </>
  );
}
