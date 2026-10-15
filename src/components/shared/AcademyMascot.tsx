import { useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { ArrowRight, Pause, Play, X } from "lucide-react";
import { useLumiReaction } from "@/hooks/useLumiReaction";
import { LumiCharacter } from "./LumiCharacter";

export function AcademyMascot() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [motion, setMotion] = useState(true);
  const trigger = useRef<HTMLButtonElement>(null);
  const { reaction, react } = useLumiReaction();
  const { pathname } = useLocation();
  const learning = pathname.startsWith("/learning/") || pathname === "/practice";
  function closePanel() {
    setOpen(false);
    trigger.current?.focus();
  }

  if (hidden) {
    return <button type="button" onClick={() => setHidden(false)} className="fixed bottom-4 right-4 z-40 rounded-full border border-indigo-100 bg-white px-3 py-2 text-xs font-semibold text-primary shadow-md">Hiện Lumi</button>;
  }

  return (
    <aside aria-label="Lumi, bạn đồng hành học tiếng Anh" onKeyDown={(event) => { if (event.key === "Escape" && open) { event.stopPropagation(); closePanel(); } }} className="mascot-dock fixed bottom-4 right-4 z-40 flex flex-col items-end sm:bottom-5 sm:right-6">
      {open && (
        <div id="lumi-panel" className="mascot-panel mb-2 w-[min(300px,calc(100vw-32px))] rounded-3xl border-2 border-[#c9d3ff] bg-white p-5 shadow-[0_6px_0_#c9d3ff,0_24px_40px_rgb(30_27_75/0.15)]">
          <div className="flex items-start justify-between gap-3">
            <div><p className="text-xs font-bold uppercase tracking-widest text-primary">Lumi · Bạn đồng hành</p><h2 className="mt-2 text-lg font-bold">{learning ? "Cùng học từng bước nhé!" : "Hôm nay mình học gì?"}</h2></div>
            <button type="button" onClick={closePanel} aria-label="Đóng gợi ý của Lumi" className="flex size-9 shrink-0 items-center justify-center rounded-xl hover:bg-slate-100"><X className="size-4" aria-hidden /></button>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">Mình giúp bạn tìm khu vực học phù hợp. Chọn một điểm bắt đầu nhé.</p>
          <div className="mt-4 space-y-2">
            {[
              { href: "/learning-paths", label: "Tìm lộ trình phù hợp" },
              { href: "/learning/ielts-overview", label: "Học thử một bài" },
              { href: "/vocabulary", label: "Ôn từ vựng với flashcard" },
            ].map(({ href, label }) => <Link key={href} to={href} onClick={() => setOpen(false)} className="flex items-center justify-between gap-2 rounded-xl bg-primary-soft px-3 py-3 text-sm font-semibold text-primary transition-colors hover:bg-indigo-100">{label}<ArrowRight className="size-4 shrink-0" aria-hidden /></Link>)}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
            <button type="button" onClick={() => setMotion((value) => !value)} aria-pressed={!motion} className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-primary">{motion ? <Pause className="size-3.5" aria-hidden /> : <Play className="size-3.5" aria-hidden />}{motion ? "Dừng chuyển động" : "Bật chuyển động"}</button>
            <button type="button" onClick={() => { setHidden(true); setOpen(false); }} className="rounded-lg px-2 py-1 text-xs text-slate-600 hover:bg-slate-100">Ẩn Lumi</button>
          </div>
        </div>
      )}
      {!open && reaction.message && <p className="mb-2 max-w-[230px] rounded-2xl border-2 border-[#c9d3ff] bg-white px-4 py-3 text-sm font-extrabold text-primary shadow-[0_4px_0_#c9d3ff]">{reaction.message}</p>}
      <button ref={trigger} type="button" onPointerEnter={(event) => { if (event.pointerType === "mouse" && !open) react("curious", "Chào bạn! Chạm Lumi để khám phá nhé!", true); }} onFocus={() => { if (!open) react("wave", "Chào bạn! Mình là Lumi.", true); }} onClick={() => { setOpen((value) => !value); react(open ? "wave" : "happy", "Cùng Lumi học nhé!"); }} aria-expanded={open} aria-controls="lumi-panel" aria-label={open ? "Đóng Lumi" : "Mở gợi ý học tập của Lumi"} className="mascot-button group relative flex size-20 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-sky-soft via-white to-sun-soft shadow-[0_6px_0_#c9d3ff,0_16px_30px_rgb(59_91_253/0.25)] sm:size-24">
        <LumiCharacter mood={reaction.mood} sequence={reaction.sequence} motion={motion} />
        <span className="absolute -bottom-2 rounded-full border-2 border-white bg-primary px-2.5 py-0.5 text-[10px] font-black tracking-wider text-white">LUMI</span>
      </button>
    </aside>
  );
}
