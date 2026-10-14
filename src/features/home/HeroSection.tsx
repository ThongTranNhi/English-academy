import { Link } from "react-router";
import { CheckCircle2, Headphones, PlayCircle, Star, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";

const benefits = ["Lộ trình cá nhân hóa theo chuẩn CEFR", "Giảng viên IELTS 8.0+ và bản ngữ", "Luyện tập 4 kỹ năng mỗi ngày"];

export function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-gradient-to-b from-white to-surface">
      <div className="pointer-events-none absolute -right-40 -top-40 size-[520px] rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 size-[420px] rounded-full bg-accent/10 blur-3xl" />
      <Container className="relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-24">
        <div className="hero-copy min-w-0">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-sm font-medium text-primary">
            <Star className="size-4 fill-highlight text-highlight" aria-hidden /> Hơn 20.000 học viên đã tham gia
          </p>
          <h1 id="hero-heading" className="text-4xl font-extrabold leading-[1.15] tracking-tight text-navy sm:text-5xl lg:text-[3.5rem]">
            Chinh phục tiếng Anh <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">tự tin</span> cùng giảng viên chuyên môn
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-600">
            Học IELTS, TOEIC, giao tiếp và tiếng Anh thương mại trực tuyến – bài giảng video, bài tập tương tác và phản hồi từ giảng viên.
          </p>
          <ul className="mt-6 space-y-2.5">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-2.5 text-slate-700">
                <CheckCircle2 className="size-5 shrink-0 text-accent" aria-hidden /> {b}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
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
          <div className="relative overflow-hidden rounded-3xl bg-navy p-5 shadow-2xl shadow-primary/20">
            <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-primary-soft">
              <img src="/images/academy-learning-hero.webp" alt="" width={1536} height={1024} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
              <Link to="/#academy-story" aria-label="Xem video giới thiệu English Academy" className="relative flex size-16 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg transition-colors hover:bg-white">
                <PlayCircle className="size-9" aria-hidden />
              </Link>
            </div>
            <div className="mt-4 flex items-center justify-between text-white">
              <div>
                <p className="text-sm font-semibold">Khám phá English Academy</p>
                <p className="text-xs text-slate-400">Video giới thiệu · 18 giây</p>
              </div>
              <span className="rounded-full bg-accent/20 px-2.5 py-1 text-xs font-semibold text-accent">Bắt đầu</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-2/3 rounded-full bg-accent" />
            </div>
          </div>
          <div className="absolute -left-4 top-10 hidden rounded-2xl bg-white p-3 shadow-xl sm:flex sm:items-center sm:gap-3 lg:-left-10">
            <span className="flex size-10 items-center justify-center rounded-xl bg-highlight-soft text-highlight"><Trophy className="size-5" /></span>
            <div>
              <p className="text-xs text-slate-500">Band mục tiêu</p>
              <p className="font-bold">IELTS 7.0</p>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-2 hidden rounded-2xl bg-white p-3 shadow-xl sm:flex sm:items-center sm:gap-3 lg:-right-8">
            <span className="flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent"><Headphones className="size-5" /></span>
            <div>
              <p className="text-xs text-slate-500">Hôm nay</p>
              <p className="font-bold">12 từ mới · 2 bài nghe</p>
            </div>
          </div>
        </div>
      </Container>
      <Container className="relative pb-7">
        <Link to="/#academy-story" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"><PlayCircle className="size-5" aria-hidden /> Xem video giới thiệu cách học <span aria-hidden>↓</span></Link>
      </Container>
    </section>
  );
}
