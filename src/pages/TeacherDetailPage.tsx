import { useParams } from "react-router";
import { Award, Briefcase, Star, Users } from "lucide-react";
import { getTeacher } from "@/data/teachers";
import { courses } from "@/data/courses";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/shared/Container";
import { Avatar } from "@/components/shared/Avatar";
import { CourseCard } from "@/features/courses/CourseCard";
import { usePageMeta } from "@/hooks/usePageMeta";
import NotFoundPage from "./NotFoundPage";

export default function TeacherDetailPage() {
  const { slug = "" } = useParams();
  const teacher = getTeacher(slug);
  usePageMeta(teacher ? `${teacher.name} – ${teacher.title}` : "Không tìm thấy giảng viên", teacher?.bio);
  if (!teacher) return <NotFoundPage />;
  const taught = courses.filter((c) => c.teacherSlug === teacher.slug);

  const stats = [
    { icon: Briefcase, label: "Kinh nghiệm", value: `${teacher.experienceYears} năm` },
    { icon: Users, label: "Học viên", value: teacher.students.toLocaleString("vi-VN") },
    { icon: Star, label: "Đánh giá", value: `${teacher.rating}/5` },
  ];

  return (
    <>
      <PageHeader title={teacher.name} description={teacher.title} breadcrumbs={[{ label: "Giảng viên", href: "/teachers" }, { label: teacher.name }]} />
      <Container className="grid gap-10 py-10 lg:grid-cols-[320px_1fr] lg:py-14">
        <aside className="space-y-6">
          <div className="flex flex-col items-center rounded-[16px] border border-slate-200 bg-white p-6 text-center">
            <Avatar name={teacher.name} tone={teacher.tone} size="xl" />
            <p className="mt-4 text-lg font-bold">{teacher.name}</p>
            <p className="text-sm text-primary">{teacher.title}</p>
            <dl className="mt-6 grid w-full grid-cols-3 gap-2 border-t border-slate-100 pt-5">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="flex flex-col items-center gap-1 text-xs text-slate-500"><s.icon className="size-4" aria-hidden />{s.label}</dt>
                  <dd className="mt-1 text-sm font-bold">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-[16px] border border-slate-200 bg-white p-6">
            <h2 className="mb-3 flex items-center gap-2 font-semibold"><Award className="size-4 text-highlight" aria-hidden /> Chứng chỉ</h2>
            <ul className="space-y-2 text-sm">
              {teacher.certificates.map((c) => <li key={c} className="rounded-lg bg-surface px-3 py-2">{c}</li>)}
            </ul>
          </div>
        </aside>
        <div className="space-y-10">
          <section aria-labelledby="bio-heading" className="rounded-[16px] border border-slate-200 bg-white p-6">
            <h2 id="bio-heading" className="mb-3 text-xl font-bold">Giới thiệu</h2>
            <p className="leading-relaxed text-slate-700">{teacher.bio}</p>
            <h3 className="mb-2 mt-6 font-semibold">Chuyên môn</h3>
            <ul className="flex flex-wrap gap-2">
              {teacher.specialties.map((s) => <li key={s} className="rounded-full bg-primary-soft px-3 py-1 text-sm font-medium text-primary">{s}</li>)}
            </ul>
          </section>
          <section aria-labelledby="taught-heading">
            <h2 id="taught-heading" className="mb-5 text-xl font-bold">Khóa học giảng dạy ({taught.length})</h2>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {taught.map((c) => <li key={c.slug} className="flex"><CourseCard course={c} /></li>)}
            </ul>
          </section>
        </div>
      </Container>
    </>
  );
}
