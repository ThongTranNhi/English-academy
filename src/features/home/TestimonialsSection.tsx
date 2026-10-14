import { BadgeCheck, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { getCourse } from "@/data/courses";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Avatar } from "@/components/shared/Avatar";

export function TestimonialsSection() {
  return (
    <section aria-labelledby="testimonials-heading" className="section-y">
      <Container>
        <SectionHeading id="testimonials-heading" eyebrow="Phản hồi học viên" title="Kết quả thật từ những người đã học" align="center" />
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => {
            const course = getCourse(t.courseSlug);
            return (
              <li key={t.id}>
                <figure className="flex h-full flex-col rounded-[16px] border border-slate-200/80 bg-white p-6 shadow-sm">
                  <Quote className="size-8 text-primary/20" aria-hidden />
                  <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-slate-700">“{t.quote}”</blockquote>
                  <p className="mt-5 rounded-xl bg-highlight-soft px-3 py-2 text-sm font-semibold text-amber-800">{t.result}</p>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-5">
                    <Avatar name={t.name} tone={t.tone} size="sm" />
                    <div className="min-w-0">
                      <p className="flex items-center gap-1 text-sm font-semibold">
                        {t.name}
                        {t.verified && <BadgeCheck className="size-4 text-accent" aria-label="Kết quả đã xác thực" />}
                      </p>
                      <p className="truncate text-xs text-slate-500">{t.role}{course && ` · ${course.title}`}</p>
                    </div>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
