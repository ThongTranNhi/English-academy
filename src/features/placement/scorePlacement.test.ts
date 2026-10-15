import { describe, expect, it } from "vitest";
import type { CefrLevel } from "@/types";
import { CEFR_ORDER, scorePlacement, type PlacementQuestion } from "./scorePlacement";
import { placementQuestions } from "@/data/placement";

/** 3 câu mỗi cấp, đáp án đúng luôn là 0. */
const questions: PlacementQuestion[] = CEFR_ORDER.flatMap((level) =>
  [1, 2, 3].map((n) => ({ id: `${level}-${n}`, level, skill: "grammar" as const, question: "?", options: ["đúng", "sai"], answer: 0 })),
);

/** Trả lời đúng `n` câu đầu của mỗi cấp theo bảng. */
function answer(correctPerLevel: Partial<Record<CefrLevel, number>>) {
  const answers: Record<string, number> = {};
  for (const q of questions) {
    const n = Number(q.id.split("-")[1]);
    answers[q.id] = n <= (correctPerLevel[q.level] ?? 0) ? 0 : 1;
  }
  return answers;
}

describe("scorePlacement", () => {
  it("đúng hết thì xếp C2", () => {
    const r = scorePlacement(questions, answer({ A1: 3, A2: 3, B1: 3, B2: 3, C1: 3, C2: 3 }));
    expect(r).toMatchObject({ level: "C2", correct: 18, total: 18 });
  });

  it("dừng ở cấp đầu tiên chưa đạt 2/3, kể cả khi cấp cao hơn trả lời đúng", () => {
    const r = scorePlacement(questions, answer({ A1: 3, A2: 2, B1: 1, B2: 3, C1: 3 }));
    expect(r.level).toBe("A2");
    expect(r.byLevel.B1).toEqual({ correct: 1, total: 3 });
  });

  it("chưa đạt A1 vẫn xếp A1 để bắt đầu từ nền tảng", () => {
    expect(scorePlacement(questions, {}).level).toBe("A1");
  });

  it("câu bỏ trống bị tính là sai", () => {
    const r = scorePlacement(questions, { "A1-1": 0 });
    expect(r.correct).toBe(1);
  });
});

describe("ngân hàng câu hỏi xếp lớp", () => {
  it("có đủ 3 câu cho mỗi cấp độ, id không trùng, đáp án hợp lệ", () => {
    for (const level of CEFR_ORDER) expect(placementQuestions.filter((q) => q.level === level), level).toHaveLength(3);
    expect(new Set(placementQuestions.map((q) => q.id)).size).toBe(placementQuestions.length);
    for (const q of placementQuestions) {
      expect(q.answer, q.id).toBeGreaterThanOrEqual(0);
      expect(q.answer, q.id).toBeLessThan(q.options.length);
      expect(new Set(q.options).size, q.id).toBe(q.options.length);
    }
  });

  it("đáp án đúng xếp được C2", () => {
    const answers = Object.fromEntries(placementQuestions.map((q) => [q.id, q.answer]));
    expect(scorePlacement(placementQuestions, answers).level).toBe("C2");
  });
});
