import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { vocabTopics } from "@/data/vocabulary";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/shared/Container";
import { Quiz } from "@/components/shared/Quiz";
import { SpeakButton } from "@/components/shared/SpeakButton";
import { Badge } from "@/components/ui/badge";
import { Flashcards } from "@/features/vocabulary/Flashcards";
import { VocabReview } from "@/features/vocabulary/VocabReview";
import { buildVocabQuiz } from "@/features/vocabulary/buildVocabQuiz";
import { getIcon } from "@/lib/icons";
import { toneStyles } from "@/lib/tone";
import { cn } from "@/lib/utils";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useProgressStore } from "@/store/progressStore";

/** Toàn bộ từ của mọi chủ đề, dùng cho phiên ôn lặp lại ngắt quãng. */
const allWords = Array.from(new Map(vocabTopics.flatMap((t) => t.words).map((w) => [w.word, w])).values());

export default function VocabularyPage() {
  const [params, setParams] = useSearchParams();
  const topic = vocabTopics.find((t) => t.slug === params.get("topic")) ?? vocabTopics[0];
  const learnedWords = useProgressStore((s) => s.learnedWords);
  const quiz = useMemo(() => buildVocabQuiz(topic.words), [topic]);
  usePageMeta("Từ vựng theo chủ đề", "Học từ vựng tiếng Anh theo chủ đề với flashcard, phát âm và quiz kiểm tra.");

  const selectTopic = (slug: string) => setParams({ topic: slug }, { replace: true, preventScrollReset: true });

  return (
    <>
      <PageHeader title="Từ vựng" description="Học từ theo chủ đề, lật flashcard để ghi nhớ và làm quiz để kiểm tra." breadcrumbs={[{ label: "Từ vựng" }]} />
      <Container className="section-y space-y-16">
        <section id="topics" aria-labelledby="topics-heading" className="scroll-mt-28">
          <h2 id="topics-heading" className="mb-6 text-2xl font-bold">Chủ đề</h2>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {vocabTopics.map((t) => {
              const Icon = getIcon(t.icon);
              const active = t.slug === topic.slug;
              const learned = t.words.filter((w) => learnedWords.includes(w.word)).length;
              return (
                <li key={t.slug}>
                  <button
                    type="button"
                    onClick={() => selectTopic(t.slug)}
                    aria-pressed={active}
                    className={cn("flex w-full flex-col items-start rounded-[14px] border p-4 text-left transition-all", active ? "border-primary bg-primary-soft ring-2 ring-primary/20" : "border-slate-200 bg-white hover:border-primary/40")}
                  >
                    <span className={cn("mb-3 flex size-10 items-center justify-center rounded-xl", toneStyles[t.tone].soft, toneStyles[t.tone].text)}><Icon className="size-5" aria-hidden /></span>
                    <span className="font-semibold">{t.title}</span>
                    <span className="text-xs text-slate-500">{learned}/{t.words.length} từ · {t.level}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section id="review" aria-labelledby="review-heading" className="scroll-mt-28">
          <h2 id="review-heading" className="mb-6 text-2xl font-bold">Ôn tập hôm nay</h2>
          <VocabReview words={allWords} />
        </section>

        <section id="flashcard" aria-labelledby="flashcard-heading" className="scroll-mt-28">
          <h2 id="flashcard-heading" className="mb-6 text-2xl font-bold">Flashcard: {topic.title}</h2>
          <Flashcards key={topic.slug} words={topic.words} />
        </section>

        <section aria-labelledby="wordlist-heading">
          <h2 id="wordlist-heading" className="mb-6 text-2xl font-bold">Danh sách từ</h2>
          <div className="overflow-x-auto rounded-[14px] border border-slate-200 bg-white">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-surface text-xs uppercase tracking-wider text-slate-500">
                <tr><th scope="col" className="px-4 py-3">Từ</th><th scope="col" className="px-4 py-3">Nghĩa</th><th scope="col" className="px-4 py-3">Ví dụ</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topic.words.map((w) => (
                  <tr key={w.word}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <SpeakButton text={w.word} />
                        <span className="font-semibold">{w.word}</span>
                        <span className="ml-1 font-body text-xs text-slate-400">{w.phonetic}</span>
                        {learnedWords.includes(w.word) && <Badge variant="success" className="ml-2">Đã thuộc</Badge>}
                      </div>
                    </td>
                    <td className="px-4 py-3">{w.meaning}</td>
                    <td className="px-4 py-3 font-body italic text-slate-600">{w.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="quiz" aria-labelledby="quiz-heading" className="scroll-mt-28">
          <h2 id="quiz-heading" className="mb-6 text-2xl font-bold">Quiz: {topic.title}</h2>
          <Quiz key={topic.slug} id={`vocab-${topic.slug}`} questions={quiz} title="Chọn nghĩa đúng" />
        </section>
      </Container>
    </>
  );
}
