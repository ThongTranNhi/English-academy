import { useEffect, useState } from "react";
import { Timer } from "lucide-react";
import { Textarea, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const checklist = [
  "Mở bài nêu rõ quan điểm",
  "Mỗi đoạn thân bài có 1 ý chính + ví dụ",
  "Dùng từ nối đa dạng",
  "Kết bài tóm tắt lại quan điểm",
  "Đã soát lỗi chính tả, ngữ pháp",
];

/** Khung luyện viết: đếm từ, bấm giờ và checklist tự đánh giá. Nội dung chỉ ở trên trình duyệt. */
export function WritingEditor({ prompt, minWords = 250, minutes = 40 }: { prompt: string; minWords?: number; minutes?: number }) {
  const [text, setText] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const [running, setRunning] = useState(false);
  const [checked, setChecked] = useState<string[]>([]);

  useEffect(() => {
    if (!running || secondsLeft <= 0) return;
    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [running, secondsLeft]);

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <div className="rounded-[14px] border border-slate-200 bg-white p-5 sm:p-6">
        <p className="mb-4 rounded-xl bg-primary-soft p-4 font-body text-sm text-navy">{prompt}</p>
        <Label htmlFor="essay" className="sr-only">Bài viết của bạn</Label>
        <Textarea id="essay" value={text} onChange={(e) => setText(e.target.value)} placeholder="Bắt đầu viết bài tại đây…" className="min-h-72 font-body" />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className={words >= minWords ? "font-semibold text-emerald-600" : "text-slate-600"} aria-live="polite">
            {words} / {minWords} từ
          </span>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-semibold tabular-nums" aria-live="off">
              <Timer className="size-4" aria-hidden /> {mm}:{ss}
            </span>
            <Button size="sm" variant="outline" onClick={() => setRunning((r) => !r)} disabled={secondsLeft <= 0}>
              {running ? "Tạm dừng" : "Bấm giờ"}
            </Button>
          </div>
        </div>
      </div>
      <aside className="rounded-[14px] border border-slate-200 bg-white p-5">
        <h3 className="mb-3 font-semibold">Tự kiểm tra</h3>
        <ul className="space-y-2">
          {checklist.map((item) => (
            <li key={item}>
              <label className="flex cursor-pointer items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  className="mt-0.5 accent-primary"
                  checked={checked.includes(item)}
                  onChange={(e) => setChecked((c) => (e.target.checked ? [...c, item] : c.filter((x) => x !== item)))}
                />
                {item}
              </label>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-slate-500">Bài viết chỉ lưu tạm trên trình duyệt. Tính năng giảng viên chấm bài sẽ có khi kết nối backend.</p>
      </aside>
    </div>
  );
}
