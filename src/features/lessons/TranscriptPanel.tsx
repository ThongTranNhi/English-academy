import { useState } from "react";
import { Pause, Play } from "lucide-react";
import type { Lesson } from "@/types";
import { Button } from "@/components/ui/button";
import { canSpeak, speak, stopSpeaking } from "@/lib/speech";

/** Transcript có thể đọc to từng câu hoặc cả bài bằng giọng đọc trình duyệt. */
export function TranscriptPanel({ transcript }: { transcript: NonNullable<Lesson["transcript"]> }) {
  const [playing, setPlaying] = useState(false);

  const playAll = () => {
    if (playing) {
      stopSpeaking();
      setPlaying(false);
      return;
    }
    speak(transcript.map((t) => t.text).join(" "));
    setPlaying(true);
  };

  return (
    <section aria-labelledby="transcript-heading" className="rounded-[14px] border border-slate-200 bg-white p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 id="transcript-heading" className="text-lg font-semibold">Transcript</h2>
        {canSpeak() && (
          <Button size="sm" variant="secondary" onClick={playAll}>
            {playing ? <Pause aria-hidden /> : <Play aria-hidden />} {playing ? "Dừng" : "Nghe cả bài"}
          </Button>
        )}
      </div>
      <ol className="space-y-1">
        {transcript.map((line) => (
          <li key={line.time}>
            <button
              type="button"
              onClick={() => speak(line.text)}
              className="flex w-full gap-4 rounded-lg px-2 py-2 text-left transition-colors hover:bg-primary-soft"
            >
              <span className="w-12 shrink-0 font-body text-xs font-semibold text-primary tabular-nums">{line.time}</span>
              <span className="font-body text-sm text-slate-700">{line.text}</span>
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}
