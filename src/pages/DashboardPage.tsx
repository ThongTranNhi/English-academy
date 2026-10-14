import { Link } from "react-router";
import { BookOpen, CheckCircle2, Languages, RotateCcw, Trophy } from "lucide-react";
import { courses } from "@/data/courses";
import { getLesson, getLessonsByCourse } from "@/data/lessons";
import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/authStore";
import { useProgressStore } from "@/store/progressStore";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function DashboardPage() {
  usePageMeta("Dashboard");
  const user = useAuthStore((s) => s.user);
  const { completedLessons, learnedWords, quizScores, reset } = useProgressStore();

  const scores = Object.values(quizScores);
  const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  const inProgress = courses
    .map((c) => {
      const all = getLessonsByCourse(c.slug);
      const done = all.filter((l) => completedLessons.includes(l.slug)).length;
      return { course: c, done, total: all.length };
    })
    .filter((x) => x.done > 0);

  const stats = [
    { icon: CheckCircle2, label: "Bài đã hoàn thành", value: completedLessons.length },
    { icon: Languages, label: "Từ vựng đã thuộc", value: learnedWords.length },
    { icon: Trophy, label: "Quiz đã làm", value: scores.length },
    { icon: BookOpen, label: "Điểm quiz trung bình", value: `${avgScore}%` },
  ];

  return (
    <Container className="py-10 lg:py-14">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Badge variant="highlight" className="mb-2">Dashboard demo</Badge>
          <h1 className="text-2xl font-bold sm:text-3xl">Xin chào{user ? `, ${user.name}` : ""} 👋</h1>
          <p className="mt-1 text-slate-600">Tiến độ được lưu trên trình duyệt này (localStorage), chưa đồng bộ với tài khoản.</p>
        </div>
        <Button variant="outline" size="sm" onClick={reset}><RotateCcw aria-hidden /> Xóa tiến độ</Button>
      </div>

      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <li key={s.label} className="rounded-[14px] border border-slate-200 bg-white p-5">
            <s.icon className="mb-3 size-6 text-primary" aria-hidden />
            <p className="text-2xl font-extrabold">{s.value}</p>
            <p className="text-sm text-slate-600">{s.label}</p>
          </li>
        ))}
      </ul>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <section aria-labelledby="progress-heading">
          <h2 id="progress-heading" className="mb-4 text-xl font-bold">Khóa học đang học</h2>
          {inProgress.length === 0 ? (
            <div className="rounded-[14px] border border-dashed border-slate-300 bg-white p-8 text-center">
              <p className="font-semibold">Bạn chưa hoàn thành bài học nào</p>
              <p className="mt-1 text-sm text-slate-600">Bắt đầu với một bài học thử miễn phí.</p>
              <Button asChild className="mt-5"><Link to="/learning/ielts-overview">Học thử ngay</Link></Button>
            </div>
          ) : (
            <ul className="space-y-3">
              {inProgress.map(({ course, done, total }) => (
                <li key={course.slug} className="rounded-[14px] border border-slate-200 bg-white p-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <Link to={`/courses/${course.slug}`} className="font-semibold hover:text-primary">{course.title}</Link>
                    <span className="shrink-0 text-sm text-slate-500">{done}/{total} bài</span>
                  </div>
                  <Progress value={(done / total) * 100} label={`Tiến độ ${course.title}`} />
                </li>
              ))}
            </ul>
          )}
        </section>
        <section aria-labelledby="recent-heading">
          <h2 id="recent-heading" className="mb-4 text-xl font-bold">Bài đã hoàn thành</h2>
          <ul className="divide-y divide-slate-100 rounded-[14px] border border-slate-200 bg-white">
            {completedLessons.length === 0 && <li className="p-5 text-sm text-slate-500">Chưa có bài nào.</li>}
            {completedLessons.slice(-6).reverse().map((slug) => {
              const l = getLesson(slug);
              return l ? (
                <li key={slug}>
                  <Link to={`/learning/${slug}`} className="flex items-center gap-2 p-4 text-sm hover:bg-surface">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-500" aria-hidden /> {l.title}
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
        </section>
      </div>
    </Container>
  );
}
