import type { ReactNode } from "react";
import { SearchX } from "lucide-react";

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-[14px] border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
      <SearchX className="mb-3 size-10 text-slate-400" aria-hidden />
      <p className="font-semibold">{title}</p>
      {description && <p className="mt-1 max-w-md text-sm text-slate-600">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
