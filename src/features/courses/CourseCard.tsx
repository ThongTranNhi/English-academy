import { Link } from "react-router";
import { BookOpen, Clock, Star } from "lucide-react";
import type { Course } from "@/types";
import { Badge } from "@/components/ui/badge";
import { CoverArt } from "@/components/shared/CoverArt";
import { Avatar } from "@/components/shared/Avatar";
import { getTeacher } from "@/data/teachers";
import { courseCategoryLabels } from "@/data/categories";
import { formatPrice } from "@/lib/utils";

const categoryIcon: Record<Course["category"], string> = {
  general: "GraduationCap",
  ielts: "Trophy",
  toeic: "Target",
  communication: "MessagesSquare",
  business: "Briefcase",
};

export function CourseCard({ course }: { course: Course }) {
  const teacher = getTeacher(course.teacherSlug);
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[14px] border border-slate-200/80 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        <CoverArt tone={course.tone} icon={categoryIcon[course.category]} label={courseCategoryLabels[course.category]} className="aspect-[16/9]" />
        {course.badge && (
          <Badge variant={course.badge === "Bestseller" ? "highlight" : course.badge === "Mới" ? "accent" : "success"} className="absolute left-3 top-3 bg-white shadow-sm">
            {course.badge}
          </Badge>
        )}
        <span className="absolute right-3 top-3 rounded-md bg-navy/80 px-2 py-0.5 text-xs font-bold text-white">{course.level}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="min-h-[2.75rem] text-base font-semibold leading-snug">
          <Link to={`/courses/${course.slug}`} className="after:absolute after:inset-0 group-hover:text-primary">
            {course.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{course.shortDescription}</p>
        {teacher && (
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-700">
            <Avatar name={teacher.name} tone={teacher.tone} size="sm" />
            <span className="font-medium">{teacher.name}</span>
          </div>
        )}
        <div className="mb-4 mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1"><BookOpen className="size-3.5" aria-hidden />{course.lessonsCount} bài</span>
          <span className="inline-flex items-center gap-1"><Clock className="size-3.5" aria-hidden />{course.durationHours} giờ</span>
          <span className="inline-flex items-center gap-1"><Star className="size-3.5 fill-highlight text-highlight" aria-hidden />{course.rating}</span>
        </div>
        <div className="mt-auto flex items-baseline gap-2 border-t border-slate-100 pt-4">
          <span className={course.price === 0 ? "font-bold text-emerald-600" : "font-bold text-primary"}>{formatPrice(course.price)}</span>
          {course.originalPrice && <span className="text-xs text-slate-400 line-through">{formatPrice(course.originalPrice)}</span>}
        </div>
      </div>
    </article>
  );
}
