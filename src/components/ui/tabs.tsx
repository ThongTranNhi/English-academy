import { cn } from "@/lib/utils";

interface TabsProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  items: { value: T; label: string }[];
  className?: string;
  label: string;
}

/** Nhóm nút lọc dạng tab (WAI-ARIA tablist đơn giản). */
export function Tabs<T extends string>({ value, onChange, items, className, label }: TabsProps<T>) {
  return (
    <div role="tablist" aria-label={label} className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(item.value)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active ? "border-primary bg-primary text-white" : "border-slate-200 bg-white text-slate-600 hover:border-primary hover:text-primary",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
