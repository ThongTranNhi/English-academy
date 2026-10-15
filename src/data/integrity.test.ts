import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { CefrLevel } from "@/types";
import { courses } from "./courses";
import { lessons } from "./lessons";
import { teachers } from "./teachers";
import { testimonials } from "./testimonials";
import { vocabTopics } from "./vocabulary";
import { grammarLessons } from "./grammar";
import { libraryItems } from "./library";
import { skills } from "./skills";
import { homeCategories } from "./categories";
import { iconMap } from "@/lib/icons";

const levels: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];
const duplicates = (values: string[]) => values.filter((value, index) => values.indexOf(value) !== index);

describe("dữ liệu mẫu", () => {
  it("không trùng slug hoặc id", () => {
    expect(duplicates(courses.map((c) => c.slug))).toEqual([]);
    expect(duplicates(lessons.map((l) => l.slug))).toEqual([]);
    expect(duplicates(teachers.map((t) => t.slug))).toEqual([]);
    expect(duplicates(vocabTopics.map((t) => t.slug))).toEqual([]);
    expect(duplicates(grammarLessons.map((g) => g.slug))).toEqual([]);
    expect(duplicates(libraryItems.map((i) => i.id))).toEqual([]);
    expect(duplicates(testimonials.map((t) => t.id))).toEqual([]);
    expect(duplicates(skills.flatMap((s) => s.exercises.map((e) => e.id)))).toEqual([]);
  });

  it("mọi khóa học trỏ tới giảng viên và bài học có thật", () => {
    const teacherSlugs = new Set(teachers.map((t) => t.slug));
    const lessonByslug = new Map(lessons.map((l) => [l.slug, l]));
    for (const course of courses) {
      expect(teacherSlugs, course.slug).toContain(course.teacherSlug);
      const outline = course.modules.flatMap((m) => m.lessonSlugs);
      expect(outline.length, course.slug).toBeGreaterThan(0);
      for (const slug of outline) {
        expect(lessonByslug.get(slug)?.courseSlug, `${course.slug} → ${slug}`).toBe(course.slug);
      }
      expect(course.lessonsCount, course.slug).toBeGreaterThanOrEqual(outline.length);
    }
  });

  it("mọi bài học thuộc một khóa học có thật và nằm trong đề cương", () => {
    const outlined = new Set(courses.flatMap((c) => c.modules.flatMap((m) => m.lessonSlugs)));
    for (const lesson of lessons) expect(outlined, lesson.slug).toContain(lesson.slug);
  });

  it("mỗi giảng viên dạy ít nhất một khóa và mỗi khóa có bài học thử", () => {
    for (const teacher of teachers) expect(courses.some((c) => c.teacherSlug === teacher.slug), teacher.slug).toBe(true);
    for (const course of courses) expect(lessons.some((l) => l.courseSlug === course.slug && l.free), course.slug).toBe(true);
  });

  it("ảnh khóa học, thư viện và giảng viên tồn tại trong public/", () => {
    for (const course of courses) {
      if (course.image) expect(existsSync(`public${course.image}`), course.image).toBe(true);
    }
    for (const item of libraryItems) {
      if (item.image) expect(existsSync(`public${item.image}`), item.image).toBe(true);
    }
    for (const teacher of teachers) {
      if (teacher.photo) expect(existsSync(`public${teacher.photo}`), teacher.photo).toBe(true);
    }
  });

  it("phản hồi học viên gắn với khóa học có thật", () => {
    const courseSlugs = new Set(courses.map((c) => c.slug));
    for (const t of testimonials) expect(courseSlugs, t.id).toContain(t.courseSlug);
  });

  it("mỗi cấp độ CEFR đều có khóa học, ngữ pháp và bài luyện kỹ năng", () => {
    for (const level of levels) {
      expect(courses.some((c) => c.level === level), `khóa học ${level}`).toBe(true);
      expect(grammarLessons.some((g) => g.level === level), `ngữ pháp ${level}`).toBe(true);
      expect(skills.flatMap((s) => s.exercises).some((e) => e.level === level), `kỹ năng ${level}`).toBe(true);
    }
  });

  it("chỉ 8 khóa nổi bật để trang chủ giữ bố cục", () => {
    expect(courses.filter((c) => c.featured)).toHaveLength(8);
  });

  it("đáp án quiz nằm trong danh sách lựa chọn", () => {
    const quizzes = [...lessons.flatMap((l) => l.quiz ?? []), ...grammarLessons.flatMap((g) => g.exercises)];
    for (const q of quizzes) {
      expect(q.answer, q.question).toBeGreaterThanOrEqual(0);
      expect(q.answer, q.question).toBeLessThan(q.options.length);
    }
  });

  it("mỗi chủ đề từ vựng có nghĩa không trùng nhau và icon hợp lệ", () => {
    for (const topic of vocabTopics) {
      expect(duplicates(topic.words.map((w) => w.meaning)), topic.slug).toEqual([]);
      expect(topic.words.every((w) => /^\/.+\/$/.test(w.phonetic)), topic.slug).toBe(true);
    }
    const icons = [...vocabTopics.map((t) => t.icon), ...homeCategories.map((c) => c.icon), ...skills.map((s) => s.icon)];
    for (const icon of icons) expect(Object.keys(iconMap), icon).toContain(icon);
  });
});
