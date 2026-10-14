import { Link } from "react-router";
import { Star, Users } from "lucide-react";
import type { Teacher } from "@/types";
import { Avatar } from "@/components/shared/Avatar";
import { courses } from "@/data/courses";

export function TeacherCard({ teacher }: { teacher: Teacher }) {
  const courseCount = courses.filter((c) => c.teacherSlug === teacher.slug).length;
  return (
    <article className="group relative flex flex-col items-center rounded-[14px] border border-slate-200/80 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <Avatar name={teacher.name} tone={teacher.tone} size="lg" />
      <h3 className="mt-4 font-semibold">
        <Link to={`/teachers/${teacher.slug}`} className="after:absolute after:inset-0 group-hover:text-primary">
          {teacher.name}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-primary">{teacher.title}</p>
      <ul className="mt-3 flex flex-wrap justify-center gap-1.5">
        {teacher.specialties.slice(0, 2).map((s) => (
          <li key={s} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">{s}</li>
        ))}
      </ul>
      <div className="mt-4 flex w-full justify-center gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1"><Star className="size-3.5 fill-highlight text-highlight" aria-hidden />{teacher.rating}</span>
        <span className="inline-flex items-center gap-1"><Users className="size-3.5" aria-hidden />{teacher.students.toLocaleString("vi-VN")}</span>
        <span>{courseCount} khóa</span>
      </div>
    </article>
  );
}
