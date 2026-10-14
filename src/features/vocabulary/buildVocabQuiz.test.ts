import { describe, expect, it } from "vitest";
import { buildVocabQuiz } from "./buildVocabQuiz";
import { vocabTopics } from "@/data/vocabulary";

describe("buildVocabQuiz", () => {
  for (const topic of vocabTopics) {
    describe(`chủ đề ${topic.slug}`, () => {
      const quiz = buildVocabQuiz(topic.words);

      it("tạo tối đa 4 câu hỏi", () => {
        expect(quiz).toHaveLength(Math.min(4, topic.words.length));
      });

      it("đáp án đúng trỏ tới nghĩa của từ được hỏi", () => {
        quiz.forEach((q, i) => {
          expect(q.question).toContain(topic.words[i].word);
          expect(q.options[q.answer]).toBe(topic.words[i].meaning);
        });
      });

      it("mỗi câu có 3 lựa chọn không trùng nhau", () => {
        for (const q of quiz) {
          expect(q.options).toHaveLength(3);
          expect(new Set(q.options).size).toBe(q.options.length);
        }
      });
    });
  }

  it("đáp án đúng không luôn nằm ở cùng một vị trí", () => {
    const quiz = buildVocabQuiz(vocabTopics[0].words);
    expect(new Set(quiz.map((q) => q.answer)).size).toBeGreaterThan(1);
  });
});
