import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useProgressStore } from "./progressStore";
import { XP } from "@/features/progress/streak";

const state = () => useProgressStore.getState();

describe("progressStore – XP & streak", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 15, 9, 0));
  });
  afterEach(() => vi.useRealTimers());

  it("hoàn thành bài học cộng XP một lần duy nhất dù bật/tắt nhiều lần", () => {
    state().toggleLesson("ielts-overview");
    state().toggleLesson("ielts-overview");
    state().toggleLesson("ielts-overview");
    expect(state().completedLessons).toEqual(["ielts-overview"]);
    expect(state().activity["2026-10-15"]).toBe(XP.lesson);
  });

  it("quiz cộng XP mỗi ngày một lần, đạt 100% có thưởng thêm", () => {
    state().saveQuizScore("q", 100);
    state().saveQuizScore("q", 100);
    expect(state().activity["2026-10-15"]).toBe(XP.quiz + XP.perfectQuizBonus);

    vi.setSystemTime(new Date(2026, 9, 16, 9, 0));
    state().saveQuizScore("q", 50);
    expect(state().activity["2026-10-16"]).toBe(XP.quiz);
  });

  it("ôn từ vựng lên lịch ôn tiếp theo và cộng XP", () => {
    state().reviewWord("itinerary", "good");
    expect(state().srs.itinerary).toMatchObject({ interval: 1, due: "2026-10-16" });
    expect(state().activity["2026-10-15"]).toBe(XP.review);
  });

  it("lưu kết quả xếp lớp kèm ngày làm bài", () => {
    state().savePlacement({ level: "B1", correct: 10, total: 18 });
    expect(state().placement).toEqual({ level: "B1", correct: 10, total: 18, date: "2026-10-15" });
  });

  it("reset xóa toàn bộ tiến độ nhưng đưa mục tiêu ngày về mặc định", () => {
    state().setDailyGoal(80);
    state().toggleLesson("x");
    state().reset();
    expect(state()).toMatchObject({ completedLessons: [], activity: {}, srs: {}, placement: null, dailyGoal: 30 });
  });
});
