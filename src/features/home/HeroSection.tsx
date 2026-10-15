import { Link } from "react-router";
import { Check, PlayCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { LumiCharacter } from "@/components/shared/LumiCharacter";

const benefits = [
  { text: "Lộ trình cá nhân hóa theo chuẩn CEFR", color: "bg-leaf text-navy" },
  { text: "Giảng viên IELTS 8.0+ và bản ngữ", color: "bg-sky text-navy" },
  { text: "Luyện tập 4 kỹ năng mỗi ngày", color: "bg-sun text-navy" },
];

export function HeroSection() {
  return (
    <section data-no-reveal aria-labelledby="hero-heading" className="hero-bg relative overflow-hidden">
      {/* Hình trang trí bay lơ lửng */}
      <div aria-hidden className="pointer-events-none absolute left-[4%] top-16 hidden size-14 rotate-12 rounded-2xl bg-coral shadow-[0_6px_0_var(--color-coral-shade)] float-y lg:block" />
      <div aria-hidden className="pointer-events-none absolute right-[6%] top-10 hidden size-10 rounded-full bg-sun shadow-[0_5px_0_var(--color-sun-shade)] float-y-slow md:block" />
      <div aria-hidden className="pointer-events-none absolute bottom-16 left-[46%] hidden size-8 -rotate-12 rounded-xl bg-leaf shadow-[0_5px_0_var(--color-leaf-shade)] float-y lg:block" />
      <Container className="relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-20">
        <div className="hero-copy min-w-0">
          <h1 id="hero-heading" className="text-4xl font-black leading-[1.12] tracking-tight text-navy sm:text-5xl lg:text-[3.6rem]">
            Chinh phục tiếng Anh <span className="relative inline-block bg-gradient-to-r from-coral via-grape to-primary bg-clip-text text-transparent">tự tin<Sparkles aria-hidden className="absolute -right-6 -top-3 size-6 text-sun float-y" /></span> cùng giảng viên chuyên môn
          </h1>
          <p className="mt-5 max-w-xl text-lg font-medium text-slate-600">
            Học IELTS, TOEIC, giao tiếp và tiếng Anh thương mại trực tuyến – bài giảng video, bài tập tương tác và phản hồi từ giảng viên.
          </p>
          <ul className="mt-6 space-y-3">
            {benefits.map((b) => (
              <li key={b.text} className="flex items-center gap-3 font-semibold text-slate-700">
                <span className={`flex size-6 shrink-0 items-center justify-center rounded-full ${b.color}`}><Check className="size-4" strokeWidth={3.5} aria-hidden /></span> {b.text}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" variant="success">
              <Link to="/learning/ielts-overview">
                <PlayCircle aria-hidden /> Học thử miễn phí
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/courses">Khám phá khóa học</Link>
            </Button>
          </div>
        </div>

        {/* Minh họa giao diện học */}
        <div className="hero-visual relative mx-auto mb-6 w-full max-w-lg lg:mb-0">
          <div className="relative overflow-hidden rounded-[28px] border-4 border-white bg-gradient-to-br from-primary to-grape p-5 shadow-[0_10px_0_var(--color-primary-shade),0_30px_60px_rgb(59_91_253/0.3)]">
            <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-primary-soft">
              <img src="/images/academy-learning-hero.webp" alt="" width={1536} height={1024} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
              <Link to="/#academy-story" aria-label="Xem video giới thiệu English Academy" className="relative flex size-16 items-center justify-center rounded-full bg-white text-primary shadow-[0_5px_0_rgb(15_23_42/0.25)] transition-transform hover:scale-110">
                <PlayCircle className="size-9" aria-hidden />
              </Link>
            </div>
            <div className="mt-4 flex items-center justify-between text-white">
              <div>
                <p className="text-sm font-extrabold">Khám phá English Academy</p>
                <p className="text-xs font-medium text-indigo-100">Video giới thiệu · 18 giây</p>
              </div>
              <span className="rounded-full bg-sun px-3 py-1 text-xs font-extrabold text-navy">Bắt đầu</span>
            </div>
            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/20">
              <div className="h-full w-2/3 rounded-full bg-leaf" />
            </div>
          </div>
          <div aria-hidden className="pointer-events-none absolute -bottom-10 -left-8 hidden size-32 sm:block lg:-left-16 lg:size-36">
            <LumiCharacter />
          </div>
        </div>
      </Container>
      <Container className="relative pb-8">
        <Link to="/#academy-story" className="group inline-flex items-center gap-2 text-sm font-extrabold text-primary hover:underline"><PlayCircle className="icon-pop size-5" aria-hidden /> Xem video giới thiệu cách học <span aria-hidden>↓</span></Link>
      </Container>
    </section>
  );
}
