import { useState } from "react";
import { useLocation } from "react-router";
import type { CefrLevel } from "@/types";
import { grammarLessons } from "@/data/grammar";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/shared/Container";
import { Quiz } from "@/components/shared/Quiz";
import { Tabs } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function GrammarPage() {
  const [level, setLevel] = useState<"all" | CefrLevel>("all");
  const { hash } = useLocation();
  const hashSlug = grammarLessons.find((g) => g.slug === hash.slice(1))?.slug;
  const [activeSlug, setActiveSlug] = useState(hashSlug ?? grammarLessons[0].slug);
  // Khi URL hash đổi (vd. bấm link từ trang chủ), chọn bài tương ứng.
  const [prevHash, setPrevHash] = useState(hash);
  if (hash !== prevHash) {
    setPrevHash(hash);
    if (hashSlug) setActiveSlug(hashSlug);
  }
  usePageMeta("Ngữ pháp tiếng Anh", "Bài học ngữ pháp tiếng Anh theo cấp độ, có cấu trúc, ví dụ và bài tập thực hành.");

  const levels = Array.from(new Set(grammarLessons.map((g) => g.level))).sort();
  const list = level === "all" ? grammarLessons : grammarLessons.filter((g) => g.level === level);
  const active = grammarLessons.find((g) => g.slug === activeSlug) ?? grammarLessons[0];

  return (
    <>
      <PageHeader title="Ngữ pháp" description="Bài học ngắn gọn với cấu trúc, ví dụ và bài tập có giải thích." breadcrumbs={[{ label: "Ngữ pháp" }]} />
      <Container className="section-y">
        <div id="lessons" className="scroll-mt-28">
          <Tabs className="mb-6" label="Lọc theo cấp độ" value={level} onChange={setLevel} items={[{ value: "all" as const, label: "Tất cả" }, ...levels.map((l) => ({ value: l, label: l }))]} />
        </div>
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <nav aria-label="Danh sách bài ngữ pháp">
            <ul className="space-y-2">
              {list.map((g) => (
                <li key={g.slug} id={g.slug} className="scroll-mt-28">
                  <button
                    type="button"
                    onClick={() => setActiveSlug(g.slug)}
                    aria-current={g.slug === active.slug ? "true" : undefined}
                    className={cn("w-full rounded-[14px] border p-4 text-left transition-colors", g.slug === active.slug ? "border-primary bg-primary-soft" : "border-slate-200 bg-white hover:border-primary/40")}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-semibold">{g.title}</span>
                      <Badge variant="navy">{g.level}</Badge>
                    </span>
                    <span className="mt-1 block text-sm text-slate-600">{g.summary}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <article aria-labelledby="grammar-title" className="min-w-0 space-y-6">
            <div className="rounded-[14px] border border-slate-200 bg-white p-6">
              <Badge>{active.level}</Badge>
              <h2 id="grammar-title" className="mt-2 text-2xl font-bold">{active.title}</h2>
              <p className="mt-2 text-slate-600">{active.summary}</p>
              <h3 className="mb-2 mt-6 font-semibold">Cấu trúc</h3>
              <ul className="space-y-2">
                {active.structure.map((s) => <li key={s} className="rounded-lg bg-navy px-4 py-2.5 font-mono text-sm text-cyan-200">{s}</li>)}
              </ul>
              <h3 className="mb-2 mt-6 font-semibold">Ví dụ</h3>
              <ul className="space-y-1.5">
                {active.examples.map((e) => <li key={e} className="border-l-4 border-accent pl-3 font-body italic text-slate-700">{e}</li>)}
              </ul>
            </div>
            <div id="exercises" className="scroll-mt-28">
              <Quiz key={active.slug} id={`grammar-${active.slug}`} questions={active.exercises} title="Bài tập thực hành" />
            </div>
          </article>
        </div>
      </Container>
    </>
  );
}
