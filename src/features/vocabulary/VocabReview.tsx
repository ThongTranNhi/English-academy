import { useState } from "react";
import { Brain, CalendarCheck, Eye, RotateCcw } from "lucide-react";
import type { VocabWord } from "@/types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SpeakButton } from "@/components/shared/SpeakButton";
import { useProgressStore } from "@/store/progressStore";
import { dateKey } from "@/features/progress/streak";
import { cueLumi } from "@/lib/lumi";
import { cn } from "@/lib/utils";
import { buildReviewQueue, formatInterval, isDue, nextInterval, type Rating } from "./srs";

const ratings: { rating: Rating; label: string; className: string }[] = [
  { rating: "again", label: "Quên", className: "border-coral/40 bg-coral-soft text-coral-ink hover:border-coral" },
  { rating: "hard", label: "Khó", className: "border-tangerine/40 bg-sun-soft text-sun-ink hover:border-tangerine" },
  { rating: "good", label: "Nhớ", className: "border-leaf/40 bg-leaf-soft text-leaf-ink hover:border-leaf" },
  { rating: "easy", label: "Dễ", className: "border-sky/40 bg-sky-soft text-sky-ink hover:border-sky" },
];

/**
 * Phiên ôn tập kiểu Anki: từ đến hạn + một ít từ mới. Chấm "Quên" thì từ quay lại cuối phiên.
 * Hàng đợi được chốt khi bắt đầu phiên để thứ tự không nhảy khi lịch ôn thay đổi.
 */
export function VocabReview({ words, newLimit = 5 }: { words: VocabWord[]; newLimit?: number }) {
  const srs = useProgressStore((s) => s.srs);
  const reviewWord = useProgressStore((s) => s.reviewWord);
  const [today] = useState(() => dateKey());
  const [queue, setQueue] = useState<VocabWord[] | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [reviewed, setReviewed] = useState(0);

  const dueCount = words.filter((w) => srs[w.word] && isDue(srs[w.word], today)).length;
  const newCount = Math.min(newLimit, words.filter((w) => !srs[w.word]).length);

  const start = () => {
    setQueue(buildReviewQueue(words, srs, today, newLimit));
    setRevealed(false);
    setReviewed(0);
  };

  if (!queue) {
    return (
      <div className="duo-card flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:text-left">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-grape-soft text-grape-ink"><Brain className="size-7" aria-hidden /></span>
        <div className="flex-1">
          <p className="text-lg font-black">Hôm nay: {dueCount} từ cần ôn · {newCount} từ mới</p>
          <p className="text-sm text-slate-600">Lặp lại ngắt quãng: từ bạn nhớ tốt sẽ được hẹn ôn thưa dần, từ hay quên sẽ quay lại sớm hơn.</p>
        </div>
        <Button onClick={start} disabled={dueCount + newCount === 0}>Bắt đầu ôn</Button>
      </div>
    );
  }

  const card = queue[0];
  const total = reviewed + queue.length;

  if (!card) {
    const tomorrow = Object.values(srs).filter((c) => c.due > today).sort((a, b) => a.due.localeCompare(b.due))[0];
    return (
      <div className="duo-card p-6 text-center sm:p-8" role="status">
        <CalendarCheck className="mx-auto mb-3 size-10 text-leaf" aria-hidden />
        <p className="text-xl font-black">Xong phiên ôn hôm nay! 🎉</p>
        <p className="mt-1 text-slate-600">Bạn đã ôn {reviewed} lượt.{tomorrow && ` Lần ôn tiếp theo: ${tomorrow.due.split("-").reverse().join("/")}.`}</p>
        <Button variant="outline" className="mt-5" onClick={start}><RotateCcw aria-hidden /> Ôn thêm</Button>
      </div>
    );
  }

  const rate = (rating: Rating) => {
    reviewWord(card.word, rating);
    setReviewed((n) => n + 1);
    setRevealed(false);
    setQueue((q) => {
      const rest = q!.slice(1);
      return rating === "again" && !rest.includes(card) ? [...rest, card] : rest;
    });
    if (queue.length === 1 && rating !== "again") cueLumi("celebrate", "Hoàn thành phiên ôn tập! Trí nhớ của bạn đang mạnh dần lên.");
  };

  const current = srs[card.word];
  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-3 flex items-center justify-between text-sm font-bold text-slate-600">
        <span>Đã ôn {reviewed}/{total}</span>
        <span className={cn("rounded-full px-3 py-1", current ? "bg-grape-soft text-grape-ink" : "bg-sky-soft text-sky-ink")}>{current ? "Ôn lại" : "Từ mới"}</span>
      </div>
      <Progress value={(reviewed / total) * 100} label="Tiến độ phiên ôn" className="mb-5" />

      <div className="duo-card p-6 text-center sm:p-8">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{card.partOfSpeech}</p>
        <div className="mt-2 flex items-center justify-center gap-1">
          <p className="text-3xl font-black text-navy sm:text-4xl">{card.word}</p>
          <SpeakButton text={card.word} />
        </div>
        <p className="font-body text-slate-500">{card.phonetic}</p>
        {revealed ? (
          <div className="mt-5 border-t-2 border-dashed border-slate-200 pt-5" aria-live="polite">
            <p className="text-xl font-black text-primary">{card.meaning}</p>
            <p className="mt-2 font-body italic text-slate-600">“{card.example}”</p>
          </div>
        ) : (
          <Button variant="secondary" className="mt-6" onClick={() => setRevealed(true)}><Eye aria-hidden /> Hiện đáp án</Button>
        )}
      </div>

      {revealed && (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4" role="group" aria-label="Bạn nhớ từ này thế nào?">
          {ratings.map((r) => (
            <button
              key={r.rating}
              type="button"
              onClick={() => rate(r.rating)}
              className={cn("lumi-answer flex flex-col items-center rounded-2xl border-2 px-3 py-2.5 font-black", r.className)}
            >
              {r.label}
              <span className="text-xs font-semibold opacity-80">{formatInterval(nextInterval(current, r.rating))}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
