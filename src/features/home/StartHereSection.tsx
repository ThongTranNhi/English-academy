import { Link } from "react-router";
import { ArrowUpRight, BookOpen, Headphones, Route } from "lucide-react";
import { Container } from "@/components/shared/Container";

const startingPoints = [
  { title: "Tìm lộ trình của bạn", description: "Khám phá từng cấp độ CEFR", href: "/learning-paths", icon: Route, color: "bg-primary-soft text-primary" },
  { title: "Thử một bài học", description: "Bắt đầu với IELTS Overview", href: "/learning/ielts-overview", icon: BookOpen, color: "bg-accent-soft text-cyan-700" },
  { title: "Luyện một kỹ năng", description: "Nghe, nói, đọc hoặc viết", href: "/practice", icon: Headphones, color: "bg-highlight-soft text-amber-700" },
];

export function StartHereSection() {
  return (
    <section aria-labelledby="start-heading" className="relative z-10 border-y border-slate-200/70 bg-white/90 py-6 sm:py-8">
      <Container className="grid gap-5 lg:grid-cols-[180px_1fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Bước đầu tiên</p>
          <h2 id="start-heading" className="mt-2 text-xl font-bold">Bắt đầu từ đâu?</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {startingPoints.map(({ title, description, href, icon: Icon, color }) => (
            <Link key={href} to={href} className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-surface/70 p-4 transition-colors hover:border-primary/40 hover:bg-primary-soft">
              <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${color}`}><Icon className="size-5" aria-hidden /></span>
              <span className="min-w-0 flex-1"><span className="block text-sm font-bold">{title}</span><span className="mt-1 block text-xs leading-relaxed text-slate-500">{description}</span></span>
              <ArrowUpRight className="size-4 shrink-0 text-slate-400 group-hover:text-primary" aria-hidden />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
