import { NavLink, useParams } from "react-router";
import { getInfoPage, infoPages } from "@/data/info";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/shared/Container";
import { usePageMeta } from "@/hooks/usePageMeta";
import { cn } from "@/lib/utils";
import NotFoundPage from "./NotFoundPage";

export default function InfoPage() {
  const { slug = "" } = useParams();
  const page = getInfoPage(slug);
  usePageMeta(page?.title ?? "Không tìm thấy trang");
  if (!page) return <NotFoundPage />;

  return (
    <>
      <PageHeader title={page.title} breadcrumbs={[{ label: page.title }]} />
      <Container className="grid gap-8 py-10 lg:grid-cols-[240px_1fr] lg:py-14">
        <nav aria-label="Trang thông tin">
          <ul className="flex flex-wrap gap-2 lg:flex-col">
            {infoPages.map((p) => (
              <li key={p.slug}>
                <NavLink to={`/help/${p.slug}`} className={({ isActive }) => cn("block rounded-lg px-3 py-2 text-sm", isActive ? "bg-primary-soft font-semibold text-primary" : "text-slate-600 hover:bg-white")}>
                  {p.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <article className="max-w-3xl space-y-6 rounded-[16px] border border-slate-200 bg-white p-6 sm:p-8">
          {page.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="mb-2 text-lg font-semibold">{s.heading}</h2>
              <p className="leading-relaxed text-slate-700">{s.body}</p>
            </section>
          ))}
        </article>
      </Container>
    </>
  );
}
