import type { Course } from "@/types";
import { CoverArt } from "@/components/shared/CoverArt";
import { courseCategoryLabels } from "@/data/categories";
import { cn } from "@/lib/utils";

const categoryIcon: Record<Course["category"], string> = {
  general: "GraduationCap",
  ielts: "Trophy",
  toeic: "Target",
  communication: "MessagesSquare",
  business: "Briefcase",
};

/** Ảnh bìa khóa học; khóa chưa có ảnh dùng ảnh bìa gradient theo tone. */
export function CourseCover({ course, className, priority }: { course: Course; className?: string; priority?: boolean }) {
  if (!course.image) {
    return <CoverArt tone={course.tone} icon={categoryIcon[course.category]} label={courseCategoryLabels[course.category]} className={className} />;
  }
  return (
    <img
      src={course.image}
      alt=""
      width={960}
      height={536}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn("w-full bg-primary-soft object-cover", className)}
    />
  );
}
