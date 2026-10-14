import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, CalendarDays, Check } from "lucide-react";
import { cefrLevels } from "@/data/cefr";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CefrSection() {
  const [active, setActive] = useState(2);
  const level = cefrLevels[active];

  return (
    <section aria-labelledby="cefr-heading" className="section-y">
      <Container>
        <SectionHeading id="cefr-heading" eyebrow="Lộ trình CEFR" title="6 cấp độ từ A1 đến C2" description="Biết rõ mình đang ở đâu và cần học gì tiếp theo theo Khung tham chiếu chung châu Âu." action={{ label: "Xem lộ trình chi tiết", href: "/learning-paths" }} />

        <div role="tablist" aria-label="Cấp độ CEFR" className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {cefrLevels.map((lv, i) => (
            <button
              key={lv.level}
              role="tab"
              id={`cefr-tab-${lv.level}`}
              aria-selected={active === i}
              aria-controls="cefr-panel"
              onClick={() => setActive(i)}
              className={cn(
                "rounded-xl border px-3 py-3 text-left transition-all",
                active === i ? "border-primary bg-primary text-white shadow-lg shadow-primary/25" : "border-slate-200 bg-white hover:border-primary/40",
              )}
            >
              <span className="block text-xl font-extrabold">{lv.level}</span>
              <span className={cn("block truncate text-xs", active === i ? "text-indigo-100" : "text-slate-500")}>{lv.name}</span>
            </button>
          ))}
        </div>

        <div key={level.level} id="cefr-panel" role="tabpanel" aria-labelledby={`cefr-tab-${level.level}`} className="content-switch mt-6 grid gap-6 rounded-[16px] border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[1.2fr_1fr_1fr] md:p-8">
          <div>
            <p className="text-sm font-semibold text-primary">{level.level} · {level.name}</p>
            <h3 className="mt-1 text-xl font-bold">{level.goal}</h3>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-slate-600"><CalendarDays className="size-4" aria-hidden /> Khoảng {level.weeks} tuần · 5 buổi/tuần</p>
            <div className="mt-6">
              <Button asChild size="sm">
                <Link to={`/learning-paths#${level.level.toLowerCase()}`}>Bắt đầu lộ trình {level.level} <ArrowRight aria-hidden /></Link>
              </Button>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">Bạn có thể</h4>
            <ul className="space-y-2">
              {level.canDo.map((c) => (
                <li key={c} className="flex gap-2 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-emerald-500" aria-hidden />{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">Nội dung chính</h4>
            <ul className="space-y-2">
              {level.contents.map((c) => (
                <li key={c} className="flex gap-2 text-sm"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
