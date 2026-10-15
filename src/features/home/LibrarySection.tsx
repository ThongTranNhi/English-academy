import { Link } from "react-router";
import { libraryItems, libraryTypeLabels } from "@/data/library";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { getIcon } from "@/lib/icons";
import { toneStyles } from "@/lib/tone";
import { cn } from "@/lib/utils";
import { libraryIcon } from "@/features/lessons/libraryIcon";

export function LibrarySection() {
  const items = libraryItems.filter((i) => ["document", "transcript", "blog", "podcast"].includes(i.type)).slice(0, 6);
  return (
    <section aria-labelledby="library-heading" className="section-y academy-pattern">
      <Container>
        <SectionHeading id="library-heading" eyebrow="Thư viện kiến thức" title="Tài liệu, transcript, series & blog" action={{ label: "Khám phá thư viện", href: "/library" }} />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = getIcon(libraryIcon[item.type]);
            return (
              <li key={item.id}>
                <Link to={`/library?type=${item.type}`} className="duo-card lift-card group flex h-full gap-4 p-5">
                  <span className={cn("icon-pop flex size-12 shrink-0 items-center justify-center rounded-2xl", toneStyles[item.tone].solid, toneStyles[item.tone].shade)}>
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <div className="mb-1 flex flex-wrap gap-1.5">
                      <Badge variant="outline">{libraryTypeLabels[item.type]}</Badge>
                      <Badge variant="navy">{item.level}</Badge>
                    </div>
                    <h3 className="font-extrabold group-hover:text-primary">{item.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-slate-600">{item.description}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
