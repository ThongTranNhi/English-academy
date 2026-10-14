import type { QuizQuestion, VocabWord } from "@/types";

/** Sinh câu hỏi trắc nghiệm "chọn nghĩa đúng" từ danh sách từ vựng. */
export function buildVocabQuiz(words: VocabWord[], count = 4): QuizQuestion[] {
  return words.slice(0, count).map((w, i) => {
    const distractors = words.filter((o) => o.word !== w.word).slice(i, i + 2);
    const pool = distractors.length < 2 ? words.filter((o) => o.word !== w.word).slice(0, 2) : distractors;
    const options = [w.meaning, ...pool.map((d) => d.meaning)];
    // Xoay vòng vị trí đáp án đúng để không luôn là A.
    const shift = i % options.length;
    const rotated = [...options.slice(shift), ...options.slice(0, shift)];
    return {
      id: `v-${w.word}`,
      question: `“${w.word}” nghĩa là gì?`,
      options: rotated,
      answer: rotated.indexOf(w.meaning),
    };
  });
}
