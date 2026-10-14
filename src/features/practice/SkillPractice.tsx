import { useMemo, useState, type ReactNode } from "react";
import { Clock, Lightbulb } from "lucide-react";
import type { CefrLevel, Skill } from "@/types";
import { getSkill } from "@/data/skills";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/shared/Container";
import { Tabs } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/EmptyState";
import { getIcon } from "@/lib/icons";
import { toneStyles } from "@/lib/tone";
import { cn } from "@/lib/utils";
import { usePageMeta } from "@/hooks/usePageMeta";

const levels: ("all" | CefrLevel)[] = ["all", "A1", "A2", "B1", "B2", "C1", "C2"];

/** Khung trang dùng chung cho 4 trang luyện kỹ năng. `demo` là phần thực hành riêng từng kỹ năng. */
export function SkillPractice({ skill, demo, demoTitle }: { skill: Skill; demo: ReactNode; demoTitle: string }) {
  const info = getSkill(skill);
  const [level, setLevel] = useState<"all" | CefrLevel>("all");
  const Icon = getIcon(info.icon);
  usePageMeta(`${info.label} (${info.english})`, info.description);

  const exercises = useMemo(
    () => (level === "all" ? info.exercises : info.exercises.filter((e) => e.level === level)),
    [info, level],
  );

  return (
    <>
      <PageHeader title={`${info.label} – ${info.english}`} description={info.description} breadcrumbs={[{ label: "Luyện tập", href: "/practice" }, { label: info.english }]} />

      <Container className="section-y space-y-16">
        <section aria-labelledby="demo-heading">
          <h2 id="demo-heading" className="mb-6 text-2xl font-bold">{demoTitle}</h2>
          {demo}
        </section>

        <section aria-labelledby="exercises-heading">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 id="exercises-heading" className="text-2xl font-bold">Bài luyện theo cấp độ</h2>
            <Tabs label="Lọc theo cấp độ" value={level} onChange={setLevel} items={levels.map((l) => ({ value: l, label: l === "all" ? "Tất cả" : l }))} />
          </div>
          {exercises.length === 0 ? (
            <EmptyState title="Chưa có bài luyện cho cấp độ này" description="Hãy chọn cấp độ khác hoặc quay lại sau." />
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {exercises.map((ex) => (
                <li key={ex.id} className="flex flex-col rounded-[14px] border border-slate-200/80 bg-white p-5 shadow-sm">
                  <div className={cn("mb-4 flex size-11 items-center justify-center rounded-xl", toneStyles[info.tone].soft, toneStyles[info.tone].text)}>
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <div className="mb-2 flex flex-wrap gap-1.5">
                    <Badge variant="navy">{ex.level}</Badge>
                    <Badge variant="outline">{ex.format}</Badge>
                  </div>
                  <h3 className="font-semibold">{ex.title}</h3>
                  <p className="mt-1 flex-1 text-sm text-slate-600">{ex.description}</p>
                  <p className="mt-4 inline-flex items-center gap-1 text-xs text-slate-500"><Clock className="size-3.5" aria-hidden /> {ex.durationMinutes} phút</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="tips-heading" className="rounded-[14px] bg-navy p-6 text-white sm:p-8">
          <h2 id="tips-heading" className="mb-4 flex items-center gap-2 text-xl font-bold">
            <Lightbulb className="size-5 text-highlight" aria-hidden /> Mẹo luyện {info.english}
          </h2>
          <ul className="grid gap-3 md:grid-cols-3">
            {info.tips.map((tip, i) => (
              <li key={tip} className="rounded-xl bg-white/5 p-4 text-sm text-slate-200">
                <span className="mb-1 block text-2xl font-bold text-accent">0{i + 1}</span>
                {tip}
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}
