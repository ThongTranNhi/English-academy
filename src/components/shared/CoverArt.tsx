import type { Tone } from "@/types";
import { toneStyles } from "@/lib/tone";
import { DynamicIcon } from "./DynamicIcon";
import { cn } from "@/lib/utils";

interface CoverArtProps {
  tone: Tone;
  icon: string;
  label?: string;
  className?: string;
}

/**
 * Ảnh bìa minh họa dạng gradient + icon, thay cho ảnh chụp khi chưa có asset.
 * Nhẹ, không cần tải file và luôn hiển thị đúng tỉ lệ.
 */
export function CoverArt({ tone, icon, label, className }: CoverArtProps) {
  return (
    <div
      className={cn("relative isolate flex items-center justify-center overflow-hidden bg-gradient-to-br text-white", toneStyles[tone].cover, className)}
      aria-hidden
    >
      <div className="absolute -right-8 -top-8 size-32 rounded-full bg-white/10" />
      <div className="absolute -bottom-10 -left-6 size-28 rounded-full bg-white/10" />
      <DynamicIcon name={icon} className="relative size-12 opacity-90" strokeWidth={1.5} />
      {label && <span className="absolute bottom-3 left-4 text-xs font-semibold uppercase tracking-wider text-white/80">{label}</span>}
    </div>
  );
}
