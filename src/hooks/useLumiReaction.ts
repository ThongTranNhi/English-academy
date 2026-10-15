import { useCallback, useEffect, useRef, useState } from "react";
import { LUMI_EVENT, type LumiCue, type LumiMood } from "@/lib/lumi";

export function useLumiReaction(listen = true) {
  const [reaction, setReaction] = useState<{ mood: LumiMood; message: string; sequence: number }>({ mood: "idle", message: "", sequence: 0 });
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const lastHover = useRef(0);
  const react = useCallback((mood: LumiCue["mood"], message: string, hover = false) => {
    if (hover && Date.now() - lastHover.current < 2500) return;
    if (hover) lastHover.current = Date.now();
    clearTimeout(timeout.current);
    setReaction((previous) => ({ mood, message, sequence: previous.sequence + 1 }));
    timeout.current = setTimeout(() => setReaction((previous) => ({ ...previous, mood: "idle", message: "" })), 2800);
  }, []);

  useEffect(() => {
    const listener = (event: Event) => {
      const cue = (event as CustomEvent<LumiCue>).detail;
      if (cue && ["wave", "celebrate", "encourage", "curious", "happy"].includes(cue.mood)) react(cue.mood, cue.message);
    };
    if (listen) window.addEventListener(LUMI_EVENT, listener);
    return () => { window.removeEventListener(LUMI_EVENT, listener); clearTimeout(timeout.current); };
  }, [listen, react]);
  return { reaction, react };
}
