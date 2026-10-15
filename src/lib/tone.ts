import type { Tone } from "@/types";

/**
 * Bảng màu theo tone, dùng cho ảnh bìa, icon và nhãn.
 * `solid` là khối màu đậm kèm màu chữ đạt tương phản; `shade` là bóng đáy 3D đi cùng.
 */
export const toneStyles: Record<Tone, { cover: string; soft: string; text: string; ring: string; solid: string; shade: string }> = {
  indigo: { cover: "from-primary to-grape", soft: "bg-primary-soft", text: "text-primary", ring: "ring-primary/30", solid: "bg-primary text-white", shade: "shadow-[0_6px_0_var(--color-primary-shade)]" },
  cyan: { cover: "from-sky to-primary", soft: "bg-sky-soft", text: "text-sky-ink", ring: "ring-sky/40", solid: "bg-sky text-navy", shade: "shadow-[0_6px_0_var(--color-sky-shade)]" },
  amber: { cover: "from-sun to-tangerine", soft: "bg-sun-soft", text: "text-sun-ink", ring: "ring-sun/50", solid: "bg-sun text-navy", shade: "shadow-[0_6px_0_var(--color-sun-shade)]" },
  navy: { cover: "from-grape to-fuchsia-500", soft: "bg-grape-soft", text: "text-grape-ink", ring: "ring-grape/30", solid: "bg-grape text-white", shade: "shadow-[0_6px_0_var(--color-grape-shade)]" },
  emerald: { cover: "from-leaf to-teal-500", soft: "bg-leaf-soft", text: "text-leaf-ink", ring: "ring-leaf/40", solid: "bg-leaf text-navy", shade: "shadow-[0_6px_0_var(--color-leaf-shade)]" },
  rose: { cover: "from-coral to-tangerine", soft: "bg-coral-soft", text: "text-coral-ink", ring: "ring-coral/30", solid: "bg-coral text-navy", shade: "shadow-[0_6px_0_var(--color-coral-shade)]" },
};
