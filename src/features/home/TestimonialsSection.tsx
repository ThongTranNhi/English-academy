import { BadgeCheck, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { getCourse } from "@/data/courses";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Avatar } from "@/components/shared/Avatar";

export function TestimonialsSection() {
  return (
    <section aria-labelledby="testimonials-heading" className="section-y bg-sky-wash">
      <Container>
        <SectionHeading id="testimonials-heading" eyebrow="Phản hồi học viên" title="Kết quả thật từ những người đã học" align="center" />
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.slice(0, 4).map((t) => {
            const course = getCourse(t.courseSlug);
            return (
              <li key={t.id}>
                <figure className="duo-card lift-card flex h-full flex-col p-6">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-sun text-navy shadow-[0_4px_0_var(--color-sun-shade)]"><Quote className="size-5" aria-hidden /></span>
                  <blockquote className="mt-4 flex-1 text-[15px] font-medium leading-relaxed text-slate-700">“{t.quote}”</blockquote>
                  <p className="mt-5 rounded-xl border-2 border-leaf/40 bg-leaf-soft px-3 py-2 text-sm font-extrabold text-leaf-ink">{t.result}</p>
                  <figcaption className="mt-5 flex items-center gap-3 border-t-2 border-slate-100 pt-5">
                    <Avatar name={t.name} tone={t.tone} size="sm" />
                    <div className="min-w-0">
                      <p className="flex items-center gap-1 text-sm font-extrabold">
                        {t.name}
                        {t.verified && <BadgeCheck className="size-4 text-sky-ink" aria-label="Kết quả đã xác thực" />}
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
