import type { Tone } from "@/types";
import { toneStyles } from "@/lib/tone";
import { cn, initials } from "@/lib/utils";

const sizes = { sm: "size-9 text-xs", md: "size-12 text-sm", lg: "size-20 text-xl", xl: "size-28 text-3xl" };

export function Avatar({ name, tone, size = "md", className }: { name: string; tone: Tone; size?: keyof typeof sizes; className?: string }) {
  return (
    <span
      role="img"
      aria-label={name}
      className={cn("inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-bold text-white", toneStyles[tone].cover, sizes[size], className)}
    >
      {initials(name)}
    </span>
  );
}
