import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, type = "text", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-navy placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15 disabled:opacity-50 aria-invalid:border-rose-400",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "flex min-h-32 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-navy placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15",
        className,
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("text-sm font-medium text-navy", className)} {...props} />;
}
