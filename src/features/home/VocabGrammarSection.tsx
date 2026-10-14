import { Link } from "react-router";
import { ArrowRight, BookText, Layers, ListChecks } from "lucide-react";
import { vocabTopics } from "@/data/vocabulary";
import { grammarLessons } from "@/data/grammar";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { SpeakButton } from "@/components/shared/SpeakButton";

export function VocabGrammarSection() {
  const sample = vocabTopics[0].words[0];
  return (
    <section aria-labelledby="vocab-heading" className="section-y bg-white">
      <Container>
        <SectionHeading id="vocab-heading" eyebrow="Từ vựng & ngữ pháp" title="Ghi nhớ lâu hơn với flashcard, quiz và bài thực hành" />
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Flashcard preview */}
          <div className="flex flex-col rounded-[16px] bg-gradient-to-br from-indigo-500 to-violet-600 p-6 text-white">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-100"><Layers className="size-4" aria-hidden /> Flashcard</p>
            <div className="mt-5 flex-1 rounded-2xl bg-white p-6 text-navy shadow-xl">
              <div className="flex items-start justify-between">
                <Badge>{vocabTopics[0].title}</Badge>
                <SpeakButton text={sample.word} />
              </div>
              <p className="mt-4 text-3xl font-bold">{sample.word}</p>
              <p className="font-body text-slate-500">{sample.phonetic} · {sample.partOfSpeech}</p>
              <p className="mt-4 border-t border-slate-100 pt-4 font-semibold text-primary">{sample.meaning}</p>
            </div>
            <Link to="/vocabulary#flashcard" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold hover:underline">Học flashcard <ArrowRight className="size-4" aria-hidden /></Link>
          </div>

          {/* Topics + quiz */}
          <div className="flex flex-col rounded-[16px] border border-slate-200 p-6">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-primary"><ListChecks className="size-4" aria-hidden /> Từ vựng theo chủ đề</p>
            <ul className="mt-5 grid flex-1 grid-cols-2 gap-2">
              {vocabTopics.map((t) => (
                <li key={t.slug}>
                  <Link to={`/vocabulary?topic=${t.slug}#flashcard`} className="flex h-full flex-col rounded-xl bg-surface p-3 hover:bg-primary-soft">
                    <span className="text-sm font-semibold">{t.title}</span>
                    <span className="text-xs text-slate-500">{t.words.length} từ · {t.level}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/vocabulary#quiz" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Làm quiz từ vựng <ArrowRight className="size-4" aria-hidden /></Link>
          </div>

          {/* Grammar */}
          <div className="flex flex-col rounded-[16px] border border-slate-200 p-6">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-primary"><BookText className="size-4" aria-hidden /> Ngữ pháp</p>
            <ul className="mt-5 flex-1 divide-y divide-slate-100">
              {grammarLessons.slice(0, 5).map((g) => (
                <li key={g.slug}>
                  <Link to={`/grammar#${g.slug}`} className="flex items-center justify-between gap-3 py-2.5 text-sm hover:text-primary">
                    <span className="font-medium">{g.title}</span>
                    <Badge variant="outline">{g.level}</Badge>
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/grammar" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Tất cả bài ngữ pháp <ArrowRight className="size-4" aria-hidden /></Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
