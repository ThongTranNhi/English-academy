import { Link } from "react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";

const steps = [
  { title: "Chọn mục tiêu", detail: "Tìm khóa học và cấp độ phù hợp với điều bạn muốn đạt được.", color: "bg-coral text-navy shadow-[0_4px_0_var(--color-coral-shade)]" },
  { title: "Học qua từng bài ngắn", detail: "Kết hợp nội dung bài học, transcript và từ vựng theo chủ đề.", color: "bg-sun text-navy shadow-[0_4px_0_var(--color-sun-shade)]" },
  { title: "Thực hành để ghi nhớ", detail: "Ôn flashcard, làm quiz và luyện nghe, nói, đọc, viết.", color: "bg-leaf text-navy shadow-[0_4px_0_var(--color-leaf-shade)]" },
];

export function AcademyStorySection() {
  return (
    <section id="academy-story" aria-labelledby="story-heading" className="section-y academy-story relative overflow-hidden">
      <Container className="relative grid items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        <div className="min-w-0 -rotate-1 rounded-[28px] border-4 border-white bg-white p-3 shadow-[0_10px_0_#c9d3ff,0_30px_50px_rgb(59_91_253/0.18)] transition-transform duration-500 hover:rotate-0 sm:p-4">
          <video controls playsInline preload="none" poster="/images/academy-video-poster.jpg" aria-label="Video giới thiệu cách học tại English Academy, 18 giây, không có âm thanh" className="aspect-video w-full rounded-2xl bg-navy">
            <source src="/videos/academy-intro.mp4" type="video/mp4" />
            <track default kind="captions" src="/videos/academy-intro.vi.vtt" srcLang="vi" label="Tiếng Việt" />
            Trình duyệt của bạn không hỗ trợ video.
          </video>
          <div className="flex flex-wrap items-center justify-between gap-2 px-2 pb-1 pt-4">
            <p className="text-sm font-extrabold">Một hành trình, nhiều cách học</p>
            <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">Video giới thiệu · 18 giây · Không âm thanh</span>
          </div>
          <a href="/videos/academy-intro.mp4" download className="mt-2 inline-block px-2 text-xs font-medium text-primary hover:underline">Tải video giới thiệu (MP4 · 1,3 MB)</a>
          <details className="mt-3 border-t border-slate-100 px-2 pt-3 text-sm text-slate-600">
            <summary className="cursor-pointer font-medium text-primary">Nội dung video bằng văn bản</summary>
            <p className="mt-2 leading-relaxed">Bắt đầu hành trình tiếng Anh: chọn mục tiêu và lộ trình CEFR, học từng bài ngắn, rồi ôn flashcard, làm quiz và luyện bốn kỹ năng. Khám phá khóa học tại English Academy.</p>
          </details>
        </div>
        <div>
          <p className="inline-block rounded-full bg-primary-soft px-3.5 py-1 text-xs font-extrabold uppercase tracking-[0.18em] text-primary">Cách học tại Academy</p>
          <h2 id="story-heading" className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Từ bài học đầu tiên<br /><span className="bg-gradient-to-r from-primary to-grape bg-clip-text text-transparent">đến thói quen mỗi ngày.</span></h2>
          <ol className="mt-7 space-y-5">
            {steps.map((step, index) => (
              <li key={step.title} className="group flex gap-4">
                <span className={`icon-pop flex size-11 shrink-0 items-center justify-center rounded-2xl text-base font-black ${step.color}`}>0{index + 1}</span>
                <div><h3 className="text-lg font-extrabold">{step.title}</h3><p className="mt-1 text-sm leading-relaxed text-slate-600">{step.detail}</p></div>
              </li>
            ))}
          </ol>
          <p className="mt-6 flex items-center gap-2 text-sm text-slate-600"><CheckCircle2 className="size-4 shrink-0 text-leaf-ink" aria-hidden /> Bắt đầu với bài học và tài nguyên miễn phí.</p>
          <Button asChild size="lg" className="mt-6"><Link to="/library">Khám phá thư viện <ArrowRight aria-hidden /></Link></Button>
        </div>
      </Container>
    </section>
  );
}
