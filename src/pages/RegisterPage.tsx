import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import { Briefcase, Check, GraduationCap, Lock, Mail, MessagesSquare, Target, Trophy, User } from "lucide-react";
import { AuthLayout } from "@/features/auth/AuthLayout";
import { AuthInput, PasswordStrength, SubmitButton } from "@/features/auth/AuthControls";
import { DemoNotice } from "@/features/auth/DemoNotice";
import { FormField } from "@/features/auth/FormField";
import { useAuthFlow } from "@/features/auth/useAuthFlow";
import { registerSchema, type RegisterValues } from "@/features/auth/schemas";
import { courseCategoryLabels } from "@/data/categories";
import { useAuthStore } from "@/store/authStore";
import { usePageMeta } from "@/hooks/usePageMeta";
import { cn } from "@/lib/utils";
import type { CourseCategory } from "@/types";

const goals: { key: CourseCategory; icon: typeof Trophy; color: string }[] = [
  { key: "ielts", icon: Trophy, color: "bg-primary text-white" },
  { key: "toeic", icon: Target, color: "bg-sky text-navy" },
  { key: "communication", icon: MessagesSquare, color: "bg-sun text-navy" },
  { key: "general", icon: GraduationCap, color: "bg-leaf text-navy" },
  { key: "business", icon: Briefcase, color: "bg-grape text-white" },
];

export default function RegisterPage() {
  usePageMeta("Đăng ký");
  const signIn = useAuthStore((s) => s.signIn);
  const { lumi, status, shake, focusField, invalid, succeed, passwordVisibility } = useAuthFlow();
  const { register, handleSubmit, control, formState: { errors } } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { agree: false },
  });
  const password = useWatch({ control, name: "password" });

  const onSubmit = (values: RegisterValues) => succeed(() => signIn({ name: values.name, email: values.email }), `Chào mừng ${values.name.split(" ").pop()} đến với Academy!`);

  const field = (name: keyof RegisterValues) => ({
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    <AuthLayout mode="register" title="Tạo tài khoản" subtitle="Bắt đầu học miễn phí với các bài học thử." lumi={lumi}>
      <form onSubmit={handleSubmit(onSubmit, invalid)} noValidate data-shake={shake} className="auth-form auth-stagger space-y-5">
        <DemoNotice />
        <FormField id="name" label="Họ và tên" error={errors.name?.message}>
          <AuthInput id="name" icon={User} autoComplete="name" placeholder="Nguyễn Văn An" onFocus={() => focusField("Rất vui được làm quen với bạn!")} {...field("name")} {...register("name")} />
        </FormField>
        <FormField id="email" label="Email" error={errors.email?.message}>
          <AuthInput id="email" icon={Mail} type="email" autoComplete="email" placeholder="ban@example.com" onFocus={() => focusField("Email để lưu tiến độ học nè!")} {...field("email")} {...register("email")} />
        </FormField>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField id="password" label="Mật khẩu" error={errors.password?.message}>
            <AuthInput id="password" icon={Lock} type="password" autoComplete="new-password" placeholder="Ít nhất 8 ký tự" onFocus={() => focusField("Thêm chữ hoa, số và ký tự đặc biệt cho mạnh nhé!")} onVisibilityChange={(visible) => passwordVisibility("password", visible)} {...field("password")} {...register("password")} />
          </FormField>
          <FormField id="confirmPassword" label="Xác nhận mật khẩu" error={errors.confirmPassword?.message}>
            <AuthInput id="confirmPassword" icon={Lock} type="password" autoComplete="new-password" placeholder="Nhập lại" onFocus={() => focusField("Gõ lại giống hệt nha!")} onVisibilityChange={(visible) => passwordVisibility("confirmPassword", visible)} {...field("confirmPassword")} {...register("confirmPassword")} />
          </FormField>
        </div>
        <PasswordStrength password={password ?? ""} />

        <fieldset aria-describedby={errors.goal ? "goal-error" : undefined}>
          <legend className="mb-2 text-sm font-medium text-navy">Mục tiêu học</legend>
          <div className="auth-control grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {goals.map(({ key, icon: Icon, color }) => (
              <label key={key} className="group relative cursor-pointer">
                <input type="radio" value={key} className="peer sr-only" aria-invalid={!!errors.goal} {...register("goal")} />
                <span className="flex h-full items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-3 py-2.5 text-sm font-extrabold shadow-[0_4px_0_#e2e8f0] transition-all group-hover:-translate-y-0.5 peer-checked:border-primary peer-checked:bg-primary-soft peer-checked:text-primary peer-checked:shadow-[0_4px_0_#c9d3ff] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary">
                  <span className={cn("icon-pop flex size-8 shrink-0 items-center justify-center rounded-xl", color)}><Icon className="size-4" aria-hidden /></span>
                  {courseCategoryLabels[key]}
                </span>
              </label>
            ))}
          </div>
          {errors.goal && <p id="goal-error" role="alert" className="mt-1.5 text-xs font-medium text-rose-600">{errors.goal.message}</p>}
        </fieldset>

        <div>
          <label className="group flex cursor-pointer items-start gap-3 rounded-2xl border-2 border-slate-200 bg-white p-3 text-sm font-medium transition-colors has-[:checked]:border-leaf has-[:checked]:bg-leaf-soft">
            <input type="checkbox" className="peer sr-only" {...field("agree")} {...register("agree")} />
            <span aria-hidden className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg border-2 border-slate-300 bg-white text-transparent transition-all peer-checked:border-leaf-shade peer-checked:bg-leaf peer-checked:text-navy peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary">
              <Check className="size-4" strokeWidth={3.5} />
            </span>
            <span>Tôi đồng ý với <Link to="/help/terms" className="font-bold text-primary hover:underline">điều khoản sử dụng</Link> và <Link to="/help/privacy" className="font-bold text-primary hover:underline">chính sách bảo mật</Link>.</span>
          </label>
          {errors.agree && <p id="agree-error" role="alert" className="mt-1.5 text-xs font-medium text-rose-600">{errors.agree.message}</p>}
        </div>

        <SubmitButton status={status} label="Tạo tài khoản (demo)" successLabel="Tạo tài khoản thành công!" />
        <p className="text-center text-sm font-medium text-slate-600">
          Đã có tài khoản? <Link to="/login" className="font-extrabold text-primary hover:underline">Đăng nhập</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
