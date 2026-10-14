import { useState } from "react";
import { Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpeakButton } from "@/components/shared/SpeakButton";

const shadowingLines = [
  "Could I get a large latte, please?",
  "Sure. Would you like it hot or iced?",
  "Hot, please. And can I pay by card?",
  "Of course. That'll be four fifty.",
];

const cueCards = [
  { topic: "Describe a place you would like to visit.", points: ["Where it is", "How you know about it", "What you would do there", "Why you want to go"] },
  { topic: "Describe a skill you learned recently.", points: ["What the skill is", "When you learned it", "How you learned it", "How useful it is"] },
  { topic: "Describe a person who inspires you.", points: ["Who this person is", "How you know them", "What they have done", "Why they inspire you"] },
];

export function SpeakingDemo() {
  const [card, setCard] = useState(0);
  const cue = cueCards[card];
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-[14px] border border-slate-200 bg-white p-5 sm:p-6">
        <h3 className="mb-1 text-lg font-semibold">Shadowing: Ordering Coffee</h3>
        <p className="mb-4 text-sm text-slate-600">Bấm loa để nghe, sau đó nhại lại đúng ngữ điệu và tốc độ.</p>
        <ol className="space-y-2">
          {shadowingLines.map((line, i) => (
            <li key={line} className="flex items-center gap-3 rounded-xl bg-surface px-3 py-2">
              <span className="text-xs font-bold text-slate-400">{i % 2 === 0 ? "A" : "B"}</span>
              <span className="flex-1 font-body text-sm">{line}</span>
              <SpeakButton text={line} />
            </li>
          ))}
        </ol>
      </div>
      <div className="rounded-[14px] border border-slate-200 bg-white p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold">IELTS Part 2 – Cue card</h3>
          <Button size="sm" variant="outline" onClick={() => setCard((c) => (c + 1) % cueCards.length)}>
            <Shuffle aria-hidden /> Đổi đề
          </Button>
        </div>
        <p className="font-body text-lg font-semibold text-navy" aria-live="polite">{cue.topic}</p>
        <p className="mt-3 text-sm text-slate-600">You should say:</p>
        <ul className="mt-2 list-inside list-disc space-y-1 font-body text-sm text-slate-700">
          {cue.points.map((p) => <li key={p}>{p}</li>)}
        </ul>
        <p className="mt-5 rounded-xl bg-highlight-soft p-3 text-sm text-amber-800">Chuẩn bị 1 phút, nói liên tục 1–2 phút. Hãy tự ghi âm bằng điện thoại để nghe lại.</p>
      </div>
    </div>
  );
}
