import type { CefrLevel } from "@/types";
import { courses } from "@/data/courses";
import { CEFR_ORDER } from "./scorePlacement";

/** Khóa học gợi ý: đúng cấp độ trước, rồi cấp kế tiếp để có lộ trình đi lên; khóa nổi bật ưu tiên. */
export function recommendCourses(level: CefrLevel, limit = 3) {
  const next = CEFR_ORDER[Math.min(CEFR_ORDER.indexOf(level) + 1, CEFR_ORDER.length - 1)];
  const rank = (c: (typeof courses)[number]) => (c.level === level ? 0 : 10) - (c.featured ? 1 : 0);
  return courses.filter((c) => c.level === level || c.level === next).sort((a, b) => rank(a) - rank(b)).slice(0, limit);
}
