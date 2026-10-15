import { Link, useParams } from "react-router";
import { BookOpen, CheckCircle2, Clock, FileText, Headphones, Lock, PlayCircle, Star, Users } from "lucide-react";
import type { Lesson } from "@/types";
import { getCourse, courses } from "@/data/courses";
import { getTeacher } from "@/data/teachers";
import { getLesson } from "@/data/lessons";
import { courseCategoryLabels } from "@/data/categories";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/shared/Container";
import { Avatar } from "@/components/shared/Avatar";
import { CourseCover } from "@/features/courses/CourseCover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CourseCard } from "@/features/courses/CourseCard";
import { useJsonLd, usePageMeta } from "@/hooks/usePageMeta";
import { formatPrice } from "@/lib/utils";
import { useProgressStore } from "@/store/progressStore";
import NotFoundPage from "./NotFoundPage";

const typeIcon: Record<Lesson["type"], typeof PlayCircle> = { video: PlayCircle, audio: Headphones, reading: FileText, exercise: BookOpen };

export default function CourseDetailPage() {
  const { slug = "" } = useParams();
  const course = getCourse(slug);
  const completed = useProgressStore((s) => s.completedLessons);
  usePageMeta(course?.title ?? "Không tìm thấy khóa học", course?.shortDescription);
  useJsonLd(
    course
      ? {
          "@context": "https://schema.org",
          "@type": "Course",
          name: course.title,
          description: course.description,
          educationalLevel: `CEFR ${course.level}`,
          inLanguage: "en",
          provider: { "@type": "EducationalOrganization", name: "English Academy" },
          instructor: getTeacher(course.teacherSlug) ? { "@type": "Person", name: getTeacher(course.teacherSlug)!.name } : undefined,
          aggregateRating: { "@type": "AggregateRating", ratingValue: course.rating, ratingCount: course.students },
          offers: { "@type": "Offer", price: course.price, priceCurrency: "VND", category: course.price === 0 ? "Free" : "Paid" },
        }
      : null,
  );

  if (!course) return <NotFoundPage />;
  const teacher = getTeacher(course.teacherSlug);
  const firstLesson = course.modules[0]?.lessonSlugs[0];
  const related = courses.filter((c) => c.slug !== course.slug && (c.category === course.category || c.level === course.level)).slice(0, 4);

  return (
    <>
      <PageHeader title={course.title} description={course.description} breadcrumbs={[{ label: "Khóa học", href: "/courses" }, { label: course.title }]}>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-300">
          <Badge variant="highlight">{courseCategoryLabels[course.category]}</Badge>
          <span className="inline-flex items-center gap-1"><Star className="size-4 fill-highlight text-highlight" aria-hidden /> {course.rating} đánh giá</span>
          <span className="inline-flex items-center gap-1"><Users className="size-4" aria-hidden /> {course.students.toLocaleString("vi-VN")} học viên</span>
          <span>Cấp độ {course.level}</span>
          {teacher && <span>Giảng viên: <Link to={`/teachers/${teacher.slug}`} className="font-semibold text-white hover:underline">{teacher.name}</Link></span>}
        </div>
      </PageHeader>

      <Container className="grid gap-10 py-10 lg:grid-cols-[1fr_360px] lg:py-14">
        <div className="space-y-10">
          <section aria-labelledby="outcomes-heading" className="rounded-[14px] border border-slate-200 bg-white p-6">
            <h2 id="outcomes-heading" className="mb-4 text-xl font-bold">Bạn sẽ đạt được</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {course.outcomes.map((o) => (
                <li key={o} className="flex gap-2 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" aria-hidden />{o}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="curriculum-heading">
            <h2 id="curriculum-heading" className="mb-4 text-xl font-bold">Nội dung khóa học</h2>
            <p className="mb-4 text-sm text-slate-600">{course.modules.length} chương · {course.lessonsCount} bài học · {course.durationHours} giờ. Dưới đây là các bài tiêu biểu.</p>
            <div className="space-y-4">
              {course.modules.map((m, mi) => (
                <details key={m.title} open={mi === 0} className="group overflow-hidden rounded-[14px] border border-slate-200 bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-semibold hover:bg-surface">
                    <span>Chương {mi + 1}: {m.title}</span>
                    <span className="text-xs font-normal text-slate-500">{m.lessonSlugs.length} bài</span>
                  </summary>
                  <ul className="divide-y divide-slate-100 border-t border-slate-100">
                    {m.lessonSlugs.map((ls) => {
                      const lesson = getLesson(ls);
                      if (!lesson) return null;
                      const Icon = typeIcon[lesson.type];
                      const done = completed.includes(lesson.slug);
                      return (
                        <li key={ls}>
                          <Link to={`/learning/${lesson.slug}`} className="flex items-center gap-3 px-5 py-3 text-sm hover:bg-primary-soft">
                            {done ? <CheckCircle2 className="size-4 shrink-0 text-emerald-500" aria-label="Đã hoàn thành" /> : <Icon className="size-4 shrink-0 text-primary" aria-hidden />}
                            <span className="flex-1">{lesson.title}</span>
                            {lesson.free ? <Badge variant="success">Học thử</Badge> : <Lock className="size-3.5 text-slate-400" aria-label="Cần đăng ký khóa học" />}
                            <span className="w-14 text-right text-xs text-slate-500">{lesson.durationMinutes} phút</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </details>
              ))}
            </div>
          </section>

          {teacher && (
            <section aria-labelledby="teacher-heading" className="rounded-[14px] border border-slate-200 bg-white p-6">
              <h2 id="teacher-heading" className="mb-4 text-xl font-bold">Giảng viên</h2>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Avatar name={teacher.name} tone={teacher.tone} src={teacher.photo} size="lg" />
                <div>
                  <Link to={`/teachers/${teacher.slug}`} className="text-lg font-semibold hover:text-primary">{teacher.name}</Link>
                  <p className="text-sm text-primary">{teacher.title}</p>
                  <p className="mt-2 text-sm text-slate-600">{teacher.bio}</p>
                </div>
              </div>
            </section>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-lg">
            <CourseCover course={course} priority className="aspect-video" />
            <div className="p-6">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-primary">{formatPrice(course.price)}</span>
                {course.originalPrice && <span className="text-sm text-slate-400 line-through">{formatPrice(course.originalPrice)}</span>}
              </div>
              <p className="mt-1 text-xs text-slate-500">Giá tham khảo – thanh toán trực tuyến chưa được hỗ trợ.</p>
              <ul className="my-5 space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2"><BookOpen className="size-4 text-slate-400" aria-hidden /> {course.lessonsCount} bài học</li>
                <li className="flex items-center gap-2"><Clock className="size-4 text-slate-400" aria-hidden /> {course.durationHours} giờ học</li>
                <li className="flex items-center gap-2"><Star className="size-4 text-slate-400" aria-hidden /> Cấp độ {course.level}</li>
              </ul>
              <div className="grid gap-2">
                {firstLesson && <Button asChild size="lg"><Link to={`/learning/${firstLesson}`}><PlayCircle aria-hidden /> Học thử ngay</Link></Button>}
                <Button asChild variant="outline" size="lg"><Link to="/register">Nhận tư vấn lộ trình</Link></Button>
              </div>
            </div>
          </div>
        </aside>
      </Container>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="bg-white py-14">
          <Container>
            <h2 id="related-heading" className="mb-6 text-2xl font-bold">Khóa học liên quan</h2>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((c) => <li key={c.slug} className="flex"><CourseCard course={c} /></li>)}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
