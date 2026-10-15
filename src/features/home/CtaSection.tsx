import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";

export function CtaSection() {
  return (
    <section aria-labelledby="cta-heading" className="pb-[72px] lg:pb-24">
      <Container>
        <div className="relative grid items-center gap-8 overflow-hidden rounded-[32px] bg-gradient-to-br from-primary via-[#5a3ff0] to-grape px-6 py-10 text-white shadow-[0_10px_0_var(--color-grape-shade)] sm:px-10 lg:grid-cols-[1fr_0.85fr] lg:py-14">
          <div className="pointer-events-none absolute -left-16 -top-16 size-64 rounded-full bg-sky/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-10 size-72 rounded-full bg-coral/35 blur-3xl" />
          <div className="relative">
            <h2 id="cta-heading" className="max-w-2xl text-3xl font-black tracking-tight sm:text-5xl">Sẵn sàng bắt đầu hành trình tiếng Anh?</h2>
            <p className="mt-4 max-w-xl text-lg font-medium text-white/90">Đăng ký tài khoản để nhận lộ trình gợi ý, hoặc khám phá các khóa học phù hợp với mục tiêu của bạn.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="accent"><Link to="/register">Đăng ký ngay</Link></Button>
              <Button asChild size="lg" variant="white"><Link to="/courses">Khám phá khóa học</Link></Button>
            </div>
          </div>
          <div className="relative rotate-2 rounded-3xl border-4 border-white/30 bg-white/15 p-2.5 transition-transform duration-500 hover:rotate-0">
            <img src="/images/academy-study-desk.webp" alt="" loading="lazy" width={1536} height={1024} className="aspect-[3/2] w-full rounded-2xl object-cover" />
            <p className="px-3 pb-1 pt-3 text-sm font-bold text-white">Một góc học tập. Một khởi đầu mới.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
