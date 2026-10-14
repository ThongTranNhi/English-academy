import { SkillPractice } from "@/features/practice/SkillPractice";
import { ListeningDemo } from "@/features/listening/ListeningDemo";
import { SpeakingDemo } from "@/features/speaking/SpeakingDemo";
import { ReadingDemo } from "@/features/reading/ReadingDemo";
import { WritingEditor } from "@/features/writing/WritingEditor";

export function ListeningPage() {
  return <SkillPractice skill="listening" demoTitle="Bài nghe mẫu có transcript" demo={<ListeningDemo />} />;
}

export function SpeakingPage() {
  return <SkillPractice skill="speaking" demoTitle="Luyện nói ngay" demo={<SpeakingDemo />} />;
}

export function ReadingPage() {
  return <SkillPractice skill="reading" demoTitle="Bài đọc mẫu" demo={<ReadingDemo />} />;
}

export function WritingPage() {
  return (
    <SkillPractice
      skill="writing"
      demoTitle="Luyện viết IELTS Task 2"
      demo={
        <WritingEditor prompt="Some people believe that online learning is as effective as studying in a classroom. To what extent do you agree or disagree? Write at least 250 words." />
      }
    />
  );
}
