import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";

export function CtaSection() {
  return (
    <section aria-labelledby="cta-heading" className="pb-[72px] lg:pb-24">
      <Container>
        <div className="relative grid items-center gap-8 overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-indigo-600 to-violet-700 px-6 py-10 text-white sm:px-10 lg:grid-cols-[1fr_0.85fr] lg:py-12">
          <div className="pointer-events-none absolute -left-16 -top-16 size-64 rounded-full bg-accent/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-10 size-72 rounded-full bg-highlight/20 blur-3xl" />
          <div className="relative">
            <h2 id="cta-heading" className="max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">Sẵn sàng bắt đầu hành trình tiếng Anh?</h2>
            <p className="mt-4 max-w-xl text-indigo-100">Đăng ký tài khoản để nhận lộ trình gợi ý, hoặc khám phá các khóa học phù hợp với mục tiêu của bạn.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="accent"><Link to="/register">Đăng ký ngay</Link></Button>
              <Button asChild size="lg" variant="white"><Link to="/courses">Khám phá khóa học</Link></Button>
            </div>
          </div>
          <div className="relative rounded-3xl border border-white/20 bg-white/10 p-2.5">
            <img src="/images/academy-study-desk.webp" alt="" loading="lazy" width={1536} height={1024} className="aspect-[3/2] w-full rounded-2xl object-cover" />
            <p className="px-3 pb-1 pt-3 text-sm font-medium text-indigo-100">Một góc học tập. Một khởi đầu mới.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
