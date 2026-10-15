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
          <div className="flex flex-col rounded-[24px] bg-gradient-to-br from-primary to-grape p-6 text-white shadow-[0_8px_0_var(--color-grape-shade)]">
            <p className="inline-flex items-center gap-2 text-sm font-extrabold text-white"><Layers className="size-4" aria-hidden /> Flashcard</p>
            <div className="mt-5 flex-1 -rotate-2 rounded-2xl bg-white p-6 text-navy shadow-[0_6px_0_rgb(15_23_42/0.2)] transition-transform duration-300 hover:rotate-0 hover:scale-[1.02]">
              <div className="flex items-start justify-between">
                <Badge>{vocabTopics[0].title}</Badge>
                <SpeakButton text={sample.word} />
              </div>
              <p className="mt-4 text-3xl font-black">{sample.word}</p>
              <p className="font-body text-slate-500">{sample.phonetic} · {sample.partOfSpeech}</p>
              <p className="mt-4 border-t-2 border-slate-100 pt-4 font-extrabold text-primary">{sample.meaning}</p>
            </div>
            <Link to="/vocabulary#flashcard" className="mt-5 inline-flex items-center gap-1 text-sm font-extrabold hover:underline">Học flashcard <ArrowRight className="size-4" aria-hidden /></Link>
          </div>

          {/* Topics + quiz */}
          <div className="duo-card flex flex-col p-6">
            <p className="inline-flex items-center gap-2 text-sm font-extrabold text-leaf-ink"><ListChecks className="size-4" aria-hidden /> Từ vựng theo chủ đề</p>
            <ul className="mt-5 grid flex-1 grid-cols-2 gap-2">
              {vocabTopics.slice(0, 6).map((t) => (
                <li key={t.slug}>
                  <Link to={`/vocabulary?topic=${t.slug}#flashcard`} className="flex h-full flex-col rounded-2xl border-2 border-leaf/30 bg-leaf-soft p-3 transition-transform hover:-translate-y-0.5 hover:border-leaf">
                    <span className="text-sm font-extrabold">{t.title}</span>
                    <span className="text-xs font-semibold text-slate-600">{t.words.length} từ · {t.level}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/vocabulary#quiz" className="mt-5 inline-flex items-center gap-1 text-sm font-extrabold text-leaf-ink hover:underline">Làm quiz từ vựng <ArrowRight className="size-4" aria-hidden /></Link>
          </div>

          {/* Grammar */}
          <div className="duo-card flex flex-col p-6">
            <p className="inline-flex items-center gap-2 text-sm font-extrabold text-coral-ink"><BookText className="size-4" aria-hidden /> Ngữ pháp</p>
            <ul className="mt-5 flex-1 divide-y divide-slate-100">
              {grammarLessons.slice(0, 5).map((g) => (
                <li key={g.slug}>
                  <Link to={`/grammar#${g.slug}`} className="flex items-center justify-between gap-3 rounded-xl px-2 py-2.5 text-sm transition-colors hover:bg-coral-soft hover:text-coral-ink">
                    <span className="font-bold">{g.title}</span>
                    <Badge variant="outline">{g.level}</Badge>
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/grammar" className="mt-5 inline-flex items-center gap-1 text-sm font-extrabold text-coral-ink hover:underline">Tất cả bài ngữ pháp <ArrowRight className="size-4" aria-hidden /></Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
