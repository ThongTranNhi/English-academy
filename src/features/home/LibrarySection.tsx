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
    <section aria-labelledby="library-heading" className="section-y bg-white">
      <Container>
        <SectionHeading id="library-heading" eyebrow="Thư viện kiến thức" title="Tài liệu, transcript, series & blog" action={{ label: "Khám phá thư viện", href: "/library" }} />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = getIcon(libraryIcon[item.type]);
            return (
              <li key={item.id}>
                <Link to={`/library?type=${item.type}`} className="group flex h-full gap-4 rounded-[14px] border border-slate-200/80 p-5 transition-all hover:border-primary/40 hover:shadow-md">
                  <span className={cn("flex size-12 shrink-0 items-center justify-center rounded-xl", toneStyles[item.tone].soft, toneStyles[item.tone].text)}>
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <div className="mb-1 flex flex-wrap gap-1.5">
                      <Badge variant="outline">{libraryTypeLabels[item.type]}</Badge>
                      <Badge variant="navy">{item.level}</Badge>
                    </div>
                    <h3 className="font-semibold group-hover:text-primary">{item.title}</h3>
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
