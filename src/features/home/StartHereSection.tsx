import { Link } from "react-router";
import { ArrowUpRight, BookOpen, Headphones, Route } from "lucide-react";
import { Container } from "@/components/shared/Container";

const startingPoints = [
  { title: "Tìm lộ trình của bạn", description: "Khám phá từng cấp độ CEFR", href: "/learning-paths", icon: Route, color: "bg-primary text-white shadow-[0_6px_0_var(--color-primary-shade)]", sub: "text-white/90" },
  { title: "Thử một bài học", description: "Bắt đầu với IELTS Overview", href: "/learning/ielts-overview", icon: BookOpen, color: "bg-leaf text-navy shadow-[0_6px_0_var(--color-leaf-shade)]", sub: "text-navy/75" },
  { title: "Luyện một kỹ năng", description: "Nghe, nói, đọc hoặc viết", href: "/practice", icon: Headphones, color: "bg-sun text-navy shadow-[0_6px_0_var(--color-sun-shade)]", sub: "text-navy/75" },
];

export function StartHereSection() {
  return (
    <section aria-labelledby="start-heading" className="relative z-10 border-y-2 border-slate-100 bg-white py-8 sm:py-10">
      <Container className="grid gap-5 lg:grid-cols-[180px_1fr] lg:items-center">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-coral-ink">Bước đầu tiên</p>
          <h2 id="start-heading" className="mt-2 text-2xl font-black">Bắt đầu từ đâu?</h2>
        </div>
        <ul className="grid gap-4 sm:grid-cols-3">
          {startingPoints.map(({ title, description, href, icon: Icon, color, sub }) => (
            <li key={href}>
              <Link to={href} className={`group flex h-full items-center gap-3 rounded-3xl p-4 transition-transform hover:-translate-y-1 active:translate-y-1 ${color}`}>
                <span className="icon-pop flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/25"><Icon className="size-6" aria-hidden /></span>
                <span className="min-w-0 flex-1"><span className="block font-extrabold">{title}</span><span className={`mt-0.5 block text-xs font-semibold leading-relaxed ${sub}`}>{description}</span></span>
                <ArrowUpRight className="size-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
