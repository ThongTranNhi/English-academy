import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProgressState {
  completedLessons: string[];
  learnedWords: string[];
  quizScores: Record<string, number>;
  toggleLesson: (slug: string) => void;
  markWord: (word: string, learned: boolean) => void;
  saveQuizScore: (id: string, percent: number) => void;
  reset: () => void;
}

/** Tiến độ học lưu trên trình duyệt hiện tại (localStorage). */
export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      completedLessons: [],
      learnedWords: [],
      quizScores: {},
      toggleLesson: (slug) =>
        set((s) => ({
          completedLessons: s.completedLessons.includes(slug)
            ? s.completedLessons.filter((l) => l !== slug)
            : [...s.completedLessons, slug],
        })),
      markWord: (word, learned) =>
        set((s) => ({
          learnedWords: learned
            ? Array.from(new Set([...s.learnedWords, word]))
            : s.learnedWords.filter((w) => w !== word),
        })),
      saveQuizScore: (id, percent) =>
        set((s) => ({ quizScores: { ...s.quizScores, [id]: Math.max(percent, s.quizScores[id] ?? 0) } })),
      reset: () => set({ completedLessons: [], learnedWords: [], quizScores: {} }),
    }),
    { name: "ea-progress" },
  ),
);
