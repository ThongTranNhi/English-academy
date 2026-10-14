import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { skills } from "@/data/skills";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getIcon } from "@/lib/icons";
import { toneStyles } from "@/lib/tone";
import { cn } from "@/lib/utils";

export function SkillsSection() {
  return (
    <section aria-labelledby="skills-heading" className="section-y academy-pattern">
      <Container>
        <SectionHeading id="skills-heading" eyebrow="Luyện 4 kỹ năng" title="Nghe – Nói – Đọc – Viết" description="Mỗi kỹ năng có bài luyện theo cấp độ, mẹo làm bài và phần thực hành tương tác." align="center" />
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s) => {
            const Icon = getIcon(s.icon);
            return (
              <li key={s.skill}>
                <Link to={`/${s.skill}`} className="group flex h-full flex-col rounded-[16px] border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <span className={cn("flex size-14 items-center justify-center rounded-2xl", toneStyles[s.tone].soft, toneStyles[s.tone].text)}>
                    <Icon className="size-7" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{s.label}</h3>
                  <p className="text-sm font-medium text-slate-400">{s.english}</p>
                  <p className="mt-3 flex-1 text-sm text-slate-600">{s.description}</p>
                  <p className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
                    <span className="text-slate-500">{s.exercises.length} bài luyện</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-primary">Luyện ngay <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
