import { Link } from "react-router";
import { CalendarDays, Check } from "lucide-react";
import { cefrLevels } from "@/data/cefr";
import { courses } from "@/data/courses";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/shared/Container";
import { Badge } from "@/components/ui/badge";
import { toneStyles } from "@/lib/tone";
import { cn } from "@/lib/utils";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function LearningPathsPage() {
  usePageMeta("Lộ trình CEFR A1–C2", "Lộ trình học tiếng Anh theo 6 cấp độ CEFR: mục tiêu, năng lực đầu ra và nội dung từng cấp.");
  return (
    <>
      <PageHeader title="Lộ trình CEFR A1 – C2" description="Mỗi cấp độ có mục tiêu rõ ràng, năng lực đầu ra cụ thể và khóa học gợi ý." breadcrumbs={[{ label: "Lộ trình" }]}>
        <Link to="/placement-test" className="mb-4 inline-flex items-center gap-2 rounded-2xl bg-sun px-5 py-2.5 text-sm font-extrabold text-navy shadow-[0_4px_0_var(--color-sun-shade)] hover:brightness-105">
          Chưa biết trình độ? Làm test xếp lớp 8 phút →
        </Link>
        <nav aria-label="Chuyển nhanh tới cấp độ" className="flex flex-wrap gap-2">
          {cefrLevels.map((l) => (
            <a key={l.level} href={`#${l.level.toLowerCase()}`} className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white hover:bg-white/20">{l.level}</a>
          ))}
        </nav>
      </PageHeader>

      <Container className="section-y">
        <ol className="relative space-y-8 before:absolute before:bottom-0 before:left-6 before:top-0 before:w-0.5 before:bg-slate-200 md:before:left-8">
          {cefrLevels.map((lv) => {
            const suggested = courses.filter((c) => c.level === lv.level);
            return (
              <li key={lv.level} id={lv.level.toLowerCase()} className="relative scroll-mt-28 pl-16 md:pl-24">
                <span className={cn("absolute left-0 top-0 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br text-lg font-extrabold text-white shadow-lg md:size-16 md:text-xl", toneStyles[lv.tone].cover)}>
                  {lv.level}
                </span>
                <div className="rounded-[16px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-bold">{lv.level} – {lv.name}</h2>
                    <Badge variant="outline"><CalendarDays className="size-3.5" aria-hidden /> ~{lv.weeks} tuần</Badge>
                  </div>
                  <p className="mt-2 text-slate-600">{lv.goal}</p>
                  <div className="mt-6 grid gap-6 md:grid-cols-3">
                    <div>
                      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">Năng lực đầu ra</h3>
                      <ul className="space-y-1.5">
                        {lv.canDo.map((c) => <li key={c} className="flex gap-2 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-emerald-500" aria-hidden />{c}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">Nội dung học</h3>
                      <ul className="space-y-1.5">
                        {lv.contents.map((c) => <li key={c} className="flex gap-2 text-sm"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />{c}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">Khóa học gợi ý</h3>
                      {suggested.length ? (
                        <ul className="space-y-1.5">
                          {suggested.map((c) => <li key={c.slug}><Link to={`/courses/${c.slug}`} className="text-sm font-medium text-primary hover:underline">{c.title}</Link></li>)}
                        </ul>
                      ) : (
                        <p className="text-sm text-slate-500">Khóa học cho cấp độ này đang được biên soạn.</p>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </>
  );
}
