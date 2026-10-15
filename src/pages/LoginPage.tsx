import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import { Lock, Mail } from "lucide-react";
import { AuthLayout } from "@/features/auth/AuthLayout";
import { AuthInput, SubmitButton } from "@/features/auth/AuthControls";
import { DemoNotice } from "@/features/auth/DemoNotice";
import { FormField } from "@/features/auth/FormField";
import { useAuthFlow } from "@/features/auth/useAuthFlow";
import { loginSchema, type LoginValues } from "@/features/auth/schemas";
import { useAuthStore } from "@/store/authStore";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function LoginPage() {
  usePageMeta("Đăng nhập");
  const signIn = useAuthStore((s) => s.signIn);
  const { lumi, status, shake, focusField, invalid, succeed, passwordVisibility } = useAuthFlow();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  // Mô phỏng: chỉ dùng phần trước @ làm tên hiển thị, không kiểm tra mật khẩu.
  const onSubmit = (values: LoginValues) => succeed(() => signIn({ name: values.email.split("@")[0], email: values.email }), "Yay! Đăng nhập thành công!");

  return (
    <AuthLayout mode="login" title="Đăng nhập" subtitle="Chào mừng bạn quay lại English Academy." lumi={lumi}>
      <form onSubmit={handleSubmit(onSubmit, invalid)} noValidate data-shake={shake} className="auth-form auth-stagger space-y-5">
        <DemoNotice />
        <FormField id="email" label="Email" error={errors.email?.message}>
          <AuthInput id="email" icon={Mail} type="email" autoComplete="email" placeholder="ban@example.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} onFocus={() => focusField("Nhập email bạn hay dùng nhé!")} {...register("email")} />
        </FormField>
        <FormField id="password" label="Mật khẩu" error={errors.password?.message}>
          <AuthInput id="password" icon={Lock} type="password" autoComplete="current-password" placeholder="Tối thiểu 6 ký tự" aria-invalid={!!errors.password} aria-describedby={errors.password ? "password-error" : undefined} onFocus={() => focusField("Yên tâm, mình không nhìn trộm đâu!")} onVisibilityChange={(visible) => passwordVisibility("password", visible)} {...register("password")} />
        </FormField>
        <SubmitButton status={status} label="Đăng nhập (demo)" successLabel="Đăng nhập thành công!" />
        <p className="text-center text-sm font-medium text-slate-600">
          Chưa có tài khoản? <Link to="/register" className="font-extrabold text-primary hover:underline">Đăng ký miễn phí</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
