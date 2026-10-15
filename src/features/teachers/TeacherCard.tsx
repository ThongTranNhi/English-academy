import { Link } from "react-router";
import { Star, Users } from "lucide-react";
import type { Teacher } from "@/types";
import { Avatar } from "@/components/shared/Avatar";
import { courses } from "@/data/courses";

export function TeacherCard({ teacher }: { teacher: Teacher }) {
  const courseCount = courses.filter((c) => c.teacherSlug === teacher.slug).length;
  return (
    <article className="duo-card lift-card group relative flex flex-col items-center p-6 text-center">
      <Avatar name={teacher.name} tone={teacher.tone} src={teacher.photo} size="lg" className="icon-pop ring-4 ring-white shadow-[0_5px_0_#e2e8f0]" />
      <h3 className="mt-4 text-lg font-extrabold">
        <Link to={`/teachers/${teacher.slug}`} className="after:absolute after:inset-0 group-hover:text-primary">
          {teacher.name}
        </Link>
      </h3>
      <p className="mt-1 text-sm font-bold text-primary">{teacher.title}</p>
      <ul className="mt-3 flex flex-wrap justify-center gap-1.5">
        {teacher.specialties.slice(0, 2).map((s) => (
          <li key={s} className="rounded-full bg-sky-soft px-2.5 py-0.5 text-xs font-bold text-sky-ink">{s}</li>
        ))}
      </ul>
      <div className="mt-4 flex w-full justify-center gap-4 border-t-2 border-slate-100 pt-4 text-xs font-semibold text-slate-500">
        <span className="inline-flex items-center gap-1"><Star className="size-3.5 fill-highlight text-highlight" aria-hidden />{teacher.rating}</span>
        <span className="inline-flex items-center gap-1"><Users className="size-3.5" aria-hidden />{teacher.students.toLocaleString("vi-VN")}</span>
        <span>{courseCount} khóa</span>
      </div>
    </article>
  );
}
