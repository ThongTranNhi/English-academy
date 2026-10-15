import { Link } from "react-router";
import { Brain, Flame, Target, Trophy } from "lucide-react";
import { vocabTopics } from "@/data/vocabulary";
import { Progress } from "@/components/ui/progress";
import { useProgressStore } from "@/store/progressStore";
import { isDue } from "@/features/vocabulary/srs";
import { cn } from "@/lib/utils";
import { currentStreak, DAILY_GOAL_OPTIONS, dateKey, lastDays } from "./streak";

const weekday = (key: string) => ["CN", "T2", "T3", "T4", "T5", "T6", "T7"][new Date(`${key}T00:00:00`).getDay()];
const totalWords = new Set(vocabTopics.flatMap((t) => t.words.map((w) => w.word)));

/** Chuỗi ngày học, mục tiêu XP hôm nay, biểu đồ 7 ngày, từ cần ôn và kết quả xếp lớp. */
export function DailyProgress() {
  const { activity, dailyGoal, setDailyGoal, srs, placement } = useProgressStore();
  const today = dateKey();
  const todayXp = activity[today] ?? 0;
  const streak = currentStreak(activity, today);
  const week = lastDays(activity, today, 7);
  const maxXp = Math.max(dailyGoal, ...week.map((d) => d.xp));
  const due = Object.entries(srs).filter(([word, card]) => totalWords.has(word) && isDue(card, today)).length;
  const goalMet = todayXp >= dailyGoal;

  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_1.4fr_1fr]">
      <section aria-labelledby="goal-heading" className="duo-card p-5">
        <div className="flex items-center gap-3">
          <span className={cn("flex size-12 items-center justify-center rounded-2xl", streak > 0 ? "bg-sun-soft text-tangerine" : "bg-slate-100 text-slate-400")}>
            <Flame className="size-7" aria-hidden />
          </span>
          <div>
            <p className="text-2xl font-black">{streak} ngày</p>
            <p className="text-sm text-slate-600">Chuỗi ngày học liên tiếp</p>
          </div>
        </div>
        <h2 id="goal-heading" className="mt-5 flex items-center justify-between text-sm font-bold">
          <span className="inline-flex items-center gap-1.5"><Target className="size-4 text-primary" aria-hidden /> Mục tiêu hôm nay</span>
          <span className={goalMet ? "text-leaf-ink" : "text-slate-600"}>{todayXp}/{dailyGoal} XP</span>
        </h2>
        <Progress value={(todayXp / dailyGoal) * 100} label="Tiến độ mục tiêu hôm nay" className="mt-2" />
        <p className="mt-2 text-xs text-slate-500">{goalMet ? "Đã đạt mục tiêu! Giữ lửa cho ngày mai nhé 🔥" : "Hoàn thành bài học (+20), quiz (+10) hoặc ôn từ (+2) để tích XP."}</p>
        <fieldset className="mt-4">
          <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Đổi mục tiêu</legend>
          <div className="flex flex-wrap gap-2">
            {DAILY_GOAL_OPTIONS.map((xp) => (
              <button
                key={xp}
                type="button"
                aria-pressed={dailyGoal === xp}
                onClick={() => setDailyGoal(xp)}
                className={cn("rounded-full border-2 px-3 py-1 text-xs font-bold", dailyGoal === xp ? "border-primary bg-primary-soft text-primary" : "border-slate-200 text-slate-600 hover:border-primary/40")}
              >
                {xp} XP
              </button>
            ))}
          </div>
        </fieldset>
      </section>

      <section aria-labelledby="week-heading" className="duo-card p-5">
        <h2 id="week-heading" className="font-bold">XP 7 ngày qua</h2>
        <ol className="mt-4 flex h-36 items-end justify-between gap-2">
          {week.map((d) => (
            <li key={d.date} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
              <span className="text-[11px] font-bold text-slate-500">{d.xp > 0 ? d.xp : ""}</span>
              <span
                className={cn("w-full max-w-9 rounded-t-lg", d.xp >= dailyGoal ? "bg-leaf" : d.xp > 0 ? "bg-primary" : "bg-slate-100")}
                style={{ height: `${Math.max(6, (d.xp / maxXp) * 100)}%` }}
                aria-hidden
              />
              <span className={cn("text-xs font-bold", d.date === today ? "text-primary" : "text-slate-500")}>{weekday(d.date)}</span>
              <span className="sr-only">{d.date}: {d.xp} XP</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid gap-4">
        <Link to="/vocabulary#review" className="duo-card flex items-center gap-3 p-5 transition-colors hover:border-grape/40">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-grape-soft text-grape-ink"><Brain className="size-6" aria-hidden /></span>
          <span>
            <span className="block text-lg font-black">{due} từ cần ôn</span>
            <span className="text-sm text-slate-600">Mở phiên ôn tập hôm nay →</span>
          </span>
        </Link>
        <Link to="/placement-test" className="duo-card flex items-center gap-3 p-5 transition-colors hover:border-primary/40">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-primary-soft text-primary"><Trophy className="size-6" aria-hidden /></span>
          <span>
            <span className="block text-lg font-black">{placement ? `Trình độ ${placement.level}` : "Chưa xếp lớp"}</span>
            <span className="text-sm text-slate-600">{placement ? `Đúng ${placement.correct}/${placement.total} · làm lại →` : "Làm test xếp lớp 8 phút →"}</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
