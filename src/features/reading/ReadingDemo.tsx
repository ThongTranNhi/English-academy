import { Quiz } from "@/components/shared/Quiz";
import type { QuizQuestion } from "@/types";

const passage = [
  "By 2050, nearly seven out of ten people will live in cities. To cope with this growth, many governments are investing in so-called smart cities, where technology is used to manage traffic, energy and public services.",
  "In Singapore, sensors on roads collect real-time data that help adjust traffic lights and reduce congestion. In Copenhagen, street lights dim automatically when no one is around, cutting energy use by up to 65 per cent.",
  "Critics, however, warn that collecting so much data raises serious privacy concerns. They argue that citizens should have a say in how information about their daily lives is stored and used.",
];

const questions: QuizQuestion[] = [
  { id: "r1", question: "Theo bài đọc, đến năm 2050 khoảng bao nhiêu người sẽ sống ở thành phố?", options: ["5/10", "7/10", "9/10"], answer: 1 },
  { id: "r2", question: "Đèn đường ở Copenhagen tiết kiệm tối đa bao nhiêu năng lượng?", options: ["50%", "65%", "70%"], answer: 1 },
  { id: "r3", question: "Mối lo ngại chính của những người phản đối là gì?", options: ["Chi phí", "Quyền riêng tư", "Ô nhiễm"], answer: 1, explanation: "Đoạn 3: “raises serious privacy concerns”." },
];

export function ReadingDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <article className="rounded-[14px] border border-slate-200 bg-white p-5 sm:p-6">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">B2 · 180 từ</p>
        <h3 className="mb-4 text-xl font-bold">Cities of the Future</h3>
        <div className="space-y-4 font-body text-[15px] leading-relaxed text-slate-700">
          {passage.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
        </div>
      </article>
      <Quiz id="reading-demo" questions={questions} title="Câu hỏi đọc hiểu" />
    </div>
  );
}
