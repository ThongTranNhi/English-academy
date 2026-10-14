import { useState } from "react";
import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import type { QuizQuestion } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useProgressStore } from "@/store/progressStore";
import { cueLumi } from "@/lib/lumi";

interface QuizProps {
  id: string;
  questions: QuizQuestion[];
  title?: string;
}

/** Bài trắc nghiệm tái sử dụng: chọn đáp án, nộp bài, xem giải thích. */
export function Quiz({ id, questions, title = "Bài tập nhanh" }: QuizProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const saveQuizScore = useProgressStore((s) => s.saveQuizScore);

  const correct = questions.filter((q) => answers[q.id] === q.answer).length;
  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  const submit = () => {
    setSubmitted(true);
    saveQuizScore(id, Math.round((correct / questions.length) * 100));
    cueLumi(correct === questions.length ? "celebrate" : "encourage", correct === questions.length ? "Tuyệt vời! Bạn đã trả lời đúng tất cả!" : "Bạn đã hoàn thành bài! Cùng xem giải thích để học tiếp nhé.");
  };

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="rounded-[14px] border border-slate-200 bg-white p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        {submitted && (
          <p className="rounded-full bg-primary-soft px-3 py-1 text-sm font-semibold text-primary" role="status">
            Đúng {correct}/{questions.length} câu
          </p>
        )}
      </div>
      <ol className="space-y-6">
        {questions.map((q, qi) => (
          <li key={q.id}>
            <fieldset>
              <legend className="mb-3 font-medium">
                {qi + 1}. {q.question}
              </legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {q.options.map((opt, oi) => {
                  const chosen = answers[q.id] === oi;
                  const isRight = submitted && oi === q.answer;
                  const isWrong = submitted && chosen && oi !== q.answer;
                  return (
                    <label
                      key={opt}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors",
                        chosen && !submitted && "border-primary bg-primary-soft",
                        !chosen && !submitted && "border-slate-200 hover:border-primary/50",
                        isRight && "border-emerald-400 bg-emerald-50",
                        isWrong && "border-rose-400 bg-rose-50",
                        submitted && !isRight && !isWrong && "border-slate-200 opacity-70",
                        submitted && "cursor-default",
                      )}
                    >
                      <input
                        type="radio"
                        name={`${id}-${q.id}`}
                        className="accent-primary"
                        checked={chosen}
                        disabled={submitted}
                        onChange={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                      />
                      <span className="flex-1">{opt}</span>
                      {isRight && <CheckCircle2 className="size-4 text-emerald-600" aria-label="Đáp án đúng" />}
                      {isWrong && <XCircle className="size-4 text-rose-600" aria-label="Sai" />}
                    </label>
                  );
                })}
              </div>
              {submitted && q.explanation && <p className="mt-2 text-sm text-slate-600">💡 {q.explanation}</p>}
            </fieldset>
          </li>
        ))}
      </ol>
      <div className="mt-6 flex gap-3">
        {!submitted ? (
          <Button onClick={submit} disabled={!allAnswered}>
            Nộp bài
          </Button>
        ) : (
          <Button variant="outline" onClick={reset}>
            <RotateCcw aria-hidden /> Làm lại
          </Button>
        )}
      </div>
    </div>
  );
}
