import { Link } from "react-router";
import { cn } from "@/lib/utils";

export function Logo({ invert, className }: { invert?: boolean; className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2.5", className)} aria-label="English Academy – Trang chủ">
      <img src="/icons/logo.svg" alt="" width={36} height={36} className="size-9" />
      <span className={cn("text-lg font-extrabold leading-none tracking-tight", invert ? "text-white" : "text-navy")}>
        English<span className="text-primary">Academy</span>
      </span>
    </Link>
  );
}
