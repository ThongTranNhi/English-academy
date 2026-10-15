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
    <section data-no-reveal className="relative overflow-hidden bg-gradient-to-br from-primary via-[#5a3ff0] to-grape text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(255,200,0,0.35),transparent_40%),radial-gradient(circle_at_8%_95%,rgba(28,176,246,0.45),transparent_45%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-10 bottom-6 hidden size-24 rotate-12 rounded-3xl bg-sun/80 shadow-[0_6px_0_var(--color-sun-shade)] float-y md:block" />
      <div aria-hidden className="pointer-events-none absolute right-32 top-8 hidden size-10 rounded-full bg-coral/90 float-y-slow md:block" />
      <Container className="relative py-12 lg:py-16">
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1 text-sm font-semibold text-indigo-100">
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
        <h1 className="max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-base font-medium text-indigo-50 sm:text-lg">{description}</p>}
        {children && <div className="mt-6">{children}</div>}
      </Container>
    </section>
  );
}
