import type { Tone } from "@/types";

/** Bảng màu theo tone, dùng cho ảnh bìa, icon và nhãn. */
export const toneStyles: Record<Tone, { cover: string; soft: string; text: string; ring: string }> = {
  indigo: { cover: "from-indigo-500 to-violet-600", soft: "bg-indigo-50", text: "text-indigo-600", ring: "ring-indigo-200" },
  cyan: { cover: "from-cyan-500 to-sky-600", soft: "bg-cyan-50", text: "text-cyan-700", ring: "ring-cyan-200" },
  amber: { cover: "from-amber-400 to-orange-500", soft: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-200" },
  navy: { cover: "from-slate-800 to-slate-900", soft: "bg-slate-100", text: "text-slate-700", ring: "ring-slate-200" },
  emerald: { cover: "from-emerald-500 to-teal-600", soft: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-200" },
  rose: { cover: "from-rose-500 to-pink-600", soft: "bg-rose-50", text: "text-rose-700", ring: "ring-rose-200" },
};
