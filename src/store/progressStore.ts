import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CefrLevel } from "@/types";
import { dateKey, DEFAULT_DAILY_GOAL, XP, type DateKey } from "@/features/progress/streak";
import { schedule, type Rating, type SrsCard } from "@/features/vocabulary/srs";

export interface PlacementRecord {
  level: CefrLevel;
  correct: number;
  total: number;
  date: DateKey;
}

interface ProgressState {
  completedLessons: string[];
  learnedWords: string[];
  quizScores: Record<string, number>;
  /** XP theo ngày ("YYYY-MM-DD" → XP). */
  activity: Record<DateKey, number>;
  dailyGoal: number;
  /** Khóa sự kiện đã cộng XP, tránh cộng lặp (vd. bật/tắt hoàn thành bài liên tục). */
  awarded: Record<string, true>;
  /** Lịch ôn từ vựng lặp lại ngắt quãng, theo từ. */
  srs: Record<string, SrsCard>;
  placement: PlacementRecord | null;
  toggleLesson: (slug: string) => void;
  markWord: (word: string, learned: boolean) => void;
  saveQuizScore: (id: string, percent: number) => void;
  reviewWord: (word: string, rating: Rating) => void;
  savePlacement: (result: Omit<PlacementRecord, "date">) => void;
  setDailyGoal: (xp: number) => void;
  reset: () => void;
}

const initialData = {
  completedLessons: [] as string[],
  learnedWords: [] as string[],
  quizScores: {} as Record<string, number>,
  activity: {} as Record<DateKey, number>,
  dailyGoal: DEFAULT_DAILY_GOAL,
  awarded: {} as Record<string, true>,
  srs: {} as Record<string, SrsCard>,
  placement: null as PlacementRecord | null,
};

type Data = typeof initialData;

/** Cộng XP cho hôm nay nếu sự kiện `key` chưa từng được cộng. */
function award(state: Data, key: string, xp: number): Partial<Data> {
  if (state.awarded[key]) return {};
  const today = dateKey();
  return {
    awarded: { ...state.awarded, [key]: true },
    activity: { ...state.activity, [today]: (state.activity[today] ?? 0) + xp },
  };
}

/** Tiến độ học lưu trên trình duyệt hiện tại (localStorage). */
export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      ...initialData,
      toggleLesson: (slug) =>
        set((s) => {
          if (s.completedLessons.includes(slug)) return { completedLessons: s.completedLessons.filter((l) => l !== slug) };
          return { completedLessons: [...s.completedLessons, slug], ...award(s, `lesson:${slug}`, XP.lesson) };
        }),
      markWord: (word, learned) =>
        set((s) =>
          learned
            ? { learnedWords: Array.from(new Set([...s.learnedWords, word])), ...award(s, `word:${word}`, XP.wordLearned) }
            : { learnedWords: s.learnedWords.filter((w) => w !== word) },
        ),
      saveQuizScore: (id, percent) =>
        set((s) => ({
          quizScores: { ...s.quizScores, [id]: Math.max(percent, s.quizScores[id] ?? 0) },
          ...award(s, `quiz:${id}:${dateKey()}`, XP.quiz + (percent === 100 ? XP.perfectQuizBonus : 0)),
        })),
      reviewWord: (word, rating) =>
        set((s) => ({
          srs: { ...s.srs, [word]: schedule(s.srs[word], rating, dateKey()) },
          ...award(s, `review:${word}:${dateKey()}`, XP.review),
        })),
      savePlacement: (result) =>
        set((s) => ({ placement: { ...result, date: dateKey() }, ...award(s, `placement:${dateKey()}`, XP.placement) })),
      setDailyGoal: (xp) => set({ dailyGoal: xp }),
      reset: () => set(initialData),
    }),
    { name: "ea-progress" },
  ),
);
