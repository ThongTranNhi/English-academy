import type { LibraryItem } from "@/types";
import { CoverArt } from "@/components/shared/CoverArt";
import { libraryTypeLabels } from "@/data/library";
import { cn } from "@/lib/utils";
import { libraryIcon } from "./libraryIcon";

/** Ảnh minh họa mục thư viện kèm nhãn loại nội dung; mục chưa có ảnh dùng ảnh bìa gradient. */
export function LibraryCover({ item, className }: { item: LibraryItem; className?: string }) {
  if (!item.image) {
    return <CoverArt tone={item.tone} icon={libraryIcon[item.type]} label={libraryTypeLabels[item.type]} className={className} />;
  }
  return (
    <div className={cn("relative overflow-hidden bg-primary-soft", className)}>
      <img src={item.image} alt="" width={960} height={644} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <span className="absolute bottom-3 left-3 rounded-lg bg-white/90 px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-navy">{libraryTypeLabels[item.type]}</span>
    </div>
  );
}
