import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, RotateCw, Shuffle } from "lucide-react";
import type { VocabWord } from "@/types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SpeakButton } from "@/components/shared/SpeakButton";
import { useProgressStore } from "@/store/progressStore";
import { cn } from "@/lib/utils";
import { cueLumi } from "@/lib/lumi";

/** Bộ thẻ ghi nhớ. Khi đổi bộ từ, truyền `key` mới để reset vị trí thẻ. */
export function Flashcards({ words }: { words: VocabWord[] }) {
  const [deck, setDeck] = useState(words);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const learnedWords = useProgressStore((s) => s.learnedWords);
  const markWord = useProgressStore((s) => s.markWord);

  const card = deck[index];
  if (!card) return null;
  const learned = learnedWords.includes(card.word);
  const learnedCount = deck.filter((w) => learnedWords.includes(w.word)).length;

  const go = (delta: number) => {
    setFlipped(false);
    setIndex((i) => (i + delta + deck.length) % deck.length);
  };

  const shuffle = () => {
    setDeck((d) => [...d].sort(() => Math.random() - 0.5));
    setIndex(0);
    setFlipped(false);
  };

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-3 flex items-center justify-between text-sm text-slate-600">
        <span>Thẻ {index + 1}/{deck.length}</span>
        <span>Đã thuộc {learnedCount}/{deck.length}</span>
      </div>
      <Progress value={(learnedCount / deck.length) * 100} label="Tiến độ thuộc từ" className="mb-5" />

      <div className="flip-card h-64 sm:h-72">
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          aria-label={flipped ? `Mặt sau: ${card.meaning}. Bấm để lật lại` : `Từ: ${card.word}. Bấm để xem nghĩa`}
          className={cn("flip-card-inner relative h-full w-full", flipped && "is-flipped")}
        >
          <div className="flip-face absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{card.partOfSpeech}</span>
            <span className="mt-2 text-3xl font-bold text-navy sm:text-4xl">{card.word}</span>
            <span className="mt-2 font-body text-slate-500">{card.phonetic}</span>
            <span className="mt-6 inline-flex items-center gap-1 text-xs text-slate-400"><RotateCw className="size-3.5" aria-hidden /> Bấm để lật thẻ</span>
          </div>
          <div className="flip-face flip-back absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 p-6 text-white shadow-sm">
            <span className="text-2xl font-bold">{card.meaning}</span>
            <span className="mt-4 max-w-sm text-center font-body text-indigo-100 italic">“{card.example}”</span>
          </div>
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <Button variant="outline" size="icon" onClick={() => go(-1)} aria-label="Thẻ trước"><ChevronLeft aria-hidden /></Button>
        <SpeakButton text={card.word} className="size-10 border border-slate-200 bg-white" />
        <Button variant={learned ? "secondary" : "default"} onClick={() => { markWord(card.word, !learned); if (!learned) cueLumi("celebrate", "Thêm một từ đã thuộc! Cùng Lumi tiến bộ từng chút nhé."); }} aria-pressed={learned}>
          <Check aria-hidden /> {learned ? "Đã thuộc" : "Đánh dấu đã thuộc"}
        </Button>
        <Button variant="outline" size="icon" onClick={shuffle} aria-label="Xáo trộn thẻ"><Shuffle aria-hidden /></Button>
        <Button variant="outline" size="icon" onClick={() => go(1)} aria-label="Thẻ tiếp theo"><ChevronRight aria-hidden /></Button>
      </div>
    </div>
  );
}
