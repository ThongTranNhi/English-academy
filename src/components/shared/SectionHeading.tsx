import type { ReactNode } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  align?: "left" | "center";
  id?: string;
  children?: ReactNode;
  invert?: boolean;
}

export function SectionHeading({ eyebrow, title, description, action, align = "left", id, invert }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        align === "center" && "items-center text-center md:flex-col md:items-center",
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <p className={cn("mb-3 inline-block rounded-full px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest", invert ? "bg-sun text-navy" : "bg-primary-soft text-primary")}>{eyebrow}</p>
        )}
        <h2 id={id} className={cn("text-3xl font-black tracking-tight sm:text-4xl lg:text-[2.6rem] lg:leading-tight", invert ? "text-white" : "text-navy")}>
          {title}
        </h2>
        {description && <p className={cn("mt-3 text-base font-medium sm:text-lg", invert ? "text-slate-200" : "text-slate-600")}>{description}</p>}
      </div>
      {action && (
        <Link
          to={action.href}
          className={cn("group inline-flex shrink-0 items-center gap-1.5 rounded-2xl border-2 px-4 py-2 text-sm font-extrabold transition-colors", invert ? "border-white/25 text-sky hover:bg-white/10" : "border-primary/20 bg-white text-primary hover:bg-primary-soft")}
        >
          {action.label} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      )}
    </div>
  );
}
