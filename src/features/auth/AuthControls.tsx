import { useState, type ComponentProps, type CSSProperties } from "react";
import { Link } from "react-router";
import { Check, Eye, EyeOff, Loader2, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { AuthStatus } from "./useAuthFlow";
import { passwordScore } from "./passwordStrength";

/** Ô nhập có icon bên trái; ô mật khẩu có thêm nút hiện/ẩn. */
export function AuthInput({ icon: Icon, type = "text", className, onVisibilityChange, ...props }: ComponentProps<typeof Input> & { icon: LucideIcon; onVisibilityChange?: (visible: boolean) => void }) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  return (
    <div className="auth-control group relative">
      <Icon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary" aria-hidden />
      <Input
        type={isPassword && visible ? "text" : type}
        className={cn("auth-input h-12 rounded-2xl border-2 pl-12 text-base font-semibold focus:ring-4 aria-invalid:border-coral aria-invalid:bg-coral-soft/40", isPassword && "pr-12", className)}
        {...props}
      />
      {isPassword && (
        <button type="button" onClick={() => { setVisible(!visible); onVisibilityChange?.(!visible); }} aria-label={visible ? "Ẩn mật khẩu" : "Hiện mật khẩu"} className="absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-primary-soft hover:text-primary">
          {visible ? <EyeOff className="size-5" aria-hidden /> : <Eye className="size-5" aria-hidden />}
        </button>
      )}
    </div>
  );
}

/** Thanh chuyển giữa hai trang; viên nền trượt sang trang đang mở. */
export function AuthTabs({ mode }: { mode: "login" | "register" }) {
  const tab = (active: boolean) => cn("relative z-10 rounded-xl py-2.5 text-center text-sm font-extrabold transition-colors", active ? "text-primary" : "text-slate-500 hover:text-navy");
  return (
    <nav aria-label="Chọn đăng nhập hoặc đăng ký" className="relative grid grid-cols-2 rounded-2xl bg-slate-100 p-1.5">
      <span aria-hidden data-mode={mode} className="auth-tab-pill absolute inset-y-1.5 left-1.5 w-[calc(50%-6px)] rounded-xl bg-white shadow-[0_3px_0_#e2e8f0]" />
      <Link to="/login" aria-current={mode === "login" ? "page" : undefined} className={tab(mode === "login")}>Đăng nhập</Link>
      <Link to="/register" aria-current={mode === "register" ? "page" : undefined} className={tab(mode === "register")}>Đăng ký</Link>
    </nav>
  );
}

const confetti = ["bg-coral", "bg-sun", "bg-leaf", "bg-sky", "bg-grape", "bg-tangerine"];

/** Nút gửi 3D: vòng xoay khi đang xử lý, dấu tích và pháo giấy khi thành công. */
export function SubmitButton({ status, label, successLabel }: { status: AuthStatus; label: string; successLabel: string }) {
  return (
    <div className="relative">
      <Button type="submit" size="lg" variant="success" disabled={status !== "idle"} className={cn("w-full text-base disabled:opacity-100", status === "success" && "auth-success")}>
        {status === "loading" ? <><Loader2 className="animate-spin" aria-hidden /> Đang xử lý…</> : status === "success" ? <><Check strokeWidth={3} aria-hidden /> {successLabel}</> : label}
      </Button>
      {status === "success" && (
        <span aria-hidden className="confetti pointer-events-none absolute inset-0">
          {Array.from({ length: 16 }, (_, index) => {
            const angle = (index / 16) * Math.PI * 2;
            const distance = 70 + (index % 3) * 26;
            return <span key={index} className={cn("confetti-piece absolute left-1/2 top-1/2 h-2.5 w-1.5 rounded-sm", confetti[index % confetti.length])} style={{ "--x": `${Math.cos(angle) * distance * 1.6}px`, "--y": `${Math.sin(angle) * distance}px`, "--r": `${index * 47}deg` } as CSSProperties} />;
          })}
        </span>
      )}
      <p role="status" className="sr-only">{status === "loading" ? "Đang xử lý" : status === "success" ? successLabel : ""}</p>
    </div>
  );
}

const strengthLevels = [
  { label: "Yếu", color: "bg-coral", text: "text-coral-ink" },
  { label: "Trung bình", color: "bg-tangerine", text: "text-sun-ink" },
  { label: "Khá", color: "bg-sun", text: "text-sun-ink" },
  { label: "Mạnh", color: "bg-leaf", text: "text-leaf-ink" },
];

/** Thanh 4 nấc cho biết độ mạnh mật khẩu. */
export function PasswordStrength({ password }: { password: string }) {
  const score = passwordScore(password);
  const level = strengthLevels[Math.max(score, 1) - 1];
  return (
    <div className="mt-2" aria-live="polite">
      <div className="grid grid-cols-4 gap-1.5" aria-hidden>
        {strengthLevels.map((_, index) => <span key={index} className={cn("strength-bar h-2 rounded-full", index < score ? level.color : "bg-slate-200")} />)}
      </div>
      {password && <p className={cn("mt-1 text-xs font-extrabold", level.text)}>Độ mạnh mật khẩu: {level.label}</p>}
    </div>
  );
}
