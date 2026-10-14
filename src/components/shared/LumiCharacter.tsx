import { Star } from "lucide-react";
import type { LumiMood } from "@/lib/lumi";

export function LumiCharacter({ mood = "idle", sequence = 0, motion = true }: { mood?: LumiMood; sequence?: number; motion?: boolean }) {
  return (
    <span key={`${mood}-${sequence}-${motion}`} data-mood={mood} className={`lumi-actor relative block h-full w-full ${motion ? "" : "lumi-motion-off"}`} aria-hidden>
      <img src={mood === "celebrate" ? "/images/academy-lumi-celebrate.webp" : "/images/academy-lumi.webp"} alt="" width={512} height={512} draggable={false} className="lumi-pose h-full w-full object-contain" />
      {mood === "celebrate" && <span className="lumi-sparkles absolute inset-0">{Array.from({ length: 6 }, (_, index) => <Star key={index} className={`lumi-star lumi-star-${index} absolute size-4 fill-amber-300 text-amber-400 sm:size-5`} />)}</span>}
    </span>
  );
}
