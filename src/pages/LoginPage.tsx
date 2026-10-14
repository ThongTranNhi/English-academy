import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "@/features/auth/AuthLayout";
import { DemoNotice } from "@/features/auth/DemoNotice";
import { FormField } from "@/features/auth/FormField";
import { loginSchema, type LoginValues } from "@/features/auth/schemas";
import { useAuthStore } from "@/store/authStore";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function LoginPage() {
  usePageMeta("Đăng nhập");
  const signIn = useAuthStore((s) => s.signIn);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (values: LoginValues) => {
    // Mô phỏng: chỉ dùng phần trước @ làm tên hiển thị, không kiểm tra mật khẩu.
    signIn({ name: values.email.split("@")[0], email: values.email });
    navigate("/dashboard");
  };

  return (
    <AuthLayout title="Đăng nhập" subtitle="Chào mừng bạn quay lại English Academy.">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <DemoNotice />
        <FormField id="email" label="Email" error={errors.email?.message}>
          <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} />
        </FormField>
        <FormField id="password" label="Mật khẩu" error={errors.password?.message}>
          <Input id="password" type="password" autoComplete="current-password" aria-invalid={!!errors.password} aria-describedby={errors.password ? "password-error" : undefined} {...register("password")} />
        </FormField>
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>Đăng nhập (demo)</Button>
        <p className="text-center text-sm text-slate-600">
          Chưa có tài khoản? <Link to="/register" className="font-semibold text-primary hover:underline">Đăng ký</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
