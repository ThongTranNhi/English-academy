import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "@/features/auth/AuthLayout";
import { DemoNotice } from "@/features/auth/DemoNotice";
import { FormField } from "@/features/auth/FormField";
import { registerSchema, type RegisterValues } from "@/features/auth/schemas";
import { courseCategoryLabels } from "@/data/categories";
import { useAuthStore } from "@/store/authStore";
import { usePageMeta } from "@/hooks/usePageMeta";
import type { CourseCategory } from "@/types";

export default function RegisterPage() {
  usePageMeta("Đăng ký");
  const signIn = useAuthStore((s) => s.signIn);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { agree: false },
  });

  const onSubmit = (values: RegisterValues) => {
    signIn({ name: values.name, email: values.email });
    navigate("/dashboard");
  };

  const field = (name: keyof RegisterValues) => ({
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    <AuthLayout title="Tạo tài khoản" subtitle="Bắt đầu học miễn phí với các bài học thử.">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <DemoNotice />
        <FormField id="name" label="Họ và tên" error={errors.name?.message}>
          <Input id="name" autoComplete="name" {...field("name")} {...register("name")} />
        </FormField>
        <FormField id="email" label="Email" error={errors.email?.message}>
          <Input id="email" type="email" autoComplete="email" {...field("email")} {...register("email")} />
        </FormField>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField id="password" label="Mật khẩu" error={errors.password?.message}>
            <Input id="password" type="password" autoComplete="new-password" {...field("password")} {...register("password")} />
          </FormField>
          <FormField id="confirmPassword" label="Xác nhận mật khẩu" error={errors.confirmPassword?.message}>
            <Input id="confirmPassword" type="password" autoComplete="new-password" {...field("confirmPassword")} {...register("confirmPassword")} />
          </FormField>
        </div>
        <FormField id="goal" label="Mục tiêu học" error={errors.goal?.message}>
          <select id="goal" defaultValue="" className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm" {...field("goal")} {...register("goal")}>
            <option value="" disabled>Chọn mục tiêu…</option>
            {(Object.keys(courseCategoryLabels) as CourseCategory[]).map((k) => <option key={k} value={k}>{courseCategoryLabels[k]}</option>)}
          </select>
        </FormField>
        <div>
          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" className="mt-0.5 accent-primary" {...field("agree")} {...register("agree")} />
            <span>Tôi đồng ý với <Link to="/help/terms" className="text-primary hover:underline">điều khoản sử dụng</Link> và <Link to="/help/privacy" className="text-primary hover:underline">chính sách bảo mật</Link>.</span>
          </label>
          {errors.agree && <p id="agree-error" role="alert" className="mt-1 text-xs font-medium text-rose-600">{errors.agree.message}</p>}
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>Đăng ký (demo)</Button>
        <p className="text-center text-sm text-slate-600">
          Đã có tài khoản? <Link to="/login" className="font-semibold text-primary hover:underline">Đăng nhập</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
