import { useSearchParams } from "react-router";
import { Clock, Lock } from "lucide-react";
import type { LibraryType } from "@/types";
import { libraryItems, libraryTypeLabels } from "@/data/library";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/shared/Container";
import { EmptyState } from "@/components/shared/EmptyState";
import { Tabs } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LibraryCover } from "@/features/lessons/LibraryCover";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function LibraryPage() {
  const [params, setParams] = useSearchParams();
  const type = (params.get("type") ?? "all") as "all" | LibraryType;
  usePageMeta("Thư viện", "Thư viện video, audio, podcast, transcript, tài liệu PDF và blog học tiếng Anh miễn phí.");

  const items = type === "all" ? libraryItems : libraryItems.filter((i) => i.type === type);

  return (
    <>
      <PageHeader title="Thư viện kiến thức" description="Video, audio, podcast, transcript, tài liệu và blog – phần lớn miễn phí." breadcrumbs={[{ label: "Thư viện" }]} />
      <Container className="py-10 lg:py-14">
        <Tabs
          className="mb-8"
          label="Loại nội dung"
          value={type}
          onChange={(v) => setParams(v === "all" ? {} : { type: v }, { replace: true })}
          items={[{ value: "all", label: "Tất cả" }, ...(Object.keys(libraryTypeLabels) as LibraryType[]).map((k) => ({ value: k, label: libraryTypeLabels[k] }))]}
        />
        {items.length === 0 ? (
          <EmptyState title="Chưa có nội dung" />
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <li key={item.id}>
                <article className="duo-card lift-card group flex h-full flex-col overflow-hidden">
                  <LibraryCover item={item} className="aspect-[16/10]" />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex flex-wrap gap-1.5">
                      <Badge variant="navy">{item.level}</Badge>
                      {item.series && <Badge variant="outline">{item.series}</Badge>}
                    </div>
                    <h2 className="font-semibold">{item.title}</h2>
                    <p className="mt-1 flex-1 text-sm text-slate-600">{item.description}</p>
                    <div className="mt-4 flex items-center justify-between text-xs">
                      {item.duration ? <span className="inline-flex items-center gap-1 text-slate-500"><Clock className="size-3.5" aria-hidden /> {item.duration}</span> : <span />}
                      {item.free ? <Badge variant="success">Miễn phí</Badge> : <Badge variant="highlight"><Lock className="size-3" aria-hidden /> Học viên</Badge>}
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
