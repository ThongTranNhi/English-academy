import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { Cat, CheckCircle2, RotateCcw } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { LumiCharacter } from "@/components/shared/LumiCharacter";
import { useLumiReaction } from "@/hooks/useLumiReaction";
import { cueLumi } from "@/lib/lumi";

export function LumiChallengeSection() {
  const [answer, setAnswer] = useState<string | null>(null);
  const [motion, setMotion] = useState(true);
  const { reaction, react } = useLumiReaction(false);
  const stage = useRef<HTMLDivElement>(null);
  const correct = answer === "cat";

  useEffect(() => {
    if (!stage.current || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        react("wave", "Xin chào! Mình là Lumi.");
        observer.disconnect();
      }
    }, { threshold: 0.4 });
    observer.observe(stage.current);
    return () => observer.disconnect();
  }, [react]);

  function choose(value: string) {
    setAnswer(value);
    const mood = value === "cat" ? "celebrate" : "encourage";
    const message = value === "cat" ? "Đúng rồi! Cat là con mèo. Giỏi lắm!" : "Gần rồi! Con mèo là cat. Mình thử lại nhé!";
    react(mood, message);
    cueLumi(mood, message);
  }

  return (
    <section aria-labelledby="lumi-challenge-heading" className="section-y lumi-playground overflow-hidden">
      <Container className="grid items-center gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div ref={stage} className="relative flex min-h-72 flex-col items-center justify-center">
          <div className="lumi-speech relative mb-3 max-w-xs rounded-2xl border-2 border-[#c9d3ff] bg-white px-5 py-3 text-center text-sm font-extrabold text-primary shadow-[0_4px_0_#c9d3ff]">{reaction.message || "Chạm vào mình để chào nhé!"}</div>
          <button type="button" aria-label="Chào Lumi" onPointerEnter={(event) => { if (event.pointerType === "mouse") react("curious", "Bạn muốn học cùng mình không?", true); }} onClick={() => react("wave", "Xin chào! Cùng chơi một câu hỏi nhé!")} className="relative z-10 h-56 w-56 rounded-full sm:h-64 sm:w-64">
            <LumiCharacter mood={reaction.mood} sequence={reaction.sequence} motion={motion} />
          </button>
          <div aria-hidden className="lumi-shadow -mt-2 h-4 w-36 rounded-[100%] bg-primary/25 blur-sm" />
          <button type="button" aria-pressed={!motion} onClick={() => setMotion((value) => !value)} className="mt-3 rounded-full px-3 py-2 text-xs font-bold text-slate-600 hover:bg-white">{motion ? "Tắt chuyển động của Lumi" : "Bật chuyển động của Lumi"}</button>
        </div>
        <div className="rounded-[28px] border-2 border-[#c9d3ff] bg-white p-6 shadow-[0_8px_0_#c9d3ff] sm:p-8">
          <p className="inline-block rounded-full bg-coral-soft px-3 py-1 text-xs font-extrabold uppercase tracking-[0.15em] text-coral-ink">Chơi một chút, học một từ</p>
          <h2 id="lumi-challenge-heading" className="mt-3 text-2xl font-black sm:text-3xl">Một thử thách cùng Lumi!</h2>
          <p className="mt-3 text-slate-600">Con mèo trong tiếng Anh là gì?</p>
          <div className="mt-5 flex items-center gap-3 rounded-2xl border-2 border-sun bg-sun-soft p-4"><Cat className="wiggle-hover size-9 text-sun-ink" aria-hidden /><span className="font-extrabold text-sun-ink">Con mèo</span></div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {["dog", "cat", "fish"].map((value) => <button key={value} type="button" disabled={correct} onClick={() => choose(value)} className={`lumi-answer rounded-2xl border-2 px-3 py-4 text-lg font-black disabled:cursor-default ${answer === value ? value === "cat" ? "border-leaf bg-leaf-soft text-leaf-ink" : "border-coral bg-coral-soft text-coral-ink" : "border-slate-200 bg-white text-navy hover:border-primary hover:bg-primary-soft"}`}>{value}</button>)}
          </div>
          <p role="status" className={`mt-4 min-h-12 text-sm font-semibold ${correct ? "text-leaf-ink" : "text-slate-600"}`}>{answer ? correct ? "Đúng rồi! Cat là con mèo. Giỏi lắm!" : "Gần rồi! Con mèo là cat. Mình thử lại nhé!" : "Chọn một đáp án để xem Lumi phản ứng."}</p>
          <div className="mt-2 flex flex-wrap items-center gap-4">
            {correct && <><span className="inline-flex items-center gap-1.5 text-sm font-extrabold text-leaf-ink"><CheckCircle2 className="size-4" aria-hidden /> Đã học một từ mới</span><button type="button" onClick={() => { setAnswer(null); react("wave", "Cùng chơi lại nhé!"); }} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"><RotateCcw className="size-4" aria-hidden /> Chơi lại</button></>}
            <Link to="/vocabulary" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">Khám phá thêm từ vựng →</Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
