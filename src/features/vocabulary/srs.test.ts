import { describe, expect, it } from "vitest";
import type { VocabWord } from "@/types";
import { buildReviewQueue, formatInterval, isDue, schedule, type SrsCard } from "./srs";

const today = "2026-10-15";

describe("schedule", () => {
  it("từ mới: Quên/Nhớ → ôn ngày mai, Dễ → 4 ngày sau", () => {
    expect(schedule(undefined, "again", today)).toMatchObject({ interval: 1, due: "2026-10-16", reps: 0, lapses: 0 });
    expect(schedule(undefined, "good", today)).toMatchObject({ interval: 1, due: "2026-10-16", reps: 1 });
    expect(schedule(undefined, "easy", today)).toMatchObject({ interval: 4, due: "2026-10-19", reps: 1, ease: 2.65 });
  });

  it("nhớ liên tiếp làm khoảng cách tăng dần: 1 → 3 → 8 ngày", () => {
    const first = schedule(undefined, "good", today);
    const second = schedule(first, "good", first.due);
    const third = schedule(second, "good", second.due);
    expect([first.interval, second.interval, third.interval]).toEqual([1, 3, 8]);
    expect(third.due).toBe("2026-10-27");
  });

  it("quên một từ đã thuộc: về lại 1 ngày, tăng số lần quên và giảm hệ số dễ", () => {
    const learned: SrsCard = { interval: 20, ease: 2.5, reps: 4, lapses: 0, due: today };
    expect(schedule(learned, "again", today)).toEqual({ interval: 1, ease: 2.3, reps: 0, lapses: 1, due: "2026-10-16" });
  });

  it("hệ số dễ không xuống dưới 1.3", () => {
    let card: SrsCard | undefined;
    for (let i = 0; i < 10; i++) card = schedule(card, "again", today);
    expect(card!.ease).toBe(1.3);
  });

  it("Khó tăng ít hơn Nhớ, Nhớ tăng ít hơn Dễ", () => {
    const card: SrsCard = { interval: 10, ease: 2.5, reps: 3, lapses: 0, due: today };
    const [hard, good, easy] = (["hard", "good", "easy"] as const).map((r) => schedule(card, r, today).interval);
    expect(hard).toBeLessThan(good);
    expect(good).toBeLessThan(easy);
  });
});

describe("buildReviewQueue", () => {
  const word = (w: string): VocabWord => ({ word: w, phonetic: "/x/", partOfSpeech: "n", meaning: w, example: "" });
  const words = ["a", "b", "c", "d", "e", "f", "g"].map(word);

  it("từ đến hạn đứng trước (hạn sớm nhất trước), sau đó là từ mới có giới hạn", () => {
    const cards: Record<string, SrsCard> = {
      a: { interval: 3, ease: 2.5, reps: 2, lapses: 0, due: "2026-10-15" },
      b: { interval: 3, ease: 2.5, reps: 2, lapses: 0, due: "2026-10-20" }, // chưa đến hạn
      c: { interval: 3, ease: 2.5, reps: 2, lapses: 0, due: "2026-10-10" },
    };
    expect(buildReviewQueue(words, cards, today, 2).map((w) => w.word)).toEqual(["c", "a", "d", "e"]);
  });

  it("isDue so sánh theo ngày", () => {
    const card: SrsCard = { interval: 1, ease: 2.5, reps: 1, lapses: 0, due: today };
    expect(isDue(card, today)).toBe(true);
    expect(isDue(card, "2026-10-14")).toBe(false);
  });
});

describe("formatInterval", () => {
  it("hiển thị ngày hoặc tháng", () => {
    expect(formatInterval(1)).toBe("1 ngày");
    expect(formatInterval(45)).toBe("2 tháng");
  });
});
