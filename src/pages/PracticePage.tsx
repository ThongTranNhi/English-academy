import { Link } from "react-router";
import { ArrowRight, BookText, Languages } from "lucide-react";
import { skills } from "@/data/skills";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/shared/Container";
import { getIcon } from "@/lib/icons";
import { toneStyles } from "@/lib/tone";
import { cn } from "@/lib/utils";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function PracticePage() {
  usePageMeta("Bài tập & luyện tập", "Luyện 4 kỹ năng Nghe, Nói, Đọc, Viết cùng bài tập từ vựng và ngữ pháp.");
  return (
    <>
      <PageHeader title="Luyện tập" description="Chọn kỹ năng muốn luyện. Mỗi phần có bài mẫu tương tác và bài luyện theo cấp độ." breadcrumbs={[{ label: "Luyện tập" }]} />
      <Container className="section-y space-y-12">
        <ul className="grid gap-6 sm:grid-cols-2">
          {skills.map((s) => {
            const Icon = getIcon(s.icon);
            return (
              <li key={s.skill}>
                <Link to={`/${s.skill}`} className="group flex h-full gap-5 rounded-[16px] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <span className={cn("flex size-14 shrink-0 items-center justify-center rounded-2xl", toneStyles[s.tone].soft, toneStyles[s.tone].text)}>
                    <Icon className="size-7" aria-hidden />
                  </span>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold group-hover:text-primary">{s.label} <span className="font-medium text-slate-400">· {s.english}</span></h2>
                    <p className="mt-1 text-sm text-slate-600">{s.description}</p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {Array.from(new Set(s.exercises.map((e) => e.format))).map((f) => (
                        <li key={f} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">{f}</li>
                      ))}
                    </ul>
                  </div>
                  <ArrowRight className="size-5 shrink-0 self-center text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-primary" aria-hidden />
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="grid gap-6 sm:grid-cols-2">
          <Link to="/vocabulary" className="flex items-center gap-4 rounded-[16px] bg-gradient-to-br from-rose-500 to-pink-600 p-6 text-white transition-transform hover:-translate-y-1">
            <Languages className="size-10" aria-hidden />
            <div><p className="text-lg font-bold">Bài tập từ vựng</p><p className="text-sm text-rose-100">Flashcard & quiz theo chủ đề</p></div>
          </Link>
          <Link to="/grammar" className="flex items-center gap-4 rounded-[16px] bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white transition-transform hover:-translate-y-1">
            <BookText className="size-10" aria-hidden />
            <div><p className="text-lg font-bold">Bài tập ngữ pháp</p><p className="text-sm text-emerald-100">Trắc nghiệm có giải thích</p></div>
          </Link>
        </div>
      </Container>
    </>
  );
}
