export type LumiMood = "idle" | "wave" | "celebrate" | "encourage" | "curious" | "happy" | "shy";
export interface LumiCue { mood: Exclude<LumiMood, "idle">; message: string }
export const LUMI_EVENT = "academy:lumi-cue";

/** Bộ hình động của Lumi, mỗi bộ 4 khung, xuất từ art/lumi-sheets. */
export type LumiClip = "wave" | "talk" | "happy" | "sad" | "think" | "celebrate" | "read" | "sleepy" | "cover";
export type LumiIdleClip = Extract<LumiClip, "wave" | "read" | "sleepy">;

export const lumiMoodClip: Record<Exclude<LumiMood, "idle">, LumiClip> = {
  wave: "talk",
  celebrate: "celebrate",
  encourage: "sad",
  curious: "think",
  happy: "happy",
  shy: "cover",
};

/** Idle đổi giữa vẫy chào và đọc sách, ngủ gật nếu lâu không ai tương tác. */
export const LUMI_IDLE_SWAP_MS = 8000;
export const LUMI_SLEEP_AFTER_MS = 30000;

export function lumiClipSrc(clip: LumiClip, still = false) {
  return `/images/lumi/lumi-${clip}${still ? "-still" : ""}.webp`;
}

export function cueLumi(mood: LumiCue["mood"], message: string) {
  window.dispatchEvent(new CustomEvent<LumiCue>(LUMI_EVENT, { detail: { mood, message } }));
}
