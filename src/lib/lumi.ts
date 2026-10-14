export type LumiMood = "idle" | "wave" | "celebrate" | "encourage" | "curious";
export interface LumiCue { mood: Exclude<LumiMood, "idle">; message: string }
export const LUMI_EVENT = "academy:lumi-cue";

export function cueLumi(mood: LumiCue["mood"], message: string) {
  window.dispatchEvent(new CustomEvent<LumiCue>(LUMI_EVENT, { detail: { mood, message } }));
}
