import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, ArrowRight, Clock, ListChecks, RotateCcw, Target } from "lucide-react";
import { placementQuestions } from "@/data/placement";
import { cefrLevels } from "@/data/cefr";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CourseCard } from "@/features/courses/CourseCard";
import { useProgressStore } from "@/store/progressStore";
import { cueLumi } from "@/lib/lumi";
import { cn } from "@/lib/utils";
import { CEFR_ORDER, scorePlacement, type PlacementResult } from "./scorePlacement";
import { recommendCourses } from "./recommendCourses";

const skillLabel = { grammar: "Ngữ pháp", vocabulary: "Từ vựng", reading: "Đọc hiểu" } as const;

export function PlacementTest() {
  const [step, setStep] = useState<"intro" | "test" | "result">("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<PlacementResult | null>(null);
  const savePlacement = useProgressStore((s) => s.savePlacement);
  const previous = useProgressStore((s) => s.placement);

  const q = placementQuestions[index];
  const isLast = index === placementQuestions.length - 1;

  const start = () => {
    setAnswers({});
    setIndex(0);
    setResult(null);
    setStep("test");
  };

  const next = () => {
    if (!isLast) return setIndex((i) => i + 1);
    const r = scorePlacement(placementQuestions, answers);
    setResult(r);
    savePlacement({ level: r.level, correct: r.correct, total: r.total });
    cueLumi("celebrate", `Tuyệt vời! Trình độ gợi ý của bạn là ${r.level}.`);
    setStep("result");
  };

  if (step === "intro") {
    return (
      <div className="duo-card mx-auto max-w-2xl p-6 text-center sm:p-10">
        <span className="mx-auto mb-4 flex size-16 items-center justify-center rounded-3xl bg-primary-soft text-primary"><Target className="size-8" aria-hidden /></span>
        <h2 className="text-2xl font-black sm:text-3xl">Bạn đang ở trình độ nào?</h2>
        <p className="mx-auto mt-3 max-w-lg text-slate-600">
          {placementQuestions.length} câu hỏi ngữ pháp, từ vựng và đọc hiểu, sắp xếp từ A1 đến C2. Hãy chọn đáp án bạn chắc chắn nhất – không cần đoán mò.
        </p>
        <ul className="mx-auto mt-6 flex max-w-md flex-wrap justify-center gap-3 text-sm font-bold text-slate-700">
          <li className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5"><Clock className="size-4 text-primary" aria-hidden /> Khoảng 8 phút</li>
          <li className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5"><ListChecks className="size-4 text-primary" aria-hidden /> Kết quả ngay</li>
        </ul>
        {previous && (
          <p className="mt-6 text-sm text-slate-600">
            Lần trước bạn được xếp <strong className="text-primary">{previous.level}</strong> ({previous.correct}/{previous.total} câu đúng).
          </p>
        )}
        <Button size="lg" className="mt-8" onClick={start}>Bắt đầu làm bài <ArrowRight aria-hidden /></Button>
      </div>
    );
  }

  if (step === "result" && result) {
    const info = cefrLevels.find((l) => l.level === result.level)!;
    return (
      <div className="space-y-10">
        <section aria-labelledby="result-heading" className="duo-card grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="text-center lg:text-left">
            <p className="text-sm font-extrabold uppercase tracking-widest text-primary">Kết quả xếp lớp</p>
            <h2 id="result-heading" className="mt-2 text-5xl font-black text-navy" aria-live="polite">{result.level}</h2>
            <p className="text-lg font-bold text-slate-700">{info.name}</p>
            <p className="mt-3 text-slate-600">{info.goal}</p>
            <p className="mt-4 text-sm font-semibold text-slate-500">Đúng {result.correct}/{result.total} câu</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button asChild><Link to={`/learning-paths#${result.level.toLowerCase()}`}>Xem lộ trình {result.level} <ArrowRight aria-hidden /></Link></Button>
              <Button variant="outline" onClick={start}><RotateCcw aria-hidden /> Làm lại</Button>
            </div>
          </div>
          <div>
            <h3 className="mb-3 font-bold">Kết quả theo cấp độ</h3>
            <ul className="space-y-3">
              {CEFR_ORDER.map((lv) => {
                const { correct, total } = result.byLevel[lv];
                return (
                  <li key={lv} className="grid grid-cols-[2.5rem_1fr_3rem] items-center gap-3 text-sm">
                    <span className={cn("font-black", lv === result.level ? "text-primary" : "text-slate-500")}>{lv}</span>
                    <Progress value={(correct / total) * 100} label={`${lv}: đúng ${correct}/${total}`} />
                    <span className="text-right font-semibold text-slate-600">{correct}/{total}</span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-xs text-slate-500">Mỗi cấp cần đúng ít nhất 2/3 câu. Đây là bài test rút gọn để gợi ý lộ trình, không thay thế chứng chỉ chính thức.</p>
          </div>
        </section>

        <section aria-labelledby="recommend-heading">
          <h2 id="recommend-heading" className="mb-6 text-2xl font-black">Khóa học phù hợp với bạn</h2>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommendCourses(result.level).map((c) => <li key={c.slug} className="flex"><CourseCard course={c} /></li>)}
          </ul>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 flex items-center justify-between text-sm font-bold text-slate-600">
        <span>Câu {index + 1}/{placementQuestions.length}</span>
        <span className="rounded-full bg-primary-soft px-3 py-1 text-primary">{skillLabel[q.skill]}</span>
      </div>
      <Progress value={(index / placementQuestions.length) * 100} label="Tiến độ bài test" className="mb-6" />

      <fieldset key={q.id} className="duo-card p-5 sm:p-7">
        <legend className="sr-only">Câu {index + 1}</legend>
        {q.passage && <p className="mb-4 rounded-2xl bg-surface p-4 font-body text-[15px] leading-relaxed text-slate-700">{q.passage}</p>}
        <p className="mb-5 text-lg font-bold text-navy">{q.question}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {q.options.map((opt, oi) => {
            const chosen = answers[q.id] === oi;
            return (
              <label
                key={opt}
                className={cn(
                  "lumi-answer flex cursor-pointer items-center gap-3 rounded-2xl border-2 px-4 py-3.5 font-semibold transition-colors",
                  chosen ? "border-primary bg-primary-soft text-primary" : "border-slate-200 bg-white hover:border-primary/50",
                )}
              >
                <input type="radio" name={q.id} className="accent-primary" checked={chosen} onChange={() => setAnswers((a) => ({ ...a, [q.id]: oi }))} />
                {opt}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 flex items-center justify-between gap-3">
        <Button variant="outline" onClick={() => setIndex((i) => i - 1)} disabled={index === 0}><ArrowLeft aria-hidden /> Câu trước</Button>
        <Button onClick={next} disabled={answers[q.id] === undefined}>{isLast ? "Xem kết quả" : "Câu tiếp"} <ArrowRight aria-hidden /></Button>
      </div>
    </div>
  );
}
