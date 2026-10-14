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
          <p className={cn("mb-2 text-sm font-semibold uppercase tracking-wider", invert ? "text-accent" : "text-primary")}>{eyebrow}</p>
        )}
        <h2 id={id} className={cn("text-2xl font-bold tracking-tight sm:text-3xl lg:text-[2.25rem] lg:leading-tight", invert ? "text-white" : "text-navy")}>
          {title}
        </h2>
        {description && <p className={cn("mt-3 text-base", invert ? "text-slate-300" : "text-slate-600")}>{description}</p>}
      </div>
      {action && (
        <Link
          to={action.href}
          className={cn("inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold hover:underline", invert ? "text-accent" : "text-primary")}
        >
          {action.label} <ArrowRight className="size-4" aria-hidden />
        </Link>
      )}
    </div>
  );
}
