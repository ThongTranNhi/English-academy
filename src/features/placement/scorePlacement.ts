import type { CefrLevel, QuizQuestion } from "@/types";

export const CEFR_ORDER: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

export interface PlacementQuestion extends QuizQuestion {
  level: CefrLevel;
  skill: "grammar" | "vocabulary" | "reading";
  /** Đoạn văn ngắn cho câu hỏi đọc hiểu. */
  passage?: string;
}

export interface PlacementResult {
  level: CefrLevel;
  correct: number;
  total: number;
  /** Số câu đúng / tổng số câu theo từng cấp độ. */
  byLevel: Record<CefrLevel, { correct: number; total: number }>;
}

/** Một cấp độ được tính là "đạt" khi trả lời đúng ít nhất 2/3 số câu của cấp đó. */
export const PASS_RATIO = 2 / 3;

/**
 * Xếp lớp theo bậc thang: đi từ A1 lên, dừng ở cấp đầu tiên chưa đạt.
 * Kết quả là cấp cao nhất đạt liên tục từ A1; nếu chưa đạt A1 thì vẫn xếp A1 (bắt đầu từ nền tảng).
 */
export function scorePlacement(questions: PlacementQuestion[], answers: Record<string, number>): PlacementResult {
  const byLevel = Object.fromEntries(CEFR_ORDER.map((l) => [l, { correct: 0, total: 0 }])) as PlacementResult["byLevel"];
  for (const q of questions) {
    byLevel[q.level].total += 1;
    if (answers[q.id] === q.answer) byLevel[q.level].correct += 1;
  }

  let level: CefrLevel = "A1";
  for (const l of CEFR_ORDER) {
    const { correct, total } = byLevel[l];
    if (total === 0) continue;
    if (correct / total + 1e-9 < PASS_RATIO) break;
    level = l;
  }

  const correct = Object.values(byLevel).reduce((sum, v) => sum + v.correct, 0);
  return { level, correct, total: questions.length, byLevel };
}
