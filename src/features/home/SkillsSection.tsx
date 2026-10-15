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
    <section aria-labelledby="skills-heading" className="section-y bg-sky-wash">
      <Container>
        <SectionHeading id="skills-heading" eyebrow="Luyện 4 kỹ năng" title="Nghe – Nói – Đọc – Viết" description="Mỗi kỹ năng có bài luyện theo cấp độ, mẹo làm bài và phần thực hành tương tác." align="center" />
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s) => {
            const Icon = getIcon(s.icon);
            return (
              <li key={s.skill}>
                <Link to={`/${s.skill}`} className={cn("group flex h-full flex-col rounded-[24px] p-6 transition-transform duration-300 hover:-translate-y-2 hover:-rotate-1 active:translate-y-1", toneStyles[s.tone].solid, toneStyles[s.tone].shade)}>
                  <span className={"icon-pop flex size-16 items-center justify-center rounded-2xl bg-white/25"}>
                    <Icon className="size-8" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-xl font-black">{s.label}</h3>
                  <p className="text-sm font-bold opacity-80">{s.english}</p>
                  <p className="mt-3 flex-1 text-sm font-medium opacity-90">{s.description}</p>
                  <p className="mt-5 flex items-center justify-between border-t-2 border-current/20 pt-4 text-sm">
                    <span className="font-semibold opacity-90">{s.exercises.length} bài luyện</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 font-extrabold text-navy">Luyện ngay <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
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
