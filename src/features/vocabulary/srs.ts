import type { VocabWord } from "@/types";
import { addDays, type DateKey } from "@/features/progress/streak";

/** Lặp lại ngắt quãng theo biến thể đơn giản của thuật toán SM-2 (Anki/SuperMemo). */
export type Rating = "again" | "hard" | "good" | "easy";

export interface SrsCard {
  /** Số ngày đến lần ôn tiếp theo. */
  interval: number;
  /** Hệ số dễ: càng cao, khoảng cách ôn tăng càng nhanh. */
  ease: number;
  /** Số lần nhớ liên tiếp. */
  reps: number;
  lapses: number;
  due: DateKey;
}

const START_EASE = 2.5;
const MIN_EASE = 1.3;

export function nextInterval(card: SrsCard | undefined, rating: Rating): number {
  const reps = card?.reps ?? 0;
  const interval = card?.interval ?? 0;
  const ease = card?.ease ?? START_EASE;
  switch (rating) {
    case "again":
      return 1;
    case "hard":
      return Math.max(1, Math.round(interval * 1.2));
    case "good":
      if (reps === 0) return 1;
      if (reps === 1) return 3;
      return Math.max(interval + 1, Math.round(interval * ease));
    case "easy":
      if (reps === 0) return 4;
      return Math.max(interval + 1, Math.round(interval * ease * 1.3));
  }
}

export function schedule(card: SrsCard | undefined, rating: Rating, today: DateKey): SrsCard {
  const ease = card?.ease ?? START_EASE;
  const reps = card?.reps ?? 0;
  const lapses = card?.lapses ?? 0;
  const interval = nextInterval(card, rating);
  const easeDelta = { again: -0.2, hard: -0.15, good: 0, easy: 0.15 }[rating];
  return {
    interval,
    ease: Math.max(MIN_EASE, Math.round((ease + easeDelta) * 100) / 100),
    reps: rating === "again" ? 0 : reps + 1,
    lapses: rating === "again" && card ? lapses + 1 : lapses,
    due: addDays(today, interval),
  };
}

export const isDue = (card: SrsCard, today: DateKey) => card.due <= today;

/** Hàng đợi ôn tập: từ đến hạn (hạn sớm nhất trước), sau đó tối đa `newLimit` từ mới. */
export function buildReviewQueue(words: VocabWord[], cards: Record<string, SrsCard>, today: DateKey, newLimit = 5): VocabWord[] {
  const due = words
    .filter((w) => cards[w.word] && isDue(cards[w.word], today))
    .sort((a, b) => cards[a.word].due.localeCompare(cards[b.word].due));
  const fresh = words.filter((w) => !cards[w.word]).slice(0, newLimit);
  return [...due, ...fresh];
}

/** Mô tả khoảng cách ôn để hiển thị trên nút đánh giá. */
export function formatInterval(days: number): string {
  if (days < 30) return `${days} ngày`;
  const months = Math.round(days / 30);
  return `${months} tháng`;
}
