import type { ReactNode } from "react";
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { Container } from "./Container";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  children?: ReactNode;
}

/** Banner đầu trang cho các trang nội dung. */
export function PageHeader({ title, description, breadcrumbs, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(79,70,229,0.45),transparent_55%),radial-gradient(circle_at_10%_90%,rgba(6,182,212,0.25),transparent_50%)]" />
      <Container className="relative py-12 lg:py-16">
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-300">
              <li>
                <Link to="/" className="hover:text-white">Trang chủ</Link>
              </li>
              {breadcrumbs.map((b) => (
                <li key={b.label} className="flex items-center gap-1">
                  <ChevronRight className="size-3.5" aria-hidden />
                  {b.href ? <Link to={b.href} className="hover:text-white">{b.label}</Link> : <span aria-current="page" className="text-white">{b.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-base text-slate-300 sm:text-lg">{description}</p>}
        {children && <div className="mt-6">{children}</div>}
      </Container>
    </section>
  );
}
