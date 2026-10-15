import { useEffect, useRef, useState, type ReactNode } from "react";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import type { Lesson } from "@/types";
import { Progress } from "@/components/ui/progress";
import { canSpeak } from "@/lib/speech";
import { cn } from "@/lib/utils";

type Line = NonNullable<Lesson["transcript"]>[number];

const RATES = [0.75, 1, 1.25] as const;

interface LessonPlayerProps {
  transcript: Line[];
  /** Ảnh bìa hiển thị như khung video; phụ đề câu đang đọc chạy trên ảnh. */
  cover?: ReactNode;
  kind: "video" | "audio";
}

/**
 * Trình phát bài học: đọc transcript từng câu bằng giọng đọc trình duyệt (Web Speech API),
 * tô sáng câu đang đọc và cho phép nhảy tới bất kỳ câu nào.
 */
export function LessonPlayer({ transcript, cover, kind }: LessonPlayerProps) {
  const supported = canSpeak();
  const [current, setCurrent] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [rate, setRate] = useState<number>(1);
  // Mỗi lần phát/dừng tạo phiên mới; callback của phiên cũ (vd. sự kiện end do cancel) bị bỏ qua.
  const session = useRef(0);
  const rateRef = useRef(rate);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(
    () => () => {
      session.current += 1;
      if (canSpeak()) window.speechSynthesis.cancel();
    },
    [],
  );

  const stop = () => {
    session.current += 1;
    window.speechSynthesis.cancel();
    setPlaying(false);
  };

  /** Cuộn trong khung transcript (không kéo cả trang) để câu đang đọc nằm giữa khung. */
  const scrollLineIntoList = (i: number) => {
    const list = listRef.current;
    const item = list?.children[i] as HTMLElement | undefined;
    if (list && item) list.scrollTop = item.offsetTop - list.clientHeight / 2 + item.clientHeight / 2;
  };

  const playFrom = (start: number) => {
    if (!supported) return;
    const id = ++session.current;
    window.speechSynthesis.cancel();
    setPlaying(true);
    const speakAt = (i: number) => {
      if (id !== session.current) return;
      if (i >= transcript.length) {
        setPlaying(false);
        setCurrent(-1);
        return;
      }
      setCurrent(i);
      scrollLineIntoList(i);
      const utterance = new SpeechSynthesisUtterance(transcript[i].text);
      utterance.lang = "en-US";
      utterance.rate = rateRef.current;
      utterance.onend = () => speakAt(i + 1);
      window.speechSynthesis.speak(utterance);
    };
    speakAt(start);
  };

  const toggle = () => (playing ? stop() : playFrom(current >= 0 && current < transcript.length ? current : 0));
  const step = (delta: number) => playFrom(Math.min(transcript.length - 1, Math.max(0, (current < 0 ? 0 : current) + delta)));
  const changeRate = (r: number) => {
    rateRef.current = r;
    setRate(r);
    if (playing) playFrom(Math.max(current, 0));
  };

  const caption = current >= 0 ? transcript[current] : undefined;
  const progress = current < 0 ? 0 : ((current + 1) / transcript.length) * 100;

  return (
    <section aria-label={kind === "video" ? "Trình phát bài giảng" : "Trình phát bài nghe"} className="overflow-hidden rounded-[20px] border-2 border-slate-200 bg-white">
      {cover && (
        <div className="relative">
          {cover}
          <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-navy/80 via-navy/10 to-transparent p-4 sm:p-6">
            {!playing && current < 0 && (
              <button
                type="button"
                onClick={toggle}
                disabled={!supported}
                className="absolute inset-0 m-auto flex size-20 items-center justify-center rounded-full bg-white/95 text-primary shadow-xl transition-transform hover:scale-105 disabled:opacity-60"
                aria-label="Phát bài học"
              >
                <Play className="ml-1 size-9" aria-hidden />
              </button>
            )}
            {caption && (
              <p className="max-w-2xl rounded-xl bg-navy/75 px-4 py-2 text-center font-body text-base font-semibold text-white sm:text-lg" aria-hidden>
                {caption.speaker && <span className="mr-1.5 text-sun">{caption.speaker}:</span>}
                {caption.text}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="border-b-2 border-slate-100 p-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => step(-1)} disabled={!supported} className="flex size-10 items-center justify-center rounded-full text-slate-600 hover:bg-primary-soft hover:text-primary disabled:opacity-40" aria-label="Câu trước">
            <SkipBack className="size-5" aria-hidden />
          </button>
          <button type="button" onClick={toggle} disabled={!supported} className="flex size-12 items-center justify-center rounded-full bg-primary text-white shadow-[0_4px_0_var(--color-primary-shade)] active:translate-y-[3px] active:shadow-none disabled:opacity-40" aria-label={playing ? "Tạm dừng" : "Phát"}>
            {playing ? <Pause className="size-6" aria-hidden /> : <Play className="ml-0.5 size-6" aria-hidden />}
          </button>
          <button type="button" onClick={() => step(1)} disabled={!supported} className="flex size-10 items-center justify-center rounded-full text-slate-600 hover:bg-primary-soft hover:text-primary disabled:opacity-40" aria-label="Câu tiếp theo">
            <SkipForward className="size-5" aria-hidden />
          </button>
          <div className="mx-2 min-w-24 flex-1">
            <Progress value={progress} label="Tiến độ bài nghe" />
          </div>
          <div role="group" aria-label="Tốc độ đọc" className="flex gap-1">
            {RATES.map((r) => (
              <button
                key={r}
                type="button"
                aria-pressed={rate === r}
                onClick={() => changeRate(r)}
                className={cn("rounded-full px-2.5 py-1 text-xs font-bold", rate === r ? "bg-primary text-white" : "bg-surface text-slate-600 hover:bg-primary-soft")}
              >
                {r}x
              </button>
            ))}
          </div>
        </div>
        <p className="mt-2 text-xs text-slate-500">
          {supported
            ? "Bản demo dùng giọng đọc tự động của trình duyệt. Bấm vào một câu để nghe lại câu đó."
            : "Trình duyệt này không hỗ trợ giọng đọc tự động – bạn vẫn có thể đọc transcript bên dưới."}
        </p>
      </div>

      <h2 className="px-4 pt-4 text-lg font-semibold sm:px-6">Transcript</h2>
      <ol ref={listRef} className="relative max-h-80 space-y-1 overflow-y-auto p-2 sm:px-4 sm:pb-4">
        {transcript.map((line, i) => (
          <li key={`${line.time}-${i}`}>
            <button
              type="button"
              onClick={() => playFrom(i)}
              aria-current={i === current ? "true" : undefined}
              className={cn("flex w-full gap-4 rounded-xl px-3 py-2 text-left transition-colors", i === current ? "bg-primary-soft" : "hover:bg-surface")}
            >
              <span className="w-12 shrink-0 font-body text-xs font-semibold text-primary tabular-nums">{line.time}</span>
              <span className={cn("font-body text-sm", i === current ? "font-semibold text-navy" : "text-slate-700")}>
                {line.speaker && <span className="mr-1 font-bold text-grape-ink">{line.speaker}:</span>}
                {line.text}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}
