import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-extrabold", {
  variants: {
    variant: {
      default: "bg-primary-soft text-primary",
      accent: "bg-sky-soft text-sky-ink",
      highlight: "bg-sun-soft text-sun-ink",
      navy: "bg-grape text-white",
      outline: "border-2 border-slate-200 text-slate-600",
      success: "bg-leaf-soft text-leaf-ink",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
