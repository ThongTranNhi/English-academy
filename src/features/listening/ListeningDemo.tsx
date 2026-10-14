import { getLesson } from "@/data/lessons";
import { TranscriptPanel } from "@/features/lessons/TranscriptPanel";
import { Quiz } from "@/components/shared/Quiz";

/** Bài nghe mẫu: transcript đọc bằng giọng trình duyệt + câu hỏi. */
export function ListeningDemo() {
  const lesson = getLesson("b1-podcast-habits");
  if (!lesson?.transcript) return null;
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <TranscriptPanel transcript={lesson.transcript} />
      {lesson.quiz && <Quiz id="listening-demo" questions={lesson.quiz} title={lesson.title} />}
    </div>
  );
}
