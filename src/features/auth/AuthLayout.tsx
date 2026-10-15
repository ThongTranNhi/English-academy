import type { ReactNode } from "react";
import { BookMarked, Route, Sparkles } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { LumiCharacter } from "@/components/shared/LumiCharacter";
import type { LumiMood } from "@/lib/lumi";
import { AuthTabs } from "./AuthControls";

const perks = [
  { text: "Lưu tiến độ học và từ vựng đã thuộc", icon: BookMarked, color: "bg-sun text-navy" },
  { text: "Nhận lộ trình gợi ý theo mục tiêu", icon: Route, color: "bg-leaf text-navy" },
  { text: "Truy cập bài học thử của mọi khóa", icon: Sparkles, color: "bg-coral text-navy" },
];

interface AuthLayoutProps {
  mode: "login" | "register";
  title: string;
  subtitle: string;
  lumi: { mood: LumiMood; sequence: number; message: string };
  children: ReactNode;
}

export function AuthLayout({ mode, title, subtitle, lumi, children }: AuthLayoutProps) {
  const greeting = mode === "login" ? "Chào mừng bạn quay lại!" : "Cùng mình bắt đầu nhé!";
  return (
    <div className="auth-bg relative overflow-hidden">
      <Container className="relative grid gap-6 py-6 sm:py-10 lg:min-h-[calc(100vh-82px)] lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14 lg:py-14">
        <aside aria-label="Lumi, bạn đồng hành" className="auth-hero relative flex items-center gap-4 overflow-hidden rounded-[32px] bg-gradient-to-br from-primary via-[#5a3ff0] to-grape p-5 text-white shadow-[0_8px_0_var(--color-grape-shade)] sm:p-6 lg:flex-col lg:items-stretch lg:gap-6 lg:p-10">
          <span aria-hidden className="float-y pointer-events-none absolute -right-6 top-6 size-20 rotate-12 rounded-3xl bg-sun/90 shadow-[0_6px_0_var(--color-sun-shade)] lg:size-24" />
          <span aria-hidden className="float-y-slow pointer-events-none absolute -bottom-6 left-10 hidden size-16 rounded-full bg-coral/80 lg:block" />
          <span aria-hidden className="float-y pointer-events-none absolute right-12 top-[42%] hidden size-10 -rotate-12 rounded-xl bg-leaf shadow-[0_5px_0_var(--color-leaf-shade)] lg:block" />

          <div className="relative size-24 shrink-0 sm:size-28 lg:order-2 lg:mx-auto lg:size-60">
            <LumiCharacter mood={lumi.mood} sequence={lumi.sequence} />
            <span aria-hidden className="lumi-shadow absolute -bottom-1 left-1/2 hidden h-4 w-40 -translate-x-1/2 rounded-[100%] bg-navy/30 blur-sm lg:block" />
          </div>

          <div className="relative min-w-0 lg:order-1">
            <p aria-live="polite" className="lumi-speech-auth mb-2 inline-block max-w-full rounded-2xl bg-white px-4 py-2 text-sm font-extrabold text-primary shadow-[0_4px_0_rgb(15_23_42/0.2)]">
              {lumi.message || greeting}
            </p>
            <h2 className="text-xl font-black leading-tight sm:text-2xl lg:text-4xl">Học tiếng Anh mỗi ngày, tiến bộ mỗi tuần.</h2>
          </div>

          <ul className="relative hidden gap-3 lg:order-3 lg:grid">
            {perks.map(({ text, icon: Icon, color }) => (
              <li key={text} className="auth-perk flex items-center gap-3 rounded-2xl bg-white/15 p-3 font-bold ring-2 ring-white/15 backdrop-blur-sm">
                <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${color}`}><Icon className="size-5" aria-hidden /></span>
                {text}
              </li>
            ))}
          </ul>
        </aside>

        <div className="auth-card mx-auto w-full max-w-lg">
          <div className="duo-card overflow-hidden">
            <div aria-hidden className="rainbow-bar h-2" />
            <div className="p-5 sm:p-8">
              <AuthTabs mode={mode} />
              <h1 className="mt-6 text-3xl font-black tracking-tight">{title}</h1>
              <p className="mt-1.5 font-medium text-slate-600">{subtitle}</p>
              <div className="mt-6">{children}</div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
