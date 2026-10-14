import { Link } from "react-router";
import { homeCategories } from "@/data/categories";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getIcon } from "@/lib/icons";
import { toneStyles } from "@/lib/tone";
import { cn } from "@/lib/utils";

export function CategoriesSection() {
  return (
    <section aria-labelledby="categories-heading" className="section-y academy-pattern">
      <Container>
        <SectionHeading id="categories-heading" eyebrow="Danh mục" title="Bạn muốn học gì hôm nay?" description="Chọn mục tiêu phù hợp – từ luyện thi chứng chỉ đến giao tiếp hằng ngày." />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {homeCategories.map((cat) => {
            const Icon = getIcon(cat.icon);
            return (
              <li key={cat.key}>
                <Link to={cat.href} className="group flex h-full items-center gap-4 rounded-[14px] border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md xl:flex-col xl:items-start">
                  <span className={cn("flex size-12 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110", toneStyles[cat.tone].soft, toneStyles[cat.tone].text)}>
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-semibold text-navy group-hover:text-primary">{cat.label}</span>
                    <span className="mt-0.5 block text-sm text-slate-500">{cat.description}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
