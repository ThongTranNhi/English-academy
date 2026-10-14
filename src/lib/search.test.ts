import { describe, expect, it } from "vitest";
import { searchAll } from "./search";

describe("searchAll", () => {
  it("trả về kết quả rỗng khi không có từ khóa", () => {
    expect(searchAll("  ")).toEqual({ courses: [], lessons: [], teachers: [] });
  });

  it("tìm khóa học theo danh mục", () => {
    const { courses } = searchAll("toeic");
    expect(courses.length).toBeGreaterThan(0);
    expect(courses.every((c) => c.category === "toeic")).toBe(true);
  });

  it("tìm được khi người dùng gõ không dấu", () => {
    const { courses } = searchAll("giao tiep");
    expect(courses.map((c) => c.slug)).toContain("everyday-communication");
  });

  it("tìm giảng viên theo chuyên môn", () => {
    const { teachers } = searchAll("business english");
    expect(teachers.map((t) => t.slug)).toEqual(["david-nguyen"]);
  });

  it("tìm bài học theo tiêu đề", () => {
    const { lessons } = searchAll("small talk");
    expect(lessons.map((l) => l.slug)).toContain("comm-small-talk");
  });

  it("không trả về gì cho từ khóa không tồn tại", () => {
    const r = searchAll("xyz-khong-ton-tai");
    expect(r.courses.length + r.lessons.length + r.teachers.length).toBe(0);
  });
});
