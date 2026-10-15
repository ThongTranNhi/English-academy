import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { LUMI_IDLE_SWAP_MS, LUMI_SLEEP_AFTER_MS, lumiClipSrc, lumiMoodClip, type LumiClip, type LumiIdleClip, type LumiMood } from "@/lib/lumi";

const allClips: LumiClip[] = ["wave", "talk", "happy", "sad", "think", "celebrate", "read", "sleepy", "cover"];
let clipsPreloaded = false;

function LumiFrame({ mood, clip, animate }: { mood: LumiMood; clip: LumiClip; animate: boolean }) {
  return (
    <span data-mood={mood} data-clip={clip} className="lumi-actor relative block h-full w-full" aria-hidden>
      <img src={lumiClipSrc(clip, !animate)} alt="" width={512} height={512} draggable={false} className="lumi-pose h-full w-full object-contain" />
    </span>
  );
}

/** Idle tự đổi giữa vẫy chào và đọc sách; lâu không ai tương tác thì ngủ gật. Remount để đánh thức. */
function IdleLumi({ animate }: { animate: boolean }) {
  const [clip, setClip] = useState<LumiIdleClip>("wave");
  useEffect(() => {
    if (!animate) return;
    const swap = setInterval(() => setClip((current) => (current === "sleepy" ? current : current === "wave" ? "read" : "wave")), LUMI_IDLE_SWAP_MS);
    const sleep = setTimeout(() => setClip("sleepy"), LUMI_SLEEP_AFTER_MS);
    return () => { clearInterval(swap); clearTimeout(sleep); };
  }, [animate]);
  return <LumiFrame mood="idle" clip={clip} animate={animate} />;
}

export function LumiCharacter({ mood = "idle", sequence = 0, motion = true }: { mood?: LumiMood; sequence?: number; motion?: boolean }) {
  const reducedMotion = useReducedMotion();
  const animate = motion && !reducedMotion;

  // Tải trước các bộ hình còn lại để đổi cảm xúc không bị nháy trắng.
  useEffect(() => {
    if (!animate || clipsPreloaded || typeof Image === "undefined") return;
    const id = setTimeout(() => {
      clipsPreloaded = true;
      allClips.forEach((clip) => { new Image().src = lumiClipSrc(clip); });
    }, 2500);
    return () => clearTimeout(id);
  }, [animate]);

  if (mood === "idle") return <IdleLumi key={`idle-${sequence}-${animate}`} animate={animate} />;
  return <LumiFrame key={`${mood}-${sequence}`} mood={mood} clip={lumiMoodClip[mood]} animate={animate} />;
}
