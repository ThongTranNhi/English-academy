import { courses } from "@/data/courses";
import { lessons } from "@/data/lessons";
import { teachers } from "@/data/teachers";
import { courseCategoryLabels } from "@/data/categories";
import { matchesQuery } from "@/lib/utils";

export function searchAll(query: string) {
  if (!query.trim()) return { courses: [], lessons: [], teachers: [] };
  return {
    courses: courses.filter((c) =>
      matchesQuery(query, c.title, c.shortDescription, c.level, courseCategoryLabels[c.category]),
    ),
    lessons: lessons.filter((l) => matchesQuery(query, l.title, l.summary)),
    teachers: teachers.filter((t) => matchesQuery(query, t.name, t.title, ...t.specialties)),
  };
}
