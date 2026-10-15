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
                <Link to={cat.href} className="duo-card lift-card group flex h-full items-center gap-4 p-5 xl:flex-col xl:items-start">
                  <span className={cn("icon-pop flex size-14 shrink-0 items-center justify-center rounded-2xl", toneStyles[cat.tone].solid, toneStyles[cat.tone].shade)}>
                    <Icon className="size-7" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-extrabold text-navy group-hover:text-primary">{cat.label}</span>
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
