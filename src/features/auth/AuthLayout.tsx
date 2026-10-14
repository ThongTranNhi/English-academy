import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/shared/Container";

const perks = ["Lưu tiến độ học và từ vựng đã thuộc", "Nhận lộ trình gợi ý theo mục tiêu", "Truy cập bài học thử của mọi khóa"];

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <Container className="grid min-h-[calc(100vh-76px)] items-center gap-10 py-12 lg:grid-cols-2">
      <div className="hidden rounded-3xl bg-gradient-to-br from-primary to-violet-700 p-10 text-white lg:block">
        <h2 className="text-3xl font-extrabold">Học tiếng Anh mỗi ngày, tiến bộ mỗi tuần.</h2>
        <ul className="mt-8 space-y-3">
          {perks.map((p) => <li key={p} className="flex items-center gap-3 text-indigo-100"><CheckCircle2 className="size-5 text-accent" aria-hidden />{p}</li>)}
        </ul>
      </div>
      <div className="mx-auto w-full max-w-md">
        <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
        <p className="mt-2 text-slate-600">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </div>
    </Container>
  );
}
