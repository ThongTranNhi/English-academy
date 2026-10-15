/** Ngày được biểu diễn dạng "YYYY-MM-DD" theo giờ địa phương để so sánh/sắp xếp bằng chuỗi. */
export type DateKey = string;

export function dateKey(date = new Date()): DateKey {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDays(key: DateKey, days: number): DateKey {
  const [y, m, d] = key.split("-").map(Number);
  return dateKey(new Date(y, m - 1, d + days));
}

/** Điểm XP cho từng hoạt động. */
export const XP = {
  lesson: 20,
  quiz: 10,
  perfectQuizBonus: 5,
  wordLearned: 2,
  review: 2,
  placement: 15,
} as const;

export const DEFAULT_DAILY_GOAL = 30;
export const DAILY_GOAL_OPTIONS = [10, 30, 50, 80] as const;

/**
 * Chuỗi ngày học liên tiếp. Nếu hôm nay chưa học, chuỗi vẫn giữ nguyên tính đến hôm qua
 * (người học còn cả ngày hôm nay để duy trì).
 */
export function currentStreak(activity: Record<DateKey, number>, today: DateKey): number {
  let day = (activity[today] ?? 0) > 0 ? today : addDays(today, -1);
  let streak = 0;
  while ((activity[day] ?? 0) > 0) {
    streak += 1;
    day = addDays(day, -1);
  }
  return streak;
}

/** XP của n ngày gần nhất, cũ → mới, kết thúc ở hôm nay. */
export function lastDays(activity: Record<DateKey, number>, today: DateKey, n = 7): { date: DateKey; xp: number }[] {
  return Array.from({ length: n }, (_, i) => {
    const date = addDays(today, i - (n - 1));
    return { date, xp: activity[date] ?? 0 };
  });
}
