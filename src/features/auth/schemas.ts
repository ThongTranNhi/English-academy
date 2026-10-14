import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Vui lòng nhập họ tên"),
    email: z.email("Email không hợp lệ"),
    password: z.string().min(8, "Mật khẩu tối thiểu 8 ký tự"),
    confirmPassword: z.string(),
    goal: z.enum(["ielts", "toeic", "communication", "general", "business"], "Vui lòng chọn mục tiêu"),
    agree: z.boolean().refine((v) => v, "Bạn cần đồng ý với điều khoản"),
  })
  .refine((d) => d.password === d.confirmPassword, { path: ["confirmPassword"], message: "Mật khẩu xác nhận không khớp" });

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
