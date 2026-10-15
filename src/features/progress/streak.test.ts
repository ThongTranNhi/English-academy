import { describe, expect, it } from "vitest";
import { addDays, currentStreak, dateKey, lastDays } from "./streak";

describe("dateKey / addDays", () => {
  it("định dạng YYYY-MM-DD theo giờ địa phương", () => {
    expect(dateKey(new Date(2026, 0, 5, 23, 59))).toBe("2026-01-05");
  });

  it("cộng trừ ngày qua ranh giới tháng và năm", () => {
    expect(addDays("2026-01-31", 1)).toBe("2026-02-01");
    expect(addDays("2026-01-01", -1)).toBe("2025-12-31");
    expect(addDays("2028-02-28", 1)).toBe("2028-02-29");
  });
});

describe("currentStreak", () => {
  const today = "2026-10-15";

  it("đếm các ngày liên tiếp có XP kết thúc ở hôm nay", () => {
    expect(currentStreak({ "2026-10-13": 5, "2026-10-14": 10, "2026-10-15": 20 }, today)).toBe(3);
  });

  it("hôm nay chưa học thì chuỗi vẫn tính đến hôm qua", () => {
    expect(currentStreak({ "2026-10-13": 5, "2026-10-14": 10 }, today)).toBe(2);
  });

  it("bỏ lỡ một ngày thì chuỗi bị ngắt", () => {
    expect(currentStreak({ "2026-10-12": 5, "2026-10-13": 5, "2026-10-15": 20 }, today)).toBe(1);
    expect(currentStreak({ "2026-10-13": 5 }, today)).toBe(0);
  });

  it("ngày có 0 XP không được tính", () => {
    expect(currentStreak({ "2026-10-14": 0, "2026-10-15": 0 }, today)).toBe(0);
  });
});

describe("lastDays", () => {
  it("trả về n ngày từ cũ đến mới, ngày thiếu dữ liệu có 0 XP", () => {
    expect(lastDays({ "2026-10-15": 30, "2026-10-13": 12 }, "2026-10-15", 3)).toEqual([
      { date: "2026-10-13", xp: 12 },
      { date: "2026-10-14", xp: 0 },
      { date: "2026-10-15", xp: 30 },
    ]);
  });
});
