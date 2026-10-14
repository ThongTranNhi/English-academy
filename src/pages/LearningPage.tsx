import { Link, useParams } from "react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, Lock, PlayCircle } from "lucide-react";
import { getLesson } from "@/data/lessons";
import { getCourse } from "@/data/courses";
import { Container } from "@/components/shared/Container";
import { CoverArt } from "@/components/shared/CoverArt";
import { Quiz } from "@/components/shared/Quiz";
import { SpeakButton } from "@/components/shared/SpeakButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TranscriptPanel } from "@/features/lessons/TranscriptPanel";
import { useProgressStore } from "@/store/progressStore";
import { usePageMeta } from "@/hooks/usePageMeta";
import { cn } from "@/lib/utils";
import NotFoundPage from "./NotFoundPage";

const typeLabel = { video: "Video", audio: "Audio", reading: "Bài đọc", exercise: "Bài tập" } as const;

export default function LearningPage() {
  const { slug = "" } = useParams();
  const lesson = getLesson(slug);
  const completed = useProgressStore((s) => s.completedLessons);
  const toggleLesson = useProgressStore((s) => s.toggleLesson);
  usePageMeta(lesson?.title ?? "Không tìm thấy bài học", lesson?.summary);

  if (!lesson) return <NotFoundPage />;
  const course = getCourse(lesson.courseSlug);
  const outline = course?.modules.flatMap((m) => m.lessonSlugs) ?? [];
  const idx = outline.indexOf(lesson.slug);
  const prev = idx > 0 ? outline[idx - 1] : undefined;
  const next = idx >= 0 && idx < outline.length - 1 ? outline[idx + 1] : undefined;
  const done = completed.includes(lesson.slug);

  return (
    <Container className="grid gap-8 py-8 lg:grid-cols-[1fr_320px] lg:py-12">
      <article className="min-w-0 space-y-8">
        <div>
          {course && (
            <Link to={`/courses/${course.slug}`} className="mb-3 inline-flex items-center gap-1 text-sm text-slate-600 hover:text-primary">
              <ArrowLeft className="size-4" aria-hidden /> {course.title}
            </Link>
          )}
          <div className="mb-2 flex flex-wrap gap-2">
            <Badge>{typeLabel[lesson.type]}</Badge>
            <Badge variant="outline">{lesson.durationMinutes} phút</Badge>
            {lesson.free && <Badge variant="success">Học thử miễn phí</Badge>}
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{lesson.title}</h1>
          <p className="mt-2 text-slate-600">{lesson.summary}</p>
        </div>

        {(lesson.type === "video" || lesson.type === "audio") && (
          <div className="relative overflow-hidden rounded-[16px]">
            <CoverArt tone={course?.tone ?? "indigo"} icon={lesson.type === "video" ? "Video" : "Headphones"} className="aspect-video" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-navy/30 text-white">
              <PlayCircle className="size-16" aria-hidden />
              <p className="rounded-full bg-navy/60 px-4 py-1.5 text-sm">
                {lesson.type === "video" ? "Video bài giảng" : "Audio bài học"} sẽ được gắn khi có nội dung chính thức
              </p>
            </div>
          </div>
        )}

        <section aria-labelledby="content-heading" className="rounded-[14px] border border-slate-200 bg-white p-5 sm:p-6">
          <h2 id="content-heading" className="mb-4 text-lg font-semibold">Nội dung bài học</h2>
          <ul className="space-y-3">
            {lesson.content.map((c) => (
              <li key={c} className="flex gap-3 font-body text-[15px] leading-relaxed text-slate-700">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />{c}
              </li>
            ))}
          </ul>
        </section>

        {lesson.transcript && <TranscriptPanel transcript={lesson.transcript} />}

        {lesson.vocabulary && (
          <section aria-labelledby="vocab-heading" className="rounded-[14px] border border-slate-200 bg-white p-5 sm:p-6">
            <h2 id="vocab-heading" className="mb-4 text-lg font-semibold">Từ vựng trong bài</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {lesson.vocabulary.map((v) => (
                <li key={v.word} className="flex items-center gap-2 rounded-xl bg-surface px-3 py-2.5">
                  <SpeakButton text={v.word} />
                  <span className="font-semibold">{v.word}</span>
                  <span className="text-sm text-slate-600">– {v.meaning}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {lesson.quiz && <Quiz id={`lesson-${lesson.slug}`} questions={lesson.quiz} />}

        <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Button variant={done ? "secondary" : "default"} onClick={() => toggleLesson(lesson.slug)} aria-pressed={done}>
            <CheckCircle2 aria-hidden /> {done ? "Đã hoàn thành" : "Đánh dấu hoàn thành"}
          </Button>
          <div className="flex gap-2">
            {prev && <Button asChild variant="outline"><Link to={`/learning/${prev}`}><ArrowLeft aria-hidden /> Bài trước</Link></Button>}
            {next && <Button asChild variant="outline"><Link to={`/learning/${next}`}>Bài tiếp <ArrowRight aria-hidden /></Link></Button>}
          </div>
        </div>
      </article>

      {course && (
        <aside aria-label="Đề cương khóa học" className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[14px] border border-slate-200 bg-white">
            <p className="border-b border-slate-100 px-5 py-4 font-semibold">Đề cương</p>
            <ol className="max-h-[60vh] overflow-y-auto p-2">
              {outline.map((ls, i) => {
                const l = getLesson(ls);
                if (!l) return null;
                const isCurrent = ls === lesson.slug;
                const isDone = completed.includes(ls);
                return (
                  <li key={ls}>
                    <Link
                      to={`/learning/${ls}`}
                      aria-current={isCurrent ? "page" : undefined}
                      className={cn("flex items-start gap-2.5 rounded-lg px-3 py-2.5 text-sm", isCurrent ? "bg-primary-soft font-semibold text-primary" : "hover:bg-surface")}
                    >
                      {isDone ? <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" aria-hidden /> : l.free ? <Circle className="mt-0.5 size-4 shrink-0 text-slate-300" aria-hidden /> : <Lock className="mt-0.5 size-4 shrink-0 text-slate-300" aria-hidden />}
                      <span>{i + 1}. {l.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        </aside>
      )}
    </Container>
  );
}
